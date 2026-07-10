/* rr-students.jsx — Students grid, component-based */

const STUDENTS_SCREEN_DATA = [
  { id:'s1', name:'Mia Brown',      grade:'Grade 1', emoji:'👩🏾', inProgress:2, notStarted:3 },
  { id:'s2', name:'Leo Smith',      grade:'Grade 1', emoji:'🧑🏽', inProgress:2, notStarted:3 },
  { id:'s3', name:'Sophia Millet',  grade:'Grade 1', emoji:'👩🏽', inProgress:2, notStarted:3 },
  { id:'s4', name:'Chloe McKim',    grade:'Grade 1', emoji:'👱🏻‍♀️', inProgress:2, notStarted:3 },
  { id:'s5', name:'Noah Stevenson', grade:'Grade 1', emoji:'👦🏼', inProgress:2, notStarted:3 },
  { id:'s6', name:'Elijah Wright',  grade:'Grade 1', emoji:'👦🏿', inProgress:2, notStarted:3 },
];

// ─── StudentAvatar ────────────────────────────────────────────────────────────
function StudentAvatar({ emoji, size = 58 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%', flexShrink: 0,
      background: '#f4f4f6',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: Math.round(size * 0.58), lineHeight: 1, overflow: 'hidden',
      border: '1px solid #ebebeb',
      userSelect: 'none',
    }}>{emoji}</div>
  );
}

// ─── AssignmentRow ────────────────────────────────────────────────────────────
function AssignmentRow({ icon, count, label, countColor, style }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '10px 12px',
      background: '#f8f9fa', borderRadius: 8,
      ...style,
    }}>
      {icon}
      <span style={{ fontSize: 15, fontWeight: 700, color: countColor, marginRight: 2, minWidth: 16 }}>
        {count}
      </span>
      <span style={{ fontSize: 14, fontWeight: 500, color: 'rgb(73,73,75)' }}>
        {label}
      </span>
    </div>
  );
}

// ─── Design system icons — inlined with corrected viewBox ────────────────────
const TARGET_PATH = "M 17 0 L 17.894 -0.447 C 17.751 -0.735 17.477 -0.936 17.16 -0.987 C 16.843 -1.039 16.52 -0.934 16.293 -0.707 L 17 0 Z M 14 3 L 13.293 2.293 C 13.105 2.48 13 2.735 13 3 L 14 3 Z M 17 6 L 17 7 C 17.265 7 17.52 6.895 17.707 6.707 L 17 6 Z M 20 3 L 20.707 3.707 C 20.934 3.48 21.039 3.157 20.987 2.84 C 20.936 2.523 20.735 2.249 20.447 2.106 L 20 3 Z M 18 2 L 17.106 2.447 C 17.202 2.641 17.359 2.798 17.553 2.894 L 18 2 Z M 9.293 9.293 C 8.902 9.683 8.902 10.317 9.293 10.707 C 9.683 11.098 10.317 11.098 10.707 10.707 L 10 10 L 9.293 9.293 Z M 21 10 C 21 9.448 20.552 9 20 9 C 19.448 9 19 9.448 19 10 L 20 10 L 21 10 Z M 10 1 C 10.552 1 11 0.552 11 0 C 11 -0.552 10.552 -1 10 -1 L 10 0 L 10 1 Z M 16 10 C 16 9.448 15.552 9 15 9 C 14.448 9 14 9.448 14 10 L 15 10 L 16 10 Z M 10 6 C 10.552 6 11 5.552 11 5 C 11 4.448 10.552 4 10 4 L 10 5 L 10 6 Z M 17 0 L 16.293 -0.707 L 13.293 2.293 L 14 3 L 14.707 3.707 L 17.707 0.707 L 17 0 Z M 14 3 L 13 3 L 13 6 L 14 6 L 15 6 L 15 3 L 14 3 Z M 14 6 L 14 7 L 17 7 L 17 6 L 17 5 L 14 5 L 14 6 Z M 17 6 L 17.707 6.707 L 20.707 3.707 L 20 3 L 19.293 2.293 L 16.293 5.293 L 17 6 Z M 20 3 L 20.447 2.106 L 18.447 1.106 L 18 2 L 17.553 2.894 L 19.553 3.894 L 20 3 Z M 18 2 L 18.894 1.553 L 17.894 -0.447 L 17 0 L 16.106 0.447 L 17.106 2.447 L 18 2 Z M 14 6 L 13.293 5.293 L 9.293 9.293 L 10 10 L 10.707 10.707 L 14.707 6.707 L 14 6 Z M 20 10 L 19 10 C 19 14.971 14.971 19 10 19 L 10 20 L 10 21 C 16.075 21 21 16.075 21 10 L 20 10 Z M 10 20 L 10 19 C 5.029 19 1 14.971 1 10 L 0 10 L -1 10 C -1 16.075 3.925 21 10 21 L 10 20 Z M 0 10 L 1 10 C 1 5.029 5.029 1 10 1 L 10 0 L 10 -1 C 3.925 -1 -1 3.925 -1 10 L 0 10 Z M 15 10 L 14 10 C 14 12.209 12.209 14 10 14 L 10 15 L 10 16 C 13.314 16 16 13.314 16 10 L 15 10 Z M 10 15 L 10 14 C 7.791 14 6 12.209 6 10 L 5 10 L 4 10 C 4 13.314 6.686 16 10 16 L 10 15 Z M 5 10 L 6 10 C 6 7.791 7.791 6 10 6 L 10 5 L 10 4 C 6.686 4 4 6.686 4 10 L 5 10 Z";

