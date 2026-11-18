const { createScenarioModule } = require("../scenarioModule");
const definition = require("../../scenarios/credential-dumping.json");

// Isolating the endpoint stops memory dumping; rotating credentials invalidates anything already harvested. Repackaging the tool changes the vector, so the other response is needed.
const rules = {
  "redActions": [
    "do_nothing",
    "dump_lsass_memory",
    "harvest_browser_credentials"
  ],
  "blueActions": [
    "investigate",
    "isolate_endpoint",
    "rotate_credentials",
    "ignore"
  ],
  "blueResponses": [
    "isolate_endpoint",
    "rotate_credentials",
    "ignore"
  ],
  "attackActions": [
    "dump_lsass_memory",
    "harvest_browser_credentials"
  ],
  "defensiveActions": [
    "isolate_endpoint",
    "rotate_credentials"
  ],
  "redAdaptationActions": [
    "do_nothing",
    "use_signed_tool"
  ],
  "stoppingDefensesByRedAction": {
    "dump_lsass_memory": [
      "isolate_endpoint"
    ],
    "harvest_browser_credentials": [
      "rotate_credentials"
    ]
  },
  "adaptedDefensesByRedAction": {
    "dump_lsass_memory": [
      "rotate_credentials"
    ],
    "harvest_browser_credentials": [
      "isolate_endpoint"
    ]
  }
};

module.exports = {
  id: definition.id,
  category: definition.category,
  ...createScenarioModule({ definition, rules })
};
