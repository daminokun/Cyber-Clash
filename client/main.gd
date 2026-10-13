extends Control

const SERVER_URL := "ws://127.0.0.1:3000"

var socket := WebSocketPeer.new()
var role := ""
var state: Dictionary = {}
var status_label: Label
var role_label: Label
var event_label: Label
var private_label: Label
var evidence_label: Label
var score_label: Label
var actions_container: VBoxContainer

func _ready() -> void:
	_build_interface()
	_set_status("Connecting to server...")
	var error := socket.connect_to_url(SERVER_URL)
	if error != OK:
		_set_status("Connection failed: %s" % error_string(error))

func _process(_delta: float) -> void:
	socket.poll()
	var connection_state := socket.get_ready_state()
	if connection_state == WebSocketPeer.STATE_OPEN:
		if status_label.text.begins_with("Connecting"):
			_set_status("Connected. Waiting for role...")
		while socket.get_available_packet_count() > 0:
			_handle_message(socket.get_packet().get_string_from_utf8())
	elif connection_state == WebSocketPeer.STATE_CLOSED:
		_set_status("Disconnected from server.")

func _build_interface() -> void:
	var margin := MarginContainer.new()
	margin.set_anchors_and_offsets_preset(Control.PRESET_FULL_RECT)
	margin.add_theme_constant_override("margin_left", 32)
	margin.add_theme_constant_override("margin_top", 24)
	margin.add_theme_constant_override("margin_right", 32)
	margin.add_theme_constant_override("margin_bottom", 24)
	add_child(margin)

	var layout := VBoxContainer.new()
	layout.add_theme_constant_override("separation", 12)
	margin.add_child(layout)

	var title := Label.new()
	title.text = "Cyber Clash"
	title.add_theme_font_size_override("font_size", 28)
	layout.add_child(title)

	role_label = Label.new()
	layout.add_child(role_label)
	status_label = Label.new()
	layout.add_child(status_label)

	var separator := HSeparator.new()
	layout.add_child(separator)

	event_label = Label.new()
	event_label.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
	layout.add_child(event_label)

	private_label = Label.new()
	private_label.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
	layout.add_child(private_label)

	evidence_label = Label.new()
	evidence_label.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
	layout.add_child(evidence_label)

	score_label = Label.new()
	layout.add_child(score_label)

	actions_container = VBoxContainer.new()
	actions_container.add_theme_constant_override("separation", 8)
	layout.add_child(actions_container)

func _handle_message(raw_message: String) -> void:
	var message = JSON.parse_string(raw_message)
	if not message is Dictionary:
		_set_status("Received invalid server message.")
		return

	match message.get("type", ""):
		"joined":
			role = message.get("role", "")
			role_label.text = "Role: %s" % role.capitalize()
			_set_status("Role assigned.")
		"state":
			var received_state = message.get("state", {})
			if received_state is Dictionary:
				_render_state(received_state)
		"error":
			_set_status("Server error: %s" % message.get("error", "unknown_error"))
		_:
			_set_status("Unknown server message.")

func _render_state(received_state: Dictionary) -> void:
	state = received_state
	var event: Dictionary = state.get("event", {})
	event_label.text = "Event: %s\n%s\nSender: %s\nSubject: %s" % [
		event.get("title", ""),
		event.get("description", ""),
		event.get("sender", ""),
		event.get("subject", "")
	]
	private_label.text = _format_private_info(state.get("private", {}))
	evidence_label.text = _format_evidence(state.get("evidence", {}))
	var scores: Dictionary = state.get("scores", {})
	score_label.text = "Score - Red: %s | Blue: %s | Phase: %s" % [
		scores.get("red", 0),
		scores.get("blue", 0),
		state.get("phase", "")
	]
	_rebuild_action_buttons(state.get("availableActions", []))
	if state.has("outcome"):
		_set_status("Scenario result: %s" % state.get("outcome"))

func _format_private_info(private_info: Dictionary) -> String:
	if private_info.is_empty():
		return ""
	return "Private information:\nStatus: %s\nObjective: %s" % [
		private_info.get("originalStatus", ""),
		private_info.get("objective", "")
	]

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
		var button := Button.new()
		button.text = str(action).replace("_", " ").capitalize()
		button.pressed.connect(_send_action.bind(str(action)))
		actions_container.add_child(button)

func _send_action(action: String) -> void:
	if socket.get_ready_state() != WebSocketPeer.STATE_OPEN:
		_set_status("Cannot send action while disconnected.")
		return
	socket.send_text(JSON.stringify({
		"type": "action",
		"action": action
	}))
	_set_status("Action submitted: %s" % action.replace("_", " "))

func _set_status(message: String) -> void:
	if status_label:
		status_label.text = message
