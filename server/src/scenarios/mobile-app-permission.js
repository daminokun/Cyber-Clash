const { createScenarioModule } = require("../scenarioModule");
const definition = require("../../scenarios/mobile-app-permission.json");

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
  "unavailableBlueActionsByRedAction": {
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
