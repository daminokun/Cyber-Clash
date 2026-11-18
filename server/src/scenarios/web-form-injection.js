const { createScenarioModule } = require("../scenarioModule");
const definition = require("../../scenarios/web-form-injection.json");

// Enabling validation stops crafted input; blocking the source contains the follow-up vector.
const rules = {
  "redActions": [
    "do_nothing",
    "send_crafted_input",
    "bypass_validation"
  ],
  "blueActions": [
    "investigate",
    "block_source",
    "enable_validation",
    "ignore"
  ],
  "blueResponses": [
    "block_source",
    "enable_validation",
    "ignore"
  ],
  "attackActions": [
    "send_crafted_input",
    "bypass_validation"
  ],
  "defensiveActions": [
    "block_source",
    "enable_validation"
  ],
  "redAdaptationActions": [
    "do_nothing",
    "use_encoded_payload"
  ],
  "stoppingDefensesByRedAction": {
    "send_crafted_input": [
      "enable_validation"
    ],
    "bypass_validation": [
      "block_source"
    ]
  },
  "adaptedDefensesByRedAction": {
    "send_crafted_input": [
      "block_source"
    ],
    "bypass_validation": [
      "enable_validation"
    ]
  }
};

module.exports = {
  id: definition.id,
  category: definition.category,
  ...createScenarioModule({ definition, rules })
};
