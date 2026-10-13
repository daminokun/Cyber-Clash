extends Control

const DEFAULT_SERVER_HOST := "127.0.0.1"
const SERVER_PORT := 3000
const LOGO_PATH := "res://assets/branding/cyber_clash_logo.png"
const USE_BRANDED_PALETTE := true
const LEGACY_CYAN := Color("#00f5ff")
const LEGACY_MAGENTA := Color("#ff2bd6")
const LEGACY_BACKGROUND := Color("#050713")
const LEGACY_PANEL := Color("#0b1020")
const LEGACY_TEXT := Color("#d9f7ff")
const LEGACY_MUTED := Color("#8aa8b8")
const BRANDED_CYAN := Color("#00cfff")
const BRANDED_MAGENTA := Color("#ff2b3d")
const BRANDED_BACKGROUND := Color("#050713")
const BRANDED_PANEL := Color("#0b1020")
const BRANDED_TEXT := Color("#eefaff")
const BRANDED_MUTED := Color("#8aa8b8")

var socket := WebSocketPeer.new()
var cyan: Color
var magenta: Color
var background_color: Color
var panel_color: Color
var text_color: Color
var muted_color: Color
var logo_texture: Texture2D
var role := ""
var state: Dictionary = {}
var connection_rejected := false
var connection_attempted := false
var action_pending := false
var join_mode := ""
var join_request_sent := false
var menu_container: Control
var lobby_container: Control
var game_container: Control
var ip_input: LineEdit
var match_id_input: LineEdit
var menu_status_label: Label
var lobby_status_label: Label
var lobby_detail_label: Label
var status_label: Label
var role_label: Label
var event_label: Label
var private_label: Label
var evidence_label: Label
var score_label: Label
var actions_container: VBoxContainer
var match_result_label: Label
var match_result_logo: TextureRect

func _ready() -> void:
	_apply_ui_palette()
	logo_texture = load(LOGO_PATH) as Texture2D
	if logo_texture == null:
		push_error("Unable to load Cyber Clash logo: %s" % LOGO_PATH)
	_build_interface()
	_show_menu()

func _apply_ui_palette() -> void:
	if USE_BRANDED_PALETTE:
		cyan = BRANDED_CYAN
		magenta = BRANDED_MAGENTA
		background_color = BRANDED_BACKGROUND
		panel_color = BRANDED_PANEL
		text_color = BRANDED_TEXT
		muted_color = BRANDED_MUTED
	else:
		cyan = LEGACY_CYAN
		magenta = LEGACY_MAGENTA
		background_color = LEGACY_BACKGROUND
		panel_color = LEGACY_PANEL
		text_color = LEGACY_TEXT
		muted_color = LEGACY_MUTED

func _process(_delta: float) -> void:
	socket.poll()
	var connection_state := socket.get_ready_state()
	if connection_state == WebSocketPeer.STATE_OPEN:
		if not join_request_sent:
			socket.send_text(JSON.stringify(_build_join_request()))
			join_request_sent = true
			lobby_status_label.text = "CONTACTING MATCHMAKER..."
		if lobby_status_label and lobby_status_label.text.begins_with("Connecting"):
			lobby_status_label.text = "CONNECTED // WAITING FOR MATCH"
		while socket.get_available_packet_count() > 0:
			_handle_message(socket.get_packet().get_string_from_utf8())
	elif connection_state == WebSocketPeer.STATE_CLOSED:
		if connection_attempted and not connection_rejected and status_label and not status_label.text.contains("disconnected"):
			_set_status("Disconnected from server.")
			if game_container and game_container.visible:
				lobby_status_label.text = "CONNECTION LOST"

func _build_interface() -> void:
	var background := ColorRect.new()
	background.color = background_color
	background.set_anchors_and_offsets_preset(Control.PRESET_FULL_RECT)
	add_child(background)

	menu_container = _build_menu()
	add_child(menu_container)
	lobby_container = _build_lobby()
	add_child(lobby_container)
	game_container = _build_game()
	add_child(game_container)

