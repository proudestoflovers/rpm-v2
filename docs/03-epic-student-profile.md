# Epic: Student Profile

**Epic statement:** As a teacher, I want a complete, filterable record of an individual student's results with context (attempts, prompting, accommodations, notes) and concrete next-step recommendations, so that I can plan instruction and speak to parents and specialists with evidence.

**Scope:** the student profile screen — header and tabs, results views (units/domains), filters, unit cards, assignment detail, inline context editing, next-step recommendations.
**Out of scope:** the roster and score entry ([Student Dashboard](01-epic-student-dashboard.md), [Offline Scores](02-epic-offline-scores.md)); the prototype's cosmetic tweaks panel (density/colour/border experiments — design tooling, not product).

Design reference: student-profile.html. Shared behaviour: [Shared Foundations](00-shared-foundations.md).

---

## PROF-1 — Profile header with collapsing identity

**User Story:** As a teacher, I want the student's identity fixed at the top of their profile with a way back to my roster, so that I never lose track of whose data I'm reading in a long page.

**Acceptance Criteria:**
- Given I open a profile, When the header renders, Then it shows an "‹ All students" back link, the student's avatar, name, and grade.
- Given I scroll down past the header threshold, When the page moves, Then the header collapses to a compact single line (small avatar + name + grade inline) that remains visible.
- Given I click "All students", When navigation fires, Then I return to the dashboard.

**Edge Cases:**
- Deep-link to a profile (no dashboard in history): back link still routes to the dashboard.
- Unknown/invalid student id: standard not-found state, no partial render.

