const { createScenarioModule } = require("../scenarioModule");
const definition = require("../../scenarios/lateral-movement.json");

// Resetting privileged accounts invalidates stolen hashes; segmenting the network stops relayed sessions. The follow-up uses a cached ticket, so the other response is needed.
const rules = {
  "redActions": [
    "do_nothing",
    "pass_the_hash",
    "smb_relay"
  ],
  "blueActions": [
    "investigate",
    "reset_privileged_accounts",
    "segment_network",
    "ignore"
  ],
  "blueResponses": [
    "reset_privileged_accounts",
    "segment_network",
    "ignore"
  ],
  "attackActions": [
    "pass_the_hash",
    "smb_relay"
  ],
  "defensiveActions": [
    "reset_privileged_accounts",
    "segment_network"
  ],
  "redAdaptationActions": [
    "do_nothing",
    "reuse_cached_ticket"
  ],
  "stoppingDefensesByRedAction": {
    "pass_the_hash": [
      "reset_privileged_accounts"
    ],
    "smb_relay": [
      "segment_network"
    ]
  },
  "adaptedDefensesByRedAction": {
    "pass_the_hash": [
      "segment_network"
    ],
    "smb_relay": [
      "reset_privileged_accounts"
    ]
  }
};

module.exports = {
  id: definition.id,
  category: definition.category,
  ...createScenarioModule({ definition, rules })
};