func _build_menu() -> Control:
	var root := Control.new()
	root.set_anchors_and_offsets_preset(Control.PRESET_FULL_RECT)
	var margin := MarginContainer.new()
	margin.set_anchors_and_offsets_preset(Control.PRESET_FULL_RECT)
	margin.add_theme_constant_override("margin_left", 70)
	margin.add_theme_constant_override("margin_right", 70)
	margin.add_theme_constant_override("margin_top", 45)
	margin.add_theme_constant_override("margin_bottom", 45)
	root.add_child(margin)

	var center := CenterContainer.new()
	center.set_anchors_and_offsets_preset(Control.PRESET_FULL_RECT)
	margin.add_child(center)
	var box := VBoxContainer.new()
	box.custom_minimum_size = Vector2(620, 0)
	box.add_theme_constant_override("separation", 14)
	center.add_child(box)

	box.add_child(_create_logo(220, 110))
	var title := Label.new()
	title.text = "CYBER//CLASH"
	title.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	title.add_theme_font_size_override("font_size", 58)
	title.add_theme_color_override("font_color", cyan)
	box.add_child(title)

	var subtitle := Label.new()
	subtitle.text = "1V1 DIGITAL DEFENCE SIMULATION"
	subtitle.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	subtitle.add_theme_font_size_override("font_size", 18)
	subtitle.add_theme_color_override("font_color", magenta)
	box.add_child(subtitle)

	var info := Label.new()
	info.text = "Red Team attacks. Blue Team investigates. The server decides."
	info.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	info.add_theme_color_override("font_color", text_color)
	box.add_child(info)

	var host := _create_button("HOST MATCH", 54, 20)
	host.pressed.connect(_connect_to_match.bind("host"))
	box.add_child(host)

	var join_title := Label.new()
	join_title.text = "JOIN BY SERVER IP + MATCH ID"
	join_title.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	join_title.add_theme_color_override("font_color", cyan)
	box.add_child(join_title)

	ip_input = LineEdit.new()
	ip_input.placeholder_text = "Server IP (example: 192.168.1.20)"
	ip_input.text = DEFAULT_SERVER_HOST
	ip_input.custom_minimum_size = Vector2(0, 46)
	box.add_child(ip_input)

	match_id_input = LineEdit.new()
	match_id_input.name = "MatchIdInput"
	match_id_input.placeholder_text = "Match ID (example: 482019)"
	match_id_input.custom_minimum_size = Vector2(0, 46)
	box.add_child(match_id_input)

	var join := _create_button("JOIN MATCH", 54, 20)
	join.pressed.connect(_connect_to_match.bind("match"))
	box.add_child(join)

	var auto_match := _create_button("AUTO MATCH", 48, 18)
	auto_match.pressed.connect(_connect_to_match.bind("auto"))
	box.add_child(auto_match)

	menu_status_label = Label.new()
	menu_status_label.text = "LOCAL TEST: run the server, then connect two clients."
	menu_status_label.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	menu_status_label.add_theme_color_override("font_color", muted_color)
	box.add_child(menu_status_label)
	return root

func _build_lobby() -> Control:
	var root := Control.new()
	root.set_anchors_and_offsets_preset(Control.PRESET_FULL_RECT)
	var margin := MarginContainer.new()
	margin.set_anchors_and_offsets_preset(Control.PRESET_FULL_RECT)
	margin.add_theme_constant_override("margin_left", 100)
	margin.add_theme_constant_override("margin_right", 100)
	margin.add_theme_constant_override("margin_top", 70)
	margin.add_theme_constant_override("margin_bottom", 70)
	root.add_child(margin)
	var box := VBoxContainer.new()
	box.add_theme_constant_override("separation", 18)
	margin.add_child(box)

	box.add_child(_create_logo(140, 85))
	var title := Label.new()
	title.text = "MATCHMAKING // QUEUE"
	title.add_theme_font_size_override("font_size", 38)
	title.add_theme_color_override("font_color", cyan)
	box.add_child(title)
	lobby_status_label = Label.new()
	lobby_status_label.add_theme_font_size_override("font_size", 20)
	lobby_status_label.add_theme_color_override("font_color", magenta)
	box.add_child(lobby_status_label)
	lobby_detail_label = Label.new()
	lobby_detail_label.text = "The server is assigning Red Team and Blue Team."
	lobby_detail_label.add_theme_font_size_override("font_size", 22)
	lobby_detail_label.add_theme_color_override("font_color", text_color)
	lobby_detail_label.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
	box.add_child(lobby_detail_label)
	var hint := Label.new()
	hint.text = "Once two players are connected, the scenario starts automatically."
	hint.add_theme_color_override("font_color", muted_color)
	box.add_child(hint)
	var back := _create_button("ABORT", 44, 16)
	back.pressed.connect(_abort_connection)
	box.add_child(back)
	return root

