const { createScenarioModule } = require("../scenarioModule");
const definition = require("../../scenarios/dns-redirection.json");

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
  "unavailableBlueActionsByRedAction": {
    "alter_dns_response": [
      "flush_dns_cache"
    ],
    "redirect_subset": [
      "block_destination"
    ]
  }
};

module.exports = {
  id: definition.id,
  category: definition.category,
  ...createScenarioModule({ definition, rules })
};
