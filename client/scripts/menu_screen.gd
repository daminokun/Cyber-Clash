extends Control

const UIFactory = preload("res://scripts/ui_factory.gd")

## Main menu: server address, host/join/auto actions.

signal connect_requested(address: String, mode: String, match_id: String)

const DEFAULT_SERVER_HOST := "127.0.0.1"

var ui: UIFactory
var ip_input: LineEdit
var match_id_input: LineEdit
var status_label: Label

func setup(factory: UIFactory) -> void:
	ui = factory

func _ready() -> void:
	set_anchors_and_offsets_preset(Control.PRESET_FULL_RECT)
	_build()

func _build() -> void:
	var center := CenterContainer.new()
	center.set_anchors_and_offsets_preset(Control.PRESET_FULL_RECT)
	add_child(center)

	var box := VBoxContainer.new()
	box.size_flags_horizontal = Control.SIZE_SHRINK_CENTER
	box.size_flags_vertical = Control.SIZE_SHRINK_CENTER
	box.add_theme_constant_override("separation", 14)
	center.add_child(box)

	box.add_child(ui.create_logo(220, 110))
	var title := ui.create_heading("CYBER//CLASH", 58, ui.cyan)
	title.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	box.add_child(title)

	var subtitle := ui.create_heading("1V1 DIGITAL DEFENCE SIMULATION", 18, ui.magenta)
	subtitle.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	box.add_child(subtitle)

	var info := ui.create_heading(
		"Red Team attacks. Blue Team investigates. The server decides.",
		16,
		ui.text_color
	)
	info.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	box.add_child(info)

	var host := ui.create_button("HOST MATCH", 54, 20)
	host.pressed.connect(_on_host_pressed)
	box.add_child(host)

	var join_title := ui.create_heading("JOIN BY SERVER IP + MATCH ID", 16, ui.cyan)
	join_title.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	box.add_child(join_title)

	ip_input = LineEdit.new()
	ip_input.placeholder_text = "Server IP (example: 192.168.1.20)"
	ip_input.text = DEFAULT_SERVER_HOST
	box.add_child(ip_input)

	match_id_input = LineEdit.new()
	match_id_input.name = "MatchIdInput"
	match_id_input.placeholder_text = "Match ID (example: 482019)"
	match_id_input.max_length = 6
	box.add_child(match_id_input)

	var join := ui.create_button("JOIN MATCH", 54, 20)
	join.pressed.connect(_on_join_pressed)
	box.add_child(join)

	var auto_match := ui.create_button("AUTO MATCH", 48, 18)
	auto_match.pressed.connect(_on_auto_pressed)
	box.add_child(auto_match)

	status_label = ui.create_heading(
		"LOCAL TEST: run the server, then connect two clients.",
		14,
		ui.muted_color
	)
	status_label.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	status_label.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
	box.add_child(status_label)

func set_status(message: String) -> void:
	if status_label:
		status_label.text = message

func clear() -> void:
	ip_input.text = DEFAULT_SERVER_HOST
	match_id_input.text = ""
	set_status("LOCAL TEST: run the server, then connect two clients.")

func _address() -> String:
	var address := ip_input.text.strip_edges()
	return address if not address.is_empty() else DEFAULT_SERVER_HOST

func _on_host_pressed() -> void:
	connect_requested.emit(_address(), "host", "")

func _on_join_pressed() -> void:
	var match_id := match_id_input.text.strip_edges()
	if match_id.is_empty():
		set_status("Enter the Match ID shown on the host screen.")
		return
	connect_requested.emit(_address(), "match", match_id)

func _on_auto_pressed() -> void:
	connect_requested.emit(_address(), "auto", "")
