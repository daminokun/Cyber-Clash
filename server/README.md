# Cyber Clash Server Prototype

This prototype contains the first authoritative vertical slice: an email
account-verification scenario.

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
