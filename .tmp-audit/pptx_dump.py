"""Dump all presentation slide text for a manual consistency check."""
import re
import sys
from pptx import Presentation

prs = Presentation(sys.argv[1])
for index, slide in enumerate(prs.slides, start=1):
    chunks = []
    for shape in slide.shapes:
        if hasattr(shape, "text") and shape.text.strip():
            chunks.append(shape.text.strip().replace("\n", " / "))
        if getattr(shape, "has_table", False):
            for row in shape.table.rows:
                chunks.append(" | ".join(cell.text.strip() for cell in row.cells))
    text = " || ".join(chunks)
    if re.search(r"senario|scenario|ujian|test|25|30|32|web|pelayar|Godot|Node", text, re.I):
        print(f"=== SLIDE {index} ===")
        print(text)
        print()
