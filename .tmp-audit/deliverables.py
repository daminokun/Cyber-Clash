"""Audit report and presentation text for stale numbers/claims."""
import re
import sys
from docx import Document
from pptx import Presentation


def report_audit(path):
    doc = Document(path)
    print("=== REPORT: paragraphs with 25/30/32 ===")
    for index, paragraph in enumerate(doc.paragraphs):
        text = paragraph.text.strip()
        if text and re.search(r"\b(25|30|32)\b", text):
            print(f"[{index}] {text[:260]}")
    print("=== REPORT: tables with 25/30/32 ===")
    for table_index, table in enumerate(doc.tables):
        for row_index, row in enumerate(table.rows):
            cells = [cell.text.strip() for cell in row.cells]
            if any(re.search(r"\b(25|30|32)\b", cell) for cell in cells):
                print(f"[table {table_index} row {row_index}] {' | '.join(cells)}")
    print("=== REPORT: web/platform claims ===")
    for index, paragraph in enumerate(doc.paragraphs):
        text = paragraph.text.strip()
        if text and re.search(r"web|pelayar|browser|HTML5|phone|tablet", text, re.I):
            print(f"[{index}] {text[:260]}")


def presentation_audit(path):
    prs = Presentation(path)
    print("=== PRESENTATION: slides mentioning scenarios/tests/web ===")
    for index, slide in enumerate(prs.slides, start=1):
        texts = []
        for shape in slide.shapes:
            if hasattr(shape, "text") and shape.text.strip():
                texts.append(shape.text.strip())
        joined = " | ".join(texts)
        if re.search(r"senario|scenario|ujian|test|web|pelayar|25|30|32", joined, re.I):
            print(f"--- slide {index} ---")
            print(joined[:700])


if __name__ == "__main__":
    report_audit(sys.argv[1])
    presentation_audit(sys.argv[2])
