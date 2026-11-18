const { createScenarioModule } = require("../scenarioModule");
const definition = require("../../scenarios/public-bucket.json");

// Revoking public access closes the exposure; blocking external copy stops the transfer. A signed URL survives the ACL fix, so the other response is needed.
const rules = {
  "redActions": [
    "do_nothing",
    "expose_bucket_acl",
    "copy_data_external"
  ],
  "blueActions": [
    "investigate",
    "revoke_public_access",
    "block_external_copy",
    "ignore"
  ],
  "blueResponses": [
    "revoke_public_access",
    "block_external_copy",
    "ignore"
  ],
  "attackActions": [
    "expose_bucket_acl",
    "copy_data_external"
  ],
  "defensiveActions": [
    "revoke_public_access",
    "block_external_copy"
  ],
  "redAdaptationActions": [
    "do_nothing",
    "use_signed_url"
  ],
  "stoppingDefensesByRedAction": {
    "expose_bucket_acl": [
      "revoke_public_access"
    ],
    "copy_data_external": [
      "block_external_copy"
    ]
  },
  "adaptedDefensesByRedAction": {
    "expose_bucket_acl": [
      "block_external_copy"
    ],
    "copy_data_external": [
      "revoke_public_access"
    ]
  }
};

module.exports = {
  id: definition.id,
  category: definition.category,
  ...createScenarioModule({ definition, rules })
};
