const test = require("node:test");
const assert = require("node:assert/strict");

const {
  applyAction,
  createEmailScenario,
  getPlayerView
} = require("../src/emailScenario");
const {
  applyAction: applyLoginAction,
  createLoginScenario,
  getPlayerView: getLoginPlayerView
} = require("../src/loginScenario");
const scenarioRegistry = require("../src/scenarioRegistry");
const {
  applyScenarioAction: applyGenericAction,
  createScenario: createGenericScenario,
  getScenarioView: getGenericPlayerView,
  getScenarioDefinitions
} = scenarioRegistry;

test("red view contains private scenario information and blue view does not", () => {
  const state = createEmailScenario();
  const redView = getPlayerView(state, "red");
  const blueView = getPlayerView(state, "blue");

  assert.equal(redView.private.originalStatus, "legitimate");
  assert.equal("private" in blueView, false);
});

test("do nothing followed by ignore produces no significant impact", () => {
  const state = createEmailScenario();

  applyAction(state, "red", "do_nothing");
  applyAction(state, "blue", "ignore");

  assert.equal(state.outcome, "no_significant_impact");
  assert.deepEqual(state.scores, { red: 0, blue: 0 });
});

test("reporting a legitimate email creates a false positive penalty", () => {
  const state = createEmailScenario();

  applyAction(state, "red", "do_nothing");
  applyAction(state, "blue", "report");

  assert.equal(state.outcome, "false_positive");
  assert.deepEqual(state.scores, { red: 0, blue: -2 });
});

test("investigation reveals evidence before the final response", () => {
  const state = createEmailScenario();

  applyAction(state, "red", "add_malicious_link");
  applyAction(state, "blue", "investigate");
  applyAction(state, "red", "do_nothing");

  assert.equal(state.phase, "blue_response");
  assert.equal(getPlayerView(state, "blue").evidence.linkCheck.includes("does not"), true);
  assert.equal(
    getPlayerView(state, "blue").evidence.messageCheck.includes("deliberate manipulation"),
    true
  );
});

test("red action options are removed after the red team submits an action", () => {
  const state = createEmailScenario();

  applyAction(state, "red", "add_malicious_link");

  assert.deepEqual(getPlayerView(state, "red").private.availableActions, []);
});

test("blocking a malicious link prevents the attack", () => {
  const state = createEmailScenario();

  applyAction(state, "red", "add_malicious_link");
  applyAction(state, "blue", "block");

  assert.equal(state.outcome, "attack_prevented");
  assert.deepEqual(state.scores, { red: 0, blue: 3 });
});

test("ignoring a malicious link awards the red team", () => {
  const state = createEmailScenario();

  applyAction(state, "red", "add_malicious_link");
  applyAction(state, "blue", "ignore");

  assert.equal(state.outcome, "attack_succeeded");
  assert.deepEqual(state.scores, { red: 5, blue: 0 });
});

test("invalid actions are rejected by the server logic", () => {
  const state = createEmailScenario();

  assert.throws(
    () => applyAction(state, "blue", "ignore"),
    { message: "invalid_blue_action" }
  );
  assert.throws(
    () => applyAction(state, "red", "unknown_action"),
    { message: "invalid_red_action" }
  );
});

test("login scenario investigation reveals restricted evidence", () => {
  const state = createLoginScenario();

  applyLoginAction(state, "red", "credential_stuffing");
  applyLoginAction(state, "blue", "investigate_logs");
  applyLoginAction(state, "red", "do_nothing");

  assert.equal(state.phase, "blue_response");
  assert.equal(getLoginPlayerView(state, "blue").evidence.logCheck.includes("unusual"), true);
  assert.equal("private" in getLoginPlayerView(state, "blue"), false);
});

test("login intelligence does not reveal a spoofed location adaptation", () => {
  const state = createLoginScenario();

  applyLoginAction(state, "red", "credential_stuffing");
  applyLoginAction(state, "blue", "investigate_logs");
  applyLoginAction(state, "red", "spoof_login_location");

  const evidence = getLoginPlayerView(state, "blue").evidence;
  assert.equal("locationCheck" in evidence, false);
  assert.equal(evidence.adaptationCheck.includes("cannot confirm"), true);
  assert.equal("redAdaptation" in evidence, false);
});

