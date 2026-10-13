const { createScenarioModule } = require("../scenarioModule");
const definition = require("../../scenarios/data-exfiltration.json");

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
  "unavailableBlueActionsByRedAction": {
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
