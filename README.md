# Cyber Clash

Cyber Clash is a multiplayer cybersecurity simulation game developed as a Final Year Project (FYP).

The game is designed for beginners to learn basic cybersecurity concepts through simple scenarios and player-versus-player gameplay.

## Project Title

**Beginner-Friendly Multiplayer Cybersecurity Simulation Game Using Dynamic Scenario Generation**

## Features

* Multiplayer PvP
* Cybersecurity-based scenarios
* Simple gameplay for beginners
* Dynamic scenario generation with three random scenarios per match
* Player scoring system
* Real-time multiplayer

## Technologies

* Godot
* Node.js
* GitHub
* JSON

## Project Structure

```text
cyber-clash/
├── client/
├── server/
└── docs/
```

### client

Contains the Godot game project.

### server

Contains the multiplayer server and related backend files.

### client

Contains the Godot client prototype. Open `client/project.godot` in Godot 4
after starting the server from the `server` directory. The client branding
asset is stored at `client/assets/branding/cyber_clash_logo.png` and is used
on the main menu, lobby, gameplay header and match result screen. The branded
palette can be rolled back by setting `USE_BRANDED_PALETTE` to `false` in
`client/main.gd`.

### docs

Contains project documentation, diagrams and other materials.

## Development

This project is currently under development.

The development process will include:

1. Game interface
2. Cybersecurity scenarios
3. Scoring system
4. Multiplayer system
5. Dynamic scenario generation
6. Testing

## FYP Project

This project is developed as part of a Final Year Project.
