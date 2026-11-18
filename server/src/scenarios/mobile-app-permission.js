const { createScenarioModule } = require("../scenarioModule");
const definition = require("../../scenarios/mobile-app-permission.json");

// Removing the app stops data collection; denying the permission contains the follow-up vector.
const rules = {
  "redActions": [
    "do_nothing",
    "add_data_collection",
    "hide_permission_reason"
  ],
  "blueActions": [
    "investigate",
    "deny_permission",
    "remove_application",
    "ignore"
  ],
  "blueResponses": [
    "deny_permission",
    "remove_application",
    "ignore"
  ],
  "attackActions": [
    "add_data_collection",
    "hide_permission_reason"
  ],
  "defensiveActions": [
    "deny_permission",
    "remove_application"
  ],
  "redAdaptationActions": [
    "do_nothing",
    "request_minimal_permission"
  ],
  "stoppingDefensesByRedAction": {
    "add_data_collection": [
      "remove_application"
    ],
    "hide_permission_reason": [
      "deny_permission"
    ]
  },
  "adaptedDefensesByRedAction": {
    "add_data_collection": [
      "deny_permission"
    ],
    "hide_permission_reason": [
      "remove_application"
    ]
  }
};

module.exports = {
  id: definition.id,
  category: definition.category,
  ...createScenarioModule({ definition, rules })
};
