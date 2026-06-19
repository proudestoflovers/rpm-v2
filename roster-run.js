/* ===== Offline worksheet scoring — wireframe interactions ===== */
(function(){
  "use strict";

  // ---- sample data ----
const ASSIGNMENTS = [
    { id:"n203", name:"Exploring Money Post-Assessment", available:"Jun 10" },
    { id:"n202", name:"Exploring Money Review", available:"Jun 9" },
    { id:"n201", name:"Identifying Coin Values", available:"Jun 8" },
    { id:"n200", name:"Learning Coin Values", available:"Jun 5" },
    { id:"n199", name:"Identifying Coins", available:"Jun 4" },
    { id:"n198", name:"Naming Coins", available:"Jun 3" },
    { id:"n197", name:"Exploring Money Pre-Assessment", available:"Jun 2" },
    { id:"n196", name:"Exploring Money Overview", available:"Jun 1" },
    { id:"n195", name:"Exploring Measurement and Data Post-Assessment", available:"May 29" },
    { id:"n194", name:"Exploring Measurement and Data Review", available:"May 28" },
    { id:"n193", name:"Reading Tally Graphs", available:"May 27" },
    { id:"n192", name:"Reading Bar Graphs", available:"May 26" },
    { id:"n191", name:"Reading Picture Graphs", available:"May 25" },
    { id:"n190", name:"Making Tally Graphs", available:"May 22" },
    { id:"n189", name:"Making Bar Graphs", available:"May 21" },
    { id:"n188", name:"Making Picture Graphs", available:"May 20" },
    { id:"n187", name:"Introduction to Data", available:"May 19" },
    { id:"n186", name:"Ordering 3 Objects: Taller or Shorter", available:"May 18" },
    { id:"n185", name:"Ordering 3 Objects: Longer or Shorter", available:"May 15" },
    { id:"n184", name:"Taller or Shorter?", available:"May 14" },
    { id:"n183", name:"Longer or Shorter?", available:"May 13" },
    { id:"n182", name:"Non-Standard Measurements", available:"May 12" },
    { id:"n181", name:"Introduction to Measurement", available:"May 11" },
    { id:"n180", name:"Exploring Measurement and Data Pre-Assessment", available:"May 8" },
    { id:"n179", name:"Exploring Measurement and Data Overview", available:"May 7" },
    { id:"n178", name:"Exploring Shapes Post-Assessment", available:"May 6" },
    { id:"n177", name:"Exploring Shapes Review", available:"May 5" },
    { id:"n176", name:"Create 3D Shapes Craft Activity", available:"May 4" },
    { id:"n175", name:"Create 3D Shapes", available:"May 1" },
    { id:"n174", name:"Create 3D Shapes (Parts)", available:"Apr 30" },
    { id:"n173", name:"Sort 3D Shapes (Edges)", available:"Apr 29" },
    { id:"n172", name:"3D Shapes: Attributes (Edges)", available:"Apr 28" },
    { id:"n171", name:"Sort 3D Shapes (Corners)", available:"Apr 27" },
    { id:"n170", name:"3D Shapes: Attributes (Corners)", available:"Apr 24" },
    { id:"n169", name:"Sort 3D Shapes (Faces)", available:"Apr 23" },
    { id:"n168", name:"3D Shapes: Attributes (Faces)", available:"Apr 22" },
    { id:"n167", name:"Naming 3D Shapes", available:"Apr 21" },
    { id:"n166", name:"Relationship between 2D and 3D", available:"Apr 20" },
    { id:"n165", name:"Divide 2D Shapes (Drawing)", available:"Apr 17" },
    { id:"n164", name:"Divide 2D Shapes in Half", available:"Apr 16" },
    { id:"n163", name:"Divide 2D Shapes (Equal/Not Equal)", available:"Apr 15" },
    { id:"n162", name:"Create 2D Shapes (Triangles)", available:"Apr 14" },
    { id:"n161", name:"Create 2D Shapes (Hexagons)", available:"Apr 13" },
    { id:"n160", name:"Create 2D Shapes (Parts)", available:"Apr 10" },
    { id:"n159", name:"Sorting 2D Shapes: Corners", available:"Apr 9" },
    { id:"n158", name:"Identify 2D Shapes Attributes: Corners", available:"Apr 8" },
    { id:"n157", name:"Sorting 2D Shapes: Sides", available:"Apr 7" },
    { id:"n156", name:"Identify 2D Shapes Attributes: Sides", available:"Apr 6" },
    { id:"n155", name:"Naming 2D Shapes", available:"Apr 3" },
    { id:"n154", name:"Non-Defining Attributes", available:"Apr 2" },
    { id:"n153", name:"Defining Attributes", available:"Apr 1" },
    { id:"n152", name:"What are Attributes?", available:"Mar 31" },
    { id:"n151", name:"Common 2D Things (Advanced Shapes)", available:"Mar 30" },
    { id:"n150", name:"Common 2D Things (Common Shapes)", available:"Mar 27" },
    { id:"n149", name:"What is a 2D Shape?", available:"Mar 26" },
    { id:"n148", name:"Exploring Shapes Pre-Assessment", available:"Mar 25" },
    { id:"n147", name:"Exploring Shapes Overview", available:"Mar 24" },
    { id:"n146", name:"Exploring Time Post-Assessment", available:"Mar 23" },
    { id:"n145", name:"Exploring Time Unit Review", available:"Mar 20" },
    { id:"n144", name:"Reading Time: Analog Match", available:"Mar 19" },
    { id:"n143", name:"Reading Time: Analog Combo", available:"Mar 18" },
    { id:"n142", name:"Reading Time: Analog Hour", available:"Mar 17" },
    { id:"n141", name:"Parts of an Analog Clock: Hours", available:"Mar 16" },
    { id:"n140", name:"Parts of an Analog Clock: Physical Components", available:"Mar 13" },
    { id:"n139", name:"Reading Time: Digital", available:"Mar 12" },
    { id:"n138", name:"Parts of a Digital Clock", available:"Mar 11" },
    { id:"n137", name:"Clocks: Analog vs Digital", available:"Mar 10" },
    { id:"n136", name:"Understanding the Calendar (Special Dates)", available:"Mar 9" },
    { id:"n135", name:"Understanding the Calendar (Seasons)", available:"Mar 6" },
    { id:"n134", name:"Understanding the Calendar (Yearly)", available:"Mar 5" },
    { id:"n133", name:"Understanding the Calendar (Monthly)", available:"Mar 4" },
    { id:"n132", name:"Concept of Time: Compare Week/Year", available:"Mar 3" },
    { id:"n131", name:"Concept of Time: Compare Day/Month", available:"Mar 2" },
    { id:"n130", name:"Concept of Time: Yearly", available:"Feb 27" },
    { id:"n129", name:"Understanding the Calendar (Weekly)", available:"Feb 26" },
    { id:"n128", name:"Concept of Time: AM/PM", available:"Feb 25" },
    { id:"n127", name:"Parts of the Day Order", available:"Feb 24" },
    { id:"n126", name:"Parts of the Day Vocab", available:"Feb 23" },
    { id:"n125", name:"Parts of the Day", available:"Feb 20" },
    { id:"n124", name:"Introduction to Time", available:"Feb 19" },
    { id:"n123", name:"Exploring Time Pre-Assessment", available:"Feb 18" },
    { id:"n122", name:"Exploring Time Unit Overview", available:"Feb 17" },
    { id:"n121", name:"Exploring Place Value Post-Assessment", available:"Feb 16" },
    { id:"n120", name:"Exploring Place Value Unit Review", available:"Feb 13" },
    { id:"n119", name:"Find 10 Less", available:"Feb 12" },
    { id:"n118", name:"Find 10 More", available:"Feb 11" },
    { id:"n117", name:"Show 10 Less", available:"Feb 10" },
    { id:"n116", name:"Show 10 More", available:"Feb 9" },
    { id:"n115", name:"Compare Numbers (Abstract)", available:"Feb 6" },
    { id:"n114", name:"Compare Numbers (Representational)", available:"Feb 5" },
    { id:"n113", name:"Compare Numbers (Concrete)", available:"Feb 4" },
    { id:"n112", name:"Introduction to Number Comparison", available:"Feb 3" },
    { id:"n111", name:"Identify Digits' Amount (Abstract)", available:"Feb 2" },
    { id:"n110", name:"Identify Digits' Amount (Representational)", available:"Jan 30" },
    { id:"n109", name:"Identify Digits' Amount (Concrete)", available:"Jan 29" },
    { id:"n108", name:"Identify Digits' Place Value (Abstract)", available:"Jan 28" },
    { id:"n107", name:"Identify Digits' Place Value (Representational)", available:"Jan 27" },
    { id:"n106", name:"Identify Digits' Place Value (Concrete)", available:"Jan 26" },
    { id:"n105", name:"Identify Tens Digit Place Values (Abstract)", available:"Jan 23" },
    { id:"n104", name:"Identify Tens Digit Place Values (Concrete)", available:"Jan 22" },
    { id:"n103", name:"Model Place Value to 99 (Representational)", available:"Jan 21" },
    { id:"n102", name:"Model Place Value to 99 (Concrete)", available:"Jan 20" },
    { id:"n101", name:"Creating 10s 11-20 (Representational)", available:"Jan 19" },
    { id:"n100", name:"Creating 10s 11-20 (Concrete)", available:"Jan 16" },
    { id:"n99", name:"Practice Place Value 0-9", available:"Jan 15" },
    { id:"n98", name:"Introduction to Place Value", available:"Jan 14" },
    { id:"n97", name:"Exploring Place Value Pre-Assessment", available:"Jan 13" },
    { id:"n96", name:"Exploring Place Value Unit Overview", available:"Jan 12" },
    { id:"n95", name:"Building Algebraic Thinking: Subtraction Post-Assessment", available:"Jan 9" },
    { id:"n94", name:"Building Algebraic Thinking: Subtraction Unit Review", available:"Jan 8" },
    { id:"n93", name:"Subtraction Word Problems (Abstract)", available:"Jan 7" },
    { id:"n92", name:"Subtraction-Words into Equations", available:"Jan 6" },
    { id:"n91", name:"Subtraction Word Problems (Representational)", available:"Jan 5" },
    { id:"n90", name:"Subtraction Word Problems (Concrete)", available:"Jan 2" },
    { id:"n89", name:"Introduction to Subtraction Word Problems", available:"Jan 1" },
    { id:"n88", name:"Subtraction with Unknowns (Abstract)", available:"Dec 31" },
    { id:"n87", name:"Subtraction with Unknowns (Representational)", available:"Dec 30" },
    { id:"n86", name:"Subtraction with Unknowns (Concrete)", available:"Dec 29" },
    { id:"n85", name:"Subtraction from 10 (Abstract)", available:"Dec 26" },
    { id:"n84", name:"Subtraction from 10 (Representational)", available:"Dec 25" },
    { id:"n83", name:"Subtraction from 10 (Concrete)", available:"Dec 24" },
    { id:"n82", name:"Subtraction from 5 (Abstract)", available:"Dec 23" },
    { id:"n81", name:"Subtraction from 5 (Concrete / Representational)", available:"Dec 22" },
    { id:"n80", name:"Subtraction Properties", available:"Dec 19" },
    { id:"n79", name:"Subtraction with Equal Sides (Representational)", available:"Dec 18" },
    { id:"n78", name:"Subtraction with Equal Sides (Concrete)", available:"Dec 17" },
    { id:"n77", name:"Represent Subtraction (Abstract)", available:"Dec 16" },
    { id:"n76", name:"Represent Subtraction (Representational)", available:"Dec 15" },
    { id:"n75", name:"Represent Subtraction (Concrete)", available:"Dec 12" },
    { id:"n74", name:"Introduction to Subtraction", available:"Dec 11" },
    { id:"n73", name:"Subtraction Symbols", available:"Dec 10" },
    { id:"n72", name:"Counting Backwards from 10", available:"Dec 9" },
    { id:"n71", name:"Reviewing Counting Backwards from 10", available:"Dec 8" },
    { id:"n70", name:"Building Algebraic Thinking: Subtraction Pre-Assessment", available:"Dec 5" },
    { id:"n69", name:"Building Algebraic Thinking: Subtraction Unit Overview", available:"Dec 4" },
    { id:"n68", name:"Expanding Addition Post-Assessment", available:"Dec 3" },
    { id:"n67", name:"Expanding Addition Unit Review", available:"Dec 2" },
    { id:"n66", name:"Word Problems to 20 (Abstract)", available:"Dec 1" },
    { id:"n65", name:"Word Problems to 20 (Representational)", available:"Nov 28" },
    { id:"n64", name:"Word Problems to 20 (Concrete)", available:"Nov 27" },
    { id:"n63", name:"Introduction to Word Problems to 20", available:"Nov 26" },
    { id:"n62", name:"3+ Addition Addends (Abstract)", available:"Nov 25" },
    { id:"n61", name:"3+ Addition Addends (Representational)", available:"Nov 24" },
    { id:"n60", name:"3+ Addition Addends (Concrete)", available:"Nov 21" },
    { id:"n59", name:"Find Unknowns to 20 (Abstract)", available:"Nov 20" },
    { id:"n58", name:"Find Unknowns to 20 (Representational)", available:"Nov 19" },
    { id:"n57", name:"Find Unknowns to 20 (Concrete)", available:"Nov 18" },
    { id:"n56", name:"Sum to 20 (Abstract)", available:"Nov 17" },
    { id:"n55", name:"Sum to 20 (Representational)", available:"Nov 14" },
    { id:"n54", name:"Solve within 20 (Abstract)", available:"Nov 13" },
    { id:"n53", name:"Solve within 20 (Representational)", available:"Nov 12" },
    { id:"n52", name:"Solve within 20 (Concrete)", available:"Nov 11" },
    { id:"n51", name:"Expanding Addition Pre-Assessment", available:"Nov 10" },
    { id:"n50", name:"Expanding Addition Unit Overview", available:"Nov 7" },
    { id:"n49", name:"Building Algebraic Thinking: Addition Post-Assessment", available:"Nov 6" },
    { id:"n48", name:"Building Algebraic Thinking: Addition Unit Review", available:"Nov 5" },
    { id:"n47", name:"Addition Word Problems (Abstract)", available:"Nov 4" },
    { id:"n46", name:"Addition Word Problems (Words to Equations)", available:"Nov 3" },
    { id:"n45", name:"Addition Word Problems (Representational)", available:"Oct 31" },
    { id:"n44", name:"Addition Word Problems (Concrete)", available:"Oct 30" },
    { id:"n43", name:"Introduction to Addition Word Problems", available:"Oct 29" },
    { id:"n42", name:"Identify the Addends (Abstract)", available:"Oct 28" },
    { id:"n41", name:"Identify the Addends (Representational)", available:"Oct 27" },
    { id:"n40", name:"Identify the Addends (Concrete)", available:"Oct 24" },
    { id:"n39", name:"Adding to 10 (Abstract)", available:"Oct 23" },
    { id:"n38", name:"Adding to 10 (Representational)", available:"Oct 22" },
    { id:"n37", name:"Adding to 10 (Concrete)", available:"Oct 21" },
    { id:"n36", name:"Adding to 5 (Abstract)", available:"Oct 20" },
    { id:"n35", name:"Adding to 5 (Concrete / Representational)", available:"Oct 17" },
    { id:"n34", name:"Exploring Addition Properties (Review)", available:"Oct 16" },
    { id:"n33", name:"Exploring Associative Property", available:"Oct 15" },
    { id:"n32", name:"Exploring Identity Property", available:"Oct 14" },
    { id:"n31", name:"Exploring Commutative Property", available:"Oct 13" },
    { id:"n30", name:"Addition with Equal Sides (Representational)", available:"Oct 10" },
    { id:"n29", name:"Addition with Equal Sides (Concrete)", available:"Oct 9" },
    { id:"n28", name:"Represent Addition (Abstract)", available:"Oct 8" },
    { id:"n27", name:"Represent Addition (Representational)", available:"Oct 7" },
    { id:"n26", name:"Represent Addition (Concrete)", available:"Oct 6" },
    { id:"n25", name:"Introduction to Addition", available:"Oct 3" },
    { id:"n24", name:"Equal Sides (Abstract)", available:"Oct 2" },
    { id:"n23", name:"Equal Sides (Representational)", available:"Oct 1" },
    { id:"n22", name:"Introduction to Equal Sides", available:"Sep 30" },
    { id:"n21", name:"Identify Signs", available:"Sep 29" },
    { id:"n20", name:"Introduction to Algebraic Signs", available:"Sep 26" },
    { id:"n19", name:"Building Algebraic Thinking: Addition Pre-Assessment", available:"Sep 25" },
    { id:"n18", name:"Building Algebraic Thinking: Addition Unit Overview", available:"Sep 24" },
    { id:"n17", name:"Exploring Patterns Post-Assessment", available:"Sep 23" },
    { id:"n16", name:"Exploring Patterns Unit Review", available:"Sep 22" },
    { id:"n15", name:"Complete Growing Patterns (Abstract)", available:"Sep 19" },
    { id:"n14", name:"Complete Growing Patterns (Representational)", available:"Sep 18" },
    { id:"n13", name:"Complete Growing Patterns (Concrete)", available:"Sep 17" },
    { id:"n12", name:"Complete Repeating Patterns (Abstract)", available:"Sep 16" },
    { id:"n11", name:"Complete Repeating Patterns (Concrete)", available:"Sep 15" },
    { id:"n10", name:"Extend Patterns (Representational)", available:"Sep 12" },
    { id:"n9", name:"Extend Patterns (Concrete)", available:"Sep 11" },
    { id:"n8", name:"Create Patterns (Abstract)", available:"Sep 10" },
    { id:"n7", name:"Create Patterns (Representational)", available:"Sep 9" },
    { id:"n6", name:"Create Patterns (Concrete)", available:"Sep 8" },
    { id:"n5", name:"Counting to 20", available:"Sep 5" },
    { id:"n4", name:"Rote Counting to 20", available:"Sep 4" },
    { id:"n3", name:"Counting to 10", available:"Sep 3" },
    { id:"n2", name:"Rote Counting to 10", available:"Sep 2" },
    { id:"n1", name:"Exploring Patterns Pre-Assessment", available:"Sep 1" },
  ];
  // differentiated level + max per student; per-assignment overrides in lvl/max objects
  const STUDENTS = [
    { id:"s1", name:"Mara T.",  init:"MT", defaultLvl:2, defaultMax:15, lvl:{}, max:{},
      pre:{n1:14,n2:9,n3:12,n4:8,n5:16,n6:13,n7:11,n8:10,n9:14,n10:12,n11:11} },
    { id:"s2", name:"Devon R.", init:"DR", defaultLvl:2, defaultMax:15, lvl:{}, max:{},
      pre:{n1:11,n2:8,n3:10,n4:7,n5:13,n6:10,n7:9,n8:8,n9:11,n10:10} },
    { id:"s3", name:"Aisha K.", init:"AK", defaultLvl:1, defaultMax:20, lvl:{}, max:{},
      pre:{n1:20,n2:18,n3:19,n4:17,n5:20,n6:18,n7:17,n8:16,n9:19,n10:18,n11:15,n12:16} },
    { id:"s4", name:"Liam P.",  init:"LP", defaultLvl:3, defaultMax:10, lvl:{}, max:{},
      pre:{n1:"abs",n2:8,n3:7,n4:"abs",n5:9,n6:6,n7:7,n8:5,n9:8,n10:7} },
    { id:"s5", name:"Sofia G.", init:"SG", defaultLvl:1, defaultMax:20, lvl:{}, max:{},
      pre:{n1:14,n2:12,n3:15,n4:11,n5:17,n6:14,n7:13,n8:12,n9:15,n10:13} },
    { id:"s6", name:"Noah B.",  init:"NB", defaultLvl:3, defaultMax:12, lvl:{}, max:{},
      pre:{n1:9,n2:7,n3:8,n4:6,n5:10,n6:8,n7:7,n8:6,n9:9,n10:8} },
    { id:"s7", name:"Ivy C.",   init:"IC", defaultLvl:1, defaultMax:20, lvl:{}, max:{},
      pre:{n1:18,n2:16,n3:17,n4:15,n5:19,n6:17,n7:16,n8:14,n9:18,n10:16,n11:14} },
    { id:"s8", name:"Jamal W.", init:"JW", defaultLvl:2, defaultMax:15, lvl:{}, max:{},
      pre:{n1:13,n2:11,n3:12,n4:10,n5:14,n6:12,n7:11,n8:9,n9:13,n10:11} },
  ];
  const PROMPTS = ["Independent","Verbal","Gestural","Physical","Hand-over-hand"];

  // ---- level chip (per-student per-assignment differentiated level) ----
  function lvlChip(n){
    return '<span style="font-size:12px;font-weight:700;font-family:Kalam,cursive;padding:1px 7px;border:1.5px solid var(--line-soft);border-radius:20px;color:var(--ink2);background:var(--shade);white-space:nowrap;">Level '+n+'</span>';
  }
  const ACCOMS  = ["Extra time","Read aloud","Manipulatives","Scribe","Calculator"];

  // ---- state ----
  const state = { dir:"C", filled:false, scores:{}, prompt:{}, note:{}, accom:{}, rosterA:"n203", stackI:0, showCompleted:false };
  let _pillDropHandler=null; let _asgKeyHandler=null; // module-level event handler refs for cleanup
  const key = (s,a)=> s+"|"+a;
  function seed(){
    state.scores={}; state.prompt={}; state.note={}; state.accom={};
    if(!state.filled) return;
    STUDENTS.forEach(s=>{
      Object.keys(s.pre).forEach(a=>{ state.scores[key(s.id,a)] = s.pre[a]; });
    });
    state.prompt[key("s3","n11")]="Independent";
    state.prompt[key("s1","n11")]="Verbal";
    state.prompt[key("s2","n11")]="Gestural";
  }

  // ---- session-based assignment completion tracking ----
  function getSessionCompleted(){ try{ return new Set(JSON.parse(sessionStorage.getItem('rosterDone')||'[]')); }catch(e){ return new Set(); } }
  function markSessionCompleted(aid){ const s=getSessionCompleted(); s.add(aid); sessionStorage.setItem('rosterDone',JSON.stringify([...s])); }

  const $ = (s,r)=> (r||document).querySelector(s);
  const el = (tag,cls,html)=>{ const n=document.createElement(tag); if(cls)n.className=cls; if(html!=null)n.innerHTML=html; return n; };

  // progress over a set of [s,a] pairs
  function countDone(pairs){
    let d=0; pairs.forEach(([s,a])=>{ const v=state.scores[key(s,a)]; if(v!=null && v!=="") d++; }); return d;
  }
  function progressEl(done,total,label){
    const p = el("div","prog");
    const pct = total? Math.round(done/total*100):0;
    p.innerHTML = '<div class="bar"><i style="width:'+pct+'%"></i></div><div class="txt">'+done+' / '+total+' '+label+'</div>';
    return p;
  }

  function anno(top,left,text,arrow){
    const a = el("div","anno"); a.style.top=top; a.style.left=left; a.innerHTML=(arrow||"")+text; return a;
  }
  const ARR = '<svg class="arrow" viewBox="0 0 46 30" style="top:14px;left:-40px;transform:rotate(8deg)"><path d="M44 4 C 24 2, 8 10, 3 26 M3 26 l 9 -4 M3 26 l 1 -10"/></svg>';
  const ARRR = '<svg class="arrow" viewBox="0 0 46 30" style="top:14px;right:-40px;left:auto;transform:scaleX(-1) rotate(8deg)"><path d="M44 4 C 24 2, 8 10, 3 26 M3 26 l 9 -4 M3 26 l 1 -10"/></svg>';

  // ---- per-cell qualitative popover (prompting / accommodations / note) ----
  function hasQual(k){ return !!state.prompt[k]; }
  const NOTE_ICON='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>';
  function addCellNote(cell,inp,k){
    const nb=el("button","cellnote"+(hasQual(k)?" has":"")); nb.type="button"; nb.tabIndex=-1; nb.title="Prompting level (Tab)";
    nb.innerHTML=NOTE_ICON;
    nb.addEventListener("mousedown",e=>{ e.preventDefault(); openCellPopover(inp,nb); });
    cell.appendChild(nb);
  }
  let popEl=null;
  function closePop(){ if(popEl){ popEl.remove(); popEl=null; document.removeEventListener("mousedown",onDocDown,true); } }
  function onDocDown(e){ if(popEl && !popEl.contains(e.target)) closePop(); }
  function openCellPopover(inp,nb,nextFn){
    closePop();
    const s=STUDENTS.find(x=>x.id===inp.dataset.s), a=ASSIGNMENTS.find(x=>x.id===inp.dataset.a), k=key(s.id,a.id);
    const cur=state.prompt[k]||""; const isCustom=cur && PROMPTS.indexOf(cur)<0;
    const pop=el("div","cellpop rough"); popEl=pop;
    pop.innerHTML=
      '<label class="poplab">Prompting level</label>'+
      '<div class="popchips" data-grp="prompt">'+
        PROMPTS.map(p=>'<button type="button" class="chip'+(p===cur?' on':'')+'" data-v="'+p+'">'+p+'</button>').join('')+
        '<button type="button" class="chip '+(isCustom?'on':'add')+'" data-v="__c">'+(isCustom?'Custom':'\uFF0B Custom')+'</button>'+
      '</div>'+
      '<input class="popcustom" placeholder="Describe the support given\u2026" value="'+(isCustom?cur.replace(/"/g,'&quot;'):'')+'" style="display:'+(isCustom?'block':'none')+'">'+
      '<div class="pophint"><span class="kbd">Tab</span> through \u00b7 <span class="kbd">Esc</span> back to score</div>';
    document.body.appendChild(pop);
    const r=inp.getBoundingClientRect(), pw=272;
    let left=Math.max(12, Math.min(r.left-8, window.innerWidth-pw-12));
    pop.style.left=left+"px"; pop.style.width=pw+"px"; pop.style.top=(r.bottom+8)+"px";
    const ph=pop.offsetHeight;
    if(r.bottom+8+ph > window.innerHeight-10){ pop.style.top=Math.max(10, r.top-ph-8)+"px"; }
    const pills=[...pop.querySelectorAll('[data-grp="prompt"] .chip')], cust=pop.querySelector(".popcustom");
    function paintDot(){ if(nb){ nb.classList.toggle("has",hasQual(k)); } }
    function clearOn(){ pills.forEach(c=>c.classList.remove("on")); }
    pills.forEach(ch=>ch.addEventListener("click",()=>{
      const v=ch.dataset.v;
      if(v==="__c"){ cust.style.display="block"; clearOn(); ch.classList.add("on"); state.prompt[k]=cust.value||""; cust.focus(); }
      else { const isOn=state.prompt[k]===v; cust.style.display="none"; state.prompt[k]=isOn?"":v; clearOn(); if(!isOn) ch.classList.add("on"); }
      paintDot();
    }));
    cust.addEventListener("input",()=>{ state.prompt[k]=cust.value; paintDot(); });
    pop.addEventListener("keydown",e=>{
      if(e.key==="Escape"){ e.preventDefault(); closePop(); inp.focus(); return; }
      if(e.key==="Tab"){
        const foc=[...pills, (cust.style.display!=='none'?cust:null)].filter(Boolean);
        const idx=foc.indexOf(document.activeElement);
        if(e.shiftKey && idx===0){ e.preventDefault(); closePop(); inp.focus(); }
        else if(!e.shiftKey && idx===foc.length-1){ e.preventDefault(); closePop(); if(nextFn) nextFn(); else inp.focus(); }
      }
    });
    document.addEventListener("mousedown",onDocDown,true);
    setTimeout(()=>pills[0].focus(),0);
  }

  // Stable per-assignment subset, alphabetically sorted
  function studentsFor(aid){
    let h=0;
    for(let i=0;i<aid.length;i++) h=Math.imul(31,h)+aid.charCodeAt(i)|0;
    const seed=h>>>0;
    // subset size: 3 to 6 students, seeded per assignment
    let r=seed;
    const minN=3, maxN=Math.min(6,STUDENTS.length);
    r=((r*1664525)+1013904223)>>>0;
    const n=minN+(r%(maxN-minN+1));
    // seeded-shuffle a copy, take first n, sort alphabetically
    const arr=[...STUDENTS];
    let s2=seed;
    for(let i=arr.length-1;i>0;i--){
      s2=((s2*1664525)+1013904223)>>>0;
      const j=s2%(i+1);
      [arr[i],arr[j]]=[arr[j],arr[i]];
    }
    return arr.slice(0,n).sort((a,b)=>a.name.localeCompare(b.name));
  }

  // Online-completed students — seeded 0–2 per assignment, from students NOT in the paper list
  function onlineStudentsFor(aid, paperStudents){
    const paperIds=new Set(paperStudents.map(s=>s.id));
    const pool=STUDENTS.filter(s=>!paperIds.has(s.id));
    if(!pool.length) return [];
    let h=0;
    for(let i=0;i<aid.length;i++) h=Math.imul(53,h)+aid.charCodeAt(i)|0;
    const seed=(h^0xabcd1234)>>>0;
    let r=seed;
    r=((r*1664525)+1013904223)>>>0;
    const n=Math.min(r%3, pool.length); // 0,1,2
    if(!n) return [];
    const arr=[...pool];
    let s2=seed;
    for(let i=arr.length-1;i>0;i--){
      s2=((s2*1664525)+1013904223)>>>0;
      const j=s2%(i+1);
      [arr[i],arr[j]]=[arr[j],arr[i]];
    }
    return arr.slice(0,n).sort((a,b)=>a.name.localeCompare(b.name));
  }

  // Seeded online score for a student+assignment (80–100% of max)
  function onlineScore(s, aid){
    let h=0; const str=s.id+aid;
    for(let i=0;i<str.length;i++) h=Math.imul(31,h)+str.charCodeAt(i)|0;
    const r=(h>>>0)%21; // 0-20
    const max=s.max[aid]??s.defaultMax;
    return Math.round(max*(0.8+r*0.01));
  }

  // ============================================================
  // Subject icons — for Roster Run assignment pills
  // ============================================================
  const SUBJECTS = {
    math: { color:'#f5c842', stroke:'#7a6010',
      icon:'<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="5" height="5" rx="0.5"/><rect x="9" y="2" width="5" height="5" rx="0.5"/><rect x="2" y="9" width="5" height="5" rx="0.5"/><rect x="9" y="9" width="5" height="5" rx="0.5"/></svg>' },
    sci:  { color:'#6dd0c0', stroke:'#0d6e62',
      icon:'<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="8" cy="8" r="2"/><ellipse cx="8" cy="8" rx="6" ry="3"/><ellipse cx="8" cy="8" rx="6" ry="3" transform="rotate(60 8 8)"/><ellipse cx="8" cy="8" rx="6" ry="3" transform="rotate(120 8 8)"/></svg>' },
    ela:  { color:'#c4a0e8', stroke:'#5a2e8a',
      icon:'<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M2 13V4.5A1.5 1.5 0 0 1 3.5 3H9v10H3.5A1.5 1.5 0 0 0 2 14.5"/><path d="M9 3h2.5A1.5 1.5 0 0 1 13 4.5V13h-4M5 7h2M5 10h2"/></svg>' },
    ss:   { color:'#87c4e8', stroke:'#1a4e75',
      icon:'<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="8" cy="8" r="5.5"/><path d="M2.5 8h11M8 2.5c-1.5 1.5-2 3.5-2 5.5s.5 4 2 5.5M8 2.5c1.5 1.5 2 3.5 2 5.5s-.5 4-2 5.5"/></svg>' },
  };
  function subjectOf(id){
    const n=parseInt(id.slice(1));
    if(n<=17)  return 'sci';   // Exploring Patterns
    if(n<=95)  return 'math';  // Algebraic Thinking (add + sub) + Expanding Addition
    if(n<=121) return 'math';  // Exploring Place Value
    if(n<=146) return 'ss';    // Exploring Time
    if(n<=178) return 'sci';   // Exploring Shapes
    if(n<=195) return 'sci';   // Exploring Measurement
    return 'ss';               // Exploring Money
  }
  function subjectBadge(id){
    const s=SUBJECTS[subjectOf(id)];
    return '<span style="display:inline-flex;align-items:center;justify-content:center;width:20px;height:20px;min-width:20px;border-radius:4px;background:'+s.color+';color:'+s.stroke+';flex-shrink:0;">'+s.icon+'</span>';
  }

  // ============================================================
  // Assignment header — subject icon + title + date + progress + archive
  // ============================================================
  function makeAsgHeader(asg, aid, done, total){
    const subj=SUBJECTS[subjectOf(aid)];
    const wrap=el("div");
    wrap.style.cssText="padding:2px 0 14px;display:flex;flex-direction:column;gap:8px;width:100%;";
    const r1=el("div"); r1.style.cssText="display:flex;align-items:center;gap:10px;";
    const ico=el("span"); ico.innerHTML=subj.icon;
    ico.style.cssText='display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;min-width:28px;border-radius:6px;background:'+subj.color+';color:'+subj.stroke+';flex-shrink:0;';
    const ttl=el("span"); ttl.textContent=asg.name;
    ttl.style.cssText="font-family:Kalam,cursive;font-size:18px;font-weight:700;color:var(--ink);line-height:1.2;";
    r1.appendChild(ico); r1.appendChild(ttl);
    const r2=el("div"); r2.style.cssText="display:flex;align-items:center;gap:12px;";
    const dateEl=el("span"); dateEl.textContent="Available "+asg.available;
    dateEl.style.cssText="font-family:Kalam,cursive;font-size:13px;color:var(--ink2);white-space:nowrap;flex-shrink:0;";
    const progWrap=el("div"); progWrap.style.cssText="flex:1;min-width:0;";
    const prog=progressEl(done,total,"students"); progWrap.appendChild(prog);
    const archBtn=el("button"); archBtn.type="button"; archBtn.title="Archive assignment";
    archBtn.innerHTML='<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="15" height="15"><polyline points="2 4 3.5 14 12.5 14 14 4"/><line x1="1" y1="4" x2="15" y2="4"/><path d="M6 4V2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V4"/><line x1="6.5" y1="7" x2="6.5" y2="11"/><line x1="9.5" y1="7" x2="9.5" y2="11"/></svg>';
    archBtn.title="Archive";
    archBtn.style.cssText="padding:6px;border:1.5px dashed var(--line-soft);border-radius:7px;background:transparent;color:var(--ink3);cursor:pointer;display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;margin-left:auto;";
    r2.appendChild(dateEl); r2.appendChild(progWrap); r2.appendChild(archBtn);
    wrap.appendChild(r1); wrap.appendChild(r2);
    return wrap;
  }


  // ============================================================
  // DIRECTION C — ROSTER RUN (single column, one assignment)
  // ============================================================
  function renderC(){
    // Capture scroll position before DOM teardown so we can restore it instantly
    const _oldPillRow=document.querySelector(".pill-strip");
    if(_oldPillRow) state.pillScrollLeft=_oldPillRow.scrollLeft;
    const root=$("#dirC"); root.innerHTML=""; root.style.position="relative";
    // session-aware assignment filtering
    const sessionDone=getSessionCompleted();
    // precompute completion map once (avoids 203 × 8 repeated checks)
    const doneMap=new Map(ASSIGNMENTS.map(a=>[a.id,STUDENTS.every(s=>{ const v=state.scores[key(s.id,a.id)]; return v!=null&&v!==""; })]));
    const isAsgDone=(a)=>doneMap.get(a.id);
    const hiddenCompleted=ASSIGNMENTS.filter(a=>isAsgDone(a)&&!sessionDone.has(a.id));
    let visibleAsgs=state.showCompleted?ASSIGNMENTS:ASSIGNMENTS.filter(a=>!isAsgDone(a)||sessionDone.has(a.id));
    if(visibleAsgs.length===0) visibleAsgs=ASSIGNMENTS; // fallback: all done
    if(!visibleAsgs.find(a=>a.id===state.rosterA)) state.rosterA=(visibleAsgs[0]||ASSIGNMENTS[0]).id;
    const aid=state.rosterA;
    const asg=ASSIGNMENTS.find(a=>a.id===aid);

    // ---- Two-column layout: assignment sidebar (left) + student panel (right) ----
    if(_pillDropHandler) document.removeEventListener("click",_pillDropHandler);
    _pillDropHandler=null;

    const mainWrap=el("div");
    mainWrap.style.cssText="display:flex;align-items:flex-start;gap:0;width:100%;";

    // ---- LEFT: Assignment sidebar ----
    const sidebar=el("div");
    sidebar.style.cssText="width:290px;flex-shrink:0;display:flex;flex-direction:column;border-right:1.8px dashed var(--line-soft);margin-right:20px;padding-right:14px;";

    // Filter input
    const filterWrap=el("div"); filterWrap.style.cssText="padding-bottom:8px;";
    const filterInp=el("input");
    filterInp.placeholder="Search assignments…";
    filterInp.value=state.asgFilter||'';
    filterInp.style.cssText="width:100%;font-family:Kalam,cursive;font-size:14px;font-weight:700;padding:7px 10px;border:1.8px solid var(--line);border-radius:8px 7px 9px 6px;background:var(--shade);color:var(--ink);outline:none;box-sizing:border-box;";
    filterWrap.appendChild(filterInp);
    sidebar.appendChild(filterWrap);

    // Assignment list (scrollable)
    const asgListEl=el("div");
    asgListEl.style.cssText="overflow-y:auto;display:flex;flex-direction:column;gap:2px;max-height:520px;scrollbar-width:thin;padding-right:2px;";
    sidebar.appendChild(asgListEl);

    function buildAsgList(filter){
      asgListEl.innerHTML='';
      const filtered=visibleAsgs.filter(a=>!filter||a.name.toLowerCase().includes(filter.toLowerCase()));
      filtered.forEach(a=>{
        const isActive=a.id===aid;
        const done=isAsgDone(a);
        const cnt=STUDENTS.filter(s=>{ const v=state.scores[key(s.id,a.id)]; return v!=null&&v!==""; }).length;
        const badge=done?'<span style="font-size:12px;color:var(--ink2);">✓</span>':cnt>0?'<span style="font-size:12px;color:var(--ink2);">'+cnt+'/'+STUDENTS.length+'</span>':'';
        const item=el("div");
        item.dataset.aid=a.id;
        item.style.cssText='display:flex;align-items:center;gap:9px;padding:8px 10px;border-radius:8px 7px 9px 6px;cursor:pointer;border:1.5px solid '+(isActive?'var(--hi-edge)':'transparent')+';background:'+(isActive?'var(--hi)':'transparent')+';';
        item.innerHTML=subjectBadge(a.id)+'<span style="font-family:Kalam,cursive;font-size:14px;font-weight:700;flex:1;line-height:1.3;color:var(--ink);">'+a.name+'</span>'+badge;
        item.addEventListener("click",()=>{ state.rosterA=a.id; renderC(); });
        item.addEventListener("mouseenter",()=>{ if(!isActive) item.style.background='var(--shade)'; });
        item.addEventListener("mouseleave",()=>{ if(!isActive) item.style.background='transparent'; });
        asgListEl.appendChild(item);
      });
      return filtered;
    }

    buildAsgList(state.asgFilter||'');

    filterInp.addEventListener("input",()=>{
      state.asgFilter=filterInp.value;
      const filtered=buildAsgList(filterInp.value);
      if(filtered.length&&!filtered.find(a=>a.id===aid)){
        state.rosterA=filtered[0].id; renderC();
      }
    });

    // Scroll active item into view
    requestAnimationFrame(()=>{
      const activeItem=asgListEl.querySelector('[data-aid="'+aid+'"]');
      if(activeItem){
        const itemTop=activeItem.offsetTop;
        const itemBot=itemTop+activeItem.offsetHeight;
        const st=asgListEl.scrollTop, h=asgListEl.clientHeight;
        if(itemTop<st) asgListEl.scrollTop=itemTop-8;
        else if(itemBot>st+h) asgListEl.scrollTop=itemBot-h+8;
      }
    });

    // ↑↓ keyboard navigation
    if(_asgKeyHandler) document.removeEventListener("keydown",_asgKeyHandler);
    _asgKeyHandler=(e)=>{
      if(state.dir!=="C") return;
      if(e.key!=="ArrowUp"&&e.key!=="ArrowDown") return;
      const focused=document.activeElement;
      if(focused&&focused.matches("input,textarea")&&focused!==filterInp&&!focused.classList.contains("rosterIn")) return;
      e.preventDefault();
      const filter=state.asgFilter||'';
      const filtered=visibleAsgs.filter(a=>!filter||a.name.toLowerCase().includes(filter.toLowerCase()));
      const idx=filtered.findIndex(a=>a.id===aid);
      const next=e.key==="ArrowDown"?idx+1:idx-1;
      if(next>=0&&next<filtered.length){ state.rosterA=filtered[next].id; renderC(); }
    };
    document.addEventListener("keydown",_asgKeyHandler);

    mainWrap.appendChild(sidebar);

    // ---- RIGHT: Student panel ----
    const studentPanel=el("div");
    studentPanel.style.cssText="flex:1;min-width:0;display:flex;flex-direction:column;gap:9px;";

    const rosterStudents=studentsFor(aid);
    const onlineStudents=onlineStudentsFor(aid,rosterStudents);
    onlineStudents.forEach(s=>{ const k=key(s.id,aid); if(state.scores[k]==null) state.scores[k]=onlineScore(s,aid); });
    const allPairs=[...rosterStudents,...onlineStudents].map(s=>[s.id,aid]);
    const prog=progressEl(countDone(allPairs),allPairs.length,"students");
    prog.style.cssText="width:100%;margin-bottom:4px;";
    studentPanel.appendChild(makeAsgHeader(asg,aid,countDone(allPairs),allPairs.length));

    const list=el("div"); list.style.cssText="display:flex;flex-direction:column;gap:9px;";

    function makeDetailPanel(s,k){
      const isCust=state.prompt[k]&&PROMPTS.indexOf(state.prompt[k])<0;
      const det=el("div","rDetail");
      det.style.cssText="display:none;width:100%;padding-top:11px;margin-top:10px;border-top:1.6px dashed var(--line-soft);";
      det.innerHTML=
        '<div class="lab" style="font-size:12px;color:var(--ink2);font-weight:700;margin-bottom:6px;text-transform:uppercase;letter-spacing:.4px;">Prompting level</div>'+
        '<div class="rPromptChips" style="display:flex;flex-wrap:wrap;gap:7px;margin-bottom:10px;">'+
          PROMPTS.map(p=>'<button type="button" class="chip'+(state.prompt[k]===p?' on':'')+'" data-v="'+p+'">'+p+'</button>').join('')+
          '<button type="button" class="chip '+(isCust?'on':'add')+'" data-v="__c">'+(isCust?'Custom':'＋ Custom')+'</button>'+
        '</div>'+
        '<input class="rCustInp" placeholder="Describe the support given…" value="'+(isCust?(state.prompt[k]||''):'').replace(/"/g,'&quot;')+'" style="display:'+(isCust?'block':'none')+'">'+
        '<div class="lab" style="font-size:12px;color:var(--ink2);font-weight:700;margin:10px 0 4px;text-transform:uppercase;letter-spacing:.4px;">Note</div>'+
        '<input class="rNoteInp" placeholder="optional observation…" value="'+(state.note[k]||'').replace(/"/g,'&quot;')+'">';
      return det;
    }

    // ---- paper students ----
    rosterStudents.forEach((s,ri)=>{
      const k=key(s.id,aid); const v=state.scores[k]; const abs=v==="abs";
      const row=el("div","rough soft rosterRow"); row.style.cssText="background:var(--panel);border-radius:11px;padding:11px 16px;display:flex;flex-wrap:wrap;align-items:center;gap:0;";
      const top=el("div"); top.style.cssText="display:flex;align-items:center;gap:14px;width:100%;";
      top.innerHTML='<span class="avatar">'+s.init+'</span><div style="display:flex;align-items:center;gap:8px;"><b style="font-size:17px;white-space:nowrap;min-width:120px;">'+s.name+'</b>'+lvlChip(s.lvl[aid]??s.defaultLvl)+'</div>';
      const scell=el("div","scell"); scell.style.cssText="margin-left:auto;";
      const inp=el("input","sin rosterIn"+(abs?" abs":"")); inp.inputMode="numeric"; inp.dataset.r=ri; inp.dataset.s=s.id;
      inp.value=abs?"Abs":(v!=null?v:"");
      const den=el("span","den","/"+(s.max[aid]??s.defaultMax));
      const nb=el("button","cellnote"+(state.prompt[k]?" has":"")); nb.type="button"; nb.tabIndex=-1; nb.title="Prompting level (Tab)"; nb.innerHTML=NOTE_ICON;
      scell.appendChild(inp); scell.appendChild(den); scell.appendChild(nb);
      top.appendChild(scell); row.appendChild(top);
      row.appendChild(makeDetailPanel(s,k));
      list.appendChild(row);
    });

    // ---- online divider + online students ----
    if(onlineStudents.length){
      const divider=el("div");
      divider.style.cssText="display:flex;align-items:center;gap:10px;margin:6px 0 2px;";
      divider.innerHTML='<span style="height:1.5px;flex:1;background:var(--line-soft);"></span>'+
        '<span style="font-family:Kalam,cursive;font-size:12px;font-weight:700;color:var(--ink2);white-space:nowrap;">Completed online ('+onlineStudents.length+')</span>'+
        '<span style="height:1.5px;flex:1;background:var(--line-soft);"></span>';
      list.appendChild(divider);

      onlineStudents.forEach((s,oi)=>{
        const k=key(s.id,aid); const score=state.scores[k]; const max=s.max[aid]??s.defaultMax;
        const hasNotes=!!(state.prompt[k]||state.note[k]);
        const row=el("div","rough soft rosterRow onlineRow");
        row.style.cssText="background:var(--panel);border-radius:11px;padding:11px 16px;display:flex;flex-wrap:wrap;align-items:center;gap:0;opacity:0.85;cursor:pointer;";
        const top=el("div"); top.style.cssText="display:flex;align-items:center;gap:14px;width:100%;";
        const onlineBadge='<span style="font-family:Kalam,cursive;font-size:11px;font-weight:700;padding:2px 8px;border-radius:20px;background:#e8f5ee;color:#1a7a45;border:1.5px solid #a8d8bc;white-space:nowrap;">Online ✓</span>';
        top.innerHTML='<span class="avatar" style="opacity:0.7;">'+s.init+'</span>'+
          '<div style="display:flex;align-items:center;gap:8px;"><b style="font-size:17px;white-space:nowrap;min-width:120px;">'+s.name+'</b>'+lvlChip(s.lvl[aid]??s.defaultLvl)+onlineBadge+'</div>';
        const scell=el("div","scell"); scell.style.cssText="margin-left:auto;display:flex;align-items:center;gap:4px;";
        scell.innerHTML='<span style="font-family:Kalam,cursive;font-size:20px;font-weight:700;color:var(--ink2);">'+score+'</span>'+
          '<span class="den">/'+max+'</span>';
        const nb=el("button","cellnote"+(hasNotes?" has":"")); nb.type="button"; nb.tabIndex=-1; nb.title="Notes & prompting"; nb.innerHTML=NOTE_ICON;
        scell.appendChild(nb); top.appendChild(scell); row.appendChild(top);
        const det=makeDetailPanel(s,k);
        row.appendChild(det);
        row.addEventListener("click",(e)=>{
          if(e.target.closest(".rCustInp,.rNoteInp,.rPromptChips")) return;
          const open=det.style.display==="block";
          det.style.display=open?"none":"block";
          row.classList.toggle("rosterActive",!open);
        });
        list.appendChild(row);
      });
    }

    studentPanel.appendChild(list); mainWrap.appendChild(studentPanel); root.appendChild(mainWrap);

    const keys=el("div","keys");
    keys.innerHTML='<span><span class="kbd">Enter</span> next student</span><span><span class="kbd">↑</span><span class="kbd">↓</span> prev / next assignment</span><span><span class="kbd">Tab</span> prompting &amp; note</span><span class="muted">· autosaves</span>';
    root.appendChild(keys);

    root.appendChild(anno("60px","auto","Pick the one assignment you just graded, then run straight down the roster."));
    const c1=$(".anno:last-child",root); c1.style.top="-6px"; c1.style.left="320px";
    root.appendChild(anno("auto","auto","Focused row auto-expands: prompting + a note are right there, no extra tap needed."+ARRR));
    const c2=$(".anno:last-child",root); c2.style.top="150px"; c2.style.right="14px"; c2.style.left="auto";

    // wiring
    const ins=[...root.querySelectorAll(".rosterIn")];
    const onlineRows=[...root.querySelectorAll(".onlineRow")];
    onlineRows.forEach(row=>{ row.tabIndex=0; });
    const allFocusables=[...ins,...onlineRows];
    function focusEl(el){ if(!el) return; if(el.tagName==="INPUT"){el.focus();el.select();}else el.focus(); }
    function focusNext(el){ const i=allFocusables.indexOf(el); if(i<allFocusables.length-1){ focusEl(allFocusables[i+1]); } else { const idx=visibleAsgs.findIndex(a=>a.id===aid); const next=visibleAsgs[idx+1]; if(next){state.rosterA=next.id;renderC();} } }
    function focusPrev(el){ const i=allFocusables.indexOf(el); if(i>0) focusEl(allFocusables[i-1]); }
    function activateRow(targetRow){
      root.querySelectorAll(".rosterRow").forEach(r=>{
        const on=r===targetRow; r.classList.toggle("rosterActive",on);
        r.querySelector(".rDetail").style.display=on?"block":"none";
      });
    }
    ins.forEach(inp=>{
      const ri=+inp.dataset.r;
      inp.addEventListener("focus",()=>activateRow(inp.closest(".rosterRow")));
      inp.addEventListener("blur",()=>{ setTimeout(()=>{ if(!inp.closest(".rosterRow").contains(document.activeElement)){ inp.closest(".rosterRow").classList.remove("rosterActive"); inp.closest(".rosterRow").querySelector(".rDetail").style.display="none"; }},80); });
      inp.addEventListener("input",()=>{ state.scores[key(inp.dataset.s,aid)]=inp.value.replace(/[^0-9]/g,""); inp.classList.remove("abs"); if(STUDENTS.every(s=>{ const v=state.scores[key(s.id,aid)]; return v!=null&&v!==""; })) markSessionCompleted(aid); });
      inp.addEventListener("keydown",e=>{
        if(e.key==="Enter"){ e.preventDefault(); e.shiftKey?focusPrev(inp):focusNext(inp); }
        else if(e.key==="Tab"&&!e.shiftKey){ e.preventDefault(); const fp=inp.closest(".rosterRow").querySelector(".rPromptChips .chip"); fp&&fp.focus(); }
        else if(e.key==="Tab"&&e.shiftKey){ e.preventDefault(); focusPrev(inp); }
        else if(e.key==="a"||e.key==="A"){ e.preventDefault(); state.scores[key(inp.dataset.s,aid)]="abs"; inp.value="Abs"; inp.classList.add("abs"); if(STUDENTS.every(s=>{ const v=state.scores[key(s.id,aid)]; return v!=null&&v!==""; })) markSessionCompleted(aid); focusNext(inp); }
      });
    });
    onlineRows.forEach(row=>{
      row.addEventListener("focus",()=>activateRow(row));
      row.addEventListener("blur",()=>{ setTimeout(()=>{ if(!row.contains(document.activeElement)){ row.classList.remove("rosterActive"); row.querySelector(".rDetail").style.display="none"; }},80); });
      row.addEventListener("keydown",e=>{
        if(e.key==="Enter"){ e.preventDefault(); focusNext(row); }
        else if(e.key==="ArrowDown"){ e.preventDefault(); focusNext(row); }
        else if(e.key==="ArrowUp"){ e.preventDefault(); focusPrev(row); }
        else if(e.key==="Escape"){ e.preventDefault(); focusPrev(row); }
      });
    });
    root.querySelectorAll(".rosterRow").forEach(row=>{
      const inp=$(".rosterIn",row); if(!inp) return;
      const k=key(inp.dataset.s,aid);
      const nb=row.querySelector(".cellnote");
      const pills=[...row.querySelectorAll(".rPromptChips .chip")];
      const cust=row.querySelector(".rCustInp"), note=row.querySelector(".rNoteInp");
      if(!nb||!cust||!note) return;
      function paintDot(){ if(nb) nb.classList.toggle("has",!!(state.prompt[k]||state.note[k])); }
      function clearOn(){ pills.forEach(c=>c.classList.remove("on")); }
      nb.addEventListener("mousedown",e=>{ e.preventDefault(); activateRow(row); setTimeout(()=>pills[0]&&pills[0].focus(),0); });
      pills.forEach(ch=>ch.addEventListener("click",()=>{
        const v=ch.dataset.v;
        if(v==="__c"){ cust.style.display="block"; clearOn(); ch.classList.add("on"); state.prompt[k]=cust.value||""; cust.focus(); }
        else{ const isOn=state.prompt[k]===v; cust.style.display="none"; state.prompt[k]=isOn?"":v; clearOn(); if(!isOn) ch.classList.add("on"); }
        paintDot();
      }));
      pills.forEach(ch=>ch.addEventListener("keydown",e=>{ if(e.key==="Enter") setTimeout(()=>focusNext(inp),0); }));
      cust.addEventListener("input",()=>{ state.prompt[k]=cust.value; paintDot(); });
      note.addEventListener("input",()=>{ state.note[k]=note.value; });
      row.addEventListener("keydown",e=>{
        if(e.key==="Escape"){ e.preventDefault(); inp.focus(); return; }
        if(e.key!=="Tab") return;
        const foc=[...pills,(cust.style.display!=="none"?cust:null),note].filter(Boolean);
        const idx=foc.indexOf(document.activeElement);
        if(e.shiftKey&&idx===0){ e.preventDefault(); inp.focus(); }
        else if(!e.shiftKey&&idx===foc.length-1){ e.preventDefault(); focusNext(inp); }
      });
    });
    // Auto-focus first input on assignment load
    requestAnimationFrame(()=>{ if(ins[0]){ ins[0].focus(); ins[0].select(); } });
  }

  // ============================================================
  // DIRECTION E — ROSTER RUN NARROW (horizontal pill strip)
  // ============================================================
  function renderE(){
    const _oldPillRow=document.querySelector(".pill-strip");
    if(_oldPillRow) state.pillScrollLeft=_oldPillRow.scrollLeft;
    const root=$("#dirE"); root.innerHTML=""; root.style.position="relative";
    const sessionDone=getSessionCompleted();
    const doneMap=new Map(ASSIGNMENTS.map(a=>[a.id,STUDENTS.every(s=>{ const v=state.scores[key(s.id,a.id)]; return v!=null&&v!==""; })]));
    const isAsgDone=(a)=>doneMap.get(a.id);
    let visibleAsgs=state.showCompleted?ASSIGNMENTS:ASSIGNMENTS.filter(a=>!isAsgDone(a)||sessionDone.has(a.id));
    if(visibleAsgs.length===0) visibleAsgs=ASSIGNMENTS;
    if(!visibleAsgs.find(a=>a.id===state.rosterA)) state.rosterA=(visibleAsgs[0]||ASSIGNMENTS[0]).id;
    const aid=state.rosterA;
    const asg=ASSIGNMENTS.find(a=>a.id===aid);

    // pill strip
    function makePillBtn(a){
      const isActive=a.id===aid;
      const done=isAsgDone(a);
      const cnt=STUDENTS.filter(s=>{ const v=state.scores[key(s.id,a.id)]; return v!=null&&v!==""; }).length;
      const b=el("button");
      const badge=done?'<span style="font-size:12px;opacity:0.8;">✓</span>':cnt>0?'<span style="font-size:12px;font-weight:400;opacity:0.7;">'+cnt+'/'+STUDENTS.length+'</span>':'';
      b.innerHTML=subjectBadge(a.id)+'<span>'+a.name+'</span>'+badge;
      b.style.cssText='font-family:Kalam,cursive;font-size:15px;font-weight:700;padding:7px 14px;border:1.8px solid '+(isActive?'var(--hi-edge)':'var(--line)')+';border-radius:9px 8px 10px 7px;cursor:pointer;background:'+(isActive?'var(--hi)':'var(--panel)')+';color:var(--ink);white-space:nowrap;display:inline-flex;align-items:center;gap:8px;flex-shrink:0;';
      b.addEventListener("click",()=>{ state.rosterA=a.id; renderE(); });
      return b;
    }
    const pillOuter=el("div"); pillOuter.style.cssText="display:flex;align-items:center;gap:6px;width:100%;padding:4px 0 6px;";
    const pillRow=el("div"); pillRow.style.cssText="display:flex;gap:8px;align-items:center;overflow-x:auto;scroll-behavior:smooth;padding:2px 0;scrollbar-width:none;-ms-overflow-style:none;flex:1;min-width:0;";
    pillRow.innerHTML='<style>.pill-strip::-webkit-scrollbar{display:none}</style>';
    pillRow.classList.add("pill-strip");
    visibleAsgs.forEach(a=>pillRow.appendChild(makePillBtn(a)));
    function makeArrow(g){ const b=el("button"); b.innerHTML=g; b.style.cssText='flex-shrink:0;width:36px;height:36px;font-family:Kalam,cursive;font-size:22px;font-weight:700;border:1.8px solid var(--line);border-radius:8px 7px 9px 6px;background:var(--panel);color:var(--ink2);cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:2px 2px 0 rgba(0,0,0,.08);'; return b; }
    const prevBtn=makeArrow('‹'), nextBtn=makeArrow('›');
    function updateArrows(){ prevBtn.style.opacity=pillRow.scrollLeft<4?'0.3':'1'; prevBtn.style.pointerEvents=pillRow.scrollLeft<4?'none':'auto'; const atEnd=pillRow.scrollLeft>=pillRow.scrollWidth-pillRow.clientWidth-4; nextBtn.style.opacity=atEnd?'0.3':'1'; nextBtn.style.pointerEvents=atEnd?'none':'auto'; }
    prevBtn.addEventListener("click",()=>pillRow.scrollBy({left:-260,behavior:'smooth'}));
    nextBtn.addEventListener("click",()=>pillRow.scrollBy({left:260,behavior:'smooth'}));
    pillRow.addEventListener("scroll",updateArrows,{passive:true});
    pillOuter.appendChild(prevBtn); pillOuter.appendChild(pillRow); pillOuter.appendChild(nextBtn);
    requestAnimationFrame(()=>{
      if(state.pillScrollLeft!=null){ pillRow.style.scrollBehavior='auto'; pillRow.scrollLeft=state.pillScrollLeft; pillRow.style.scrollBehavior=''; }
      const activePill=[...pillRow.querySelectorAll("button")][visibleAsgs.findIndex(a=>a.id===aid)];
      if(activePill){ const rr=pillRow.getBoundingClientRect(), pr=activePill.getBoundingClientRect(); const t=pillRow.scrollLeft+(pr.left-rr.left)-(rr.width/2)+(pr.width/2); if(Math.abs(t-pillRow.scrollLeft)>4) pillRow.scrollTo({left:t,behavior:'smooth'}); }
      updateArrows();
    });
    if(_pillDropHandler) document.removeEventListener("click",_pillDropHandler); _pillDropHandler=null;
    if(_asgKeyHandler) document.removeEventListener("keydown",_asgKeyHandler);
    _asgKeyHandler=(e)=>{
      if(state.dir!=="E") return;
      if(e.key!=="ArrowLeft"&&e.key!=="ArrowRight") return;
      if(document.activeElement&&document.activeElement.matches("input,textarea")&&!document.activeElement.classList.contains("rosterIn")) return;
      e.preventDefault();
      const idx=visibleAsgs.findIndex(a=>a.id===aid);
      const next=e.key==="ArrowRight"?idx+1:idx-1;
      if(next>=0&&next<visibleAsgs.length){ state.rosterA=visibleAsgs[next].id; renderE(); }
    };
    document.addEventListener("keydown",_asgKeyHandler);

    const ctx=el("div","ctx");
    ctx.appendChild(pillOuter);
    const rosterStudents=studentsFor(aid);
    const onlineStudents=onlineStudentsFor(aid,rosterStudents);
    onlineStudents.forEach(s=>{ const k=key(s.id,aid); if(state.scores[k]==null) state.scores[k]=onlineScore(s,aid); });
    const allPairs=[...rosterStudents,...onlineStudents].map(s=>[s.id,aid]);
    ctx.appendChild(makeAsgHeader(asg,aid,countDone(allPairs),allPairs.length));
    root.appendChild(ctx);

    const list=el("div"); list.style.cssText="display:flex;flex-direction:column;gap:9px;";
    function makeDetailPanelE(s,k){ const isCust=state.prompt[k]&&PROMPTS.indexOf(state.prompt[k])<0; const det=el("div","rDetail"); det.style.cssText="display:none;width:100%;padding-top:11px;margin-top:10px;border-top:1.6px dashed var(--line-soft);"; det.innerHTML='<div class="lab" style="font-size:12px;color:var(--ink2);font-weight:700;margin-bottom:6px;text-transform:uppercase;letter-spacing:.4px;">Prompting level</div><div class="rPromptChips" style="display:flex;flex-wrap:wrap;gap:7px;margin-bottom:10px;">'+PROMPTS.map(p=>'<button type="button" class="chip'+(state.prompt[k]===p?' on':'')+'" data-v="'+p+'">'+p+'</button>').join('')+'<button type="button" class="chip '+(isCust?'on':'add')+'" data-v="__c">'+(isCust?'Custom':'＋ Custom')+'</button></div><input class="rCustInp" placeholder="Describe the support given…" value="'+(isCust?(state.prompt[k]||''):'').replace(/"/g,'&quot;')+'" style="display:'+(isCust?'block':'none')+'"><div class="lab" style="font-size:12px;color:var(--ink2);font-weight:700;margin:10px 0 4px;text-transform:uppercase;letter-spacing:.4px;">Note</div><input class="rNoteInp" placeholder="optional observation…" value="'+(state.note[k]||'').replace(/"/g,'&quot;')+'">'; return det; }

    rosterStudents.forEach((s,ri)=>{
      const k=key(s.id,aid); const v=state.scores[k]; const abs=v==="abs";
      const row=el("div","rough soft rosterRow"); row.style.cssText="background:var(--panel);border-radius:11px;padding:11px 16px;display:flex;flex-wrap:wrap;align-items:center;gap:0;";
      const top=el("div"); top.style.cssText="display:flex;align-items:center;gap:14px;width:100%;";
      top.innerHTML='<span class="avatar">'+s.init+'</span><div style="display:flex;align-items:center;gap:8px;"><b style="font-size:17px;white-space:nowrap;min-width:120px;">'+s.name+'</b>'+lvlChip(s.lvl[aid]??s.defaultLvl)+'</div>';
      const scell=el("div","scell"); scell.style.cssText="margin-left:auto;";
      const inp=el("input","sin rosterIn"+(abs?" abs":"")); inp.inputMode="numeric"; inp.dataset.r=ri; inp.dataset.s=s.id; inp.value=abs?"Abs":(v!=null?v:"");
      const den=el("span","den","/"+(s.max[aid]??s.defaultMax));
      const nb=el("button","cellnote"+(state.prompt[k]?" has":"")); nb.type="button"; nb.tabIndex=-1; nb.innerHTML=NOTE_ICON;
      scell.appendChild(inp); scell.appendChild(den); scell.appendChild(nb); top.appendChild(scell); row.appendChild(top);
      row.appendChild(makeDetailPanelE(s,k)); list.appendChild(row);
    });
    if(onlineStudents.length){
      const div2=el("div"); div2.style.cssText="display:flex;align-items:center;gap:10px;margin:6px 0 2px;"; div2.innerHTML='<span style="height:1.5px;flex:1;background:var(--line-soft);"></span><span style="font-family:Kalam,cursive;font-size:12px;font-weight:700;color:var(--ink2);white-space:nowrap;">Completed online ('+onlineStudents.length+')</span><span style="height:1.5px;flex:1;background:var(--line-soft);"></span>'; list.appendChild(div2);
      onlineStudents.forEach((s,oi)=>{
        const k=key(s.id,aid); const score=state.scores[k]; const max=s.max[aid]??s.defaultMax;
        const row=el("div","rough soft rosterRow onlineRow"); row.style.cssText="background:var(--panel);border-radius:11px;padding:11px 16px;display:flex;flex-wrap:wrap;align-items:center;gap:0;opacity:0.85;cursor:pointer;";
        const top=el("div"); top.style.cssText="display:flex;align-items:center;gap:14px;width:100%;";
        const onlineBadge='<span style="font-family:Kalam,cursive;font-size:11px;font-weight:700;padding:2px 8px;border-radius:20px;background:#e8f5ee;color:#1a7a45;border:1.5px solid #a8d8bc;white-space:nowrap;">Online ✓</span>';
        top.innerHTML='<span class="avatar" style="opacity:0.7;">'+s.init+'</span><div style="display:flex;align-items:center;gap:8px;"><b style="font-size:17px;white-space:nowrap;min-width:120px;">'+s.name+'</b>'+lvlChip(s.lvl[aid]??s.defaultLvl)+onlineBadge+'</div>';
        const scell=el("div","scell"); scell.style.cssText="margin-left:auto;display:flex;align-items:center;gap:4px;";
        scell.innerHTML='<span style="font-family:Kalam,cursive;font-size:20px;font-weight:700;color:var(--ink2);">'+score+'</span><span class="den">/'+max+'</span>';
        const nb=el("button","cellnote"+((!!(state.prompt[k]||state.note[k]))?" has":"")); nb.type="button"; nb.tabIndex=-1; nb.innerHTML=NOTE_ICON;
        scell.appendChild(nb); top.appendChild(scell); row.appendChild(top);
        const det=makeDetailPanelE(s,k); row.appendChild(det);
        row.addEventListener("click",(e)=>{ if(e.target.closest(".rCustInp,.rNoteInp,.rPromptChips")) return; const open=det.style.display==="block"; det.style.display=open?"none":"block"; row.classList.toggle("rosterActive",!open); });
        list.appendChild(row);
      });
    }
    const panel=el("div"); panel.appendChild(list); root.appendChild(panel);

    const keys=el("div","keys"); keys.innerHTML='<span><span class="kbd">Enter</span> next student</span><span><span class="kbd">↑</span><span class="kbd">↓</span> prev / next assignment</span><span><span class="kbd">Tab</span> prompting &amp; note</span><span class="muted">· autosaves</span>';
    root.appendChild(keys);

    // wiring
    const ins=[...root.querySelectorAll(".rosterIn")];
    const onlineRows=[...root.querySelectorAll(".onlineRow")];
    onlineRows.forEach(row=>{ row.tabIndex=0; });
    const allFocusables=[...ins,...onlineRows];
    function focusEl(el){ if(!el) return; if(el.tagName==="INPUT"){el.focus();el.select();}else el.focus(); }
    function focusNext(el){ const i=allFocusables.indexOf(el); if(i<allFocusables.length-1){ focusEl(allFocusables[i+1]); } else { const idx=visibleAsgs.findIndex(a=>a.id===aid); const next=visibleAsgs[idx+1]; if(next){state.rosterA=next.id;renderE();} } }
    function focusPrev(el){ const i=allFocusables.indexOf(el); if(i>0) focusEl(allFocusables[i-1]); }
    function activateRowE(targetRow){
      root.querySelectorAll(".rosterRow").forEach(r=>{
        const on=r===targetRow; r.classList.toggle("rosterActive",on);
        r.querySelector(".rDetail").style.display=on?"block":"none";
      });
    }
    ins.forEach(inp=>{
      const ri=+inp.dataset.r;
      inp.addEventListener("focus",()=>activateRowE(inp.closest(".rosterRow")));
      inp.addEventListener("blur",()=>{ setTimeout(()=>{ if(!inp.closest(".rosterRow").contains(document.activeElement)){ inp.closest(".rosterRow").classList.remove("rosterActive"); inp.closest(".rosterRow").querySelector(".rDetail").style.display="none"; }},80); });
      inp.addEventListener("input",()=>{ state.scores[key(inp.dataset.s,aid)]=inp.value.replace(/[^0-9]/g,""); inp.classList.remove("abs"); if(STUDENTS.every(s=>{ const v=state.scores[key(s.id,aid)]; return v!=null&&v!==""; })) markSessionCompleted(aid); });
      inp.addEventListener("keydown",e=>{
        if(e.key==="Enter"){ e.preventDefault(); e.shiftKey?focusPrev(inp):focusNext(inp); }
        else if(e.key==="Tab"&&!e.shiftKey){ e.preventDefault(); const fp=inp.closest(".rosterRow").querySelector(".rPromptChips .chip"); fp&&fp.focus(); }
        else if(e.key==="Tab"&&e.shiftKey){ e.preventDefault(); focusPrev(inp); }
        else if(e.key==="a"||e.key==="A"){ e.preventDefault(); state.scores[key(inp.dataset.s,aid)]="abs"; inp.value="Abs"; inp.classList.add("abs"); if(STUDENTS.every(s=>{ const v=state.scores[key(s.id,aid)]; return v!=null&&v!==""; })) markSessionCompleted(aid); focusNext(inp); }
      });
    });
    onlineRows.forEach(row=>{
      row.addEventListener("focus",()=>activateRowE(row));
      row.addEventListener("blur",()=>{ setTimeout(()=>{ if(!row.contains(document.activeElement)){ row.classList.remove("rosterActive"); row.querySelector(".rDetail").style.display="none"; }},80); });
      row.addEventListener("keydown",e=>{
        if(e.key==="Enter"){ e.preventDefault(); focusNext(row); }
        else if(e.key==="ArrowDown"){ e.preventDefault(); focusNext(row); }
        else if(e.key==="ArrowUp"){ e.preventDefault(); focusPrev(row); }
        else if(e.key==="Escape"){ e.preventDefault(); focusPrev(row); }
      });
    });
    root.querySelectorAll(".rosterRow").forEach(row=>{
      const inp=$(".rosterIn",row); if(!inp) return;
      const k=key(inp.dataset.s,aid);
      const nb=row.querySelector(".cellnote");
      const pills=[...row.querySelectorAll(".rPromptChips .chip")];
      const cust=row.querySelector(".rCustInp"), note=row.querySelector(".rNoteInp");
      if(!nb||!cust||!note) return;
      function paintDot(){ if(nb) nb.classList.toggle("has",!!(state.prompt[k]||state.note[k])); }
      function clearOn(){ pills.forEach(c=>c.classList.remove("on")); }
      nb.addEventListener("mousedown",e=>{ e.preventDefault(); activateRowE(row); setTimeout(()=>pills[0]&&pills[0].focus(),0); });
      pills.forEach(ch=>ch.addEventListener("click",()=>{
        const v=ch.dataset.v;
        if(v==="__c"){ cust.style.display="block"; clearOn(); ch.classList.add("on"); state.prompt[k]=cust.value||""; cust.focus(); }
        else{ const isOn=state.prompt[k]===v; cust.style.display="none"; state.prompt[k]=isOn?"":v; clearOn(); if(!isOn) ch.classList.add("on"); }
        paintDot();
      }));
      pills.forEach(ch=>ch.addEventListener("keydown",e=>{ if(e.key==="Enter") setTimeout(()=>focusNext(inp),0); }));
      cust.addEventListener("input",()=>{ state.prompt[k]=cust.value; paintDot(); });
      note.addEventListener("input",()=>{ state.note[k]=note.value; });
      row.addEventListener("keydown",e=>{
        if(e.key==="Escape"){ e.preventDefault(); inp.focus(); return; }
        if(e.key!=="Tab") return;
        const foc=[...pills,(cust.style.display!=="none"?cust:null),note].filter(Boolean);
        const idx=foc.indexOf(document.activeElement);
        if(e.shiftKey&&idx===0){ e.preventDefault(); inp.focus(); }
        else if(!e.shiftKey&&idx===foc.length-1){ e.preventDefault(); focusNext(inp); }
      });
    });
    // Auto-focus first input on assignment load
    requestAnimationFrame(()=>{ if(ins[0]){ ins[0].focus(); ins[0].select(); } });
  }

  // ============================================================
  // shell wiring
  // ============================================================
  const LEAF={C:"Enter scores · roster (wide)",E:"Enter scores · roster (narrow)"};
  function renderCurrent(){ ({C:renderC,E:renderE})[state.dir](); }
  function renderAll(){ renderCurrent(); } // only render active tab; others render lazily on switch

  function switchTab(dir){
    state.dir=dir;
    document.querySelectorAll(".tab").forEach(t=>t.classList.toggle("active",t.dataset.dir===dir));
    ["C","E"].forEach(d=>$("#dir"+d).classList.toggle("active",d===dir));
    $("#crumbLeaf").textContent=LEAF[dir];
    renderCurrent();
  }

  document.getElementById("tabs").addEventListener("click",e=>{ const t=e.target.closest(".tab"); if(t) switchTab(t.dataset.dir); });
  document.getElementById("togFill").addEventListener("click",function(){ this.classList.toggle("on"); $(".box",this).textContent=this.classList.contains("on")?"✓":""; state.filled=this.classList.contains("on"); seed(); renderAll(); });

  // init
  seed();
  renderAll();
})();