func _build_game() -> Control:
	var root := Control.new()
	root.set_anchors_and_offsets_preset(Control.PRESET_FULL_RECT)
	var margin := MarginContainer.new()
	margin.set_anchors_and_offsets_preset(Control.PRESET_FULL_RECT)
	margin.add_theme_constant_override("margin_left", 32)
	margin.add_theme_constant_override("margin_top", 24)
	margin.add_theme_constant_override("margin_right", 32)
	margin.add_theme_constant_override("margin_bottom", 24)
	root.add_child(margin)
	var layout := VBoxContainer.new()
	layout.add_theme_constant_override("separation", 16)
	margin.add_child(layout)

	var header := HBoxContainer.new()
	header.add_theme_constant_override("separation", 18)
	layout.add_child(header)
	header.add_child(_create_logo(86, 58))
	var title := Label.new()
	title.text = "CYBER//CLASH"
	title.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	title.add_theme_font_size_override("font_size", 30)
	title.add_theme_color_override("font_color", cyan)
	header.add_child(title)
	role_label = Label.new()
	role_label.add_theme_color_override("font_color", magenta)
	role_label.horizontal_alignment = HORIZONTAL_ALIGNMENT_RIGHT
	header.add_child(role_label)

	var divider := HSeparator.new()
	divider.add_theme_color_override("separator", cyan)
	layout.add_child(divider)

	status_label = Label.new()
	status_label.add_theme_color_override("font_color", text_color)
	status_label.text_overrun_behavior = TextServer.OVERRUN_TRIM_ELLIPSIS
	status_label.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	layout.add_child(status_label)
	match_result_label = Label.new()
	match_result_label.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	match_result_label.add_theme_font_size_override("font_size", 20)
	match_result_label.add_theme_color_override("font_color", magenta)
	match_result_label.visible = false
	match_result_logo = _create_logo(140, 85)
	match_result_logo.visible = false
	layout.add_child(match_result_logo)
	layout.add_child(match_result_label)

	var content := HBoxContainer.new()
	content.size_flags_vertical = Control.SIZE_EXPAND_FILL
	content.add_theme_constant_override("separation", 16)
	layout.add_child(content)

	var briefing_panel := _create_panel()
	briefing_panel.custom_minimum_size = Vector2(200, 0)
	content.add_child(briefing_panel)
	var briefing := VBoxContainer.new()
	briefing.add_theme_constant_override("separation", 12)
	var briefing_scroll := _create_scroll_container()
	briefing_scroll.add_child(briefing)
	briefing_panel.add_child(briefing_scroll)
	var briefing_title := Label.new()
	briefing_title.text = "INCIDENT BRIEF"
	briefing_title.add_theme_font_size_override("font_size", 18)
	briefing_title.add_theme_color_override("font_color", magenta)
	briefing.add_child(briefing_title)
	event_label = _create_text_label()
	briefing.add_child(event_label)
	private_label = _create_text_label()
	briefing.add_child(private_label)

	var intel_panel := _create_panel()
	intel_panel.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	content.add_child(intel_panel)
	var intel := VBoxContainer.new()
	intel.add_theme_constant_override("separation", 12)
	var intel_scroll := _create_scroll_container()
	intel_scroll.add_child(intel)
	intel_panel.add_child(intel_scroll)
	var intel_title := Label.new()
	intel_title.text = "SECURITY INTELLIGENCE"
	intel_title.add_theme_font_size_override("font_size", 18)
	intel_title.add_theme_color_override("font_color", cyan)
	intel.add_child(intel_title)
	evidence_label = _create_text_label()
	evidence_label.size_flags_vertical = Control.SIZE_EXPAND_FILL
	intel.add_child(evidence_label)
	score_label = Label.new()
	score_label.add_theme_color_override("font_color", cyan)
	intel.add_child(score_label)

	var action_panel := _create_panel()
	action_panel.custom_minimum_size = Vector2(180, 0)
	content.add_child(action_panel)
	var action_layout := VBoxContainer.new()
	action_layout.add_theme_constant_override("separation", 12)
	var action_scroll := _create_scroll_container()
	action_scroll.add_child(action_layout)
	action_panel.add_child(action_scroll)
	var action_title := Label.new()
	action_title.text = "SELECT ACTION"
	action_title.add_theme_font_size_override("font_size", 18)
	action_title.add_theme_color_override("font_color", magenta)
	action_layout.add_child(action_title)
	actions_container = VBoxContainer.new()
	actions_container.add_theme_constant_override("separation", 8)
	actions_container.size_flags_vertical = Control.SIZE_EXPAND_FILL
	action_layout.add_child(actions_container)
	return root

