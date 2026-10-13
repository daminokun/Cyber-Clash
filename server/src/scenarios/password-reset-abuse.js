const { createScenarioModule } = require("../scenarioModule");
const definition = require("../../scenarios/password-reset-abuse.json");

const rules = {
  "redActions": [
    "do_nothing",
    "trigger_reset_loop",
    "change_recovery_target"
  ],
  "blueActions": [
    "investigate",
    "lock_recovery",
    "reset_credentials",
    "ignore"
  ],
  "blueResponses": [
    "lock_recovery",
    "reset_credentials",
    "ignore"
  ],
  "attackActions": [
    "trigger_reset_loop",
    "change_recovery_target"
  ],
  "defensiveActions": [
    "lock_recovery",
    "reset_credentials"
  ],
  "unavailableBlueActionsByRedAction": {
    "trigger_reset_loop": [
      "lock_recovery"
    ],
    "change_recovery_target": [
      "reset_credentials"
    ]
  }
};

module.exports = {
  id: definition.id,
  category: definition.category,
  ...createScenarioModule({ definition, rules })
};
