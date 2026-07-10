/* @ds-bundle: {"format":3,"namespace":"EverwayDesignSystem_3c5cdd","components":[],"sourceHashes":{"ui_kits/everway-platform/AppRail.jsx":"c749cf9d43f3","ui_kits/everway-platform/AppView.jsx":"0cb6b95e0fef","ui_kits/everway-platform/EverwayKit.jsx":"317f6c8050d6","ui_kits/everway-platform/LauncherHome.jsx":"c6f6d0411773","ui_kits/everway-platform/Login.jsx":"a667bbd7b1ba"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.EverwayDesignSystem_3c5cdd = window.EverwayDesignSystem_3c5cdd || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// ui_kits/everway-platform/AppRail.jsx
try { (() => {
/* AppRail — slim dark navigation rail (Everway Launcher) */
function RailButton({
  icon,
  active,
  label,
  onClick
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", {
    title: label,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      width: 48,
      height: 48,
      borderRadius: 14,
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: active ? '#323234' : hover ? '#262627' : 'transparent',
      color: active ? '#faf6f0' : '#9a9a9c',
      transition: 'background .12s, color .12s'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 22,
    sw: active ? 2.2 : 2
  }));
}
function AppRail({
  active = 'home',
  onNav = () => {}
}) {
  return /*#__PURE__*/React.createElement("nav", {
    style: {
      width: 80,
      background: '#141415',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px 0',
      flex: '0 0 auto',
      height: '100%',
      boxSizing: 'border-box'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => onNav('home'),
    title: "Everway home",
    style: {
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      marginBottom: 22,
      padding: 0
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "assets/everway-monogram-paper.svg",
    alt: "Everway",
    style: {
      width: 26,
      height: 34,
      objectFit: 'contain'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(RailButton, {
    icon: "home",
    label: "Home",
    active: active === 'home',
    onClick: () => onNav('home')
  }), /*#__PURE__*/React.createElement(RailButton, {
    icon: "apps",
    label: "My apps",
    active: active === 'apps',
    onClick: () => onNav('apps')
  }), /*#__PURE__*/React.createElement(RailButton, {
    icon: "folder",
    label: "Library",
    active: active === 'library',
    onClick: () => onNav('library')
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(RailButton, {
    icon: "grid9",
    label: "All apps",
    onClick: () => onNav('home')
  }), /*#__PURE__*/React.createElement(RailButton, {
    icon: "bell",
    label: "Notifications",
    onClick: () => {}
  }), /*#__PURE__*/React.createElement("button", {
    style: {
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      padding: 0,
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    initials: "K",
    size: 36
  }))));
}
Object.assign(window, {
  AppRail,
  RailButton
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/everway-platform/AppRail.jsx", error: String((e && e.message) || e) }); }

// ui_kits/everway-platform/AppView.jsx
try { (() => {
/* AppView — an opened Everway app (Unique Learning System dashboard) */

function StatCard({
  label,
  value,
  tone,
  foot
}) {
  return /*#__PURE__*/React.createElement(Card, {
    style: {
      padding: '18px 20px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--eds-body-sm)',
      color: '#6d6d6f'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--eds-display-sm)',
      fontSize: 38,
      color: '#1d1d1f',
      margin: '4px 0 6px'
    }
  }, value), /*#__PURE__*/React.createElement(Tag, {
    tone: tone,
    dot: true
  }, foot));
}
const STUDENTS = [{
  n: 'Aisha Khan',
  subj: 'Math',
  tone: 'purple',
  pct: 82,
  status: 'On track',
  st: 'success'
}, {
  n: 'Marcus Bell',
  subj: 'Reading',
  tone: 'blue',
  pct: 54,
  status: 'At risk',
  st: 'warning'
}, {
  n: 'Sofia Nguyen',
  subj: 'Science',
  tone: 'teal',
  pct: 91,
  status: 'On track',
  st: 'success'
}, {
  n: 'Liam Patel',
  subj: 'Reading',
  tone: 'blue',
  pct: 38,
  status: 'Behind',
  st: 'error'
}];
function StudentRow({
  s,
  last
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      padding: '14px 20px',
      borderBottom: last ? 'none' : '1px solid #ececef',
      background: hover ? '#f9f9fa' : 'transparent'
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    initials: s.n.split(' ').map(w => w[0]).join(''),
    size: 40
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: '0 0 180px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--eds-title-default)',
      color: '#1d1d1f'
    }
  }, s.n), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--eds-body-sm)',
      color: '#6d6d6f'
    }
  }, "Grade 4")), /*#__PURE__*/React.createElement(Tag, {
    tone: s.tone
  }, s.subj), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      maxWidth: 240
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 8,
      borderRadius: 99,
      background: '#ececef',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: s.pct + '%',
      height: '100%',
      background: '#5a58ff'
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--eds-title-sm)',
      color: '#49494b',
      width: 34
    }
  }, s.pct, "%")), /*#__PURE__*/React.createElement(Tag, {
    tone: s.st,
    dot: true
  }, s.status), /*#__PURE__*/React.createElement("button", {
    style: {
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      color: '#6d6d6f',
      padding: 4
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "more",
    size: 20
  })));
}
function Tabs({
  tabs,
  active,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 24,
      borderBottom: '1px solid #e1e1e3',
      padding: '0 32px'
    }
  }, tabs.map(t => /*#__PURE__*/React.createElement("button", {
    key: t,
    onClick: () => onChange(t),
    style: {
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      padding: '14px 0',
      font: active === t ? 'var(--eds-title-default-strong)' : 'var(--eds-title-default)',
      color: active === t ? '#1d1d1f' : '#6d6d6f',
      borderBottom: active === t ? '2px solid #5a58ff' : '2px solid transparent',
      marginBottom: -1
    }
  }, t)));
}
function AppView({
  onBack
}) {
  const [tab, setTab] = React.useState('Students');
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--eds-color-surface-secondary)',
      height: '100%',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      background: '#fff',
      borderBottom: '1px solid #e1e1e3',
      padding: '16px 32px',
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      flex: '0 0 auto'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onBack,
    style: {
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      color: '#1d1d1f',
      display: 'flex',
      alignItems: 'center',
      transform: 'rotate(180deg)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevronRight",
    size: 24
  })), /*#__PURE__*/React.createElement(ProductIcon, {
    id: "uls",
    size: 36
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--eds-title-lg)',
      color: '#1d1d1f'
    }
  }, "Unique Learning System"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--eds-body-sm)',
      color: '#6d6d6f'
    }
  }, "Room 12 \xB7 Grade 4")), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "md",
    leading: "search"
  }, "Find student"), /*#__PURE__*/React.createElement(Button, {
    variant: "brand",
    size: "md",
    leading: "plus"
  }, "New lesson")), /*#__PURE__*/React.createElement(Tabs, {
    tabs: ['Overview', 'Students', 'Lessons', 'Reports'],
    active: tab,
    onChange: setTab
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: '24px 32px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'flex-start',
      background: '#eaeaff',
      border: '1px solid #d1d0fb',
      borderRadius: 'var(--eds-radius-md)',
      padding: '14px 16px',
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "sparkles",
    size: 20,
    stroke: "#3d33cc"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      color: '#3d33cc'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--eds-title-default)'
    }
  }, "New this week"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--eds-body-sm)'
    }
  }, "Goal banks now suggest objectives aligned to each student's IEP."))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 18,
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement(StatCard, {
    label: "Active students",
    value: "24",
    tone: "success",
    foot: "All present"
  }), /*#__PURE__*/React.createElement(StatCard, {
    label: "Lessons this week",
    value: "18",
    tone: "brand",
    foot: "6 scheduled"
  }), /*#__PURE__*/React.createElement(StatCard, {
    label: "Goals on track",
    value: "71%",
    tone: "warning",
    foot: "3 at risk"
  })), /*#__PURE__*/React.createElement(Card, {
    style: {
      padding: 0,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '18px 20px',
      borderBottom: '1px solid #ececef'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--eds-title-xl)',
      color: '#1d1d1f'
    }
  }, "Your class"), /*#__PURE__*/React.createElement(Button, {
    variant: "tertiary",
    size: "sm",
    trailing: "chevronRight"
  }, "View all")), STUDENTS.map((s, i) => /*#__PURE__*/React.createElement(StudentRow, {
    key: i,
    s: s,
    last: i === STUDENTS.length - 1
  })))));
}
Object.assign(window, {
  AppView
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/everway-platform/AppView.jsx", error: String((e && e.message) || e) }); }

// ui_kits/everway-platform/EverwayKit.jsx
try { (() => {
/* EverwayKit — shared primitives for the Everway platform UI kit.
   Icons are Lucide (MIT) — the closest open match to Everway's
   Untitled-UI-style line set, which ships separately as
   @everway/design-system-icons. */

const EW_ICONS = {
  home: ['M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z', 'M9 22V12h6v10'],
  apps: ['rect:3,3,7,7,1', 'rect:14,3,7,7,1', 'rect:14,14,7,7,1', 'rect:3,14,7,7,1'],
  folder: ['M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z'],
  bell: ['M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9', 'M10.3 21a1.94 1.94 0 0 0 3.4 0'],
  search: ['circle:11,11,8', 'M21 21l-4.3-4.3'],
  arrowRight: ['M5 12h14', 'm12 5 7 7-7 7'],
  chevronRight: ['m9 18 6-6-6-6'],
  chevronDown: ['m6 9 6 6 6-6'],
  plus: ['M5 12h14', 'M12 5v14'],
  x: ['M18 6 6 18', 'M6 6l12 12'],
  check: ['M20 6 9 17l-5-5'],
  more: ['circle:12,12,1', 'circle:19,12,1', 'circle:5,12,1'],
  book: ['M12 7v14', 'M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z'],
  file: ['M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z', 'M14 2v5h5', 'M9 13h6', 'M9 17h4'],
  users: ['M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2', 'circle:9,7,4', 'M22 21v-2a4 4 0 0 0-3-3.87', 'M16 3.13a4 4 0 0 1 0 7.75'],
  calendar: ['rect:3,4,18,18,2', 'M16 2v4', 'M8 2v4', 'M3 10h18'],
  settings: ['M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z', 'circle:12,12,3'],
  grid9: ['circle:5,5,1', 'circle:12,5,1', 'circle:19,5,1', 'circle:5,12,1', 'circle:12,12,1', 'circle:19,12,1', 'circle:5,19,1', 'circle:12,19,1', 'circle:19,19,1'],
  sparkles: ['M9.94 14.66 12 21l2.06-6.34L20 12l-5.94-2.66L12 3l-2.06 6.34L4 12z'],
  target: ['circle:12,12,10', 'circle:12,12,6', 'circle:12,12,2']
};
function Icon({
  name,
  size = 20,
  stroke = 'currentColor',
  sw = 2,
  style
}) {
  const parts = EW_ICONS[name] || [];
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: stroke,
    strokeWidth: sw,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      flex: '0 0 auto',
      display: 'block',
      ...style
    }
  }, parts.map((p, i) => {
    if (p.startsWith('circle:')) {
      const [cx, cy, r] = p.slice(7).split(',');
      return /*#__PURE__*/React.createElement("circle", {
        key: i,
        cx: cx,
        cy: cy,
        r: r
      });
    }
    if (p.startsWith('rect:')) {
      const [x, y, w, h, rx] = p.slice(5).split(',');
      return /*#__PURE__*/React.createElement("rect", {
        key: i,
        x: x,
        y: y,
        width: w,
        height: h,
        rx: rx
      });
    }
    return /*#__PURE__*/React.createElement("path", {
      key: i,
      d: p
    });
  }));
}

/* ---- Button ---- */
function Button({
  variant = 'primary',
  size = 'lg',
  children,
  leading,
  trailing,
  onClick,
  style
}) {
  const h = {
    xl: 52,
    lg: 44,
    md: 36,
    sm: 32
  }[size];
  const pad = {
    xl: 24,
    lg: 20,
    md: 16,
    sm: 14
  }[size];
  const v = {
    primary: {
      background: '#141415',
      color: '#fff'
    },
    brand: {
      background: 'var(--eds-color-background-reserved-brand-default)',
      color: '#fff'
    },
    secondary: {
      background: '#fff',
      color: '#1d1d1f',
      border: '1.5px solid #323234'
    },
    tertiary: {
      background: 'transparent',
      color: '#1d1d1f'
    },
    destructive: {
      background: '#e0241a',
      color: '#fff'
    }
  }[variant];
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    className: "ew-btn",
    style: {
      font: 'var(--eds-title-default)',
      border: 'none',
      borderRadius: 'var(--eds-radius-pill)',
      height: h,
      padding: `0 ${pad}px`,
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      cursor: 'pointer',
      whiteSpace: 'nowrap',
      ...v,
      ...style
    }
  }, leading && /*#__PURE__*/React.createElement(Icon, {
    name: leading,
    size: size === 'sm' ? 16 : 18
  }), children, trailing && /*#__PURE__*/React.createElement(Icon, {
    name: trailing,
    size: size === 'sm' ? 16 : 18
  }));
}

