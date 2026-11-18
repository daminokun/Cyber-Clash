const { createScenarioModule } = require("../scenarioModule");
const definition = require("../../scenarios/dns-tunneling.json");

// Sinkholing the domain stops DNS encoding; blocking DoH traffic closes the encrypted channel. Rotating the domain evades the sinkhole, so the other response is needed.
const rules = {
  "redActions": [
    "do_nothing",
    "encode_data_in_dns",
    "tunnel_over_doh"
  ],
  "blueActions": [
    "investigate",
    "sinkhole_domain",
    "block_doh_traffic",
    "ignore"
  ],
  "blueResponses": [
    "sinkhole_domain",
    "block_doh_traffic",
    "ignore"
  ],
  "attackActions": [
    "encode_data_in_dns",
    "tunnel_over_doh"
  ],
  "defensiveActions": [
    "sinkhole_domain",
    "block_doh_traffic"
  ],
  "redAdaptationActions": [
    "do_nothing",
    "rotate_domain"
  ],
  "stoppingDefensesByRedAction": {
    "encode_data_in_dns": [
      "sinkhole_domain"
    ],
    "tunnel_over_doh": [
      "block_doh_traffic"
    ]
  },
  "adaptedDefensesByRedAction": {
    "encode_data_in_dns": [
      "block_doh_traffic"
    ],
    "tunnel_over_doh": [
      "sinkhole_domain"
    ]
  }
};

module.exports = {
  id: definition.id,
  category: definition.category,
  ...createScenarioModule({ definition, rules })
};
