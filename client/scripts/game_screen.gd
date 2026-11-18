extends Control

## In-match screen: scoreboard, phase stepper, incident brief, evidence and
## a full-width action bar.

signal action_requested(action: String)
signal ready_requested
signal rematch_requested
signal leave_requested

const UIFactory = preload("res://scripts/ui_factory.gd")

const ACTION_HELP := {
	"investigate": "Gather evidence before responding",
	"do_nothing": "Do not launch an attack this round",
	"ignore": "Take no action this round",
	"report": "Escalate the event to the security team",
	"block": "Block the message, link or source",
	"remove_public_file": "Remove the exposed file from public view",
	"revoke_key": "Revoke the exposed key",
	"revoke_access": "Revoke the exposed access",
	"revoke_token": "Revoke the API token",
	"lock_account": "Lock the affected account",
	"isolate_server": "Isolate the affected server",
	"isolate_host": "Isolate the affected host",
	"isolate_endpoint": "Isolate the affected endpoint",
	"isolate_database": "Isolate the database",
	"isolate_service": "Isolate the affected service",
	"isolate_printer": "Isolate the printer",
	"restore_backup": "Restore from the latest backup",
	"protect_backup": "Protect the backup copies",
	"start_recovery_check": "Start a recovery check",
	"quarantine_device": "Quarantine the affected device",
	"quarantine_file": "Quarantine the affected file",
	"flush_dns_cache": "Flush the DNS cache",
	"block_destination": "Block the destination",
	"block_sender": "Block the sender",
	"block_source": "Block the source",
	"block_transfer": "Block the transfer",
	"block_download": "Block the download",
	"block_traffic": "Block the traffic",
	"block_external_copy": "Block external copies",
	"block_doh_traffic": "Block encrypted DNS traffic",
	"suspend_account": "Suspend the account",
	"restrict_records": "Restrict access to the records",
	"reset_credentials": "Reset the affected credentials",
	"reset_privileged_accounts": "Reset the privileged accounts",
	"force_logout": "Force a logout of active sessions",
	"enable_validation": "Enable input validation",
	"enable_rate_limiting": "Enable rate limiting",
	"end_call": "End the call",
	"verify_with_supplier": "Verify the request with the supplier",
	"freeze_payment": "Freeze the pending payment",
	"enforce_object_checks": "Enforce object-level authorization",
	"apply_emergency_patch": "Apply the emergency patch",
	"sinkhole_domain": "Sinkhole the malicious domain",
	"disable_badge": "Disable the badge",
	"challenge_visitor": "Challenge the person at the entrance",
	"scrub_traffic": "Scrub the malicious traffic",
	"segment_network": "Segment the affected network",
	"sanitize_output": "Sanitize the page output",
	"block_payload_source": "Block the payload source",
	"require_app_mfa": "Require app-based MFA",
	"revoke_public_access": "Revoke public access",
	"restrict_permissions": "Restrict the service permissions",
	"disable_service_account": "Disable the service account",
	"disable_extension": "Disable the browser extension",
	"remove_extension": "Remove the browser extension",
	"remove_application": "Remove the application",
	"deny_permission": "Deny the permission request"
}

var ui: UIFactory
var role := ""
var state: Dictionary = {}
var action_pending := false
var waiting := false
var waiting_base := ""
var dot_time := 0.0
var action_ids: Array[String] = []

var role_label: Label
var banner: PanelContainer
var banner_label: Label
var round_label: Label
var pips: HBoxContainer
var stepper_labels: Array = []
var red_score_label: Label
var blue_score_label: Label
var category_chip: PanelContainer
var category_chip_label: Label
var event_title: Label
var event_description: Label
var metadata_grid: GridContainer
var evidence_box: VBoxContainer
var result_explanation_label: Label
var action_status: Label
var action_buttons: HBoxContainer
var action_hint: Label
var leave_dialog: ConfirmationDialog

func setup(factory: UIFactory) -> void:
	ui = factory

