/* rr-kit.jsx — Shared primitives, nav rail, and browser chrome for Roster Run hi-fi */

// ─── Accent palette ──────────────────────────────────────────────────────────
const ACCENT_COLORS = {
  teal: { bg: '#dafbf9', fg: '#026663' },
  blue: { bg: '#e6f7fe', fg: '#006182' },
  purple: { bg: '#f4eaff', fg: '#7135ac' },
  yellow: { bg: '#fef3c7', fg: '#92400e' },
  pink: { bg: '#ffe8f1', fg: '#c20651' },
  lime: { bg: '#e7fbda', fg: '#3a6900' }
};

// ─── Icon ────────────────────────────────────────────────────────────────────
const RR_PATHS = {
  home: ['M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z', 'M9 22V12h6v10'],
  apps: ['M5 3h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z', 'M15 3h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z', 'M5 13h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2z', 'M15 13h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2z'],
  users: ['M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2', 'C9,7,4', 'M22 21v-2a4 4 0 0 0-3-3.87', 'M16 3.13a4 4 0 0 1 0 7.75'],
  folder: ['M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z'],
  book: ['M4 19.5A2.5 2.5 0 0 1 6.5 17H20', 'M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z'],
  chart: ['M18 20V10', 'M12 20V4', 'M6 20v-6'],
  bell: ['M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9', 'M10.3 21a1.94 1.94 0 0 0 3.4 0'],
  grid9: ['C5,5,1', 'C12,5,1', 'C19,5,1', 'C5,12,1', 'C12,12,1', 'C19,12,1', 'C5,19,1', 'C12,19,1', 'C19,19,1'],
  chevRight: ['m9 18 6-6-6-6'],
  chevLeft: ['m15 18-6-6 6-6'],
  search: ['C11,11,8', 'M21 21l-4.3-4.3'],
  check: ['M20 6 9 17l-5-5'],
  plus: ['M5 12h14', 'M12 5v14'],
  pen: ['M12 20h9', 'M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z'],
  x: ['M18 6 6 18', 'M6 6l12 12'],
  arrowLeft: ['M19 12H5', 'm12 19-7-7 7-7'],
  settings: ['M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z', 'C12,12,3']
};

function RRIcon({ name, size = 20, color = 'currentColor', sw = 2 }) {
  const parts = RR_PATHS[name] || [];
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"
    style={{ flex: '0 0 auto', display: 'block' }}>
      {parts.map((p, i) => {
        if (p.startsWith('C')) {
          const [cx, cy, r] = p.slice(1).split(',');
          return <circle key={i} cx={cx} cy={cy} r={r} />;
        }
        return <path key={i} d={p} />;
      })}
    </svg>);

}

// ─── Avatar ──────────────────────────────────────────────────────────────────
function RRAvatar({ initials = '?', accent = 'blue', size = 36 }) {
  const c = ACCENT_COLORS[accent] || ACCENT_COLORS.blue;
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%', flexShrink: 0,
      background: c.bg, color: c.fg,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: Math.round(size * 0.36), fontWeight: 700, lineHeight: 1
    }}>{initials}</div>);

}

// ─── Button ──────────────────────────────────────────────────────────────────
function RRButton({ variant = 'primary', size = 'md', children, leading, onClick, style }) {
  const [hov, setHov] = React.useState(false);
  const h = { lg: 44, md: 36, sm: 32 }[size] || 36;
  const p = { lg: 20, md: 16, sm: 14 }[size] || 16;
  const iSz = size === 'lg' ? 18 : 16;
  const v = {
    primary: { bg: hov ? '#262627' : '#141415', color: '#fff', border: 'none' },
    brand: { bg: hov ? '#4c42e4' : '#5a58ff', color: '#fff', border: 'none' },
    secondary: { bg: hov ? '#f4f4f6' : '#fff', color: '#1d1d1f', border: '1.5px solid #323234' },
    ghost: { bg: hov ? '#f4f4f6' : 'transparent', color: '#1d1d1f', border: '1.5px solid #e1e1e3' }
  }[variant] || {};
  return (
    <button onClick={onClick}
    onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
    style={{
      height: h, padding: `0 ${p}px`,
      background: v.bg, color: v.color, border: v.border || 'none',
      borderRadius: 112,
      font: `600 16px/1.5 var(--eds-font-family, 'Figtree', sans-serif)`,
      display: 'inline-flex', alignItems: 'center', gap: 6,
      cursor: 'pointer', whiteSpace: 'nowrap', transition: 'background .12s',

      ...style, fontSize: "14px", letterSpacing: "0px"
    }}>
      {leading && <RRIcon name={leading} size={iSz} />}
      {children}
    </button>);

}

