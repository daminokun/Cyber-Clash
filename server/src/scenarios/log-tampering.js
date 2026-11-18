const { createScenarioModule } = require("../scenarioModule");
const definition = require("../../scenarios/log-tampering.json");

// Protecting the logs stops erasing and delivery delays; reviewing the account contains the follow-up vector.
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
  "redAdaptationActions": [
    "do_nothing",
    "forge_audit_trail"
  ],
  "stoppingDefensesByRedAction": {
    "erase_audit_events": [
      "protect_logs"
    ],
    "delay_log_delivery": [
      "protect_logs"
    ]
  },
  "adaptedDefensesByRedAction": {
    "erase_audit_events": [
      "review_account"
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