func _ready() -> void:
	set_anchors_and_offsets_preset(Control.PRESET_FULL_RECT)
	_build()
	_build_leave_dialog()

func _process(delta: float) -> void:
	if not waiting or not visible:
		return
	dot_time += delta
	var dots := ".".repeat(int(dot_time * 2.0) % 4)
	banner_label.text = waiting_base + dots

func _build() -> void:
	var margin := MarginContainer.new()
	margin.set_anchors_and_offsets_preset(Control.PRESET_FULL_RECT)
	margin.add_theme_constant_override("margin_left", 28)
	margin.add_theme_constant_override("margin_top", 18)
	margin.add_theme_constant_override("margin_right", 28)
	margin.add_theme_constant_override("margin_bottom", 18)
	add_child(margin)

	var layout := VBoxContainer.new()
	layout.add_theme_constant_override("separation", 10)
	margin.add_child(layout)

	_build_header(layout)
	var divider := HSeparator.new()
	divider.add_theme_color_override("separator", ui.border_color)
	layout.add_child(divider)
	_build_scoreboard(layout)
	_build_banner(layout)
	_build_content(layout)
	_build_action_bar(layout)

func _build_header(layout: VBoxContainer) -> void:
	var header := HBoxContainer.new()
	header.add_theme_constant_override("separation", 16)
	layout.add_child(header)
	var title := ui.create_heading("CYBER//CLASH", 30, ui.cyan)
	title.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	title.vertical_alignment = VERTICAL_ALIGNMENT_CENTER
	header.add_child(title)
	role_label = ui.create_heading("", 13, ui.blue_team)
	role_label.horizontal_alignment = HORIZONTAL_ALIGNMENT_RIGHT
	role_label.vertical_alignment = VERTICAL_ALIGNMENT_CENTER
	header.add_child(role_label)
	var leave := ui.create_compact_button("LEAVE MATCH", 34, 11)
	leave.tooltip_text = "Return to the main menu and close the match connection."
	leave.pressed.connect(_on_leave_pressed)
	header.add_child(leave)

func _build_scoreboard(layout: VBoxContainer) -> void:
	var scoreboard := HBoxContainer.new()
	scoreboard.add_theme_constant_override("separation", 12)
	layout.add_child(scoreboard)

	round_label = ui.create_heading("ROUND 1 / 3", 11, ui.muted_color)
	round_label.vertical_alignment = VERTICAL_ALIGNMENT_CENTER
	scoreboard.add_child(round_label)

	pips = HBoxContainer.new()
	pips.add_theme_constant_override("separation", 4)
	pips.alignment = BoxContainer.ALIGNMENT_CENTER
	scoreboard.add_child(pips)

	var spacer := Control.new()
	spacer.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	scoreboard.add_child(spacer)

	var steps := ["RED ACTS", "BLUE DECIDES", "RED ADAPTS", "BLUE RESPONDS"]
	stepper_labels.clear()
	for index in steps.size():
		if index > 0:
			var arrow := ui.create_heading("\u203a", 12, ui.muted_color)
			arrow.vertical_alignment = VERTICAL_ALIGNMENT_CENTER
			scoreboard.add_child(arrow)
		var step := ui.create_heading(steps[index], 10, ui.muted_color)
		step.vertical_alignment = VERTICAL_ALIGNMENT_CENTER
		scoreboard.add_child(step)
		stepper_labels.append(step)

	var spacer_end := Control.new()
	spacer_end.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	scoreboard.add_child(spacer_end)

	red_score_label = ui.create_heading("RED  0", 13, ui.red_team)
	red_score_label.vertical_alignment = VERTICAL_ALIGNMENT_CENTER
	scoreboard.add_child(red_score_label)
	blue_score_label = ui.create_heading("BLUE  0", 13, ui.blue_team)
	blue_score_label.vertical_alignment = VERTICAL_ALIGNMENT_CENTER
	scoreboard.add_child(blue_score_label)

