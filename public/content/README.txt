Content layout (all paths are under public/)
=========================================

resume/
  resume.pdf          — your CV; a sample PDF ships in-repo for the viewer.

portfolio/
  drawings/<item-folder>/
    manifest.json     — { "type": "image", "alt", "caption", "order"? }
    00.media.<ext>    — primary raster or SVG (add 01.media.*, 02.media.*, … for multi-image cards)
    media.<ext>       — legacy single file name (still supported)
  photography/<item-folder>/
    (same as drawings)
  music/<item-folder>/
    manifest.json     — { "type": "soundcloud", "title", "embedUrl", "order"? }
                      — or { "type": "iframe", "title", "src", "height"? }
                      — or { "type": "pdf", "title", "filename"? } + 00.media.pdf or media.pdf
    (optional PDF media file for pdf type)
  open-source/<slug>/
    manifest.json     — { "type": "open-source", "title", "description", "links": [...], "order"?,
                          "alt"?, "caption"? }
                      — optional 00.media.<ext> screenshots (requires "alt" when media present)
    NN.media.<ext>    — optional images for the card
  software/<slug>/
    manifest.json     — same fields as open-source but "type": "software"
    NN.media.<ext>    — optional images

Each entry in "links" is { "label": string, "href": string }.

games/
  <slug>/             — optional static assets for each game (JS bundles, data, wasm)

Employer cards, games list, and site meta stay in lib/site-content.ts.

The human-check gate stores a short-lived flag in localStorage (no server).
