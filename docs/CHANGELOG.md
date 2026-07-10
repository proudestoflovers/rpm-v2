# Backlog doc changes — date range filter alignment

Summary of edits made to the existing backlog docs (not a new epic — these are deltas against the docs already shared with the team). Context: the prototype had two independent date-filter implementations with different preset lists (offline scores vs. profile); this round of changes converges them on one spec in the docs and reflects the matching fix now made in the prototype code.

## docs/00-shared-foundations.md

**Shared components** — added three new entries alongside the existing Pill/Meter/TrendIndicator/SubjectBadge/TagSelectField/InfoTip list:
- **MonthCalendarGrid** — the calendar grid every date picker in the product now shares.
- **DateRangeFilter** — the trigger + preset/calendar panel used by both the offline-scores "date available" filter (OFF-3) and the profile "time-range" filter (PROF-4). Called out explicitly as **one implementation, one preset list** bound to different fields per surface, not two components.
- **DatePickerField** — the single-date variant used for "Date completed" in offline score entry (OFF-10).

**New canonical preset table** — the single target spec for `DateRangeFilter`, replacing what had been two different ad hoc lists:

| Key | Label | Resolves to |
|-----|-------|-------------|
| `all` | All time | No filter |
| `d30` | Last 30 days | Today − 30 days → today |
| `d90` | Last 90 days | Today − 90 days → today |
| `schoolYear` | This school year | Aug 1 – Jun 30 of the active academic year |
| `custom` | Custom | User-picked start/end |

**Prototype-status note** — added, then updated once the prototype was actually fixed: now states the alignment is implemented (one shared implementation in rr-design-system.js, no more per-surface copies), rather than describing it as outstanding work.

## docs/02-epic-offline-scores.md — OFF-3 (Assignment browser)

- "Date available" filter now named as the shared `DateRangeFilter` (was: generic "range picker").
- Added three new acceptance criteria spelling out the actual interaction, not just the component reference:
  - Clicking the filter opens a panel (presets left, calendar right, portal-rendered so it isn't clipped by the sidebar).
  - Selecting a preset or custom dates only updates a **draft** — nothing applies yet.
  - Clicking **Apply** commits the change, updates the trigger label, and switches the trigger to its active/highlighted style (which also drives the filters button's active-indicator and "Clear all" visibility).
  - Clicking **outside the panel** discards the draft and keeps whatever was previously applied.
- Added edge case: reopening the panel re-seeds the draft from the currently-applied value rather than blank.
- Technical/Design Notes: added a line requiring the shared component + canonical preset list (no offline-scores-specific preset set).

## docs/03-epic-student-profile.md — PROF-4 (Time-range filter)

- Preset list in the acceptance criteria replaced with a reference to the canonical list in Shared Foundations (was: a hardcoded list of "All time, Last 30 days, Last 60 days, 2025–26 school year, Custom" that no longer matches the target spec).
- Added the same open/draft/Apply/click-outside acceptance criteria as OFF-3, so both filters are specified identically.
- Added the same "reopen re-seeds from applied value" edge case.
- Technical/Design Notes: the old note about school-year preset bounds moved into the shared doc's preset table; replaced with a line requiring the shared component (no profile-specific preset set).

## Not changed

`docs/01-epic-student-dashboard.md` — no net changes. (DASH-1's sort rule was tried as alphabetical-by-name, then reverted back to proficiency-band ranking at your request; the file is byte-identical to the last shared version.)
