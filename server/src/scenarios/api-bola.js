const { createScenarioModule } = require("../scenarioModule");
const definition = require("../../scenarios/api-bola.json");

// Object-level authorization blocks record enumeration; revoking the token stops replay. Rotating the token scope changes the access path, so the other response is needed.
const rules = {
  "redActions": [
    "do_nothing",
    "enumerate_object_ids",
    "replay_valid_token"
  ],
  "blueActions": [
    "investigate",
    "enforce_object_checks",
    "revoke_token",
    "ignore"
  ],
  "blueResponses": [
    "enforce_object_checks",
    "revoke_token",
    "ignore"
  ],
  "attackActions": [
    "enumerate_object_ids",
    "replay_valid_token"
  ],
  "defensiveActions": [
    "enforce_object_checks",
    "revoke_token"
  ],
  "redAdaptationActions": [
    "do_nothing",
    "rotate_token_scope"
  ],
  "stoppingDefensesByRedAction": {
    "enumerate_object_ids": [
      "enforce_object_checks"
    ],
    "replay_valid_token": [
      "revoke_token"
    ]
  },
  "adaptedDefensesByRedAction": {
    "enumerate_object_ids": [
      "revoke_token"
    ],
    "replay_valid_token": [
      "enforce_object_checks"
    ]
  }
};

module.exports = {
  id: definition.id,
  category: definition.category,
  ...createScenarioModule({ definition, rules })
};
