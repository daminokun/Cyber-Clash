const { createScenarioModule } = require("../scenarioModule");
const definition = require("../../scenarios/cloud-permission-abuse.json");

// Locking the compromised account stops the external add; revoking access contains the follow-up vector.
const rules = {
  "redActions": [
    "do_nothing",
    "add_external_account",
    "escalate_permissions"
  ],
  "blueActions": [
    "investigate",
    "revoke_access",
    "lock_account",
    "ignore"
  ],
  "blueResponses": [
    "revoke_access",
    "lock_account",
    "ignore"
  ],
  "attackActions": [
    "add_external_account",
    "escalate_permissions"
  ],
  "defensiveActions": [
    "revoke_access",
    "lock_account"
  ],
  "redAdaptationActions": [
    "do_nothing",
    "create_shadow_account"
  ],
  "stoppingDefensesByRedAction": {
    "add_external_account": [
      "lock_account"
    ],
    "escalate_permissions": [
      "revoke_access"
    ]
  },
  "adaptedDefensesByRedAction": {
    "add_external_account": [
      "revoke_access"
    ],
    "escalate_permissions": [
      "lock_account"
    ]
  }
};

module.exports = {
  id: definition.id,
  category: definition.category,
  ...createScenarioModule({ definition, rules })
};