func _create_panel() -> PanelContainer:
	var panel := PanelContainer.new()
	var style := StyleBoxFlat.new()
	style.bg_color = panel_color
	style.border_color = Color("#16404a")
	style.set_border_width_all(1)
	style.set_corner_radius_all(4)
	style.content_margin_left = 16
	style.content_margin_top = 16
	style.content_margin_right = 16
	style.content_margin_bottom = 16
	panel.add_theme_stylebox_override("panel", style)
	return panel

func _create_logo(width: float, height: float) -> TextureRect:
	var logo := TextureRect.new()
	logo.custom_minimum_size = Vector2(width, height)
	logo.size_flags_horizontal = Control.SIZE_SHRINK_CENTER
	logo.expand_mode = TextureRect.EXPAND_IGNORE_SIZE
	logo.stretch_mode = TextureRect.STRETCH_KEEP_ASPECT_CENTERED
	logo.texture = logo_texture
	return logo

func _create_scroll_container() -> ScrollContainer:
	var scroll := ScrollContainer.new()
	scroll.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	scroll.size_flags_vertical = Control.SIZE_EXPAND_FILL
	scroll.horizontal_scroll_mode = ScrollContainer.SCROLL_MODE_DISABLED
	return scroll

func _create_text_label() -> Label:
	var label := Label.new()
	label.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
	label.add_theme_color_override("font_color", text_color)
	return label

func _create_button(text: String, height: int, font_size: int) -> Button:
	var button := Button.new()
	button.text = text
	button.custom_minimum_size = Vector2(0, height)
	button.add_theme_font_size_override("font_size", font_size)
	button.clip_text = true
	return button

func _show_menu() -> void:
	menu_container.visible = true
	lobby_container.visible = false
	game_container.visible = false

func _connect_to_match(mode: String) -> void:
	var address := ip_input.text.strip_edges()
	if address.is_empty():
		address = DEFAULT_SERVER_HOST
	var url := address
	if not address.begins_with("ws://") and not address.begins_with("wss://"):
		url = "ws://%s:%d" % [address, SERVER_PORT]
	socket = WebSocketPeer.new()
	connection_rejected = false
	connection_attempted = true
	join_mode = mode
	join_request_sent = false
	var error := socket.connect_to_url(url)
	if error != OK:
		connection_attempted = false
		menu_status_label.text = "CONNECTION ERROR: %s" % error_string(error)
		return
	menu_container.visible = false
	lobby_container.visible = true
	lobby_status_label.text = "Connecting to %s..." % url
	lobby_detail_label.text = "Waiting for the matchmaker."

