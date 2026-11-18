# Changelog

Cyber Clash follows semantic versioning:

- `0.x.0` - minor release with a major feature or milestone.
- `0.x.y` - patch release for fixes, refinements and documentation.

Versions are assigned chronologically to the product changes in Git history.
Agent checkpoint commits are not assigned project versions.

The project version is currently `0.2.4`.

## 0.2.4 - 2026-11-18

- Corrected the versioning policy and retroactively documented project versions
  from the initial commit (`f4e1a11`).
- Added this changelog version history entry.

## 0.2.3 - 2026-11-18

- Corrected the changelog version milestones and distinguished `0.1.0` from
  `0.2.0` (`f4e1a11`).

## 0.2.2 - 2026-11-18

- Added complete project history, commit IDs and feature grouping to the
  changelog (`f0f9cf4`).

## 0.2.1 - 2026-11-18

- Added the project changelog and linked it from the README and documentation
  index (`e4123a3`).

## 0.2.0 - 2026-11-12

### Release bump

- Bumped the server package and lockfile to `0.2.0` and updated GDD variants
  to version 0.2 (`ae85068`).

### Presentation and documentation

- Updated the Malay project title (`7a42b5e`).
- Updated Cyber Clash presentation materials (`07e38cb`).
- Added presentation flowcharts and diagrams (`3fa1785`).
- Organized objective and flow diagrams (`e36f0b4`).
- Added PNG versions of presentation diagrams (`e2263e5`).
- Removed outdated generated diagram files (`9638017`).
- Completed report references and cost sections (`0df989d`).
- Aligned the project audience with IT students (`3ebf033`).

## 0.1.28 - 2026-11-07

- Completed report references and cost sections (`0df989d`).

## 0.1.27 - 2026-11-06

- Aligned match length across GDD variants (`65c5548`).
- Aligned the project audience with IT students (`3ebf033`).

## 0.1.26 - 2026-11-02

- Replaced the report deliverable with the latest document (`104fb33`).
- Documented game technology components (`1e462f9`).
- Shortened report problems and objectives (`4db5bff`).
- Highlighted revised report content (`46fbf86`).
- Revised report wording and technology details (`b515000`).
- Updated the project title in documentation (`aa8384e`).
- Updated the FYP report document (`10d6677`).

## 0.1.25 - 2026-10-13

### Match results

- Showed the final-round explanation after match completion (`9043dfb`).
- Added scenario resolution explanations (`2fb4fe6`).
- Removed the legacy `change_tactic` action (`c495bc5`).

## 0.1.24 - 2026-10-13

### Scenario balancing

- Balanced defence matching and Red Team adaptations (`69d7999`).
- Replaced generic tactic changes with scenario-specific counters
  (`f2a1b5e`).
- Hid Red Team adaptation signals from Blue Team (`017e0dd`).

## 0.1.23 - 2026-10-13

### Client and scenario implementation

- Made the client UI responsive and repaired the responsive layout
  (`64c29c0`, `89be002`).
- Ignored generated Godot import sidecars (`0435898`).
- Documented modular scenarios and branding (`d297069`).
- Added Cyber Clash branding to the client UI (`116a2f7`).
- Made scenario actions state dependent (`35b3b26`).
- Split scenario logic into dedicated modules (`02ade41`).

## 0.1.22 - 2026-10-13

### Multiplayer gameplay

- Added rematch and opponent replacement flow (`8afac4e`).
- Added login adaptation counter-turn gameplay (`98936ef`).
- Added multi-round login scenario gameplay (`e9844e0`).
- Added multi-lobby matchmaking options (`0475426`).
- Improved Cyber Clash client flow and action locking (`d79bb17`).
- Improved multiplayer connection feedback (`9a8bc78`).

## 0.1.21 - 2026-10-13

- Added the Godot client prototype (`2e1c66c`).
- Updated the GDD for the Godot client milestone (`4c39af7`).
- Uploaded project files and deliverables to the main branch (`7ce98e7`,
  `e3ab6d4`).

## 0.1.20 - 2026-10-11

### Localized documentation

- Localized the GDD into Malay and English full/summary variants (`b213239`).
- Aligned the GDD with the server prototype (`dc51eaf`).

## 0.1.19 - 2026-10-11

### Authoritative server

- Added the WebSocket game server (`38e4d94`).
- Added the email scenario server prototype (`fd3c14c`).

## 0.1.18 - 2026-10-11

### Gameplay refinements

- Refined core gameplay flow (`4bf5742`, `f6985ca`).
- Refined Red Team actions and rules (`110e873`).
- Refined Blue Team actions and investigation (`25be626`).
- Refined scenario system and generation rules (`30a8091`).
- Refined unexpected-event triggers and prototype limits (`aefcb42`).

## 0.1.17 - 2026-10-11

### Rule and system alignment

- Aligned game flow with core gameplay (`25eb139`).
- Defined the primary win condition and match results (`718b575`).
- Defined multiplayer connection and disconnect rules (`cf0c16d`).
- Aligned technical requirements with multiplayer (`67adb83`).
- Refined initial-prototype scoring rules (`9786956`).
- Organized multiplayer system sections (`45403e3`).
- Aligned unexpected events with scenario generation (`bcad4be`).

## 0.1.16 - 2026-10-11

### Core GDD systems

- Added dynamic scenario generation (`6c64a9d`).
- Added the multiplayer system (`9b7f06f`).
- Added user-interface design (`586d037`).
- Added technical requirements (`4b711a3`).
- Added scoring and win conditions (`c520308`).
- Added the complete game-flow section (`e33d8a4`).

## 0.1.15 - 2026-10-08

- Added the player information system and information visibility rules
  (`1016ab4`).

## 0.1.14 - 2026-10-07

- Added full and summary GDD variants (`2c37e51`).
- Added the unexpected-event system (`97c2f49`).
- Added the deception system (`e78a2ca`).

## 0.1.13 - 2026-09-20

- Added the initial scenario system (`8d7f863`).

## 0.1.12 - 2026-09-20

- Added Red Team gameplay mechanics (`040a595`).
- Added Red Team gameplay mechanics and rules (`fcab3d0`).

## 0.1.11 - 2026-09-20

- Added the initial Game Design Document (`1123ec6`).

## 0.1.10 - 2026-09-20

- Added the initial client, server and documentation folders (`70cd377`).

## 0.1.0 - 2026-09-20

- Added the project README and initial repository structure (`5010eb7`).
- Established the initial `0.1.0` development version before the `0.2.0`
  server/package release.

## Versioning policy

1. Use `0.x.0` for major gameplay, system or architecture milestones.
2. Use `0.x.y` for refinements, fixes and documentation.
3. Add the commit short hash to each changelog entry.
4. Update the server package, lockfile and GDD version on version releases.
5. Do not assign agent checkpoint commits a project version.
