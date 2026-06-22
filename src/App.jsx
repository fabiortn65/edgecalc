
/* ─── TOKENS ─────────────────────────────────────────────────── */
const C = {
  bg:"#080C12", sidebar:"#0A1018", card:"#0D1520",
  border:"#1A2535", borderBright:"#243648",
  accent:"#00C896", accentGlow:"#00C89633",
  profit:"#10B981", profitGlow:"#10B98125",
  loss:"#EF4444", lossGlow:"#EF444425",
  warn:"#F59E0B", warnGlow:"#F59E0B25",
  purple:"#8B5CF6", orange:"#F97316",
  text:"#F1F5F9", textSec:"#64859E", textDim:"#2E4055",
  guideB:"#060E0A", guideBor:"#1A3D2A",
};

/* ─── GLOBAL CONTEXT ─────────────────────────────────────────── */
import { useState, createContext, useContext } from "react";

const AppCtx = createContext(null);
const useApp = () => useContext(AppCtx);

const defaultCtx = {
  // CS Matrix outputs
  lambdaH: "", lambdaA: "",
  csMatrix: null,
  selectedScore: null,   // es. {h:0, a:0}
  selectedProb: null,    // es. 0.148
  selectedOdds: null,    // quota betfair inserita sulla cella
  // Value Finder / Kelly shared
  bankroll: 1000,
  commission: 5,
  // Masaniello
  masaTarget: 200,
  masaEvents: 10,
  masaOdds: null,
  // P&L
  pnlOpenOdds: null,
  pnlStake: null,
};

const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;600;700&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: Inter, system-ui, sans-serif; -webkit-font-smoothing: antialiased; }
  ::-webkit-scrollbar { width: 6px; height: 6px; }
  ::-webkit-scrollbar-track { background: #070E1C; }
  ::-webkit-scrollbar-thumb { background: #243648; border-radius: 3px; }
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
      <div style={{position:"absolute",inset:0,backgroundImage:`linear-gradient(${C.border}55 1px,transparent 1px),linear-gradient(90deg,${C.border}55 1px,transparent 1px)`,backgroundSize:"60px 60px",animation:"gridMove 8s linear infinite",opacity:.35}}/>
      <div style={{position:"absolute",top:-200,left:-200,width:600,height:600,borderRadius:"50%",background:`radial-gradient(circle,${C.accentGlow} 0%,transparent 65%)`,animation:"pulseGlow 4s ease-in-out infinite"}}/>
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
const IconDelta = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
    <rect x="2" y="2" width="28" height="28" rx="7" fill="#00C896" opacity=".12"/>
    <rect x="2" y="2" width="28" height="28" rx="7" stroke="#00C896" strokeWidth="1.2" opacity=".4"/>
    <text x="7" y="23" fontFamily="Inter" fontWeight="800" fontSize="18" fill="#00C896" opacity=".95">L</text>
    <circle cx="23" cy="20" r="3" fill="#00C896" opacity=".7"/>
    <circle cx="23" cy="20" r="1.5" fill="#00C896"/>
  </svg>
);

/* ─── SHARED COMPONENTS ──────────────────────────────────────── */
const card = {background:C.card,border:`1px solid ${C.border}`,borderRadius:10,padding:"20px 22px",position:"relative",overflow:"hidden"};
const cardDeco = (color) => ({position:"absolute",top:0,right:0,width:120,height:120,borderRadius:"50%",background:`radial-gradient(circle,${color}12 0%,transparent 70%)`,pointerEvents:"none"});
const inputStyle = {width:"100%",background:"#060D16",border:`1px solid ${C.border}`,borderRadius:6,color:C.text,padding:"9px 12px",fontSize:14,fontFamily:"'JetBrains Mono',monospace",outline:"none",boxSizing:"border-box",marginBottom:12,transition:"border .15s"};
const btnStyle = (color=C.accent) => ({width:"100%",background:color,color:"#040C1A",border:"none",borderRadius:6,padding:"10px 20px",fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:"inherit",transition:"all .15s",marginTop:4});
const statBox = (color=C.accent) => ({background:"#060D16",border:`1px solid ${C.border}`,borderRadius:6,padding:"10px 12px",marginBottom:8});

const PageHeader = ({icon, title, sub, color=C.accent}) => (
  <div style={{marginBottom:20}}>
    <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:4}}>
      <div style={{color,filter:`drop-shadow(0 0 8px ${color})`}}>{icon}</div>
      <div style={{fontSize:24,fontWeight:800,fontFamily:"Inter,sans-serif",letterSpacing:'-0.3px'}}>{title}</div>
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
          <div><div style={{fontSize:20,fontWeight:700,fontFamily:"'JetBrains Mono',monospace",marginBottom:6}}>Il Metodo LayLab</div><div style={{fontSize:14,color:C.textSec,lineHeight:1.75,maxWidth:700}}>Il betting intelligente non è fortuna — è <span style={{color:C.accent,fontWeight:600}}>matematica applicata al mercato</span>. Scommetti solo quando la quota è più alta del fair value calcolato dal modello. Questo vantaggio si chiama <em style={{color:C.profit}}>edge</em> e, se costante, genera profitto nel lungo periodo.</div></div>
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
          {[["xG Casa","0.95",C.accent],["xG Ospite","0.88",C.accent],["Quota CS 0-0","9.40",C.warn]].map(([l,v,c])=>(<div key={l} style={{background:"#060D16",border:`1px solid ${C.border}`,borderRadius:6,padding:"10px 12px"}}><div style={{fontSize:10,color:C.textDim,marginBottom:3}}>{l}</div><div style={{fontFamily:"monospace",fontSize:16,fontWeight:700,color:c}}>{v}</div></div>))}
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
const CS_GUIDE={steps:[
  {title:"Trova gli xG delle due squadre",desc:"Cerca le medie xG su Understat.com o FBref. Considera le ultime 5-10 partite. Inserisci anche la form recente W/D/L per affinare il modello.",example:"Casa: 1.1 xG — Ospite: 0.9 xG"},
  {title:"Inserisci la form recente",desc:"Inserisci i risultati delle ultime 5 partite (W=vittoria D=pareggio L=sconfitta) per entrambe le squadre. Il sistema applica un moltiplicatore ai lambda basato sulla forma.",example:"Casa: W W D L W — Ospite: L D W D L"},
  {title:"Calcola e analizza la matrice",desc:"La matrice 4x4 rispecchia esattamente i mercati Betfair CS (0-0 fino a 3-3). Clicca → USA su una cella per inviare i dati agli altri tool."},
  {title:"Controlla Under/Over con le quote reali",desc:"Inserisci le quote Betfair nella sezione Under/Over per vedere l'edge su ogni mercato da 0.5 a 4.5 gol.",example:"Under 2.5 quota 1.85 → edge +3.2%"},
  {title:"Usa il pannello Live Stats durante la partita",desc:"Inserisci i dati live (tiri, possesso, attacchi pericolosi) per rivalutare la probabilità in tempo reale e ricevere il suggerimento sulla tecnica migliore da usare."}
],tip:"Combina Form + xG per lambda più precisi. In Live, tiri in porta > 3 per squadra nelle prime 30' indicano partita aperta — considera di rivalutare l'Under."};

