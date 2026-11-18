const { createScenarioModule } = require("../scenarioModule");
const definition = require("../../scenarios/rogue-browser-extension.json");

// Removing the extension stops the data collector; disabling extensions contains the hidden-permission follow-up.
const rules = {
  "redActions": [
    "do_nothing",
    "bundle_data_collector",
    "hide_permissions"
  ],
  "blueActions": [
    "investigate",
    "disable_extension",
    "remove_extension",
    "ignore"
  ],
  "blueResponses": [
    "disable_extension",
    "remove_extension",
    "ignore"
  ],
  "attackActions": [
    "bundle_data_collector",
    "hide_permissions"
  ],
  "defensiveActions": [
    "disable_extension",
    "remove_extension"
  ],
  "redAdaptationActions": [
    "do_nothing",
    "rename_extension"
  ],
  "stoppingDefensesByRedAction": {
    "bundle_data_collector": [
      "remove_extension"
    ],
    "hide_permissions": [
      "disable_extension"
    ]
  },
  "adaptedDefensesByRedAction": {
    "bundle_data_collector": [
      "disable_extension"
    ],
    "hide_permissions": [
      "remove_extension"
    ]
  }
};

module.exports = {
  id: definition.id,
  category: definition.category,
  ...createScenarioModule({ definition, rules })
};