func _build_banner(layout: VBoxContainer) -> void:
	banner = PanelContainer.new()
	banner_label = ui.create_text_label()
	banner_label.add_theme_font_size_override("font_size", 14)
	banner.add_child(banner_label)
	layout.add_child(banner)
	_set_banner("WAITING FOR OPPONENT", ui.muted_color, true)

func _build_content(layout: VBoxContainer) -> void:
	var content := HBoxContainer.new()
	content.size_flags_vertical = Control.SIZE_EXPAND_FILL
	content.add_theme_constant_override("separation", 16)
	layout.add_child(content)

	var brief_panel := ui.create_panel()
	brief_panel.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	brief_panel.size_flags_vertical = Control.SIZE_EXPAND_FILL
	brief_panel.size_flags_stretch_ratio = 1.05
	content.add_child(brief_panel)
	var brief_scroll := ui.create_scroll_container()
	brief_panel.add_child(brief_scroll)
	var brief := VBoxContainer.new()
	brief.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	brief.add_theme_constant_override("separation", 10)
	brief_scroll.add_child(brief)

	var brief_header := HBoxContainer.new()
	brief_header.add_theme_constant_override("separation", 10)
	brief.add_child(brief_header)
	brief_header.add_child(ui.create_heading("INCIDENT BRIEF", 16, ui.text_color))
	var brief_spacer := Control.new()
	brief_spacer.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	brief_header.add_child(brief_spacer)
	category_chip = ui.create_chip("", ui.accent)
	category_chip_label = category_chip.get_child(0) as Label
	brief_header.add_child(category_chip)

	event_title = ui.create_heading("", 19, ui.text_color)
	event_title.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
	brief.add_child(event_title)
	event_description = ui.create_text_label()
	event_description.add_theme_font_size_override("font_size", 14)
	brief.add_child(event_description)
	brief.add_child(ui.create_heading("EVENT DETAILS", 10, ui.muted_color))
	metadata_grid = GridContainer.new()
	metadata_grid.columns = 2
	metadata_grid.add_theme_constant_override("h_separation", 16)
	metadata_grid.add_theme_constant_override("v_separation", 6)
	brief.add_child(metadata_grid)

	var intel_panel := ui.create_panel()
	intel_panel.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	intel_panel.size_flags_vertical = Control.SIZE_EXPAND_FILL
	intel_panel.size_flags_stretch_ratio = 1.95
	content.add_child(intel_panel)
	var intel_scroll := ui.create_scroll_container()
	intel_panel.add_child(intel_scroll)
	var intel := VBoxContainer.new()
	intel.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	intel.add_theme_constant_override("separation", 12)
	intel_scroll.add_child(intel)
	intel.add_child(ui.create_heading("SECURITY INTELLIGENCE", 16, ui.text_color))
	evidence_box = VBoxContainer.new()
	evidence_box.add_theme_constant_override("separation", 12)
	evidence_box.size_flags_vertical = Control.SIZE_SHRINK_BEGIN
	intel.add_child(evidence_box)
	result_explanation_label = ui.create_text_label()
	result_explanation_label.add_theme_font_size_override("font_size", 13)
	result_explanation_label.visible = false
	intel.add_child(result_explanation_label)

func _build_action_bar(layout: VBoxContainer) -> void:
	var action_bar := ui.create_panel()
	action_bar.custom_minimum_size = Vector2(0, 92)
	layout.add_child(action_bar)
	var bar := HBoxContainer.new()
	bar.add_theme_constant_override("separation", 14)
	action_bar.add_child(bar)
	action_status = ui.create_heading("", 11, ui.cyan)
	action_status.custom_minimum_size = Vector2(118, 0)
	action_status.vertical_alignment = VERTICAL_ALIGNMENT_CENTER
	bar.add_child(action_status)
	action_buttons = HBoxContainer.new()
	action_buttons.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	action_buttons.add_theme_constant_override("separation", 10)
	bar.add_child(action_buttons)
	action_hint = ui.create_text_label()
	action_hint.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	action_hint.vertical_alignment = VERTICAL_ALIGNMENT_CENTER
	action_hint.add_theme_font_size_override("font_size", 13)
	bar.add_child(action_hint)

