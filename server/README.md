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
joins the first lobby that has not started yet or creates a new lobby when none
is available. The server supports multiple simultaneous two-player lobbies.
A lobby that has already started, finished or been abandoned cannot be joined;
`match` returns `match_unavailable` in those cases. After joining, clients send
gameplay actions:

```json
{"type":"action","action":"add_malicious_link"}
```

The server assigns the first client in each lobby to the Red Team and the
second client to the Blue Team. The role is always the missing one, so a
disconnected match can never produce two players with the same role. Each
client receives only its role-appropriate state view. The lobby ID is included
in the `joined` and `waiting_for_player` messages.

If a player disconnects after the match has started, the lobby is marked
abandoned:

- The remaining player receives `player_disconnected`.
- Matchmaking never reuses that lobby.
- Any further action from the remaining player returns `match_abandoned`.
- The remaining player should leave and start a new match; both clients expose
  a leave/match-abandoned path.

After a completed match the lobby is not abandoned, so the remaining player can
still request a rematch and be moved to a new opponent.

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
The catalogue contains 42 scenarios across 29 categories: 40 generic scenarios
plus the dedicated email and suspicious login scenarios. Every scenario has its
own JavaScript module with explicit action dependencies, containment rules and
response rules. The JSON file holds scenario content, while the module owns its
gameplay behavior. All are simulations: the server never performs real attacks
or accesses external systems.

The catalogue includes email, suspicious login, USB device, network activity,
malware, ransomware, cloud access, web application, social engineering, data
exfiltration, authentication, QR phishing, endpoint, physical security,
software supply chain, insider risk, IoT, voice impersonation, calendar abuse,
password reset abuse, API key exposure, container image risk, rogue Wi-Fi,
Bluetooth pairing, backup integrity, log tampering, service account abuse,
network printer risk and mobile application permissions. It also covers
credential dumping, lateral movement, DDoS extortion, SQL injection,
cross-site scripting, API object authorization, invoice fraud, SIM swapping,
public cloud storage, zero-day exploitation, DNS tunnelling and badge cloning.

Scenario integration uses a registry contract in `server/src/scenarioRegistry.js`.
The server calls only `create`, `apply` and `view` through that registry; it
does not contain scenario-specific rules. Generic scenarios are data-driven
JSON content is paired with a dedicated JavaScript module registered through
the same contract. To remove a scenario, remove its module from the registry
and its content file; lobby and match logic do not change.

Each generic scenario module owns the complete rule set for its scenario:
`redActions`, `blueActions`, `blueResponses`, `attackActions`,
`defensiveActions`, `redAdaptationActions`, `stoppingDefensesByRedAction` and
`adaptedDefensesByRedAction`. The two containment maps are explicit, so an
outcome never depends on array order or index arithmetic. A module is validated
when it is loaded and the server refuses to start with incomplete rules.

The old generic `change_tactic` action is not used. Each scenario exposes a
meaningful adaptation such as `create_shadow_account`,
`route_transfer_through_proxy` or `use_encoded_payload`. The adaptation stays
hidden from the Blue Team, keeps every normal defensive choice visible, and
changes the attack vector instead of disabling every defense. The follow-up
vector is contained by a different response from the one that contains the
original attack, so investigating is a trade-off rather than a guaranteed loss:
Blue gives Red a chance to change vector but learns whether the event was
manipulated. Blue can always respond without investigating.

The Godot client prototype is located at `../client`. Start the server first,
then run the Godot project so it can connect to `ws://127.0.0.1:3000`.

## Scoring used by the prototype

| Result | Red Team | Blue Team |
|---|---:|---:|
| Attack succeeds | +5 | 0 |
| Attack is prevented | 0 | +3 |
| False positive (containing a legitimate event) | 0 | -2 |
| No significant impact | 0 | 0 |

A false positive applies to every scenario: if Red chooses `do_nothing` and Blue
takes any containment action (`isolate`, `block`, `reset`, `report`, and so on)
instead of `ignore`, Blue receives -2. `ignore` is always safe against a
legitimate event, which makes Red's `do_nothing` a genuine bluff.

These values are intentionally explicit and provisional so the end-to-end flow
can be tested and balanced later.

## Validation

From the `server` directory, run:

```text
npm test
```
