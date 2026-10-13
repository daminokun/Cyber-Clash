const { createScenarioModule } = require("../scenarioModule");
const definition = require("../../scenarios/container-image-risk.json");

const rules = {
  "redActions": [
    "do_nothing",
    "publish_tampered_image",
    "change_image_tag"
  ],
  "blueActions": [
    "investigate",
    "reject_deployment",
    "pin_approved_image",
    "ignore"
  ],
  "blueResponses": [
    "reject_deployment",
    "pin_approved_image",
    "ignore"
  ],
  "attackActions": [
    "publish_tampered_image",
    "change_image_tag"
  ],
  "defensiveActions": [
    "reject_deployment",
    "pin_approved_image"
  ],
  "unavailableBlueActionsByRedAction": {
    "publish_tampered_image": [
      "reject_deployment"
    ],
    "change_image_tag": [
      "pin_approved_image"
    ]
  }
};

module.exports = {
  id: definition.id,
  category: definition.category,
  ...createScenarioModule({ definition, rules })
};
