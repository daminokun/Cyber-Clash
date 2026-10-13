const fs = require("node:fs");
const path = require("node:path");

const scenarioPath = path.join(__dirname, "..", "scenarios", "email-phishing.json");
const template = JSON.parse(fs.readFileSync(scenarioPath, "utf8"));

const RED_ACTIONS = ["do_nothing", "add_malicious_link"];
const INITIAL_BLUE_ACTIONS = ["investigate", "report", "ignore", "block"];
const RESPONSE_BLUE_ACTIONS = ["report", "ignore", "block"];

function createEmailScenario() {
  return {
    scenarioId: template.id,
    category: template.category,
    phase: "red_action",
    redAction: null,
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
    if (state.phase !== "red_action" || !RED_ACTIONS.includes(action)) {
      throw new Error("invalid_red_action");
    }
    return;
  }

  const allowedActions = state.phase === "blue_action"
    ? INITIAL_BLUE_ACTIONS
    : state.phase === "blue_response"
      ? RESPONSE_BLUE_ACTIONS
      : [];

  if (!allowedActions.includes(action)) {
    throw new Error("invalid_blue_action");
  }
}

function applyAction(state, role, action) {
  assertActionAllowed(state, role, action);

  if (role === "red") {
    state.redAction = action;
    state.phase = "blue_action";
    return;
  }

  if (action === "investigate") {
    state.investigationCompleted = true;
    state.phase = "blue_response";
    return;
  }

  state.blueAction = action;
  resolveScenario(state);
}

function resolveScenario(state) {
  const attackSucceeded = state.redAction === "add_malicious_link";
  const defensiveResponse = state.blueAction === "report" || state.blueAction === "block";

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
      availableActions: state.phase === "red_action" ? RED_ACTIONS : []
    };
  } else if (state.phase !== "red_action") {
    view.availableActions = state.phase === "blue_response"
      ? RESPONSE_BLUE_ACTIONS
      : state.phase === "blue_action"
        ? INITIAL_BLUE_ACTIONS
        : [];
    if (state.investigationCompleted) {
      view.evidence = template.investigationEvidence;
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
