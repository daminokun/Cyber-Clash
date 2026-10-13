const { randomInt } = require("node:crypto");
const { WebSocketServer } = require("ws");
const {
  applyAction,
  createEmailScenario,
  getPlayerView
} = require("./emailScenario");
const loginScenario = require("./loginScenario");

function createMatch(id) {
  return {
    id,
    round: 1,
    maxRounds: 3,
    scenario: createScenario(1),
    scores: { red: 0, blue: 0 },
    readyPlayers: new Set(),
    players: new Map()
  };
}

function createScenario(round) {
  return round % 2 === 0
    ? loginScenario.createLoginScenario()
    : createEmailScenario();
}

function getScenarioView(scenario, role) {
  return scenario.category === "login_activity"
    ? loginScenario.getPlayerView(scenario, role)
    : getPlayerView(scenario, role);
}

function applyScenarioAction(scenario, role, action) {
  if (scenario.category === "login_activity") {
    loginScenario.applyAction(scenario, role, action);
    return;
  }
  applyAction(scenario, role, action);
}

function send(socket, message) {
  if (socket.readyState === socket.OPEN) {
    socket.send(JSON.stringify(message));
  }
}

function broadcastState(match) {
  for (const [socket, player] of match.players) {
    const state = getScenarioView(match.scenario, player.role);
    state.scores = { ...match.scores };
    state.round = match.round;
    state.maxRounds = match.maxRounds;
    send(socket, {
      type: "state",
      state
    });
  }
}

function broadcastJoined(match) {
  for (const [socket, player] of match.players) {
    send(socket, {
      type: "joined",
      role: player.role,
      matchId: match.id
    });
  }
}

function addScenarioScore(match) {
  match.scores.red += match.scenario.scores.red;
  match.scores.blue += match.scenario.scores.blue;
}

function broadcastRoundWaiting(match) {
  for (const [socket] of match.players) {
    send(socket, {
      type: "round_waiting",
      round: match.round,
      readyCount: match.readyPlayers.size,
      requiredPlayers: match.players.size
    });
  }
}

function broadcastMatchComplete(match) {
  const winner = match.scores.red === match.scores.blue
    ? "draw"
    : match.scores.red > match.scores.blue ? "red" : "blue";
  for (const [socket] of match.players) {
    send(socket, {
      type: "match_complete",
      scores: { ...match.scores },
      winner
    });
  }
}

function parseMessage(rawMessage) {
  let message;
  try {
    message = JSON.parse(rawMessage.toString());
  } catch {
    throw new Error("invalid_json");
  }

  if (!message || typeof message.type !== "string") {
    throw new Error("invalid_message");
  }

  return message;
}

function createMatchId(matches) {
  let id;
  do {
    id = randomInt(0, 1000000).toString().padStart(6, "0");
  } while (matches.has(id));
  return id;
}

function createGameServer({ port = 0, host = "127.0.0.1" } = {}) {
  const matches = new Map();
  const server = new WebSocketServer({ port, host });
  const ready = new Promise((resolve) => server.once("listening", resolve));

  function createAndStoreMatch() {
    const match = createMatch(createMatchId(matches));
    matches.set(match.id, match);
    return match;
  }

  function findAvailableMatch() {
    for (const match of matches.values()) {
      if (match.players.size === 1) {
        return match;
      }
    }
    return null;
  }

  function removeEmptyMatch(match) {
    if (match.players.size === 0) {
      matches.delete(match.id);
    }
  }

  server.on("connection", (socket) => {
    let match = null;
    let player = null;

    socket.on("message", (rawMessage) => {
      try {
        const message = parseMessage(rawMessage);

        if (!match) {
          if (message.type !== "join" || typeof message.mode !== "string") {
            throw new Error("join_required");
          }

          if (message.mode === "host") {
            match = createAndStoreMatch();
          } else if (message.mode === "match") {
            if (typeof message.matchId !== "string" || !matches.has(message.matchId)) {
              throw new Error("match_not_found");
            }
            match = matches.get(message.matchId);
            if (match.players.size >= 2) {
              throw new Error("match_full");
            }
          } else if (message.mode === "auto") {
            match = findAvailableMatch() || createAndStoreMatch();
          } else {
            throw new Error("invalid_join_mode");
          }

          const role = match.players.size === 0 ? "red" : "blue";
          player = { role };
          match.players.set(socket, player);
          broadcastJoined(match);
          if (match.players.size === 2) {
            broadcastState(match);
          } else {
            send(socket, { type: "waiting_for_player", matchId: match.id });
          }
          return;
        }

        if (message.type !== "action" || typeof message.action !== "string") {
          if (message.type === "ready_next_round") {
            if (!match.scenario.resolved) {
              throw new Error("round_not_ready");
            }
            if (match.round >= match.maxRounds) {
              throw new Error("match_already_complete");
            }
            match.readyPlayers.add(socket);
            broadcastRoundWaiting(match);
            if (match.readyPlayers.size === match.players.size) {
              match.round += 1;
              match.readyPlayers.clear();
              match.scenario = createScenario(match.round);
              broadcastState(match);
            }
            return;
          }
          throw new Error("invalid_action_message");
        }

        applyScenarioAction(match.scenario, player.role, message.action);
        if (match.scenario.resolved) {
          addScenarioScore(match);
        }
        broadcastState(match);
        if (match.scenario.resolved && match.round === match.maxRounds) {
          broadcastMatchComplete(match);
        }
      } catch (error) {
        send(socket, { type: "error", error: error.message });
        if (!match && ["match_not_found", "match_full", "invalid_join_mode"].includes(error.message)) {
          setTimeout(() => socket.terminate(), 1000);
        }
      }
    });

    socket.on("close", () => {
      if (!match || !player) {
        return;
      }
      match.players.delete(socket);
      for (const [otherSocket] of match.players) {
        send(otherSocket, {
          type: "player_disconnected",
          role: player.role
        });
      }
      removeEmptyMatch(match);
    });
  });

  return {
    matches,
    server,
    ready,
    close: () => new Promise((resolve, reject) => {
      for (const match of matches.values()) {
        for (const socket of match.players.keys()) {
          socket.terminate();
        }
      }
      server.close((error) => error ? reject(error) : resolve());
    })
  };
}

if (require.main === module) {
  const port = Number(process.env.PORT || 3000);
  const gameServer = createGameServer({ port });
  gameServer.server.on("listening", () => {
    console.log(`Cyber Clash server listening on port ${port}`);
  });
}

module.exports = { createGameServer };
