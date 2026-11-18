const { createScenarioModule } = require("../scenarioModule");
const definition = require("../../scenarios/sql-injection.json");

// Blocking the source stops direct UNION extraction; isolating the database contains blind inference. Encoding the payload evades the block, so the other response is needed.
const rules = {
  "redActions": [
    "do_nothing",
    "union_based_injection",
    "blind_boolean_injection"
  ],
  "blueActions": [
    "investigate",
    "block_source",
    "isolate_database",
    "ignore"
  ],
  "blueResponses": [
    "block_source",
    "isolate_database",
    "ignore"
  ],
  "attackActions": [
    "union_based_injection",
    "blind_boolean_injection"
  ],
  "defensiveActions": [
    "block_source",
    "isolate_database"
  ],
  "redAdaptationActions": [
    "do_nothing",
    "encode_payload"
  ],
  "stoppingDefensesByRedAction": {
    "union_based_injection": [
      "block_source"
    ],
    "blind_boolean_injection": [
      "isolate_database"
    ]
  },
  "adaptedDefensesByRedAction": {
    "union_based_injection": [
      "isolate_database"
    ],
    "blind_boolean_injection": [
      "block_source"
    ]
  }
};

module.exports = {
  id: definition.id,
  category: definition.category,
  ...createScenarioModule({ definition, rules })
};
