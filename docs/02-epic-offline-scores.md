# Epic: Offline Score Entry

**Epic statement:** As a teacher, I want a fast, keyboard-first flow for recording scores from paper-based work across my whole class, so that transferring a stack of marked papers into the system takes minutes, not a lesson period.

**Scope:** the full offline-scores flow launched from the dashboard — assignment browsing and selection, per-student score entry (including absences, attempts, levels, prompts, accommodations, notes), progress tracking, save/cancel.
**Out of scope:** creating or authoring assignments; the dashboard itself ([Epic: Student Dashboard](01-epic-student-dashboard.md)).

Design reference: `RosterRunScreen` and its children in roster-run.html. Shared behaviour: [Shared Foundations](00-shared-foundations.md).

---

## OFF-1 — Enter, save, and exit the flow

**User Story:** As a teacher, I want clear entry, save, and exit points for score entry, so that I always know where I am and how my work gets committed.

**Acceptance Criteria:**
- Given I open the flow, When the screen renders, Then the breadcrumb reads "‹ Students › Offline scores" and the header shows "Cancel" and "Save" actions.
- Given I click the "Students" breadcrumb or "Cancel" with no unsaved changes, When the action fires, Then I return to the dashboard immediately.
- Given I click "Save", When the save succeeds, Then all entered scores, notes, prompts, levels, and attempts are persisted, I return to the dashboard, and the "Score added" toast appears (see DASH-6).

**Edge Cases:**
- Save failure (network/server): stay in the flow, keep all input, show a retryable error — never silently drop entered scores.
- Save with zero entries: "Save" is disabled until at least one change exists.

