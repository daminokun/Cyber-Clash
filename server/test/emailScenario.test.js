const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

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

test("removed change tactic action is rejected for every scenario", () => {
  for (const { id } of getScenarioDefinitions()) {
    const state = id === "email-account-verification-001"
      ? createEmailScenario()
      : id === "suspicious-login-activity"
        ? createLoginScenario()
        : createGenericScenario(id);
    assert.throws(
      () => id === "email-account-verification-001"
        ? applyAction(state, "red", "change_tactic")
        : id === "suspicious-login-activity"
          ? applyLoginAction(state, "red", "change_tactic")
          : applyGenericAction(state, "red", "change_tactic"),
      { message: "invalid_action_removed" }
    );
  }
});

test("resolved scenarios provide a clear public explanation", () => {
  const emailState = createEmailScenario();
  applyAction(emailState, "red", "add_malicious_link");
  applyAction(emailState, "blue", "ignore");
  const emailView = getPlayerView(emailState, "blue");
  const loginState = createLoginScenario();
  applyLoginAction(loginState, "red", "credential_stuffing");
  applyLoginAction(loginState, "blue", "ignore");
  const loginView = getLoginPlayerView(loginState, "blue");
  const genericState = createGenericScenario("cloud-permission-abuse");
  applyGenericAction(genericState, "red", "add_external_account");
  applyGenericAction(genericState, "blue", "ignore");
  const genericView = getGenericPlayerView(genericState, "blue");
  for (const view of [emailView, loginView, genericView]) {
    assert.equal(typeof view.resultExplanation, "string");
    assert.ok(view.resultExplanation.length > 40);
    assert.ok(view.resultExplanation.includes("receives") || view.resultExplanation.includes("neither team scored"));
  }
});

