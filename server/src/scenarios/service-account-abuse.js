const { createScenarioModule } = require("../scenarioModule");
const definition = require("../../scenarios/service-account-abuse.json");

const rules = {
  "redActions": [
    "do_nothing",
    "reuse_service_identity",
    "expand_service_access"
  ],
  "blueActions": [
    "investigate",
    "disable_service_account",
    "restrict_permissions",
    "ignore"
  ],
  "blueResponses": [
    "disable_service_account",
    "restrict_permissions",
    "ignore"
  ],
  "attackActions": [
    "reuse_service_identity",
    "expand_service_access"
  ],
  "defensiveActions": [
    "disable_service_account",
    "restrict_permissions"
  ],
  "unavailableBlueActionsByRedAction": {
    "reuse_service_identity": [
      "disable_service_account"
    ],
    "expand_service_access": [
      "restrict_permissions"
    ]
  }
};

module.exports = {
  id: definition.id,
  category: definition.category,
  ...createScenarioModule({ definition, rules })
};
