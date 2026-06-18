---
name: r3f-react18-pinning
description: Three.js fiber/drei version pinning required because this project is on React 18
metadata:
  type: feedback
---

When adding Three.js to this repo, pin `@react-three/fiber@^8` and `@react-three/drei@^9`. Do NOT install the latest (`@react-three/fiber@9`).

**Why:** fiber@9 has a hard peer requirement of React >=19, but this project is on React 18.3. A plain `npm install @react-three/fiber` fails with an ERESOLVE peer conflict.
**How to apply:** Use fiber@8 / drei@9 (these support React 18). Valid drei@9 named exports used here include `Float`, `Points`, `PointMaterial`. The Three.js bundle pushes the build over Vite's 500 kB chunk warning — that warning is expected/benign, not an error.
