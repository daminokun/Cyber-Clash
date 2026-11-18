const { createScenarioModule } = require("../scenarioModule");
const definition = require("../../scenarios/api-key-exposure.json");

// Revoking the exposed key contains both misuse paths; removing the public file contains the follow-up vector.
const rules = {
  "redActions": [
    "do_nothing",
    "reuse_exposed_key",
    "hide_key_usage"
  ],
  "blueActions": [
    "investigate",
    "revoke_key",
    "remove_public_file",
    "ignore"
  ],
  "blueResponses": [
    "revoke_key",
    "remove_public_file",
    "ignore"
  ],
  "attackActions": [
    "reuse_exposed_key",
    "hide_key_usage"
  ],
  "defensiveActions": [
    "revoke_key",
    "remove_public_file"
  ],
  "redAdaptationActions": [
    "do_nothing",
    "redirect_key_use",
    "rotate_target"
  ],
  "stoppingDefensesByRedAction": {
    "reuse_exposed_key": [
      "revoke_key"
    ],
    "hide_key_usage": [
      "revoke_key"
    ]
  },
  "adaptedDefensesByRedAction": {
    "reuse_exposed_key": [
      "remove_public_file"
    ],
    "hide_key_usage": [
      "remove_public_file"
    ]
  }
};

module.exports = {
  id: definition.id,
  category: definition.category,
  ...createScenarioModule({ definition, rules })
};
