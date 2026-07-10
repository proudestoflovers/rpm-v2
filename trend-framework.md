# Trend Classification Framework

How per-subject trends (shown on the Students dashboard and student profile) are classified from assignment scores.

> **Prototype note:** the UI currently renders hardcoded mock trend values (`trend` / `subjectTrends` in the screen data). This document defines the logic a real implementation would use, so mock values can be chosen — and later replaced — consistently.

## Classifications

| Code | Label | Icon | Colour |
|------|-------|------|--------|
| `up` | Improving | ↑ up arrow | `TEXT.success` `#018143` |
| `steady` | Stable | — dash | `TEXT.muted` `#9a9a9c` |
| `down` | Declining | ↓ down arrow | `TEXT.trendDown` `#d15e00` |

Rendered by the shared `TrendIndicator` component in `rr-design-system.js`.

## Calculation window

A trend is calculated per **student × subject**, from the student's last **5 completed, scored activities** in that subject, ordered by completion date (most recent first).

- Only activities with a recorded score count (`st: 'done'` with a `sc` value). In-progress and not-started activities are ignored.
- Where an activity has multiple attempts, only the **most recent attempt** counts — the window never contains two scores for the same activity.

## Method: recent vs. baseline

Split the 5-score window and compare averages:

- **Recent (R)** — mean score of the **2 most recent** activities
- **Baseline (B)** — mean score of the **3 activities before those**
- **Delta (Δ)** = R − B

| Condition | Trend |
|-----------|-------|
| Δ ≥ +8 points | Improving (`up`) |
| Δ ≤ −8 points | Declining (`down`) |
| otherwise | Stable (`steady`) |

### Why ±8 points?

Proficiency bands (Pre-emerging / Emerging / Instructional / Proficient, defined in `rr-design-system.js`) each span roughly 20–25 percentage points. A ±8-point threshold is about a third of a band: wide enough to filter normal score-to-score noise, narrow enough to catch movement that would change a student's band within the next 2–3 activities.

## Edge cases

**Fewer than 5 scored activities**
- 3–4 scores: compare the 2 most recent against the mean of the rest.
- Fewer than 3 scores: no trend is computed. Display Stable (matches the existing UI fallback `subjectTrends?.[subject] || 'steady'`) — there is not enough data to claim a direction.

**Level advancement inside the window**
A score dip immediately after moving up a level is expected, not regression. Any score earned at a **higher level** than the baseline activities gets a **+10-point handicap** added before comparison. A student who advances and holds a slightly lower raw score still reads as Stable or Improving.

**Ceiling guard**
If **all 5** scores in the window are in the Proficient band, the trend is never Declining. Movement inside the top band is noise, not regression — the worst it can read is Stable.

## Algorithm (pseudocode)

```js
function subjectTrend(activities /* newest first, scored, latest attempt per activity */) {
  if (activities.length < 3) return 'steady';           // not enough data

  const window = activities.slice(0, 5);
  const baselineLevel = Math.min(...window.slice(2).map(a => a.lv));
  const adj = window.map(a => a.sc + (a.lv > baselineLevel ? 10 : 0)); // level handicap

  const recent   = mean(adj.slice(0, 2));
  const baseline = mean(adj.slice(2));
  const delta    = recent - baseline;

  const allProficient = window.every(a => a.band === 'prof');
  if (delta >= 8) return 'up';
  if (delta <= -8) return allProficient ? 'steady' : 'down'; // ceiling guard
  return 'steady';
}
```

## Worked examples

| Last 5 scores (newest first) | R | B | Δ | Trend |
|------------------------------|---|---|---|-------|
| 78, 72, 60, 58, 55 | 75 | 57.7 | +17.3 | Improving |
| 62, 65, 63, 60, 66 | 63.5 | 63 | +0.5 | Stable |
| 41, 48, 58, 62, 60 | 44.5 | 60 | −15.5 | Declining |
| 82, 84, 95, 93, 96 (all Proficient) | 83 | 94.7 | −11.7 | Stable (ceiling guard) |
| 70 @L3, 68 @L3, 75 @L2, 72 @L2, 78 @L2 | 79* | 75 | +4 | Stable |

\* Level-3 scores carry the +10 handicap against a Level-2 baseline.
