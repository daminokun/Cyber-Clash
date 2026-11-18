const { createScenarioModule } = require("../scenarioModule");
const definition = require("../../scenarios/qr-code-phishing.json");

// Removing the poster stops the replaced QR code; blocking the destination contains the urgency follow-up.
const rules = {
  "redActions": [
    "do_nothing",
    "replace_qr_code",
    "add_urgent_message"
  ],
  "blueActions": [
    "investigate",
    "remove_poster",
    "block_destination",
    "ignore"
  ],
  "blueResponses": [
    "remove_poster",
    "block_destination",
    "ignore"
  ],
  "attackActions": [
    "replace_qr_code",
    "add_urgent_message"
  ],
  "defensiveActions": [
    "remove_poster",
    "block_destination"
  ],
  "redAdaptationActions": [
    "do_nothing",
    "replace_destination"
  ],
  "stoppingDefensesByRedAction": {
    "replace_qr_code": [
      "remove_poster"
    ],
    "add_urgent_message": [
      "block_destination"
    ]
  },
  "adaptedDefensesByRedAction": {
    "replace_qr_code": [
      "block_destination"
    ],
    "add_urgent_message": [
      "remove_poster"
    ]
  }
};

module.exports = {
  id: definition.id,
  category: definition.category,
  ...createScenarioModule({ definition, rules })
};
