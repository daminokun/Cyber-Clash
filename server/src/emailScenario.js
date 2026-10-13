const fs = require("node:fs");
const path = require("node:path");

const scenarioPath = path.join(__dirname, "..", "scenarios", "email-phishing.json");
const template = JSON.parse(fs.readFileSync(scenarioPath, "utf8"));

const RED_ACTIONS = ["do_nothing", "add_malicious_link"];
const INITIAL_BLUE_ACTIONS = ["investigate", "report", "ignore", "block"];
const RESPONSE_BLUE_ACTIONS = ["report", "ignore", "block"];

function getAvailableBlueActions(state) {
  const actions = state.phase === "blue_response"
    ? RESPONSE_BLUE_ACTIONS
    : state.phase === "blue_action" ? INITIAL_BLUE_ACTIONS : [];
  if (state.redAdaptation === "change_sender") {
    return actions.filter((action) => action !== "block");
  }
  return actions;
}
const RED_ADAPTATION_ACTIONS = ["do_nothing", "change_sender"];

function getInvestigationEvidence(state) {
  const evidence = { ...template.investigationEvidence };
  evidence.messageCheck = state.redAction === "do_nothing"
    ? "No deliberate message manipulation was found."
    : "The message contains an indicator of deliberate manipulation.";
  evidence.adaptationCheck = state.redAdaptation === "change_sender"
    ? "The sender metadata changed after investigation; blocking the original sender may not be sufficient."
    : state.redAdaptation === "do_nothing"
      ? "The message metadata remained consistent after investigation."
      : "No follow-up manipulation has been observed yet.";
  if (state.blueAction === "report") {
    evidence.responseCheck = "The message was flagged for security review.";
  } else if (state.blueAction === "block") {
    evidence.responseCheck = "Further interaction with the message was blocked.";
  } else if (state.blueAction === "ignore") {
    evidence.responseCheck = "No containment action was applied to the message.";
  }
  return evidence;
}

function createEmailScenario() {
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

function assertActionAllowed(state, role, action) {
  if (state.resolved) {
    throw new Error("scenario_already_resolved");
  }

  if (role === "red") {
    const allowedActions = state.phase === "red_action"
      ? RED_ACTIONS
      : state.phase === "red_adaptation" ? RED_ADAPTATION_ACTIONS : [];
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

  if (action === "investigate") {
    state.investigationCompleted = true;
    state.phase = "red_adaptation";
    return;
  }

  state.blueAction = action;
  resolveScenario(state);
}

function resolveScenario(state) {
  const attackSucceeded = state.redAction === "add_malicious_link";
  const defensiveResponse = state.blueAction === "report"
    || (state.blueAction === "block" && state.redAdaptation !== "change_sender");

  if (!attackSucceeded && state.blueAction === "report") {
    state.outcome = "false_positive";
    state.scores.blue = -2;
  } else if (attackSucceeded && defensiveResponse) {
    state.outcome = "attack_prevented";
    state.scores.blue = 3;
  } else if (attackSucceeded) {
    state.outcome = "attack_succeeded";
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
  createEmailScenario,
  getPlayerView
};