func _build_join_request() -> Dictionary:
	var request := {
		"type": "join",
		"mode": join_mode
	}
	if join_mode == "match":
		request.matchId = match_id_input.text.strip_edges()
	return request

func _abort_connection() -> void:
	socket.close()
	connection_attempted = false
	join_request_sent = false
	role = ""
	state = {}
	_show_menu()
	menu_status_label.text = "Connection cancelled."

func _handle_message(raw_message: String) -> void:
	var message = JSON.parse_string(raw_message)
	if not message is Dictionary:
		_set_status("Received invalid server message.")
		return

	match message.get("type", ""):
		"joined":
			role = message.get("role", "")
			role_label.text = "ROLE ASSIGNED: %s" % role.to_upper()
			lobby_status_label.text = "MATCH %s // %s" % [
				str(message.get("matchId", "------")),
				role.to_upper()
			]
			lobby_detail_label.text = "You are %s. Waiting for the second player..." % role.capitalize()
		"waiting_for_player":
			lobby_status_label.text = "WAITING FOR PLAYER 2"
			lobby_detail_label.text = "Match ID: %s\nShare this ID with the second player." % message.get("matchId", "------")
		"state":
			var received_state = message.get("state", {})
			if received_state is Dictionary:
				_render_state(received_state)
		"round_waiting":
			var is_ready := bool(message.get("ready", false))
			action_pending = is_ready
			if is_ready:
				_clear_action_buttons()
			else:
				_rebuild_ready_button()
			_set_status("Waiting for opponent... (%s/%s ready)" % [
				message.get("readyCount", 0),
				message.get("requiredPlayers", 2)
			])
		"match_complete":
			action_pending = true
			_clear_action_buttons()
			var final_scores: Dictionary = message.get("scores", {})
			match_result_label.text = "MATCH COMPLETE\nWINNER: %s\nRED %s  |  BLUE %s" % [
				str(message.get("winner", "draw")).to_upper(),
				final_scores.get("red", 0),
				final_scores.get("blue", 0)
			]
			match_result_label.visible = true
			match_result_logo.visible = true
			_set_status("Match complete. Winner: %s | Red: %s | Blue: %s" % [
				str(message.get("winner", "draw")).capitalize(),
				final_scores.get("red", 0),
				final_scores.get("blue", 0)
			])
			_add_rematch_button()
		"rematch_waiting":
			action_pending = true
			_clear_action_buttons()
			_set_status("Waiting for opponent to confirm rematch...")
		"new_opponent":
			action_pending = false
			match_result_label.visible = false
			match_result_logo.visible = false
			lobby_container.visible = true
			game_container.visible = false
			lobby_status_label.text = "NEW OPPONENT FOUND"
			lobby_detail_label.text = "You are playing against a new opponent in Match %s." % message.get("matchId", "------")
			_set_status("New opponent found.")
		"error":
			var server_error := str(message.get("error", "unknown_error"))
			if action_pending:
				action_pending = false
				if not state.is_empty():
					_render_state(state)
			connection_rejected = [
				"match_full",
				"match_not_found",
				"invalid_join_mode",
				"join_required"
			].has(server_error)
			if connection_rejected:
				lobby_status_label.text = "MATCH UNAVAILABLE"
				lobby_detail_label.text = "The selected match is full or does not exist. Try Auto Match or create a new match."
				_set_status("Match full. Only two players are allowed.")
			else:
				_set_status("Server error: %s" % server_error)
		"player_disconnected":
			_set_status("%s player disconnected. Restart the match to continue." % str(message.get("role", "Opponent")).capitalize())
		_:
			_set_status("Unknown server message.")

