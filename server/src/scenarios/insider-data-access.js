const { createScenarioModule } = require("../scenarioModule");
const definition = require("../../scenarios/insider-data-access.json");

// Restricting records stops bulk collection; suspending the account contains the blended-access follow-up.
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
  "redAdaptationActions": [
    "do_nothing",
    "switch_account",
    "use_service_account"
  ],
  "stoppingDefensesByRedAction": {
    "bulk_collect_records": [
      "restrict_records"
    ],
    "blend_with_normal_access": [
      "suspend_account"
    ]
  },
  "adaptedDefensesByRedAction": {
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
