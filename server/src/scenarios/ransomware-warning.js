const { createScenarioModule } = require("../scenarioModule");
const definition = require("../../scenarios/ransomware-warning.json");

const rules = {
  "redActions": [
    "do_nothing",
    "encrypt_files",
    "delete_restore_points"
  ],
  "blueActions": [
    "investigate",
    "isolate_server",
    "restore_backup",
    "ignore"
  ],
  "blueResponses": [
    "isolate_server",
    "restore_backup",
    "ignore"
  ],
  "attackActions": [
    "encrypt_files",
    "delete_restore_points"
  ],
  "defensiveActions": [
    "isolate_server",
    "restore_backup"
  ],
  "redAdaptationActions": [
    "do_nothing",
    "change_tactic",
    "accelerate_encryption"
  ],
  "counteredDefensesByAdaptation": {
    "change_tactic": [
      "isolate_server"
    ],
    "accelerate_encryption": [
      "restore_backup"
    ]
  },
  "unavailableBlueActionsByRedAction": {
    "delete_restore_points": [
      "restore_backup"
    ]
  }
};

module.exports = {
  id: definition.id,
  category: definition.category,
  ...createScenarioModule({ definition, rules })
};