func _build_leave_dialog() -> void:
	leave_dialog = ConfirmationDialog.new()
	leave_dialog.title = "Leave Match"
	leave_dialog.dialog_text = "Leave the match and return to the main menu?\nYour opponent will be notified that you left."
	leave_dialog.ok_button_text = "Leave"
	leave_dialog.cancel_button_text = "Stay"
	leave_dialog.confirmed.connect(func() -> void: leave_requested.emit())
	add_child(leave_dialog)

func render_state(received_state: Dictionary, player_role: String) -> void:
	state = received_state
	role = player_role
	action_pending = false
	result_explanation_label.visible = false
	role_label.text = "%s TEAM" % role.to_upper()
	role_label.add_theme_color_override("font_color", _role_color())

	var event: Dictionary = state.get("event", {})
	category_chip_label.text = ui.humanize_key(str(state.get("category", ""))).to_upper()
	event_title.text = str(event.get("title", ""))
	event_description.text = str(event.get("description", ""))
	_render_metadata(event)
	_render_evidence(state.get("evidence", {}))
	_update_scoreboard(state)
	_set_phase(str(state.get("phase", "")))

	var available: Array = state.get("availableActions", [])
	if role == "red":
		var private_info: Dictionary = state.get("private", {})
		available = private_info.get("availableActions", [])

	_clear_actions()
	if state.has("outcome"):
		_show_outcome(state)
	else:
		_show_turn(str(state.get("phase", "")), available)
		_rebuild_actions(available)

func show_round_waiting(ready: bool, ready_count: int, required_players: int) -> void:
	action_pending = ready
	_clear_actions()
	_set_phase("resolved")
	_set_banner(
		"WAITING FOR OPPONENT \u2014 %d/%d READY" % [ready_count, required_players],
		ui.muted_color,
		true
	)
	action_status.text = "WAITING"
	action_status.add_theme_color_override("font_color", ui.muted_color)
	if ready:
		_show_action_hint("Ready sent. Waiting for the other player...")
	else:
		_add_ready_button()

func show_match_complete(message: Dictionary) -> void:
	action_pending = true
	_clear_actions()
	_set_phase("resolved")
	var scores: Dictionary = message.get("scores", {})
	red_score_label.text = "RED  %d" % int(scores.get("red", 0))
	blue_score_label.text = "BLUE  %d" % int(scores.get("blue", 0))
	var winner := str(message.get("winner", "draw"))
	var color := ui.warning
	if winner == "red":
		color = ui.red_team
	elif winner == "blue":
		color = ui.blue_team
	var headline := "MATCH COMPLETE \u2014 DRAW"
	if winner != "draw":
		headline = "MATCH COMPLETE \u2014 %s WINS" % winner.to_upper()
	_set_banner(
		"%s  |  RED %d : BLUE %d" % [headline, int(scores.get("red", 0)), int(scores.get("blue", 0))],
		color
	)
	action_status.text = "MATCH COMPLETE"
	action_status.add_theme_color_override("font_color", color)
	var explanation := str(message.get("resultExplanation", ""))
	result_explanation_label.text = explanation
	result_explanation_label.visible = not explanation.is_empty()
	_add_rematch_button()

func show_rematch_waiting() -> void:
	action_pending = true
	_clear_actions()
	_set_banner("WAITING FOR OPPONENT TO CONFIRM REMATCH", ui.muted_color, true)
	action_status.text = "WAITING"
	action_status.add_theme_color_override("font_color", ui.muted_color)
	_show_action_hint("Rematch requested. You can leave if the opponent does not respond.")

func show_opponent_disconnected() -> void:
	action_pending = true
	_clear_actions()
	_set_banner("OPPONENT DISCONNECTED", ui.warning)
	action_status.text = "NO OPPONENT"
	action_status.add_theme_color_override("font_color", ui.warning)
	_show_action_hint("Use LEAVE MATCH to return to the menu and start a new match.")

