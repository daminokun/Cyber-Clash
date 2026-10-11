---
name: "Cyber Clash Godot Guidelines"
description: "Use when creating or editing Godot client files, GDScript, scenes, UI, multiplayer client behavior, or player-facing scenario flows."
applyTo: "client/**/*.gd,client/**/*.tscn,client/**/*.tres"
---

# Godot Client Guidelines

- Treat the client as untrusted presentation and input code; do not make it authoritative for scenario state, scoring, or hidden information.
- Match client actions and displayed states to the server contract and the GDD.
- Never display server-only hidden state or the other player's private information.
- Handle rejected or invalid server actions explicitly and provide a clear player-facing result.
- Keep beginner-facing labels and flows consistent with the terminology in the GDD.
