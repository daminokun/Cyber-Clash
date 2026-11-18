const { createScenarioModule } = require("../scenarioModule");
const definition = require("../../scenarios/ransomware-warning.json");

// Isolating the server stops encryption and restore-point deletion; restoring from backup contains the follow-up vector.
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
    "move_to_unbacked_share",
    "accelerate_encryption"
  ],
  "stoppingDefensesByRedAction": {
    "encrypt_files": [
      "isolate_server"
    ],
    "delete_restore_points": [
      "isolate_server"
    ]
  },
  "adaptedDefensesByRedAction": {
    "encrypt_files": [
      "restore_backup"
    ],
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
