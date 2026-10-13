const { createScenarioModule } = require("../scenarioModule");
const definition = require("../../scenarios/log-tampering.json");

const rules = {
  "redActions": [
    "do_nothing",
    "erase_audit_events",
    "delay_log_delivery"
  ],
  "blueActions": [
    "investigate",
    "protect_logs",
    "review_account",
    "ignore"
  ],
  "blueResponses": [
    "protect_logs",
    "review_account",
    "ignore"
  ],
  "attackActions": [
    "erase_audit_events",
    "delay_log_delivery"
  ],
  "defensiveActions": [
    "protect_logs",
    "review_account"
  ],
  "unavailableBlueActionsByRedAction": {
    "erase_audit_events": [
      "protect_logs"
    ],
    "delay_log_delivery": [
      "review_account"
    ]
  }
};

module.exports = {
  id: definition.id,
  category: definition.category,
  ...createScenarioModule({ definition, rules })
};