**Technical/Design Notes:**
- Save commits the whole session as one batch (this is the unit the dashboard's Undo reverts).
- All entered data is student PII — see [Shared: NFRs](00-shared-foundations.md#cross-cutting-non-functional-requirements).

---

## OFF-2 — Unsaved-changes guard

**User Story:** As a teacher, I want a warning before leaving with unsaved scores, so that I can't lose a page of data entry with one stray click.

**Acceptance Criteria:**
- Given I have entered any score, note, prompt, level, or attempt since the last save, When I click Cancel or the breadcrumb, Then a modal appears: "Discard changes?" / "Unsaved changes will be lost if you cancel." with "Keep editing" and "Discard changes" options.
- Given the modal, When I choose "Keep editing", Then it closes and my input is intact.
- Given the modal, When I choose "Discard changes", Then I return to the dashboard and nothing is persisted.

**Edge Cases:**
- Browser/tab close with dirty state: trigger the native beforeunload prompt.
- Dirty flag resets after a successful save.

**Technical/Design Notes:**
- Any change marks the session dirty (score, prompt, note, level, attempt-add).

---

## OFF-3 — Assignment browser (search, filter, list)

**User Story:** As a teacher, I want to search and filter the assignment list, so that I can find the exact worksheet I just marked among everything assigned this term.

**Acceptance Criteria:**
- Given the assignment sidebar, When it renders, Then it shows a "Search assignments" field, a filters button, and the assignment list — each item with subject badge, unit + name, and a completion indicator (green ✓ when every paper student is scored, otherwise "X/Y").
- Given I type in search, When results update, Then only matching assignments show; given no matches, Then "No results" is displayed.
- Given the filters panel, When opened, Then I can combine: subject (multi-select chips: Math, ELA, Science, Social studies), date available (the shared `DateRangeFilter`, [Shared: components](00-shared-foundations.md#shared-components)), and assigned-to (multi-select of roster students); a "Clear all" action appears whenever any filter is active.
- Given the "Date available" filter, When I click it, Then a panel opens with preset shortcuts on the left and the shared `MonthCalendarGrid` on the right, rendered so it's never clipped by the sidebar's edge; selecting a preset or a custom start/end date only updates the draft — it is not applied yet.
- Given a draft selection, When I click "Apply", Then the panel closes, the filter commits, the trigger label updates (e.g. "Mar 15 – Apr 20" for a custom range), and the trigger takes on the active/highlighted style whenever the applied range isn't "All time" — which also counts toward the filters button's active-filter indicator and the "Clear all" visibility.
- Given the panel is open with an unapplied draft, When I click outside the panel, Then it closes and the draft is discarded — the previously applied range (if any) stays in effect and the assignment list is unaffected.
- Given more than 30 results, When the list renders, Then 30 show with a "Load more" control.
- Given a viewport ≤1024px, When the screen renders, Then the sidebar becomes a slide-in drawer with a toggle button showing the current assignment name, per [Shared: Responsive strategy](00-shared-foundations.md#responsive-strategy).

**Edge Cases:**
- No assignments exist at all: empty state with guidance (distinct from filtered-to-zero "No results").
- Filters + search combine (AND); count of active filters is visible on the filter button.
- Search/filter state persists while I move between assignments within the session.
- Reopening the date panel after a range is already applied: draft state initializes from the applied value, not blank.

**Technical/Design Notes:**
- Desktop sidebar: 360px default, drag-resizable 200–560px. Drawer: min(320px, 88vw), overlay backdrop, 0.2s slide.
- Selected assignment gets a left accent bar and tinted background.
- Uses the shared `DateRangeFilter` component and canonical preset list — do not implement an offline-scores-specific preset set (see [Shared: components](00-shared-foundations.md#shared-components)).

---

## OFF-4 — Assignment selection and sequential navigation

**User Story:** As a teacher, I want to move to the next or previous assignment without touching the list, so that I can work through a pile of different worksheets in one sitting.

**Acceptance Criteria:**
- Given the assignment list, When I click an assignment, Then the scoring area loads it and focus moves into the first student's score field.
- Given a selected assignment, When I press Arrow Down / Arrow Up, Then the next / previous assignment in the list is selected.
- Given drawer mode (≤1024px), When the nav row renders, Then previous/next buttons are available beside the drawer toggle, disabled (40% opacity) at the ends of the list.

**Edge Cases:**
- Changing assignment never discards entered data on the previous one — the whole session saves together (OFF-1).
- Arrow-key navigation must not fire while focus is inside a text field.

**Technical/Design Notes:**
- On selection: reset expanded row, search-within, and drawer-open state; auto-focus first paper student (~80ms delay for render).

---

## OFF-5 — Lesson header and class progress

**User Story:** As a teacher, I want the current assignment's details and a class-completion meter always visible, so that I can confirm I'm scoring the right worksheet and see how many students remain.

**Acceptance Criteria:**
- Given a selected assignment, When the scoring area renders, Then a header card shows: thumbnail, subject badge + unit label, topic, assignment name, "Available {date}", and a progress meter reading "X / Y" (students scored / total).
- Given I enter or clear a score, When the count changes, Then the meter updates immediately.
- Given the header, When I click the dismiss (X, tooltip "Dismiss from this view") control, Then the assignment is removed from my list for this session and the next visible assignment loads, with an undo toast (6s) to restore it.

**Edge Cases:**
- Dismissing the last visible assignment: fall back to the previous one; if none remain, show the empty state.
- "X / Y" counts both paper and online students; absences count as scored.

**Technical/Design Notes:**
- Uses the shared `Meter`; dismissal is view-state only (never deletes the assignment).
- ≤768px: header stacks vertically, thumbnail 120px tall.

---

## OFF-6 — Percentage score entry

**User Story:** As a teacher, I want to type each student's raw score into a simple field, so that entering results is as fast as reading them off the paper.

**Acceptance Criteria:**
- Given a paper student's row, When it renders, Then it shows an avatar, the student's name, their level, a numeric score input, and the assignment's denominator (e.g. "/15").
- Given the score input, When I type, Then only digits are accepted (non-digits stripped).
- Given a score is entered, When the row loses focus, Then the value is held in the session (persisted on Save, OFF-1).

**Edge Cases:**
- Empty score = unscored (not zero); a typed 0 is a real score.
- Paste with mixed characters: digits survive, rest stripped.

**Technical/Design Notes:**
- Input: 72×44px, centred 20px/700 text; focus ring brand blue `#5a58ff`.
- The percentage/band derivation from raw score ÷ max happens at save per [Shared: Score banding](00-shared-foundations.md#score-banding).

---

## OFF-7 — Over-maximum validation

**User Story:** As a teacher, I want an immediate warning when I type a score above the assignment's maximum, so that transcription errors are caught at the keyboard, not discovered later in reports.

**Acceptance Criteria:**
- Given an assignment with max score M, When I enter a value greater than M, Then the input border turns red and helper text "Max score is {M}" appears beneath it.
- Given an over-max value, When I correct it to ≤ M, Then the error clears instantly.
- Given any over-max value remains, When I click Save, Then the save is blocked with the offending students indicated.

**Edge Cases:**
- "Abs" is exempt from max validation.
- Max changes per assignment; validation always uses the current assignment's max.

**Technical/Design Notes:**
- Prototype shows the visual error but does not block save — production must block (last AC above is a deliberate hardening).

---

## OFF-8 — Mark a student absent

**User Story:** As a teacher, I want a one-keystroke way to mark a student absent, so that missing papers don't stall my entry rhythm.

**Acceptance Criteria:**
- Given an empty score field is focused, When I press "a" or "A", Then the field shows "Abs" and focus auto-advances to the next student.
- Given a field shows "Abs", When rendered, Then it uses the reduced/muted style to distinguish it from numeric scores.
- Given an absent student, When class progress is computed (OFF-5), Then they count as handled; given band/trend calculations, Then absences are excluded (no score exists).

**Edge Cases:**
- "a" pressed in a field that already has digits: ignored (shortcut only fires on empty).
- Clearing "Abs": select-all + delete returns the field to empty/unscored.

**Technical/Design Notes:**
- "Abs" styling: 14px/500 muted gray within the same input.

---

## OFF-9 — Keyboard-first entry flow

**User Story:** As a teacher, I want to score my entire class without touching the mouse, so that a 30-paper stack takes one pass of type-Enter-type-Enter.

**Acceptance Criteria:**
- Given focus in a score field, When I press Enter, Then focus advances to the next student's score field (paper students in list order, then online students).
- Given focus on the last student of an assignment, When I press Enter, Then the next assignment loads and focus lands on its first student.
- Given focus in a score field, When I press Tab, Then focus moves into that student's detail controls (prompt chips first) rather than skipping to the next student.
- Given an assignment loads (by any means), When rendering completes, Then the first paper student's score field is focused with its content selected.

**Edge Cases:**
- Focused row auto-expands so keyboard users can reach details without clicking.
- Keyboard chip selection triggers the pulse affordance (scale + glow, 0.35s) as confirmation.

**Technical/Design Notes:**
- This story is the flow's core performance requirement: median ≤3s per student for score-only entry.
- Visible focus states are mandatory throughout ([Shared: NFRs](00-shared-foundations.md#cross-cutting-non-functional-requirements)).

---

## OFF-10 — Per-student details: date, prompts, accommodations, notes

**User Story:** As a teacher, I want to record how a student completed the work — when, with what prompting and accommodations, and my observations — so that the score carries its instructional context.

**Acceptance Criteria:**
- Given a student row, When I expand it (click, or focus via keyboard), Then it reveals: a "Date completed" picker, a "Prompt level" field, an "Accommodations" field, and a "Notes" textarea (placeholder "Add observational notes…").
- Given the prompt-level field, When opened, Then it offers the shared prompt taxonomy as selectable chips, per [Shared: Taxonomies](00-shared-foundations.md#taxonomies); selected chips render in the highlighted state.
- Given the accommodations field, When opened, Then it offers the shared accommodations catalogue grouped by category, with recently-used items first; selections render as removable pills.
- Given any detail is entered, When I collapse or move on, Then it is retained and saved with the session.

**Edge Cases:**
- Details without a score are valid (e.g. notes on an absent student).
- Notes have no arbitrary length cap; long notes scroll within the textarea.

**Technical/Design Notes:**
- Expanded row: left accent bar `#5a58ff`, tinted background, two-column grid (details left, notes right); single column ≤1024px.
- Prompt/accommodation editors use the shared `TagSelectField`.

---

## OFF-11 — Adjust a student's level

**User Story:** As a teacher, I want to change the level a student attempted for this assignment, so that the score is judged against the work they were actually given.

**Acceptance Criteria:**
- Given an expanded paper-student row, When it renders, Then the level appears as a dropdown (default: the student's current level); collapsed rows show it as static "Level N" text.
- Given the dropdown, When I pick a level, Then the row reflects it immediately and the change saves with the session.
- Given an online student, When their row renders, Then level is read-only text (their level came from the online activity).

**Edge Cases:**
- Level options are those defined for the assignment (prototype: 1–3); never allow levels the assignment doesn't have.
- Changing level does not clear an already-entered score.

**Technical/Design Notes:**
- Selected option: tinted `#eaeaff` + bold; open trigger shows the active/blue state.

---

## OFF-12 — Multiple attempts

**User Story:** As a teacher, I want to record more than one attempt at the same assignment for a student, so that re-takes are captured as history instead of overwriting the first try.

**Acceptance Criteria:**
- Given an expanded paper-student row, When I click "Another attempt" (+ icon), Then a new attempt row for that student appears beneath, expanded and focused, with its own score, details, and notes.
- Given a student has multiple attempts, When their rows render, Then each carries an "Attempt N" pill so they're distinguishable.
- Given multiple attempts exist, When trend/band calculations run later, Then only the most recent attempt per assignment counts, per [trend-framework.md](../trend-framework.md).

**Edge Cases:**
- Attempt rows are independent — no values copy forward from the previous attempt.
- Removing an unsaved attempt row (production affordance): allowed until save; must re-confirm nothing else is lost.
- Online students cannot receive manual attempts.

**Technical/Design Notes:**
- The "Another attempt" control appears only on the student's first-attempt row.

---

## OFF-13 — Online students shown read-only

**User Story:** As a teacher, I want students who completed the assignment online listed alongside my paper scorers with their results locked, so that I see the whole class in one place without risking overwriting system-recorded scores.

**Acceptance Criteria:**
- Given an assignment some students completed online, When the student list renders, Then online students appear after paper students, each with a green "Online" badge and their score as read-only text.
- Given an online student's row, When I try to edit the score or level, Then no editing affordance exists (no input, no dropdown).
- Given an online student's row, When expanded, Then contextual fields that remain teacher-owned (notes, prompt level, accommodations) are still editable.

**Edge Cases:**
- Assignment with only online students: paper section is empty; keyboard flow (OFF-9) proceeds through online rows for detail entry.
- Assignment with no online students: the online section does not render at all.

**Technical/Design Notes:**
- Read-only score: large muted text in place of the input.
- Completion indicator in the browser list (OFF-3) counts paper students only for the ✓ state.
