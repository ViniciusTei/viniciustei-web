# Portfolio Redesign — Design Spec

**Date:** 2026-05-07  
**Approach:** Full rewrite of `index.html` + update `tailwind.config.js`. Vanilla HTML + Tailwind CSS stack, no framework change.

---

## 1. Goals

- Apply the Portfolio Elite (dark) and Aetheric Precision (light) design systems from `docs/stitch_modern_portfolio_redesign/`
- Dark mode uses Portfolio Elite; light mode uses Aetheric Precision
- Existing dark/light class toggle (`lib/theme.js`) is preserved unchanged
- Existing i18n system (`lib/translation.js`, `data-i18n-key` attributes) is preserved; current text is authoritative, design-doc text is placeholder only
- Hero section includes a 3D animated wireframe sphere (canvas, no external library)
- Photo removed from hero; sphere + text only
- Projects section structured so adding a new project = copy one card block
- Sections: Nav → Hero → Skills → Projects → Experience → Contact → Footer

---

## 2. Tech Stack

| Concern | Solution |
|---|---|
| Markup | Plain HTML (`index.html`) — full rewrite |
| Styles | Tailwind CSS via PostCSS (`styles.css` → `dist/styles.css`) |
| Config | `tailwind.config.js` — updated color tokens and fonts |
| Icons | FontAwesome (existing kit) |
| Fonts | Google Fonts: Epilogue (600/700/800), Manrope (400), Space Grotesk (600) |
| 3D sphere | Vanilla JS `<canvas>` animation, inline script |
| Translation | `lib/translation.js` — unchanged |
| Theme | `lib/theme.js` — unchanged |

---

## 3. Color System

Both themes share `#00FF7F` as the accent. Tailwind tokens are added flat under `theme.extend.colors`.

### Light mode (Aetheric Precision)
| Token | Value | Usage |
|---|---|---|
| `background` | `#F7F9FB` | Page background |
| `surface` | `#ECEEF0` | Cards, containers |
| `on-surface` | `#191C1E` | Body text |
| `primary` | `#006D33` | Primary text accents |
| `primary-container` | `#00FF7F` | Buttons, active states |
| `outline` | `#6A7B6B` | Borders, metadata text |

### Dark mode (Portfolio Elite)
| Token | Value | Usage |
|---|---|---|
| `background` | `#000000` | Page background |
| `surface` | `#131313` | Cards |
| `surface-container` | `#1F1F1F` | Secondary containers |
| `on-surface` | `#E2E2E2` | Body text |
| `primary` | `#F0FFED` | Headings |
| `primary-container` | `#00FF7F` | Buttons, active states |
| `outline` | `#849584` | Borders |

Tailwind `dark:` variants are used for all dark-mode overrides.

---

## 4. Typography

Three fonts loaded via Google Fonts in `<head>`.

| Role | Font | Weight | Size (desktop) | Notes |
|---|---|---|---|---|
| Display headline | Epilogue | 800 | 80px | Hero name, tight letter-spacing |
| Section headline | Epilogue | 700 | 48px | Section titles |
| Sub-headline | Epilogue | 600 | 32px | Card titles |
| Body | Manrope | 400 | 16–20px | Descriptions, paragraphs |
| Labels / chips | Space Grotesk | 600 | 12px | Uppercase, 0.15em letter-spacing |

---

## 5. Layout & Spacing

- 12-column centered grid, max-width `1440px`, `32px` gutters
- Spacing units: `8px` base
- Section vertical rhythm: `120px` between major sections (`stack-lg`)
- Internal component spacing: `40px` (`stack-md`), `16px` (`stack-sm`)
- Mobile: single column, reduced padding

---

## 6. Navigation

- Fixed top bar, `z-50`
- Background: `rgba(0,0,0,0.5)` dark / `rgba(255,255,255,0.8)` light, `backdrop-blur-md`
- Left: favicon + "VT" in `Space Grotesk`
- Center: nav links — Home, Skills, Projects, Experience, Contact — `Space Grotesk` uppercase
- Active link: small `#00FF7F` dot underneath, no underline or bg change
- Right: theme toggle button (existing logic)
- Mobile: nav links hidden (same as current)
- **Scroll progress bar:** `2px` fixed line at very top of viewport, `#00FF7F`, width driven by `scrollY / (scrollHeight - innerHeight)` inline listener

---

## 7. Hero Section

