// student-banding-atoms.jsx
// Data, banding logic, and atom-level components
// Exported to window for use by the main app script

const { useState } = React;

/* ─────────── DATA ─────────── */
const ASSIGNMENTS = [
  { id:1,  type:'lesson',   subject:'Math', unit:'K. Unit 1.', name:'Lesson name',              level:1, date:'Due Today',      status:'inprogress', score:null },
  { id:2,  type:'assign',   subject:'ELA',  unit:'K. Unit 1.', name:'Assignment name',           level:1, date:'Due Today',      status:'notstarted', score:null },
  { id:3,  type:'reading',  subject:'ELA',  unit:'K. Unit 1.', name:'Assignment name',           level:2, date:'Due Feb 18',     status:'inprogress', score:null },
  { id:4,  type:'assign',   subject:'Math', unit:'K. Unit 1.', name:'Assignment name',           level:1, date:'Due Feb 19',     status:'notstarted', score:null },
  { id:5,  type:'assign',   subject:'Math', unit:'K. Unit 1.', name:'Assignment name',           level:2, date:'Due Jan 10',     status:'inprogress', score:null },
  { id:6,  type:'assign',   subject:'Math', unit:'K. Unit 1.', name:'Assignment name',           level:1, date:'Due Jun 30',     status:'inprogress', score:null },
  { id:7,  type:'lesson',   subject:'Math', unit:'K. Unit 1.', name:'Counting & Numbers to 10', level:1, date:'Jan 5, 2026',    status:'complete',   score:50  },
  { id:8,  type:'assign',   subject:'Math', unit:'K. Unit 1.', name:'Assignment name',           level:1, date:'Nov 1, 2025',    status:'complete',   score:100 },
  { id:9,  type:'reading',  subject:'ELA',  unit:'K. Unit 1.', name:'Phonics & Word Study',      level:2, date:'Oct 15, 2025',   status:'complete',   score:72  },
  { id:10, type:'activity', subject:'Math', unit:'K. Unit 1.', name:'Number Sense',              level:1, date:'Sep 20, 2025',   status:'complete',   score:28  },
  { id:11, type:'lesson',   subject:'Math', unit:'K. Unit 1.', name:'Shapes & Patterns',         level:1, date:'Aug 10, 2025',   status:'complete',   score:88  },
];

/* ─────────── BANDING LOGIC ─────────── */
function getBand(subject, pct) {
  if (pct === null || pct === undefined) return null;
  const profThreshold = subject === 'ELA' ? 85 : 80;
  if (pct >= profThreshold) return 'proficient';
  if (pct >= 55)            return 'instructional';
  if (pct >= 33)            return 'emerging';
  return 'preEmerging';
}

const BAND = {
  proficient:   { label:'Proficient',   bg:'#e8fef0', fg:'#016a36', bar:'#018143', border:'#b7f5cc' },
  instructional:{ label:'Instructional',bg:'#e8f4fd', fg:'#00547f', bar:'#0375a0', border:'#b3d9f0' },
  emerging:     { label:'Emerging',     bg:'#fff7ed', fg:'#9a3412', bar:'#d15e00', border:'#fed7aa' },
  preEmerging:  { label:'Pre-emerging', bg:'#fff1f0', fg:'#b20203', bar:'#dc2626', border:'#fecaca' },
};

const BAND_STEP = {
  proficient:   (level) => level >= 3 ? 'Move to next skill' : 'Move to next skill or advance level',
  instructional:()      => 'Continue at current level',
  emerging:     ()      => 'Use reteach ideas',
  preEmerging:  ()      => 'Teach prerequisite skills',
};

const BAND_FULL = {
  proficient:   (level) => level >= 3
    ? 'Level 3 → move to next skill. Level 1–2 → move to next skill at same level, or move student up a level.'
    : 'Move to next skill at same level, or consider moving the student up to the next level.',
  instructional:() => 'Continue at current level with routine instruction and practice.',
  emerging:     () => 'Use lesson reteach ideas; consider moving to a more supported level.',
  preEmerging:  () => 'Teach prerequisite skills before continuing this skill.',
};

const BAND_THRESHOLD = {
  proficient:   { Math:'80–100%', ELA:'85–100%' },
  instructional:{ Math:'55–79%',  ELA:'55–84%'  },
  emerging:     { Math:'33–54%',  ELA:'33–54%'  },
  preEmerging:  { Math:'0–32%',   ELA:'0–32%'   },
};

/* ─────────── SVG ICON HELPER ─────────── */
const PATHS = {
  chevLeft:  ['M15 18l-6-6 6-6'],
  chevDown:  ['M6 9l6 6 6-6'],
  sort:      ['M7 15l5 5 5-5','M7 9l5-5 5 5'],
  check:     ['M20 6 9 17l-5-5'],
  refresh:   ['M21 12a9 9 0 1 1-6.22-8.56'],
  clock:     ['M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z','M12 6v6l4 2'],
  close:     ['M18 6 6 18','M6 6l12 12'],
  arrowR:    ['M5 12h14','M12 5l7 7-7 7'],
  pencil:    ['M12 20h9','M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z'],
  bars:      ['M18 20V10','M12 20V4','M6 20v-6'],
  users:     ['M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2','M22 21v-2a4 4 0 0 0-3-3.87'],
  home:      ['M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z','M9 22V12h6v10'],
  book:      ['M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z','M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z'],
  file:      ['M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z','M14 2v6h6','M9 13h6','M9 17h4'],
  calendar:  ['M3 4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H3z','M16 2v4','M8 2v4','M3 10h18'],
  folder:    ['M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z'],
  userCircle:['M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z','M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z'],
};

