const { createScenarioModule } = require("../scenarioModule");
const definition = require("../../scenarios/ddos-extortion.json");

// Rate limiting absorbs a login flood; traffic scrubbing removes amplified DNS traffic. Rotating the source pool shifts the attack, so the other response contains it.
const rules = {
  "redActions": [
    "do_nothing",
    "flood_login_service",
    "amplify_dns_requests"
  ],
  "blueActions": [
    "investigate",
    "enable_rate_limiting",
    "scrub_traffic",
    "ignore"
  ],
  "blueResponses": [
    "enable_rate_limiting",
    "scrub_traffic",
    "ignore"
  ],
  "attackActions": [
    "flood_login_service",
    "amplify_dns_requests"
  ],
  "defensiveActions": [
    "enable_rate_limiting",
    "scrub_traffic"
  ],
  "redAdaptationActions": [
    "do_nothing",
    "rotate_source_pool"
  ],
  "stoppingDefensesByRedAction": {
    "flood_login_service": [
      "enable_rate_limiting"
    ],
    "amplify_dns_requests": [
      "scrub_traffic"
    ]
  },
  "adaptedDefensesByRedAction": {
    "flood_login_service": [
      "scrub_traffic"
    ],
    "amplify_dns_requests": [
      "enable_rate_limiting"
    ]
  }
};

module.exports = {
  id: definition.id,
  category: definition.category,
  ...createScenarioModule({ definition, rules })
};
