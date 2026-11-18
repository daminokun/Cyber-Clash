const { createScenarioModule } = require("../scenarioModule");
const definition = require("../../scenarios/mfa-fatigue.json");

// Denying prompts stops prompt fatigue; locking the account contains the support-impersonation follow-up.
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
  "redAdaptationActions": [
    "do_nothing",
    "delay_prompt_attack"
  ],
  "stoppingDefensesByRedAction": {
    "send_repeated_prompts": [
      "deny_prompts"
    ],
    "imitate_support_message": [
      "lock_account"
    ]
  },
  "adaptedDefensesByRedAction": {
    "send_repeated_prompts": [
      "lock_account"
    ],
    "imitate_support_message": [
      "deny_prompts"
    ]
  }
};

module.exports = {
  id: definition.id,
  category: definition.category,
  ...createScenarioModule({ definition, rules })
};
