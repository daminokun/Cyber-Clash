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

  assert.equal(state.phase, "blue_response");
  assert.equal(getPlayerView(state, "blue").evidence.linkCheck.includes("does not"), true);
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

  assert.equal(state.phase, "blue_response");
  assert.equal(getLoginPlayerView(state, "blue").evidence.logCheck.includes("unusual"), true);
  assert.equal("private" in getLoginPlayerView(state, "blue"), false);
});

test("login attack is prevented by resetting credentials", () => {
  const state = createLoginScenario();

  applyLoginAction(state, "red", "credential_stuffing");
  applyLoginAction(state, "blue", "reset_credentials");

  assert.equal(state.outcome, "login_attack_prevented");
  assert.deepEqual(state.scores, { red: 0, blue: 3 });
});
