const { getAdaptationRules } = require("./adaptationRules");

function createScenarioModule({ definition, rules }) {
  const adaptationRules = getAdaptationRules(definition.id);
  const redAdaptationActions = rules.redAdaptationActions
    || adaptationRules.redAdaptationActions;
  const counteredDefensesByAdaptation = {
    ...adaptationRules.counteredDefensesByAdaptation,
    ...rules.counteredDefensesByAdaptation
  };

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
    const unavailable = rules.unavailableBlueActionsByRedAction?.[state.redAction] || [];
    const available = rules.defensiveActions.filter((action) => !unavailable.includes(action));
    const attackIndex = rules.attackActions.indexOf(state.redAction);
    const explicitlyBlocked = new Set(
      Object.values(rules.unavailableBlueActionsByRedAction || {}).flat()
    );
    const inferred = rules.defensiveActions.filter((action) => explicitlyBlocked.has(action));
    const required = unavailable.length > 0
      ? available
      : inferred.length > 0
        ? [inferred[attackIndex % inferred.length]]
        : attackIndex >= 0 && available.length > 0
          ? [available[attackIndex % available.length]]
        : available;
    if (state.redAdaptation && state.redAdaptation !== "do_nothing") {
      return [];
    }
    const countered = counteredDefensesByAdaptation[state.redAdaptation] || [];
    return required.filter((action) => !countered.includes(action));
  }

  function availableBlueActions(state) {
    const actions = state.phase === "blue_action"
      ? rules.blueActions
      : state.phase === "blue_response" ? rules.blueResponses : [];
    return actions;
  }

  function assertActionAllowed(state, role, action) {
    if (state.resolved) {
      throw new Error("scenario_already_resolved");
    }
    if (action === "change_tactic") {
      throw new Error("invalid_action_removed");
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
    state.resultExplanation = buildResultExplanation(state, attackSucceeded, defenseSucceeded);
    state.phase = "resolved";
    state.resolved = true;
  }

  function actionLabel(action) {
    return action.replaceAll("_", " ");
  }

  function buildResultExplanation(state, attackSucceeded, defenseSucceeded) {
    if (!attackSucceeded && state.outcome === "false_positive") {
      return `Red did not launch an attack. Blue selected "${actionLabel(state.blueAction)}" against a legitimate event, so Blue receives a -2 false-positive penalty.`;
    }
    if (!attackSucceeded) {
      return `Red chose not to attack. Blue's "${actionLabel(state.blueAction)}" response did not need to contain an attack, so the round had no significant impact and neither team scored.`;
    }
    if (defenseSucceeded) {
      return `Red launched an attack and Blue selected the matching "${actionLabel(state.blueAction)}" defense. The attack was contained before it achieved its objective, so Blue receives 3 points and Red receives 0.`;
    }
    if (state.redAdaptation && state.redAdaptation !== "do_nothing") {
      return `Red changed the attack vector after investigation. Blue's "${actionLabel(state.blueAction)}" response addressed the original vector, not the follow-up vector, so the attack succeeded and Red receives 5 points.`;
    }
    return `Red launched an attack, but Blue's "${actionLabel(state.blueAction)}" response did not match the attack vector. The attack succeeded, so Red receives 5 points and Blue receives 0.`;
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
      result.resultExplanation = state.resultExplanation;
    }
    return result;
  }

  return { create, apply, view };
}

module.exports = { createScenarioModule };
