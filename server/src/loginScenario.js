const fs = require("node:fs");
const path = require("node:path");

const scenarioPath = path.join(__dirname, "..", "scenarios", "suspicious-login.json");
const template = JSON.parse(fs.readFileSync(scenarioPath, "utf8"));

const RED_ACTIONS = ["do_nothing", "credential_stuffing"];
const INITIAL_BLUE_ACTIONS = ["investigate_logs", "force_logout", "reset_credentials", "ignore"];
const RED_ADAPTATION_ACTIONS = ["do_nothing", "spoof_login_location"];
const RESPONSE_BLUE_ACTIONS = ["force_logout", "reset_credentials", "ignore"];

function getAvailableBlueActions(state) {
  const actions = state.phase === "blue_response"
    ? RESPONSE_BLUE_ACTIONS
    : state.phase === "blue_action" ? INITIAL_BLUE_ACTIONS : [];
  if (state.redAdaptation === "spoof_login_location") {
    return actions.filter((action) => action !== "force_logout");
  }
  return actions;
}

function createLoginScenario() {
  return {
    scenarioId: template.id,
    category: template.category,
    phase: "red_action",
    redAction: null,
    redAdaptation: null,
    blueAction: null,
    investigationCompleted: false,
    resolved: false,
    outcome: null,
    scores: { red: 0, blue: 0 }
  };
}

function getInvestigationEvidence(state) {
  const evidence = { ...template.investigationEvidence };
  if (state.redAction === "do_nothing") {
    evidence.activityCheck = "No deliberate account manipulation was found in the available records.";
  } else {
    evidence.activityCheck = "The authentication records contain indicators consistent with deliberate account manipulation.";
  }
  if (state.redAdaptation === "spoof_login_location") {
    evidence.locationCheck = "The reported location conflicts with the authentication provider's location record.";
    evidence.adaptationCheck = "The login metadata changed after investigation, suggesting an attempted disguise.";
  } else if (state.redAdaptation === "do_nothing") {
    evidence.adaptationCheck = "The login metadata remained consistent after investigation.";
  }
  if (state.blueAction === "force_logout") {
    evidence.responseCheck = "The active session was terminated and requires a fresh sign-in.";
  } else if (state.blueAction === "reset_credentials") {
    evidence.responseCheck = "The account credentials were reset and existing sessions were invalidated.";
  } else if (state.blueAction === "ignore") {
    evidence.responseCheck = "No containment action was applied to the account.";
  }
  return evidence;
}

function assertActionAllowed(state, role, action) {
  if (state.resolved) {
    throw new Error("scenario_already_resolved");
  }
  if (role === "red") {
    const allowedActions = state.phase === "red_action"
      ? RED_ACTIONS
      : state.phase === "red_adaptation"
        ? RED_ADAPTATION_ACTIONS
        : [];
    if (!allowedActions.includes(action)) {
      throw new Error("invalid_red_action");
    }
    return;
  }
  const allowedActions = getAvailableBlueActions(state);
  if (!allowedActions.includes(action)) {
    throw new Error("invalid_blue_action");
  }
}

function applyAction(state, role, action) {
  assertActionAllowed(state, role, action);
  if (role === "red") {
    if (state.phase === "red_action") {
      state.redAction = action;
      state.phase = "blue_action";
    } else {
      state.redAdaptation = action;
      state.phase = "blue_response";
    }
    return;
  }
  if (action === "investigate_logs") {
    state.investigationCompleted = true;
    state.phase = "red_adaptation";
    return;
  }
  state.blueAction = action;
  resolveScenario(state);
}

function resolveScenario(state) {
  const attackSucceeded = state.redAction !== "do_nothing";
  const defensiveResponse = state.blueAction === "reset_credentials"
    || (state.blueAction === "force_logout"
      && state.redAdaptation !== "spoof_login_location");

  if (!attackSucceeded && state.blueAction !== "ignore") {
    state.outcome = "false_positive";
    state.scores.blue = -2;
  } else if (attackSucceeded && defensiveResponse) {
    state.outcome = "login_attack_prevented";
    state.scores.blue = 3;
  } else if (attackSucceeded) {
    state.outcome = "login_attack_succeeded";
    state.scores.red = 5;
  } else {
    state.outcome = "no_significant_impact";
  }
  state.phase = "resolved";
  state.resolved = true;
}

function getPlayerView(state, role) {
  if (role !== "red" && role !== "blue") {
    throw new Error("invalid_role");
  }
  const view = {
    scenarioId: state.scenarioId,
    category: state.category,
    phase: state.phase,
    event: template.event,
    scores: { ...state.scores }
  };
  if (role === "red") {
    view.private = {
      originalStatus: template.originalStatus,
      objective: template.redObjective,
      availableActions: state.phase === "red_action"
        ? RED_ACTIONS
        : state.phase === "red_adaptation" ? RED_ADAPTATION_ACTIONS : []
    };
  } else if (state.phase !== "red_action") {
    view.availableActions = getAvailableBlueActions(state);
    if (state.investigationCompleted) {
      view.evidence = getInvestigationEvidence(state);
    }
  }
  if (state.resolved) {
    view.outcome = state.outcome;
  }
  return view;
}

module.exports = {
  applyAction,
  createLoginScenario,
  getPlayerView
};
