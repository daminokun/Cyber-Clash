# Cyber Clash

Cyber Clash is a multiplayer cybersecurity simulation game for IT students,
developed as a Final Year Project (FYP).

The game is designed for IT students to learn basic cybersecurity concepts
through simple scenarios and player-versus-player gameplay.

## Project Title

**PEMBANGUNAN PERMAINAN SIMULASI KESELAMATAN SIBER PvP BERASASKAN WEB UNTUK PELAJAR IT MENGGUNAKAN GODOT DAN NODE.JS**

## Features

* Multiplayer PvP
* 42 cybersecurity scenarios across 29 categories
* Clear gameplay for IT students
* Dynamic scenario generation with three random scenarios per match
* Player scoring system
* Real-time multiplayer

## Technologies

* Godot 4
* Node.js
* WebSocket
* JSON
* GitHub Actions

## Project Structure

```text
cyber-clash/
├── client/              Godot project (scenes, scripts, branding)
├── server/              Node.js authoritative server, scenario catalogue, tests
├── docs/
│   ├── GDD/             Canonical Game Design Document and translations
│   ├── deliverables/    Presentation and project report
│   └── diagrams/        Architecture, activity and flow diagrams
└── .github/             Repository instructions and CI workflow
```

### client

The Godot client prototype. Open `client/project.godot` in Godot 4 after
starting the server from the `server` directory.

- `client/main.gd` is the scene controller and protocol router.
- `client/scripts/net_client.gd` owns the WebSocket transport.
- `client/scripts/menu_screen.gd`, `lobby_screen.gd` and `game_screen.gd` build
  the three screens and expose signals to the controller.
- `client/scripts/ui_factory.gd` holds the palette and shared widgets.

The client branding asset is stored at
`client/assets/branding/cyber_clash_logo.png` and is used on the main menu and
lobby. The in-match header uses the wordmark only so the detailed emblem stays
legible at small sizes. The window runs at 1280 x 720 with a stretch/expand
canvas. The branded palette can be rolled back by setting
`USE_BRANDED_PALETTE` to `false` in `client/main.gd`.

### server

The multiplayer server and related backend files. Run `npm install` and
`npm start` from `server/`; see [server/README.md](server/README.md) for the
protocol, scenario rules and scoring.

### docs

Contains project documentation, diagrams and other materials. The canonical
Game Design Document is [docs/GDD/Game-Design-Document.md](docs/GDD/Game-Design-Document.md);
the Malay translation and the simplified summaries are derived from it.
Presentation and report deliverables are under `docs/deliverables/`.

## Development

This project is currently under development.

See [CHANGELOG.md](CHANGELOG.md) for committed changes and the project version
history.

The development process will include:

1. Game interface
2. Cybersecurity scenarios
3. Scoring system
4. Multiplayer system
5. Dynamic scenario generation
6. Testing

## FYP Project

This project is developed as part of a Final Year Project.
