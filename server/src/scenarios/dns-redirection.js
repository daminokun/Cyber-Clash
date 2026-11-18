const { createScenarioModule } = require("../scenarioModule");
const definition = require("../../scenarios/dns-redirection.json");

// Flushing the cache clears the poisoned response; blocking the destination contains the redirected subset.
const rules = {
  "redActions": [
    "do_nothing",
    "alter_dns_response",
    "redirect_subset"
  ],
  "blueActions": [
    "investigate",
    "flush_dns_cache",
    "block_destination",
    "ignore"
  ],
  "blueResponses": [
    "flush_dns_cache",
    "block_destination",
    "ignore"
  ],
  "attackActions": [
    "alter_dns_response",
    "redirect_subset"
  ],
  "defensiveActions": [
    "flush_dns_cache",
    "block_destination"
  ],
  "redAdaptationActions": [
    "do_nothing",
    "rotate_dns_target"
  ],
  "stoppingDefensesByRedAction": {
    "alter_dns_response": [
      "flush_dns_cache"
    ],
    "redirect_subset": [
      "block_destination"
    ]
  },
  "adaptedDefensesByRedAction": {
    "alter_dns_response": [
      "block_destination"
    ],
    "redirect_subset": [
      "flush_dns_cache"
    ]
  }
};

module.exports = {
  id: definition.id,
  category: definition.category,
  ...createScenarioModule({ definition, rules })
};
