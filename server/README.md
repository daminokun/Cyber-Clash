# Cyber Clash Server Prototype

This prototype contains an authoritative Red Team versus Blue Team game with
dynamic scenario selection.

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

Matches currently use three rounds. At match creation, the server randomly
selects three different scenarios from the scenario catalogue. Scenario
scores are added to the persistent match score. After a scenario is resolved,
both players must send:

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

The scenario catalogue is stored as separate content files under
`server/scenarios` and separate logic modules under `server/src/scenarios`.
Each of the 28 catalogue scenarios has its own JavaScript module with explicit
action dependencies, counter-actions and response rules. The JSON file holds
scenario content, while the module owns its gameplay behavior. All are
simulations: the server never performs real attacks or accesses external
systems. The catalogue includes email, suspicious login, USB device, network
activity, malware, ransomware, cloud access, web application, social
engineering, data exfiltration, authentication, QR phishing, endpoint,
physical security, software supply chain, insider risk, IoT, voice
impersonation, calendar abuse, password reset abuse, API key exposure,
container image risk, rogue Wi-Fi, Bluetooth pairing, backup integrity, log
tampering, service account abuse, network printer risk and mobile application
permissions.

Scenario integration uses a registry contract in `server/src/scenarioRegistry.js`.
The server calls only `create`, `apply` and `view` through that registry; it
does not contain scenario-specific rules. Generic scenarios are data-driven
JSON content is paired with a dedicated JavaScript module registered through
the same contract. Each module may define its own counter-turn, action
dependencies and response filtering. To remove a scenario, remove its module
from the registry and its content file; lobby and match logic do not change.

Generic scenario counter-turns are defined in
`server/src/adaptationRules.js`. The old generic `change_tactic` action is not
used. Each scenario now exposes a meaningful adaptation such as
`create_shadow_account`, `route_transfer_through_proxy` or
`use_encoded_payload`. The adaptation remains hidden from Blue Team, keeps all
normal defensive choices visible, and counters only its mapped defense during
resolution. Once Red commits to a non-empty adaptation, the original attack
vector is abandoned, so defenses tied only to that vector cannot contain the
follow-up vector. Blue can still make a direct response without investigating,
but investigation gives Red a meaningful opportunity to change the attack.

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
