---
name: "Cyber Clash Server Guidelines"
description: "Use when creating or editing Node.js server files, JSON schemas, multiplayer messages, scenario logic, validation, scoring, or server tests."
applyTo: "server/**/*.js,server/**/*.mjs,server/**/*.ts,server/**/*.json"
---

# Node.js Server Guidelines

- The server is authoritative for sessions, turn and phase transitions, scenario state, action validation, information visibility, scoring, and outcomes.
- Validate every client-supplied action against the current session, player role, phase, scenario, and available actions.
- Build player-visible responses from an explicit information boundary; never serialize complete hidden state into a client response.
- Keep protocol messages and JSON data structures explicit and stable. Update related documentation when they change.
- Reject invalid input with a clear error response rather than silently defaulting or mutating state.
- Add focused tests for valid actions, invalid actions, role visibility, phase transitions, and scoring changes.
