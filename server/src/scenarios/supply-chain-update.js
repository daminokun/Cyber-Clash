const { createScenarioModule } = require("../scenarioModule");
const definition = require("../../scenarios/supply-chain-update.json");

// Rejecting the update stops tampering and publisher imitation; isolating the host contains the follow-up vector.
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
  "redAdaptationActions": [
    "do_nothing",
    "publish_hotfix"
  ],
  "stoppingDefensesByRedAction": {
    "tamper_update": [
      "reject_update"
    ],
    "imitate_publisher": [
      "reject_update"
    ]
  },
  "adaptedDefensesByRedAction": {
    "tamper_update": [
      "isolate_host"
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
