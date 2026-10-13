function createScenarioModule({ definition, rules }) {
  const redAdaptationActions = rules.redAdaptationActions || [
    "do_nothing",
    "change_tactic"
  ];

  function create() {
    return {
      scenarioId: definition.id,
      category: definition.category,
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

  function effectiveDefenses(state) {
    const countered = state.redAdaptation && state.redAdaptation !== "do_nothing"
      ? rules.counteredDefensesByAdaptation?.[state.redAdaptation] || []
      : [];
    return rules.defensiveActions.filter((action) => !countered.includes(action));
  }

  function availableBlueActions(state) {
    const actions = state.phase === "blue_action"
      ? rules.blueActions
      : state.phase === "blue_response" ? rules.blueResponses : [];
    const unavailable = state.phase === "blue_action"
      ? rules.unavailableBlueActionsByRedAction?.[state.redAction] || []
      : [];
    return actions.filter(
      (action) => !unavailable.includes(action)
    );
  }

  function assertActionAllowed(state, role, action) {
    if (state.resolved) {
      throw new Error("scenario_already_resolved");
    }
    if (role === "red") {
      const actions = state.phase === "red_action"
        ? rules.redActions
        : state.phase === "red_adaptation" ? redAdaptationActions : [];
      if (!actions.includes(action)) {
        throw new Error("invalid_red_action");
      }
      return;
    }
    if (!availableBlueActions(state).includes(action)) {
      throw new Error("invalid_blue_action");
    }
  }

  function resolve(state) {
    const attackSucceeded = rules.attackActions.includes(state.redAction);
    const defenseSucceeded = effectiveDefenses(state).includes(state.blueAction);
    if (!attackSucceeded && state.blueAction === "report") {
      state.outcome = "false_positive";
      state.scores = { red: 0, blue: -2 };
    } else if (attackSucceeded && defenseSucceeded) {
      state.outcome = "attack_prevented";
      state.scores = { red: 0, blue: 3 };
    } else if (attackSucceeded) {
      state.outcome = "attack_succeeded";
      state.scores = { red: 5, blue: 0 };
    } else {
      state.outcome = "no_significant_impact";
    }
    state.phase = "resolved";
    state.resolved = true;
  }

  function apply(state, role, action) {
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
    resolve(state);
  }

  function view(state, role) {
    if (role !== "red" && role !== "blue") {
      throw new Error("invalid_role");
    }
    const result = {
      scenarioId: definition.id,
      category: definition.category,
      phase: state.phase,
      event: definition.event,
      scores: { ...state.scores }
    };
    if (role === "red") {
      result.private = {
        originalStatus: definition.originalStatus,
        objective: definition.redObjective,
        availableActions: state.phase === "red_action"
          ? rules.redActions
          : state.phase === "red_adaptation" ? redAdaptationActions : []
      };
    } else if (state.phase !== "red_action") {
      result.availableActions = availableBlueActions(state);
      if (state.investigationCompleted) {
        result.evidence = {
          ...definition.investigationEvidence,
          activityCheck: rules.attackActions.includes(state.redAction)
            ? "The investigation found indicators that the event was deliberately manipulated."
            : "The investigation found no indicators of deliberate manipulation.",
          adaptationCheck: "The investigation cannot confirm whether the threat pattern changed after the response."
        };
      }
    }
    if (state.resolved) {
      result.outcome = state.outcome;
    }
    return result;
  }

  return { create, apply, view };
}

module.exports = { createScenarioModule };
