const { createScenarioModule } = require("../scenarioModule");
const definition = require("../../scenarios/public-wifi-evil-twin.json");

const rules = {
  "redActions": [
    "do_nothing",
    "clone_network_name",
    "redirect_clients"
  ],
  "blueActions": [
    "investigate",
    "remove_access_point",
    "warn_users",
    "ignore"
  ],
  "blueResponses": [
    "remove_access_point",
    "warn_users",
    "ignore"
  ],
  "attackActions": [
    "clone_network_name",
    "redirect_clients"
  ],
  "defensiveActions": [
    "remove_access_point",
    "warn_users"
  ],
  "unavailableBlueActionsByRedAction": {
    "clone_network_name": [
      "remove_access_point"
    ],
    "redirect_clients": [
      "warn_users"
    ]
  }
};

module.exports = {
  id: definition.id,
  category: definition.category,
  ...createScenarioModule({ definition, rules })
};