func show_connection_lost() -> void:
	action_pending = true
	_clear_actions()
	_set_banner("CONNECTION LOST", ui.warning)
	action_status.text = "DISCONNECTED"
	action_status.add_theme_color_override("font_color", ui.warning)
	_show_action_hint("The server connection closed. Use LEAVE MATCH to return to the menu.")

func cancel_pending(message: String) -> void:
	action_pending = false
	if not state.is_empty():
		render_state(state, role)
	_set_banner(message, ui.warning)

func set_status(message: String) -> void:
	_set_banner(message, ui.muted_color)

func _role_color() -> Color:
	return ui.red_team if role == "red" else ui.blue_team

func _set_banner(text: String, color: Color, is_waiting := false) -> void:
	var style := StyleBoxFlat.new()
	style.bg_color = Color(color.r, color.g, color.b, 0.10)
	style.border_color = color
	style.border_width_left = 4
	style.set_corner_radius_all(4)
	style.content_margin_left = 12
	style.content_margin_top = 7
	style.content_margin_right = 12
	style.content_margin_bottom = 7
	banner.add_theme_stylebox_override("panel", style)
	banner_label.text = text
	banner_label.add_theme_color_override("font_color", color)
	waiting = is_waiting
	waiting_base = text
	dot_time = 0.0

func _set_phase(phase: String) -> void:
	var index = {
		"red_action": 0,
		"blue_action": 1,
		"red_adaptation": 2,
		"blue_response": 3,
		"resolved": 4
	}.get(phase, -1)
	for step_index in stepper_labels.size():
		var label: Label = stepper_labels[step_index]
		var color := ui.muted_color
		if index == 4:
			color = ui.text_color
		elif step_index < index:
			color = ui.text_color
		elif step_index == index:
			color = ui.red_team if step_index % 2 == 0 else ui.blue_team
		label.add_theme_color_override("font_color", color)

func _show_turn(phase: String, available: Array) -> void:
	if available.size() > 0:
		_set_banner("YOUR TURN \u2014 choose an action", ui.accent)
		action_status.text = "YOUR TURN"
		action_status.add_theme_color_override("font_color", ui.accent)
		return
	var text := "WAITING FOR OPPONENT"
	match phase:
		"red_action":
			text = "RED TEAM IS CHOOSING AN ATTACK"
		"blue_action":
			text = "BLUE TEAM IS DECIDING"
		"red_adaptation":
			text = "RED TEAM IS ADAPTING THE ATTACK"
		"blue_response":
			text = "BLUE TEAM IS RESPONDING"
	_set_banner(text, ui.muted_color, true)
	action_status.text = "WAITING"
	action_status.add_theme_color_override("font_color", ui.muted_color)

func _show_outcome(resolved: Dictionary) -> void:
	var outcome := str(resolved.get("outcome", ""))
	var color := _outcome_color(outcome)
	var explanation := str(resolved.get("resultExplanation", ""))
	result_explanation_label.text = explanation
	result_explanation_label.visible = not explanation.is_empty()
	_set_banner(
		"ROUND COMPLETE \u2014 %s" % ui.humanize_key(outcome).to_upper(),
		color
	)
	action_status.text = "ROUND COMPLETE"
	action_status.add_theme_color_override("font_color", color)
	if int(state.get("round", 1)) < int(state.get("maxRounds", 3)):
		_add_ready_button()
	else:
		_show_action_hint("Final round complete. Waiting for the match result...")

func _outcome_color(outcome: String) -> Color:
	match outcome:
		"attack_succeeded", "login_attack_succeeded":
			return ui.red_team
		"attack_prevented", "login_attack_prevented":
			return ui.blue_team
		"false_positive":
			return ui.warning
		_:
			return ui.muted_color

