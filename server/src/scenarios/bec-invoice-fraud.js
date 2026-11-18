const { createScenarioModule } = require("../scenarioModule");
const definition = require("../../scenarios/bec-invoice-fraud.json");

// Calling the supplier verifies the request; freezing the payment stops the diversion. A look-alike domain survives the first check, so the other response is needed.
const rules = {
  "redActions": [
    "do_nothing",
    "spoof_supplier_email",
    "redirect_payment_details"
  ],
  "blueActions": [
    "investigate",
    "verify_with_supplier",
    "freeze_payment",
    "ignore"
  ],
  "blueResponses": [
    "verify_with_supplier",
    "freeze_payment",
    "ignore"
  ],
  "attackActions": [
    "spoof_supplier_email",
    "redirect_payment_details"
  ],
  "defensiveActions": [
    "verify_with_supplier",
    "freeze_payment"
  ],
  "redAdaptationActions": [
    "do_nothing",
    "use_lookalike_domain"
  ],
  "stoppingDefensesByRedAction": {
    "spoof_supplier_email": [
      "verify_with_supplier"
    ],
    "redirect_payment_details": [
      "freeze_payment"
    ]
  },
  "adaptedDefensesByRedAction": {
    "spoof_supplier_email": [
      "freeze_payment"
    ],
    "redirect_payment_details": [
      "verify_with_supplier"
    ]
  }
};

module.exports = {
  id: definition.id,
  category: definition.category,
  ...createScenarioModule({ definition, rules })
};