function CorrectScoreTool(){
  const{ctx,setCtx}=useApp();
  const[form,setForm]=useState({lambdaH:ctx.lambdaH||1.1,lambdaA:ctx.lambdaA||0.9});
  const[matrix,setMatrix]=useState(ctx.csMatrix||null);
  const[odds,setOdds]=useState({});
  const[ouOdds,setOuOdds]=useState({});
  const[highlighted,setHighlighted]=useState(ctx.selectedScore||null);
  const[formH,setFormH]=useState(["W","D","W","L","W"]);
  const[formA,setFormA]=useState(["L","D","W","D","L"]);
  const[liveStats,setLiveStats]=useState({minute:0,shotsH:0,shotsA:0,shotsOnH:0,shotsOnA:0,possH:50,dangerH:0,dangerA:0,scoreH:0,scoreA:0});
  const[liveMode,setLiveMode]=useState(false);
  const[activeTab,setActiveTab]=useState("matrix");
  const MAX=3;

  // Form multiplier: W=1.1, D=1.0, L=0.9, weighted recent
  const formMult=(arr)=>{
    const w=[0.35,0.25,0.2,0.12,0.08];
    const map={W:1.12,D:1.0,L:0.88};
    return arr.reduce((s,r,i)=>s+(map[r]||1)*w[i],0)/w.reduce((a,b)=>a+b,0);
  };

  const getLambdas=()=>{
    const mH=formMult(formH),mA=formMult(formA);
    let lH=parseFloat(form.lambdaH)*mH;
    let lA=parseFloat(form.lambdaA)*mA;
    // Live adjustment: shots on target ratio
    if(liveMode&&parseInt(liveStats.minute)>0){
      const min=Math.max(1,parseInt(liveStats.minute));
      const sOH=parseFloat(liveStats.shotsOnH)||0;
      const sOA=parseFloat(liveStats.shotsOnA)||0;
      const remaining=(90-min)/90;
      const liveRateH=(sOH/min)*90*0.35;
      const liveRateA=(sOA/min)*90*0.35;
      lH=lH*0.4+liveRateH*0.6;
      lA=lA*0.4+liveRateA*0.6;
      // Adjust for current score
      lH=Math.max(0.1,lH*remaining+(parseFloat(liveStats.scoreH)||0));
      lA=Math.max(0.1,lA*remaining+(parseFloat(liveStats.scoreA)||0));
    }
    return{lH:Math.max(0.1,lH),lA:Math.max(0.1,lA)};
  };

  const calc=()=>{
    const{lH,lA}=getLambdas();
    const m=pMatrix(lH,lA,MAX);
    setMatrix(m);
    setCtx(c=>({...c,lambdaH:lH,lambdaA:lA,csMatrix:m,selectedScore:null,selectedProb:null,selectedOdds:null,masaOdds:null}));
  };

  const selectCell=(h,a,prob,oddVal)=>{
    setHighlighted({h,a});
    const q=oddVal?parseFloat(oddVal):null;
    setCtx(c=>({...c,selectedScore:{h,a},selectedProb:prob,selectedOdds:q,masaOdds:q,pnlOpenOdds:q}));
  };

  const scores=[];
  for(let h=0;h<=MAX;h++)for(let a=0;a<=MAX;a++)scores.push([h,a]);
  const getEdge=(h,a)=>{if(!matrix||!odds[`${h}-${a}`])return null;return(matrix[h][a]-1/parseFloat(odds[`${h}-${a}`]))*100;};
  const getOUEdge=(line,type)=>{
    if(!matrix||!ouOdds[`${type}${line}`])return null;
    const total=scores.reduce((s,[h,a])=>{
      const g=h+a;
      return s+(type==="U"?g<line:g>=line?matrix[h][a]:0);
    },0);
    return(total-1/parseFloat(ouOdds[`${type}${line}`]))*100;
  };
  const getOUProb=(line,type)=>!matrix?0:scores.reduce((s,[h,a])=>s+(type==="U"?h+a<line:h+a>=line?matrix[h][a]:0),0);

  const sorted=matrix?[...scores].sort((a,b)=>matrix[b[0]][b[1]]-matrix[a[0]][a[1]]).slice(0,6):[];

  // Live suggestion logic — soglie calibrate su dati reali
  const getLiveSuggestion=()=>{
    const min=parseInt(liveStats.minute)||0;
    const totShots=(parseFloat(liveStats.shotsH)||0)+(parseFloat(liveStats.shotsA)||0);
    const sOH=parseFloat(liveStats.shotsOnH)||0;
    const sOA=parseFloat(liveStats.shotsOnA)||0;
    const totShotsOn=sOH+sOA;
    const danH=parseFloat(liveStats.dangerH)||0;
    const danA=parseFloat(liveStats.dangerA)||0;
    const totDanger=danH+danA;
    const score=`${liveStats.scoreH}-${liveStats.scoreA}`;
    const is00=score==="0-0";
    // Soglie normalizzate per 30 minuti di gioco
    const rateShots=min>0?totShots/(min/30):0;
    const rateShotsOn=min>0?totShotsOn/(min/30):0;
    const rateDanger=min>0?totDanger/(min/30):0;
    // Partita aperta: ritmo alto confermato da PIU' indicatori
    const isOpen=(rateShots>5&&rateShotsOn>2)||(rateShotsOn>3)||(rateDanger>12&&rateShotsOn>1.5);
    const isLocked=rateShots<3&&rateShotsOn<1.5&&rateDanger<5;
    const isNeutral=!isOpen&&!isLocked;
    if(min===0)return{tech:"Inserisci i dati",conf:"–",color:C.textDim,reason:"Inserisci minuto e statistiche live per ricevere il suggerimento sulla tecnica migliore da usare."};
    if(min<25){
      if(isLocked&&is00)return{tech:"CS 0-0 Back",conf:"Media",color:C.profit,reason:`Al ${min}' con ${totShots} tiri totali e ${totShotsOn} in porta — ritmo basso. Buon segnale per il CS 0-0, ma aspetta ancora qualche minuto per conferma.`};
      return{tech:"Attendi (dati insufficienti)",conf:"–",color:C.textSec,reason:`Al ${min}' il campione statistico è troppo piccolo: ${totShots} tiri e ${totShotsOn} in porta. Aspetta il 25-30' prima di prendere decisioni.`};
    }
    if(min>=25&&min<60){
      if(is00&&isLocked)return{tech:"CS 0-0 + Under 2.5",conf:"Alta",color:C.profit,reason:`0-0 al ${min}' con ritmo basso confermato: ${totShots} tiri, ${totShotsOn} in porta, ${totDanger} attacchi pericolosi. Combo ideale: mantieni CS 0-0 e aggiungi Under 2.5 Live.`};
      if(is00&&isOpen)return{tech:"Lay Under 2.5 / Over Back",conf:"Media",color:C.warn,reason:`0-0 al ${min}' ma ritmo elevato: ${totShots} tiri e ${totShotsOn} in porta. Il gol è probabile — valuta Lay Under 2.5 o Back Over 2.5.`};
      if(is00&&isNeutral)return{tech:"Mantieni CS 0-0",conf:"Media",color:C.accent,reason:`0-0 al ${min}' con ritmo nella norma (${totShots} tiri, ${totShotsOn} in porta). Mantieni la posizione e rivaluta al 60'.`};
      if(!is00)return{tech:"P&L Simulator",conf:"Alta",color:C.accent,reason:`Il punteggio è ${score} al ${min}'. Vai al P&L Simulator per calcolare il green ottimale o gestire la perdita.`};
    }
    if(min>=60&&min<80){
      if(is00&&isLocked)return{tech:"CS 0-0 + Under 2.5",conf:"Molto Alta",color:C.profit,reason:`0-0 al ${min}' con ritmo basso — momento d'oro. Mantieni CS 0-0 e aggiungi Under 2.5: le quote scendono, il profitto cresce.`};
      if(is00&&isOpen)return{tech:"Green parziale (70%)",conf:"Alta",color:C.warn,reason:`0-0 al ${min}' ma pressione alta: ${totShotsOn} tiri in porta, ${totDanger} attacchi pericolosi. Usa P&L Simulator per garantire il 60-70% del profitto.`};
      if(is00&&isNeutral)return{tech:"CS 0-0 Hold",conf:"Alta",color:C.profit,reason:`0-0 al ${min}' con ritmo nella norma. Tieni la posizione — ogni minuto vale profitto aggiuntivo.`};
      if(!is00)return{tech:"P&L Simulator",conf:"Alta",color:C.accent,reason:`Punteggio ${score} al ${min}'. Gestisci subito la posizione con il P&L Simulator.`};
    }
    if(min>=80){
      if(is00&&isLocked)return{tech:"Hold fino al 90'",conf:"Molto Alta",color:C.profit,reason:`0-0 all'${min}' con partita bloccata (${totShotsOn} tiri in porta). Non uscire — il profitto massimo è a portata. Eventuale Lay minimo solo se vuoi sicurezza assoluta.`};
      if(is00&&(isOpen||isNeutral))return{tech:"Lay parziale urgente",conf:"Alta",color:C.warn,reason:`0-0 all'${min}' ma con ${totShotsOn} tiri in porta — rischio gol negli ultimi minuti. Usa P&L Simulator: fai Lay parziale per incassare il 50-60% del profitto subito.`};
      if(!is00)return{tech:"P&L Simulator",conf:"Molto Alta",color:C.accent,reason:`Punteggio ${score} all'${min}'. Chiudi la posizione con il P&L Simulator nel modo più conveniente.`};
    }
    return{tech:"Nessuna raccomandazione",conf:"–",color:C.textDim,reason:"Inserisci i dati live per ricevere un suggerimento."};
  };

  const tabs=[{id:"matrix",label:"Matrice CS"},{id:"ou",label:"Under / Over"},{id:"live",label:"⚡ Live Stats"}];

  return(
    <div style={{position:"relative",zIndex:1}}>
      <PageHeader icon={<IconCS/>} title="Correct Score Matrix" sub="Probabilità Poisson — matrice 4x4 Betfair + Under/Over + Live Stats"/>
      {ctx.selectedScore&&(<div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16,padding:"8px 12px",background:`${C.profit}0A`,border:`1px solid ${C.profit}30`,borderRadius:6}}><span style={{fontSize:14}}>✓</span><div style={{fontSize:12,color:C.profit,fontWeight:600}}>Risultato <span style={{fontFamily:"monospace"}}>{ctx.selectedScore.h}-{ctx.selectedScore.a}</span> selezionato — prob <span style={{fontFamily:"monospace"}}>{pct(ctx.selectedProb)}</span>{ctx.selectedOdds&&<span> · quota <span style={{fontFamily:"monospace"}}>{ctx.selectedOdds}</span></span>} · dati propagati a tutti i tool</div></div>)}
      <GuidePanel {...CS_GUIDE}/>

      {/* Input + Form */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16}}>
        <div style={{...card,borderColor:C.borderBright}} className="ec-card">
          <div style={cardDeco(C.accent)}/>
          <div style={{fontSize:11,color:C.textDim,letterSpacing:2,textTransform:"uppercase",marginBottom:14}}>Parametri attacco</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12}}>
            {[["xG Casa (λ)","lambdaH"],["xG Ospite (λ)","lambdaA"]].map(([lbl,key])=>(<div key={key}><label style={{fontSize:12,color:C.textSec,marginBottom:5,display:"block"}}>{lbl}</label><input className="ec-input" style={inputStyle} type="number" step="0.1" value={form[key]} onChange={e=>setForm(f=>({...f,[key]:e.target.value}))}/></div>))}
          </div>
          <div style={{fontSize:11,color:C.textDim,letterSpacing:1.5,textTransform:"uppercase",marginBottom:8}}>Form recente (click per cambiare)</div>
          {[["Casa",formH,setFormH],["Ospite",formA,setFormA]].map(([lbl,arr,setArr])=>(
            <div key={lbl} style={{marginBottom:10}}>
              <div style={{fontSize:11,color:C.textSec,marginBottom:5}}>{lbl} — ultime 5 partite</div>
              <div style={{display:"flex",gap:5}}>
                {arr.map((r,i)=>{
                  const col=r==="W"?C.profit:r==="D"?C.warn:C.loss;
                  return(<button key={i} onClick={()=>{const cycle={W:"D",D:"L",L:"W"};const n=[...arr];n[i]=cycle[r];setArr(n);}} style={{width:32,height:32,borderRadius:5,background:`${col}20`,border:`1px solid ${col}50`,color:col,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"monospace"}}>{r}</button>);
                })}
              </div>
            </div>
          ))}
          <div style={{fontSize:11,color:C.textDim,marginBottom:8,padding:"6px 10px",background:"#060D16",borderRadius:5}}>
            λ aggiustata: <span style={{color:C.accent,fontFamily:"monospace"}}>{getLambdas().lH.toFixed(2)}</span> vs <span style={{color:C.accent,fontFamily:"monospace"}}>{getLambdas().lA.toFixed(2)}</span>
          </div>
          <button className="ec-btn" onClick={calc} style={btnStyle()}>Calcola →</button>
        </div>

        {matrix&&(
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            <div style={card} className="ec-card">
              <div style={cardDeco(C.warn)}/>
              <div style={{fontSize:11,color:C.textDim,letterSpacing:2,textTransform:"uppercase",marginBottom:12}}>Probabilità aggregate</div>
              {[["🏠 Casa",scores.filter(([h,a])=>h>a).reduce((s,[h,a])=>s+matrix[h][a],0),C.text],["➖ Pareggio",scores.filter(([h,a])=>h===a).reduce((s,[h,a])=>s+matrix[h][a],0),C.text],["✈️ Ospite",scores.filter(([h,a])=>h<a).reduce((s,[h,a])=>s+matrix[h][a],0),C.text],["📉 Under 2.5",getOUProb(3,"U"),C.textSec],["📈 Over 2.5",getOUProb(3,"O"),C.textSec],["⭐ CS 0-0",matrix[0][0],C.warn]].map(([lbl,prob,col])=>(<div key={lbl} style={{display:"flex",justifyContent:"space-between",padding:"5px 0",borderBottom:`1px solid ${C.border}20`}}><span style={{color:C.textSec,fontSize:12}}>{lbl}</span><div><span style={{fontFamily:"monospace",color:col,fontWeight:600}}>{pct(prob)}</span><span style={{color:C.textDim,fontSize:11,marginLeft:5}}>({f2(1/prob)})</span></div></div>))}
            </div>
            <div style={card} className="ec-card">
              <div style={cardDeco(C.profit)}/>
              <div style={{fontSize:11,color:C.textDim,letterSpacing:2,textTransform:"uppercase",marginBottom:10}}>Top 6 risultati</div>
              {sorted.map(([h,a])=>{const prob=matrix[h][a];const edge=getEdge(h,a);const w=Math.min(prob/matrix[sorted[0][0]][sorted[0][1]]*100,100);return(<div key={`${h}-${a}`} style={{marginBottom:7}}><div style={{display:"flex",alignItems:"center",gap:7,marginBottom:2}}><span style={{minWidth:28,padding:"1px 5px",background:`${C.accent}20`,color:C.accent,borderRadius:3,fontSize:11,fontWeight:700,fontFamily:"monospace",textAlign:"center"}}>{h}-{a}</span><div style={{flex:1,height:4,background:C.border,borderRadius:2,overflow:"hidden"}}><div style={{height:4,width:`${w}%`,background:`linear-gradient(90deg,${C.accent},${C.profit})`,borderRadius:2}}/></div><span style={{fontFamily:"monospace",fontSize:11,minWidth:36}}>{pct(prob)}</span>{edge!==null&&<span style={{padding:"1px 5px",background:edge>0?`${C.profit}20`:`${C.loss}20`,color:edge>0?C.profit:C.loss,borderRadius:3,fontSize:10,fontFamily:"monospace",minWidth:44,textAlign:"center"}}>{edge>0?"+":""}{edge.toFixed(1)}%</span>}</div></div>);})}
            </div>
          </div>
        )}
      </div>

      {/* Tabs */}
      {matrix&&(<>
        <div style={{display:"flex",gap:8,marginBottom:16}}>
          {tabs.map(t=>(<button key={t.id} onClick={()=>setActiveTab(t.id)} style={{padding:"7px 16px",borderRadius:6,border:`1px solid ${activeTab===t.id?C.accent:C.border}`,background:activeTab===t.id?`${C.accent}18`:"transparent",color:activeTab===t.id?C.accent:C.textSec,fontSize:13,fontWeight:activeTab===t.id?700:400,cursor:"pointer",fontFamily:"inherit",transition:"all .15s"}}>{t.label}</button>))}
        </div>

        {/* TAB 1: CS MATRIX 4x4 */}
        {activeTab==="matrix"&&(
          <div style={card} className="ec-card">
            <div style={{fontSize:11,color:C.textDim,letterSpacing:2,textTransform:"uppercase",marginBottom:6}}>Matrice Correct Score — 0-0 → 3-3 (mercati Betfair)</div>
            <div style={{fontSize:11,color:C.textSec,marginBottom:14}}>Inserisci la quota Betfair in ogni cella, poi clicca <strong style={{color:C.accent}}>→ USA</strong> per propagare i dati a tutti i tool</div>
            <div style={{overflowX:"auto"}}>
              <table style={{borderCollapse:"separate",borderSpacing:4}}>
                <thead><tr>
                  <th style={{padding:"4px 10px",fontSize:10,color:C.textDim,textAlign:"center",minWidth:50}}>Casa↓ Osp→</th>
                  {Array.from({length:MAX+1},(_,i)=><th key={i} style={{padding:"4px 8px",fontSize:12,color:C.textSec,textAlign:"center",minWidth:90,fontFamily:"monospace"}}>{i}</th>)}
                </tr></thead>
                <tbody>
                  {Array.from({length:MAX+1},(_,h)=>(
                    <tr key={h}>
                      <td style={{padding:"4px 10px",fontSize:12,color:C.textSec,fontWeight:700,textAlign:"center",fontFamily:"monospace"}}>{h}</td>
                      {Array.from({length:MAX+1},(_,a)=>{
                        const prob=matrix[h][a];
                        const edge=getEdge(h,a);
                        const intensity=Math.min(prob*9,.9);
                        const isZZ=h===0&&a===0;
                        const isHL=highlighted&&highlighted.h===h&&highlighted.a===a;
                        const bg=isHL?`rgba(0,255,157,0.2)`:isZZ?`rgba(255,184,0,${intensity+.1})`:`rgba(0,194,255,${intensity})`;
                        const bord=isHL?`2px solid ${C.profit}`:isZZ?`1px solid rgba(255,184,0,${intensity*.7+.1})`:`1px solid rgba(0,194,255,${intensity*.5+.05})`;
                        return(
                          <td key={a} style={{padding:3}}>
                            <div style={{background:bg,border:bord,borderRadius:7,padding:"6px 4px",textAlign:"center",minWidth:86,transition:"all .2s"}}>
                              <div style={{fontFamily:"monospace",fontSize:12,fontWeight:700,color:intensity>0.55&&!isHL?"#040C1A":C.text}}>{pct(prob)}</div>
                              <input placeholder="quota BF" value={odds[`${h}-${a}`]||""} onChange={e=>{const v=e.target.value;setOdds(o=>({...o,[`${h}-${a}`]:v}));if(isHL)selectCell(h,a,prob,v);}}
                                style={{width:62,fontSize:10,background:"rgba(0,0,0,0.3)",border:"1px solid rgba(255,255,255,0.12)",borderRadius:3,color:"#fff",padding:"2px 4px",textAlign:"center",fontFamily:"monospace",outline:"none",marginTop:3,boxSizing:"border-box"}}/>
                              {edge!==null&&<div style={{fontSize:10,color:edge>0?C.profit:C.loss,fontFamily:"monospace",fontWeight:700,marginTop:2}}>{edge>0?"+":""}{edge.toFixed(1)}%</div>}
                              <button onClick={()=>selectCell(h,a,prob,odds[`${h}-${a}`])}
                                style={{marginTop:3,width:"100%",background:isHL?`${C.profit}30`:"rgba(0,194,255,0.08)",border:`1px solid ${isHL?C.profit:"rgba(0,194,255,0.2)"}`,borderRadius:3,color:isHL?C.profit:C.accent,fontSize:9,cursor:"pointer",padding:"2px 0",fontFamily:"inherit",fontWeight:700}}>
                                {isHL?"✓ ATTIVO":"→ USA"}
                              </button>
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: UNDER/OVER */}
        {activeTab==="ou"&&(
          <div style={card} className="ec-card">
            <div style={{fontSize:11,color:C.textDim,letterSpacing:2,textTransform:"uppercase",marginBottom:14}}>Under / Over — inserisci quote Betfair per l'edge automatico</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:10}}>
              {[0.5,1.5,2.5,3.5,4.5].map(line=>{
                const probU=getOUProb(line,"U");
                const probO=getOUProb(line,"O");
                const edgeU=getOUEdge(line,"U");
                const edgeO=getOUEdge(line,"O");
                return(
                  <div key={line} style={{background:"#060D16",border:`1px solid ${C.border}`,borderRadius:8,padding:"12px 10px"}}>
                    <div style={{fontFamily:"monospace",fontSize:13,fontWeight:700,color:C.accent,textAlign:"center",marginBottom:10}}>{line} Gol</div>
                    {[["Under",probU,edgeU,"U"],["Over",probO,edgeO,"O"]].map(([lbl,prob,edge,type])=>(
                      <div key={lbl} style={{marginBottom:10}}>
                        <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                          <span style={{fontSize:11,color:C.textSec}}>{lbl}</span>
                          <span style={{fontFamily:"monospace",fontSize:11,color:C.text,fontWeight:600}}>{pct(prob)}</span>
                        </div>
                        <div style={{height:3,background:C.border,borderRadius:2,marginBottom:5}}><div style={{height:3,width:pct(prob),background:type==="U"?C.accent:C.purple,borderRadius:2}}/></div>
                        <div style={{fontSize:10,color:C.textDim,marginBottom:3}}>Fair: {f2(1/prob)}</div>
                        <input placeholder="Quota BF" value={ouOdds[`${type}${line}`]||""} onChange={e=>setOuOdds(o=>({...o,[`${type}${line}`]:e.target.value}))}
                          style={{width:"100%",fontSize:11,background:"#060D16",border:`1px solid ${edge!==null&&edge>0?C.profit:C.border}`,borderRadius:4,color:"#fff",padding:"4px 6px",textAlign:"center",fontFamily:"monospace",outline:"none",boxSizing:"border-box",marginBottom:4}}/>
                        {edge!==null&&(
                          <div style={{textAlign:"center",padding:"3px 0",background:edge>0?`${C.profit}15`:`${C.loss}15`,border:`1px solid ${edge>0?C.profit:C.loss}30`,borderRadius:4}}>
                            <span style={{fontFamily:"monospace",fontSize:11,fontWeight:700,color:edge>0?C.profit:C.loss}}>{edge>0?"+":""}{edge.toFixed(2)}%</span>
                            <span style={{fontSize:9,color:C.textDim,marginLeft:4}}>{edge>0?"VALUE":"no edge"}</span>
                          </div>
                        )}
                        {edge!==null&&edge>0&&(
                          <button onClick={()=>setCtx(c=>({...c,selectedOdds:parseFloat(ouOdds[`${type}${line}`]),selectedProb:prob,masaOdds:parseFloat(ouOdds[`${type}${line}`]),selectedScore:null}))}
                            style={{width:"100%",marginTop:4,background:`${C.accent}15`,border:`1px solid ${C.accent}40`,color:C.accent,borderRadius:4,padding:"3px 0",fontSize:9,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>→ USA nei tool</button>
                        )}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: LIVE STATS */}
        {activeTab==="live"&&(
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
            <div style={{...card,borderColor:`${C.warn}44`}} className="ec-card">
              <div style={cardDeco(C.warn)}/>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
                <div style={{fontSize:11,color:C.textDim,letterSpacing:2,textTransform:"uppercase"}}>Dati Live Partita</div>
                <div style={{display:"flex",gap:6,alignItems:"center"}}>
                  <div style={{width:8,height:8,borderRadius:"50%",background:C.loss,boxShadow:`0 0 6px ${C.loss}`,animation:"pulseGlow 1s infinite"}}/>
                  <span style={{fontSize:11,color:C.loss,fontWeight:600}}>LIVE</span>
                </div>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:12}}>
                {[["Minuto","minute","1","⏱"],["Gol Casa","scoreH","1","⚽"],["Gol Ospite","scoreA","1","⚽"]].map(([lbl,key,step,icon])=>(
                  <div key={key}>
                    <label style={{fontSize:10,color:C.textSec,marginBottom:4,display:"block"}}>{icon} {lbl}</label>
                    <input className="ec-input" style={{...inputStyle,marginBottom:0,textAlign:"center",fontSize:16,fontWeight:700,color:C.warn}} type="number" step={step} value={liveStats[key]} onChange={e=>setLiveStats(s=>({...s,[key]:e.target.value}))}/>
                  </div>
                ))}
              </div>
              <div style={{fontSize:11,color:C.textDim,letterSpacing:1,textTransform:"uppercase",marginBottom:8}}>Statistiche</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                {[["Tiri Casa","shotsH"],["Tiri Ospite","shotsA"],["Tiri in porta Casa","shotsOnH"],["Tiri in porta Ospite","shotsOnA"],["Possesso Casa (%)","possH"],["Attacchi pericolosi Casa","dangerH"],["","dangerA_label"],["Attacchi pericolosi Ospite","dangerA"]].filter(x=>x[1]!=="dangerA_label").map(([lbl,key])=>(
                  <div key={key}>
                    <label style={{fontSize:10,color:C.textSec,marginBottom:3,display:"block"}}>{lbl}</label>
                    <input className="ec-input" style={{...inputStyle,marginBottom:0}} type="number" step="1" value={liveStats[key]} onChange={e=>setLiveStats(s=>({...s,[key]:e.target.value}))}/>
                  </div>
                ))}
              </div>
              <button className="ec-btn" onClick={calc} style={{...btnStyle(C.warn),marginTop:12}}>Ricalcola con dati live →</button>
            </div>

            <div style={{display:"flex",flexDirection:"column",gap:12}}>
              {/* Suggestion */}
              {(()=>{
                const sug=getLiveSuggestion();
                return(
                  <div style={{...card,border:`2px solid ${sug.color}`,background:`linear-gradient(135deg,#0D1E3A,#090F1E)`}} className="ec-card">
                    <div style={cardDeco(sug.color)}/>
                    <div style={{fontSize:11,color:C.textDim,letterSpacing:2,textTransform:"uppercase",marginBottom:8}}>Tecnica consigliata</div>
                    <div style={{fontSize:22,fontFamily:"'JetBrains Mono',monospace",fontWeight:700,color:sug.color,textShadow:`0 0 15px ${sug.color}50`,marginBottom:6}}>{sug.tech}</div>
                    <div style={{display:"inline-block",padding:"2px 8px",background:`${sug.color}15`,border:`1px solid ${sug.color}30`,borderRadius:4,fontSize:11,color:sug.color,fontFamily:"monospace",marginBottom:10}}>Confidenza: {sug.conf}</div>
                    <div style={{fontSize:13,color:C.textSec,lineHeight:1.7}}>{sug.reason}</div>
                  </div>
                );
              })()}

              {/* Live lambda recap */}
              <div style={card} className="ec-card">
                <div style={cardDeco(C.accent)}/>
                <div style={{fontSize:11,color:C.textDim,letterSpacing:2,textTransform:"uppercase",marginBottom:12}}>Lambda live aggiornati</div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                  {[["λ Casa (orig.)",parseFloat(form.lambdaH).toFixed(2),C.textSec],["λ Ospite (orig.)",parseFloat(form.lambdaA).toFixed(2),C.textSec],["λ Casa (live)",getLambdas().lH.toFixed(2),C.accent],["λ Ospite (live)",getLambdas().lA.toFixed(2),C.accent]].map(([lbl,val,col])=>(
                    <div key={lbl} style={{background:"#060D16",border:`1px solid ${C.border}`,borderRadius:6,padding:"8px 10px"}}>
                      <div style={{fontSize:10,color:C.textDim,marginBottom:2}}>{lbl}</div>
                      <div style={{fontFamily:"monospace",fontSize:16,fontWeight:700,color:col}}>{val}</div>
                    </div>
                  ))}
                </div>
                <div style={{marginTop:10,fontSize:12,color:C.textSec,lineHeight:1.6,padding:"8px 10px",background:"#060D16",borderRadius:5}}>
                  I lambda live combinano i dati storici (40%) con il ritmo di tiri del match (60%) proiettati sui minuti rimanenti.
                </div>
              </div>

              {/* Possession bar */}
              <div style={card} className="ec-card">
                <div style={{fontSize:11,color:C.textDim,letterSpacing:2,textTransform:"uppercase",marginBottom:10}}>Possesso palla</div>
                <div style={{height:20,background:C.border,borderRadius:10,overflow:"hidden",position:"relative"}}>
                  <div style={{height:"100%",width:`${liveStats.possH}%`,background:`linear-gradient(90deg,${C.accent},${C.accentGlow})`,borderRadius:10,transition:"width .4s ease"}}/>
                </div>
                <div style={{display:"flex",justifyContent:"space-between",marginTop:5}}>
                  <span style={{fontFamily:"monospace",fontSize:12,color:C.accent,fontWeight:700}}>Casa {liveStats.possH}%</span>
                  <span style={{fontFamily:"monospace",fontSize:12,color:C.purple,fontWeight:700}}>Ospite {100-parseInt(liveStats.possH||50)}%</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </>)}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   3. VALUE FINDER
══════════════════════════════════════════════════════════════ */
const VALUE_GUIDE={steps:[{title:"Scegli Back o Lay",desc:"Back = punti su un esito. Lay = punti contro.",example:"Tipo: Back"},{title:"Quota Betfair Exchange",desc:"Copia la quota dall'Exchange, non dal Sportsbook.",example:"Quota: 9.40"},{title:"Probabilità stimata dalla CS Matrix",desc:"NON usare la prob implicita della quota. Usa quella dalla matrice.",example:"Prob: 14.8%"},{title:"Leggi il verdetto e il gauge",desc:"EV positivo = VALUE BET. Il gauge mostra l'intensità del vantaggio."}],tip:"Collega sempre CS Matrix → Value Finder. La probabilità viene dalla matrice, non dalla tua sensazione."};

function ValueFinderTool(){
  const{ctx,setCtx}=useApp();
  const[form,setForm]=useState({
    betType:"back",
    odds:ctx.selectedOdds||3.0,
    probPct:ctx.selectedProb?parseFloat((ctx.selectedProb*100).toFixed(2)):35,
    commission:ctx.commission||5,
    stake:100,
  });
  const[lastCtxKey,setLastCtxKey]=useState(null);
  const set=(k,v)=>{
    setForm(f=>({...f,[k]:v}));
    if(k==="commission")setCtx(c=>({...c,commission:parseFloat(v)}));
    if(k==="stake")setCtx(c=>({...c,pnlStake:parseFloat(v)}));
  };
  // Auto-sync quando CS Matrix seleziona una cella
  const ctxKey=ctx.selectedScore?`${ctx.selectedScore.h}-${ctx.selectedScore.a}-${ctx.selectedOdds}`:"none";
  if(ctxKey!==lastCtxKey&&ctxKey!=="none"){
    setLastCtxKey(ctxKey);
    setForm(f=>({
      ...f,
      odds:ctx.selectedOdds?parseFloat(ctx.selectedOdds):f.odds,
      probPct:ctx.selectedProb?parseFloat((ctx.selectedProb*100).toFixed(2)):f.probPct,
      commission:ctx.commission||f.commission,
    }));
  }
  const q=parseFloat(form.odds),prob=parseFloat(form.probPct)/100,comm=parseFloat(form.commission)/100,stake=parseFloat(form.stake);
  const isBack=form.betType==="back";
  const bNP=stake*(q-1)*(1-comm),bEV=prob*bNP-(1-prob)*stake,bROI=bEV/stake,bBE=1/q,impl=1/q,bEdge=prob-impl;
  const lLia=stake*(q-1),lNP=stake*(1-comm),lEV=(1-prob)*lNP-prob*lLia,lROI=lEV/stake,lBE=1-1/q;
  const ev=isBack?bEV:lEV,roi=isBack?bROI:lROI,edge=isBack?bEdge:(1-prob)-(1-1/q),be=isBack?bBE:lBE;
  const fairB=1/prob,fairL=1/(1-prob),evColor=ev>0?C.profit:ev<0?C.loss:C.textSec;
  return(
    <div style={{position:"relative",zIndex:1}}>
      <PageHeader icon={<IconValue/>} title="Value Finder" sub="Expected Value, edge e breakeven per Back e Lay su Betfair Exchange"/>
      {ctx.selectedScore&&(<div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16,padding:"8px 12px",background:`${C.accent}08`,border:`1px solid ${C.accent}25`,borderRadius:6,fontSize:12}}><span>🔗</span><span style={{color:C.textSec}}>Dati dalla CS Matrix: risultato <span style={{color:C.accent,fontFamily:"monospace",fontWeight:600}}>{ctx.selectedScore.h}-{ctx.selectedScore.a}</span> · prob <span style={{color:C.accent,fontFamily:"monospace"}}>{pct(ctx.selectedProb)}</span>{ctx.selectedOdds&&<span> · quota <span style={{color:C.accent,fontFamily:"monospace"}}>{ctx.selectedOdds}</span></span>} già precompilati</span></div>)}
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
              {[["EV",`€ ${f2(ev)}`,ev>=0?C.profit:C.loss],["ROI",`${(roi*100).toFixed(2)}%`,roi>=0?C.profit:C.loss],["Edge",`${(edge*100).toFixed(2)}%`,edge>=0?C.profit:C.loss],["Breakeven",pct(be),C.warn],["Prob. stimata",pct(prob),C.accent],["Prob. implicita",pct(impl),C.textSec],["Fair Back",f2(fairB),C.accent],["Fair Lay",f2(fairL),C.warn]].map(([lbl,val,col])=>(<div key={lbl} style={{background:"#060D16",border:`1px solid ${C.border}`,borderRadius:6,padding:"9px 11px"}}><div style={{fontSize:10,color:C.textDim,marginBottom:3}}>{lbl}</div><div style={{fontFamily:"monospace",fontSize:15,fontWeight:700,color:col}}>{val}</div></div>))}
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
  const{ctx,setCtx}=useApp();
  const[form,setForm]=useState({
    bankroll:ctx.bankroll||1000,
    odds:ctx.selectedOdds||9.4,
    probPct:ctx.selectedProb?parseFloat((ctx.selectedProb*100).toFixed(2)):14.8,
    commission:ctx.commission||5,
  });
  const[lastCtxKey,setLastCtxKey]=useState(null);
  const set=(k,v)=>{
    setForm(f=>({...f,[k]:v}));
    if(k==="bankroll")setCtx(c=>({...c,bankroll:parseFloat(v)}));
    if(k==="commission")setCtx(c=>({...c,commission:parseFloat(v)}));
  };
  const ctxKey=ctx.selectedScore?`${ctx.selectedScore.h}-${ctx.selectedScore.a}-${ctx.selectedOdds}`:"none";
  if(ctxKey!==lastCtxKey&&ctxKey!=="none"){
    setLastCtxKey(ctxKey);
    setForm(f=>({
      ...f,
      odds:ctx.selectedOdds?parseFloat(ctx.selectedOdds):f.odds,
      probPct:ctx.selectedProb?parseFloat((ctx.selectedProb*100).toFixed(2)):f.probPct,
      bankroll:ctx.bankroll||f.bankroll,
      commission:ctx.commission||f.commission,
    }));
  }
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
      {ctx.selectedScore&&(<div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16,padding:"8px 12px",background:`${C.orange}08`,border:`1px solid ${C.orange}25`,borderRadius:6,fontSize:12}}><span>🔗</span><span style={{color:C.textSec}}>Dati dalla CS Matrix: quota <span style={{color:C.orange,fontFamily:"monospace",fontWeight:600}}>{ctx.selectedOdds||"–"}</span> e prob <span style={{color:C.orange,fontFamily:"monospace"}}>{pct(ctx.selectedProb)}</span> già precompilati · bankroll condiviso con Masaniello</span></div>)}
      <GuidePanel {...KELLY_GUIDE}/>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1.5fr",gap:16}}>
        <div style={{...card,borderColor:C.borderBright}} className="ec-card">
          <div style={cardDeco(C.orange)}/>
          <div style={{fontSize:11,color:C.textDim,letterSpacing:2,textTransform:"uppercase",marginBottom:16}}>Parametri</div>
          {[["Bankroll (€)","bankroll","10"],["Quota Betfair","odds","0.1"],["Probabilità stimata (%)","probPct","0.1"],["Commissione (%)","commission","0.5"]].map(([lbl,key,step])=>(<div key={key}><label style={{fontSize:12,color:C.textSec,marginBottom:5,display:"block"}}>{lbl}</label><input className="ec-input" style={inputStyle} type="number" step={step} value={form[key]} onChange={e=>set(key,e.target.value)}/></div>))}
          <div style={{background:"#060D16",border:`1px solid ${C.border}`,borderRadius:6,padding:"12px",marginTop:4}}>
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
                <div key={label} style={{background:"#060D16",border:`1px solid ${color}30`,borderRadius:8,padding:"12px 14px"}}>
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
              {[["Kelly (frazione intera)",`${(kellyFull*100).toFixed(2)}%`,C.orange],["EV per scommessa",`${ev>0?"+":""}${ev.toFixed(2)}%`,evColor],["Quota netta (b)",f2(b),C.accent],["Breakeven",pct(1/q),C.warn]].map(([lbl,val,col])=>(<div key={lbl} style={{background:"#060D16",border:`1px solid ${C.border}`,borderRadius:6,padding:"9px 11px"}}><div style={{fontSize:10,color:C.textDim,marginBottom:3}}>{lbl}</div><div style={{fontFamily:"monospace",fontSize:14,fontWeight:700,color:col}}>{val}</div></div>))}
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
  const[editingId,setEditingId]=useState(null);

  const PRESETS=[
    {group:"Correct Score",items:["CS 0-0","CS 1-0","CS 0-1","CS 1-1","CS 2-0","CS 0-2","CS 2-1","CS 1-2"]},
    {group:"Gol",items:["Under 0.5","Under 1.5","Under 2.5","Under 3.5","Over 0.5","Over 1.5","Over 2.5","Over 3.5"]},
    {group:"Risultato",items:["1 Casa","X Pareggio","2 Ospite","1X","X2","12"]},
    {group:"Altro",items:["Goal GG","No Goal NG","Primo gol Casa","Primo gol Ospite"]},
  ];

  const addSel=()=>{if(selections.length>=6)return;const newId=nextId;setSelections(s=>[...s,{id:newId,name:"",odds:5.0}]);setNextId(n=>n+1);setEditingId(newId);};
  const removeSel=(id)=>setSelections(s=>s.filter(x=>x.id!==id));
  const updateSel=(id,field,val)=>setSelections(s=>s.map(x=>x.id===id?{...x,[field]:val}:x));
  const applyPreset=(id,name)=>{updateSel(id,"name",name);setEditingId(null);};

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
              <div key={s.id} style={{background:"#060D16",border:`1px solid ${editingId===s.id?C.purple:C.border}`,borderRadius:7,padding:"10px 12px",marginBottom:8,transition:"border .2s"}}>
                <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:8}}>
                  <div style={{width:20,height:20,borderRadius:"50%",background:`${C.purple}20`,border:`1px solid ${C.purple}40`,color:C.purple,fontSize:10,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{i+1}</div>
                  <input
                    value={s.name}
                    onChange={e=>updateSel(s.id,"name",e.target.value)}
                    onFocus={()=>setEditingId(s.id)}
                    placeholder="Scrivi o scegli dal menu ▾"
                    style={{flex:1,background:"#0A1525",border:`1px solid ${C.border}`,borderRadius:5,color:C.text,fontSize:13,fontWeight:600,fontFamily:"Inter,sans-serif",outline:"none",padding:"5px 8px",transition:"border .15s"}}
                  />
                  {selections.length>2&&<button onClick={()=>removeSel(s.id)} style={{background:"transparent",border:"none",color:C.textDim,cursor:"pointer",fontSize:16,lineHeight:1,padding:"0 4px",flexShrink:0}}>×</button>}
                </div>
                {/* Preset picker — appare quando il campo è in focus o vuoto */}
                {(editingId===s.id||!s.name)&&(
                  <div style={{background:"#060D16",border:`1px solid ${C.purple}30`,borderRadius:6,padding:"10px",marginBottom:8,animation:"fadeInUp .15s ease"}}>
                    <div style={{fontSize:10,color:C.purple,fontWeight:700,letterSpacing:1,textTransform:"uppercase",marginBottom:8}}>Selezione rapida</div>
                    {PRESETS.map(group=>(
                      <div key={group.group} style={{marginBottom:8}}>
                        <div style={{fontSize:9,color:C.textDim,letterSpacing:1.5,textTransform:"uppercase",marginBottom:4}}>{group.group}</div>
                        <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
                          {group.items.map(preset=>(
                            <button key={preset} onClick={()=>applyPreset(s.id,preset)}
                              style={{padding:"3px 8px",background:s.name===preset?`${C.purple}30`:`${C.purple}10`,border:`1px solid ${s.name===preset?C.purple:C.purple+"30"}`,borderRadius:4,color:s.name===preset?C.purple:C.textSec,fontSize:11,cursor:"pointer",fontFamily:"inherit",transition:"all .1s"}}>
                              {preset}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                    <button onClick={()=>setEditingId(null)} style={{marginTop:4,background:"transparent",border:"none",color:C.textDim,fontSize:11,cursor:"pointer",fontFamily:"inherit"}}>✕ Chiudi</button>
                  </div>
                )}
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
              {[["Stake totale",`€ ${f2(totalAllocated)}`,C.accent],["Overround",`${overround}%`,parseFloat(overround)<110?C.profit:C.loss],["ROI",`${f2(guaranteedProfit/total*100)}%`,guaranteedProfit>0?C.profit:C.loss],["Selezioni",selections.length,C.purple]].map(([lbl,val,col])=>(<div key={lbl} style={{background:"#060D16",border:`1px solid ${C.border}`,borderRadius:6,padding:"8px 10px"}}><div style={{fontSize:10,color:C.textDim,marginBottom:2}}>{lbl}</div><div style={{fontFamily:"monospace",fontSize:14,fontWeight:700,color:col}}>{val}</div></div>))}
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
  const{ctx,setCtx}=useApp();
  const[form,setForm]=useState({
    bankroll:ctx.bankroll||1000,
    target:ctx.masaTarget||200,
    events:ctx.masaEvents||10,
    odds:ctx.masaOdds||ctx.selectedOdds||9.0,
    betType:"back",
    commission:ctx.commission||5,
  });
  const[steps,setSteps]=useState([]);
  const[lastCtxKey,setLastCtxKey]=useState(null);
  const set=(k,v)=>{
    setForm(f=>({...f,[k]:v}));
    if(k==="bankroll")setCtx(c=>({...c,bankroll:parseFloat(v)}));
    if(k==="target")setCtx(c=>({...c,masaTarget:parseFloat(v)}));
    if(k==="events")setCtx(c=>({...c,masaEvents:parseInt(v)}));
    if(k==="commission")setCtx(c=>({...c,commission:parseFloat(v)}));
  };
  const ctxKey=ctx.selectedScore?`${ctx.selectedScore.h}-${ctx.selectedScore.a}-${ctx.selectedOdds}`:"none";
  if(ctxKey!==lastCtxKey&&ctxKey!=="none"){
    setLastCtxKey(ctxKey);
    setForm(f=>({
      ...f,
      odds:ctx.masaOdds||ctx.selectedOdds?parseFloat(ctx.masaOdds||ctx.selectedOdds):f.odds,
      bankroll:ctx.bankroll||f.bankroll,
      commission:ctx.commission||f.commission,
    }));
  }
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
      {ctx.selectedScore&&(<div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16,padding:"8px 12px",background:`${C.accent}08`,border:`1px solid ${C.accent}25`,borderRadius:6,fontSize:12}}><span>🔗</span><span style={{color:C.textSec}}>Quota dalla CS Matrix <span style={{color:C.accent,fontFamily:"monospace",fontWeight:600}}>{ctx.masaOdds||ctx.selectedOdds||"–"}</span> precompilata · bankroll condiviso con Kelly</span></div>)}
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
              {[["Q^(1/n)",f4(coeff),C.accent],["Target",`€${parseFloat(form.target).toFixed(0)}`,C.profit],["Tipo",isLay?"LAY":"BACK",isLay?C.warn:C.accent],["Quota",form.odds,C.text]].map(([lbl,val,col])=>(<div key={lbl} style={{background:"#060D16",border:`1px solid ${C.border}`,borderRadius:6,padding:"10px 12px"}}><div style={{fontSize:10,color:C.textDim,marginBottom:4}}>{lbl}</div><div style={{fontFamily:"monospace",fontSize:18,fontWeight:700,color:col}}>{val}</div></div>))}
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
  const{ctx}=useApp();
  const[form,setForm]=useState({
    betType:"back",
    openOdds:ctx.pnlOpenOdds||ctx.selectedOdds||9.4,
    currentOdds:4.5,
    stake:ctx.pnlStake||20,
    commission:ctx.commission||5,
  });
  const[lastCtxKey,setLastCtxKey]=useState(null);
  const set=(k,v)=>setForm(f=>({...f,[k]:v}));
  const ctxKey=ctx.selectedScore?`${ctx.selectedScore.h}-${ctx.selectedScore.a}-${ctx.selectedOdds}`:"none";
  if(ctxKey!==lastCtxKey&&ctxKey!=="none"){
    setLastCtxKey(ctxKey);
    setForm(f=>({
      ...f,
      openOdds:ctx.pnlOpenOdds||ctx.selectedOdds?parseFloat(ctx.pnlOpenOdds||ctx.selectedOdds):f.openOdds,
      stake:ctx.pnlStake||f.stake,
      commission:ctx.commission||f.commission,
    }));
  }
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
      {label:"Green completo",icon:"✅",desc:"Lay per bilanciare il profitto — piccola differenza per rounding €0.50",stakeAction:`Lay €${f2(layRounded)} @ ${qCurr}`,ifWins:greenIfBackWins,ifLoses:greenIfBackLoses,guaranteed:(greenIfBackWins+greenIfBackLoses)/2,color:C.profit},
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
      {ctx.selectedScore&&(<div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16,padding:"8px 12px",background:`${C.warn}08`,border:`1px solid ${C.warn}25`,borderRadius:6,fontSize:12}}><span>🔗</span><span style={{color:C.textSec}}>Quota apertura dalla CS Matrix <span style={{color:C.warn,fontFamily:"monospace",fontWeight:600}}>{ctx.pnlOpenOdds||"–"}</span> · stake dal Value Finder <span style={{color:C.warn,fontFamily:"monospace"}}>{ctx.pnlStake?"€"+ctx.pnlStake:"–"}</span> precompilati</span></div>)}
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
              {[["Movimento quota",`${oddsMove>0?"-":"+"} ${Math.abs(oddsMove)}%`,positionInProfit?C.profit:C.loss],["Posizione",positionInProfit?"IN PROFITTO":"IN PERDITA",positionInProfit?C.profit:C.loss]].map(([lbl,val,col])=>(<div key={lbl} style={{background:"#060D16",border:`1px solid ${col}30`,borderRadius:6,padding:"8px 10px"}}><div style={{fontSize:10,color:C.textDim,marginBottom:2}}>{lbl}</div><div style={{fontFamily:"monospace",fontSize:13,fontWeight:700,color:col}}>{val}</div></div>))}
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
              {s.guaranteed!==undefined&&(
                <div style={{marginBottom:10,padding:"8px 12px",background:`${C.profit}10`,border:`1px solid ${C.profit}30`,borderRadius:6,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div><div style={{fontSize:12,color:C.profit,fontWeight:600}}>Profitto medio garantito</div><div style={{fontSize:10,color:C.textDim,marginTop:2}}>Lieve differenza tra i due scenari dovuta al rounding €0.50 Betfair</div></div>
                  <div style={{fontFamily:"monospace",fontSize:20,fontWeight:700,color:C.profit,marginLeft:16}}>{s.guaranteed>=0?"+":""}€{f2(s.guaranteed)}</div>
                </div>
              )}
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                <div style={{background:"#060D16",border:`1px solid ${C.profit}30`,borderRadius:6,padding:"10px 12px"}}>
                  <div style={{fontSize:10,color:C.textDim,marginBottom:3}}>Se la tua selezione vince</div>
                  <div style={{fontFamily:"monospace",fontSize:18,fontWeight:700,color:s.ifWins>=0?C.profit:C.loss}}>{s.ifWins>=0?"+":""}€{f2(s.ifWins)}</div>
                </div>
                <div style={{background:"#060D16",border:`1px solid ${C.loss}30`,borderRadius:6,padding:"10px 12px"}}>
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

/* ─── FREEMIUM TRIAL ─────────────────────────────────────────── */
function getTrialInfo(){
  const key="LayLab_trial_start";
  let start=localStorage.getItem(key);
  if(!start){start=Date.now().toString();localStorage.setItem(key,start);}
  const daysLeft=Math.max(0,14-Math.floor((Date.now()-parseInt(start))/(1000*60*60*24)));
  return{daysLeft,expired:daysLeft===0};
}

const LOCKED_TOOLS=["kelly","dutching","masa","pnl"];

function TrialBanner({daysLeft,expired}){
  const[show,setShow]=useState(true);
  if(!show)return null;
  if(expired) return(
    <div style={{position:"fixed",inset:0,background:"rgba(7,14,28,.92)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div style={{background:C.card,border:`1px solid ${C.borderBright}`,borderRadius:12,padding:"40px 48px",maxWidth:440,textAlign:"center"}}>
        <div style={{fontSize:36,marginBottom:16}}>🔒</div>
        <div style={{fontSize:20,fontWeight:700,fontFamily:"monospace",color:C.text,marginBottom:8}}>Trial scaduto</div>
        <div style={{fontSize:14,color:C.textSec,lineHeight:1.7,marginBottom:24}}>Il tuo periodo gratuito di 14 giorni è terminato. Passa a Pro per sbloccare tutti i tool e continuare a usare il metodo LayLab.</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:20}}>
          {[["Free","Strategia + CS Matrix + Value Finder",C.textSec],["Pro €9/mese","Tutti i tool + storico scommesse",C.accent],["Premium €19/mese","Pro + alert Telegram + dati live",C.profit]].map(([plan,desc,col])=>(
            <div key={plan} style={{background:"#060D16",border:`1px solid ${col}30`,borderRadius:8,padding:"12px",textAlign:"left",gridColumn:plan==="Free"?"1/3":"auto"}}>
              <div style={{fontFamily:"monospace",fontSize:13,fontWeight:700,color:col,marginBottom:4}}>{plan}</div>
              <div style={{fontSize:11,color:C.textSec}}>{desc}</div>
            </div>
          ))}
        </div>
        <button style={{width:"100%",background:C.accent,color:"#040C1A",border:"none",borderRadius:6,padding:"11px",fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:"inherit",marginBottom:8}}>Passa a Pro — €9/mese</button>
        <div style={{fontSize:11,color:C.textDim}}>Prossimamente — integrazione Stripe in arrivo</div>
      </div>
    </div>
  );
  if(daysLeft>7)return null;
  return(
    <div style={{position:"fixed",bottom:16,right:16,zIndex:500,background:C.card,border:`1px solid ${daysLeft<=3?C.loss:C.warn}`,borderRadius:8,padding:"10px 14px",maxWidth:280,animation:"fadeInUp .3s ease"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8}}>
        <div>
          <div style={{fontSize:12,fontWeight:700,color:daysLeft<=3?C.loss:C.warn,marginBottom:3}}>⏳ Trial: {daysLeft} giorni rimasti</div>
          <div style={{fontSize:11,color:C.textSec}}>Passa a Pro per sbloccare tutti i tool</div>
        </div>
        <button onClick={()=>setShow(false)} style={{background:"transparent",border:"none",color:C.textDim,cursor:"pointer",fontSize:14,lineHeight:1,flexShrink:0}}>×</button>
      </div>
      <button style={{marginTop:8,width:"100%",background:`${C.accent}20`,border:`1px solid ${C.accent}40`,color:C.accent,borderRadius:5,padding:"6px",fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>Scopri i piani →</button>
    </div>
  );
}

function LockedOverlay({toolId}){
  return(
    <div style={{position:"absolute",inset:0,background:"rgba(7,14,28,.75)",backdropFilter:"blur(4px)",zIndex:10,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:8}}>
      <div style={{textAlign:"center",padding:32}}>
        <div style={{fontSize:32,marginBottom:12}}>🔒</div>
        <div style={{fontSize:16,fontWeight:700,color:C.text,marginBottom:6}}>Tool Pro</div>
        <div style={{fontSize:13,color:C.textSec,marginBottom:16}}>Disponibile con piano Pro o Premium</div>
        <button style={{background:C.accent,color:"#040C1A",border:"none",borderRadius:6,padding:"9px 20px",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>Passa a Pro — €9/mese</button>
      </div>
    </div>
  );
}

export default function App(){
  const[active,setActive]=useState("strategy");
  const[ctx,setCtx]=useState(defaultCtx);
  const trial=getTrialInfo();
  return(
    <>
      <style>{globalCSS}</style>
      <div style={{display:"flex",height:"100vh",width:"100%",background:C.bg,fontFamily:"Inter,system-ui,sans-serif",color:C.text,overflow:"hidden",position:"relative"}}>
        <GridBackground/>
        <div style={{width:220,minWidth:220,background:`${C.sidebar}EE`,borderRight:`1px solid ${C.border}`,display:"flex",flexDirection:"column",padding:"0 0 12px 0",overflow:"hidden",position:"relative",zIndex:2,backdropFilter:"blur(8px)"}}>
          <div style={{padding:"12px 20px",borderBottom:`1px solid ${C.border}`}}>
            <a href="https://www.laylab.cc" style={{display:"flex",alignItems:"center",gap:6,color:"#6b7fa3",textDecoration:"none",fontSize:11,fontWeight:600,marginBottom:12,transition:"color .15s"}} onMouseOver={e=>e.currentTarget.style.color="#e8edf5"} onMouseOut={e=>e.currentTarget.style.color="#6b7fa3"}>
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Torna alla Home
            </a>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <IconDelta/>
              <div><div style={{fontFamily:"Inter,sans-serif",fontSize:19,fontWeight:800,color:C.accent,letterSpacing:'-0.5px'}}>LayLab</div><div style={{fontSize:10,color:C.textSec,letterSpacing:1.5,textTransform:"uppercase",marginTop:2,fontWeight:500}}>Exchange Tools</div></div>
            </div>
          </div>
          <div style={{flex:1,overflowY:"auto",paddingBottom:8}}>
            {Object.entries(SECTIONS).map(([secId,sec])=>(
              <div key={secId}>
                <div style={{padding:"10px 12px 4px",fontSize:9,color:C.textDim,letterSpacing:2.5,textTransform:"uppercase"}}>{sec.label}</div>
                {TOOLS.filter(t=>sec.tools.includes(t.id)).map(({id,label,Icon,color})=>{
                  const a=active===id;
                  const isLocked=trial.expired&&LOCKED_TOOLS.includes(id);
                  return(<button key={id} className="ec-nav" onClick={()=>setActive(id)} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 20px",cursor:"pointer",border:"none",background:a?`${color}18`:"transparent",color:a?color:isLocked?C.textDim:C.textSec,borderLeft:a?`2px solid ${color}`:"2px solid transparent",fontSize:13,fontWeight:a?600:400,width:"100%",textAlign:"left",transition:"all .15s",opacity:isLocked?.6:1}}><Icon/>{label}{isLocked&&<span style={{marginLeft:"auto",fontSize:10}}>🔒</span>}{a&&!isLocked&&<div style={{marginLeft:"auto",width:5,height:5,borderRadius:"50%",background:color,boxShadow:`0 0 6px ${color}`}}/>}</button>);
                })}
              </div>
            ))}
          </div>
          <div style={{margin:"0 10px 8px",background:`${C.profit}0A`,border:`1px solid ${C.profit}25`,borderRadius:6,padding:"8px 10px"}}>
            <div style={{fontSize:9,color:C.profit,fontWeight:700,marginBottom:4,letterSpacing:1}}>FLUSSO CORRETTO</div>
            {["① CS Matrix","② Value Finder","③ Kelly / Dutching","④ Masaniello","⑤ P&L Simulator (live)"].map((s,i)=>(<div key={i} style={{fontSize:10,color:C.textSec,padding:"1px 0"}}>{s}</div>))}
          </div>
          <div style={{padding:"0 10px"}}><div style={{background:`${C.accent}10`,border:`1px solid ${C.border}`,borderRadius:6,padding:"5px 10px"}}><div style={{fontFamily:"monospace",fontSize:10,color:C.accent}}>v4.0</div></div></div>
        </div>

        {/* Main */}
        <div style={{flex:1,overflow:"auto",padding:"28px 32px",position:"relative",zIndex:1}}>
          <div style={{maxWidth:1100,margin:"0 auto"}}>
            <AppCtx.Provider value={{ctx,setCtx}}>
              {TOOLS.map(({id,component:Tool})=>(
                <div key={id} style={{display:active===id?"block":"none",position:"relative"}}>
                  {trial.expired&&LOCKED_TOOLS.includes(id)&&<LockedOverlay toolId={id}/>}
                  <Tool/>
                </div>
              ))}
              <TrialBanner daysLeft={trial.daysLeft} expired={trial.expired}/>
            </AppCtx.Provider>
          </div>
        </div>
      </div>
    </>
  );
}
