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

/* ── TrendIndicator ────────────────────────────────────────────────────────
   Shared trend readout: optional subject name, label, then arrow/dash icon.
   Classification logic is documented in trend-framework.md. */
function TrendIndicator({ trend, subject }) {
  const map = {
    up:     { color: TEXT.success },
    steady: { color: TEXT.muted },
    down:   { color: TEXT.trendDown },
  };
  const t = map[trend] || map.steady;
  const labels = { up:'Improving', steady:'Stable', down:'Declining' };
  const icons = {
    up:     <><path d="M12 19V5" /><path d="M5 12l7-7 7 7" /></>,
    steady: <line x1="5" y1="12" x2="19" y2="12" />,
    down:   <><path d="M12 5v14" /><path d="M19 12l-7 7-7-7" /></>
  };
  return (
    <div style={{ display:'flex', alignItems:'center', gap:4, color:t.color }}>
      {subject && <span style={{ ...TYPE.titleRow, color: TEXT.primary }}>{subject.charAt(0).toUpperCase() + subject.slice(1)}</span>}
      <span style={{ ...TYPE.label, color: 'inherit' }}>{labels[trend]}</span>
      <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        {icons[trend]}
      </svg>
    </div>
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

/* ── Date range filtering ────────────────────────────────────────────────
   One preset list, one calendar grid, one filter component — used by the
   offline-scores assignment browser (filters by date available), the
   profile results view (filters by date completed), and offline scores'
   "Date completed" field. */
const DATE_PRESETS = [
  { key: 'all', label: 'All time' },
  { key: 'd30', label: 'Last 30 days' },
  { key: 'd90', label: 'Last 90 days' },
  { key: 'schoolYear', label: 'This school year' },
  { key: 'custom', label: 'Custom' },
];

function presetRange(sel, today) {
  if (!sel) return null;
  const { key, from, to } = sel;
  if (key === 'd30' || key === 'd90') {
    const days = { d30: 30, d90: 90 }[key];
    const f = new Date(today); f.setDate(f.getDate() - days);
    return { from: f, to: today };
  }
  if (key === 'schoolYear') return { from: new Date(2025, 7, 1), to: new Date(2026, 5, 30) };
  if (key === 'custom' && from && to) return { from, to };
  return null; // 'all', or incomplete custom
}

function formatShort(d) {
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function dateRangeLabel(sel) {
  const preset = DATE_PRESETS.find((p) => p.key === sel.key);
  if (sel.key === 'custom') return sel.from && sel.to ? `${formatShort(sel.from)} – ${formatShort(sel.to)}` : 'Custom';
  return preset ? preset.label : 'All time';
}

function sameDay(a, b) { return a && b && a.toDateString() === b.toDateString(); }

/* The single month-view calendar grid underlying every date picker, so every
   calendar has identical geometry. Callers own per-day styling via renderDay. */
function MonthCalendarGrid({ viewMonth, onPrevMonth, onNextMonth, renderDay }) {
  const daysInMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 0).getDate();
  const firstDow = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), 1).getDay();
  const leadBlanks = (firstDow + 6) % 7; // Monday-first
  const cells = [...Array(leadBlanks).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];
  return (
    <div style={{ width: 300, padding: 16, display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <button onClick={onPrevMonth} style={{ border: 'none', background: 'none', cursor: 'pointer', display: 'flex', padding: 4 }}>
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={TEXT.secondary} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
        </button>
        <span style={{ ...TYPE.titleRow }}>{viewMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
        <button onClick={onNextMonth} style={{ border: 'none', background: 'none', cursor: 'pointer', display: 'flex', padding: 4 }}>
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={TEXT.secondary} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
        </button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2, marginBottom: 4 }}>
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
          <div key={d} style={{ ...TYPE.body, color: TEXT.muted, textAlign: 'center', fontSize: 12 }}>{d}</div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2 }}>
        {cells.map((day, i) => (
          <React.Fragment key={i}>
            {day ? renderDay(day, new Date(viewMonth.getFullYear(), viewMonth.getMonth(), day)) : <div />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

/* Trigger + dropdown: preset shortcuts on the left, MonthCalendarGrid on the
   right for a custom range. Rendered via a portal so it's never clipped by a
   narrow, overflow:hidden ancestor (e.g. the offline-scores sidebar). */
function DateRangeFilter({ value, onChange, today }) {
  const _today = today || new Date();
  const [open, setOpen] = React.useState(false);
  const [draftKey, setDraftKey] = React.useState(value.key);
  const [draftFrom, setDraftFrom] = React.useState(value.from || null);
  const [draftTo, setDraftTo] = React.useState(value.to || null);
  const [viewMonth, setViewMonth] = React.useState(() => new Date(value.from || _today));
  const [pos, setPos] = React.useState(null);
  const triggerRef = React.useRef(null);
  const dropdownRef = React.useRef(null);
  const active = value.key && value.key !== 'all';

  function computePos() {
    if (!triggerRef.current) return;
    const r = triggerRef.current.getBoundingClientRect();
    const panelWidth = 460;
    const margin = 8;
    let left = r.left;
    if (left + panelWidth > window.innerWidth - margin) left = window.innerWidth - margin - panelWidth;
    if (left < margin) left = margin;
    setPos({ left, top: r.bottom + 6 });
  }

  React.useEffect(() => {
    if (!open) return;
    setDraftKey(value.key); setDraftFrom(value.from || null); setDraftTo(value.to || null);
    computePos();
    function close(e) {
      if (triggerRef.current && triggerRef.current.contains(e.target)) return;
      if (dropdownRef.current && dropdownRef.current.contains(e.target)) return;
      setOpen(false);
    }
    function onReposition() { computePos(); }
    document.addEventListener('mousedown', close);
    window.addEventListener('scroll', onReposition, true);
    window.addEventListener('resize', onReposition);
    return () => {
      document.removeEventListener('mousedown', close);
      window.removeEventListener('scroll', onReposition, true);
      window.removeEventListener('resize', onReposition);
    };
  }, [open]);

  function pickPreset(key) {
    setDraftKey(key);
    if (key !== 'custom') { setDraftFrom(null); setDraftTo(null); }
  }

  function pickDay(day) {
    const clicked = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), day);
    setDraftKey('custom');
    if (!draftFrom || (draftFrom && draftTo)) { setDraftFrom(clicked); setDraftTo(null); }
    else if (clicked < draftFrom) { setDraftTo(draftFrom); setDraftFrom(clicked); }
    else { setDraftTo(clicked); }
  }

  function apply() {
    onChange({ key: draftKey, from: draftFrom, to: draftTo });
    setOpen(false);
  }

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button ref={triggerRef} onClick={() => setOpen((v) => !v)}
        style={{ height: 38, padding: '0 32px 0 12px', border: '1.5px solid ' + (active ? '#5a58ff' : '#e1e1e3'), borderRadius: 8, ...TYPE.body, fontWeight: active ? 600 : 400, color: active ? TEXT.brandText : TEXT.metaGray, background: active ? '#eaeaff' : '#fff', cursor: 'pointer', outline: 'none', position: 'relative', textAlign: 'left' }}>
        {dateRangeLabel(value)}
        <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke={active ? '#5a58ff' : '#49494b'} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}><path d="M6 9l6 6 6-6" /></svg>
      </button>
      {open && pos && ReactDOM.createPortal(
        <div ref={dropdownRef} style={{ position: 'fixed', top: pos.top, left: pos.left, display: 'flex', flexDirection: 'column', background: '#fff', border: '1px solid #e1e1e3', borderRadius: 14, boxShadow: '0 4px 16px rgba(29,29,31,0.1)', zIndex: 200, overflow: 'hidden' }}>
        <div style={{ display: 'flex' }}>
          <div style={{ width: 160, borderRight: '1px solid #e8e8ea', padding: '8px 0', display: 'flex', flexDirection: 'column' }}>
            {DATE_PRESETS.map((p) => (
              <button key={p.key} onClick={() => pickPreset(p.key)}
                style={{ display: 'block', width: '100%', padding: '10px 16px', border: 'none', background: p.key === draftKey ? '#eaeaff' : 'transparent', ...TYPE.body, color: TEXT.primary, cursor: 'pointer', textAlign: 'left', whiteSpace: 'nowrap' }}
                onMouseEnter={(e) => { if (p.key !== draftKey) e.currentTarget.style.background = '#f9f9fa'; }}
                onMouseLeave={(e) => { if (p.key !== draftKey) e.currentTarget.style.background = 'transparent'; }}>
                {p.label}
              </button>
            ))}
          </div>
          <MonthCalendarGrid
            viewMonth={viewMonth}
            onPrevMonth={() => setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() - 1))}
            onNextMonth={() => setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1))}
            renderDay={(day, cellDate) => {
              const isStart = sameDay(cellDate, draftFrom);
              const isEnd = sameDay(cellDate, draftTo);
              const inRange = draftFrom && draftTo && cellDate > draftFrom && cellDate < draftTo;
              const isToday = sameDay(cellDate, _today);
              return (
                <button onClick={() => pickDay(day)}
                  style={{
                    height: 32, border: 'none', cursor: 'pointer', ...TYPE.body,
                    background: isStart || isEnd ? '#5a58ff' : inRange ? '#eaeaff' : 'transparent',
                    color: isStart || isEnd ? '#fff' : TEXT.primary,
                    borderRadius: isStart ? '50% 0 0 50%' : isEnd ? '0 50% 50% 0' : inRange ? 0 : '50%',
                    fontWeight: isToday ? 700 : 400,
                  }}>
                  {day}
                </button>
              );
            }}
          />
        </div>
        <div style={{ borderTop: '1px solid #e8e8ea', padding: 12 }}>
          <button onClick={apply}
            style={{ width: '100%', height: 44, borderRadius: 100, background: '#141415', border: 'none', ...TYPE.titleRow, color: TEXT.onDark, cursor: 'pointer' }}>
            Apply
          </button>
        </div>
        </div>,
        document.body
      )}
    </div>
  );
}

