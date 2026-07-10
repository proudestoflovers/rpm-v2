# Everway Design System

A design system for **Everway** — a neurotechnology / education company whose
platform brings together special-education and accessibility apps for teachers,
specialists, and learners (Unique Learning System, Polaris, uPar, Embrace,
News2you, Symbolstix Prime, L³ Skills, Positivity, Read&Write, OrbitNote,
EquatIO, and more). The platform "Launcher" is the warm, friendly home that ties
these apps together; each app shares this one component language.

This folder is a self-contained recreation of that language: tokens, fonts,
brand assets, component specimens, and a working UI kit. It is built so a design
agent can produce on-brand Everway screens, prototypes, and marketing assets.

> **Internal codename:** the engineering design system is **EDS** — every token,
> class, and CSS variable is prefixed `--eds-*` / `eds-`.

---

## Sources used to build this

| Source | Type | Notes |
|---|---|---|
| `design-system-mcp-0.2.1/` | Code (MCP server) | `@everway/design-system-mcp` v0.2.1 — the **source of truth**. Contains `data/tokenRegistry.json` (full color/spacing/type/shadow tokens, light + dark), `componentRegistry.json` (36 React components with props, variants, examples), `styleClassRegistry.json` (568 `eds-*` utility classes), and `data/screenshots/` (real Storybook renders per component). |
| `01 _ Foundation Library.fig` | Figma (mounted) | Color, Type, Spacing, Size, Radius, Opacity, Shadows, Grids, Illustrations. Plus a `Color-Testing` page containing **real product mockups** (the Launcher home, ULS dashboard, login). |
| `03 _ Component Library.fig` | Figma (mounted) | The component library (Button, Card, Modal, Table, Nav, etc.). |
| `uploads/Figtree-*.ttf` | Fonts | The Figtree variable fonts (UI typeface). |

The real npm packages referenced by the system (you may or may not have access):
`@everway/design-system-react`, `@everway/design-system-styles`,
`@everway/design-system-tokens`, `@everway/design-system-icons`.
Components require `data-eds-theme="light"` (or `"dark"`) on a wrapping element,
or **all CSS variables are undefined** — this is the #1 "styles not working" gotcha.

---

## Brand & product context

Everway serves K-12 special education and accessibility: IEP authoring, literacy
screening, differentiated content, behavior support, and assistive reading/writing
tools. The audience is **educators and specialists** (and, downstream, students).
The brand reads **calm, warm, trustworthy, and modern** — not playful/childish,
not clinical/enterprise. The signature move is a **warm cream "paper" canvas**
under a clean white-card UI, anchored by an **indigo** brand color and a friendly
serif **"Everway"** wordmark with its distinctive **"E" monogram**.

---

## CONTENT FUNDAMENTALS

**Voice:** warm, plain, encouraging, and direct. Speaks *to* the educator.

- **Person:** Second person — **"you" / "your"**. Sections are framed around the
  user: *"Your apps"*, *"Your content subscriptions"*, *"Welcome, Kelly"*.
- **Casing:** **Sentence case** everywhere — headings, buttons, labels, tabs.
  (*"New lesson"*, *"Find student"*, *"Your class"*, *"Forgot password?"*).
  Product names keep their own casing (*Unique Learning System*, *uPar*, *News2you*).
- **Tone:** Reassuring and outcome-oriented. Product blurbs lead with the benefit:
  *"Supporting teaching in the classroom, lesson planning, creation and student
  progress monitoring."* · *"Collaborative IEP solution to support compliance and
  student success."* · *"Universal literacy screener to identify students who may
  need reading accommodations."*
- **Length:** Short. One-line section titles; 1–2 sentence descriptions; verb-first
  buttons (*Open, Save, Sign in, New lesson*).
- **CTAs:** A verb + optional noun, often paired with a trailing arrow (*"Open →"*).
- **Status language:** Human, not codey — *On track · At risk · Behind · All present*.
- **Emoji:** **None.** The brand does not use emoji in product UI.
- **Internal token docs** are written as lowercase imperative usage notes
  (*"use as default bg color in brand button, selected checkbox…"*) — handy as a
  guide for *where* each token belongs, but not user-facing copy.

---

## VISUAL FOUNDATIONS

**Color.** One brand hue: **indigo `#5a58ff`** (reserved-brand), darkening through
`#4c42e4` → `#3d33cc` for hover/pressed and links. Text is near-black `#1d1d1f`
with `#49494b` / `#6d6d6f` for secondary/tertiary. Semantics: success green
`#018143`, warning orange `#d15e00`, error red `#e0241a`, info blue `#0053a0`,
each with a pale "subtle" tint for backgrounds. Six **decorative accent families**
(yellow, lime, teal, blue, purple, pink) color tags and subject thumbnails — never
to imply status. See `colors_and_type.css` for the complete, named token set
(light + dark).

**The warm-paper signature.** The platform shell uses warm cream surfaces —
`paper-primary #fcfaf7`, `paper-secondary #faf6f0` — while individual apps use cool
white/grey (`#ffffff`, `#f9f9fa`, `#f4f4f6`). This warm/cool split is the most
recognizable thing about the brand. The dark navigation rail is `#141415`.