/* ---- Tag ---- */
const TAG_COLORS = {
  brand: ['#eaeaff', '#3d33cc'],
  success: ['#e3fdea', '#016a36'],
  warning: ['#ffe9c7', '#ad4b00'],
  error: ['#ffe9e5', '#b20203'],
  default: ['#f4f4f6', '#49494b'],
  teal: ['#dafbf9', '#026663'],
  purple: ['#f4eaff', '#7135ac'],
  blue: ['#e6f7fe', '#006182']
};
function Tag({
  tone = 'default',
  dot,
  children
}) {
  const [bg, fg] = TAG_COLORS[tone] || TAG_COLORS.default;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--eds-title-sm)',
      background: bg,
      color: fg,
      borderRadius: 'var(--eds-radius-pill)',
      padding: '4px 12px',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6
    }
  }, dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: '50%',
      background: fg
    }
  }), children);
}

/* ---- Card ---- */
function Card({
  children,
  onClick,
  interactive,
  style
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      background: 'var(--eds-color-surface-primary)',
      border: '1px solid #e1e1e3',
      borderRadius: 'var(--eds-radius-md)',
      boxShadow: hover && interactive ? 'var(--eds-shadow-md)' : 'var(--eds-shadow-sm)',
      cursor: interactive ? 'pointer' : 'default',
      transition: 'box-shadow .15s, transform .15s',
      transform: hover && interactive ? 'translateY(-2px)' : 'none',
      ...style
    }
  }, children);
}