- Full-viewport height (`100dvh`)
- **Background:** `<canvas>` centered, absolute positioned, z-index behind content. Renders a wireframe geodesic sphere with `#00FF7F` edge color. Slow Y-axis rotation (~0.003 rad/frame). Dark mode: full opacity glow; light mode: 35% opacity so it doesn't overpower the light surface.
- **Foreground (centered, stacked vertically):**
  1. `FULLSTACK DEVELOPER` — `Space Grotesk` uppercase label, green color
  2. `Vinicius Teixeira` — `Epilogue` 800 weight, 80px
  3. Bio paragraph — `Manrope` 400, max ~60ch, `data-i18n-key="main.home.text"`
  4. Button row: **View Work** (primary: green bg, black text, `href="#projects"`) + **Get In Touch** (secondary: transparent, border)
  5. Social icons: GitHub, LinkedIn (FontAwesome, existing links)
- No photo in the hero

---

## 8. Skills Section

Section id: `#skills`. Label: "PERSONAL STACK" (`Space Grotesk`), Heading: "Core Expertise" (`Epilogue`).

Three-column card grid (collapses to 1 col on mobile):

| Column | Category | Skills |
|---|---|---|
| 1 | Frontend | HTML/CSS/JS, React, Angular |
| 2 | Backend | Python, Java, TypeScript, Node.js, Go |
| 3 | Infrastructure | AWS, GCP, Azure |

Each card: `Surface Level 1` background, category icon (FontAwesome), category name (`Epilogue` sub-headline), skill chips below (`Space Grotesk` uppercase, green text on dark chip bg).

Descriptive paragraphs from the current site move below the grid (same `data-i18n-key` attributes).

---

## 9. Projects Section

Section id: `#projects`. Label: "PORTFOLIO" (`Space Grotesk`), Heading: "Selected Works" (`Epilogue`).

Asymmetric grid: one featured wide card (col-span-2) + two narrower cards, all in a 3-column grid. On mobile: single column stack.

Each card contains:
- Image placeholder area (dark bg, easy to swap for a real screenshot via `<img src="">`)
- Category label — `Space Grotesk` uppercase
- Project name — `Epilogue` 32px
- Description — `Manrope`, `data-i18n-key` preserved
- "VIEW PROJECT →" link — `Space Grotesk`

**Current projects:**
- Abat Caverna (`http://abatcaverna.com`) — featured card
- Rock, Paper and Scissors (`https://rockpaperscissors.viniciustei.com.br`) — narrower card

**Adding a project:** copy one card `<article>` block and update name, description, link, and image src.

---

## 10. Experience Section

Section id: `#experience`. Label: "CAREER PATH" (`Space Grotesk`), Heading: "Experience" (`Epilogue`).

Two-column layout: left = date range + company label; right = role title (`Epilogue`) + description (`Manrope`).

Current entries:
- Software Developer (2021–Present) — `data-i18n-key` preserved
- College / UFV Computer Science (2018–2023) — `data-i18n-key` preserved

Adding more entries: append a new row pair.

---

## 11. Contact Section

Section id: `#contact`. Full-width section with centered content.

- Headline: "Let's build something extraordinary." (`Epilogue` 48px)
- Subtext: `data-i18n-key="main.contact.description"`
- Two icon+label buttons side by side:
  - **Send a Message** → `mailto:viniciustprates@gmail.com`
  - **Start a Chat** → existing WhatsApp link
- Button style: `Surface Level 1` background, icon + label, subtle border

---

## 12. Footer

Minimal one-line footer:
- Left: favicon + "ViniciusTei" link to GitHub repo (existing)
- Center: `© 2026 Vinicius Teixeira. Digital Craftsmanship.`
- Right: GitHub, LinkedIn, Email icon links

---

## 13. Elevation & Depth

- **Dark:** depth via tonal layering. `#000` → `#111` (cards) → `#1F1F1F` (containers). Ghost borders: `1px solid rgba(132, 149, 132, 0.2)`. Glassmorphism nav: `backdrop-blur-md` + `bg-black/50`.
- **Light:** `#FFF` → `#F8FAFC` (cards) with `1px` `#E2E8F0` border. Modals/popovers: diffused shadow `0px 20px 50px rgba(0,0,0,0.04)`.
- No traditional drop shadows.

---

## 14. Scroll Progress Bar

A `<div id="scroll-progress">` fixed at `top:0; left:0; height:2px; background:#00FF7F; width:0%; z-index:100`. A `scroll` event listener on `window` updates its `width` as a percentage of total scrollable distance.

---

## 15. What Is NOT Changing

- `lib/translation.js` — untouched
- `lib/theme.js` — untouched
- `assets/` — untouched (favicon, Vinicius.png kept for potential future use)
- `postcss.config.js` — untouched
- `package.json` dependencies — no new packages
- All existing `data-i18n-key` attributes — preserved with current text as authoritative content
- FontAwesome kit script — preserved