const ALERT_PATH = "M 11.263 6.504 C 11.263 5.952 10.816 5.504 10.263 5.504 C 9.711 5.504 9.263 5.952 9.263 6.504 L 10.263 6.504 L 11.263 6.504 Z M 9.263 10.504 C 9.263 11.056 9.711 11.504 10.263 11.504 C 10.816 11.504 11.263 11.056 11.263 10.504 L 10.263 10.504 L 9.263 10.504 Z M 10.263 13.504 C 9.711 13.504 9.263 13.952 9.263 14.504 C 9.263 15.056 9.711 15.504 10.263 15.504 L 10.263 14.504 L 10.263 13.504 Z M 10.273 15.504 C 10.826 15.504 11.273 15.056 11.273 14.504 C 11.273 13.952 10.826 13.504 10.273 13.504 L 10.273 14.504 L 10.273 15.504 Z M 8.879 1.396 L 9.744 1.897 L 9.744 1.897 L 8.879 1.396 Z M 0.654 15.602 L 1.519 16.104 L 1.519 16.104 L 0.654 15.602 Z M 19.873 15.602 L 20.738 15.101 L 20.738 15.101 L 19.873 15.602 Z M 11.648 1.396 L 12.514 0.895 L 12.514 0.895 L 11.648 1.396 Z M 20.117 17.813 L 19.529 17.004 L 19.529 17.004 L 20.117 17.813 Z M 20.524 17.108 L 21.518 17.212 L 21.518 17.212 L 20.524 17.108 Z M 0.003 17.108 L -0.991 17.212 L -0.991 17.212 L 0.003 17.108 Z M 0.41 17.813 L 0.998 17.004 L 0.998 17.004 L 0.41 17.813 Z M 9.857 0.086 L 10.263 1 L 10.263 1 L 9.857 0.086 Z M 10.67 0.086 L 11.076 -0.827 L 11.076 -0.827 L 10.67 0.086 Z M 10.263 6.504 L 9.263 6.504 L 9.263 10.504 L 10.263 10.504 L 11.263 10.504 L 11.263 6.504 L 10.263 6.504 Z M 10.263 14.504 L 10.263 15.504 L 10.273 15.504 L 10.273 14.504 L 10.273 13.504 L 10.263 13.504 L 10.263 14.504 Z M 8.879 1.396 L 8.013 0.895 L -0.212 15.101 L 0.654 15.602 L 1.519 16.104 L 9.744 1.897 L 8.879 1.396 Z M 2.039 18.004 L 2.039 19.004 L 18.488 19.004 L 18.488 18.004 L 18.488 17.004 L 2.039 17.004 L 2.039 18.004 Z M 19.873 15.602 L 20.738 15.101 L 12.514 0.895 L 11.648 1.396 L 10.783 1.897 L 19.008 16.104 L 19.873 15.602 Z M 18.488 18.004 L 18.488 19.004 C 18.924 19.004 19.32 19.005 19.637 18.976 C 19.949 18.947 20.351 18.879 20.705 18.622 L 20.117 17.813 L 19.529 17.004 C 19.621 16.938 19.663 16.965 19.454 16.984 C 19.25 17.003 18.963 17.004 18.488 17.004 L 18.488 18.004 Z M 19.873 15.602 L 19.008 16.104 C 19.246 16.515 19.388 16.763 19.474 16.949 C 19.563 17.14 19.517 17.117 19.529 17.004 L 20.524 17.108 L 21.518 17.212 C 21.564 16.776 21.421 16.394 21.29 16.11 C 21.156 15.821 20.957 15.478 20.738 15.101 L 19.873 15.602 Z M 20.117 17.813 L 20.705 18.622 C 21.164 18.288 21.459 17.776 21.518 17.212 L 20.524 17.108 L 19.529 17.004 L 19.529 17.004 L 20.117 17.813 Z M 0.654 15.602 L -0.212 15.101 C -0.43 15.478 -0.629 15.821 -0.763 16.11 C -0.894 16.394 -1.037 16.776 -0.991 17.212 L 0.003 17.108 L 0.998 17.004 C 1.01 17.117 0.964 17.14 1.052 16.949 C 1.138 16.763 1.281 16.515 1.519 16.104 L 0.654 15.602 Z M 2.039 18.004 L 2.039 17.004 C 1.564 17.004 1.277 17.003 1.073 16.984 C 0.863 16.965 0.906 16.938 0.998 17.004 L 0.41 17.813 L -0.178 18.622 C 0.176 18.879 0.578 18.947 0.89 18.976 C 1.207 19.005 1.603 19.004 2.039 19.004 L 2.039 18.004 Z M 0.003 17.108 L -0.991 17.212 C -0.933 17.776 -0.637 18.288 -0.178 18.622 L 0.41 17.813 L 0.998 17.004 L 0.998 17.004 L 0.003 17.108 Z M 8.879 1.396 L 9.744 1.897 C 9.981 1.487 10.125 1.241 10.243 1.074 C 10.364 0.904 10.366 0.954 10.263 1 L 9.857 0.086 L 9.451 -0.827 C 9.051 -0.65 8.792 -0.337 8.611 -0.082 C 8.428 0.177 8.231 0.519 8.013 0.895 L 8.879 1.396 Z M 11.648 1.396 L 12.514 0.895 C 12.296 0.519 12.099 0.177 11.916 -0.082 C 11.735 -0.337 11.476 -0.65 11.076 -0.827 L 10.67 0.086 L 10.263 1 C 10.16 0.954 10.163 0.904 10.284 1.074 C 10.402 1.241 10.546 1.487 10.783 1.897 L 11.648 1.396 Z M 9.857 0.086 L 10.263 1 L 10.263 1 L 10.67 0.086 L 11.076 -0.827 C 10.559 -1.058 9.968 -1.058 9.451 -0.827 L 9.857 0.086 Z";

