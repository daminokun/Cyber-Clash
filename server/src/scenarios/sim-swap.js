const { createScenarioModule } = require("../scenarioModule");
const definition = require("../../scenarios/sim-swap.json");

// Locking the mobile account stops the port-out; requiring app-based MFA bypasses intercepted SMS. The eSIM transfer changes the carrier path, so the other response is needed.
const rules = {
  "redActions": [
    "do_nothing",
    "port_out_number",
    "intercept_sms_code"
  ],
  "blueActions": [
    "investigate",
    "lock_mobile_account",
    "require_app_mfa",
    "ignore"
  ],
  "blueResponses": [
    "lock_mobile_account",
    "require_app_mfa",
    "ignore"
  ],
  "attackActions": [
    "port_out_number",
    "intercept_sms_code"
  ],
  "defensiveActions": [
    "lock_mobile_account",
    "require_app_mfa"
  ],
  "redAdaptationActions": [
    "do_nothing",
    "use_esim_transfer"
  ],
  "stoppingDefensesByRedAction": {
    "port_out_number": [
      "lock_mobile_account"
    ],
    "intercept_sms_code": [
      "require_app_mfa"
    ]
  },
  "adaptedDefensesByRedAction": {
    "port_out_number": [
      "require_app_mfa"
    ],
    "intercept_sms_code": [
      "lock_mobile_account"
    ]
  }
};

module.exports = {
  id: definition.id,
  category: definition.category,
  ...createScenarioModule({ definition, rules })
};
