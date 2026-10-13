const { createScenarioModule } = require("../scenarioModule");
const definition = require("../../scenarios/mfa-fatigue.json");

const rules = {
  "redActions": [
    "do_nothing",
    "send_repeated_prompts",
    "imitate_support_message"
  ],
  "blueActions": [
    "investigate",
    "deny_prompts",
    "lock_account",
    "ignore"
  ],
  "blueResponses": [
    "deny_prompts",
    "lock_account",
    "ignore"
  ],
  "attackActions": [
    "send_repeated_prompts",
    "imitate_support_message"
  ],
  "defensiveActions": [
    "deny_prompts",
    "lock_account"
  ],
  "unavailableBlueActionsByRedAction": {
    "send_repeated_prompts": [
      "deny_prompts"
    ],
    "imitate_support_message": [
      "lock_account"
    ]
  }
};

module.exports = {
  id: definition.id,
  category: definition.category,
  ...createScenarioModule({ definition, rules })
};
