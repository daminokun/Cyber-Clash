# Cyber Clash Project Guidelines

## Project Context

- Cyber Clash is a beginner-friendly 1v1 cybersecurity simulation game.
- The Red Team is the attacker and the Blue Team is the defender.
- The intended architecture is a Godot client communicating with a Node.js server using JSON-based messages.
- The Game Design Document is the behavioral source of truth: [docs/GDD/Game-Design-Document.md](../docs/GDD/Game-Design-Document.md).

## Working Rules

- Read the relevant GDD sections before changing gameplay, scenario, scoring, turn, or information-visibility behavior.
- Keep server authority intact: the server validates actions, owns hidden scenario state, and determines outcomes.
- Never expose Red Team private information or complete hidden state to the Blue Team.
- Treat "Do Nothing" as a valid Red Team action where the GDD permits it.
- Prefer small, explicit changes that preserve the beginner-friendly gameplay model.
- When a requirement is ambiguous and affects gameplay or networking, identify it before implementation rather than inventing a rule.

## Validation

- Update directly related documentation when behavior or data formats change.
- Verify changed behavior with the smallest relevant test or reproducible manual check.
- Report changed files, validation performed, and any unresolved assumptions.