**Type.** **Figtree** for everything (variable, 300–900). Bold (700) for
Display & Headline, SemiBold (600) for Titles (incl. button labels), Regular (400)
for Body. A high-contrast **serif** (*Make Look*, substituted by *Newsreader*) is
reserved for the **"Everway" wordmark and product logos only**. Type ramps:
Display 58/46/42/36 · Headline 32/28/26/22 · Title 20/18/16/14 · Body 18/16/14.

**Spacing & layout.** A t-shirt spacing scale (2 → 80px) and a control-height scale
(20 → 52px; **44px** is the default touch target). 12/8/4-column responsive grids
(breakpoints 320 / 600 / 960 / 1800px). Generous whitespace; content sits in a
centered max-width column on the paper canvas.

**Shape & corners.** Soft, friendly radii. **Cards = 16px** (`radius-md`).
**Buttons, tags, and inputs lean fully rounded** — controls use the **pill**
radius (112px); inputs use 12px. Nothing is sharp-cornered.

**Borders.** Hairline and quiet: `#e1e1e3` for card edges and dividers, `#939395`
for input outlines, a **2px indigo** ring for focus/selected. Secondary buttons
use a `1.5px` dark outline (`#323234`).

**Elevation.** Soft, low-contrast, slightly warm-neutral shadows (`rgba(29,41,57,…)`
at 3–6% opacity). Cards rest on `shadow-sm`; overlays/menus use `shadow-md`–`xl`.
No hard drop shadows, no neumorphism.

**Backgrounds & imagery.** Flat warm-paper and white — **no gradient page
backgrounds**. The one gradient is a **warm brand gradient** (yellow → green →
indigo) used sparingly on avatar rings, the plan badge, and the active-nav accent.
Photography (when present) is bright, real, and classroom-warm; product icons are
flat single-color circles with a paper-colored glyph.

**Motion.** Restrained and quick. Short ease transitions (~120–150ms) on hover
(card lift + shadow), background fills on press. No bounces, no infinite loops,
no parallax.

**Interaction states.** *Hover* = a step up the surface ladder (e.g. `#fff →
#f4f4f6`) or, for cards, a lift + deeper shadow. *Pressed* = a further step
darker (`#e1e1e3`). *Focus* = 2px indigo ring with a 2px gap. *Disabled* = 44%
opacity. *Selected* = indigo.

**Transparency & blur.** Used sparingly — primarily the modal overlay scrim
(`surface-overlay #49494b` at 44% opacity). The UI itself favors solid surfaces.

---

## ICONOGRAPHY

- **System:** Everway ships its own library, `@everway/design-system-icons` —
  **4,800+ icons** across `line`, `solid`, `duotone`, `duocolor`, `brand`, and
  `custom` styles. The default UI style is **outline / line** (2px stroke, rounded
  caps & joins, 24px grid). Names like `Star06`, `XClose`, `File06`, `Bell03`,
  `MagicWand01`, `UploadCloud01` reveal an **Untitled-UI-derived** set.
- **Sizing:** icons map to the `size` scale; common UI size is 20–24px, colored
  with `--eds-color-icon-*` tokens (default `#1d1d1f`, inverse `#ffffff`).
- **In this kit (substitution, flagged):** the real icon library is *not* in the
  provided package, so the UI kit uses **[Lucide](https://lucide.dev) (MIT)** —
  the closest open match (same 2px outline style). Swap to the Everway icon
  components for production. See `EverwayKit.jsx` `Icon`.
- **Brand / product marks** are real, copied from the Figma file into `assets/`:
  the **Everway "E" monogram** (`assets/everway-monogram*.svg`, an authentic
  vector) and product glyphs in `assets/products/` (Unique Learning System
  asterisk, uPar, Positivity heart, News2you, Read&Write). Marks are drawn in
  **paper color on a brand-colored circle**.
- **Emoji / unicode as icons:** not used.

---

## Index — what's in this folder

| Path | Contents |
|---|---|
| `README.md` | This file |
| `colors_and_type.css` | All `--eds-*` tokens (color light+dark, spacing, size, radius, shadow, opacity, type) + semantic type classes + `@font-face` |
| `SKILL.md` | Agent-Skill front-matter so this can be used in Claude Code |
| `fonts/` | Figtree variable fonts (UI typeface) |
| `assets/` | Everway monogram (ink / white / paper variants) + `assets/products/` brand glyphs |
| `preview/` | ~19 Design-System cards (Type, Colors, Spacing, Components, Brand) |
| `ui_kits/everway-platform/` | Interactive UI kit — Launcher login → home → opened app. See its own `README.md` |

**Quick start for a new design:** link `colors_and_type.css`, put
`data-eds-theme="light"` on `<html>`, set the body to `--eds-color-surface-paper-primary`,
use Figtree, pill buttons, 16px white cards, indigo for anything selected. Pull
components and patterns from `ui_kits/everway-platform/`.
