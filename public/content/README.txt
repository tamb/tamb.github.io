Content layout (all paths are under public/)
=========================================

resume/
  resume.pdf          — your CV; a sample PDF ships in-repo for the viewer.

portfolio/
  drawings/<item-folder>/
    manifest.json     — { "type": "image", "alt", "caption", "order"? }
    media.<ext>       — raster or SVG next to the manifest
  photography/<item-folder>/
    (same as drawings)
  music/<item-folder>/
    manifest.json     — { "type": "soundcloud", "title", "embedUrl", "order"? }
                      — or { "type": "iframe", "title", "src", "height"? }
                      — or { "type": "pdf", "title", "filename"? } + media.pdf (or named .pdf)
    (optional media file for pdf)

games/
  <slug>/             — optional static assets for each game (JS bundles, data, wasm)

Employer cards, games list, and site meta stay in lib/site-content.ts.

The human-check gate stores a short-lived flag in localStorage (no server).
