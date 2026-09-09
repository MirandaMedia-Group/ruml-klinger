"""Bezeztrátový převod existujícího Montserratu; bez subsetu nebo změny vah.

Spuštění: python3 scripts/prepare-fonts.py [--check]
Potřebuje fontTools 4.60.2 a Brotli pouze pro přípravu, nikoli pro build webu.
"""

import argparse
from pathlib import Path

from fontTools.pens.recordingPen import RecordingPen
from fontTools.ttLib import TTFont
from fontTools.ttLib.woff2 import compress


def verify(source, target):
    with TTFont(source) as original, TTFont(target) as optimized:
        assert original.getBestCmap() == optimized.getBestCmap(), "Změněná znaková sada"
        assert original.getGlyphOrder() == optimized.getGlyphOrder(), "Změněné pořadí glyfů"
        assert set(original.keys()) == set(optimized.keys()), "Změněné tabulky"
        # WOFF2 přebaluje obrysy a offsety; ostatní tabulky musejí zůstat stejné.
        for tag in original.keys():
            if tag not in ("GlyphOrder", "head", "loca", "glyf"):
                assert original.getTableData(tag) == optimized.getTableData(tag), tag
        glyph_sets = [font.getGlyphSet() for font in (original, optimized)]
        for name in original.getGlyphOrder():
            pens = [RecordingPen(), RecordingPen()]
            for glyphs, pen in zip(glyph_sets, pens):
                glyphs[name].draw(pen)
            assert pens[0].value == pens[1].value, name
            programs = [getattr(font["glyf"][name], "program", None) for font in (original, optimized)]
            bytecode = [program.getBytecode() if program else None for program in programs]
            assert bytecode[0] == bytecode[1], name
        for field in ("unitsPerEm", "xMin", "yMin", "xMax", "yMax", "macStyle"):
            assert getattr(original["head"], field) == getattr(optimized["head"], field), field
    print(f"OK {source.name} → {target.name}: {source.stat().st_size} → {target.stat().st_size} B")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true", help="Pouze kontrola existujících souborů")
    args = parser.parse_args()
    directory = Path(__file__).resolve().parents[1] / "assets" / "fonts"
    for stem in ("Montserrat-regular", "Montserrat-italic"):
        source, target = directory / f"{stem}.ttf", directory / f"{stem}.woff2"
        if not args.check:
            compress(source, target)
        verify(source, target)
    # Gotham nepřevádíme ani neměníme: ověříme již dodanou webovou variantu.
    verify(directory / "gotham.ttf", directory / "gotham.woff2")