test("security intelligence changes for non-attack and defensive actions", () => {
  const emailState = createEmailScenario();
  applyAction(emailState, "red", "do_nothing");
  applyAction(emailState, "blue", "investigate");
  applyAction(emailState, "red", "do_nothing");
  applyAction(emailState, "blue", "ignore");
  const emailEvidence = getPlayerView(emailState, "blue").evidence;
  assert.equal(emailEvidence.messageCheck.includes("No deliberate"), true);
  assert.equal(emailEvidence.responseCheck.includes("No containment"), true);

  const loginState = createLoginScenario();
  applyLoginAction(loginState, "red", "do_nothing");
  applyLoginAction(loginState, "blue", "investigate_logs");
  applyLoginAction(loginState, "red", "do_nothing");
  applyLoginAction(loginState, "blue", "force_logout");
  const loginEvidence = getLoginPlayerView(loginState, "blue").evidence;
  assert.equal(loginEvidence.activityCheck.includes("No deliberate"), true);
  assert.equal(loginEvidence.responseCheck.includes("terminated"), true);
});

test("email counter-turn keeps the defense choice hidden after the sender changes", () => {
  const state = createEmailScenario();

  applyAction(state, "red", "add_malicious_link");
  applyAction(state, "blue", "investigate");
  applyAction(state, "red", "change_sender");

  assert.deepEqual(getPlayerView(state, "blue").availableActions, [
    "report",
    "ignore",
    "block"
  ]);

  applyAction(state, "blue", "block");
  assert.equal(state.outcome, "attack_succeeded");
  assert.equal(getPlayerView(state, "blue").evidence.adaptationCheck.includes("cannot confirm"), true);
});

test("login attack is prevented by resetting credentials", () => {
  const state = createLoginScenario();

  applyLoginAction(state, "red", "credential_stuffing");
  applyLoginAction(state, "blue", "reset_credentials");

  assert.equal(state.outcome, "login_attack_prevented");
  assert.deepEqual(state.scores, { red: 0, blue: 3 });
});

test("login investigation gives red an adaptation turn before final response", () => {
  const state = createLoginScenario();

  applyLoginAction(state, "red", "credential_stuffing");
  applyLoginAction(state, "blue", "investigate_logs");

  assert.equal(state.phase, "red_adaptation");
  assert.deepEqual(getLoginPlayerView(state, "red").private.availableActions, [
    "do_nothing",
    "spoof_login_location"
  ]);

  applyLoginAction(state, "red", "spoof_login_location");
  assert.equal(state.phase, "blue_response");
  assert.deepEqual(getLoginPlayerView(state, "blue").availableActions, [
    "force_logout",
    "reset_credentials",
    "ignore"
  ]);
});

test("scenario catalogue provides enough unique choices for three-round matches", () => {
  const definitions = getScenarioDefinitions();

  assert.ok(definitions.length >= 28);
  assert.equal(new Set(definitions.map((definition) => definition.id)).size, definitions.length);
});

test("every generic adaptation is scenario-specific and counters a defense", () => {
  for (const { id } of getScenarioDefinitions()) {
    if (id === "email-account-verification-001" || id === "suspicious-login-activity") {
      continue;
    }
    const state = createGenericScenario(id);
    const adaptations = getGenericPlayerView(state, "red").private.availableActions;
    assert.equal(adaptations.includes("change_tactic"), false, id);
    assert.ok(adaptations.length >= 2, id);
  }
});

