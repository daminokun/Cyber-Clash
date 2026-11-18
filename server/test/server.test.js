const test = require("node:test");
const assert = require("node:assert/strict");
const WebSocket = require("ws");
const { createGameServer } = require("../src/server");

function connect(port) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(`ws://127.0.0.1:${port}`);
    const messages = [];
    const waiters = [];

    ws.on("message", (raw) => {
      const message = JSON.parse(raw.toString());
      const index = waiters.findIndex((waiter) => waiter.predicate(message));
      if (index >= 0) {
        const [waiter] = waiters.splice(index, 1);
        clearTimeout(waiter.timer);
        waiter.resolve(message);
        return;
      }
      messages.push(message);
    });

    ws.once("open", () => {
      resolve({
        send: (message) => ws.send(JSON.stringify(message)),
        next(predicate, timeout = 2000) {
          const index = messages.findIndex(predicate);
          if (index >= 0) {
            return Promise.resolve(messages.splice(index, 1)[0]);
          }
          return new Promise((res, rej) => {
            const waiter = { predicate, resolve: res };
            waiter.timer = setTimeout(() => {
              const position = waiters.indexOf(waiter);
              if (position >= 0) {
                waiters.splice(position, 1);
              }
              rej(new Error("timed out waiting for a server message"));
            }, timeout);
            waiters.push(waiter);
          });
        },
        terminate: () => ws.terminate(),
        close: () => ws.close()
      });
    });
    ws.once("error", reject);
  });
}

test("a mid-match disconnect abandons the lobby and frees matchmaking", { timeout: 8000 }, async () => {
  const game = createGameServer({ port: 0 });
  await game.ready;
  const port = game.server.address().port;
  const red = await connect(port);
  const blue = await connect(port);
  const third = await connect(port);
  const fourth = await connect(port);

  try {
    red.send({ type: "join", mode: "host" });
    const redJoined = await red.next((message) => message.type === "joined");
    blue.send({ type: "join", mode: "match", matchId: redJoined.matchId });
    const blueJoined = await blue.next((message) => message.type === "joined");

    assert.equal(redJoined.role, "red");
    assert.equal(blueJoined.role, "blue");
    await red.next((message) => message.type === "state");
    await blue.next((message) => message.type === "state");

    const notice = blue.next((message) => message.type === "player_disconnected");
    red.close();
    const disconnected = await notice;
    assert.equal(disconnected.role, "red");

    const abandonedMatch = game.matches.get(redJoined.matchId);
    assert.equal(abandonedMatch.abandoned, true);
    assert.equal(abandonedMatch.started, true);
    assert.equal(abandonedMatch.players.size, 1);
    assert.deepEqual(
      [...abandonedMatch.players.values()].map((player) => player.role),
      ["blue"]
    );

    third.send({ type: "join", mode: "auto" });
    const thirdJoined = await third.next((message) => message.type === "joined");
    assert.equal(thirdJoined.role, "red");
    assert.notEqual(thirdJoined.matchId, redJoined.matchId);

    fourth.send({ type: "join", mode: "match", matchId: redJoined.matchId });
    const error = await fourth.next((message) => message.type === "error");
    assert.equal(error.error, "match_unavailable");
  } finally {
    red.terminate();
    blue.terminate();
    third.terminate();
    fourth.terminate();
    await game.close();
  }
});

test("a started match still resolves a round and advances", { timeout: 8000 }, async () => {
  const game = createGameServer({ port: 0 });
  await game.ready;
  const port = game.server.address().port;
  const red = await connect(port);
  const blue = await connect(port);

  try {
    red.send({ type: "join", mode: "host" });
    const redJoined = await red.next((message) => message.type === "joined");
    blue.send({ type: "join", mode: "match", matchId: redJoined.matchId });
    await blue.next((message) => message.type === "joined");

    const redState = await red.next((message) => message.type === "state");
    const blueState = await blue.next((message) => message.type === "state");
    const attack = redState.state.private.availableActions
      .find((action) => action !== "do_nothing");
    assert.ok(attack);

    red.send({ type: "action", action: attack });
    const blueTurn = await blue.next(
      (message) => message.type === "state" && message.state.phase === "blue_action"
    );
    const defense = blueTurn.state.availableActions
      .find((action) => action !== "investigate" && action !== "ignore");
    assert.ok(defense);

    const redResolved = red.next(
      (message) => message.type === "state" && message.state.phase === "resolved"
    );
    const blueResolved = blue.next(
      (message) => message.type === "state" && message.state.phase === "resolved"
    );
    blue.send({ type: "action", action: defense });
    await redResolved;
    await blueResolved;

    red.send({ type: "ready_next_round" });
    blue.send({ type: "ready_next_round" });
    const redNextRound = await red.next(
      (message) => message.type === "state" && message.state.round === 2
    );
    assert.equal(redNextRound.state.round, 2);
    assert.equal(redNextRound.state.maxRounds, 3);
  } finally {
    red.terminate();
    blue.terminate();
    await game.close();
  }
});
