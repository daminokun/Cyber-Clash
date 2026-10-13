const { createScenarioModule } = require("../scenarioModule");
const definition = require("../../scenarios/web-form-injection.json");

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
  "unavailableBlueActionsByRedAction": {
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
