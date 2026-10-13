const { createScenarioModule } = require("../scenarioModule");
const definition = require("../../scenarios/backup-integrity.json");

const rules = {
  "redActions": [
    "do_nothing",
    "alter_backup_index",
    "delete_recovery_copy"
  ],
  "blueActions": [
    "investigate",
    "protect_backup",
    "start_recovery_check",
    "ignore"
  ],
  "blueResponses": [
    "protect_backup",
    "start_recovery_check",
    "ignore"
  ],
  "attackActions": [
    "alter_backup_index",
    "delete_recovery_copy"
  ],
  "defensiveActions": [
    "protect_backup",
    "start_recovery_check"
  ],
  "unavailableBlueActionsByRedAction": {
    "alter_backup_index": [
      "protect_backup"
    ],
    "delete_recovery_copy": [
      "start_recovery_check"
    ]
  }
};

module.exports = {
  id: definition.id,
  category: definition.category,
  ...createScenarioModule({ definition, rules })
};