// ─── Tag ─────────────────────────────────────────────────────────────────────
const RR_TAG_COLORS = {
  default: ['#f4f4f6', '#49494b'], success: ['#e3fdea', '#016a36'],
  warning: ['#ffe9c7', '#ad4b00'], error: ['#ffe9e5', '#b20203'],
  brand: ['#eaeaff', '#3d33cc'], teal: ['#dafbf9', '#026663'],
  purple: ['#f4eaff', '#7135ac'], blue: ['#e6f7fe', '#006182']
};
function RRTag({ tone = 'default', dot, children }) {
  const [bg, fg] = RR_TAG_COLORS[tone] || RR_TAG_COLORS.default;
  return (
    <span style={{
      background: bg, color: fg, borderRadius: 112,
      font: `600 13px/1.43 var(--eds-font-family, 'Figtree', sans-serif)`,
      padding: '3px 10px', letterSpacing: '0.02em',
      display: 'inline-flex', alignItems: 'center', gap: 5, whiteSpace: 'nowrap'
    }}>
      {dot && <span style={{ width: 6, height: 6, borderRadius: '50%', background: fg, flexShrink: 0 }} />}
      {children}
    </span>);

}

// ─── Progress bar ─────────────────────────────────────────────────────────────
function RRProgressBar({ done, total, style }) {
  const pct = total > 0 ? Math.round(done / total * 100) : 0;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, ...style }}>
      <div style={{ flex: 1, height: 6, borderRadius: 99, background: '#e1e1e3', overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: '#5a58ff', transition: 'width .3s' }} />
      </div>
      <span style={{ fontSize: 13, fontWeight: 600, color: '#6d6d6f', flexShrink: 0 }}>
        {done}/{total}
      </span>
    </div>);

}

// ─── Nav Rail (64px — matches screenshot exactly) ────────────────────────────
function RRNavBtn({ icon, label, active, onClick }) {
  const [hov, setHov] = React.useState(false);
  return (
    <button title={label} onClick={onClick}
    onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
    style={{
      width: 44, height: 44, borderRadius: 10, border: 'none',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: active ? 'rgba(255,255,255,0.1)' : hov ? 'rgba(255,255,255,0.05)' : 'transparent',
      color: active ? '#ffffff' : '#707078',
      cursor: 'pointer', position: 'relative', transition: 'background .12s, color .12s'
    }}>
      {active &&
      <span style={{
        position: 'absolute', left: -10, top: '50%', transform: 'translateY(-50%)',
        width: 3, height: 22, borderRadius: '0 99px 99px 0',
        background: 'linear-gradient(180deg, #ffd970 0%, #5a58ff 100%)'
      }} />
      }
      <RRIcon name={icon} size={20} sw={active ? 2 : 1.8} />
    </button>);

}

function RRAppRail({ active = 'users' }) {
  return (
    <nav style={{
      width: 64, background: '#1a1a1c', flexShrink: 0,
      display: 'flex', flexDirection: 'column', alignItems: 'center'
    }}>
      {/* Hamburger — same height as top bar */}
      <div style={{
        height: 60, width: '100%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0
      }}>
        <button style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 8, display: 'flex', flexDirection: 'column', gap: 5 }}>
          {[0, 1, 2].map((i) =>
          <div key={i} style={{ width: 18, height: 2, background: '#808088', borderRadius: 1 }} />
          )}
        </button>
      </div>

      {/* Nav icons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center', padding: '8px 0' }}>
        <RRNavBtn icon="book" label="Library" active={false} onClick={() => {}} />
        <RRNavBtn icon="users" label="Students" active={active === 'users'} onClick={() => {}} />
      </div>

      <div style={{ flex: 1 }} />

      {/* P avatar with gradient ring */}
      <div style={{ marginBottom: 18 }}>
        <div style={{
          width: 36, height: 36, borderRadius: '50%',
          padding: 2, cursor: 'pointer',
          background: 'linear-gradient(135deg, #ff6b6b 0%, #ffd970 25%, #3c9962 60%, #5a58ff 100%)'
        }}>
          <div style={{
            width: '100%', height: '100%', borderRadius: '50%',
            background: '#2e2e32',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 13, fontWeight: 700, color: '#fff'
          }}>P</div>
        </div>
      </div>
    </nav>);

}

