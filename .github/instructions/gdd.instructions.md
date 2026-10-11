---
name: "Cyber Clash GDD Guidelines"
description: "Use when editing the Cyber Clash Game Design Document, localized GDD files, gameplay rules, scenarios, scoring, turns, or player information visibility."
applyTo: "docs/**/*.md"
---

# GDD Guidelines

- Use [docs/GDD/Game-Design-Document.md](../../docs/GDD/Game-Design-Document.md) as the canonical English reference unless the task explicitly targets another variant.
- Keep the four GDD variants aligned: `GDD`, `EN-Simple`, `EN-Full`, `BM-Simple`, and `BM-Full`.
- Preserve the distinction between Red Team private information, Blue Team permitted information, and server-only hidden state.
- State gameplay rules precisely: valid actions, phase order, conditions, limits, scoring, and possible outcomes.
- Do not silently resolve gameplay ambiguities. Mark them for clarification or state the assumption explicitly.
- For terminology changes, check all localized variants and keep role, phase, action, and scenario names consistent.
