const { createScenarioModule } = require("../scenarioModule");
const definition = require("../../scenarios/cloud-permission-abuse.json");

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
  "unavailableBlueActionsByRedAction": {
    "add_external_account": [
      "revoke_access"
    ],
    "escalate_permissions": [
      "lock_account"
    ]
  },
};

module.exports = {
  id: definition.id,
  category: definition.category,
  ...createScenarioModule({ definition, rules })
};
