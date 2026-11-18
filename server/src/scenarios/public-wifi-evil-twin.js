const { createScenarioModule } = require("../scenarioModule");
const definition = require("../../scenarios/public-wifi-evil-twin.json");

// Removing the access point stops the cloned SSID; warning users contains the redirected-client follow-up.
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
  "redAdaptationActions": [
    "do_nothing",
    "move_to_rogue_access_point"
  ],
  "stoppingDefensesByRedAction": {
    "clone_network_name": [
      "remove_access_point"
    ],
    "redirect_clients": [
      "warn_users"
    ]
  },
  "adaptedDefensesByRedAction": {
    "clone_network_name": [
      "warn_users"
    ],
    "redirect_clients": [
      "remove_access_point"
    ]
  }
};

module.exports = {
  id: definition.id,
  category: definition.category,
  ...createScenarioModule({ definition, rules })
};
