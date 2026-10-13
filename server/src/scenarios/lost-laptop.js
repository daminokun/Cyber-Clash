const { createScenarioModule } = require("../scenarioModule");
const definition = require("../../scenarios/lost-laptop.json");

const rules = {
  "redActions": [
    "do_nothing",
    "access_unlocked_device",
    "remove_security_tag"
  ],
  "blueActions": [
    "investigate",
    "lock_device",
    "revoke_sessions",
    "ignore"
  ],
  "blueResponses": [
    "lock_device",
    "revoke_sessions",
    "ignore"
  ],
  "attackActions": [
    "access_unlocked_device",
    "remove_security_tag"
  ],
  "defensiveActions": [
    "lock_device",
    "revoke_sessions"
  ],
  "unavailableBlueActionsByRedAction": {
    "access_unlocked_device": [
      "lock_device"
    ],
    "remove_security_tag": [
      "revoke_sessions"
    ]
  }
};

module.exports = {
  id: definition.id,
  category: definition.category,
  ...createScenarioModule({ definition, rules })
};
