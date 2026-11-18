const { createScenarioModule } = require("../scenarioModule");
const definition = require("../../scenarios/cross-site-scripting.json");

// Output sanitisation neutralises stored scripts; blocking the payload source stops reflected links. Splitting the payload evades filters, so the other response is needed.
const rules = {
  "redActions": [
    "do_nothing",
    "stored_script_payload",
    "reflected_script_link"
  ],
  "blueActions": [
    "investigate",
    "sanitize_output",
    "block_payload_source",
    "ignore"
  ],
  "blueResponses": [
    "sanitize_output",
    "block_payload_source",
    "ignore"
  ],
  "attackActions": [
    "stored_script_payload",
    "reflected_script_link"
  ],
  "defensiveActions": [
    "sanitize_output",
    "block_payload_source"
  ],
  "redAdaptationActions": [
    "do_nothing",
    "split_payload"
  ],
  "stoppingDefensesByRedAction": {
    "stored_script_payload": [
      "sanitize_output"
    ],
    "reflected_script_link": [
      "block_payload_source"
    ]
  },
  "adaptedDefensesByRedAction": {
    "stored_script_payload": [
      "block_payload_source"
    ],
    "reflected_script_link": [
      "sanitize_output"
    ]
  }
};

module.exports = {
  id: definition.id,
  category: definition.category,
  ...createScenarioModule({ definition, rules })
};
