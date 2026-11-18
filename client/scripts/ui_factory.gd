extends RefCounted

## Shared palette, widget factory and logo loading for every screen.

const LOGO_PATH := "res://assets/branding/cyber_clash_logo.png"

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

var cyan: Color
var magenta: Color
var background_color: Color
var panel_color: Color
var text_color: Color
var muted_color: Color
var border_color: Color
var red_team: Color
var blue_team: Color
var accent: Color
var warning: Color
var success: Color
var logo_texture: Texture2D

func _init(use_branded_palette := true) -> void:
	if use_branded_palette:
		cyan = BRANDED_CYAN
		magenta = BRANDED_MAGENTA
		background_color = BRANDED_BACKGROUND
		panel_color = BRANDED_PANEL
		text_color = BRANDED_TEXT
		muted_color = BRANDED_MUTED
		border_color = Color("#1e2d4a")
		red_team = Color("#ff4d5e")
		blue_team = Color("#22d3ee")
		accent = Color("#7dd3fc")
		warning = Color("#f5b942")
		success = Color("#34d399")
	else:
		cyan = LEGACY_CYAN
		magenta = LEGACY_MAGENTA
		background_color = LEGACY_BACKGROUND
		panel_color = LEGACY_PANEL
		text_color = LEGACY_TEXT
		muted_color = LEGACY_MUTED
		border_color = Color("#16404a")
		red_team = LEGACY_MAGENTA
		blue_team = LEGACY_CYAN
		accent = LEGACY_CYAN
		warning = Color("#ffb020")
		success = Color("#34d399")
	logo_texture = load(LOGO_PATH) as Texture2D
	if logo_texture == null:
		push_error("Unable to load Cyber Clash logo: %s" % LOGO_PATH)
	else:
		var logo_image := logo_texture.get_image()
		if logo_image != null:
			logo_image.generate_mipmaps()
			logo_texture = ImageTexture.create_from_image(logo_image)

func create_background() -> ColorRect:
	var background := ColorRect.new()
	background.color = background_color
	background.set_anchors_and_offsets_preset(Control.PRESET_FULL_RECT)
	return background

func create_logo(width: float, height: float) -> TextureRect:
	var logo := TextureRect.new()
	logo.custom_minimum_size = Vector2(width, height)
	logo.size_flags_horizontal = Control.SIZE_SHRINK_CENTER
	logo.expand_mode = TextureRect.EXPAND_IGNORE_SIZE
	logo.stretch_mode = TextureRect.STRETCH_KEEP_ASPECT_CENTERED
	logo.texture_filter = CanvasItem.TEXTURE_FILTER_LINEAR_WITH_MIPMAPS
	logo.texture = logo_texture
	return logo

func create_panel() -> PanelContainer:
	var panel := PanelContainer.new()
	var style := StyleBoxFlat.new()
	style.bg_color = panel_color
	style.border_color = border_color
	style.set_border_width_all(1)
	style.set_corner_radius_all(4)
	style.content_margin_left = 18
	style.content_margin_top = 18
	style.content_margin_right = 18
	style.content_margin_bottom = 18
	panel.add_theme_stylebox_override("panel", style)
	return panel

func create_scroll_container() -> ScrollContainer:
	var scroll := ScrollContainer.new()
	scroll.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	scroll.size_flags_vertical = Control.SIZE_EXPAND_FILL
	scroll.horizontal_scroll_mode = ScrollContainer.SCROLL_MODE_DISABLED
	return scroll

func create_text_label() -> Label:
	var label := Label.new()
	label.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
	label.add_theme_color_override("font_color", text_color)
	return label

func create_heading(text: String, font_size: int, color: Color) -> Label:
	var label := Label.new()
	label.text = text
	label.add_theme_font_size_override("font_size", font_size)
	label.add_theme_color_override("font_color", color)
	return label

func create_button(text: String, height: int, font_size: int) -> Button:
	var button := Button.new()
	button.text = text
	button.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	button.size_flags_vertical = Control.SIZE_SHRINK_CENTER
	button.add_theme_font_size_override("font_size", font_size)
	button.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
	button.clip_text = true
	button.custom_minimum_size = Vector2(0, height)
	return button