test("resolved generic scenario retains its explanation for the final round", () => {
  const state = createGenericScenario("ransomware-warning");
  applyGenericAction(state, "red", "encrypt_files");
  applyGenericAction(state, "blue", "ignore");
  const view = getGenericPlayerView(state, "blue");
  assert.equal(state.resolved, true);
  assert.equal(view.resultExplanation, state.resultExplanation);
  assert.ok(view.resultExplanation.includes("Red"));
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

  // The follow-up vector is contained by the other response, not the original
  // one, so investigating never removes every possible defense.
  const prevented = JSON.parse(JSON.stringify(state));
  applyGenericAction(prevented, "blue", "revoke_access");
  assert.equal(prevented.outcome, "attack_prevented");
  assert.deepEqual(prevented.scores, { red: 0, blue: 3 });

  const missed = JSON.parse(JSON.stringify(state));
  applyGenericAction(missed, "blue", "lock_account");
  assert.equal(missed.outcome, "attack_succeeded");
  assert.deepEqual(missed.scores, { red: 5, blue: 0 });
  assert.equal(
    getGenericPlayerView(missed, "blue").evidence.adaptationCheck.includes("cannot confirm"),
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

  const prevented = JSON.parse(JSON.stringify(state));
  applyGenericAction(prevented, "blue", "restore_backup");
  assert.equal(prevented.outcome, "attack_prevented");
  assert.deepEqual(prevented.scores, { red: 0, blue: 3 });

  const missed = JSON.parse(JSON.stringify(state));
  applyGenericAction(missed, "blue", "isolate_server");
  assert.equal(missed.outcome, "attack_succeeded");
  assert.deepEqual(missed.scores, { red: 5, blue: 0 });
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

const EMAIL_ID = "email-account-verification-001";
const LOGIN_ID = "suspicious-login-activity";

function createScenarioState(id) {
  if (id === EMAIL_ID) {
    return createEmailScenario();
  }
  if (id === LOGIN_ID) {
    return createLoginScenario();
  }
  return createGenericScenario(id);
}

function applyScenarioFor(id, state, role, action) {
  if (id === EMAIL_ID) {
    return applyAction(state, role, action);
  }
  if (id === LOGIN_ID) {
    return applyLoginAction(state, role, action);
  }
  return applyGenericAction(state, role, action);
}

function blueActionsFor(id, state) {
  if (id === EMAIL_ID) {
    return getPlayerView(state, "blue").availableActions || [];
  }
  if (id === LOGIN_ID) {
    return getLoginPlayerView(state, "blue").availableActions || [];
  }
  return getGenericPlayerView(state, "blue").availableActions || [];
}

function preventedBy(state, id, action) {
  const next = JSON.parse(JSON.stringify(state));
  applyScenarioFor(id, next, "blue", action);
  return next.scores.blue > 0 && next.scores.red === 0;
}

test("every generic attack has one containment response before and after adaptation", () => {
  for (const { id } of getScenarioDefinitions()) {
    if (id === EMAIL_ID || id === LOGIN_ID) {
      continue;
    }
    const probe = createGenericScenario(id);
    const attacks = getGenericPlayerView(probe, "red").private.availableActions
      .filter((action) => action !== "do_nothing");
    assert.ok(attacks.length > 0, id);

    for (const attack of attacks) {
      const direct = createGenericScenario(id);
      applyGenericAction(direct, "red", attack);
      const directResponses = getGenericPlayerView(direct, "blue").availableActions;
      const directStoppers = directResponses.filter((response) => preventedBy(direct, id, response));
      assert.equal(directStoppers.length, 1, `${id}:${attack} direct containment`);

      const investigating = JSON.parse(JSON.stringify(direct));
      applyGenericAction(investigating, "blue", "investigate");
      const adaptations = getGenericPlayerView(investigating, "red").private.availableActions
        .filter((action) => action !== "do_nothing");
      assert.ok(adaptations.length > 0, `${id}:${attack} adaptations`);

      for (const adaptation of adaptations) {
        const adapted = JSON.parse(JSON.stringify(investigating));
        applyGenericAction(adapted, "red", adaptation);
        const responses = getGenericPlayerView(adapted, "blue").availableActions;
        const stoppers = responses.filter((response) => preventedBy(adapted, id, response));
        assert.equal(stoppers.length, 1, `${id}:${attack}:${adaptation} adapted containment`);
        assert.notDeepEqual(
          stoppers,
          directStoppers,
          `${id}:${attack}:${adaptation} kept the original defense`
        );
      }
    }
  }
});

test("countering a legitimate event creates a false positive in every scenario", () => {
  for (const { id } of getScenarioDefinitions()) {
    const state = createScenarioState(id);
    applyScenarioFor(id, state, "red", "do_nothing");
    const containment = blueActionsFor(id, state).filter(
      (action) => action !== "investigate" && action !== "investigate_logs" && action !== "ignore"
    );
    assert.ok(containment.length > 0, id);

    const action = containment[0];
    applyScenarioFor(id, state, "blue", action);
    assert.equal(state.outcome, "false_positive", `${id}:${action}`);
    assert.deepEqual(state.scores, { red: 0, blue: -2 }, `${id}:${action}`);
    assert.ok(state.resultExplanation.includes("false-positive"), `${id}:${action}`);
  }
});

test("ignoring a legitimate event has no penalty in every scenario", () => {
  for (const { id } of getScenarioDefinitions()) {
    const state = createScenarioState(id);
    applyScenarioFor(id, state, "red", "do_nothing");
    applyScenarioFor(id, state, "blue", "ignore");
    assert.equal(state.outcome, "no_significant_impact", id);
    assert.deepEqual(state.scores, { red: 0, blue: 0 }, id);
  }
});

test("blocking a legitimate email is also a false positive", () => {
  const state = createEmailScenario();
  applyAction(state, "red", "do_nothing");
  applyAction(state, "blue", "block");

  assert.equal(state.outcome, "false_positive");
  assert.deepEqual(state.scores, { red: 0, blue: -2 });
});

test("scenario content files contain only content fields and no BOM", () => {
  const contentKeys = [
    "id",
    "category",
    "event",
    "originalStatus",
    "redObjective",
    "investigationEvidence"
  ];
  const scenarioDir = path.join(__dirname, "..", "scenarios");
  const files = fs.readdirSync(scenarioDir).filter((file) => file.endsWith(".json"));
  const contentIds = new Set();

  assert.ok(files.length >= 28);
  for (const file of files) {
    const raw = fs.readFileSync(path.join(scenarioDir, file), "utf8");
    assert.equal(raw.charCodeAt(0), "{".charCodeAt(0), `${file} must start with { (no BOM)`);
    const content = JSON.parse(raw);
    assert.deepEqual(Object.keys(content).sort(), [...contentKeys].sort(), file);
    assert.equal(typeof content.event.title, "string", `${file}: event title`);
    assert.ok(Object.keys(content.investigationEvidence).length > 0, `${file}: evidence`);
    contentIds.add(content.id);
  }

  const registeredIds = getScenarioDefinitions().map((definition) => definition.id);
  assert.deepEqual([...contentIds].sort(), [...registeredIds].sort());
});


