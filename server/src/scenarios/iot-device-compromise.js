const { createScenarioModule } = require("../scenarioModule");
const definition = require("../../scenarios/iot-device-compromise.json");

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
  "unavailableBlueActionsByRedAction": {
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