func create_compact_button(text: String, height: int, font_size: int) -> Button:
	var button := create_button(text, height, font_size)
	button.size_flags_horizontal = Control.SIZE_SHRINK_CENTER
	button.custom_minimum_size = Vector2(130, height)
	return button

func humanize_key(key: String) -> String:
	var spaced := ""
	for index in key.length():
		var character := key[index]
		if index > 0 and character == character.to_upper() and character != character.to_lower():
			spaced += " "
		spaced += character
	return spaced.replace("_", " ").strip_edges().capitalize()

func create_chip(text: String, color: Color) -> PanelContainer:
	var panel := PanelContainer.new()
	panel.size_flags_horizontal = Control.SIZE_SHRINK_BEGIN
	var style := StyleBoxFlat.new()
	style.bg_color = Color(color.r, color.g, color.b, 0.12)
	style.border_color = Color(color.r, color.g, color.b, 0.55)
	style.set_border_width_all(1)
	style.set_corner_radius_all(3)
	style.content_margin_left = 8
	style.content_margin_top = 3
	style.content_margin_right = 8
	style.content_margin_bottom = 3
	panel.add_theme_stylebox_override("panel", style)
	var label := Label.new()
	label.text = text
	label.add_theme_font_size_override("font_size", 10)
	label.add_theme_color_override("font_color", color)
	panel.add_child(label)
	return panel

func create_action_button(label: String, description: String, tone := "primary") -> Button:
	var button := Button.new()
	button.custom_minimum_size = Vector2(0, 64)
	button.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	button.size_flags_vertical = Control.SIZE_EXPAND_FILL
	button.focus_mode = Control.FOCUS_ALL
	button.clip_contents = true
	var accent_color := cyan
	var normal_bg := Color("#111a2e")
	if tone == "secondary":
		accent_color = accent
		normal_bg = Color("#0f1a2c")
	elif tone == "muted":
		accent_color = muted_color
		normal_bg = Color("#0d1422")
	button.add_theme_stylebox_override("normal", _button_style(normal_bg, border_color, 1))
	button.add_theme_stylebox_override("hover", _button_style(normal_bg.lightened(0.06), accent_color, 1))
	button.add_theme_stylebox_override("pressed", _button_style(normal_bg.darkened(0.08), accent_color, 1))
	button.add_theme_stylebox_override("focus", _button_style(normal_bg, accent_color, 2))
	button.add_theme_stylebox_override("disabled", _button_style(normal_bg, border_color, 1))
	button.tooltip_text = description
	var content := VBoxContainer.new()
	content.mouse_filter = Control.MOUSE_FILTER_IGNORE
	content.alignment = BoxContainer.ALIGNMENT_CENTER
	content.add_theme_constant_override("separation", 2)
	button.add_child(content)
	content.set_anchors_and_offsets_preset(Control.PRESET_FULL_RECT)
	content.offset_left = 14
	content.offset_right = -14
	content.offset_top = 6
	content.offset_bottom = -6
	var title := Label.new()
	title.text = label
	title.add_theme_font_size_override("font_size", 14)
	title.add_theme_color_override("font_color", text_color)
	title.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
	title.mouse_filter = Control.MOUSE_FILTER_IGNORE
	content.add_child(title)
	if not description.is_empty():
		var detail := Label.new()
		detail.text = description
		detail.add_theme_font_size_override("font_size", 11)
		detail.add_theme_color_override("font_color", muted_color)
		detail.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
		detail.max_lines_visible = 2
		detail.mouse_filter = Control.MOUSE_FILTER_IGNORE
		content.add_child(detail)
	return button

func _button_style(background: Color, border: Color, width: int) -> StyleBoxFlat:
	var style := StyleBoxFlat.new()
	style.bg_color = background
	style.border_color = border
	style.set_border_width_all(width)
	style.set_corner_radius_all(4)
	style.content_margin_left = 14
	style.content_margin_top = 8
	style.content_margin_right = 14
	style.content_margin_bottom = 8
	return style

