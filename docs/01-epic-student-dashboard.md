# Epic: Student Dashboard

**Epic statement:** As a teacher, I want a single roster view that surfaces each student's latest result and subject-level trends, prioritised by proficiency so I can see who needs help first, and jump into detail or score entry without hunting.

**Scope:** the Students screen — roster list, per-student summary rows, navigation to the profile and the offline score flow, save confirmation.
**Out of scope:** the "Manage" settings area and the left nav rail's Library destination (present as stubs in the prototype, not specified here); the offline score flow itself ([Epic: Offline Scores](02-epic-offline-scores.md)); the profile ([Epic: Student Profile](03-epic-student-profile.md)).

Design reference: `StudentsScreen` / `StudentListRow` in roster-run.html. Shared behaviour: [Shared Foundations](00-shared-foundations.md).

---

## DASH-1 — Roster list prioritised by proficiency

**User Story:** As a teacher, I want my roster sorted by proficiency band so the students who need help most appear first, so that I can triage my class at a glance.

**Acceptance Criteria:**
- Given my roster has students in different proficiency bands, When the dashboard loads, Then students are ordered by band rank ascending (Pre-emerging first, Proficient last) per [Shared: Score banding](00-shared-foundations.md#score-banding).
- Given two students share a band, When the list renders, Then their relative order is stable across reloads (secondary sort: name alphabetically).
- Given the list renders, When I view any row, Then it shows the student's avatar, full name, and grade.

**Edge Cases:**
- Student with no band yet (no completed work): sort to the bottom, below Proficient — show identity without a score card (see DASH-2).
- Empty roster: show an empty state with guidance to add students (prototype has none — required for production).
- Very long names: truncate with ellipsis; full name available as tooltip.

**Technical/Design Notes:**
- Row card: white, 16px radius, 1px `#ebebeb` border; 12px gap between rows; list max-width 1280px, centred.
- Sort is fixed (no user-facing sort control in this release).
- Prototype hardcodes 6 students; production must render rosters of 30+ without jank (virtualise beyond ~50 rows).

---

## DASH-2 — Latest assignment score card

**User Story:** As a teacher, I want each row to show the student's most recent completed assignment with its score and band, so that I know their freshest result without opening the profile.

**Acceptance Criteria:**
- Given a student has completed at least one assignment, When their row renders, Then the card labelled "Latest assignment" shows: subject badge, assignment name, "Level N", "Completed {date}", the percentage score, a meter filled in the band colour, and a band pill — bands per [Shared: Score banding](00-shared-foundations.md#score-banding).
- Given the score, When the meter renders, Then its fill width equals the percentage and its colour is the band's bar colour.
- Given the assignment name is longer than the card, When it renders, Then it truncates with ellipsis (never wraps the card taller).

**Edge Cases:**
- No completed assignments: replace the card with a quiet placeholder ("No completed work yet") rather than an empty card.
- Score recorded as absent: the most recent *scored* assignment is shown instead; absences never appear as a latest result.
- Multiple attempts on the latest assignment: show the most recent attempt's score.

**Technical/Design Notes:**
- Card is a nested white card (12px radius) inside the row; the % uses emphasised 14px/600 type.
- Band pill uses the small Pill size; must not stretch full-width.
- Design reference: score card block in `StudentListRow`.

---

## DASH-3 — Per-subject trend summary

**User Story:** As a teacher, I want to see each student's direction of travel in all four subjects, so that I can spot a subject slipping even when the latest overall result looks fine.

**Acceptance Criteria:**
- Given a student row, When it renders, Then it lists Math, ELA, Science, and Social Studies — each with its subject badge, name, and a TrendIndicator (label + arrow/dash icon) per [Shared: Trend classification](00-shared-foundations.md#trend-classification).
- Given a subject trend is Improving/Stable/Declining, When it renders, Then label and icon are coloured green/gray/orange respectively, right-aligned in the subject row.
- Given trends are computed, When any is displayed, Then it follows the algorithm in [trend-framework.md](../trend-framework.md) (last 5 scored activities per subject).

**Edge Cases:**
- Fewer than 3 scored activities in a subject: show Stable (the framework's "not enough data" state).
- Subject with no activities at all: show the subject row with a muted "No data" in place of a trend, so the four-row layout stays consistent.

**Technical/Design Notes:**
- 1px dividers between subject rows (not after the last).
- Use the shared `TrendIndicator` component only — no bespoke trend rendering.

---

## DASH-4 — Open a student's profile

**User Story:** As a teacher, I want to click a student's row to open their full profile, so that I can move from triage to detail in one action.

**Acceptance Criteria:**
- Given the roster list, When I hover a row, Then the row elevates (shadow deepens) and the cursor indicates clickability.
- Given a row, When I click anywhere on it, Then the student profile opens for that student.
- Given the profile opens, When it loads, Then it displays the same student (correct identity and data) as the row I clicked.

**Edge Cases:**
- Click on interactive child elements (none today, but future ones like an overflow menu) must not trigger navigation.
- Navigation target unavailable: show a standard error state rather than a blank page.

**Technical/Design Notes:**
- **Production requires navigation by stable student id.** The prototype passes only `name`, `emoji`, `grade`, `level` as URL params to student-profile.html — insufficient and forgeable. Profile data must be fetched server-side by id with authorization (see [Shared: NFRs](00-shared-foundations.md#cross-cutting-non-functional-requirements)).
- Hover shadow: `0 1px 4px` → `0 4px 20px` rgba black, 0.15s transition.

---

## DASH-5 — Launch offline score entry

**User Story:** As a teacher, I want an "Offline scores" action on the dashboard, so that I can record paper-based work for my class without leaving my roster context.

**Acceptance Criteria:**
- Given the dashboard header, When it renders, Then it shows an "Offline scores" button (secondary style, leading plus icon) beside the "Students" heading area.
- Given I click "Offline scores", When the action fires, Then the offline score entry flow opens ([Epic: Offline Scores](02-epic-offline-scores.md)).
- Given I return from that flow, When I land back on the dashboard, Then my scroll position and the roster state are preserved.

**Edge Cases:**
- No assignments exist to score: the flow still opens and handles its own empty state (see OFF-3).

**Technical/Design Notes:**
- Button: 36px height, white bg, dark border/text.
- The adjacent "Manage" button is out of scope for this epic (stub in prototype).

---

## DASH-6 — Save confirmation toast with undo

**User Story:** As a teacher, I want clear confirmation when scores I entered have been saved, with a chance to undo, so that I trust the data landed and can recover from mistakes.

**Acceptance Criteria:**
- Given I saved scores in the offline flow, When I return to the dashboard, Then a dark toast appears bottom-centre reading "Score added" with an "Undo" action.
- Given the toast is visible, When 6 seconds elapse without interaction, Then it dismisses itself.
- Given I click "Undo" within the window, Then the just-saved scores are reverted and the toast confirms the undo.

**Edge Cases:**
- Multiple rapid saves: the newest toast replaces the previous; undo applies to the most recent save batch only.
- Undo after the data is already reflected in rows: the affected rows revert visibly (latest-assignment card and trends recompute).

**Technical/Design Notes:**
- Toast: `#1d1d1f` bg, white text, 12px radius, fixed bottom 28px, z-index above content; "Undo" in light purple `#a9a7ff`.
- Prototype's Undo is non-functional — production must implement real reversal of the save batch.

---

## DASH-7 — Responsive roster rows

**User Story:** As a teacher, I want the dashboard to stay legible on my laptop, tablet, and phone, so that I can triage my class from whatever device I have in hand.

**Acceptance Criteria:**
- Given a viewport wider than 1200px, When a row renders, Then identity, score card, and trends sit in one 3-column row (1:2:1).
- Given a viewport ≤1200px, When a row renders, Then identity spans the top and the score card + trends sit side by side beneath (2:1), per [Shared: Responsive strategy](00-shared-foundations.md#responsive-strategy).
- Given a viewport ≤768px, When a row renders, Then the three sections stack vertically, full width, in the order identity → score card → trends.
- Given any breakpoint, When the layout changes, Then no content is clipped and no horizontal scrolling occurs.

**Edge Cases:**
- Rotation/resize mid-session: layout re-flows live without losing scroll position.
- 320px-wide devices: content still fits; truncation rules from DASH-1/2 apply harder.

**Technical/Design Notes:**
- Implemented via CSS grid overrides on `[data-rr-student-row]` and section data-attributes; keep the breakpoint values in one stylesheet block.
- Verify at 1280, 1200, 800, 768, and 375px during QA.
