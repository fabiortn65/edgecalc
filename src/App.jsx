import { useState } from "react";

/* ─── TOKENS ─────────────────────────────────────────────────── */
const C = {
  bg:"#070E1C", sidebar:"#0A1528", card:"#0D1E3A",
  border:"#162847", borderBright:"#1E3D6B",
  accent:"#00C2FF", accentGlow:"#00C2FF44",
  profit:"#00FF9D", profitGlow:"#00FF9D33",
  loss:"#FF4757", lossGlow:"#FF475733",
  warn:"#FFB800", warnGlow:"#FFB80033",
  purple:"#A78BFA", orange:"#FB923C",
  text:"#E8F4FF", textSec:"#6A90B8", textDim:"#334D6E",
  guideB:"#081510", guideBor:"#1A4A2A",
};

const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&family=Inter:wght@400;500;600;700&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  ::-webkit-scrollbar { width: 6px; height: 6px; }
  ::-webkit-scrollbar-track { background: #070E1C; }
  ::-webkit-scrollbar-thumb { background: #1E3D6B; border-radius: 3px; }
  @keyframes gridMove { from{background-position:0 0} to{background-position:0 60px} }
  @keyframes pulseGlow { 0%,100%{opacity:.4} 50%{opacity:.9} }
  @keyframes fadeInUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
  .ec-input:focus { border-color:#00C2FF!important; box-shadow:0 0 0 3px #00C2FF15; }
  .ec-btn:hover { filter:brightness(1.15); transform:translateY(-1px); box-shadow:0 4px 20px #00C2FF40; }
  .ec-btn:active { transform:translateY(0); }
  .ec-nav:hover { background:#00C2FF0D!important; color:#7DD8F0!important; }
  .ec-card { animation:fadeInUp .25s ease; }
  .step-card:hover { border-color:#1E3D6B!important; background:#0F2244!important; }
  .phase-tab { transition:all .15s; }
`;

/* ─── BACKGROUND ─────────────────────────────────────────────── */
function GridBackground() {
  return (
    <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0,overflow:"hidden"}}>
      <div style={{position:"absolute",inset:0,backgroundImage:`linear-gradient(${C.border}44 1px,transparent 1px),linear-gradient(90deg,${C.border}44 1px,transparent 1px)`,backgroundSize:"60px 60px",animation:"gridMove 8s linear infinite",opacity:.35}}/>
      <div style={{position:"absolute",top:-200,left:-200,width:600,height:600,borderRadius:"50%",background:`radial-gradient(circle,${C.accentGlow} 0%,transparent 70%)`,animation:"pulseGlow 4s ease-in-out infinite"}}/>
      <div style={{position:"absolute",bottom:-200,right:-200,width:500,height:500,borderRadius:"50%",background:`radial-gradient(circle,#1A3A6A88 0%,transparent 70%)`,animation:"pulseGlow 6s ease-in-out infinite"}}/>
      <div style={{position:"absolute",top:"40%",right:"10%",width:300,height:300,borderRadius:"50%",background:`radial-gradient(circle,${C.profitGlow} 0%,transparent 70%)`,animation:"pulseGlow 5s ease-in-out infinite 1s"}}/>
      <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at center,transparent 40%,#070E1Caa 100%)"}}/>
    </div>
  );
}

/* ─── ICONS ──────────────────────────────────────────────────── */
const IconStrategy = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 11l3 3L22 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>);
const IconCS = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/><path d="M12 2C12 2 7 6 7 12s5 10 5 10" stroke="currentColor" strokeWidth="1.2" opacity=".6"/><path d="M12 2c0 0 5 4 5 10s-5 10-5 10" stroke="currentColor" strokeWidth="1.2" opacity=".6"/><line x1="2" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="1.2" opacity=".6"/><circle cx="12" cy="12" r="2" fill="currentColor"/></svg>);
const IconValue = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg>);
const IconKelly = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>);
const IconDutch = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M18 20V10M12 20V4M6 20v-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>);
const IconMasa = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><polyline points="2,18 8,10 13,14 20,5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="20" cy="5" r="2" fill="currentColor"/><line x1="2" y1="21" x2="22" y2="21" stroke="currentColor" strokeWidth="1.5" opacity=".4"/></svg>);
const IconPnL = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.8"/><path d="M8 21h8M12 17v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><path d="M7 10l3 3 2-2 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>);
const IconDelta = () => (<svg width="26" height="26" viewBox="0 0 32 32" fill="none"><polygon points="16,3 30,28 2,28" stroke="#00C2FF" strokeWidth="2" fill="none" strokeLinejoin="round"/><polygon points="16,10 24,25 8,25" fill="#00C2FF" opacity=".15"/><line x1="16" y1="13" x2="16" y2="21" stroke="#00C2FF" strokeWidth="1.5" opacity=".7"/><circle cx="16" cy="23" r="1.5" fill="#00C2FF" opacity=".7"/></svg>);

/* ─── SHARED COMPONENTS ──────────────────────────────────────── */
const card = {background:C.card,border:`1px solid ${C.border}`,borderRadius:10,padding:"20px 22px",position:"relative",overflow:"hidden"};
const cardDeco = (color) => ({position:"absolute",top:0,right:0,width:120,height:120,borderRadius:"50%",background:`radial-gradient(circle,${color}12 0%,transparent 70%)`,pointerEvents:"none"});
const inputStyle = {width:"100%",background:"#050D1A",border:`1px solid ${C.border}`,borderRadius:6,color:C.text,padding:"9px 12px",fontSize:14,fontFamily:"'JetBrains Mono',monospace",outline:"none",boxSizing:"border-box",marginBottom:12,transition:"border .15s"};
const btnStyle = (color=C.accent) => ({width:"100%",background:color,color:"#040C1A",border:"none",borderRadius:6,padding:"10px 20px",fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:"inherit",transition:"all .15s",marginTop:4});
const statBox = (color=C.accent) => ({background:"#050D1A",border:`1px solid ${C.border}`,borderRadius:6,padding:"10px 12px",marginBottom:8});

const PageHeader = ({icon, title, sub, color=C.accent}) => (
  <div style={{marginBottom:20}}>
    <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:4}}>
      <div style={{color,filter:`drop-shadow(0 0 8px ${color})`}}>{icon}</div>
      <div style={{fontSize:24,fontWeight:700,fontFamily:"'JetBrains Mono',monospace"}}>{title}</div>
    </div>
    <div style={{fontSize:13,color:C.textSec}}>{sub}</div>
  </div>
);

function GuidePanel({steps,tip}){
  const[open,setOpen]=useState(false);
  return(<div style={{marginBottom:20}}><button onClick={()=>setOpen(o=>!o)} style={{display:"flex",alignItems:"center",gap:8,background:"transparent",border:`1px solid ${C.guideBor}`,borderRadius:6,padding:"7px 14px",color:C.profit,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"Inter,sans-serif"}}><span style={{transform:open?"rotate(90deg)":"rotate(0deg)",display:"inline-block",transition:"transform .2s"}}>▸</span>{open?"Nascondi guida":"📖 Come si usa"}</button>{open&&(<div style={{background:C.guideB,border:`1px solid ${C.guideBor}`,borderRadius:8,padding:"18px 20px",marginTop:8,animation:"fadeInUp .2s ease"}}><div style={{display:"flex",flexDirection:"column",gap:10}}>{steps.map((s,i)=>(<div key={i} style={{display:"flex",gap:14,padding:"6px 8px"}}><div style={{minWidth:24,height:24,borderRadius:"50%",background:`${C.profit}15`,border:`1px solid ${C.profit}40`,color:C.profit,fontSize:11,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{i+1}</div><div><div style={{fontSize:13,fontWeight:600,color:C.text,marginBottom:2}}>{s.title}</div><div style={{fontSize:12,color:C.textSec,lineHeight:1.65}}>{s.desc}</div>{s.example&&<div style={{fontFamily:"monospace",fontSize:11,color:C.warn,background:"#1A150055",borderRadius:4,padding:"3px 8px",marginTop:4,display:"inline-block"}}>es. {s.example}</div>}</div></div>))}</div>{tip&&<div style={{marginTop:14,padding:"10px 14px",background:`${C.accent}08`,border:`1px solid ${C.accent}25`,borderRadius:6,fontSize:12,color:C.textSec,lineHeight:1.65}}><span style={{color:C.accent,fontWeight:600}}>💡 Pro tip: </span>{tip}</div>}</div>)}</div>);
}

/* ─── UTILS ──────────────────────────────────────────────────── */
const poisson=(l,k)=>{if(l<=0)return k===0?1:0;let p=-l+k*Math.log(l);for(let i=1;i<=k;i++)p-=Math.log(i);return Math.exp(p);};
const pMatrix=(lH,lA,max=5)=>{const m=[];for(let h=0;h<=max;h++){m[h]=[];for(let a=0;a<=max;a++)m[h][a]=poisson(lH,h)*poisson(lA,a);}return m;};
const bfRound=v=>Math.round(v*2)/2;
const f2=v=>(isNaN(v)||!isFinite(v)?"–":v.toFixed(2));
const f4=v=>(isNaN(v)||!isFinite(v)?"–":v.toFixed(4));
const pct=v=>(isNaN(v)||!isFinite(v)?"–":(v*100).toFixed(1)+"%");

function Gauge({value,min=-100,max=100,label,color}){
  const p=Math.max(0,Math.min(1,(value-min)/(max-min)));
  const angle=-140+p*280,r=52,cx=70,cy=70;
  const toXY=deg=>{const rad=(deg-90)*Math.PI/180;return[cx+r*Math.cos(rad),cy+r*Math.sin(rad)];};
  const arc=(s,e,radius)=>{const[x1,y1]=toXY(s);const[x2,y2]=toXY(e);return`M ${x1} ${y1} A ${radius} ${radius} 0 ${e-s>180?1:0} 1 ${x2} ${y2}`;};
  const[nx,ny]=[cx+(r-8)*Math.cos((angle-90)*Math.PI/180),cy+(r-8)*Math.sin((angle-90)*Math.PI/180)];
  return(<svg width="140" height="100" viewBox="0 0 140 100"><path d={arc(-140,140,r)} fill="none" stroke={C.border} strokeWidth="10" strokeLinecap="round"/><path d={arc(-140,-140+p*280,r)} fill="none" stroke={color} strokeWidth="10" strokeLinecap="round" style={{filter:`drop-shadow(0 0 6px ${color})`}}/><line x1={cx} y1={cy} x2={nx} y2={ny} stroke={color} strokeWidth="2" strokeLinecap="round"/><circle cx={cx} cy={cy} r="4" fill={color}/><text x={cx} y={cy+22} textAnchor="middle" fill={color} fontSize="13" fontFamily="JetBrains Mono" fontWeight="700">{value>0?"+":""}{typeof value==="number"?value.toFixed(1):value}</text><text x={cx} y={cy+34} textAnchor="middle" fill={C.textDim} fontSize="8" fontFamily="Inter">{label}</text></svg>);
}

function StakeBarChart({steps}){
  if(!steps||!steps.length)return null;
  const max=Math.max(...steps.map(s=>s.stake||0));
  return(<div style={{marginTop:16}}><div style={{fontSize:11,color:C.textDim,letterSpacing:2,textTransform:"uppercase",marginBottom:10}}>Stake per step</div><div style={{display:"flex",alignItems:"flex-end",gap:3,height:72}}>{steps.map((s,i)=>{const h=max>0?(s.stake/max)*66:3;return(<div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:2}}><div style={{width:"100%",height:h,background:`linear-gradient(to top,${C.accent},${C.accent}88)`,borderRadius:"3px 3px 0 0",minHeight:3,boxShadow:`0 0 6px ${C.accentGlow}`}}/><div style={{fontSize:8,color:C.textDim,fontFamily:"monospace"}}>{i+1}</div></div>);})}</div></div>);
}

