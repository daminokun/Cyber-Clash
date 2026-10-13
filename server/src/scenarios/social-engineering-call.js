const { createScenarioModule } = require("../scenarioModule");
const definition = require("../../scenarios/social-engineering-call.json");

const rules = {
  "redActions": [
    "do_nothing",
    "impersonate_support",
    "create_urgency"
  ],
  "blueActions": [
    "investigate",
    "end_call",
    "report",
    "ignore"
  ],
  "blueResponses": [
    "end_call",
    "report",
    "ignore"
  ],
  "attackActions": [
    "impersonate_support",
    "create_urgency"
  ],
  "defensiveActions": [
    "end_call",
    "report"
  ],
  "unavailableBlueActionsByRedAction": {
    "impersonate_support": [
      "end_call"
    ],
    "create_urgency": [
      "report"
    ]
  }
};

module.exports = {
  id: definition.id,
  category: definition.category,
  ...createScenarioModule({ definition, rules })
};
