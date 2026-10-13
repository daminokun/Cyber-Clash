const { createScenarioModule } = require("../scenarioModule");
const definition = require("../../scenarios/qr-code-phishing.json");

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
  "unavailableBlueActionsByRedAction": {
    "replace_qr_code": [
      "remove_poster"
    ],
    "add_urgent_message": [
      "block_destination"
    ]
  }
};

module.exports = {
  id: definition.id,
  category: definition.category,
  ...createScenarioModule({ definition, rules })
};
