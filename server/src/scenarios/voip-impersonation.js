const { createScenarioModule } = require("../scenarioModule");
const definition = require("../../scenarios/voip-impersonation.json");

// Ending the call stops the helpdesk impersonation and the secret request; reporting contains the follow-up vector.
const rules = {
  "redActions": [
    "do_nothing",
    "impersonate_helpdesk",
    "request_secret"
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
    "impersonate_helpdesk",
    "request_secret"
  ],
  "defensiveActions": [
    "end_call",
    "report"
  ],
  "redAdaptationActions": [
    "do_nothing",
    "route_to_second_operator"
  ],
  "stoppingDefensesByRedAction": {
    "impersonate_helpdesk": [
      "end_call"
    ],
    "request_secret": [
      "end_call"
    ]
  },
  "adaptedDefensesByRedAction": {
    "impersonate_helpdesk": [
      "report"
    ],
    "request_secret": [
      "report"
    ]
  }
};

module.exports = {
  id: definition.id,
  category: definition.category,
  ...createScenarioModule({ definition, rules })
};
