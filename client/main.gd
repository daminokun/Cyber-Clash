extends Control

## Scene controller: wires the transport to the three screens and routes the
## JSON protocol. Screen building lives in scripts/menu_screen.gd,
## scripts/lobby_screen.gd and scripts/game_screen.gd.

const GameClient = preload("res://scripts/net_client.gd")
const UIFactory = preload("res://scripts/ui_factory.gd")
const MenuScreen = preload("res://scripts/menu_screen.gd")
const LobbyScreen = preload("res://scripts/lobby_screen.gd")
const GameScreen = preload("res://scripts/game_screen.gd")

const USE_BRANDED_PALETTE := true
const JOIN_ERRORS := [
	"match_full",
	"match_not_found",
	"match_unavailable",
	"invalid_join_mode",
	"join_required"
]

var ui: UIFactory
var client: GameClient
var menu_screen: MenuScreen
var lobby_screen: LobbyScreen
var game_screen: GameScreen
var role := ""
var state: Dictionary = {}
var join_rejected := false

func _ready() -> void:
	ui = UIFactory.new(USE_BRANDED_PALETTE)
	client = GameClient.new()
	client.message_received.connect(_on_message)
	client.connection_opened.connect(_on_connection_opened)
	client.connection_closed.connect(_on_connection_closed)
	client.connection_failed.connect(_on_connection_failed)
	_build_interface()
	_show_menu()

func _process(_delta: float) -> void:
	client.poll()

func _build_interface() -> void:
	add_child(ui.create_background())

	menu_screen = MenuScreen.new()
	menu_screen.setup(ui)
	menu_screen.connect_requested.connect(_on_connect_requested)
	add_child(menu_screen)

	lobby_screen = LobbyScreen.new()
	lobby_screen.setup(ui)
	lobby_screen.abort_requested.connect(_on_abort_requested)
	add_child(lobby_screen)

	game_screen = GameScreen.new()
	game_screen.setup(ui)
	game_screen.action_requested.connect(_on_action_requested)
	game_screen.ready_requested.connect(_on_ready_requested)
	game_screen.rematch_requested.connect(_on_rematch_requested)
	game_screen.leave_requested.connect(_on_leave_requested)
	add_child(game_screen)

func _show_menu() -> void:
	menu_screen.visible = true
	lobby_screen.visible = false
	game_screen.visible = false

func _show_lobby() -> void:
	menu_screen.visible = false
	lobby_screen.visible = true
	game_screen.visible = false

func _show_game() -> void:
	menu_screen.visible = false
	lobby_screen.visible = false
	game_screen.visible = true

func _on_connect_requested(address: String, mode: String, match_id: String) -> void:
	join_rejected = false
	var error = client.connect_to_server(address, mode, match_id)
	if error != OK:
		menu_screen.set_status("CONNECTION ERROR: %s" % error_string(error))
		return
	lobby_screen.begin(client.last_url)
	_show_lobby()

func _on_connection_opened() -> void:
	lobby_screen.show_connected()

func _on_connection_closed() -> void:
	if join_rejected:
		return
	if game_screen.visible:
		game_screen.show_connection_lost()
	elif lobby_screen.visible:
		lobby_screen.show_connection_lost()
	else:
		menu_screen.set_status("Connection to the server closed.")

func _on_connection_failed() -> void:
	if lobby_screen.visible:
		lobby_screen.show_connection_failed()
	else:
		menu_screen.set_status(
			"Could not reach the server. Check the IP address and that the server is running."
		)

func _on_message(message: Dictionary) -> void:
	match str(message.get("type", "")):
		"joined":
			role = str(message.get("role", ""))
			lobby_screen.show_joined(str(message.get("matchId", "------")), role)
			_show_lobby()
		"waiting_for_player":
			lobby_screen.show_waiting(str(message.get("matchId", "------")))
			_show_lobby()
		"state":
			var received = message.get("state", {})
			if received is Dictionary:
				_render_state(received)
		"round_waiting":
			game_screen.show_round_waiting(
				bool(message.get("ready", false)),
				int(message.get("readyCount", 0)),
				int(message.get("requiredPlayers", 2))
			)
		"match_complete":
			game_screen.show_match_complete(message)
		"rematch_waiting":
			game_screen.show_rematch_waiting()
		"new_opponent":
			role = str(message.get("role", role))
			lobby_screen.show_new_opponent(str(message.get("matchId", "------")))
			_show_lobby()
		"error":
			_handle_error(str(message.get("error", "unknown_error")))
		"player_disconnected":
			if game_screen.visible:
				game_screen.show_opponent_disconnected()
			elif lobby_screen.visible:
				lobby_screen.show_opponent_left()
		_:
			game_screen.set_status("Unknown server message: %s" % str(message.get("type", "")))

func _render_state(received: Dictionary) -> void:
	state = received
	game_screen.render_state(received, role)
	_show_game()

func _handle_error(server_error: String) -> void:
	if server_error == "match_abandoned":
		if game_screen.visible:
			game_screen.show_opponent_disconnected()
		return
	if JOIN_ERRORS.has(server_error):
		join_rejected = true
		lobby_screen.show_rejected()
		_show_lobby()
		return
	if game_screen.visible:
		game_screen.cancel_pending("Server error: %s" % server_error)
	elif lobby_screen.visible:
		lobby_screen.set_message("Server error: %s" % server_error)
	else:
		menu_screen.set_status("Server error: %s" % server_error)

func _on_action_requested(action: String) -> void:
	if not client.send_action(action):
		game_screen.show_connection_lost()

func _on_ready_requested() -> void:
	if not client.send_ready_next_round():
		game_screen.show_connection_lost()

func _on_rematch_requested() -> void:
	if not client.send_rematch():
		game_screen.show_connection_lost()

func _on_abort_requested() -> void:
	client.close()
	_reset_session()
	_show_menu()
	menu_screen.set_status("Connection cancelled.")

func _on_leave_requested() -> void:
	client.close()
	_reset_session()
	_show_menu()
	menu_screen.set_status("You left the match.")

func _reset_session() -> void:
	role = ""
	state = {}
