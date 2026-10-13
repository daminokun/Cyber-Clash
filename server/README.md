# Cyber Clash Server Prototype

This prototype contains the first authoritative vertical slice: an email
account-verification scenario.

## Run the WebSocket server

From the `server` directory:

```text
npm install
npm start
```

The server listens on port `3000` by default. Set the `PORT` environment
variable to use another port.

Clients first select a lobby using a WebSocket join message:

```json
{"type":"join","mode":"host"}
```

```json
{"type":"join","mode":"match","matchId":"482019"}
```

```json
{"type":"join","mode":"auto"}
```

`host` creates a new lobby, `match` joins a specific lobby ID, and `auto`
joins the first lobby with one available slot or creates a new lobby when
none is available. The server supports multiple simultaneous two-player
lobbies. After joining, clients send gameplay actions:

```json
{"type":"action","action":"add_malicious_link"}
```

The server assigns the first client in each lobby to the Red Team and the
second client to the Blue Team. Each client receives only its role-appropriate
state view. The lobby ID is included in the `joined` and
`waiting_for_player` messages.

Matches currently use three rounds. Round 1 and Round 3 use the email
verification scenario, while Round 2 uses the suspicious login activity
scenario. Scenario scores are added to the persistent match score. After a
scenario is resolved, both players must send:

```json
{"type":"ready_next_round"}
```

before the next round begins. The server sends `match_complete` after the
final round.

After a completed match, both players can send:

```json
{"type":"rematch"}
```

If both original players request a rematch, the same lobby resets to Round 1.
If only one original player remains connected, that player is moved to an
available lobby automatically. The client receives `new_opponent` when this
creates a match against a different player.

The suspicious login scenario uses an additional counter-turn:

```text
Red attack -> Blue investigate -> Red adapt/evade -> Blue final response
```

The Godot client prototype is located at `../client`. Start the server first,
then run the Godot project so it can connect to `ws://127.0.0.1:3000`.

## Scoring used by the prototype

| Result | Red Team | Blue Team |
|---|---:|---:|
| Attack succeeds | +5 | 0 |
| Attack is prevented | 0 | +3 |
| False positive on a legitimate email | 0 | -2 |
| No significant impact | 0 | 0 |

These values are intentionally explicit and provisional so the end-to-end flow
can be tested and balanced later.

## Validation

From the `server` directory, run:

```text
npm test
```
