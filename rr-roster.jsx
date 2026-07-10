/* rr-roster.jsx — Roster Run scoring screen */

const SUBJ_COLOR = { math:'#f5c842', sci:'#6dd0c0', ela:'#c4a0e8', ss:'#87c4e8' };
const RR_PROMPTS = ["Independent","Verbal","Gestural","Physical","Hand-over-hand"];

function subjDot(aid) {
  const color = SUBJ_COLOR[subjectOf(aid)] || '#e1e1e3';
  return <span style={{ width:10,height:10,borderRadius:'50%',background:color,flexShrink:0,display:'inline-block' }} />;
}

// ─── Assignment sidebar ───────────────────────────────────────────────────────
function AssignmentSidebar({ selected, scores, onSelect, filter, onFilter }) {
  const listRef = React.useRef(null);

  function rosterDone(aid) {
    const roster = studentsFor(aid);
    return roster.length > 0 && roster.every(s => {
      const v = scores[s.id + '|' + aid];
      return v != null && v !== '';
    });
  }
  function rosterCount(aid) {
    return studentsFor(aid).filter(s => scores[s.id + '|' + aid] != null && scores[s.id + '|' + aid] !== '').length;
  }

  const visible = filter
    ? ASSIGNMENTS.filter(a => a.name.toLowerCase().includes(filter.toLowerCase()))
    : ASSIGNMENTS;

  // Scroll active item into view on mount / selection change
  React.useEffect(() => {
    if (!listRef.current) return;
    const el = listRef.current.querySelector('[data-active="true"]');
    if (el) el.scrollIntoView({ block: 'nearest' });
  }, [selected]);

  return (
    <div style={{ width:272,flexShrink:0,display:'flex',flexDirection:'column',borderRight:'1px solid #e1e1e3',background:'#fff',height:'100%',overflow:'hidden' }}>
      {/* Search */}
      <div style={{ padding:'14px 12px 10px' }}>
        <div style={{ display:'flex',alignItems:'center',gap:8,background:'#f4f4f6',borderRadius:10,padding:'8px 12px' }}>
          <RRIcon name="search" size={15} color="#6d6d6f" />
          <input value={filter} onChange={e => onFilter(e.target.value)}
            placeholder="Search assignments"
            style={{ flex:1,border:'none',background:'transparent',font:'var(--eds-body-sm)',color:'#1d1d1f',outline:'none' }} />
          {filter && (
            <button onClick={() => onFilter('')} style={{ border:'none',background:'transparent',cursor:'pointer',color:'#6d6d6f',padding:0,display:'flex' }}>
              <RRIcon name="x" size={14} />
            </button>
          )}
        </div>
      </div>
      {/* List */}
      <div ref={listRef} style={{ flex:1,overflowY:'auto',padding:'0 8px 16px' }}>
        {visible.length === 0 && (
          <div style={{ padding:'20px 12px',font:'var(--eds-body-sm)',color:'#6d6d6f',textAlign:'center' }}>No results</div>
        )}
        {visible.map(a => {
          const active = a.id === selected;
          const done = rosterDone(a.id);
          const cnt = rosterCount(a.id);
          const tot = studentsFor(a.id).length;
          return (
            <div key={a.id} data-active={active}
              onClick={() => onSelect(a.id)}
              onMouseEnter={e => { if (!active) e.currentTarget.style.background = '#f4f4f6'; }}
              onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}
              style={{ display:'flex',alignItems:'center',gap:8,padding:'8px 10px',borderRadius:10,cursor:'pointer',background:active?'#eaeaff':'transparent',marginBottom:1,position:'relative',transition:'background .1s' }}>
              {active && <span style={{ position:'absolute',left:0,top:4,bottom:4,width:3,background:'#5a58ff',borderRadius:'0 3px 3px 0' }} />}
              {subjDot(a.id)}
              <span style={{ flex:1,font:'var(--eds-body-sm)',color:active?'#3d33cc':'#1d1d1f',lineHeight:1.4,minWidth:0,textWrap:'pretty' }}>{a.name}</span>
              {done
                ? <RRIcon name="check" size={13} color="#016a36" />
                : cnt > 0
                  ? <span style={{ font:'var(--eds-body-sm)',color:'#6d6d6f',flexShrink:0,fontSize:12 }}>{cnt}/{tot}</span>
                  : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Student row ─────────────────────────────────────────────────────────────
function StudentRow({ s, aid, scores, prompts, notes, expanded, onExpand, onScore, onPrompt, onNote, inputRef, onKeyDown }) {
  const k = s.id + '|' + aid;
  const score = scores[k] ?? '';
  const prompt = prompts[k] || '';
  const note = notes[k] || '';
  const isAbs = score === 'Abs';
  const isOnline = !!s.online;

  return (
    <div style={{ background:'#fff',border:'1.5px solid',borderColor:expanded?'#5a58ff':'#e1e1e3',borderRadius:'var(--eds-radius-md)',overflow:'hidden',transition:'border-color .15s, box-shadow .15s',boxShadow:expanded?'0 0 0 3px rgba(90,88,255,.1)':'var(--eds-shadow-sm)' }}>
      <div style={{ display:'flex',alignItems:'center',gap:14,padding:'14px 20px',background:expanded?'#fafafe':'#fff' }}>
        <RRAvatar initials={s.init} accent={s.accent} size={36} />
        <div style={{ flex:1,display:'flex',alignItems:'center',gap:8,flexWrap:'wrap' }}>
          <span style={{ font:'var(--eds-title-default)',color:'#1d1d1f' }}>{s.name}</span>
          <RRTag tone="default">Level {s.level}</RRTag>
          {isOnline && <RRTag tone="success">Online ✓</RRTag>}
        </div>
        <div style={{ display:'flex',alignItems:'center',gap:6,flexShrink:0 }}>
          {isOnline
            ? <span style={{ fontFamily:"'Figtree',sans-serif",fontWeight:600,fontSize:20,color:'#6d6d6f' }}>{score}</span>
            : <input ref={inputRef}
                className={'rr-score-input' + (isAbs ? ' rr-abs' : '')}
                inputMode="numeric"
                value={isAbs ? 'Abs' : score}
                onFocus={() => onExpand(s.id)}
                onChange={e => onScore(k, e.target.value.replace(/[^0-9]/g, ''))}
                onKeyDown={e => onKeyDown(e, k, s.id)}
                data-sid={s.id}
              />
          }
          <span style={{ font:'var(--eds-title-sm)',color:'#6d6d6f' }}>/{s.max}</span>
        </div>
      </div>

      {expanded && !isOnline && (
        <div style={{ padding:'12px 20px 16px',borderTop:'1px solid #efefef',background:'#fafafe' }}>
          <div style={{ font:'var(--eds-body-sm)',color:'#6d6d6f',textTransform:'uppercase',letterSpacing:'0.05em',fontSize:11,marginBottom:8,fontWeight:600 }}>Prompting level</div>
          <div style={{ display:'flex',flexWrap:'wrap',gap:6,marginBottom:12 }}>
            {RR_PROMPTS.map(p => (
              <button key={p} className={'rr-prompt-chip' + (prompt === p ? ' rr-chip-on' : '')}
                onClick={() => onPrompt(k, prompt === p ? '' : p)}>{p}</button>
            ))}
          </div>
          <div style={{ display:'flex',alignItems:'center',gap:8 }}>
            <RRIcon name="pen" size={14} color="#6d6d6f" />
            <input className="rr-note-input" placeholder="Add a note…" value={note}
              onChange={e => onNote(k, e.target.value)} />
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Roster Run screen ────────────────────────────────────────────────────────
function RosterRunScreen({ onDone }) {
  const [aid, setAid]       = React.useState(ASSIGNMENTS[0].id);
  const [scores, setScores] = React.useState({});
  const [prompts, setPrompts] = React.useState({});
  const [notes, setNotes]   = React.useState({});
  const [expanded, setExpanded] = React.useState(null);
  const [filter, setFilter] = React.useState('');
  const inputRefs = React.useRef({});

  const asg = ASSIGNMENTS.find(a => a.id === aid);
  const paperStudents = React.useMemo(() => studentsFor(aid), [aid]);
  const onlineStudents = React.useMemo(() => onlineStudentsFor(aid, paperStudents).map(s => ({ ...s, online: true })), [aid, paperStudents]);
  const allStudents = [...paperStudents, ...onlineStudents];

  // Seed online scores once when assignment changes
  React.useEffect(() => {
    const updates = {};
    onlineStudents.forEach(s => {
      const k = s.id + '|' + aid;
      if (scores[k] == null) updates[k] = String(onlineScore(s, aid));
    });
    if (Object.keys(updates).length) setScores(prev => ({ ...prev, ...updates }));
    // Auto-focus first paper student
    setExpanded(paperStudents[0]?.id || null);
    setTimeout(() => {
      const ref = inputRefs.current[paperStudents[0]?.id];
      if (ref) { ref.focus(); ref.select(); }
    }, 80);
  }, [aid]);

  const done = allStudents.filter(s => { const v = scores[s.id+'|'+aid]; return v != null && v !== ''; }).length;

  function handleKeyDown(e, k, sid) {
    if (e.key === 'Enter') {
      e.preventDefault();
      const idx = paperStudents.findIndex(s => s.id === sid);
      const next = paperStudents[idx + 1];
      if (next) {
        setExpanded(next.id);
        setTimeout(() => { const r = inputRefs.current[next.id]; if (r) { r.focus(); r.select(); } }, 0);
      }
    } else if ((e.key === 'a' || e.key === 'A') && scores[k] === '') {
      e.preventDefault();
      setScores(prev => ({ ...prev, [k]: 'Abs' }));
      const idx = paperStudents.findIndex(s => s.id === sid);
      const next = paperStudents[idx + 1];
      if (next) {
        setExpanded(next.id);
        setTimeout(() => { const r = inputRefs.current[next.id]; if (r) { r.focus(); r.select(); } }, 0);
      }
    }
  }

  function selectAssignment(newAid) {
    setAid(newAid);
    setExpanded(null);
    setFilter('');
  }

  return (
    <div style={{ flex:1,display:'flex',flexDirection:'column',height:'100%',overflow:'hidden' }}>
      {/* Top bar */}
      <header style={{ background:'#fff',borderBottom:'1px solid #e1e1e3',padding:'0 32px',height:60,flexShrink:0,display:'flex',alignItems:'center',gap:8 }}>
        <button onClick={onDone} style={{ border:'none',background:'transparent',cursor:'pointer',display:'flex',alignItems:'center',gap:4,color:'#6d6d6f',font:'var(--eds-body-sm)',padding:'4px 0' }}>
          <RRIcon name="chevLeft" size={16} />Students
        </button>
        <RRIcon name="chevRight" size={14} color="#c0c0c2" />
        <span style={{ font:'var(--eds-title-default)',color:'#1d1d1f' }}>Enter scores</span>
        <div style={{ flex:1 }} />
        <span style={{ font:'var(--eds-body-sm)',color:'#016a36',display:'flex',alignItems:'center',gap:5 }}>
          <RRIcon name="check" size={14} color="#016a36" />All changes saved
        </span>
        <RRButton variant="brand" size="md" onClick={onDone}>Done</RRButton>
      </header>

      {/* Body */}
      <div style={{ flex:1,display:'flex',overflow:'hidden' }}>
        <AssignmentSidebar selected={aid} scores={scores}
          onSelect={selectAssignment} filter={filter} onFilter={setFilter} />

        {/* Scoring panel */}
        <div style={{ flex:1,overflowY:'auto',padding:'24px 32px',background:'#f4f4f6' }}>
          {/* Assignment header */}
          <div style={{ background:'#fff',border:'1px solid #e1e1e3',borderRadius:'var(--eds-radius-md)',padding:'20px 24px',marginBottom:16,boxShadow:'var(--eds-shadow-sm)' }}>
            <div style={{ display:'flex',alignItems:'flex-start',gap:12,marginBottom:14 }}>
              {subjDot(aid)}
              <div style={{ flex:1 }}>
                <div style={{ font:'var(--eds-title-xl)',color:'#1d1d1f',marginBottom:4,lineHeight:1.3 }}>{asg?.name}</div>
                <div style={{ font:'var(--eds-body-sm)',color:'#6d6d6f' }}>Available {asg?.available}</div>
              </div>
            </div>
            <RRProgressBar done={done} total={allStudents.length} />
          </div>

          {/* Student rows */}
          <div style={{ display:'flex',flexDirection:'column',gap:8 }}>
            {paperStudents.map(s => (
              <StudentRow key={s.id} s={s} aid={aid}
                scores={scores} prompts={prompts} notes={notes}
                expanded={expanded === s.id}
                onExpand={setExpanded}
                onScore={(k,v) => setScores(p => ({ ...p, [k]:v }))}
                onPrompt={(k,v) => setPrompts(p => ({ ...p, [k]:v }))}
                onNote={(k,v) => setNotes(p => ({ ...p, [k]:v }))}
                inputRef={el => inputRefs.current[s.id] = el}
                onKeyDown={handleKeyDown} />
            ))}

            {onlineStudents.length > 0 && (
              <>
                <div style={{ display:'flex',alignItems:'center',gap:12,margin:'4px 0' }}>
                  <div style={{ flex:1,height:1,background:'#e1e1e3' }} />
                  <span style={{ font:'var(--eds-body-sm)',color:'#6d6d6f',whiteSpace:'nowrap' }}>
                    Completed online ({onlineStudents.length})
                  </span>
                  <div style={{ flex:1,height:1,background:'#e1e1e3' }} />
                </div>
                {onlineStudents.map(s => (
                  <StudentRow key={s.id} s={s} aid={aid}
                    scores={scores} prompts={prompts} notes={notes}
                    expanded={false} onExpand={() => {}}
                    onScore={() => {}} onPrompt={() => {}} onNote={() => {}}
                    inputRef={() => {}} onKeyDown={() => {}} />
                ))}
              </>
            )}
          </div>

          {/* Keyboard hints */}
          <div style={{ display:'flex',gap:16,marginTop:20,font:'var(--eds-body-sm)',color:'#9a9a9c' }}>
            <span><kbd style={{ background:'#fff',border:'1px solid #e1e1e3',borderRadius:6,padding:'2px 7px',font:'inherit',fontSize:12 }}>Enter</kbd> next student</span>
            <span><kbd style={{ background:'#fff',border:'1px solid #e1e1e3',borderRadius:6,padding:'2px 7px',font:'inherit',fontSize:12 }}>A</kbd> mark absent</span>
            <span>· Autosaves</span>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { RosterRunScreen, AssignmentSidebar, StudentRow });
