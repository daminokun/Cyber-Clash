const { createScenarioModule } = require("../scenarioModule");
const definition = require("../../scenarios/calendar-invite-abuse.json");

const rules = {
  "redActions": [
    "do_nothing",
    "insert_fake_link",
    "create_urgency"
  ],
  "blueActions": [
    "investigate",
    "delete_invite",
    "block_sender",
    "ignore"
  ],
  "blueResponses": [
    "delete_invite",
    "block_sender",
    "ignore"
  ],
  "attackActions": [
    "insert_fake_link",
    "create_urgency"
  ],
  "defensiveActions": [
    "delete_invite",
    "block_sender"
  ],
  "unavailableBlueActionsByRedAction": {
    "insert_fake_link": [
      "delete_invite"
    ],
    "create_urgency": [
      "block_sender"
    ]
  }
};

module.exports = {
  id: definition.id,
  category: definition.category,
  ...createScenarioModule({ definition, rules })
};
