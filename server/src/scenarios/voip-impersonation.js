const { createScenarioModule } = require("../scenarioModule");
const definition = require("../../scenarios/voip-impersonation.json");

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
  "unavailableBlueActionsByRedAction": {
    "impersonate_helpdesk": [
      "end_call"
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