func _render_state(received_state: Dictionary) -> void:
	state = received_state
	action_pending = false
	match_result_label.visible = false
	match_result_logo.visible = false
	lobby_container.visible = false
	game_container.visible = true
	var event: Dictionary = state.get("event", {})
	event_label.text = _format_event(event)
	private_label.text = _format_private_info(state.get("private", {}))
	evidence_label.text = _format_evidence(state.get("evidence", {}))
	var scores: Dictionary = state.get("scores", {})
	score_label.text = "Round %s/%s | Score - Red: %s | Blue: %s | Phase: %s" % [
		int(state.get("round", 1)),
		int(state.get("maxRounds", 3)),
		scores.get("red", 0),
		scores.get("blue", 0),
		state.get("phase", "")
	]
	_set_status("Scenario updated. Choose an available action.")
	var available_actions: Array = state.get("availableActions", [])
	if role == "red":
		var private_info: Dictionary = state.get("private", {})
		available_actions = private_info.get("availableActions", [])
	_rebuild_action_buttons(available_actions)
	if state.has("outcome"):
		_set_status("Scenario result: %s" % state.get("outcome"))
		if int(state.get("round", 1)) < int(state.get("maxRounds", 3)):
			_add_ready_button()

func _format_private_info(private_info: Dictionary) -> String:
	if private_info.is_empty():
		return ""
	return "Private information:\nStatus: %s\nObjective: %s" % [
		private_info.get("originalStatus", ""),
		private_info.get("objective", "")
	]

func _format_event(event: Dictionary) -> String:
	var lines := [
		"Event: %s" % event.get("title", ""),
		str(event.get("description", ""))
	]
	for key in event:
		if key in ["title", "description"]:
			continue
		var label := str(key).replace("_", " ").capitalize()
		lines.append("%s: %s" % [label, event[key]])
	return "\n".join(lines)

func _format_evidence(evidence: Dictionary) -> String:
	if evidence.is_empty():
		return ""
	var lines := ["Investigation evidence:"]
	for key in evidence:
		lines.append("%s: %s" % [key, evidence[key]])
	return "\n".join(lines)

func _rebuild_action_buttons(actions: Array) -> void:
	for child in actions_container.get_children():
		child.queue_free()
	for action in actions:
		var button := _create_button(str(action).replace("_", " ").capitalize(), 40, 13)
		button.clip_text = true
		button.tooltip_text = str(action).replace("_", " ").capitalize()
		button.pressed.connect(_send_action.bind(str(action)))
		actions_container.add_child(button)

func _send_action(action: String) -> void:
	if action_pending:
		return
	if socket.get_ready_state() != WebSocketPeer.STATE_OPEN:
		_set_status("Cannot send action while disconnected.")
		return
	action_pending = true
	_clear_action_buttons()
	socket.send_text(JSON.stringify({
		"type": "action",
		"action": action
	}))
	_set_status("Waiting for response...")

func _clear_action_buttons() -> void:
	for child in actions_container.get_children():
		child.queue_free()

func _add_ready_button() -> void:
	var button := _create_button("READY FOR NEXT ROUND", 40, 12)
	button.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
	button.pressed.connect(_send_ready_for_next_round)
	actions_container.add_child(button)

func _rebuild_ready_button() -> void:
	_clear_action_buttons()
	_add_ready_button()

func _send_ready_for_next_round() -> void:
	if action_pending:
		return
	if socket.get_ready_state() != WebSocketPeer.STATE_OPEN:
		_set_status("Cannot continue while disconnected.")
		return
	action_pending = true
	_clear_action_buttons()
	socket.send_text(JSON.stringify({
		"type": "ready_next_round"
	}))
	_set_status("Waiting for opponent...")

func _add_rematch_button() -> void:
	var button := _create_button("REMATCH", 40, 13)
	button.pressed.connect(_send_rematch)
	actions_container.add_child(button)

func _send_rematch() -> void:
	if socket.get_ready_state() != WebSocketPeer.STATE_OPEN:
		_set_status("Cannot rematch while disconnected.")
		return
	action_pending = true
	_clear_action_buttons()
	socket.send_text(JSON.stringify({
		"type": "rematch"
	}))
	_set_status("Looking for rematch...")

func _set_status(message: String) -> void:
	if status_label:
		status_label.text = message