test("generic scenario keeps private information hidden and resolves a defended attack", () => {
  const state = createGenericScenario("usb-device-threat");
  const redView = getGenericPlayerView(state, "red");
  const blueView = getGenericPlayerView(state, "blue");

  assert.equal(redView.private.objective.includes("malicious USB"), true);
  assert.equal("private" in blueView, false);

  applyGenericAction(state, "red", "add_malicious_file");
  applyGenericAction(state, "blue", "investigate");
  applyGenericAction(state, "red", "do_nothing");
  assert.equal(state.phase, "blue_response");
  assert.deepEqual(getGenericPlayerView(state, "blue").availableActions, [
    "quarantine_device",
    "report",
    "ignore"
  ]);
  applyGenericAction(state, "blue", "quarantine_device");

  assert.equal(state.outcome, "attack_prevented");
  assert.deepEqual(state.scores, { red: 0, blue: 3 });
});

test("generic investigation gives red a counter-turn that changes the attack vector", () => {
  const state = createGenericScenario("cloud-permission-abuse");

  applyGenericAction(state, "red", "add_external_account");
  applyGenericAction(state, "blue", "investigate");
  assert.equal(state.phase, "red_adaptation");
  assert.deepEqual(getGenericPlayerView(state, "red").private.availableActions, [
    "do_nothing",
    "create_shadow_account"
  ]);

  applyGenericAction(state, "red", "create_shadow_account");
  assert.deepEqual(getGenericPlayerView(state, "blue").availableActions, [
    "revoke_access",
    "lock_account",
    "ignore"
  ]);
  applyGenericAction(state, "blue", "revoke_access");

  assert.equal(state.outcome, "attack_succeeded");
  assert.deepEqual(state.scores, { red: 5, blue: 0 });
  assert.equal(
    getGenericPlayerView(state, "blue").evidence.adaptationCheck.includes("cannot confirm"),
    true
  );
});

test("generic scenarios can define distinct adaptation actions and counters", () => {
  const state = createGenericScenario("ransomware-warning");

  applyGenericAction(state, "red", "encrypt_files");
  applyGenericAction(state, "blue", "investigate");

  assert.deepEqual(getGenericPlayerView(state, "red").private.availableActions, [
    "do_nothing",
    "move_to_unbacked_share",
    "accelerate_encryption"
  ]);

  applyGenericAction(state, "red", "accelerate_encryption");
  assert.deepEqual(getGenericPlayerView(state, "blue").availableActions, [
    "isolate_server",
    "restore_backup",
    "ignore"
  ]);
  applyGenericAction(state, "blue", "restore_backup");

  assert.equal(state.outcome, "attack_succeeded");
  assert.deepEqual(state.scores, { red: 5, blue: 0 });
});

test("generic next actions reflect the previous red action", () => {
  const state = createGenericScenario("ransomware-warning");

  applyGenericAction(state, "red", "delete_restore_points");

  assert.deepEqual(getGenericPlayerView(state, "blue").availableActions, [
    "investigate",
    "isolate_server",
    "restore_backup",
    "ignore"
  ]);
  applyGenericAction(state, "blue", "restore_backup");
  assert.equal(state.outcome, "attack_succeeded");
});

test("every generic attack defines a valid next-action dependency", () => {
  for (const { id } of getScenarioDefinitions()) {
    const state = createGenericScenario(id);
    const redActions = getGenericPlayerView(state, "red").private.availableActions;
    const attackActions = redActions.filter((action) => action !== "do_nothing");
    for (const attack of attackActions) {
      const nextState = createGenericScenario(id);
      applyGenericAction(nextState, "red", attack);
      const blueActions = getGenericPlayerView(nextState, "blue").availableActions;
      assert.ok(blueActions.length > 0, `${id}:${attack} removed every Blue action`);
    }
  }
});

test("scenario registry exposes a common contract for every scenario", () => {
  const definitions = scenarioRegistry.getScenarioDefinitions();

  for (const definition of definitions) {
    const state = scenarioRegistry.createScenario(definition.id);
    const redView = scenarioRegistry.getScenarioView(state, "red");

    assert.equal(state.scenarioId, definition.id);
    assert.equal(redView.category, definition.category);
    assert.equal(typeof scenarioRegistry.applyScenarioAction, "function");
  }
});