function Ico({ n, size=16, stroke='currentColor', sw=2, fill='none', style={} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke}
      strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"
      style={{ flexShrink:0, display:'block', ...style }}>
      {(PATHS[n]||[]).map((d,i) => <path key={i} d={d} />)}
    </svg>
  );
}

/* ─────────── TYPE ICON ─────────── */
const TYPE_CFG = {
  lesson:  { bg:'#dcfce7', stroke:'#16a34a', ps:['M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z','M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z'] },
  assign:  { bg:'#fef9c3', stroke:'#a16207', ps:['M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z','M14 2v6h6','M9 13h6','M9 17h4'] },
  reading: { bg:'#ede9fe', stroke:'#7c3aed', ps:['M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z','M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z'] },
  activity:{ bg:'#dbeafe', stroke:'#1d4ed8', ps:['M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z','M9 22V12h6v10'] },
};
function TypeIco({ type='assign' }) {
  const c = TYPE_CFG[type] || TYPE_CFG.assign;
  return (
    <span style={{ width:28, height:28, borderRadius:7, background:c.bg, flexShrink:0,
      display:'flex', alignItems:'center', justifyContent:'center' }}>
      <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke={c.stroke}
        strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        {c.ps.map((d,i) => <path key={i} d={d} />)}
      </svg>
    </span>
  );
}

/* ─────────── STATUS PILL ─────────── */
const STS = {
  complete:  { bg:'#e8fef0', fg:'#016a36', label:'Complete',    icon:'check'   },
  inprogress:{ bg:'#e8f4fd', fg:'#00547f', label:'In Progress', icon:'refresh' },
  notstarted:{ bg:'#fff7ed', fg:'#9a3412', label:'Not Started', icon:'clock'   },
};
function StatusPill({ status }) {
  const s = STS[status] || STS.notstarted;
  return (
    <span style={{ display:'inline-flex', alignItems:'center', gap:5,
      background:s.bg, color:s.fg, borderRadius:100, padding:'4px 11px',
      fontSize:12.5, fontWeight:600, whiteSpace:'nowrap' }}>
      <Ico n={s.icon} size={11} stroke="currentColor" sw={2.5} />
      {s.label}
    </span>
  );
}

/* ─────────── BAND PILL ─────────── */
function BandPill({ band, sm=true }) {
  if (!band) return null;
  const b = BAND[band];
  return (
    <span style={{ display:'inline-flex', alignItems:'center', gap:5,
      background:b.bg, color:b.fg, borderRadius:100,
      padding: sm ? '3px 10px' : '5px 14px',
      fontSize: sm ? 12.5 : 14, fontWeight:600, whiteSpace:'nowrap' }}>
      <span style={{ width:6, height:6, borderRadius:'50%', background:b.bar, flexShrink:0 }} />
      {b.label}
    </span>
  );
}

/* ─────────── SCORE BAR ─────────── */
function ScoreBar({ score, band }) {
  const fill  = band ? BAND[band].bar : '#d1d5db';
  const label = band ? BAND[band].fg  : '#9ca3af';
  return (
    <div style={{ display:'flex', alignItems:'center', gap:10, minWidth:150 }}>
      <div style={{ flex:1, height:8, background:'#eaeaec', borderRadius:4, overflow:'hidden' }}>
        {score !== null && score !== undefined && (
          <div style={{ width:`${score}%`, height:'100%', background:fill, borderRadius:4,
            transition:'width .4s ease' }} />
        )}
      </div>
      <span style={{ fontSize:13.5, fontWeight:700, color:label,
        width:36, textAlign:'right', letterSpacing:'-.01em' }}>
        {score !== null && score !== undefined ? `${score}%` : '0%'}
      </span>
    </div>
  );
}

/* ─────────── NAV RAIL ─────────── */
function NavRail() {
  const items = [
    { n:'home',     active:false },
    { n:'book',     active:false },
    { n:'users',    active:true  },
    { n:'calendar', active:false },
    { n:'folder',   active:false },
  ];
  return (
    <nav style={{ width:64, background:'#141415', display:'flex', flexDirection:'column',
      alignItems:'center', gap:4, padding:'14px 0', flexShrink:0 }}>
      {/* Hamburger */}
      <div style={{ width:36, height:36, borderRadius:9, background:'#2c2c2e',
        display:'flex', alignItems:'center', justifyContent:'center', marginBottom:6, cursor:'pointer' }}>
        <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.2}
          strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 6h18M3 12h18M3 18h18"/>
        </svg>
      </div>
      {items.map((it, i) => (
        <div key={i} style={{ width:40, height:40, borderRadius:10, display:'flex',
          alignItems:'center', justifyContent:'center', position:'relative', cursor:'pointer',
          background: it.active ? '#2c2c2e' : 'transparent' }}>
          {it.active && (
            <span style={{ position:'absolute', left:0, top:10, bottom:10, width:3,
              borderRadius:'0 2px 2px 0', background:'#5a58ff' }} />
          )}
          <Ico n={it.n} size={20} stroke={it.active ? '#fff' : '#6d6d6f'} sw={it.active ? 2 : 1.8} />
        </div>
      ))}
      <div style={{ flex:1 }} />
      {/* Avatar */}
      <div style={{ width:34, height:34, borderRadius:'50%', background:'#3d35e8',
        display:'flex', alignItems:'center', justifyContent:'center',
        fontSize:13, fontWeight:700, color:'#fff', letterSpacing:'-.02em' }}>P</div>
    </nav>
  );
}

/* ─────────── EXPORT ─────────── */
Object.assign(window, {
  ASSIGNMENTS, getBand, BAND, BAND_STEP, BAND_FULL, BAND_THRESHOLD,
  Ico, TypeIco, StatusPill, BandPill, ScoreBar, NavRail, PATHS,
});
