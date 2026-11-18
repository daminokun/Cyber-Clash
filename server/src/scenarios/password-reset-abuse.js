const { createScenarioModule } = require("../scenarioModule");
const definition = require("../../scenarios/password-reset-abuse.json");

// Locking recovery stops reset loops; resetting credentials contains the recovery-target follow-up.
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
  "redAdaptationActions": [
    "do_nothing",
    "switch_recovery_channel"
  ],
  "stoppingDefensesByRedAction": {
    "trigger_reset_loop": [
      "lock_recovery"
    ],
    "change_recovery_target": [
      "reset_credentials"
    ]
  },
  "adaptedDefensesByRedAction": {
    "trigger_reset_loop": [
      "reset_credentials"
    ],
    "change_recovery_target": [
      "lock_recovery"
    ]
  }
};

module.exports = {
  id: definition.id,
  category: definition.category,
  ...createScenarioModule({ definition, rules })
};
