const { createScenarioModule } = require("../scenarioModule");
const definition = require("../../scenarios/calendar-invite-abuse.json");

// Deleting the invite removes the malicious link; blocking the sender contains the follow-up vector.
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
  "redAdaptationActions": [
    "do_nothing",
    "redirect_recipient"
  ],
  "stoppingDefensesByRedAction": {
    "insert_fake_link": [
      "delete_invite"
    ],
    "create_urgency": [
      "block_sender"
    ]
  },
  "adaptedDefensesByRedAction": {
    "insert_fake_link": [
      "block_sender"
    ],
    "create_urgency": [
      "delete_invite"
    ]
  }
};

module.exports = {
  id: definition.id,
  category: definition.category,
  ...createScenarioModule({ definition, rules })
};
