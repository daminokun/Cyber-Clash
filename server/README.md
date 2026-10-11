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

Clients connect using WebSocket messages:

```json
{"type":"action","action":"add_malicious_link"}
```

The server assigns the first client to the Red Team and the second client to
the Blue Team. Each client receives only its role-appropriate state view.

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