/* ---- Product icon (colored circle + brand glyph) ---- */
const PRODUCTS = {
  uls: {
    bg: '#ffffff',
    ring: true,
    src: 'assets/uls-orange.svg',
    name: 'Unique',
    sub: 'Learning System'
  },
  upar: {
    bg: '#3c9962',
    src: 'assets/upar.svg',
    name: 'uPar'
  },
  positivity: {
    bg: '#0dc5b6',
    src: 'assets/positivity.svg',
    name: 'Positivity'
  },
  news2you: {
    bg: '#2e90fa',
    src: 'assets/news2you.svg',
    name: 'News2you'
  },
  readwrite: {
    bg: '#7e22ce',
    src: 'assets/readwrite.svg',
    name: 'Read&Write'
  }
};
function ProductIcon({
  id,
  size = 40
}) {
  const p = PRODUCTS[id];
  if (!p) return null;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      width: size,
      height: size,
      borderRadius: '50%',
      background: p.bg,
      border: p.ring ? '1px solid #ececef' : 'none',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flex: '0 0 auto'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: p.src,
    alt: "",
    style: {
      width: size * 0.52,
      height: size * 0.52,
      objectFit: 'contain'
    }
  }));
}

/* ---- Gradient brand badge / avatar ring ---- */
function GradientCircle({
  size = 48,
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      width: size,
      height: size,
      borderRadius: '50%',
      background: 'var(--eds-brand-gradient)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flex: '0 0 auto',
      ...style
    }
  }, children);
}
function Avatar({
  initials = 'K',
  size = 36
}) {
  return /*#__PURE__*/React.createElement(GradientCircle, {
    size: size
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: size - 6,
      height: size - 6,
      borderRadius: '50%',
      background: '#1d1d1f',
      color: '#faf6f0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      font: 'var(--eds-title-sm)',
      fontSize: size * 0.34
    }
  }, initials));
}
Object.assign(window, {
  Icon,
  Button,
  Tag,
  Card,
  ProductIcon,
  GradientCircle,
  Avatar,
  PRODUCTS,
  EW_ICONS
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/everway-platform/EverwayKit.jsx", error: String((e && e.message) || e) }); }

// ui_kits/everway-platform/LauncherHome.jsx
try { (() => {
/* LauncherHome — Everway "Welcome" home screen */

function ProductBadge({
  app,
  size = 40
}) {
  if (app.id) return /*#__PURE__*/React.createElement(ProductIcon, {
    id: app.id,
    size: size
  });
  return /*#__PURE__*/React.createElement("span", {
    style: {
      width: size,
      height: size,
      borderRadius: '50%',
      background: app.bg,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flex: '0 0 auto'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: app.icon,
    size: size * 0.5,
    stroke: app.fg || '#fff'
  }));
}
function AppCard({
  app,
  onOpen
}) {
  return /*#__PURE__*/React.createElement(Card, {
    interactive: true,
    onClick: () => onOpen(app),
    style: {
      padding: '20px 22px',
      display: 'flex',
      flexDirection: 'column',
      minHeight: 188
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement(ProductBadge, {
    app: app,
    size: 40
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      lineHeight: 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--eds-title-xl)',
      color: '#1d1d1f'
    }
  }, app.name), app.sub && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--eds-body-sm)',
      fontSize: 11,
      color: '#6d6d6f',
      marginTop: 2
    }
  }, app.sub))), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--eds-body-default)',
      color: '#49494b',
      margin: 0,
      flex: 1
    }
  }, app.desc), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      marginTop: 16,
      font: 'var(--eds-title-default-strong)',
      color: '#1d1d1f'
    }
  }, "Open ", /*#__PURE__*/React.createElement(Icon, {
    name: "arrowRight",
    size: 18
  })));
}
const APPS = [{
  id: 'uls',
  name: 'Unique',
  sub: 'Learning System',
  desc: 'Supporting teaching in the classroom, lesson planning, creation and student progress monitoring.',
  open: 'uls'
}, {
  name: 'Polaris',
  bg: '#1d1d1f',
  icon: 'sparkles',
  desc: 'Collaborative IEP solution to support compliance and student success.'
}, {
  id: 'upar',
  name: 'uPar',
  desc: 'Universal literacy screener to identify students who may need reading accommodations.'
}, {
  name: 'Embrace',
  bg: '#3c9962',
  icon: 'users',
  desc: 'IEP software for special education tracking and reporting.'
}];
const SUBS = [{
  id: 'news2you',
  name: 'News2you',
  desc: 'Weekly differentiated current-events newspaper designed to boost literacy and learning.'
}, {
  name: 'Symbolstix',
  sub: 'Prime',
  bg: '#2e90fa',
  icon: 'book',
  desc: 'Symbol-based communication tool for learning and language.'
}, {
  name: 'L³ Skills',
  bg: '#7e22ce',
  icon: 'target',
  desc: 'Interactive educational games that build both academic and life skills.'
}, {
  id: 'positivity',
  name: 'Positivity',
  desc: 'Support positive behavior and self-regulation in the classroom with executive-function tools.'
}];
function SectionGrid({
  title,
  apps,
  onOpen
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      marginTop: 40
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      font: 'var(--eds-title-xl)',
      color: '#1d1d1f',
      margin: '0 0 16px'
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(258px, 1fr))',
      gap: 20
    }
  }, apps.map((a, i) => /*#__PURE__*/React.createElement(AppCard, {
    key: i,
    app: a,
    onOpen: onOpen
  }))));
}
function SearchBar() {
  const [v, setV] = React.useState('');
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      background: '#fff',
      border: '1px solid #e1e1e3',
      borderRadius: 'var(--eds-radius-pill)',
      padding: '0 18px',
      height: 48,
      width: 360,
      boxShadow: 'var(--eds-shadow-xs)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    size: 20,
    stroke: "#6d6d6f"
  }), /*#__PURE__*/React.createElement("input", {
    value: v,
    onChange: e => setV(e.target.value),
    placeholder: "Search Everway\u2026",
    style: {
      border: 'none',
      outline: 'none',
      background: 'transparent',
      flex: 1,
      font: 'var(--eds-body-default)',
      color: '#1d1d1f'
    }
  }));
}
function LauncherHome({
  onOpen
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto',
      background: 'var(--eds-color-surface-paper-primary)',
      height: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1180,
      margin: '0 auto',
      padding: '32px 48px 64px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'flex-end',
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement(SearchBar, null)), /*#__PURE__*/React.createElement("h1", {
    style: {
      font: 'var(--eds-display-sm)',
      color: '#1d1d1f',
      margin: '8px 0 28px'
    }
  }, "Welcome, Kelly"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 56
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(GradientCircle, {
    size: 48
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "book",
    size: 22,
    stroke: "#1d1d1f"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--eds-body-sm)',
      color: '#6d6d6f'
    }
  }, "Plan"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--eds-title-lg)',
      color: '#1d1d1f'
    }
  }, "Everway Education"))), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--eds-body-sm)',
      color: '#6d6d6f'
    }
  }, "Role"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--eds-title-lg)',
      color: '#1d1d1f'
    }
  }, "SPED Teacher"))), /*#__PURE__*/React.createElement(SectionGrid, {
    title: "Your apps",
    apps: APPS,
    onOpen: onOpen
  }), /*#__PURE__*/React.createElement(SectionGrid, {
    title: "Your content subscriptions",
    apps: SUBS,
    onOpen: onOpen
  })));
}
Object.assign(window, {
  LauncherHome,
  APPS,
  SUBS,
  ProductBadge
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/everway-platform/LauncherHome.jsx", error: String((e && e.message) || e) }); }

// ui_kits/everway-platform/Login.jsx
try { (() => {
/* Login — Everway sign-in */
function Field({
  label,
  type = 'text',
  value,
  onChange,
  placeholder
}) {
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'block',
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--eds-title-sm)',
      color: '#1d1d1f',
      display: 'block',
      marginBottom: 6
    }
  }, label), /*#__PURE__*/React.createElement("input", {
    type: type,
    value: value,
    placeholder: placeholder,
    onChange: e => onChange(e.target.value),
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      width: '100%',
      boxSizing: 'border-box',
      height: 48,
      padding: '0 14px',
      font: 'var(--eds-body-default)',
      color: '#1d1d1f',
      background: '#fff',
      border: `${focus ? 2 : 1}px solid ${focus ? '#5a58ff' : '#939395'}`,
      borderRadius: 'var(--eds-radius-sm)',
      outline: 'none'
    }
  }));
}
function Login({
  onSignIn
}) {
  const [email, setEmail] = React.useState('kelly.andersen@school.org');
  const [pw, setPw] = React.useState('••••••••••');
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--eds-color-surface-paper-primary)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 400
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      justifyContent: 'center',
      marginBottom: 28
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "assets/everway-monogram-ink.svg",
    alt: "",
    style: {
      width: 30,
      height: 38
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--eds-font-family-wordmark)',
      fontWeight: 500,
      fontSize: 34,
      color: '#1d1d1f'
    }
  }, "Everway")), /*#__PURE__*/React.createElement(Card, {
    style: {
      padding: 32
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      font: 'var(--eds-headline-sm)',
      color: '#1d1d1f',
      margin: '0 0 4px'
    }
  }, "Sign in"), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--eds-body-default)',
      color: '#6d6d6f',
      margin: '0 0 24px'
    }
  }, "Welcome back. Pick up where you left off."), /*#__PURE__*/React.createElement(Field, {
    label: "Email",
    value: email,
    onChange: setEmail
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Password",
    type: "password",
    value: pw,
    onChange: setPw
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'flex-end',
      margin: '4px 0 22px'
    }
  }, /*#__PURE__*/React.createElement("a", {
    style: {
      font: 'var(--eds-title-sm)',
      color: '#4c42e4',
      textDecoration: 'none',
      cursor: 'pointer'
    }
  }, "Forgot password?")), /*#__PURE__*/React.createElement(Button, {
    variant: "brand",
    size: "lg",
    style: {
      width: '100%',
      justifyContent: 'center'
    },
    onClick: onSignIn
  }, "Sign in")), /*#__PURE__*/React.createElement("p", {
    style: {
      textAlign: 'center',
      font: 'var(--eds-body-sm)',
      color: '#6d6d6f',
      marginTop: 20
    }
  }, "New to Everway? ", /*#__PURE__*/React.createElement("a", {
    style: {
      color: '#4c42e4',
      textDecoration: 'none',
      cursor: 'pointer'
    }
  }, "Contact your administrator"))));
}
Object.assign(window, {
  Login
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/everway-platform/Login.jsx", error: String((e && e.message) || e) }); }

})();