func _update_scoreboard(current: Dictionary) -> void:
	var round_number := int(current.get("round", 1))
	var max_rounds := int(current.get("maxRounds", 3))
	var resolved := str(current.get("phase", "")) == "resolved"
	round_label.text = "ROUND %d / %d" % [round_number, max_rounds]
	for child in pips.get_children():
		pips.remove_child(child)
		child.queue_free()
	for index in max_rounds:
		var pip := Label.new()
		pip.text = "\u25cf"
		pip.add_theme_font_size_override("font_size", 10)
		var color := ui.muted_color
		color.a = 0.35
		if index < round_number - 1 or (resolved and index == round_number - 1):
			color = ui.blue_team
		elif index == round_number - 1:
			color = ui.text_color
		pip.add_theme_color_override("font_color", color)
		pips.add_child(pip)
	var scores: Dictionary = current.get("scores", {})
	red_score_label.text = "RED  %d" % int(scores.get("red", 0))
	blue_score_label.text = "BLUE  %d" % int(scores.get("blue", 0))

func _render_metadata(event: Dictionary) -> void:
	for child in metadata_grid.get_children():
		metadata_grid.remove_child(child)
		child.queue_free()
	for key in event:
		if key == "title" or key == "description":
			continue
		var key_label := Label.new()
		key_label.text = ui.humanize_key(str(key))
		key_label.add_theme_font_size_override("font_size", 10)
		key_label.add_theme_color_override("font_color", ui.muted_color)
		key_label.size_flags_horizontal = Control.SIZE_SHRINK_BEGIN
		metadata_grid.add_child(key_label)
		var value_label := Label.new()
		value_label.text = str(event[key])
		value_label.add_theme_font_size_override("font_size", 12)
		value_label.add_theme_color_override("font_color", ui.text_color)
		value_label.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
		value_label.size_flags_horizontal = Control.SIZE_EXPAND_FILL
		metadata_grid.add_child(value_label)

func _render_evidence(evidence: Dictionary) -> void:
	for child in evidence_box.get_children():
		evidence_box.remove_child(child)
		child.queue_free()
	if evidence.is_empty():
		evidence_box.add_child(
			ui.create_heading("No investigation evidence yet.", 14, ui.text_color)
		)
		evidence_box.add_child(
			ui.create_heading("INVESTIGATE TO REVEAL", 10, ui.accent)
		)
		for line in [
			"what actually happened",
			"which accounts or assets were involved",
			"whether the event was deliberately manipulated"
		]:
			var item := ui.create_text_label()
			item.text = "\u2022  %s" % line
			item.add_theme_font_size_override("font_size", 12)
			item.add_theme_color_override("font_color", ui.muted_color)
			evidence_box.add_child(item)
		return
	for key in evidence:
		var item := VBoxContainer.new()
		item.add_theme_constant_override("separation", 3)
		item.add_child(ui.create_heading(ui.humanize_key(str(key)).to_upper(), 10, ui.accent))
		var value := ui.create_text_label()
		value.text = str(evidence[key])
		value.add_theme_font_size_override("font_size", 13)
		item.add_child(value)
		evidence_box.add_child(item)

func _rebuild_actions(actions: Array) -> void:
	_clear_actions()
	if actions.is_empty():
		_show_action_hint("Actions appear when it is your turn.")
		return
	_hide_action_hint()
	for action in actions:
		var action_id := str(action)
		if action_id == "change_tactic":
			continue
		var label := action_id.replace("_", " ").capitalize()
		var description := _action_description(action_id)
		var tone := "primary"
		if action_id == "investigate" or action_id == "investigate_logs":
			tone = "secondary"
		elif action_id == "ignore" or action_id == "do_nothing":
			tone = "muted"
		var button := ui.create_action_button(label, description, tone)
		button.pressed.connect(_on_action_pressed.bind(action_id))
		action_buttons.add_child(button)
		action_ids.append(action_id)
	action_buttons.visible = true

func _clear_actions() -> void:
	for child in action_buttons.get_children():
		action_buttons.remove_child(child)
		child.queue_free()
	action_ids.clear()

func _show_action_hint(text: String) -> void:
	action_hint.text = text
	action_hint.visible = true
	action_buttons.visible = false