/* Single-date variant: labelled mm/dd/yyyy input that opens a MonthCalendarGrid. */
function DatePickerField({ label, defaultDate, onDirty }) {
  function parseAvailable(str) {
    if (!str) return new Date();
    const months = { Jan:1, Feb:2, Mar:3, Apr:4, May:5, Jun:6, Jul:7, Aug:8, Sep:9, Oct:10, Nov:11, Dec:12 };
    const [mon, day] = str.split(' ');
    const m = months[mon];
    if (!m) return new Date();
    const year = new Date().getFullYear();
    return new Date(year, m - 1, parseInt(day));
  }

  function formatDisplay(date) {
    if (!date) return '';
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    const y = date.getFullYear();
    return `${m}/${d}/${y}`;
  }

  const defaultDateObj = parseAvailable(defaultDate);
  const [selected, setSelected] = React.useState(defaultDateObj);
  const [viewMonth, setViewMonth] = React.useState(new Date(defaultDateObj));
  const [open, setOpen] = React.useState(false);
  const wrapRef = React.useRef(null);

  React.useEffect(() => {
    if (!open) return;
    function close(e) { if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false); }
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [open]);

  function pickDate(day) {
    const newDate = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), day);
    setSelected(newDate);
    setOpen(false);
    onDirty && onDirty();
  }

  return (
    <div ref={wrapRef} style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 6 }}>
      <span style={{ ...TYPE.titleRow }}>{label}</span>
      <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid #e1e1e3', borderRadius: 10, background: '#fff', padding: '0 12px', height: 40, cursor: 'pointer' }}
        onClick={() => setOpen(!open)}>
        <input type="text" placeholder="mm/dd/yyyy" value={formatDisplay(selected)} readOnly
          style={{ flex: 1, border: 'none', background: 'transparent', ...TYPE.body, color: TEXT.primary, outline: 'none', cursor: 'pointer', pointerEvents: 'none' }} />
        <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#9a9a9c" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
      </div>

      {open && (
        <div style={{ position: 'absolute', top: 'calc(100% + 8px)', left: 0, background: '#fff', border: '1px solid #e1e1e3', borderRadius: 14, boxShadow: '0 4px 16px rgba(29,29,31,0.1)', zIndex: 50, overflow: 'hidden' }}>
          <MonthCalendarGrid
            viewMonth={viewMonth}
            onPrevMonth={() => setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() - 1))}
            onNextMonth={() => setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1))}
            renderDay={(day, cellDate) => {
              const isSelected = sameDay(cellDate, selected);
              return (
                <button onClick={() => pickDate(day)}
                  style={{
                    height: 32, border: 'none', cursor: 'pointer', ...TYPE.body,
                    background: isSelected ? '#5a58ff' : 'transparent',
                    color: isSelected ? '#fff' : TEXT.primary,
                    borderRadius: '50%',
                  }}
                  onMouseEnter={(e) => { if (!isSelected) e.currentTarget.style.background = '#f4f4f6'; }}
                  onMouseLeave={(e) => { if (!isSelected) e.currentTarget.style.background = 'transparent'; }}>
                  {day}
                </button>
              );
            }}
          />
        </div>
      )}
    </div>
  );
}
