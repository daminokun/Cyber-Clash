const { createScenarioModule } = require("../scenarioModule");
const definition = require("../../scenarios/usb-device-threat.json");

const rules = {
  "redActions": [
    "do_nothing",
    "disguise_usb_label",
    "add_malicious_file"
  ],
  "blueActions": [
    "investigate",
    "quarantine_device",
    "report",
    "ignore"
  ],
  "blueResponses": [
    "quarantine_device",
    "report",
    "ignore"
  ],
  "attackActions": [
    "disguise_usb_label",
    "add_malicious_file"
  ],
  "defensiveActions": [
    "quarantine_device",
    "report"
  ],
  "unavailableBlueActionsByRedAction": {
    "disguise_usb_label": [
      "quarantine_device"
    ]
  }
};

module.exports = {
  id: definition.id,
  category: definition.category,
  ...createScenarioModule({ definition, rules })
};
