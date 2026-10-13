const { createScenarioModule } = require("../scenarioModule");
const definition = require("../../scenarios/insider-data-access.json");

const rules = {
  "redActions": [
    "do_nothing",
    "bulk_collect_records",
    "blend_with_normal_access"
  ],
  "blueActions": [
    "investigate",
    "suspend_account",
    "restrict_records",
    "ignore"
  ],
  "blueResponses": [
    "suspend_account",
    "restrict_records",
    "ignore"
  ],
  "attackActions": [
    "bulk_collect_records",
    "blend_with_normal_access"
  ],
  "defensiveActions": [
    "suspend_account",
    "restrict_records"
  ],
  "unavailableBlueActionsByRedAction": {
    "bulk_collect_records": [
      "suspend_account"
    ],
    "blend_with_normal_access": [
      "restrict_records"
    ]
  }
};

module.exports = {
  id: definition.id,
  category: definition.category,
  ...createScenarioModule({ definition, rules })
};