// ─── Chrome tab SVG shape (exact Figma path) ─────────────────────────────────
const CHROME_TAB_PATH = "M 256 34 L 0 34 C 4.4 34 8 30.4 8 26 L 8 8 C 8 3.6 11.6 0 16 0 L 240 0 C 244.4 0 248 3.6 248 8 L 248 26 C 248 30.4 251.6 34 256 34 Z";

function ChromeTab({ label, faviconColor = '#5a58ff', active = false, showClose = true }) {
  return (
    <div style={{ position: 'relative', width: 256, height: 34, flexShrink: 0 }}>
      <svg width={256} height={34} viewBox="0 0 256 34" style={{ position: 'absolute', left: 0, top: 0 }}>
        <path d={CHROME_TAB_PATH} fill={active ? '#ffffff' : 'rgb(218,221,227)'}
        style={{ filter: active ? 'none' : 'brightness(0.97)' }} />
      </svg>
      <div style={{
        position: 'absolute', left: 16, top: 0, right: 16,
        height: 34, display: 'flex', alignItems: 'center', gap: 8
      }}>
        {/* Favicon */}
        <div style={{
          width: 14, height: 14, borderRadius: 3, flexShrink: 0,
          background: faviconColor, display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <img src="assets/everway-monogram-paper.svg" alt=""
          style={{ width: 9, height: 11, objectFit: 'contain', display: 'block' }} />
        </div>
        <span style={{
          flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          fontSize: 12, fontWeight: 500, color: active ? '#1d1d1f' : '#6d6d6f',
          fontFamily: "'Figtree', sans-serif"
        }}>{label}</span>
        {showClose &&
        <div style={{
          width: 16, height: 16, borderRadius: '50%', flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#6d6d6f'
        }}>
            <svg width={10} height={10} viewBox="0 0 10 10" fill="none"
          stroke="currentColor" strokeWidth={1.5} strokeLinecap="round">
              <path d="M2 2l6 6M8 2l-6 6" />
            </svg>
          </div>
        }
      </div>
    </div>);

}

// ─── macOS Chrome browser wrapper ────────────────────────────────────────────
function ChromeWrapper({ children }) {
  return (
    <div style={{
      width: 1512, height: 883,
      borderRadius: 12, overflow: 'hidden',
      boxShadow: '0 40px 120px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.08)',
      display: 'flex', flexDirection: 'column'
    }}>
      {/* ── Browser chrome (79px) ─────────────────────────── */}
      <div style={{ height: 79, flexShrink: 0, display: 'flex', flexDirection: 'column' }}>

        {/* Tab bar (41px) */}
        <div style={{
          height: 41, background: 'rgb(222,225,230)',
          display: 'flex', alignItems: 'flex-end', paddingLeft: 0, paddingRight: 12,
          userSelect: 'none'
        }}>
          {/* macOS traffic lights */}
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', padding: '0 12px 8px 14px', flexShrink: 0 }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f57', boxShadow: 'inset 0 0.5px 0.5px rgba(255,255,255,0.3)' }} />
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ffbd44', boxShadow: 'inset 0 0.5px 0.5px rgba(255,255,255,0.3)' }} />
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#28ca41', boxShadow: 'inset 0 0.5px 0.5px rgba(255,255,255,0.3)' }} />
          </div>

          {/* Back/forward */}
          <div style={{ display: 'flex', gap: 2, padding: '0 6px 6px', alignItems: 'flex-end', flexShrink: 0 }}>
            {['m8 15-5-5 5-5', 'm16 9 5 5-5 5'].map((d, i) =>
            <div key={i} style={{ width: 28, height: 28, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'default' }}>
                <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#4a4a4c" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                  <path d={d} />
                </svg>
              </div>
            )}
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 0, flex: 1, overflow: 'hidden' }}>
            <ChromeTab label="Everway" active faviconColor="#141415" />
            <ChromeTab label="Instructing Platform" faviconColor="#ff760f" />
          </div>

          {/* New tab */}
          <div style={{ padding: '0 4px 8px', flexShrink: 0, color: '#6d6d6f' }}>
            <div style={{ width: 28, height: 28, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'default' }}>
              <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                <path d="M5 12h14M12 5v14" />
              </svg>
            </div>
          </div>
        </div>

        {/* Address bar (38px) */}
        <div style={{
          height: 38, background: '#ffffff',
          borderBottom: '1px solid #e0e3e8',
          display: 'flex', alignItems: 'center', padding: '0 14px', gap: 8,
          userSelect: 'none'
        }}>
          {/* Refresh */}
          <div style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6d6d6f', cursor: 'default', flexShrink: 0 }}>
            <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
          </div>

          {/* URL field */}
          <div style={{
            flex: 1, height: 26, borderRadius: 13,
            background: '#f1f3f4', display: 'flex', alignItems: 'center',
            padding: '0 12px', gap: 6, maxWidth: 680, margin: '0 auto'
          }}>
            {/* Google G */}
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            <span style={{
              fontSize: 12, color: '#3c4043', fontFamily: "'Figtree', sans-serif",
              fontWeight: 400, letterSpacing: 0
            }}>www.everway.com/member123/students</span>
            {/* Star */}
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#6d6d6f" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 'auto', flexShrink: 0 }}>
              <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
            </svg>
          </div>

          {/* Right icons */}
          <div style={{ display: 'flex', gap: 2, marginLeft: 'auto', alignItems: 'center', flexShrink: 0 }}>
            {/* Extensions placeholder */}
            <div style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6d6d6f', cursor: 'default' }}>
              <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor">
                <path d="M10.5 4.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v.6l.71-.41c.72-.41 1.64-.17 2.05.55s.17 1.64-.55 2.05l-.71.41h.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-.5l.71.41c.72.41.96 1.33.55 2.05s-1.33.96-2.05.55l-.71-.41v.5c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5v-.5l-.71.41c-.72.41-1.64.17-2.05-.55s-.17-1.64.55-2.05l.71-.41h-.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5h.5l-.71-.41c-.72-.41-.96-1.33-.55-2.05s1.33-.96 2.05-.55l.71.41v-.6z" opacity=".4" />
              </svg>
            </div>
            {/* User avatar */}
            <div style={{
              width: 26, height: 26, borderRadius: '50%', overflow: 'hidden', cursor: 'default',
              background: 'linear-gradient(135deg, #ffd970, #5a58ff)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 11, fontWeight: 700, color: '#fff',
              fontFamily: "'Figtree', sans-serif"
            }}>P</div>
            {/* Menu */}
            <div style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6d6d6f', cursor: 'default', flexDirection: 'column', gap: 3 }}>
              {[0, 1, 2].map((i) => <div key={i} style={{ width: 3, height: 3, borderRadius: '50%', background: 'currentColor' }} />)}
            </div>
          </div>
        </div>
      </div>

      {/* ── App content (804px) ───────────────────────────── */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {children}
      </div>
    </div>);

}

// ─── Scaled viewport ─────────────────────────────────────────────────────────
function ScaledFrame({ children }) {
  const [state, setState] = React.useState({ scale: 1, x: 0, y: 0 });
  React.useEffect(() => {
    function update() {
      const scale = Math.min(window.innerWidth / 1512, window.innerHeight / 883);
      setState({
        scale,
        x: Math.max(0, (window.innerWidth - 1512 * scale) / 2),
        y: Math.max(0, (window.innerHeight - 883 * scale) / 2)
      });
    }
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#0e0e0f', overflow: 'hidden', position: 'relative' }}>
      <div style={{
        position: 'absolute',
        left: state.x, top: state.y,
        width: 1512, height: 883,
        transformOrigin: 'top left',
        transform: `scale(${state.scale})`
      }}>
        {children}
      </div>
    </div>);

}

Object.assign(window, {
  ACCENT_COLORS, RR_TAG_COLORS,
  RRIcon, RRAvatar, RRButton, RRTag, RRProgressBar,
  RRNavBtn, RRAppRail,
  ChromeTab, ChromeWrapper, ScaledFrame
});