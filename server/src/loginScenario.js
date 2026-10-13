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
  delete evidence.locationCheck;
  if (state.redAction === "do_nothing") {
    evidence.activityCheck = "No deliberate account manipulation was found in the available records.";
  } else {
    evidence.activityCheck = "The authentication records contain indicators consistent with deliberate account manipulation.";
  }
  if (state.redAdaptation === "spoof_login_location") {
    evidence.adaptationCheck = "The investigation cannot confirm whether the login metadata changed after the response.";
  } else {
    evidence.adaptationCheck = "The investigation cannot confirm whether the login metadata changed after the response.";
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
  if (action === "change_tactic") {
    throw new Error("invalid_action_removed");
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
  state.resultExplanation = buildResultExplanation(state, attackSucceeded, defensiveResponse);
  state.phase = "resolved";
  state.resolved = true;
}

function buildResultExplanation(state, attackSucceeded, defensiveResponse) {
  const response = state.blueAction.replaceAll("_", " ");
  if (!attackSucceeded && state.outcome === "false_positive") {
    return `Red did not manipulate the account. Blue selected "${response}" against a legitimate login event, so Blue receives a -2 false-positive penalty.`;
  }
  if (!attackSucceeded) {
    return `Red chose not to attack. Blue's "${response}" response did not need to contain an attack, so the round had no significant impact and neither team scored.`;
  }
  if (defensiveResponse) {
    return `Red attempted credential stuffing, but Blue's "${response}" response invalidated the attack. Blue receives 3 points and Red receives 0.`;
  }
  if (state.redAdaptation === "spoof_login_location") {
    return `Red disguised the login location after investigation. Blue used "${response}", which did not invalidate the credentials used by the attack, so Red receives 5 points.`;
  }
  return `Red attempted credential stuffing and Blue's "${response}" response did not invalidate it. The login attack succeeded, so Red receives 5 points and Blue receives 0.`;
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
    view.resultExplanation = state.resultExplanation;
  }
  return view;
}

module.exports = {
  applyAction,
  createLoginScenario,
  getPlayerView
};
