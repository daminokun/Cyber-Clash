const { createScenarioModule } = require("../scenarioModule");
const definition = require("../../scenarios/network-port-scan.json");

// Blocking traffic stops the scan; isolating the host contains the hidden-traffic follow-up.
const rules = {
  "redActions": [
    "do_nothing",
    "port_scan",
    "hide_in_normal_traffic"
  ],
  "blueActions": [
    "investigate",
    "isolate_host",
    "block_traffic",
    "ignore"
  ],
  "blueResponses": [
    "isolate_host",
    "block_traffic",
    "ignore"
  ],
  "attackActions": [
    "port_scan",
    "hide_in_normal_traffic"
  ],
  "defensiveActions": [
    "isolate_host",
    "block_traffic"
  ],
  "redAdaptationActions": [
    "do_nothing",
    "scan_from_proxy"
  ],
  "stoppingDefensesByRedAction": {
    "port_scan": [
      "block_traffic"
    ],
    "hide_in_normal_traffic": [
      "isolate_host"
    ]
  },
  "adaptedDefensesByRedAction": {
    "port_scan": [
      "isolate_host"
    ],
    "hide_in_normal_traffic": [
      "block_traffic"
    ]
  }
};

module.exports = {
  id: definition.id,
  category: definition.category,
  ...createScenarioModule({ definition, rules })
};
