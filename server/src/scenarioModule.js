const CONTAINMENT_ACTIONS = new Set(["investigate", "investigate_logs", "ignore"]);

function createScenarioModule({ definition, rules }) {
  validateScenarioRules(definition.id, rules);

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

  function isAdapted(state) {
    return Boolean(state.redAdaptation && state.redAdaptation !== "do_nothing");
  }

  // The defence that contains the attack currently in play. Red's follow-up
  // vector (chosen after Blue investigates) is contained by a different
  // response, so investigating never removes every possible defense.
  function stoppingDefenses(state) {
    const map = isAdapted(state)
      ? rules.adaptedDefensesByRedAction
      : rules.stoppingDefensesByRedAction;
    return map[state.redAction] || [];
  }

  function availableBlueActions(state) {
    const actions = state.phase === "blue_action"
      ? rules.blueActions
      : state.phase === "blue_response" ? rules.blueResponses : [];
    return actions;
  }

  function availableRedActions(state) {
    return state.phase === "red_action"
      ? rules.redActions
      : state.phase === "red_adaptation" ? rules.redAdaptationActions : [];
  }

  function assertActionAllowed(state, role, action) {
    if (state.resolved) {
      throw new Error("scenario_already_resolved");
    }
    if (action === "change_tactic") {
      throw new Error("invalid_action_removed");
    }
    if (role === "red") {
      if (!availableRedActions(state).includes(action)) {
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
    const defenseSucceeded = stoppingDefenses(state).includes(state.blueAction);
    if (!attackSucceeded && !CONTAINMENT_ACTIONS.has(state.blueAction)) {
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
    if (defenseSucceeded && isAdapted(state)) {
      return `Red changed the attack vector after Blue investigated. Blue's "${actionLabel(state.blueAction)}" response matched the follow-up vector and contained it, so Blue receives 3 points and Red receives 0.`;
    }
    if (defenseSucceeded) {
      return `Red launched an attack and Blue selected the matching "${actionLabel(state.blueAction)}" defense. The attack was contained before it achieved its objective, so Blue receives 3 points and Red receives 0.`;
    }
    if (isAdapted(state)) {
      return `Red changed the attack vector after Blue investigated. Blue's "${actionLabel(state.blueAction)}" response addressed the original vector, not the follow-up vector, so the attack succeeded and Red receives 5 points.`;
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
        availableActions: availableRedActions(state)
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

function validateScenarioRules(scenarioId, rules) {
  const fail = (reason) => {
    throw new Error(`invalid_scenario_rules:${scenarioId}:${reason}`);
  };
  const isStringList = (value) => Array.isArray(value) && value.length > 0
    && value.every((item) => typeof item === "string");

  if (!isStringList(rules.redActions) || !rules.redActions.includes("do_nothing")) {
    fail("red_actions");
  }
  if (!isStringList(rules.blueActions) || !rules.blueActions.includes("investigate")) {
    fail("blue_actions");
  }
  if (!isStringList(rules.blueResponses)) {
    fail("blue_responses");
  }
  if (!isStringList(rules.attackActions)) {
    fail("attack_actions");
  }
  if (!isStringList(rules.defensiveActions) || rules.defensiveActions.length < 2) {
    fail("defensive_actions");
  }
  if (!isStringList(rules.redAdaptationActions)
    || !rules.redAdaptationActions.includes("do_nothing")) {
    fail("red_adaptation_actions");
  }
  for (const action of [...rules.redActions, ...rules.blueActions, ...rules.blueResponses,
    ...rules.redAdaptationActions]) {
    if (action === "change_tactic") {
      fail("removed_action_still_listed");
    }
  }
  for (const defense of rules.defensiveActions) {
    if (!rules.blueResponses.includes(defense)) {
      fail(`defense_missing_from_responses:${defense}`);
    }
  }
  for (const attack of rules.attackActions) {
    if (attack === "do_nothing") {
      fail(`do_nothing_listed_as_attack:${attack}`);
    }
    const stops = rules.stoppingDefensesByRedAction?.[attack];
    if (!isStringList(stops)) {
      fail(`missing_stopping_defenses:${attack}`);
    }
    const adapted = rules.adaptedDefensesByRedAction?.[attack];
    if (!isStringList(adapted)) {
      fail(`missing_adapted_defenses:${attack}`);
    }
    for (const defense of [...stops, ...adapted]) {
      if (!rules.defensiveActions.includes(defense)) {
        fail(`unknown_defense:${attack}:${defense}`);
      }
      if (!rules.blueResponses.includes(defense)) {
        fail(`defense_not_selectable:${attack}:${defense}`);
      }
    }
    if (adapted.some((defense) => stops.includes(defense))) {
      fail(`adaptation_reuses_original_defense:${attack}`);
    }
  }
  const knownAttacks = new Set(rules.attackActions);
  for (const key of Object.keys(rules.stoppingDefensesByRedAction || {})) {
    if (!knownAttacks.has(key)) {
      fail(`unknown_attack_in_stopping_map:${key}`);
    }
  }
  for (const key of Object.keys(rules.adaptedDefensesByRedAction || {})) {
    if (!knownAttacks.has(key)) {
      fail(`unknown_attack_in_adapted_map:${key}`);
    }
  }
}

module.exports = { createScenarioModule, validateScenarioRules };
