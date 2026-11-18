# Changelog

All notable product, documentation and repository changes to Cyber Clash are
documented here. Commit IDs make entries traceable to Git and GitHub history.

The project version is currently `0.2.0`.

This changelog covers meaningful commits from project creation on 2026-09-20
through 2026-11-18. Automated agent-session checkpoint commits are not recorded
as separate product changes.

## 2026-11-18

- Added the project changelog and links from the README and documentation index
  (`e4123a3`, committed on `develop`).

## 2026-11-17

- Local automated agent-session activity produced implementation and checkpoint
  records, but no additional GitHub release commit was identified.

## 0.2.0 - 2026-11-12

- Bumped the server package and lockfile to `0.2.0` and updated GDD versions
  across canonical, Malay and English variants (`ae85068`).
- Updated the project title to the Malay Cyber Clash title (`7a42b5e`).
- Updated and organized presentation materials (`07e38cb`, `3fa1785`,
  `e36f0b4`, `e2263e5`, `9638017`).
- Added flowcharts and diagrams for presentation objectives and game flow
  (`3fa1785`, `e36f0b4`, `e2263e5`, `9638017`).
- Completed report references and cost sections (`0df989d`).
- Aligned the project audience with IT students (`3ebf033`).
- Aligned match length across GDD variants (`65c5548`).

## 2026-11-07

- Completed report references and cost sections (`0df989d`).

## 2026-11-06

- Standardized match length across GDD variants (`65c5548`).
- Aligned the project audience with IT students (`3ebf033`).

## 2026-11-02

- Replaced the report deliverable with the latest document (`104fb33`).
- Updated the project title in documentation (`aa8384e`).
- Revised report wording and technology details (`b515000`).
- Highlighted revised report content (`46fbf86`).
- Shortened report problems and objectives (`4db5bff`).
- Documented game technologies and components (`1e462f9`).
- Updated the FYP report document (`10d6677`).

## 2026-10-13

### Godot client and multiplayer

- Added the initial Godot client prototype (`2e1c66c`).
- Updated the GDD for the Godot client milestone (`4c39af7`).
- Improved multiplayer connection feedback and lobby flow (`9a8bc78`,
  `0475426`).
- Improved the client flow and action locking (`d79bb17`).
- Added multi-round login scenario gameplay (`e9844e0`).
- Added login adaptation counter-turn logic (`98936ef`).
- Added rematch and opponent replacement flow (`8afac4e`).
- Uploaded the complete project package and deliverables to the main branch
  (`7ce98e7`).

### Cybersecurity scenarios and branding

- Split scenario logic into dedicated modules (`02ade41`).
- Made scenario actions state dependent (`35b3b26`).
- Added Cyber Clash branding to the client interface (`116a2f7`).
- Documented modular scenarios and branding (`d297069`).
- Made the client UI responsive and repaired its layout (`64c29c0`,
  `89be002`).
- Hid Red Team adaptation signals from Blue Team information (`017e0dd`).
- Replaced generic tactic changes with scenario-specific counters
  (`f2a1b5e`).
- Balanced defense matching and Red Team adaptations (`69d7999`).
- Removed the legacy `change_tactic` action (`c495bc5`).
- Explained scenario resolution results and the final-round outcome
  (`2fb4fe6`, `9043dfb`).

## 2026-10-11

### Server prototype

- Added an email scenario server prototype (`fd3c14c`).
- Added the WebSocket authoritative game server (`38e4d94`).
- Aligned the GDD with server implementation (`dc51eaf`).
- Localized the GDD into Malay and English full/summary variants (`b213239`).

### GDD gameplay and multiplayer design

- Added game flow, scoring and win conditions (`e33d8a4`, `c520308`).
- Added dynamic scenario generation (`6c64a9d`).
- Added multiplayer system design (`9b7f06f`).
- Added user interface design and technical requirements (`586d037`,
  `4b711a3`).
- Refined core gameplay flow and Red/Blue Team actions (`4bf5742`,
  `110e873`, `25be626`).
- Refined scenario generation and unexpected-event rules (`30a8091`,
  `aefcb42`).
- Aligned gameplay, win conditions and game flow (`25eb139`, `718b575`,
  `f6985ca`).
- Added multiplayer connection/disconnect and server requirements (`cf0c16d`,
  `67adb83`, `45403e3`).
- Refined the initial-prototype scoring rules (`9786956`).
- Aligned unexpected events with scenario generation (`bcad4be`).

## 2026-10-08

- Added player information visibility and information-system rules to the GDD
  (`1016ab4`).

## 2026-10-07

- Added the deception system to the GDD (`e78a2ca`).
- Added unexpected-event mechanics (`97c2f49`).
- Added full and summary GDD variants in English and Malay (`2c37e51`,
  `b213239`).

## 2026-09-20

### Project creation

- Created the project README and initial repository structure (`5010eb7`).
- Added initial client, server and documentation folders (`70cd377`).
- Added the initial Game Design Document (`1123ec6`).
- Added Red Team gameplay mechanics and rules (`fcab3d0`, `040a595`).
- Added the scenario system foundation (`8d7f863`).
- Added initial project branding and deliverable assets to the main branch
  (`70cd377`, `7ce98e7`).

## Changelog process

1. Review every Git commit and GitHub branch for notable product changes.
2. Exclude automated agent checkpoint commits or group them separately only
   when they contain useful project changes.
3. Add the commit short hash and commit date to every grouped release entry.
4. Update the server/package version and GDD version for versioned releases.