function IconInProgress() {
  return (
    <svg width={22} height={22} viewBox="-1 -1 22 22" fill="none" style={{ flexShrink: 0, display: 'block' }}>
      <path d={TARGET_PATH} fill="#2563eb" fillRule="nonzero" />
    </svg>
  );
}

function IconNotStarted() {
  return (
    <svg width={22} height={22} viewBox="-1 -1 23 21" fill="none" style={{ flexShrink: 0, display: 'block' }}>
      <path d={ALERT_PATH} fill="#f59e0b" fillRule="nonzero" />
    </svg>
  );
}

// ─── CardDivider ──────────────────────────────────────────────────────────────
function CardDivider() {
  return <div style={{ height: 1, background: '#ebebeb', marginBottom: 16 }} />;
}

// ─── StudentCard ──────────────────────────────────────────────────────────────
function StudentCard({ s }) {
  const [hov, setHov] = React.useState(false);

  function openProfile() {
    const p = new URLSearchParams({
      name:  s.name,
      emoji: s.emoji,
      grade: s.grade,
      level: '1',
    });
    window.location.href = 'Student Profile - Banding v3.html?' + p.toString();
  }

  return (
    <div
      onClick={openProfile}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: '#ffffff',
        borderRadius: 16,
        border: '1px solid #ebebeb',
        boxShadow: hov ? '0 4px 20px rgba(0,0,0,0.08)' : '0 1px 4px rgba(0,0,0,0.04)',
        padding: '16px 18px',
        display: 'flex', flexDirection: 'column',
        cursor: 'pointer',
        transition: 'box-shadow .15s',
      }}>

      {/* Avatar + name + grade */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
        <StudentAvatar emoji={s.emoji} size={46} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontSize: 15, fontWeight: 700, color: '#1d1d1f',
            lineHeight: 1.2, letterSpacing: '-0.01em',
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          }}>{s.name}</div>
          <div style={{ fontSize: 14, color: '#6b7280', marginTop: 3, fontWeight: 400 }}>
            {s.grade}
          </div>
        </div>
      </div>

      <CardDivider style={{ marginBottom: 12 }} />

      {/* Assignments */}
      <div>
        <div style={{
          fontSize: 11, fontWeight: 600, color: 'rgb(109,109,111)',
          letterSpacing: '0.02em', marginBottom: 8,
        }}>Assignments</div>

        <AssignmentRow
          icon={<IconInProgress />}
          count={s.inProgress}
          label="In progress"
          countColor="#1e40af"
          style={{ marginBottom: 5 }}
        />
        <AssignmentRow
          icon={<IconNotStarted />}
          count={s.notStarted}
          label="Not started"
          countColor="#92400e"
        />
      </div>
    </div>
  );
}

