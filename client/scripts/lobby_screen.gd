extends Control

const UIFactory = preload("res://scripts/ui_factory.gd")

## Matchmaking screen shown while waiting for the second player.

signal abort_requested

var ui: UIFactory
var status_label: Label
var detail_label: Label

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
	box.add_theme_constant_override("separation", 18)
	center.add_child(box)

	box.add_child(ui.create_logo(140, 85))
	box.add_child(ui.create_heading("MATCHMAKING // QUEUE", 38, ui.cyan))

	status_label = ui.create_heading("", 20, ui.magenta)
	box.add_child(status_label)

	detail_label = ui.create_heading("The server is assigning Red Team and Blue Team.", 22, ui.text_color)
	detail_label.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
	detail_label.custom_minimum_size = Vector2(520, 0)
	detail_label.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	box.add_child(detail_label)

	var hint := ui.create_heading(
		"Once two players are connected, the scenario starts automatically.",
		14,
		ui.muted_color
	)
	hint.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	box.add_child(hint)

	var back := ui.create_button("ABORT", 44, 16)
	back.pressed.connect(func() -> void: abort_requested.emit())
	box.add_child(back)

func begin(url: String) -> void:
	status_label.text = "Connecting to %s..." % url
	detail_label.text = "Waiting for the matchmaker."

func show_connected() -> void:
	if status_label.text.begins_with("Connecting"):
		status_label.text = "CONNECTED // WAITING FOR MATCH"

func show_joined(match_id: String, role: String) -> void:
	status_label.text = "MATCH %s // %s" % [match_id, role.to_upper()]
	detail_label.text = "You are %s. Waiting for the second player..." % role.capitalize()

func show_waiting(match_id: String) -> void:
	status_label.text = "WAITING FOR PLAYER 2"
	detail_label.text = "Match ID: %s\nShare this ID with the second player." % match_id

func show_new_opponent(match_id: String) -> void:
	status_label.text = "NEW OPPONENT FOUND"
	detail_label.text = "You are playing against a new opponent in Match %s." % match_id

func show_rejected() -> void:
	status_label.text = "MATCH UNAVAILABLE"
	detail_label.text = (
		"The selected match is full, already started, has already finished or does not exist. "
		+ "Try Auto Match or create a new match."
	)

func show_connection_lost() -> void:
	status_label.text = "CONNECTION LOST"
	detail_label.text = "The server connection closed. Use ABORT to return to the menu."

func show_connection_failed() -> void:
	status_label.text = "CONNECTION FAILED"
	detail_label.text = "Could not reach the server. Check the IP address and that the server is running."

func show_opponent_left() -> void:
	status_label.text = "OPPONENT LEFT"
	detail_label.text = "The other player disconnected. Use ABORT to return to the menu and start a new match."

func set_message(message: String) -> void:
	status_label.text = message