func _hide_action_hint() -> void:
	action_hint.visible = false
	action_buttons.visible = true

func _add_ready_button() -> void:
	_clear_actions()
	_hide_action_hint()
	var button := ui.create_action_button(
		"Ready for next round",
		"Continue when both players are ready",
		"secondary"
	)
	button.pressed.connect(_on_ready_pressed)
	action_buttons.add_child(button)

func _add_rematch_button() -> void:
	_clear_actions()
	_hide_action_hint()
	var button := ui.create_action_button(
		"Rematch",
		"Play another match with the same opponent",
		"primary"
	)
	button.pressed.connect(_on_rematch_pressed)
	action_buttons.add_child(button)

func _action_description(action: String) -> String:
	if ACTION_HELP.has(action):
		return ACTION_HELP[action]
	if action.begins_with("investigate"):
		return "Gather evidence before responding"
	if action.begins_with("isolate"):
		return "Isolate the affected asset"
	if action.begins_with("block"):
		return "Block the affected source or traffic"
	if action.begins_with("revoke"):
		return "Revoke the exposed access"
	if action.begins_with("disable"):
		return "Disable the affected service"
	if action.begins_with("reset"):
		return "Reset the affected credentials"
	if action.begins_with("restrict"):
		return "Restrict the affected access"
	if action.begins_with("remove"):
		return "Remove the affected component"
	if action.begins_with("quarantine"):
		return "Quarantine the affected item"
	if action.begins_with("flush"):
		return "Flush the affected cache"
	if action.begins_with("lock"):
		return "Lock the affected account or device"
	if action.begins_with("enable"):
		return "Enable the protective control"
	if action.begins_with("apply"):
		return "Apply the protective change"
	if action.begins_with("scrub"):
		return "Filter the malicious traffic"
	if action.begins_with("sinkhole"):
		return "Redirect the malicious domain"
	if action.begins_with("verify"):
		return "Verify the request through a second channel"
	if action.begins_with("freeze"):
		return "Freeze the pending transaction"
	if action.begins_with("challenge"):
		return "Challenge the person at the entry point"
	if action.begins_with("require"):
		return "Require the stronger control"
	if action.begins_with("enforce"):
		return "Enforce the missing control"
	return ""

func _on_action_pressed(action: String) -> void:
	if action_pending:
		return
	action_pending = true
	_clear_actions()
	_set_banner("ACTION SENT \u2014 waiting for the response", ui.muted_color, true)
	action_status.text = "WAITING"
	action_status.add_theme_color_override("font_color", ui.muted_color)
	_show_action_hint("Waiting for the server...")
	action_requested.emit(action)

func _on_ready_pressed() -> void:
	if action_pending:
		return
	action_pending = true
	_clear_actions()
	_set_banner("READY SENT \u2014 waiting for opponent", ui.muted_color, true)
	action_status.text = "WAITING"
	action_status.add_theme_color_override("font_color", ui.muted_color)
	_show_action_hint("Waiting for the other player...")
	ready_requested.emit()

func _on_rematch_pressed() -> void:
	action_pending = true
	_clear_actions()
	_set_banner("REMATCH REQUESTED", ui.muted_color, true)
	action_status.text = "WAITING"
	action_status.add_theme_color_override("font_color", ui.muted_color)
	_show_action_hint("Looking for a rematch...")
	rematch_requested.emit()

func _on_leave_pressed() -> void:
	leave_dialog.popup_centered(Vector2i(460, 180))

func _unhandled_key_input(event: InputEvent) -> void:
	if action_pending or not visible or leave_dialog.visible:
		return
	if not (event is InputEventKey):
		return
	var key_event := event as InputEventKey
	if not key_event.pressed or key_event.echo:
		return
	var index := -1
	match key_event.keycode:
		KEY_1:
			index = 0
		KEY_2:
			index = 1
		KEY_3:
			index = 2
		KEY_4:
			index = 3
	if index >= 0 and index < action_ids.size():
		_on_action_pressed(action_ids[index])