**Technical/Design Notes:**
- Expanded avatar 52px, compact 34px; collapse triggers after ~48px of scroll with a ~260ms opacity/translate transition.
- Production loads the profile by student id with per-teacher authorization (see DASH-4 note and [Shared: NFRs](00-shared-foundations.md#cross-cutting-non-functional-requirements)).

---

## PROF-2 — Profile tabs

**User Story:** As a teacher, I want the profile organised into Results, Assignments, and Settings tabs, so that performance data, work management, and student configuration don't crowd one page.

**Acceptance Criteria:**
- Given the profile header, When it renders, Then three tabs show — "Results" (default active), "Assignments", "Settings" — with the active tab underlined in the accent colour.
- Given I click "Assignments", When it activates, Then it lists all of the student's assigned work including in-progress and not-started items (statuses per [Shared: Taxonomies](00-shared-foundations.md#taxonomies)).
- Given I click "Settings", When it activates, Then it shows the student's persistent configuration (default level per subject, standing accommodations, profile details).

**Edge Cases:**
- Tab state survives in-page interactions (expanding cards, editing notes) but resets to Results on fresh navigation.

**Technical/Design Notes:**
- **Prototype status:** only Results is built; Assignments and Settings are stubs. The ACs above are the forward-looking contract — both tabs need their own detailed stories before build.

---

## PROF-3 — Units / Domains view toggle

**User Story:** As a teacher, I want to switch between organising results by curriculum unit and by skill domain, so that I can answer both "how did Unit 2 go?" and "how is she doing on phonics?".

**Acceptance Criteria:**
- Given the Results tab, When it renders, Then a segmented control offers "Units" (default) and "Domains".
- Given Units view, When results render, Then assignments group under unit headings (e.g. "K. Unit 1. Counting & Numbers to 10") each with a group average % and band pill.
- Given Domains view, When I switch, Then the same assignments regroup under domain headings (e.g. "Counting & Cardinality") with recomputed group averages, and my filters (PROF-4/5) still apply.

**Edge Cases:**
- Assignment without a domain mapping: grouped under "Other" in Domains view rather than disappearing.
- Switching views preserves scroll position where the layout allows.

**Technical/Design Notes:**
- Group average = mean of completed scores in the group; band pill derived per [Shared: Score banding](00-shared-foundations.md#score-banding).

---

## PROF-4 — Time-range filter

**User Story:** As a teacher, I want to filter results to a time window, so that I can look at just this term or the weeks since an intervention started.

**Acceptance Criteria:**
- Given the Results tab, When it renders, Then a date filter (the shared `DateRangeFilter`, [Shared: components](00-shared-foundations.md#shared-components)) shows "All time" by default with the canonical preset list per [Shared: components](00-shared-foundations.md#shared-components).
- Given the filter, When I click it, Then a panel opens with preset shortcuts on the left and the shared `MonthCalendarGrid` on the right; selecting a preset or a custom start/end date only updates the draft — it is not applied yet.
- Given a draft selection, When I click "Apply", Then the panel closes, the filter commits, the trigger label updates (e.g. "Mar 15 – Apr 20" for a custom range), and the trigger takes on the active/highlighted style whenever the applied range isn't "All time".
- Given the panel is open with an unapplied draft, When I click outside the panel, Then it closes and the draft is discarded — the previously applied range (if any) stays in effect.
- Given an active range, When results render, Then only assignments *completed* within the range appear, and all group averages, trends, and counts recompute over the filtered set.

**Edge Cases:**
- Range with no completed work: subject sections show an empty message rather than vanishing.
- End date before start date: prevented by the picker.
- In-progress/not-started items are unaffected by date filtering (they have no completion date) and remain visible only where a view includes them (PROF-2 Assignments).
- Reopening the panel after a range is already applied: draft state initializes from the applied value, not blank.

**Technical/Design Notes:**
- Uses the shared `DateRangeFilter` component and canonical preset list — do not implement a profile-specific preset set (see [Shared: components](00-shared-foundations.md#shared-components)).

---

## PROF-5 — Subject filter

**User Story:** As a teacher, I want to filter the profile to a single subject, so that I can prepare for a subject-specific conversation without scrolling past everything else.

**Acceptance Criteria:**
- Given the Results tab, When it renders, Then a subject filter pill shows "All subjects" by default.
- Given I open it, When the menu renders, Then I can select one subject or more from the shared subject list ([Shared: Taxonomies](00-shared-foundations.md#taxonomies)).
- Given a selection, When results render, Then only the chosen subjects' sections appear and the pill label reflects the selection (e.g. "Math" or "2 subjects").

**Edge Cases:**
- Combined with the time filter: both apply (AND).
- Deselecting everything returns to "All subjects" rather than an empty page.

**Technical/Design Notes:**
- **Prototype status:** the pill renders but is non-functional; this story specifies the production behaviour.

---

## PROF-6 — Subject sections with trend

**User Story:** As a teacher, I want each subject section headed by the student's trend in that subject, so that direction of travel frames the detail below it.

**Acceptance Criteria:**
- Given a subject with at least one completed assignment, When its section renders, Then the header shows the subject badge, name, a TrendIndicator (label + icon per [Shared: Trend classification](00-shared-foundations.md#trend-classification)), and an InfoTip reading "Trend over last 5 activities".
- Given the trend, When computed, Then it uses the algorithm in [trend-framework.md](../trend-framework.md) over the *unfiltered* subject history (the trend describes the student, not the current filter).
- Given a section header, When I click its chevron, Then the section collapses/expands.

**Edge Cases:**
- No completed assignments in the subject: no trend shown (header renders without it).
- Fewer than 3 scored activities: Stable per the framework's insufficient-data rule.

**Technical/Design Notes:**
- Must use the shared `TrendIndicator`. Prototype hardcodes `trend="up"` — production computes it.
- The dashboard (DASH-3) and this header must always agree for the same student/subject.

---

## PROF-7 — Unit/domain cards with group averages

**User Story:** As a teacher, I want each unit or domain summarised with an average score and band before I open it, so that I can scan for weak areas without expanding everything.

**Acceptance Criteria:**
- Given a group (unit or domain) with completed work, When its card renders collapsed, Then it shows the group title, average %, a band pill, and an InfoTip reading "Average over N activities" (N = completed activities included).
- Given a card, When I click it, Then it expands to list the assignment rows within (PROF-8), with the summary sticky at the top.
- Given the time filter changes, When averages recompute, Then N and the % update accordingly.

**Edge Cases:**
- Group with no completed work in the current filter: card shows title without an average.
- Single-activity group: average equals that score; InfoTip says "Average over 1 activity".

**Technical/Design Notes:**
- White card, 16px radius, shadow on expand; unit code rendered in the subject accent colour.

---

## PROF-8 — Assignment result rows

**User Story:** As a teacher, I want each completed assignment listed with its level, date, and attempt count, so that I can pick the exact piece of work to examine.

**Acceptance Criteria:**
- Given an expanded group card, When rows render, Then each completed assignment shows: name, "Level N", completion date, and — where the student made multiple attempts — an "· N attempts" marker.
- Given a row, When I click it, Then it expands into the assignment detail (PROF-9).
- Given narrower viewports, When rows render, Then columns shed progressively (attempts ≤1023px, level ≤767px, date ≤639px) per [Shared: Responsive strategy](00-shared-foundations.md#responsive-strategy) — the assignment name always remains.

**Edge Cases:**
- Multiple attempts collapse to one row (the marker indicates the rest); the detail view exposes each attempt (PROF-9).
- Long assignment names truncate with ellipsis.

**Technical/Design Notes:**
- Hover/focus: left accent bar affordance; rows are buttons (keyboard-expandable).

---

## PROF-9 — Expanded assignment detail

**User Story:** As a teacher, I want a full picture of one assignment result — score against thresholds, timeline, and every attempt — so that I can explain exactly what happened on that piece of work.

**Acceptance Criteria:**
- Given I expand a row, When the detail renders, Then the left column shows: the large % score, a meter filled in band colour, the band pill with its threshold range for that subject (per [Shared: Score banding](00-shared-foundations.md#score-banding)), and a timeline "Available {date} → Completed {date}".
- Given multiple attempts exist, When the detail renders, Then an attempt switcher lets me jump between attempts, each showing its own score, date, and context.
- Given the detail, When it renders, Then the right column shows next-step recommendations (PROF-11); at ≤1024px the columns stack with recommendations below.

**Edge Cases:**
- Attempt with an absent marker: shown in the attempt list as "Absent", no score.
- Missing availability date: show completed date only.

**Technical/Design Notes:**
- Two-column layout via the shared responsive pattern; score meter is the shared `Meter`.

---

## PROF-10 — Inline editing of prompt level, accommodations, and notes

**User Story:** As a teacher, I want to correct or add prompting, accommodations, and notes on a past result from the profile, so that the record stays accurate after the moment of scoring.

**Acceptance Criteria:**
- Given an expanded assignment detail, When it renders, Then "Prompt level", "Accommodations", and "Notes" sections show current values read-only (pills / pre-wrapped text).
- Given a section's edit control (pencil), When I click it, Then the section becomes editable — tag fields for prompts/accommodations using the shared taxonomies ([Shared: Taxonomies](00-shared-foundations.md#taxonomies)), a textarea for notes — with save (✓) and cancel (✕) controls.
- Given I save, When the edit commits, Then the read view updates immediately and the change persists; given I cancel, Then the previous values are restored untouched.

**Edge Cases:**
- Concurrent edit of two sections: each section saves independently.
- Empty notes saved: the notes section shows a quiet empty placeholder, not blank space.
- Edits are audit-relevant (education records): retain who/when on each change.

**Technical/Design Notes:**
- Tag editors use the shared `TagSelectField` with "Used previously" ordering; textarea min-height 80px, brand focus ring.
- Same taxonomies and editors as the offline flow (OFF-10) — one implementation, two surfaces.

---

## PROF-11 — Band-driven next-step recommendations

**User Story:** As a teacher, I want concrete recommended next steps based on how the student scored, so that a result immediately becomes a plan rather than a number.

**Acceptance Criteria:**
- Given an expanded assignment detail, When the recommendations panel renders, Then it is headed "Recommended next steps" (lightbulb icon) and its content depends on the result's band, using the next-step logic in [Shared: Score banding](00-shared-foundations.md#score-banding):
  - Proficient at level ≤2 → two options ("Move to next skill" / "Move up a level"), each with a lesson preview card and an "Assign level N" action;
  - Proficient at level 3 → single "Move to next skill" option with preview card;
  - Instructional → the continue-at-level guidance text, no card;
  - Emerging → two options ("Use reteach ideas from lesson plan" with a reteach card and "Re-assign" action / "Try lower level" with a preview card);
  - Pre-emerging → prerequisite guidance with a preview card at the current level.
- Given multiple options, When they render, Then a carousel with previous/next controls and an "X / Y" counter moves between them.
- Given I click "Assign level N" or "Re-assign", When the action fires, Then the lesson is assigned to the student at that level and the action confirms.

**Edge Cases:**
- Recommended next lesson doesn't exist (end of sequence): fall back to guidance text without a card.
- Already assigned: the action indicates it instead of double-assigning.

**Technical/Design Notes:**
- Preview card: unit code, lesson type ("Lesson"/"Read Aloud"), name, thumbnail, action button.
- **Prototype status:** assign/re-assign buttons render without handlers; production wires them to real assignment creation.
- Never restate band thresholds here — the shared doc owns them.
