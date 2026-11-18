const { createScenarioModule } = require("../scenarioModule");
const definition = require("../../scenarios/bluetooth-device-pairing.json");

// Disabling Bluetooth contains impersonated peripherals; denying pairing contains the follow-up vector.
const rules = {
  "redActions": [
    "do_nothing",
    "masquerade_peripheral",
    "request_pairing"
  ],
  "blueActions": [
    "investigate",
    "deny_pairing",
    "disable_bluetooth",
    "ignore"
  ],
  "blueResponses": [
    "deny_pairing",
    "disable_bluetooth",
    "ignore"
  ],
  "attackActions": [
    "masquerade_peripheral",
    "request_pairing"
  ],
  "defensiveActions": [
    "deny_pairing",
    "disable_bluetooth"
  ],
  "redAdaptationActions": [
    "do_nothing",
    "switch_device_identity"
  ],
  "stoppingDefensesByRedAction": {
    "masquerade_peripheral": [
      "disable_bluetooth"
    ],
    "request_pairing": [
      "deny_pairing"
    ]
  },
  "adaptedDefensesByRedAction": {
    "masquerade_peripheral": [
      "deny_pairing"
    ],
    "request_pairing": [
      "disable_bluetooth"
    ]
  }
};

module.exports = {
  id: definition.id,
  category: definition.category,
  ...createScenarioModule({ definition, rules })
};