// ─── StudentsScreen ───────────────────────────────────────────────────────────
function StudentsScreen({ onAddScores }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#f4f4f6', overflow: 'hidden' }}>

      <header style={{
        height: 60, flexShrink: 0,
        background: '#ffffff', borderBottom: '1px solid #e8e8ea',
        padding: '0 32px', display: 'flex', alignItems: 'center',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <svg width={22} height={22} viewBox="0 0 24 24" fill="none"
            stroke="#111827" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          <span style={{ fontSize: 20, fontWeight: 700, color: '#111827', letterSpacing: '-0.01em' }}>
            Students
          </span>
        </div>

        <div style={{ flex: 1 }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <RRButton variant="secondary" size="md" leading="plus" onClick={onAddScores}>
            Add scores
          </RRButton>
          <button style={{
            height: 36, padding: '0 16px',
            background: '#fff', color: '#1d1d1f',
            border: '1.5px solid #1d1d1f', borderRadius: 112,
            fontSize: 15, fontWeight: 600, letterSpacing: '0.01em',
            display: 'inline-flex', alignItems: 'center', gap: 7,
            cursor: 'pointer', fontFamily: "'Figtree', sans-serif",
          }}>
            <RRIcon name="settings" size={15} color="#1d1d1f" sw={1.8} />
            Manage
          </button>
        </div>
      </header>

      <div style={{ flex: 1, overflowY: 'auto', padding: '24px 28px' }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {STUDENTS_SCREEN_DATA.map(s => <StudentCard key={s.id} s={s} />)}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { StudentsScreen, STUDENTS_SCREEN_DATA, StudentAvatar });
