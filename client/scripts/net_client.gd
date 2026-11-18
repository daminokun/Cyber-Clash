extends RefCounted

## WebSocket transport and JSON protocol handling.
## Owns no UI: emits signals for the scene controller to react to.

signal message_received(message: Dictionary)
signal connection_opened
signal connection_closed
signal connection_failed

const DEFAULT_HOST := "127.0.0.1"
const DEFAULT_PORT := 3000

var socket := WebSocketPeer.new()
var closing_socket: WebSocketPeer = null
var last_url := ""
var join_mode := ""
var pending_match_id := ""
var join_sent := false
var opened := false
var connecting := false

func build_url(address: String) -> String:
	var trimmed := address.strip_edges()
	if trimmed.is_empty():
		trimmed = DEFAULT_HOST
	if trimmed.begins_with("ws://") or trimmed.begins_with("wss://"):
		return trimmed
	if trimmed.contains(":"):
		return "ws://%s" % trimmed
	return "ws://%s:%d" % [trimmed, DEFAULT_PORT]

func connect_to_server(address: String, mode: String, match_id := "") -> Error:
	socket = WebSocketPeer.new()
	join_mode = mode
	pending_match_id = match_id
	join_sent = false
	opened = false
	connecting = true
	last_url = build_url(address)
	var error := socket.connect_to_url(last_url)
	if error != OK:
		connecting = false
	return error

func poll() -> void:
	# An intentional close still needs polling until the close frame is sent.
	if closing_socket != null:
		closing_socket.poll()
		if closing_socket.get_ready_state() == WebSocketPeer.STATE_CLOSED:
			closing_socket = null
	if not connecting:
		return
	socket.poll()
	match socket.get_ready_state():
		WebSocketPeer.STATE_OPEN:
			if not join_sent:
				join_sent = true
				opened = true
				connection_opened.emit()
				send_message(_join_request())
			while socket.get_available_packet_count() > 0:
				var packet := socket.get_packet().get_string_from_utf8()
				var parsed = JSON.parse_string(packet)
				if parsed is Dictionary:
					message_received.emit(parsed)
		WebSocketPeer.STATE_CLOSED:
			connecting = false
			if opened:
				connection_closed.emit()
			else:
				connection_failed.emit()

func send_message(message: Dictionary) -> bool:
	if socket.get_ready_state() != WebSocketPeer.STATE_OPEN:
		return false
	socket.send_text(JSON.stringify(message))
	return true

func send_action(action: String) -> bool:
	return send_message({"type": "action", "action": action})

func send_ready_next_round() -> bool:
	return send_message({"type": "ready_next_round"})

func send_rematch() -> bool:
	return send_message({"type": "rematch"})

func close() -> void:
	connecting = false
	join_sent = false
	var state := socket.get_ready_state()
	if state == WebSocketPeer.STATE_OPEN or state == WebSocketPeer.STATE_CONNECTING:
		closing_socket = socket
		socket.close()

func is_open() -> bool:
	return socket.get_ready_state() == WebSocketPeer.STATE_OPEN

func _join_request() -> Dictionary:
	var request := {"type": "join", "mode": join_mode}
	if join_mode == "match":
		request["matchId"] = pending_match_id
	return request
