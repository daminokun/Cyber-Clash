# Cyber Clash

Cyber Clash is a web-based cybersecurity simulation game developed as a Final Year Project (FYP) for IT students.

The project uses Godot as the game engine and JavaScript with Node.js for the multiplayer server.

## Project Title

**PEMBANGUNAN PERMAINAN SIMULASI KESELAMATAN SIBER BERASASKAN WEB UNTUK MENGGUNAKAN GODOT (GAME ENGINE) DAN PROGRAMMING JAVASCRIPT UNTUK PELAJAR IT**

## Features

- Multiplayer gameplay
- Cybersecurity scenarios for IT students
- Red Team and Blue Team roles
- Dynamic scenario generation
- Player scoring system
- Real-time communication through WebSocket

## Technologies

- Godot 4
- JavaScript
- Node.js
- WebSocket
- JSON
- GitHub Actions

## Project Structure

```text
cyber-clash/
├── client/                         Godot game client
├── server/                         Node.js WebSocket server
├── docs/
│   ├── architecture/
│   │   ├── GDD/                    Game Design Documents and translations
│   │   └── diagrams/               System, gameplay and design diagrams
│   ├── development/
│   │   ├── logbook/                Student project logbooks
│   ├── presentations/              Presentation deliverables
│   └── reports/                    FYP report deliverables
└── .github/                        Repository instructions and CI workflow
```

## Client

The Godot client prototype is located in `client/`. Open `client/project.godot` with Godot 4 to work on the game client.

## Server

The multiplayer server is located in `server/`. Run `npm install` and `npm start` from the `server/` directory. Refer to [server/README.md](server/README.md) for server setup and technical details.

## Documentation

The [documentation index](docs/README.md) provides links to the Game Design Document, diagrams, report and presentation.

See [CHANGELOG.md](CHANGELOG.md) for the project change history and version information.

## FYP Project

This project is developed as part of a Final Year Project.
