const { createScenarioModule } = require("../scenarioModule");
const definition = require("../../scenarios/iot-device-compromise.json");

// Moving the device to the guest network stops internal probing; quarantining it contains the follow-up.
const rules = {
  "redActions": [
    "do_nothing",
    "probe_internal_services",
    "hide_device_identity"
  ],
  "blueActions": [
    "investigate",
    "quarantine_device",
    "move_to_guest_network",
    "ignore"
  ],
  "blueResponses": [
    "quarantine_device",
    "move_to_guest_network",
    "ignore"
  ],
  "attackActions": [
    "probe_internal_services",
    "hide_device_identity"
  ],
  "defensiveActions": [
    "quarantine_device",
    "move_to_guest_network"
  ],
  "redAdaptationActions": [
    "do_nothing",
    "pivot_to_second_device"
  ],
  "stoppingDefensesByRedAction": {
    "probe_internal_services": [
      "move_to_guest_network"
    ],
    "hide_device_identity": [
      "quarantine_device"
    ]
  },
  "adaptedDefensesByRedAction": {
    "probe_internal_services": [
      "quarantine_device"
    ],
    "hide_device_identity": [
      "move_to_guest_network"
    ]
  }
};

module.exports = {
  id: definition.id,
  category: definition.category,
  ...createScenarioModule({ definition, rules })
};
