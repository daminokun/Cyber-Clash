const { createScenarioModule } = require("../scenarioModule");
const definition = require("../../scenarios/data-exfiltration.json");

// Isolating the host stops bulk collection; blocking the transfer contains the split-transfer follow-up.
const rules = {
  "redActions": [
    "do_nothing",
    "archive_sensitive_data",
    "split_transfer"
  ],
  "blueActions": [
    "investigate",
    "block_transfer",
    "isolate_host",
    "ignore"
  ],
  "blueResponses": [
    "block_transfer",
    "isolate_host",
    "ignore"
  ],
  "attackActions": [
    "archive_sensitive_data",
    "split_transfer"
  ],
  "defensiveActions": [
    "block_transfer",
    "isolate_host"
  ],
  "redAdaptationActions": [
    "do_nothing",
    "route_transfer_through_proxy"
  ],
  "stoppingDefensesByRedAction": {
    "archive_sensitive_data": [
      "isolate_host"
    ],
    "split_transfer": [
      "block_transfer"
    ]
  },
  "adaptedDefensesByRedAction": {
    "archive_sensitive_data": [
      "block_transfer"
    ],
    "split_transfer": [
      "isolate_host"
    ]
  }
};

module.exports = {
  id: definition.id,
  category: definition.category,
  ...createScenarioModule({ definition, rules })
};
