# neostore_logo_svg.py
"""
Python script to generate a vector SVG logo for "neostore" using Calibri font and matching colors.
"""
import svgwrite

# Logo text and colors
logo_text = "neostore"
colors = ["#ff0000", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#0033ff"]

# SVG parameters
svg_width = 512
svg_height = 128
font_size = 100
font_family = "Calibri"
background_color = "black"

# Create SVG drawing
svg = svgwrite.Drawing("neostore_logo_vector.svg", size=(svg_width, svg_height))

# Calculate starting position
x = 20
y = 100
letter_spacing = 0

# Draw each letter with its color
text_elem = svgwrite.text.Text('', insert=(x, y), font_size=font_size, font_family=font_family, font_weight="bold")
for i, letter in enumerate(logo_text):
    text_elem.add(svgwrite.text.TSpan(letter, fill=colors[i]))
svg.add(text_elem)

# Save SVG file
svg.save()
print("SVG logo generated as neostore_logo_vector.svg")
