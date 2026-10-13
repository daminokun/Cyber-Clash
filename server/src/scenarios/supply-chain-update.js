const { createScenarioModule } = require("../scenarioModule");
const definition = require("../../scenarios/supply-chain-update.json");

const rules = {
  "redActions": [
    "do_nothing",
    "tamper_update",
    "imitate_publisher"
  ],
  "blueActions": [
    "investigate",
    "reject_update",
    "isolate_host",
    "ignore"
  ],
  "blueResponses": [
    "reject_update",
    "isolate_host",
    "ignore"
  ],
  "attackActions": [
    "tamper_update",
    "imitate_publisher"
  ],
  "defensiveActions": [
    "reject_update",
    "isolate_host"
  ],
  "unavailableBlueActionsByRedAction": {
    "tamper_update": [
      "reject_update"
    ],
    "imitate_publisher": [
      "isolate_host"
    ]
  }
};

module.exports = {
  id: definition.id,
  category: definition.category,
  ...createScenarioModule({ definition, rules })
};
