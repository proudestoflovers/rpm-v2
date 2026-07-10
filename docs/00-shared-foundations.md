# Shared Foundations

Single source of truth for behaviour that cuts across the three epics ([Student Dashboard](01-epic-student-dashboard.md), [Offline Scores](02-epic-offline-scores.md), [Student Profile](03-epic-student-profile.md)). Stories reference these sections instead of restating them — if a threshold, label, or breakpoint needs to change, it changes here once.

> **Prototype note:** the reference prototype (roster-run.html, student-profile.html, rr-design-system.js) runs entirely on hardcoded mock data. All stories are forward-looking requirements: production features must be backed by real data services, and mocked prototype elements still receive full acceptance criteria.

---

## Score banding

Every completed assignment score maps to one of four proficiency bands. Bands drive colour, sort order (roster prioritisation), and next-step recommendations everywhere in the product.

| Rank | Code | Label | Text/BG | Bar fill |
|------|------|-------|---------|----------|
| 3 | `prof` | Proficient | `#016a36` on `#e8fef0` | `#018143` |
| 2 | `i` | Instructional | `#00547f` on `#e8f4fd` | `#0375a0` |
| 1 | `e` | Emerging | `#9a3412` on `#fff7ed` | `#d15e00` |
| 0 | `p` | Pre-emerging | `#b20203` on `#fff1f0` | `#dc2626` |

**Thresholds are per subject** (Proficient requires more in ELA):

| Band | Math | ELA |
|------|------|-----|
| Proficient | 80–100% | 85–100% |
| Instructional | 55–79% | 55–84% |
| Emerging | 33–54% | 33–54% |
| Pre-emerging | 0–32% | 0–32% |

**Band-driven next-step copy** (surfaced on the profile and in recommendations):

| Band | Next step |
|------|-----------|
| Proficient | Level ≤ 2: "Move to next skill or advance level" · Level 3+: "Move to next skill" |
| Instructional | "Continue at current level with routine instruction and practice" |
| Emerging | "Use lesson reteach ideas; consider moving to a more supported level" |
| Pre-emerging | "Teach prerequisite skills before continuing this skill" |

Design reference: `BAND` in rr-design-system.js; `THRESHOLDS` and `BAND_NEXT` in student-profile.html.

---

## Trend classification

Per-student, per-subject trend over recent work. Three states:

| Code | Label | Icon | Colour |
|------|-------|------|--------|
| `up` | Improving | ↑ up arrow | `#018143` |
| `steady` | Stable | — dash | `#9a9a9c` |
| `down` | Declining | ↓ down arrow | `#d15e00` |

The full calculation algorithm — last-5-activities window, recent-vs-baseline comparison with a ±8-point threshold, level-advancement handicap, and Proficient ceiling guard — is specified in **[trend-framework.md](../trend-framework.md)**. All trend displays (dashboard subject rows, profile subject headers) must use that algorithm and the shared `TrendIndicator` component; tooltips describe the window as "Trend over last 5 activities".

---

## Taxonomies

**Subjects** (badge = circular icon on tinted background):

| Subject | Badge |
|---------|-------|
| Math | Calculator icon, amber `#a56c00` on `#FEF3C7` |
| ELA | Book icon, purple `#7135ac` on `#ecdcff` |
| Science | Atom icon, green `#166534` on `#c8f5da` |
| Social Studies | Glasses icon, teal `#026663` on `#c4f0eb` |

**Assignment statuses:**

| Code | Label | Colour |
|------|-------|--------|
| `done` | Complete | Green `#016a36`, checkmark icon |
| `ip` | In progress | Blue `#0053a0`, circular-arrow icon |
| `ns` | Not started | Orange `#c05a00`, info icon |

**Prompt levels** (single taxonomy used in score entry and profile editing): Independent, Verbal, Gestural, Model, Physical, Hand-over-hand.

**Accommodations catalogue** (grouped; multi-select; recently-used items surface first):

| Category | Items |
|----------|-------|
| Time & Setting | Extended time, Separate setting, Small group, Preferential seating, Frequent breaks |
| Presentation | Read aloud, Large print, Simplified instructions, Braille |
| Response | Scribe, Verbal responses, Calculator, Manipulatives |
| Supports | Word bank, Graphic organizer, Chunked tasks |

---

## Shared components

Behavioural contracts; implementations live in rr-design-system.js unless noted.

- **Pill** — rounded label chip; resolves colours from a band code or a named tone; optional dot, leading icon, remove button.
- **Meter** — thin (6px) pill-rounded progress bar; neutral track, caller-supplied fill (band colour for scores, brand purple for completion); optional trailing label ("82%", "4/6"); animated width.
- **TrendIndicator** — optional subject name + trend label + arrow/dash icon, coloured per the trend table above.
- **SubjectBadge** — circular subject icon per the subjects table; icon ≈ 66% of circle diameter.
- **TagSelectField** (student-profile.html / offline flow) — multi-select tag input: selected values as removable pills, dropdown grouped by category with a "Used previously" section, repositions to stay in viewport.
- **InfoTip** — small ⓘ that reveals explanatory copy on hover/focus.

---

## Responsive strategy

Principle: one column of content survives at every width; data density is shed progressively rather than scrolled horizontally.

| Breakpoint | Behaviour |
|------------|-----------|
| ≤1200px | Dashboard row: identity spans full width; score card + trends sit side by side beneath (2:1) |
| ≤1024px | Two-column layouts collapse to one; the offline-scores assignment sidebar becomes a slide-in drawer with toggle button |
| ≤1023px | Profile assignment rows hide the attempts count column |
| ≤768px | Dashboard row fully stacks (identity / score card / trends); lesson header stacks |
| ≤767px | Profile rows hide the level column |
| ≤639px | Profile rows hide the date column |
| ≤480px | Breadcrumb and drawer-toggle text labels hidden (icons remain) |

---

## Cross-cutting non-functional requirements

Stated once; assumed by every story.

- **Keyboard-first data entry.** The offline score flow must be fully operable without a mouse (see [OFF-9](02-epic-offline-scores.md)); all interactive elements need visible focus states (brand `#5a58ff` ring).
- **Student data privacy.** Names, scores, notes, and accommodations are student PII/education records: transmit over TLS, authorize per-teacher roster access, and exclude from client logs and analytics. Notes and accommodations may contain sensitive observations — treat as confidential.
- **Perceived performance.** Screen transitions and list rendering should feel instant (<100ms interaction feedback); score save round-trips surface optimistic UI with the confirmation toast.
- **No destructive surprises.** Any action that discards user input requires confirmation (unsaved-changes guard); any background removal offers undo via toast (6-second window).
