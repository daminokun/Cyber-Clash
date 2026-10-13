const {
  applyAction: applyEmailAction,
  createEmailScenario,
  getPlayerView: getEmailPlayerView
} = require("./emailScenario");
const {
  applyAction: applyLoginAction,
  createLoginScenario,
  getPlayerView: getLoginPlayerView
} = require("./loginScenario");
const specializedScenarios = [
  {
    id: "email-account-verification-001",
    category: "email",
    create: createEmailScenario,
    apply: applyEmailAction,
    view: getEmailPlayerView
  },
  {
    id: "suspicious-login-activity",
    category: "login_activity",
    create: createLoginScenario,
    apply: applyLoginAction,
    view: getLoginPlayerView
  }
];

const scenarioModules = new Map(
  specializedScenarios.map((scenario) => [scenario.id, scenario])
);

const genericScenarios = [
  "api-key-exposure",
  "backup-integrity",
  "bluetooth-device-pairing",
  "calendar-invite-abuse",
  "cloud-permission-abuse",
  "container-image-risk",
  "data-exfiltration",
  "dns-redirection",
  "insider-data-access",
  "iot-device-compromise",
  "log-tampering",
  "lost-laptop",
  "malware-download",
  "mfa-fatigue",
  "mobile-app-permission",
  "network-port-scan",
  "password-reset-abuse",
  "printer-network-risk",
  "public-wifi-evil-twin",
  "qr-code-phishing",
  "ransomware-warning",
  "rogue-browser-extension",
  "service-account-abuse",
  "social-engineering-call",
  "supply-chain-update",
  "usb-device-threat",
  "voip-impersonation",
  "web-form-injection"
].map((id) => {
  const module = require(`./scenarios/${id}`);
  return { id, ...module };
});

for (const scenario of genericScenarios) {
  if (scenarioModules.has(scenario.id)) {
    throw new Error(`duplicate_scenario_id:${scenario.id}`);
  }
  scenarioModules.set(scenario.id, scenario);
}

function getScenarioModule(scenarioId) {
  const scenario = scenarioModules.get(scenarioId);
  if (!scenario) {
    throw new Error("unknown_scenario");
  }
  return scenario;
}

function createScenario(scenarioId) {
  return getScenarioModule(scenarioId).create();
}

function applyScenarioAction(state, role, action) {
  return getScenarioModule(state.scenarioId).apply(state, role, action);
}

function getScenarioView(state, role) {
  return getScenarioModule(state.scenarioId).view(state, role);
}

function getScenarioDefinitions() {
  return [...scenarioModules.values()].map(({ id, category }) => ({ id, category }));
}

module.exports = {
  applyScenarioAction,
  createScenario,
  getScenarioDefinitions,
  getScenarioView
};
