/* ─────────────────────────────────────────────────────────────────────────
   RPM shared design system
   Loaded first (as <script type="text/babel" src="rr-design-system.js">) by
   both roster-run.html and student-profile.html so pills, meters, and band
   colours have a single source of truth.

   Load-order contract: top-level values here are LITERALS only — they must not
   reference TYPE / TEXT (which are declared later, in each page's inline
   block). Pill / Meter reference TYPE / TEXT inside their function bodies, so
   those globals are resolved at render time (after every script has run). This
   mirrors the existing pattern where RRProgressBar referenced TYPE from a later
   block and worked.
   ───────────────────────────────────────────────────────────────────────── */

const RADIUS = { pill: 100, card: 16, control: 10, sm: 8 };
const METER  = { h: 6, radius: 100, track: '#e1e1e3' };

/* Canonical performance band — code-keyed superset of the two old schemas
   (roster's BAND_STYLES: label-keyed, `.accent`, `.rank`;
    profile's BAND: code-keyed, `.bar`, `.zone`, `.label`). */
const BAND = {
  prof: { code: 'prof', label: 'Proficient',    bg: '#e8fef0', fg: '#016a36', bar: '#018143', border: '#b7f5cc', rank: 3, zone: 'rgba(1,129,67,0.07)' },
  i:    { code: 'i',    label: 'Instructional', bg: '#e8f4fd', fg: '#00547f', bar: '#0375a0', border: '#b3d9f0', rank: 2, zone: 'rgba(3,117,160,0.07)' },
  e:    { code: 'e',    label: 'Emerging',      bg: '#fff7ed', fg: '#9a3412', bar: '#d15e00', border: '#fed7aa', rank: 1, zone: 'rgba(209,94,0,0.08)' },
  p:    { code: 'p',    label: 'Pre-emerging',  bg: '#fff1f0', fg: '#b20203', bar: '#dc2626', border: '#fecaca', rank: 0, zone: 'rgba(220,38,38,0.08)' },
};
const BAND_BY_LABEL = Object.fromEntries(Object.values(BAND).map((b) => [b.label, b]));
/* Accepts a band code ('e') OR a full label ('Emerging'); returns null if unknown. */
const bandOf = (k) => (k == null ? null : (BAND[k] || BAND_BY_LABEL[k] || null));

/* Pill tone palette (bg / fg / border). `border: 'transparent'` = no border. */
const PILL_TONES = {
  default: { bg: '#f4f4f6', fg: '#49494b', border: '#e1e1e3' },
  success: { bg: '#e3fdea', fg: '#016a36', border: '#b7f5cc' },
  warning: { bg: '#ffe9c7', fg: '#ad4b00', border: '#fed7aa' },
  error:   { bg: '#ffe9e5', fg: '#b20203', border: '#fecaca' },
  brand:   { bg: '#eaeaff', fg: '#3d33cc', border: '#c8c6ff' }, // tag-input tokens
  teal:    { bg: '#dafbf9', fg: '#026663', border: '#b6ebe7' },
  purple:  { bg: '#f4eaff', fg: '#7135ac', border: '#e3d1f5' },
  blue:    { bg: '#e6f7fe', fg: '#006182', border: '#b3d9f0' },
  meta:    { bg: '#f0f0f2', fg: '#49494b', border: '#e1e1e3' },  // accommodation / metadata
  status:  { bg: '#F9F9FA', fg: null,       border: '#ececed' }, // fg supplied via `color`
};

/* ── Pill ──────────────────────────────────────────────────────────────────
   The single pill primitive. Resolve colour by (in priority order):
     band="e"  → BAND colours   |   tone="success" → PILL_TONES
     explicit bg/fg/border override anything   |   color overrides fg (status)
   Props: size ('md'|'sm'), dot, leading (node), removable/onRemove (× button). */
function Pill({
  tone = 'default', band, bg, fg, border, color,
  size = 'md', dot, leading, removable, onRemove, children, style,
}) {
  const b = band ? bandOf(band) : null;
  const c = b ? { bg: b.bg, fg: b.fg, border: b.border } : (PILL_TONES[tone] || PILL_TONES.default);
  const _bg = bg != null ? bg : c.bg;
  const _fg = color != null ? color : (fg != null ? fg : c.fg);
  const _border = border != null ? border : c.border;
  const pad = size === 'sm' ? '2px 10px' : '4px 12px';
  return (
    <span style={{
      ...TYPE.label,
      display: 'inline-flex', alignItems: 'center', gap: 5, whiteSpace: 'nowrap',
      background: _bg, color: _fg, borderRadius: RADIUS.pill, padding: pad,
      border: _border && _border !== 'transparent' ? `1px solid ${_border}` : 'none',
      ...style,
    }}>
      {dot && <span style={{ width: 6, height: 6, borderRadius: '50%', background: _fg, flexShrink: 0 }} />}
      {leading}
      {children}
      {removable &&
        <button onClick={(e) => { e.stopPropagation(); onRemove && onRemove(); }}
          style={{ border: 'none', background: 'transparent', padding: 0, marginLeft: 1, cursor: 'pointer', display: 'flex', alignItems: 'center', color: _fg, lineHeight: 1 }}>
          <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
        </button>
      }
    </span>
  );
}

/* ── Meter ─────────────────────────────────────────────────────────────────
   The single filled-track bar. Thin, pill-rounded, neutral track; the fill
   colour is caller-supplied (brand purple for completion, band colour for
   score). Optional trailing label (e.g. "4/6" or "82%").
   Pass either `pct` or `done`+`total`. */
function Meter({ pct, done, total, fill, label, labelColor, labelWidth, style }) {
  const raw = pct != null ? pct : (total > 0 ? Math.round((done / total) * 100) : 0);
  const p = Math.max(0, Math.min(100, raw));
  const _fill = fill || TEXT.brand;
  const text = label != null ? label : (total != null ? `${done}/${total}` : null);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, ...style }}>
      <div style={{ flex: 1, height: METER.h, borderRadius: METER.radius, background: METER.track, overflow: 'hidden' }}>
        {p > 0 &&
          <div style={{ width: `${p}%`, height: '100%', background: _fill, transition: 'width .3s' }} />
        }
      </div>
      {text != null &&
        <span style={{ ...TYPE.titleRow, color: labelColor || TEXT.secondary, flexShrink: 0, textAlign: 'right', ...(labelWidth != null ? { width: labelWidth } : {}) }}>
          {text}
        </span>
      }
    </div>
  );
}