/* ══════════════════════════════════════════════════════════════
   1. STRATEGY PAGE
══════════════════════════════════════════════════════════════ */
function StrategyPage(){
  const[phase,setPhase]=useState("overview");
  const[activeStep,setActiveStep]=useState(null);
  const phases=[{id:"overview",label:"📋 Il Metodo",color:C.accent},{id:"pre",label:"🔍 Prepartita",color:C.purple},{id:"live",label:"⚡ Live",color:C.warn},{id:"flow",label:"🔄 Flusso Completo",color:C.profit}];

  const overviewContent=(
    <div style={{animation:"fadeInUp .3s ease"}}>
      <div style={{...card,background:"linear-gradient(135deg,#0D1E3A,#0A1A2E)",borderColor:C.borderBright,marginBottom:16}}>
        <div style={cardDeco(C.accent)}/>
        <div style={{display:"flex",gap:20,alignItems:"flex-start"}}>
          <div style={{fontSize:48,lineHeight:1}}>🧠</div>
          <div><div style={{fontSize:20,fontWeight:700,fontFamily:"'JetBrains Mono',monospace",marginBottom:6}}>Il Metodo EdgeCalc</div><div style={{fontSize:14,color:C.textSec,lineHeight:1.75,maxWidth:700}}>Il betting intelligente non è fortuna — è <span style={{color:C.accent,fontWeight:600}}>matematica applicata al mercato</span>. Scommetti solo quando la quota è più alta del fair value calcolato dal modello. Questo vantaggio si chiama <em style={{color:C.profit}}>edge</em> e, se costante, genera profitto nel lungo periodo.</div></div>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:16}}>
        {[{n:"01",title:"Identifica il valore",icon:"🎯",desc:"CS Matrix confronta probabilità Poisson con quote Betfair e segnala dove il mercato sottovaluta un esito.",color:C.accent,tool:"CS Matrix"},{n:"02",title:"Valida la convenienza",icon:"⚖️",desc:"Value Finder calcola EV netto dopo commissione. Se negativo, passare oltre anche se sembra sicura.",color:C.purple,tool:"Value Finder"},{n:"03",title:"Gestisci il rischio",icon:"🛡️",desc:"Kelly, Dutching e Masaniello gestiscono la stake ottimale e distribuiscono il rischio sulla sequenza.",color:C.profit,tool:"Kelly / Masaniello"}].map(p=>(<div key={p.n} style={{...card,borderColor:`${p.color}44`,background:"linear-gradient(135deg,#0D1E3A,#090F1E)"}} className="ec-card"><div style={cardDeco(p.color)}/><div style={{display:"flex",justifyContent:"space-between",marginBottom:12}}><div style={{fontFamily:"monospace",fontSize:28,fontWeight:700,color:`${p.color}30`}}>{p.n}</div><div style={{fontSize:22}}>{p.icon}</div></div><div style={{fontSize:14,fontWeight:700,color:p.color,marginBottom:6}}>{p.title}</div><div style={{fontSize:12,color:C.textSec,lineHeight:1.65,marginBottom:10}}>{p.desc}</div><div style={{display:"inline-block",padding:"3px 8px",background:`${p.color}15`,border:`1px solid ${p.color}40`,borderRadius:4,fontSize:11,color:p.color,fontFamily:"monospace"}}>→ {p.tool}</div></div>))}
      </div>
      <div style={{...card,borderColor:`${C.warn}33`}}><div style={{display:"flex",gap:16}}><div style={{fontSize:28}}>⚠️</div><div><div style={{fontSize:14,fontWeight:700,color:C.warn,marginBottom:6}}>Il principio fondamentale</div><div style={{fontSize:13,color:C.textSec,lineHeight:1.75}}>EV positivo non garantisce la vincita singola — garantisce profitto <strong style={{color:C.text}}>nel lungo periodo</strong>. Il nemico non è la perdita: è <span style={{color:C.loss,fontWeight:600}}>cambiare metodo dopo una serie negativa</span>. Disciplina e volume sono i veri moltiplicatori.</div></div></div></div>
    </div>
  );

  const preSteps=[
    {n:1,title:"Seleziona la partita candidata",time:"Giorno prima",color:C.accent,icon:"📅",desc:"Cerca gare tra squadre difensive con bassa media xG. Non cercare la partita 'sicura' — cercala quella con edge.",action:"Dove cercarlo",actionDesc:"Understat.com → filtra per xG medio per partita sotto 1.1. Entrambe le squadre sotto 1.2 gol/partita nelle ultime 5.",tool:null},
    {n:2,title:"Calcola le probabilità (CS Matrix)",time:"2-3 ore prima",color:C.purple,icon:"⊞",desc:"Inserisci xG delle due squadre. Se prob 0-0 > 12% e quota Betfair > 8.5, hai un candidato valido.",action:"Cosa cercare",actionDesc:"Edge verde sulla cella 0-0 dopo aver inserito la quota Betfair. Controlla anche 1-0, 0-1 come alternative.",tool:"CS Matrix"},
    {n:3,title:"Valida con Value Finder",time:"1 ora prima",color:C.profit,icon:"◎",desc:"EV deve essere positivo dopo commissione 5%. Se sotto zero, la quota si è già abbassata troppo.",action:"Soglia minima",actionDesc:"EV > €3 per €100 di stake (ROI > 3%). Quota fair Back deve essere inferiore alla quota Betfair.",tool:"Value Finder"},
    {n:4,title:"Calcola la stake ottimale (Kelly)",time:"45 min prima",color:C.orange,icon:"💰",desc:"Kelly ti dice la % ideale del bankroll da rischiare in base all'edge. Usa Kelly frazionale ½ per ridurre la varianza.",action:"Parametri consigliati",actionDesc:"Kelly frazionale ½ o ¼ per il betting reale. Edge piccolo = stake piccola. Edge grande = stake più alta.",tool:"Kelly"},
    {n:5,title:"Più esiti con edge? Usa Dutching",time:"30 min prima",color:C.purple,icon:"⚖️",desc:"Se CS Matrix mostra edge su più celle (es. 0-0 + 1-0 + 0-1), distribuisci la stake con Dutching per coprirle tutte.",action:"Quando usarlo",actionDesc:"Quando almeno 2-3 celle della matrice mostrano edge verde e sono risultati compatibili (es. tutti Under 2.5).",tool:"Dutching"},
    {n:6,title:"Gestisci la sequenza (Masaniello)",time:"15 min prima",color:C.accent,icon:"⚡",desc:"Inserisci la partita nella sequenza Masaniello attiva. Il tool calcola la stake per lo step corrente con rounding Betfair.",action:"Alternativa a Kelly",actionDesc:"Usa Masaniello quando hai una sequenza omogenea di partite simili. Usa Kelly per singole scommesse indipendenti.",tool:"Masaniello"},
  ];

  const preContent=(
    <div style={{animation:"fadeInUp .3s ease"}}>
      <div style={{fontSize:16,fontWeight:700,marginBottom:4}}>🔍 Analisi Prepartita</div>
      <div style={{fontSize:13,color:C.textSec,marginBottom:20}}>Come selezionare la partita e calcolare la stake ottimale</div>
      {preSteps.map(s=>(<div key={s.n} className="step-card" onClick={()=>setActiveStep(activeStep===s.n?null:s.n)} style={{...card,marginBottom:10,borderColor:activeStep===s.n?`${s.color}66`:C.border,background:activeStep===s.n?"#0F2244":"#0D1E3A",cursor:"pointer",transition:"all .2s"}}>
        <div style={{display:"flex",gap:14,alignItems:"center"}}><div style={{minWidth:36,height:36,borderRadius:"50%",background:`${s.color}15`,border:`1px solid ${s.color}50`,color:s.color,fontSize:15,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{s.n}</div><div style={{flex:1}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><div style={{fontSize:14,fontWeight:600}}>{s.icon} {s.title}</div><div style={{display:"flex",gap:8,alignItems:"center"}}><span style={{fontSize:11,color:C.textDim,fontFamily:"monospace"}}>{s.time}</span>{s.tool&&<span style={{padding:"2px 7px",background:`${s.color}15`,border:`1px solid ${s.color}30`,borderRadius:3,fontSize:10,color:s.color,fontFamily:"monospace"}}>{s.tool}</span>}<span style={{color:C.textDim,transform:activeStep===s.n?"rotate(90deg)":"rotate(0deg)",display:"inline-block",transition:"transform .2s"}}>▸</span></div></div></div></div>
        {activeStep===s.n&&(<div style={{marginTop:14,paddingTop:14,borderTop:`1px solid ${C.border}`,animation:"fadeInUp .2s ease"}}><div style={{fontSize:13,color:C.textSec,lineHeight:1.7,marginBottom:12}}>{s.desc}</div><div style={{background:"#070E1C",border:`1px solid ${s.color}25`,borderRadius:6,padding:"10px 14px"}}><div style={{fontSize:11,color:s.color,fontWeight:600,marginBottom:4,textTransform:"uppercase",letterSpacing:1}}>{s.action}</div><div style={{fontSize:12,color:C.textSec,lineHeight:1.65}}>{s.actionDesc}</div></div></div>)}
      </div>))}
    </div>
  );

  const liveContent=(
    <div style={{animation:"fadeInUp .3s ease"}}>
      <div style={{fontSize:16,fontWeight:700,marginBottom:4}}>⚡ Strategia Live</div>
      <div style={{fontSize:13,color:C.textSec,marginBottom:20}}>Come gestire la posizione durante la partita con il P&L Simulator</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:16}}>
        {[{title:"Scenario A — 0-0 dopo 30'",icon:"🟢",color:C.profit,situation:"Partita sul 0-0, poche occasioni, ritmo basso.",action:"Mantieni la posizione",detail:"La quota del 0-0 si è abbassata (es. 9.0 → 5.0). Il mercato ti sta dando ragione. Non uscire prematuramente: la quota scende ancora con i minuti.",tip:"Vuoi 'verdare'? Usa P&L Simulator per calcolare il Lay parziale e garantire un profitto minimo qualunque cosa accada."},{title:"Scenario B — Gol subito",icon:"🔴",color:C.loss,situation:"Un gol cambia il punteggio nei primi 60'. CS 0-0 praticamente perso.",action:"Valuta ingresso Under 2.5",detail:"Con 1 gol segnato, la quota Under 2.5 Live sale. Usa P&L Simulator per calcolare se conviene aprire una nuova posizione.",tip:"Non rincorrere la perdita. Valuta l'Under 2.5 come scommessa indipendente con il suo EV."},{title:"Scenario C — 0-0 oltre il 60'",icon:"⭐",color:C.warn,situation:"Ancora 0-0 al 60'. Partita destinata al pareggio a reti bianche.",action:"Doppio: mantieni CS + Under 2.5",detail:"Momento d'oro. Under 2.5 Live a 0-0 al 60' è tra 1.3-1.6. Usa Value Finder con prob 80-85%. Se EV positivo, aggiungi la scommessa.",tip:"CS 0-0 e Under 2.5 sono correlati: se vinci uno, vinci l'altro. Due fonti di profitto sulla stessa lettura difensiva."},{title:"Scenario D — 0-0 oltre l'80'",icon:"💎",color:C.purple,situation:"Ultimi 10 minuti, 0-0 quasi certo. Quota CS crollata (1.5-2.0).",action:"Cash-out con P&L Simulator",detail:"Usa P&L Simulator: inserisci la quota iniziale, la quota attuale e la stake originale. Il tool calcola esattamente quanto fare in Lay per garantire il profitto.",tip:"Negli ultimi 5 min le squadre alzano il baricentro. Considera Lay parziale per garantire il 60-70% del profitto massimo."}].map(s=>(<div key={s.title} style={{...card,borderColor:`${s.color}33`,background:"linear-gradient(135deg,#0D1E3A,#090F1E)"}} className="ec-card"><div style={cardDeco(s.color)}/><div style={{display:"flex",gap:8,alignItems:"center",marginBottom:8}}><span style={{fontSize:18}}>{s.icon}</span><div style={{fontSize:13,fontWeight:700,color:s.color}}>{s.title}</div></div><div style={{fontSize:11,color:C.textDim,marginBottom:8,fontStyle:"italic"}}>{s.situation}</div><div style={{padding:"6px 10px",background:`${s.color}10`,border:`1px solid ${s.color}30`,borderRadius:5,marginBottom:8}}><div style={{fontSize:10,color:s.color,fontWeight:700,textTransform:"uppercase",letterSpacing:1,marginBottom:2}}>Azione</div><div style={{fontSize:12,color:C.text,fontWeight:600}}>{s.action}</div></div><div style={{fontSize:12,color:C.textSec,lineHeight:1.65,marginBottom:8}}>{s.detail}</div><div style={{fontSize:11,color:C.textSec,background:`${C.accent}08`,border:`1px solid ${C.accent}20`,borderRadius:5,padding:"6px 10px"}}><span style={{color:C.accent,fontWeight:600}}>💡 </span>{s.tip}</div></div>))}
      </div>
      <div style={{...card,borderColor:`${C.warn}33`}}>
        <div style={{fontSize:13,fontWeight:700,color:C.warn,marginBottom:14}}>⏱️ Timeline decisionale</div>
        <div style={{display:"flex",gap:0,alignItems:"stretch",overflowX:"auto"}}>
          {[{min:"0'",label:"Kick-off",desc:"Posizione aperta",color:C.accent},{min:"30'",label:"Check 1",desc:"Rivaluta quota CS",color:C.accent},{min:"60'",label:"Check 2",desc:"Valuta Under 2.5",color:C.warn},{min:"75'",label:"Check 3",desc:"P&L Simulator",color:C.warn},{min:"85'",label:"Decisione",desc:"Hold o Lay parziale",color:C.profit},{min:"90'",label:"Risultato",desc:"Chiudi sequenza",color:C.profit}].map((t,i,arr)=>(<div key={t.min} style={{flex:1,minWidth:80,display:"flex",flexDirection:"column",alignItems:"center"}}><div style={{width:"100%",display:"flex",alignItems:"center"}}><div style={{height:2,flex:1,background:i===0?"transparent":C.border}}/><div style={{width:12,height:12,borderRadius:"50%",background:t.color,flexShrink:0,boxShadow:`0 0 8px ${t.color}`}}/><div style={{height:2,flex:1,background:i===arr.length-1?"transparent":C.border}}/></div><div style={{fontFamily:"monospace",fontSize:11,color:t.color,fontWeight:700,marginTop:6}}>{t.min}</div><div style={{fontSize:11,fontWeight:600,textAlign:"center",marginTop:2}}>{t.label}</div><div style={{fontSize:10,color:C.textDim,textAlign:"center",marginTop:2,lineHeight:1.4}}>{t.desc}</div></div>))}
        </div>
      </div>
    </div>
  );

  const flowContent=(
    <div style={{animation:"fadeInUp .3s ease"}}>
      <div style={{fontSize:16,fontWeight:700,marginBottom:4}}>🔄 Flusso Completo — Esempio Reale</div>
      <div style={{fontSize:13,color:C.textSec,marginBottom:20}}>Una sessione completa con numeri reali — Atletico Madrid vs Juventus</div>
      <div style={{...card,borderColor:`${C.accent}33`,marginBottom:16,background:"linear-gradient(135deg,#0D1E3A,#090F1E)"}} className="ec-card">
        <div style={cardDeco(C.accent)}/>
        <div style={{display:"flex",gap:10,alignItems:"center",marginBottom:16}}><span style={{fontSize:20}}>⚽</span><div><div style={{fontSize:15,fontWeight:700}}>Atletico Madrid - Juventus</div><div style={{fontSize:12,color:C.textSec}}>Champions League — gara difensiva</div></div></div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:16}}>
          {[["xG Casa","0.95",C.accent],["xG Ospite","0.88",C.accent],["Quota CS 0-0","9.40",C.warn]].map(([l,v,c])=>(<div key={l} style={{background:"#050D1A",border:`1px solid ${C.border}`,borderRadius:6,padding:"10px 12px"}}><div style={{fontSize:10,color:C.textDim,marginBottom:3}}>{l}</div><div style={{fontFamily:"monospace",fontSize:16,fontWeight:700,color:c}}>{v}</div></div>))}
        </div>
        {[{step:1,tool:"CS Matrix",color:C.purple,items:[["Prob. CS 0-0","14.8%"],["Quota fair","6.76"],["Quota Betfair","9.40"],["Edge","+2.24% ✅"]]},{step:2,tool:"Value Finder",color:C.profit,items:[["EV netto (comm 5%)","€13.20"],["ROI atteso","+13.2%"],["Verdetto","VALUE BET ✅"],["Breakeven","10.6%"]]},{step:3,tool:"Kelly (½)",color:C.orange,items:[["Edge stimato","13.2%"],["Kelly intero","6.8%"],["Kelly ½","3.4%"],["Stake su €800","€27.20"]]},{step:4,tool:"Masaniello",color:C.accent,items:[["Step corrente","3 di 10"],["Stake calcolata","€18.50"],["Bank attuale","€780"],["Target residuo","€142"]]}].map(s=>(<div key={s.step} style={{background:"#070E1C",border:`1px solid ${s.color}30`,borderRadius:8,padding:"14px 16px",marginBottom:10}}><div style={{display:"flex",gap:10,alignItems:"center",marginBottom:10}}><span style={{padding:"3px 8px",background:`${s.color}15`,border:`1px solid ${s.color}30`,borderRadius:4,fontSize:11,color:s.color,fontFamily:"monospace"}}>STEP {s.step} → {s.tool}</span></div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>{s.items.map(([l,v])=>(<div key={l} style={{display:"flex",justifyContent:"space-between",padding:"4px 0",borderBottom:`1px solid ${C.border}20`}}><span style={{fontSize:12,color:C.textSec}}>{l}</span><span style={{fontFamily:"monospace",fontSize:12,color:v.includes("✅")?C.profit:C.text,fontWeight:600}}>{v}</span></div>))}</div></div>))}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginTop:4}}>
          <div style={{background:`${C.profit}0A`,border:`1px solid ${C.profit}30`,borderRadius:8,padding:"12px 14px"}}><div style={{fontSize:12,fontWeight:700,color:C.profit,marginBottom:6}}>✅ 0-0 finale</div><div style={{fontSize:12,color:C.textSec,lineHeight:1.65}}>€18.50 × 9.40 = <strong style={{color:C.profit}}>€173.90</strong><br/>Comm 5% = -€7.77<br/>Profitto netto = <strong style={{color:C.profit}}>€155.63</strong></div></div>
          <div style={{background:`${C.loss}0A`,border:`1px solid ${C.loss}30`,borderRadius:8,padding:"12px 14px"}}><div style={{fontSize:12,fontWeight:700,color:C.loss,marginBottom:6}}>❌ Altro risultato</div><div style={{fontSize:12,color:C.textSec,lineHeight:1.65}}>Stake persa: <strong style={{color:C.loss}}>-€18.50</strong><br/>Masaniello adegua<br/>la stake al prossimo step</div></div>
        </div>
      </div>
      <div style={{...card,borderColor:`${C.warn}33`}}>
        <div style={{fontSize:13,fontWeight:700,color:C.warn,marginBottom:14}}>📌 Le 5 regole d'oro</div>
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {[["Non scommettere senza edge","Mai entrare se Value Finder mostra EV negativo.",C.loss],["Rispetta la stake calcolata","Mai aumentare per recuperare o diminuire per paura.",C.warn],["Una sequenza = un mercato","Non mescolare CS 0-0, Over 2.5 e 1X2 nella stessa sequenza.",C.accent],["Minimum 50 scommesse","Non giudicare il metodo prima di 50 entry. La varianza è normale.",C.purple],["Tieni un registro","Annota ogni scommessa: xG, EV, quota, esito. Solo così puoi migliorare.",C.profit]].map(([title,desc,color],i)=>(<div key={i} style={{display:"flex",gap:12,padding:"10px 12px",background:"#070E1C",border:`1px solid ${color}20`,borderRadius:6}}><div style={{minWidth:22,height:22,borderRadius:"50%",background:`${color}15`,border:`1px solid ${color}40`,color,fontSize:11,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{i+1}</div><div><div style={{fontSize:13,fontWeight:600,color,marginBottom:3}}>{title}</div><div style={{fontSize:12,color:C.textSec,lineHeight:1.6}}>{desc}</div></div></div>))}
        </div>
      </div>
    </div>
  );

  const content={overview:overviewContent,pre:preContent,live:liveContent,flow:flowContent};
  return(
    <div style={{position:"relative",zIndex:1}}>
      <PageHeader icon={<IconStrategy/>} title="Strategia di Gioco" sub="Metodo completo — dall'analisi statistica alla gestione live" color={C.profit}/>
      <div style={{display:"flex",gap:8,marginBottom:20,flexWrap:"wrap"}}>
        {phases.map(p=>(<button key={p.id} className="phase-tab" onClick={()=>{setPhase(p.id);setActiveStep(null);}} style={{padding:"8px 16px",borderRadius:6,border:`1px solid ${phase===p.id?p.color:C.border}`,background:phase===p.id?`${p.color}18`:"transparent",color:phase===p.id?p.color:C.textSec,fontSize:13,fontWeight:phase===p.id?700:400,cursor:"pointer",fontFamily:"inherit"}}>{p.label}</button>))}
      </div>
      {content[phase]}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   2. CS MATRIX
══════════════════════════════════════════════════════════════ */
const CS_GUIDE={steps:[{title:"Trova gli xG",desc:"Cerca medie xG su Understat.com o FBref per le ultime 5-10 partite.",example:"Casa: 0.95 — Ospite: 0.88"},{title:"Inserisci i valori λ",desc:"Lambda = gol attesi per squadra. Più alto = più offensiva.",example:"λ Casa = 0.95, λ Ospite = 0.88"},{title:"Calcola e leggi la heatmap",desc:"Celle più luminose = risultati più probabili. 0-0 evidenziato in giallo."},{title:"Confronta con quote Betfair",desc:"Inserisci la quota Betfair in ogni cella. Edge verde = valore.",example:"Quota 9.40 → edge +2.24%"}],tip:"Cerca λ casa < 1.2 e λ ospite < 1.0 — gare difensive dove il 0-0 ha più probabilità."};

function CorrectScoreTool(){
  const[form,setForm]=useState({lambdaH:1.5,lambdaA:1.0});
  const[matrix,setMatrix]=useState(null);
  const[odds,setOdds]=useState({});
  const MAX=5;
  const calc=()=>setMatrix(pMatrix(parseFloat(form.lambdaH),parseFloat(form.lambdaA),MAX));
  const scores=[];for(let h=0;h<=MAX;h++)for(let a=0;a<=MAX;a++)scores.push([h,a]);
  const getEdge=(h,a)=>{if(!matrix||!odds[`${h}-${a}`])return null;return(matrix[h][a]-1/parseFloat(odds[`${h}-${a}`]))*100;};
  const sorted=matrix?[...scores].sort((a,b)=>matrix[b[0]][b[1]]-matrix[a[0]][a[1]]).slice(0,10):[];
  return(
    <div style={{position:"relative",zIndex:1}}>
      <PageHeader icon={<IconCS/>} title="Correct Score Matrix" sub="Probabilità Poisson bivariata — confronto con quote Betfair Exchange"/>
      <GuidePanel {...CS_GUIDE}/>
      <div style={{display:"grid",gridTemplateColumns:matrix?"1fr 1fr 1fr":"1fr",gap:16,marginBottom:16}}>
        <div style={{...card,borderColor:C.borderBright}} className="ec-card">
          <div style={cardDeco(C.accent)}/>
          <div style={{fontSize:11,color:C.textDim,letterSpacing:2,textTransform:"uppercase",marginBottom:16}}>Parametri</div>
          {[["xG Casa (λ)","lambdaH"],["xG Ospite (λ)","lambdaA"]].map(([lbl,key])=>(<div key={key}><label style={{fontSize:12,color:C.textSec,marginBottom:5,display:"block"}}>{lbl}</label><input className="ec-input" style={inputStyle} type="number" step="0.1" value={form[key]} onChange={e=>setForm(f=>({...f,[key]:e.target.value}))}/></div>))}
          <button className="ec-btn" onClick={calc} style={btnStyle()}>Calcola Matrice →</button>
        </div>
        {matrix&&(<>
          <div style={card} className="ec-card">
            <div style={cardDeco(C.warn)}/>
            <div style={{fontSize:11,color:C.textDim,letterSpacing:2,textTransform:"uppercase",marginBottom:14}}>Probabilità aggregate</div>
            {[["🏠 Casa vince",scores.filter(([h,a])=>h>a).reduce((s,[h,a])=>s+matrix[h][a],0),C.text],["➖ Pareggio",scores.filter(([h,a])=>h===a).reduce((s,[h,a])=>s+matrix[h][a],0),C.text],["✈️ Ospite vince",scores.filter(([h,a])=>h<a).reduce((s,[h,a])=>s+matrix[h][a],0),C.text],["📉 Under 2.5",scores.filter(([h,a])=>h+a<3).reduce((s,[h,a])=>s+matrix[h][a],0),C.textSec],["📈 Over 2.5",scores.filter(([h,a])=>h+a>=3).reduce((s,[h,a])=>s+matrix[h][a],0),C.textSec],["⭐ 0-0 (CS)",matrix[0][0],C.warn]].map(([lbl,prob,col])=>(<div key={lbl} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"7px 0",borderBottom:`1px solid ${C.border}25`}}><span style={{color:C.textSec,fontSize:12}}>{lbl}</span><div><span style={{fontFamily:"monospace",color:col,fontWeight:600}}>{pct(prob)}</span><span style={{color:C.textDim,fontSize:11,marginLeft:6}}>({f2(1/prob)})</span></div></div>))}
          </div>
          <div style={card} className="ec-card">
            <div style={cardDeco(C.profit)}/>
            <div style={{fontSize:11,color:C.textDim,letterSpacing:2,textTransform:"uppercase",marginBottom:12}}>Top 10 risultati</div>
            {sorted.map(([h,a])=>{const prob=matrix[h][a];const edge=getEdge(h,a);const w=Math.min(prob/matrix[sorted[0][0]][sorted[0][1]]*100,100);return(<div key={`${h}-${a}`} style={{marginBottom:8}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:3}}><span style={{minWidth:28,padding:"1px 5px",background:`${C.accent}20`,color:C.accent,borderRadius:3,fontSize:11,fontWeight:700,fontFamily:"monospace",textAlign:"center"}}>{h}-{a}</span><div style={{flex:1,height:5,background:C.border,borderRadius:3,overflow:"hidden"}}><div style={{height:5,width:`${w}%`,background:`linear-gradient(90deg,${C.accent},${C.profit})`,borderRadius:3}}/></div><span style={{fontFamily:"monospace",fontSize:12,minWidth:38}}>{pct(prob)}</span>{edge!==null&&<span style={{padding:"1px 5px",background:edge>0?`${C.profit}20`:`${C.loss}20`,color:edge>0?C.profit:C.loss,borderRadius:3,fontSize:10,fontFamily:"monospace",minWidth:46,textAlign:"center"}}>{edge>0?"+":""}{edge.toFixed(1)}%</span>}</div></div>);})}
          </div>
        </>)}
      </div>
      {matrix&&(<div style={card} className="ec-card"><div style={{fontSize:11,color:C.textDim,letterSpacing:2,textTransform:"uppercase",marginBottom:14}}>Heatmap — inserisci quota Betfair per l'edge</div><div style={{overflowX:"auto"}}><table style={{borderCollapse:"separate",borderSpacing:3}}><thead><tr><th style={{padding:"4px 8px",fontSize:10,color:C.textDim,textAlign:"center"}}>C\O</th>{Array.from({length:MAX+1},(_,i)=><th key={i} style={{padding:"4px 8px",fontSize:11,color:C.textSec,textAlign:"center",minWidth:82}}>{i}</th>)}</tr></thead><tbody>{Array.from({length:MAX+1},(_,h)=>(<tr key={h}><td style={{padding:"4px 8px",fontSize:11,color:C.textSec,fontWeight:600,textAlign:"center"}}>{h}</td>{Array.from({length:MAX+1},(_,a)=>{const prob=matrix[h][a];const edge=getEdge(h,a);const intensity=Math.min(prob*8,.85);const isZZ=h===0&&a===0;const bg=isZZ?`rgba(255,184,0,${intensity+.1})`:`rgba(0,194,255,${intensity})`;const bord=isZZ?`1px solid rgba(255,184,0,${intensity*.7+.1})`:`1px solid rgba(0,194,255,${intensity*.5+.05})`;return(<td key={a} style={{padding:2}}><div style={{background:bg,border:bord,borderRadius:6,padding:"5px 4px",textAlign:"center",minWidth:78}}><div style={{fontFamily:"monospace",fontSize:11,fontWeight:600,color:intensity>0.55?"#040C1A":C.text}}>{pct(prob)}</div><input placeholder="quota" value={odds[`${h}-${a}`]||""} onChange={e=>setOdds(o=>({...o,[`${h}-${a}`]:e.target.value}))} style={{width:56,fontSize:10,background:"rgba(0,0,0,0.35)",border:"1px solid rgba(255,255,255,0.12)",borderRadius:3,color:"#fff",padding:"2px 4px",textAlign:"center",fontFamily:"monospace",outline:"none",marginTop:2,boxSizing:"border-box"}}/>{edge!==null&&<div style={{fontSize:10,color:edge>0?C.profit:C.loss,fontFamily:"monospace",fontWeight:700,marginTop:1}}>{edge>0?"+":""}{edge.toFixed(1)}%</div>}</div></td>);})}</tr>))}</tbody></table></div></div>)}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   3. VALUE FINDER
══════════════════════════════════════════════════════════════ */
const VALUE_GUIDE={steps:[{title:"Scegli Back o Lay",desc:"Back = punti su un esito. Lay = punti contro.",example:"Tipo: Back"},{title:"Quota Betfair Exchange",desc:"Copia la quota dall'Exchange, non dal Sportsbook.",example:"Quota: 9.40"},{title:"Probabilità stimata dalla CS Matrix",desc:"NON usare la prob implicita della quota. Usa quella dalla matrice.",example:"Prob: 14.8%"},{title:"Leggi il verdetto e il gauge",desc:"EV positivo = VALUE BET. Il gauge mostra l'intensità del vantaggio."}],tip:"Collega sempre CS Matrix → Value Finder. La probabilità viene dalla matrice, non dalla tua sensazione."};

function ValueFinderTool(){
  const[form,setForm]=useState({betType:"back",odds:3.0,probPct:35,commission:5,stake:100});
  const set=(k,v)=>setForm(f=>({...f,[k]:v}));
  const q=parseFloat(form.odds),prob=parseFloat(form.probPct)/100,comm=parseFloat(form.commission)/100,stake=parseFloat(form.stake);
  const isBack=form.betType==="back";
  const bNP=stake*(q-1)*(1-comm),bEV=prob*bNP-(1-prob)*stake,bROI=bEV/stake,bBE=1/q,impl=1/q,bEdge=prob-impl;
  const lLia=stake*(q-1),lNP=stake*(1-comm),lEV=(1-prob)*lNP-prob*lLia,lROI=lEV/stake,lBE=1-1/q;
  const ev=isBack?bEV:lEV,roi=isBack?bROI:lROI,edge=isBack?bEdge:(1-prob)-(1-1/q),be=isBack?bBE:lBE;
  const fairB=1/prob,fairL=1/(1-prob),evColor=ev>0?C.profit:ev<0?C.loss:C.textSec;
  return(
    <div style={{position:"relative",zIndex:1}}>
      <PageHeader icon={<IconValue/>} title="Value Finder" sub="Expected Value, edge e breakeven per Back e Lay su Betfair Exchange"/>
      <GuidePanel {...VALUE_GUIDE}/>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1.4fr",gap:16}}>
        <div style={{...card,borderColor:C.borderBright}} className="ec-card">
          <div style={cardDeco(C.accent)}/>
          <div style={{fontSize:11,color:C.textDim,letterSpacing:2,textTransform:"uppercase",marginBottom:16}}>Parametri</div>
          <label style={{fontSize:12,color:C.textSec,marginBottom:5,display:"block"}}>Tipo scommessa</label>
          <select className="ec-input" style={{...inputStyle,cursor:"pointer"}} value={form.betType} onChange={e=>set("betType",e.target.value)}><option value="back">Back</option><option value="lay">Lay</option></select>
          {[["Quota Betfair","odds","0.1"],["Probabilità stimata (%)","probPct","1"],["Stake (€)","stake","10"],["Commissione (%)","commission","0.5"]].map(([lbl,key,step])=>(<div key={key}><label style={{fontSize:12,color:C.textSec,marginBottom:5,display:"block"}}>{lbl}</label><input className="ec-input" style={inputStyle} type="number" step={step} value={form[key]} onChange={e=>set(key,e.target.value)}/></div>))}
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          <div style={{...card,border:`1px solid ${ev>0?C.profit:ev<0?C.loss:C.border}`,background:ev>0?"linear-gradient(135deg,#0D1E3A,#081A10)":ev<0?"linear-gradient(135deg,#0D1E3A,#1A080A)":"#0D1E3A"}} className="ec-card">
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <div><div style={{fontSize:11,color:C.textDim,letterSpacing:2,textTransform:"uppercase",marginBottom:8}}>Verdetto</div><div style={{fontSize:28,fontFamily:"'JetBrains Mono',monospace",fontWeight:700,color:evColor,textShadow:`0 0 20px ${evColor}60`,lineHeight:1.1}}>{ev>0?"✓ VALUE BET":ev<0?"✗ NO VALUE":"— NEUTRO"}</div><div style={{fontSize:12,color:C.textSec,marginTop:8,maxWidth:200}}>{ev>0?`Edge +${(edge*100).toFixed(2)}% · EV €${f2(ev)} per €${stake}`:`Edge ${(edge*100).toFixed(2)}% · Non conveniente`}</div></div>
              <Gauge value={parseFloat((ev/stake*100).toFixed(1))} min={-50} max={50} label="ROI%" color={evColor}/>
            </div>
          </div>
          <div style={card} className="ec-card">
            <div style={cardDeco(C.profit)}/>
            <div style={{fontSize:11,color:C.textDim,letterSpacing:2,textTransform:"uppercase",marginBottom:12}}>Metriche</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
              {[["EV",`€ ${f2(ev)}`,ev>=0?C.profit:C.loss],["ROI",`${(roi*100).toFixed(2)}%`,roi>=0?C.profit:C.loss],["Edge",`${(edge*100).toFixed(2)}%`,edge>=0?C.profit:C.loss],["Breakeven",pct(be),C.warn],["Prob. stimata",pct(prob),C.accent],["Prob. implicita",pct(impl),C.textSec],["Fair Back",f2(fairB),C.accent],["Fair Lay",f2(fairL),C.warn]].map(([lbl,val,col])=>(<div key={lbl} style={{background:"#050D1A",border:`1px solid ${C.border}`,borderRadius:6,padding:"9px 11px"}}><div style={{fontSize:10,color:C.textDim,marginBottom:3}}>{lbl}</div><div style={{fontFamily:"monospace",fontSize:15,fontWeight:700,color:col}}>{val}</div></div>))}
            </div>
          </div>
        </div>
      </div>
      <div style={{...card,marginTop:16}} className="ec-card">
        <div style={{fontSize:11,color:C.textDim,letterSpacing:2,textTransform:"uppercase",marginBottom:14}}>Confronto Back vs Lay</div>
        <div style={{overflowX:"auto"}}><table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}><thead><tr>{["Metrica","BACK","LAY"].map((h,i)=>(<th key={h} style={{padding:"8px 12px",textAlign:"left",color:i===0?C.textDim:i===1&&isBack?C.accent:i===2&&!isBack?C.accent:C.textSec,fontSize:11,letterSpacing:1,textTransform:"uppercase",borderBottom:`1px solid ${C.border}`,background:i===1&&isBack?`${C.accent}08`:i===2&&!isBack?`${C.accent}08`:"transparent"}}>{h}</th>))}</tr></thead><tbody>{[["Stake/Liability",`€ ${f2(stake)}`,`€ ${f2(lLia)}`],["Profitto se vince",`€ ${f2(bNP)}`,`€ ${f2(lNP)}`],["Expected Value",`€ ${f2(bEV)}`,`€ ${f2(lEV)}`],["ROI atteso",`${(bROI*100).toFixed(2)}%`,`${(lROI*100).toFixed(2)}%`],["Breakeven",pct(bBE),pct(lBE)]].map(([lbl,b,l])=>(<tr key={lbl}><td style={{padding:"9px 12px",color:C.textSec,borderBottom:`1px solid ${C.border}18`}}>{lbl}</td><td style={{padding:"9px 12px",fontFamily:"monospace",color:isBack?C.accent:C.textSec,fontWeight:isBack?600:400,background:isBack?`${C.accent}05`:"transparent",borderBottom:`1px solid ${C.border}18`}}>{b}</td><td style={{padding:"9px 12px",fontFamily:"monospace",color:!isBack?C.accent:C.textSec,fontWeight:!isBack?600:400,background:!isBack?`${C.accent}05`:"transparent",borderBottom:`1px solid ${C.border}18`}}>{l}</td></tr>))}</tbody></table></div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   4. KELLY CRITERION
══════════════════════════════════════════════════════════════ */
const KELLY_GUIDE={steps:[{title:"Inserisci il bankroll totale",desc:"Il capitale totale disponibile — non solo per questa scommessa, ma l'intero bankroll dedicato al betting.",example:"Bankroll: €1000"},{title:"Inserisci quota e probabilità stimata",desc:"Usa la probabilità dalla CS Matrix e la quota reale di Betfair Exchange. Non usare la probabilità implicita della quota.",example:"Quota: 9.40 — Prob: 14.8%"},{title:"Scegli la frazione Kelly",desc:"Kelly intero è aggressivo e ad alta varianza. Kelly ½ o ¼ sono consigliati per il betting reale — riducono il rischio mantenendo la crescita.",example:"Kelly ½ = metà della stake consigliata"},{title:"Leggi la stake consigliata",desc:"Il tool mostra la stake ottimale per le tre varianti. Kelly intero massimizza la crescita teorica, le frazioni proteggono il bankroll."}],tip:"Kelly frazionale ¼ è il più usato dai trader professionisti. Kelly intero espone a drawdown molto profondi anche con edge reale."};

function KellyTool(){
  const[form,setForm]=useState({bankroll:1000,odds:9.4,probPct:14.8,commission:5});
  const set=(k,v)=>setForm(f=>({...f,[k]:v}));
  const q=parseFloat(form.odds),p=parseFloat(form.probPct)/100,B=parseFloat(form.bankroll),comm=parseFloat(form.commission)/100;
  const b=(q-1)*(1-comm);
  const kelly=(b*p-(1-p))/b;
  const kellyFull=Math.max(0,kelly);
  const kellyHalf=kellyFull/2;
  const kellyQuarter=kellyFull/4;
  const stakesFull=bfRound(B*kellyFull);
  const stakesHalf=bfRound(B*kellyHalf);
  const stakesQuarter=bfRound(B*kellyQuarter);
  const ev=(b*p-(1-p))*100;
  const evColor=ev>0?C.profit:ev<0?C.loss:C.textSec;

  const [simN,setSimN]=useState(50);
  const simulateGrowth=(fraction)=>{
    let bank=B;const results=[];
    for(let i=0;i<simN;i++){
      const stake=bank*Math.max(0,kelly)*fraction;
      bank=Math.random()<p?bank+stake*b:bank-stake;
      results.push(parseFloat(bank.toFixed(2)));
    }
    return results;
  };

  return(
    <div style={{position:"relative",zIndex:1}}>
      <PageHeader icon={<IconKelly/>} title="Kelly Criterion" sub="Calcola la stake ottimale in base all'edge — proteggi il bankroll e massimizza la crescita" color={C.orange}/>
      <GuidePanel {...KELLY_GUIDE}/>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1.5fr",gap:16}}>
        <div style={{...card,borderColor:C.borderBright}} className="ec-card">
          <div style={cardDeco(C.orange)}/>
          <div style={{fontSize:11,color:C.textDim,letterSpacing:2,textTransform:"uppercase",marginBottom:16}}>Parametri</div>
          {[["Bankroll (€)","bankroll","10"],["Quota Betfair","odds","0.1"],["Probabilità stimata (%)","probPct","0.1"],["Commissione (%)","commission","0.5"]].map(([lbl,key,step])=>(<div key={key}><label style={{fontSize:12,color:C.textSec,marginBottom:5,display:"block"}}>{lbl}</label><input className="ec-input" style={inputStyle} type="number" step={step} value={form[key]} onChange={e=>set(key,e.target.value)}/></div>))}
          <div style={{background:"#050D1A",border:`1px solid ${C.border}`,borderRadius:6,padding:"12px",marginTop:4}}>
            <div style={{fontSize:10,color:C.textDim,marginBottom:6}}>FORMULA KELLY</div>
            <div style={{fontFamily:"monospace",fontSize:12,color:C.textSec,lineHeight:1.8}}>
              f = (b × p − q) / b<br/>
              <span style={{color:C.orange}}>b</span> = quota netta × (1 − comm)<br/>
              <span style={{color:C.accent}}>p</span> = prob. stimata<br/>
              <span style={{color:C.textDim}}>q</span> = 1 − p
            </div>
          </div>
        </div>

        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          <div style={{...card,border:`1px solid ${ev>0?C.orange:C.border}`}} className="ec-card">
            <div style={cardDeco(C.orange)}/>
            <div style={{fontSize:11,color:C.textDim,letterSpacing:2,textTransform:"uppercase",marginBottom:14}}>Stake consigliate</div>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {[["Kelly Intero (1x)","Massima crescita teorica — alta varianza",kellyFull,stakesFull,C.loss,"⚠️ Aggressivo"],[  "Kelly ½","Consigliato — buon equilibrio crescita/rischio",kellyHalf,stakesHalf,C.warn,"✅ Consigliato"],["Kelly ¼","Conservativo — bassa varianza, crescita più lenta",kellyQuarter,stakesQuarter,C.profit,"🛡️ Conservativo"]].map(([label,desc,pctVal,stake,color,badge])=>(
                <div key={label} style={{background:"#050D1A",border:`1px solid ${color}30`,borderRadius:8,padding:"12px 14px"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
                    <div style={{fontSize:13,fontWeight:700,color}}>{label}</div>
                    <span style={{padding:"2px 7px",background:`${color}15`,border:`1px solid ${color}30`,borderRadius:3,fontSize:10,color,fontFamily:"monospace"}}>{badge}</span>
                  </div>
                  <div style={{fontSize:11,color:C.textDim,marginBottom:8}}>{desc}</div>
                  <div style={{display:"flex",gap:16}}>
                    <div><div style={{fontSize:10,color:C.textDim}}>% Bankroll</div><div style={{fontFamily:"monospace",fontSize:18,fontWeight:700,color,textShadow:`0 0 8px ${color}40`}}>{(pctVal*100).toFixed(2)}%</div></div>
                    <div><div style={{fontSize:10,color:C.textDim}}>Stake (€)</div><div style={{fontFamily:"monospace",fontSize:18,fontWeight:700,color}}>{isNaN(stake)||stake<=0?"–":f2(stake)}</div></div>
                  </div>
                  <div style={{marginTop:8,height:4,background:C.border,borderRadius:2}}><div style={{height:4,width:`${Math.min(pctVal*100*5,100)}%`,background:color,borderRadius:2,boxShadow:`0 0 6px ${color}60`}}/></div>
                </div>
              ))}
            </div>
          </div>

          <div style={card} className="ec-card">
            <div style={cardDeco(C.orange)}/>
            <div style={{fontSize:11,color:C.textDim,letterSpacing:2,textTransform:"uppercase",marginBottom:10}}>Riepilogo EV</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
              {[["Kelly (frazione intera)",`${(kellyFull*100).toFixed(2)}%`,C.orange],["EV per scommessa",`${ev>0?"+":""}${ev.toFixed(2)}%`,evColor],["Quota netta (b)",f2(b),C.accent],["Breakeven",pct(1/q),C.warn]].map(([lbl,val,col])=>(<div key={lbl} style={{background:"#050D1A",border:`1px solid ${C.border}`,borderRadius:6,padding:"9px 11px"}}><div style={{fontSize:10,color:C.textDim,marginBottom:3}}>{lbl}</div><div style={{fontFamily:"monospace",fontSize:14,fontWeight:700,color:col}}>{val}</div></div>))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   5. DUTCHING CALCULATOR
══════════════════════════════════════════════════════════════ */
const DUTCH_GUIDE={steps:[{title:"Aggiungi le selezioni con edge",desc:"Inserisci ogni esito con edge positivo dalla CS Matrix. Puoi aggiungerne fino a 6.",example:"0-0 quota 9.40, 1-0 quota 7.20, 0-1 quota 8.00"},{title:"Inserisci la stake totale",desc:"Il totale che vuoi rischiare su tutte le selezioni combinate.",example:"Stake totale: €50"},{title:"Leggi la distribuzione",desc:"Il tool distribuisce la stake automaticamente tra le selezioni in proporzione inversa alle probabilità implicite."},{title:"Controlla il profitto garantito",desc:"Se vince qualsiasi selezione, incassi sempre lo stesso profitto. Il profitto è netto della commissione Betfair."}],tip:"Usa il Dutching quando CS Matrix mostra edge su più risultati Under (es. 0-0, 1-0, 0-1). Non mescolare esiti Over e Under nella stessa sequenza."};

function DutchingTool(){
  const[totalStake,setTotalStake]=useState(100);
  const[commission,setCommission]=useState(5);
  const[selections,setSelections]=useState([{id:1,name:"CS 0-0",odds:9.4},{id:2,name:"CS 1-0",odds:7.2},{id:3,name:"CS 0-1",odds:8.0}]);
  const[nextId,setNextId]=useState(4);

  const addSel=()=>{if(selections.length>=6)return;setSelections(s=>[...s,{id:nextId,name:`Selezione ${nextId}`,odds:5.0}]);setNextId(n=>n+1);};
  const removeSel=(id)=>setSelections(s=>s.filter(x=>x.id!==id));
  const updateSel=(id,field,val)=>setSelections(s=>s.map(x=>x.id===id?{...x,[field]:val}:x));

  const comm=parseFloat(commission)/100;
  const total=parseFloat(totalStake);
  const sumInvOdds=selections.reduce((s,x)=>s+1/parseFloat(x.odds||1),0);
  const results=selections.map(x=>{
    const q=parseFloat(x.odds||1);
    const stake=bfRound(total*(1/q)/sumInvOdds);
    const profit=stake*(q-1)*(1-comm);
    const netProfit=profit-(total-stake);
    return{...x,stake,profit:netProfit};
  });
  const guaranteedProfit=results.length>0?Math.min(...results.map(r=>r.profit)):0;
  const totalAllocated=results.reduce((s,r)=>s+r.stake,0);
  const overround=(sumInvOdds*100).toFixed(1);

  return(
    <div style={{position:"relative",zIndex:1}}>
      <PageHeader icon={<IconDutch/>} title="Dutching Calculator" sub="Distribuisci la stake su più selezioni per un profitto garantito fisso" color={C.purple}/>
      <GuidePanel {...DUTCH_GUIDE}/>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          <div style={{...card,borderColor:C.borderBright}} className="ec-card">
            <div style={cardDeco(C.purple)}/>
            <div style={{fontSize:11,color:C.textDim,letterSpacing:2,textTransform:"uppercase",marginBottom:16}}>Parametri</div>
            <label style={{fontSize:12,color:C.textSec,marginBottom:5,display:"block"}}>Stake totale (€)</label>
            <input className="ec-input" style={inputStyle} type="number" value={totalStake} onChange={e=>setTotalStake(e.target.value)}/>
            <label style={{fontSize:12,color:C.textSec,marginBottom:5,display:"block"}}>Commissione Betfair (%)</label>
            <input className="ec-input" style={inputStyle} type="number" step="0.5" value={commission} onChange={e=>setCommission(e.target.value)}/>
          </div>

          <div style={card} className="ec-card">
            <div style={cardDeco(C.purple)}/>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
              <div style={{fontSize:11,color:C.textDim,letterSpacing:2,textTransform:"uppercase"}}>Selezioni ({selections.length}/6)</div>
              {selections.length<6&&<button onClick={addSel} style={{background:`${C.purple}20`,border:`1px solid ${C.purple}40`,color:C.purple,borderRadius:5,padding:"4px 12px",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>+ Aggiungi</button>}
            </div>
            {selections.map((s,i)=>(
              <div key={s.id} style={{background:"#050D1A",border:`1px solid ${C.border}`,borderRadius:7,padding:"10px 12px",marginBottom:8}}>
                <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:6}}>
                  <div style={{width:20,height:20,borderRadius:"50%",background:`${C.purple}20`,border:`1px solid ${C.purple}40`,color:C.purple,fontSize:10,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{i+1}</div>
                  <input value={s.name} onChange={e=>updateSel(s.id,"name",e.target.value)} style={{flex:1,background:"transparent",border:"none",color:C.text,fontSize:13,fontWeight:600,fontFamily:"Inter,sans-serif",outline:"none"}}/>
                  {selections.length>2&&<button onClick={()=>removeSel(s.id)} style={{background:"transparent",border:"none",color:C.textDim,cursor:"pointer",fontSize:16,lineHeight:1,padding:"0 4px"}}>×</button>}
                </div>
                <div style={{display:"flex",gap:8,alignItems:"center"}}>
                  <label style={{fontSize:11,color:C.textDim,minWidth:40}}>Quota</label>
                  <input className="ec-input" type="number" step="0.1" value={s.odds} onChange={e=>updateSel(s.id,"odds",e.target.value)} style={{...inputStyle,marginBottom:0,flex:1}}/>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          <div style={{...card,border:`1px solid ${guaranteedProfit>0?C.profit:C.border}`,background:guaranteedProfit>0?"linear-gradient(135deg,#0D1E3A,#081A10)":"#0D1E3A"}} className="ec-card">
            <div style={cardDeco(C.profit)}/>
            <div style={{fontSize:11,color:C.textDim,letterSpacing:2,textTransform:"uppercase",marginBottom:8}}>Profitto garantito</div>
            <div style={{fontSize:36,fontFamily:"'JetBrains Mono',monospace",fontWeight:700,color:guaranteedProfit>0?C.profit:C.loss,textShadow:`0 0 20px ${guaranteedProfit>0?C.profit:C.loss}50`}}>
              {guaranteedProfit>0?"+":""}€{f2(guaranteedProfit)}
            </div>
            <div style={{fontSize:12,color:C.textSec,marginTop:6}}>
              {guaranteedProfit>0?"Qualunque selezione vinca, incassi sempre questo importo":"Aggiusta le quote o la stake per ottenere profitto positivo"}
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginTop:14}}>
              {[["Stake totale",`€ ${f2(totalAllocated)}`,C.accent],["Overround",`${overround}%`,parseFloat(overround)<110?C.profit:C.loss],["ROI",`${f2(guaranteedProfit/total*100)}%`,guaranteedProfit>0?C.profit:C.loss],["Selezioni",selections.length,C.purple]].map(([lbl,val,col])=>(<div key={lbl} style={{background:"#050D1A",border:`1px solid ${C.border}`,borderRadius:6,padding:"8px 10px"}}><div style={{fontSize:10,color:C.textDim,marginBottom:2}}>{lbl}</div><div style={{fontFamily:"monospace",fontSize:14,fontWeight:700,color:col}}>{val}</div></div>))}
            </div>
          </div>

          <div style={card} className="ec-card">
            <div style={cardDeco(C.purple)}/>
            <div style={{fontSize:11,color:C.textDim,letterSpacing:2,textTransform:"uppercase",marginBottom:14}}>Distribuzione stake</div>
            {results.map((r,i)=>(
              <div key={r.id} style={{marginBottom:12}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
                  <span style={{fontSize:13,fontWeight:600}}>{r.name}</span>
                  <div style={{display:"flex",gap:10}}>
                    <span style={{fontFamily:"monospace",fontSize:13,color:C.accent}}>€{f2(r.stake)}</span>
                    <span style={{fontFamily:"monospace",fontSize:11,color:C.textDim}}>@ {r.odds}</span>
                  </div>
                </div>
                <div style={{height:5,background:C.border,borderRadius:3}}><div style={{height:5,width:`${(r.stake/totalAllocated*100)||0}%`,background:`linear-gradient(90deg,${C.purple},${C.accent})`,borderRadius:3}}/></div>
                <div style={{fontSize:11,color:C.textSec,marginTop:3}}>Se vince: <span style={{color:C.profit,fontFamily:"monospace"}}>+€{f2(r.profit)}</span> · {(r.stake/totalAllocated*100).toFixed(1)}% della stake</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   6. MASANIELLO
══════════════════════════════════════════════════════════════ */
const MASA_GUIDE={steps:[{title:"Inserisci il bankroll",desc:"Il capitale dedicato a questa sequenza.",example:"Bankroll: €1000"},{title:"Imposta il target",desc:"Quanto vuoi guadagnare a fine sequenza.",example:"Target: €200 (20%)"},{title:"Numero di eventi (n)",desc:"Quante partite compongono la sequenza. Con n alto le stake sono più basse.",example:"n = 10 eventi"},{title:"Quota e tipo",desc:"Quota media prevista. Back = punti su, Lay = punti contro.",example:"Quota: 9.0, Back"},{title:"Segui la tabella",desc:"Gioca esattamente la stake dello step corrente. Non deviare mai."}],tip:"Usa la stessa quota per tutta la sequenza. Partite con quote molto diverse = nuova sequenza separata."};

function MasanielloTool(){
  const[form,setForm]=useState({bankroll:1000,target:200,events:10,odds:9.0,betType:"back",commission:5});
  const[steps,setSteps]=useState([]);
  const set=(k,v)=>setForm(f=>({...f,[k]:v}));
  const isLay=form.betType==="lay";
  const Q=(parseFloat(form.bankroll)+parseFloat(form.target))/parseFloat(form.bankroll);
  const coeff=Math.pow(Q,1/parseInt(form.events));
  const calculate=()=>{
    const{bankroll,target,events,odds,betType,commission}=form;
    const n=parseInt(events),B=parseFloat(bankroll),q=parseFloat(odds),comm=parseFloat(commission)/100;
    const netOdds=betType==="back"?q-1:1/(q-1),Qv=(B+parseFloat(target))/B,cf=Math.pow(Qv,1/n);
    const rows=[];let cur=B;
    for(let i=1;i<=n;i++){
      const stake=bfRound(Math.max(cur*(cf-1)/netOdds,2));
      const profit=betType==="back"?stake*(q-1)*(1-comm):stake*(1-comm);
      const liab=betType==="lay"?stake*(q-1):null;
      rows.push({step:i,stake,profitIfWin:profit,liability:liab,bankAfterWin:cur+profit,bankAfterLoss:cur-(betType==="back"?stake:liab??stake)});
      cur=rows[i-1].bankAfterLoss;
    }
    setSteps(rows);
  };
  return(
    <div style={{position:"relative",zIndex:1}}>
      <PageHeader icon={<IconMasa/>} title="Masaniello Calculator" sub="Gestione progressiva Back / Lay con rounding Betfair €0.50"/>
      <GuidePanel {...MASA_GUIDE}/>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
        <div style={{...card,borderColor:C.borderBright}} className="ec-card">
          <div style={cardDeco(C.accent)}/>
          <div style={{fontSize:11,color:C.textDim,letterSpacing:2,textTransform:"uppercase",marginBottom:16}}>Parametri sequenza</div>
          {[["Bankroll (€)","bankroll","1"],["Target Profitto (€)","target","1"],["Numero eventi (n)","events","1"],["Quota","odds","0.1"]].map(([lbl,key,step])=>(<div key={key}><label style={{fontSize:12,color:C.textSec,marginBottom:5,display:"block"}}>{lbl}</label><input className="ec-input" style={inputStyle} type="number" step={step} value={form[key]} onChange={e=>set(key,e.target.value)}/></div>))}
          <label style={{fontSize:12,color:C.textSec,marginBottom:5,display:"block"}}>Tipo scommessa</label>
          <select className="ec-input" style={{...inputStyle,cursor:"pointer"}} value={form.betType} onChange={e=>set("betType",e.target.value)}><option value="back">Back</option><option value="lay">Lay</option></select>
          <label style={{fontSize:12,color:C.textSec,marginBottom:5,display:"block"}}>Commissione (%)</label>
          <input className="ec-input" style={inputStyle} type="number" step="0.5" value={form.commission} onChange={e=>set("commission",e.target.value)}/>
          <button className="ec-btn" onClick={calculate} style={btnStyle()}>Calcola Sequenza →</button>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          <div style={card} className="ec-card">
            <div style={cardDeco(C.profit)}/>
            <div style={{fontSize:11,color:C.textDim,letterSpacing:2,textTransform:"uppercase",marginBottom:14}}>Riepilogo</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12}}>
              {[["Q^(1/n)",f4(coeff),C.accent],["Target",`€${parseFloat(form.target).toFixed(0)}`,C.profit],["Tipo",isLay?"LAY":"BACK",isLay?C.warn:C.accent],["Quota",form.odds,C.text]].map(([lbl,val,col])=>(<div key={lbl} style={{background:"#050D1A",border:`1px solid ${C.border}`,borderRadius:6,padding:"10px 12px"}}><div style={{fontSize:10,color:C.textDim,marginBottom:4}}>{lbl}</div><div style={{fontFamily:"monospace",fontSize:18,fontWeight:700,color:col}}>{val}</div></div>))}
            </div>
            {steps.length>0&&<StakeBarChart steps={steps}/>}
          </div>
          <div style={card} className="ec-card">
            <div style={{fontSize:11,color:C.textDim,letterSpacing:2,textTransform:"uppercase",marginBottom:10}}>Regole Exchange</div>
            {[["Rounding","€ 0.50"],["Stake min","€ 2.00"],["Commissione","su vincite nette"]].map(([l,v])=>(<div key={l} style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:`1px solid ${C.border}30`,fontSize:12}}><span style={{color:C.textSec}}>{l}</span><span style={{color:C.accent,fontFamily:"monospace"}}>{v}</span></div>))}
          </div>
        </div>
      </div>
      {steps.length>0&&(<div style={{...card,marginTop:16}} className="ec-card"><div style={{fontSize:11,color:C.textDim,letterSpacing:2,textTransform:"uppercase",marginBottom:14}}>Sequenza — {steps.length} eventi</div><div style={{overflowX:"auto"}}><table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}><thead><tr>{["Step","Stake (€)","Quota",isLay?"Liability (€)":"Profitto (€)","Bank ✓","Bank ✗"].map(h=>(<th key={h} style={{padding:"8px 10px",textAlign:"left",color:C.textDim,fontSize:11,letterSpacing:1,textTransform:"uppercase",borderBottom:`1px solid ${C.border}`}}>{h}</th>))}</tr></thead><tbody>{steps.map(r=>(<tr key={r.step} style={{borderBottom:`1px solid ${C.border}18`}}><td style={{padding:"8px 10px",fontFamily:"monospace",color:C.textSec}}>{r.step}</td><td style={{padding:"8px 10px",fontFamily:"monospace",color:C.accent,fontWeight:600}}>{f2(r.stake)}</td><td style={{padding:"8px 10px",fontFamily:"monospace"}}>{f2(parseFloat(form.odds))}</td><td style={{padding:"8px 10px",fontFamily:"monospace",color:isLay?C.warn:C.profit}}>{f2(isLay?r.liability:r.profitIfWin)}</td><td style={{padding:"8px 10px",fontFamily:"monospace",color:C.profit}}>{f2(r.bankAfterWin)}</td><td style={{padding:"8px 10px",fontFamily:"monospace",color:C.loss}}>{f2(r.bankAfterLoss)}</td></tr>))}</tbody></table></div></div>)}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   7. P&L SIMULATOR
══════════════════════════════════════════════════════════════ */
const PNL_GUIDE={steps:[{title:"Inserisci la scommessa originale",desc:"Tipo (Back/Lay), quota a cui hai aperto la posizione e stake piazzata.",example:"Back CS 0-0 @ 9.40 — Stake €20"},{title:"Inserisci la quota attuale",desc:"La quota corrente del mercato in-play su Betfair Exchange. Se il punteggio è ancora 0-0, sarà scesa.",example:"Quota attuale: 4.50 (0-0 al 55')"},{title:"Scegli lo scenario di uscita",desc:"Il tool calcola automaticamente la stake Lay per greening completo, parziale (70%) o uscita in perdita."},{title:"Leggi il P&L garantito",desc:"Ogni scenario mostra il profitto o perdita garantita qualunque cosa accada nel resto della partita."}],tip:"Usa il P&L Simulator negli Scenari C e D della Strategia Live: quando sei in profitto e vuoi garantire una parte del guadagno senza aspettare il 90'."};

function PnLTool(){
  const[form,setForm]=useState({betType:"back",openOdds:9.4,currentOdds:4.5,stake:20,commission:5});
  const set=(k,v)=>setForm(f=>({...f,[k]:v}));
  const isBack=form.betType==="back";
  const qOpen=parseFloat(form.openOdds),qCurr=parseFloat(form.currentOdds);
  const stake=parseFloat(form.stake),comm=parseFloat(form.commission)/100;

  let scenarios=[];
  if(isBack){
    const winIfHold=stake*(qOpen-1)*(1-comm);
    const lossIfHold=-stake;
    const layForGreen=stake*qOpen/qCurr;
    const layRounded=bfRound(layForGreen);
    // Back vince: ricevi stake*(qOpen-1)*(1-comm), paghi lay*(qCurr-1)
    const greenIfBackWins=stake*(qOpen-1)*(1-comm)-layRounded*(qCurr-1);
    // Back perde: ricevi lay*(1-comm), perdi stake
    const greenIfBackLoses=layRounded*(1-comm)-stake;
    const layPartial=bfRound(layForGreen*0.7);
    const partialIfBackWins=stake*(qOpen-1)*(1-comm)-layPartial*(qCurr-1);
    const partialIfBackLoses=layPartial*(1-comm)-stake;
    scenarios=[
      {label:"Hold completo",icon:"⏳",desc:"Mantieni la posizione fino al fischio finale",stakeAction:"Nessuna azione",ifWins:winIfHold,ifLoses:lossIfHold,color:C.warn},
      {label:"Green completo",icon:"✅",desc:"Lay per distribuire il profitto su entrambi gli esiti",stakeAction:`Lay €${f2(layRounded)} @ ${qCurr}`,ifWins:greenIfBackWins,ifLoses:greenIfBackLoses,color:C.profit},
      {label:"Green parziale (70%)",icon:"⚖️",desc:"Garantisci parte del profitto, lascia qualcosa aperto",stakeAction:`Lay €${f2(layPartial)} @ ${qCurr}`,ifWins:partialIfBackWins,ifLoses:partialIfBackLoses,color:C.accent},
    ];
  } else {
    const liability=stake*(qOpen-1);
    const winIfHold=stake*(1-comm);
    const lossIfHold=-liability;
    const backForGreen=bfRound(stake*qOpen/qCurr);
    const greenIfLayWins=stake*(1-comm)-backForGreen*(qCurr-1);
    const greenIfLayLoses=backForGreen*(1-comm)-liability;
    scenarios=[
      {label:"Hold completo",icon:"⏳",desc:"Mantieni la posizione fino al fischio finale",stakeAction:"Nessuna azione",ifWins:winIfHold,ifLoses:lossIfHold,color:C.warn},
      {label:"Green completo",icon:"✅",desc:"Back per chiudere la posizione Lay",stakeAction:`Back €${f2(backForGreen)} @ ${qCurr}`,ifWins:greenIfLayWins,ifLoses:greenIfLayLoses,color:C.profit},
    ];
  }

  const oddsMove=((qOpen-qCurr)/qOpen*100).toFixed(1);
  const positionInProfit=isBack?qCurr<qOpen:qCurr>qOpen;

  return(
    <div style={{position:"relative",zIndex:1}}>
      <PageHeader icon={<IconPnL/>} title="P&L Simulator" sub="Calcola il profitto/perdita garantito per ogni scenario di uscita live" color={C.warn}/>
      <GuidePanel {...PNL_GUIDE}/>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1.5fr",gap:16}}>
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          <div style={{...card,borderColor:C.borderBright}} className="ec-card">
            <div style={cardDeco(C.warn)}/>
            <div style={{fontSize:11,color:C.textDim,letterSpacing:2,textTransform:"uppercase",marginBottom:16}}>Posizione aperta</div>
            <label style={{fontSize:12,color:C.textSec,marginBottom:5,display:"block"}}>Tipo scommessa</label>
            <select className="ec-input" style={{...inputStyle,cursor:"pointer"}} value={form.betType} onChange={e=>set("betType",e.target.value)}><option value="back">Back</option><option value="lay">Lay</option></select>
            {[["Quota apertura","openOdds","0.1"],["Stake piazzata (€)","stake","1"],["Commissione (%)","commission","0.5"]].map(([lbl,key,step])=>(<div key={key}><label style={{fontSize:12,color:C.textSec,marginBottom:5,display:"block"}}>{lbl}</label><input className="ec-input" style={inputStyle} type="number" step={step} value={form[key]} onChange={e=>set(key,e.target.value)}/></div>))}
          </div>
          <div style={{...card,borderColor:C.borderBright}} className="ec-card">
            <div style={cardDeco(C.accent)}/>
            <div style={{fontSize:11,color:C.textDim,letterSpacing:2,textTransform:"uppercase",marginBottom:16}}>Quota attuale (live)</div>
            <label style={{fontSize:12,color:C.textSec,marginBottom:5,display:"block"}}>Quota corrente Betfair</label>
            <input className="ec-input" style={inputStyle} type="number" step="0.1" value={form.currentOdds} onChange={e=>set("currentOdds",e.target.value)}/>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginTop:4}}>
              {[["Movimento quota",`${oddsMove>0?"-":"+"} ${Math.abs(oddsMove)}%`,positionInProfit?C.profit:C.loss],["Posizione",positionInProfit?"IN PROFITTO":"IN PERDITA",positionInProfit?C.profit:C.loss]].map(([lbl,val,col])=>(<div key={lbl} style={{background:"#050D1A",border:`1px solid ${col}30`,borderRadius:6,padding:"8px 10px"}}><div style={{fontSize:10,color:C.textDim,marginBottom:2}}>{lbl}</div><div style={{fontFamily:"monospace",fontSize:13,fontWeight:700,color:col}}>{val}</div></div>))}
            </div>
          </div>
        </div>

        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          {scenarios.map(s=>(
            <div key={s.label} style={{...card,borderColor:`${s.color}40`,background:`linear-gradient(135deg,#0D1E3A,#090F1E)`}} className="ec-card">
              <div style={cardDeco(s.color)}/>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
                <div><div style={{display:"flex",gap:8,alignItems:"center",marginBottom:4}}><span style={{fontSize:18}}>{s.icon}</span><div style={{fontSize:14,fontWeight:700,color:s.color}}>{s.label}</div></div><div style={{fontSize:12,color:C.textSec}}>{s.desc}</div></div>
                <div style={{textAlign:"right",flexShrink:0}}><div style={{fontSize:10,color:C.textDim,marginBottom:2}}>Azione</div><div style={{fontFamily:"monospace",fontSize:12,color:C.text,fontWeight:600}}>{s.stakeAction}</div></div>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                <div style={{background:"#050D1A",border:`1px solid ${C.profit}30`,borderRadius:6,padding:"10px 12px"}}>
                  <div style={{fontSize:10,color:C.textDim,marginBottom:3}}>Se la tua selezione vince</div>
                  <div style={{fontFamily:"monospace",fontSize:18,fontWeight:700,color:s.ifWins>=0?C.profit:C.loss}}>{s.ifWins>=0?"+":""}€{f2(s.ifWins)}</div>
                </div>
                <div style={{background:"#050D1A",border:`1px solid ${C.loss}30`,borderRadius:6,padding:"10px 12px"}}>
                  <div style={{fontSize:10,color:C.textDim,marginBottom:3}}>Se la tua selezione perde</div>
                  <div style={{fontFamily:"monospace",fontSize:18,fontWeight:700,color:s.ifLoses>=0?C.profit:C.loss}}>{s.ifLoses>=0?"+":""}€{f2(s.ifLoses)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   APP + SIDEBAR
══════════════════════════════════════════════════════════════ */
const TOOLS=[
  {id:"strategy", label:"Strategia",    Icon:IconStrategy, component:StrategyPage,   color:C.profit,  section:"start"},
  {id:"cs",       label:"CS Matrix",    Icon:IconCS,       component:CorrectScoreTool,color:C.accent,  section:"pre"},
  {id:"value",    label:"Value Finder", Icon:IconValue,    component:ValueFinderTool, color:C.accent,  section:"pre"},
  {id:"kelly",    label:"Kelly",        Icon:IconKelly,    component:KellyTool,       color:C.orange,  section:"pre"},
  {id:"dutching", label:"Dutching",     Icon:IconDutch,    component:DutchingTool,    color:C.purple,  section:"pre"},
  {id:"masa",     label:"Masaniello",   Icon:IconMasa,     component:MasanielloTool,  color:C.accent,  section:"pre"},
  {id:"pnl",      label:"P&L Simulator",Icon:IconPnL,     component:PnLTool,         color:C.warn,    section:"live"},
];

const SECTIONS={
  start:{label:"Inizia da qui",tools:["strategy"]},
  pre:  {label:"Prepartita",   tools:["cs","value","kelly","dutching","masa"]},
  live: {label:"Live",         tools:["pnl"]},
};

export default function App(){
  const[active,setActive]=useState("strategy");
  return(
    <>
      <style>{globalCSS}</style>
      <div style={{display:"flex",height:"100vh",width:"100%",background:C.bg,fontFamily:"'Inter',system-ui,sans-serif",color:C.text,overflow:"hidden",position:"relative"}}>
        <GridBackground/>
        <div style={{width:220,minWidth:220,background:`${C.sidebar}EE`,borderRight:`1px solid ${C.border}`,display:"flex",flexDirection:"column",padding:"0 0 12px 0",overflow:"hidden",position:"relative",zIndex:2,backdropFilter:"blur(8px)"}}>
          <div style={{padding:"18px 20px 14px",borderBottom:`1px solid ${C.border}`}}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <IconDelta/>
              <div><div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:17,fontWeight:700,color:C.accent,textShadow:`0 0 20px ${C.accent}66`}}>EdgeCalc</div><div style={{fontSize:9,color:C.textDim,letterSpacing:2.5,textTransform:"uppercase",marginTop:1}}>Exchange Tools</div></div>
            </div>
          </div>
          <div style={{flex:1,overflowY:"auto",paddingBottom:8}}>
            {Object.entries(SECTIONS).map(([secId,sec])=>(
              <div key={secId}>
                <div style={{padding:"10px 12px 4px",fontSize:9,color:C.textDim,letterSpacing:2.5,textTransform:"uppercase"}}>{sec.label}</div>
                {TOOLS.filter(t=>sec.tools.includes(t.id)).map(({id,label,Icon,color})=>{
                  const a=active===id;
                  return(<button key={id} className="ec-nav" onClick={()=>setActive(id)} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 20px",cursor:"pointer",border:"none",background:a?`${color}18`:"transparent",color:a?color:C.textSec,borderLeft:a?`2px solid ${color}`:"2px solid transparent",fontSize:13,fontWeight:a?600:400,width:"100%",textAlign:"left",transition:"all .15s"}}><Icon/>{label}{a&&<div style={{marginLeft:"auto",width:5,height:5,borderRadius:"50%",background:color,boxShadow:`0 0 6px ${color}`}}/>}</button>);
                })}
              </div>
            ))}
          </div>
          <div style={{margin:"0 10px 8px",background:`${C.profit}08`,border:`1px solid ${C.profit}20`,borderRadius:6,padding:"8px 10px"}}>
            <div style={{fontSize:9,color:C.profit,fontWeight:700,marginBottom:4,letterSpacing:1}}>FLUSSO CORRETTO</div>
            {["① CS Matrix","② Value Finder","③ Kelly / Dutching","④ Masaniello","⑤ P&L Simulator (live)"].map((s,i)=>(<div key={i} style={{fontSize:10,color:C.textSec,padding:"1px 0"}}>{s}</div>))}
          </div>
          <div style={{padding:"0 10px"}}><div style={{background:`${C.accent}10`,border:`1px solid ${C.border}`,borderRadius:6,padding:"5px 10px"}}><div style={{fontFamily:"monospace",fontSize:10,color:C.accent}}>v3.1 — 7 tools</div></div></div>
        </div>

        {/* Main — tutti i tool sempre montati, visibilità con display */}
        <div style={{flex:1,overflow:"auto",padding:"28px 32px",position:"relative",zIndex:1}}>
          <div style={{maxWidth:1100,margin:"0 auto"}}>
            {TOOLS.map(({id,component:Tool})=>(
              <div key={id} style={{display:active===id?"block":"none"}}>
                <Tool/>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
