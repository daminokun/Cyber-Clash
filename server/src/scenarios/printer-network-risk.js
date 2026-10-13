const { createScenarioModule } = require("../scenarioModule");
const definition = require("../../scenarios/printer-network-risk.json");

const rules = {
  "redActions": [
    "do_nothing",
    "enable_remote_access",
    "change_admin_route"
  ],
  "blueActions": [
    "investigate",
    "isolate_printer",
    "restore_configuration",
    "ignore"
  ],
  "blueResponses": [
    "isolate_printer",
    "restore_configuration",
    "ignore"
  ],
  "attackActions": [
    "enable_remote_access",
    "change_admin_route"
  ],
  "defensiveActions": [
    "isolate_printer",
    "restore_configuration"
  ],
  "unavailableBlueActionsByRedAction": {
    "enable_remote_access": [
      "isolate_printer"
    ],
    "change_admin_route": [
      "restore_configuration"
    ]
  }
};

module.exports = {
  id: definition.id,
  category: definition.category,
  ...createScenarioModule({ definition, rules })
};
