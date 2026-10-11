const { WebSocketServer } = require("ws");
const {
  applyAction,
  createEmailScenario,
  getPlayerView
} = require("./emailScenario");

function createMatch() {
  return {
    scenario: createEmailScenario(),
    players: new Map()
  };
}

function send(socket, message) {
  if (socket.readyState === socket.OPEN) {
    socket.send(JSON.stringify(message));
  }
}

function broadcastState(match) {
  for (const [socket, player] of match.players) {
    send(socket, {
      type: "state",
      state: getPlayerView(match.scenario, player.role)
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

function createGameServer({ port = 0, host = "127.0.0.1" } = {}) {
  const match = createMatch();
  const server = new WebSocketServer({ port, host });
  const ready = new Promise((resolve) => server.once("listening", resolve));

  server.on("connection", (socket) => {
    if (match.players.size >= 2) {
      send(socket, { type: "error", error: "match_full" });
      socket.close();
      return;
    }

    const role = match.players.size === 0 ? "red" : "blue";
    match.players.set(socket, { role });
    send(socket, { type: "joined", role });
    broadcastState(match);

    socket.on("message", (rawMessage) => {
      try {
        const message = parseMessage(rawMessage);
        if (message.type !== "action" || typeof message.action !== "string") {
          throw new Error("invalid_action_message");
        }

        applyAction(match.scenario, role, message.action);
        broadcastState(match);
      } catch (error) {
        send(socket, { type: "error", error: error.message });
      }
    });

    socket.on("close", () => {
      match.players.delete(socket);
    });
  });

  return {
    match,
    server,
    ready,
    close: () => new Promise((resolve, reject) => {
      for (const socket of match.players.keys()) {
        socket.terminate();
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
