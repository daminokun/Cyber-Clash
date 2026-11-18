const { createScenarioModule } = require("../scenarioModule");
const definition = require("../../scenarios/badge-cloning.json");

// Disabling the badge stops the clone; challenging the visitor stops tailgating. Reusing an old badge evades the disable, so the other response is needed.
const rules = {
  "redActions": [
    "do_nothing",
    "clone_badge",
    "tailgate_entry"
  ],
  "blueActions": [
    "investigate",
    "disable_badge",
    "challenge_visitor",
    "ignore"
  ],
  "blueResponses": [
    "disable_badge",
    "challenge_visitor",
    "ignore"
  ],
  "attackActions": [
    "clone_badge",
    "tailgate_entry"
  ],
  "defensiveActions": [
    "disable_badge",
    "challenge_visitor"
  ],
  "redAdaptationActions": [
    "do_nothing",
    "reuse_old_badge"
  ],
  "stoppingDefensesByRedAction": {
    "clone_badge": [
      "disable_badge"
    ],
    "tailgate_entry": [
      "challenge_visitor"
    ]
  },
  "adaptedDefensesByRedAction": {
    "clone_badge": [
      "challenge_visitor"
    ],
    "tailgate_entry": [
      "disable_badge"
    ]
  }
};

module.exports = {
  id: definition.id,
  category: definition.category,
  ...createScenarioModule({ definition, rules })
};
