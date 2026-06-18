---
name: reference-avatar-assets
description: Where pixel-avatar assets live and which extensions actually exist
metadata:
  type: reference
---

Pixel-art avatar mascots are a core design motif. Two copies exist: root `avatars_pixelated/` and `public/avatars_pixelated/`.

**Vite only serves `public/`** — components reference `/avatars_pixelated/<name>.<ext>`, which resolves to `public/avatars_pixelated/`. If you add a new avatar, copy it into `public/avatars_pixelated/` or the path 404s.

Extension gotcha (verified on disk): `feeling_cool`, `talking`, `thinking`, `querying`, `confused` exist as BOTH .png and .jpg; `frustrated` is .png only; `new_idea` and `completely_lost` are **.jpg ONLY** (no .png). There is **no `confident` file at all**, despite the original brief mentioning it.

**How to apply:** Use `.png` for the main mascots, but `new_idea` MUST be referenced as `.jpg`. Don't invent `confident.*`. Render with `image-rendering: pixelated` + neon drop-shadow per the house style.
