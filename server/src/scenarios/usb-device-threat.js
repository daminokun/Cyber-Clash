const { createScenarioModule } = require("../scenarioModule");
const definition = require("../../scenarios/usb-device-threat.json");

// Quarantining the device stops the disguised label and the malicious file; reporting contains the follow-up vector.
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
  "redAdaptationActions": [
    "do_nothing",
    "swap_device"
  ],
  "stoppingDefensesByRedAction": {
    "disguise_usb_label": [
      "quarantine_device"
    ],
    "add_malicious_file": [
      "quarantine_device"
    ]
  },
  "adaptedDefensesByRedAction": {
    "disguise_usb_label": [
      "report"
    ],
    "add_malicious_file": [
      "report"
    ]
  }
};

module.exports = {
  id: definition.id,
  category: definition.category,
  ...createScenarioModule({ definition, rules })
};
