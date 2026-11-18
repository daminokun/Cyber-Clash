/* Fresh behavioural audit of every scenario. */
const path = require("node:path");
const registry = require(path.join(__dirname, "..", "server", "src", "scenarioRegistry"));

const defs = registry.getScenarioDefinitions();
const generic = defs.filter(({ id }) => id !== "email-account-verification-001"
  && id !== "suspicious-login-activity");

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function stopsFor(state, responses) {
  return responses.filter((response) => {
    const next = clone(state);
    registry.applyScenarioAction(next, "blue", response);
    return next.scores.blue > 0 && next.scores.red === 0;
  });
}

const rows = [];
const categoryCounts = {};
let maxActionLabel = 0;
let maxActionLabelSample = "";
let maxBlueChoices = 0;

for (const { id, category } of defs) {
  categoryCounts[category] = (categoryCounts[category] || 0) + 1;
  const probe = registry.createScenario(id);
  const redActions = registry.getScenarioView(probe, "red").private.availableActions;
  const attacks = redActions.filter((action) => action !== "do_nothing");
  const blueChoices = registry.getScenarioView(
    (() => {
      const state = clone(probe);
      registry.applyScenarioAction(state, "red", attacks[0] || "do_nothing");
      return state;
    })(),
    "blue"
  ).availableActions || [];
  maxBlueChoices = Math.max(maxBlueChoices, blueChoices.length);
  for (const action of [...redActions, ...blueChoices]) {
    if (action.length > maxActionLabel) {
      maxActionLabel = action.length;
      maxActionLabelSample = `${id}:${action}`;
    }
  }

  if (id === "email-account-verification-001" || id === "suspicious-login-activity") {
    rows.push({ id, category, attacks, note: "specialised" });
    continue;
  }

  const direct = {};
  const adapted = {};
  const adaptationsByAttack = {};
  for (const attack of attacks) {
    const state = registry.createScenario(id);
    registry.applyScenarioAction(state, "red", attack);
    const responses = registry.getScenarioView(state, "blue").availableActions;
    direct[attack] = stopsFor(state, responses);

    const investigated = clone(state);
    registry.applyScenarioAction(investigated, "blue", "investigate");
    const adaptations = registry.getScenarioView(investigated, "red").private.availableActions
      .filter((action) => action !== "do_nothing");
    adaptationsByAttack[attack] = adaptations;
    adapted[attack] = {};
    for (const adaptation of adaptations) {
      const next = clone(investigated);
      registry.applyScenarioAction(next, "red", adaptation);
      adapted[attack][adaptation] = stopsFor(
        next,
        registry.getScenarioView(next, "blue").availableActions
      );
    }
  }

  const directSets = attacks.map((attack) => JSON.stringify(direct[attack]));
  const sharedDirect = directSets.every((value) => value === directSets[0]);
  const adaptationCounts = [...new Set(attacks.map((attack) => adaptationsByAttack[attack].length))];
  rows.push({
    id,
    category,
    attacks,
    direct,
    adapted,
    sharedDirect,
    adaptationCounts,
    blueChoices: blueChoices.length
  });
}

const shared = rows.filter((row) => row.sharedDirect);
const distinct = rows.filter((row) => row.sharedDirect === false);
const noAdaptations = rows.filter((row) => row.adaptationCounts
  && row.adaptationCounts.every((count) => count === 0));

console.log(JSON.stringify({
  counts: {
    scenarios: defs.length,
    generic: generic.length,
    categories: Object.keys(categoryCounts).length,
    sharedDirectStop: shared.length,
    distinctDirectStops: distinct.length,
    noAdaptations: noAdaptations.length,
    maxBlueChoices,
    maxActionLabelLength: maxActionLabel,
    maxActionLabelSample
  },
  sharedDirect: shared.map((row) => ({ id: row.id, stop: row.direct[row.attacks[0]] })),
  distinctDirect: distinct.map((row) => ({ id: row.id, direct: row.direct })),
  categoryCounts
}, null, 2));
