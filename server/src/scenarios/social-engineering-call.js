const { createScenarioModule } = require("../scenarioModule");
const definition = require("../../scenarios/social-engineering-call.json");

// Ending the call stops the impersonation and urgency pretext; reporting contains the follow-up vector.
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
  "redAdaptationActions": [
    "do_nothing",
    "switch_pretext"
  ],
  "stoppingDefensesByRedAction": {
    "impersonate_support": [
      "end_call"
    ],
    "create_urgency": [
      "end_call"
    ]
  },
  "adaptedDefensesByRedAction": {
    "impersonate_support": [
      "report"
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
