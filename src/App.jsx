import { useState } from "react";

/* ─── TOKENS ─────────────────────────────────────────────────── */
const C = {
  bg:"#070E1C", sidebar:"#0A1528", card:"#0D1E3A", cardAlt:"#0B1A32",
  border:"#162847", borderBright:"#1E3D6B",
  accent:"#00C2FF", accentGlow:"#00C2FF44",
  profit:"#00FF9D", profitGlow:"#00FF9D33",
  loss:"#FF4757", lossGlow:"#FF475733",
  warn:"#FFB800", warnGlow:"#FFB80033",
  purple:"#A78BFA",
  text:"#E8F4FF", textSec:"#6A90B8", textDim:"#334D6E",
  guideB:"#081510", guideBor:"#1A4A2A",
  stratBg:"#080E1A",
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
  @keyframes slideIn { from{opacity:0;transform:translateX(-8px)} to{opacity:1;transform:translateX(0)} }
  @keyframes ping { 0%{transform:scale(1);opacity:1} 100%{transform:scale(2.2);opacity:0} }
  .ec-input:focus { border-color:#00C2FF!important; box-shadow:0 0 0 3px #00C2FF15; }
  .ec-btn:hover { background:#00D4FF!important; transform:translateY(-1px); box-shadow:0 4px 20px #00C2FF40; }
  .ec-btn:active { transform:translateY(0); }
  .ec-nav:hover { background:#00C2FF0D!important; color:#7DD8F0!important; }
  .ec-card { animation:fadeInUp .25s ease; }
  .step-card:hover { border-color:#1E3D6B!important; background:#0F2244!important; }
  .phase-tab { transition:all .15s; }
  .phase-tab:hover { opacity:.85; }
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

/* ─── SVG ICONS ──────────────────────────────────────────────── */
const IconMasa = () => (<svg width="17" height="17" viewBox="0 0 24 24" fill="none"><polyline points="2,18 8,10 13,14 20,5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="20" cy="5" r="2" fill="currentColor"/><line x1="2" y1="21" x2="22" y2="21" stroke="currentColor" strokeWidth="1.5" opacity=".4"/></svg>);
const IconCS = () => (<svg width="17" height="17" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/><path d="M12 2 C12 2 7 6 7 12 C7 18 12 22 12 22" stroke="currentColor" strokeWidth="1.2" opacity=".6"/><path d="M12 2 C12 2 17 6 17 12 C17 18 12 22 12 22" stroke="currentColor" strokeWidth="1.2" opacity=".6"/><line x1="2" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="1.2" opacity=".6"/><circle cx="12" cy="12" r="2" fill="currentColor"/></svg>);
const IconValue = () => (<svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M12 2 L15.09 8.26 L22 9.27 L17 14.14 L18.18 21.02 L12 17.77 L5.82 21.02 L7 14.14 L2 9.27 L8.91 8.26 Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg>);
const IconStrategy = () => (<svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M9 11l3 3L22 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>);
const IconDelta = () => (<svg width="26" height="26" viewBox="0 0 32 32" fill="none"><polygon points="16,3 30,28 2,28" stroke="#00C2FF" strokeWidth="2" fill="none" strokeLinejoin="round"/><polygon points="16,10 24,25 8,25" fill="#00C2FF" opacity=".15"/><line x1="16" y1="13" x2="16" y2="21" stroke="#00C2FF" strokeWidth="1.5" opacity=".7"/><circle cx="16" cy="23" r="1.5" fill="#00C2FF" opacity=".7"/></svg>);

/* ─── UTILS ──────────────────────────────────────────────────── */
const poisson=(l,k)=>{let p=-l+k*Math.log(l);for(let i=1;i<=k;i++)p-=Math.log(i);return Math.exp(p);};
const pMatrix=(lH,lA,max=5)=>{const m=[];for(let h=0;h<=max;h++){m[h]=[];for(let a=0;a<=max;a++)m[h][a]=poisson(lH,h)*poisson(lA,a);}return m;};
const bfRound=v=>Math.round(v*2)/2;
const f2=v=>(isNaN(v)||!isFinite(v)?"–":v.toFixed(2));
const f4=v=>(isNaN(v)||!isFinite(v)?"–":v.toFixed(4));
const pct=v=>(isNaN(v)||!isFinite(v)?"–":(v*100).toFixed(1)+"%");

const card={background:C.card,border:`1px solid ${C.border}`,borderRadius:10,padding:"20px 22px",position:"relative",overflow:"hidden"};
const cardDeco=(color)=>({position:"absolute",top:0,right:0,width:120,height:120,borderRadius:"50%",background:`radial-gradient(circle,${color}12 0%,transparent 70%)`,pointerEvents:"none"});
const inputStyle={width:"100%",background:"#050D1A",border:`1px solid ${C.border}`,borderRadius:6,color:C.text,padding:"9px 12px",fontSize:14,fontFamily:"'JetBrains Mono',monospace",outline:"none",boxSizing:"border-box",marginBottom:12,transition:"border .15s,box-shadow .15s"};
const btnStyle={width:"100%",background:C.accent,color:"#040C1A",border:"none",borderRadius:6,padding:"10px 20px",fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:"inherit",transition:"all .15s",marginTop:4};

/* ─── GAUGE ──────────────────────────────────────────────────── */
function Gauge({value,min=-100,max=100,label,color}){
  const p=Math.max(0,Math.min(1,(value-min)/(max-min)));
  const angle=-140+p*280,r=52,cx=70,cy=70;
  const toXY=deg=>{const rad=(deg-90)*Math.PI/180;return[cx+r*Math.cos(rad),cy+r*Math.sin(rad)];};
  const arc=(s,e,radius)=>{const[x1,y1]=toXY(s);const[x2,y2]=toXY(e);return`M ${x1} ${y1} A ${radius} ${radius} 0 ${e-s>180?1:0} 1 ${x2} ${y2}`;};
  const[nx,ny]=[cx+(r-8)*Math.cos((angle-90)*Math.PI/180),cy+(r-8)*Math.sin((angle-90)*Math.PI/180)];
  return(<svg width="140" height="100" viewBox="0 0 140 100"><path d={arc(-140,140,r)} fill="none" stroke={C.border} strokeWidth="10" strokeLinecap="round"/><path d={arc(-140,-140+p*280,r)} fill="none" stroke={color} strokeWidth="10" strokeLinecap="round" style={{filter:`drop-shadow(0 0 6px ${color})`}}/><line x1={cx} y1={cy} x2={nx} y2={ny} stroke={color} strokeWidth="2" strokeLinecap="round"/><circle cx={cx} cy={cy} r="4" fill={color}/><text x={cx} y={cy+22} textAnchor="middle" fill={color} fontSize="13" fontFamily="JetBrains Mono" fontWeight="700">{value>0?"+":""}{typeof value==="number"?value.toFixed(1):value}</text><text x={cx} y={cy+34} textAnchor="middle" fill={C.textDim} fontSize="8" fontFamily="Inter">{label}</text></svg>);
}

/* ─── STAKE BAR CHART ────────────────────────────────────────── */
function StakeBarChart({steps}){
  if(!steps.length)return null;
  const max=Math.max(...steps.map(s=>s.stake));
  return(<div style={{marginTop:16}}><div style={{fontSize:11,color:C.textDim,letterSpacing:2,textTransform:"uppercase",marginBottom:10}}>Andamento stake per step</div><div style={{display:"flex",alignItems:"flex-end",gap:4,height:80}}>{steps.map((s,i)=>{const h=(s.stake/max)*72;return(<div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:3}}><div style={{width:"100%",height:h,background:`linear-gradient(to top,${C.accent},${C.accent}88)`,borderRadius:"3px 3px 0 0",minHeight:3,boxShadow:`0 0 8px ${C.accentGlow}`}}/><div style={{fontSize:9,color:C.textDim,fontFamily:"monospace"}}>{i+1}</div></div>);})}</div></div>);
}

/* ─── GUIDE PANEL ────────────────────────────────────────────── */
function GuidePanel({steps,tip}){
  const[open,setOpen]=useState(false);
  return(<div style={{marginBottom:20}}><button onClick={()=>setOpen(o=>!o)} style={{display:"flex",alignItems:"center",gap:8,background:"transparent",border:`1px solid ${C.guideBor}`,borderRadius:6,padding:"7px 14px",color:C.profit,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"Inter,sans-serif",transition:"all .15s"}}><span style={{fontSize:13,transition:"transform .2s",display:"inline-block",transform:open?"rotate(90deg)":"rotate(0deg)"}}>▸</span>{open?"Nascondi guida":"📖 Come si usa — guida passo passo"}</button>{open&&(<div style={{background:C.guideB,border:`1px solid ${C.guideBor}`,borderRadius:8,padding:"18px 20px",marginTop:8,animation:"fadeInUp .2s ease"}}><div style={{display:"flex",flexDirection:"column",gap:10}}>{steps.map((s,i)=>(<div key={i} style={{display:"flex",gap:14,alignItems:"flex-start",padding:"6px 8px"}}><div style={{minWidth:24,height:24,borderRadius:"50%",background:`${C.profit}15`,border:`1px solid ${C.profit}40`,color:C.profit,fontSize:11,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1}}>{i+1}</div><div><div style={{fontSize:13,fontWeight:600,color:C.text,marginBottom:2}}>{s.title}</div><div style={{fontSize:12,color:C.textSec,lineHeight:1.65}}>{s.desc}</div>{s.example&&<div style={{fontFamily:"monospace",fontSize:11,color:C.warn,background:"#1A150055",border:"1px solid #3A300055",borderRadius:4,padding:"3px 8px",marginTop:4,display:"inline-block"}}>es. {s.example}</div>}</div></div>))}</div>{tip&&<div style={{marginTop:14,padding:"10px 14px",background:`${C.accent}08`,border:`1px solid ${C.accent}25`,borderRadius:6,fontSize:12,color:C.textSec,lineHeight:1.65}}><span style={{color:C.accent,fontWeight:600}}>💡 Pro tip: </span>{tip}</div>}</div>)}</div>);
}

/* ══════════════════════════════════════════════════════════════
   STRATEGY PAGE
══════════════════════════════════════════════════════════════ */
function StrategyPage() {
  const [phase, setPhase] = useState("overview");
  const [activeStep, setActiveStep] = useState(null);

  const phases = [
    { id:"overview", label:"📋 Il Metodo", color:C.accent },
    { id:"pre",      label:"🔍 Prepartita", color:C.purple },
    { id:"live",     label:"⚡ Live", color:C.warn },
    { id:"flow",     label:"🔄 Flusso Completo", color:C.profit },
  ];

  const overviewContent = (
    <div style={{animation:"fadeInUp .3s ease"}}>
      {/* Hero */}
      <div style={{...card,background:"linear-gradient(135deg,#0D1E3A,#0A1A2E)",borderColor:C.borderBright,marginBottom:16}}>
        <div style={cardDeco(C.accent)}/>
        <div style={{display:"flex",gap:20,alignItems:"flex-start"}}>
          <div style={{fontSize:48,lineHeight:1}}>🧠</div>
          <div>
            <div style={{fontSize:20,fontWeight:700,fontFamily:"'JetBrains Mono',monospace",color:C.text,marginBottom:6}}>
              Il Metodo EdgeCalc
            </div>
            <div style={{fontSize:14,color:C.textSec,lineHeight:1.75,maxWidth:700}}>
              Il betting intelligente non è fortuna — è <span style={{color:C.accent,fontWeight:600}}>matematica applicata al mercato</span>. 
              Il metodo EdgeCalc si basa su un principio semplice: <strong style={{color:C.text}}>scommetti solo quando la quota di mercato è più alta del fair value calcolato dal modello statistico</strong>. 
              Questo vantaggio si chiama <em style={{color:C.profit}}>edge</em> e, se costante, genera profitto nel lungo periodo indipendentemente dal singolo risultato.
            </div>
          </div>
        </div>
      </div>

      {/* 3 pilastri */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12,marginBottom:16}}>
        {[
          {n:"01",title:"Identifica il valore",icon:"🎯",desc:"Non tutte le partite hanno edge. La CS Matrix confronta le probabilità Poisson con le quote Betfair e segnala dove il mercato sottovaluta un esito.",color:C.accent,tool:"CS Matrix"},
          {n:"02",title:"Valida la convenienza",icon:"⚖️",desc:"Il Value Finder calcola l'EV netto dopo commissione. Se è positivo, la scommessa ha valore matematico. Se è negativo, passare oltre — anche se 'sembra sicura'.",color:C.purple,tool:"Value Finder"},
          {n:"03",title:"Gestisci il rischio",icon:"🛡️",desc:"Il Masaniello distribuisce le stake su una sequenza di eventi. Anche se perdi alcune partite, la progressione matematica permette di raggiungere il target a fine sequenza.",color:C.profit,tool:"Masaniello"},
        ].map(p=>(
          <div key={p.n} style={{...card,borderColor:`${p.color}44`,background:`linear-gradient(135deg,#0D1E3A,#090F1E)`}} className="ec-card">
            <div style={cardDeco(p.color)}/>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
              <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:28,fontWeight:700,color:`${p.color}30`}}>{p.n}</div>
              <div style={{fontSize:22}}>{p.icon}</div>
            </div>
            <div style={{fontSize:14,fontWeight:700,color:p.color,marginBottom:6}}>{p.title}</div>
            <div style={{fontSize:12,color:C.textSec,lineHeight:1.65,marginBottom:10}}>{p.desc}</div>
            <div style={{display:"inline-block",padding:"3px 8px",background:`${p.color}15`,border:`1px solid ${p.color}40`,borderRadius:4,fontSize:11,color:p.color,fontFamily:"monospace"}}>→ Tool: {p.tool}</div>
          </div>
        ))}
      </div>

      {/* Principio fondamentale */}
      <div style={{...card,background:"#070E1C",borderColor:`${C.warn}33`}}>
        <div style={{display:"flex",gap:16,alignItems:"flex-start"}}>
          <div style={{fontSize:28}}>⚠️</div>
          <div>
            <div style={{fontSize:14,fontWeight:700,color:C.warn,marginBottom:6}}>Il principio fondamentale</div>
            <div style={{fontSize:13,color:C.textSec,lineHeight:1.75}}>
              Il betting con edge <strong style={{color:C.text}}>non garantisce la vincita singola</strong> — garantisce il profitto 
              <strong style={{color:C.text}}> nel lungo periodo</strong>. Una scommessa con EV +8% persa non era sbagliata: 
              era statistica. Il nemico non è la perdita, è <span style={{color:C.loss,fontWeight:600}}>cambiare metodo dopo una serie negativa</span>. 
              Disciplina e volume di gioco sono gli unici veri moltiplicatori.
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const preContent = (
    <div style={{animation:"fadeInUp .3s ease"}}>
      <div style={{fontSize:16,fontWeight:700,color:C.text,marginBottom:4}}>🔍 Analisi Prepartita</div>
      <div style={{fontSize:13,color:C.textSec,marginBottom:20}}>Come selezionare la partita giusta prima del fischio d'inizio</div>

      {/* Step timeline */}
      {[
        {
          n:1, title:"Seleziona la partita candidata", time:"Giorno prima",
          color:C.accent, icon:"📅",
          desc:"Non cercare la partita 'sicura' — cercala la partita con edge. I candidati ideali sono gare tra squadre con bassa media xG (difensive), big match con quote CS gonfiate, o derby dove il mercato overreagisce alla storia recente.",
          action:"Dove cercarlo",
          actionDesc:"Understat.com → filtra per xG medio per partita sotto 1.1. Cerca gare dove entrambe le squadre segnano meno di 1.2 gol a partita nelle ultime 5.",
          tool:null
        },
        {
          n:2, title:"Calcola le probabilità con CS Matrix", time:"2-3 ore prima",
          color:C.purple, icon:"⊞",
          desc:"Inserisci i valori xG delle due squadre. Guarda la probabilità del 0-0: se è sopra il 12% e la quota Betfair è sopra 8.5, hai un candidato valido. Controlla anche Under 2.5 e 1-0 / 0-1 come alternative.",
          action:"Cosa cercare",
          actionDesc:"CS Matrix → xG Casa + xG Ospite → controlla la cella 0-0 e le celle adiacenti (1-0, 0-1). Edge positivo in verde = candidato.",
          tool:"CS Matrix"
        },
        {
          n:3, title:"Valida con il Value Finder", time:"1 ora prima",
          color:C.profit, icon:"◎",
          desc:"Prendi la quota Betfair reale e la probabilità dalla matrice. Inseriscile nel Value Finder. L'EV deve essere positivo dopo commissione 5%. Se è sotto zero, la quota si è già abbassata troppo — aspetta o salta la partita.",
          action:"Soglia minima",
          actionDesc:"EV > €3 per €100 di stake (ROI > 3%). Sotto questa soglia il rischio non vale. Quota fair Back deve essere inferiore alla quota Betfair disponibile.",
          tool:"Value Finder"
        },
        {
          n:4, title:"Calcola la stake con Masaniello", time:"30 min prima",
          color:C.warn, icon:"⚡",
          desc:"Se hai validato l'edge, inserisci questa partita nella tua sequenza Masaniello attiva. Il tool ti dice esattamente quanto puntare per lo step corrente. Mai deviare dalla stake calcolata — né in su né in giù.",
          action:"Parametri consigliati",
          actionDesc:"Bankroll: capitale dedicato alla sequenza. Target: 15-20%. Eventi: 8-12. Quota media: quella delle partite selezionate. Tipo: Back sul CS o Under.",
          tool:"Masaniello"
        },
        {
          n:5, title:"Piazza la scommessa su Betfair Exchange", time:"Kick-off - 15min",
          color:C.text, icon:"✅",
          desc:"Vai su Betfair Exchange (non Sportsbook). Seleziona il mercato Correct Score o Under/Over. Piazza la stake calcolata come Back. Non usare il BSP (Best Starting Price) — piazza l'ordine manualmente per controllare la quota.",
          action:"Checklist finale",
          actionDesc:"① Quota ancora sopra il fair value? ② Stake corretta per lo step? ③ Mercato Exchange (non Sportsbook)? ④ Commissione 5% impostata nel Masaniello?",
          tool:null
        },
      ].map((s,i)=>(
        <div key={s.n} className="step-card" onClick={()=>setActiveStep(activeStep===s.n?null:s.n)}
          style={{...card,marginBottom:10,borderColor:activeStep===s.n?`${s.color}66`:C.border,background:activeStep===s.n?`#0F2244`:"#0D1E3A",cursor:"pointer",transition:"all .2s"}}>
          <div style={{display:"flex",gap:14,alignItems:"center"}}>
            <div style={{minWidth:36,height:36,borderRadius:"50%",background:`${s.color}15`,border:`1px solid ${s.color}50`,color:s.color,fontSize:15,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{s.n}</div>
            <div style={{flex:1}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div style={{fontSize:14,fontWeight:600,color:C.text}}>{s.icon} {s.title}</div>
                <div style={{display:"flex",gap:8,alignItems:"center"}}>
                  <span style={{fontSize:11,color:C.textDim,fontFamily:"monospace"}}>{s.time}</span>
                  {s.tool&&<span style={{padding:"2px 7px",background:`${s.color}15`,border:`1px solid ${s.color}30`,borderRadius:3,fontSize:10,color:s.color,fontFamily:"monospace"}}>{s.tool}</span>}
                  <span style={{color:C.textDim,fontSize:12,transition:"transform .2s",transform:activeStep===s.n?"rotate(90deg)":"rotate(0deg)"}}>▸</span>
                </div>
              </div>
            </div>
          </div>
          {activeStep===s.n&&(
            <div style={{marginTop:14,paddingTop:14,borderTop:`1px solid ${C.border}`,animation:"fadeInUp .2s ease"}}>
              <div style={{fontSize:13,color:C.textSec,lineHeight:1.7,marginBottom:12}}>{s.desc}</div>
              <div style={{background:"#070E1C",border:`1px solid ${s.color}25`,borderRadius:6,padding:"10px 14px"}}>
                <div style={{fontSize:11,color:s.color,fontWeight:600,marginBottom:4,textTransform:"uppercase",letterSpacing:1}}>{s.action}</div>
                <div style={{fontSize:12,color:C.textSec,lineHeight:1.65}}>{s.actionDesc}</div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const liveContent = (
    <div style={{animation:"fadeInUp .3s ease"}}>
      <div style={{fontSize:16,fontWeight:700,color:C.text,marginBottom:4}}>⚡ Strategia Live</div>
      <div style={{fontSize:13,color:C.textSec,marginBottom:20}}>Come gestire e potenziare la posizione durante la partita</div>

      {/* Scenario cards */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:16}}>
        {[
          {
            title:"Scenario A — 0-0 dopo 30'",icon:"🟢",color:C.profit,
            situation:"La partita è sul 0-0, poche occasioni, ritmo basso. La tua scommessa prepartita sul CS 0-0 è in corso.",
            action:"Nessuna azione richiesta",
            detail:"Mantieni la posizione. La quota del 0-0 su Betfair in-play si è abbassata (da es. 9.0 a 5.0) — il mercato ti sta dando ragione. Non uscire prematuramente: la quota scende ancora con l'avanzare dei minuti se il punteggio resta 0-0.",
            tip:"Se vuoi 'verdare' parte del profitto: fai un Lay del 0-0 in-play per un importo inferiore allo stake originale. Così garantisci un profitto minimo qualunque cosa accada."
          },
          {
            title:"Scenario B — Gol subito (0-1 o 1-0)",icon:"🔴",color:C.loss,
            situation:"Un gol cambia il punteggio nei primi 60'. La tua scommessa sul CS 0-0 è praticamente persa.",
            action:"Valuta l'ingresso sull'Under 2.5",
            detail:"Con 1 gol segnato, la quota Under 2.5 Live sale (es. da 1.8 a 2.8-3.2). Ricalcola con la CS Matrix aggiornata — inserisci il tempo rimanente come fattore riducendo i lambda proporzionalmente. Se l'edge è ancora positivo, entra sull'Under 2.5 come scommessa separata.",
            tip:"Non rincorrere la perdita sul CS 0-0 con stake aggressive sull'Under. Valuta come una nuova scommessa indipendente con il suo EV."
          },
          {
            title:"Scenario C — 0-0 oltre il 60'",icon:"⭐",color:C.warn,
            situation:"Sei ancora 0-0 al 60'. La partita sembra destinata al pareggio a reti bianche. Opportunità massima.",
            action:"Doppio ingresso: mantieni CS + entra Under 2.5",
            detail:"Questo è il momento d'oro. La quota Under 2.5 Live a 0-0 al 60' è solitamente tra 1.3 e 1.6 — ancora value se la partita è difensiva. Usa il Value Finder con prob stimata 80-85% per Under 2.5. Se EV positivo, aggiungi una scommessa Under 2.5 come Back separato.",
            tip:"Il CS 0-0 e l'Under 2.5 sono correlati positivamente: se vinci il CS 0-0 vinci anche Under 2.5. Hai due fonti di profitto sulla stessa lettura difensiva."
          },
          {
            title:"Scenario D — 0-0 oltre l'80'",icon:"💎",color:C.purple,
            situation:"Negli ultimi 10 minuti, il 0-0 è quasi certo. La quota sul CS 0-0 è crollata (es. 1.5-2.0).",
            action:"Cash-out parziale o hold fino al fischio",
            detail:"Hai due opzioni: ① Hold completo → se sei sicuro del 0-0, tieni e incassi la vincita piena. ② Lay parziale → fai un Lay del 0-0 all'attuale quota bassa per assicurarti un profitto garantito indipendentemente dal risultato. La scelta dipende dalla situazione tattica in campo.",
            tip:"Negli ultimi 5 minuti con 0-0, le squadre spesso alzano il baricentro cercando il gol. Il rischio aumenta: considera di fare Lay parziale per garantire almeno il 60-70% del profitto massimo."
          },
        ].map(s=>(
          <div key={s.title} style={{...card,borderColor:`${s.color}33`,background:`linear-gradient(135deg,#0D1E3A,#090F1E)`}} className="ec-card">
            <div style={cardDeco(s.color)}/>
            <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:10}}>
              <span style={{fontSize:18}}>{s.icon}</span>
              <div style={{fontSize:13,fontWeight:700,color:s.color}}>{s.title}</div>
            </div>
            <div style={{fontSize:11,color:C.textDim,marginBottom:8,fontStyle:"italic"}}>{s.situation}</div>
            <div style={{padding:"6px 10px",background:`${s.color}10`,border:`1px solid ${s.color}30`,borderRadius:5,marginBottom:8}}>
              <div style={{fontSize:10,color:s.color,fontWeight:700,textTransform:"uppercase",letterSpacing:1,marginBottom:2}}>Azione</div>
              <div style={{fontSize:12,color:C.text,fontWeight:600}}>{s.action}</div>
            </div>
            <div style={{fontSize:12,color:C.textSec,lineHeight:1.65,marginBottom:8}}>{s.detail}</div>
            <div style={{fontSize:11,color:C.textSec,background:`${C.accent}08`,border:`1px solid ${C.accent}20`,borderRadius:5,padding:"6px 10px"}}>
              <span style={{color:C.accent,fontWeight:600}}>💡 </span>{s.tip}
            </div>
          </div>
        ))}
      </div>

      {/* Live timeline */}
      <div style={{...card,borderColor:`${C.warn}33`}}>
        <div style={cardDeco(C.warn)}/>
        <div style={{fontSize:13,fontWeight:700,color:C.warn,marginBottom:14}}>⏱️ Timeline decisionale durante la partita</div>
        <div style={{display:"flex",gap:0,alignItems:"stretch",overflowX:"auto"}}>
          {[
            {min:"0'",label:"Kick-off",desc:"Posizione aperta",color:C.accent},
            {min:"30'",label:"Check 1",desc:"Rivaluta quota CS 0-0",color:C.accent},
            {min:"60'",label:"Check 2",desc:"Valuta ingresso Under 2.5",color:C.warn},
            {min:"75'",label:"Check 3",desc:"Considera Lay parziale",color:C.warn},
            {min:"85'",label:"Decisione",desc:"Hold o cash-out",color:C.profit},
            {min:"90'",label:"Risultato",desc:"Chiudi la sequenza",color:C.profit},
          ].map((t,i,arr)=>(
            <div key={t.min} style={{flex:1,minWidth:90,display:"flex",flexDirection:"column",alignItems:"center"}}>
              <div style={{width:"100%",display:"flex",alignItems:"center"}}>
                <div style={{height:2,flex:1,background:i===0?"transparent":C.border}}/>
                <div style={{width:12,height:12,borderRadius:"50%",background:t.color,flexShrink:0,boxShadow:`0 0 8px ${t.color}`}}/>
                <div style={{height:2,flex:1,background:i===arr.length-1?"transparent":C.border}}/>
              </div>
              <div style={{fontFamily:"monospace",fontSize:11,color:t.color,fontWeight:700,marginTop:6}}>{t.min}</div>
              <div style={{fontSize:11,fontWeight:600,color:C.text,textAlign:"center",marginTop:2}}>{t.label}</div>
              <div style={{fontSize:10,color:C.textDim,textAlign:"center",marginTop:2,lineHeight:1.4}}>{t.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const flowContent = (
    <div style={{animation:"fadeInUp .3s ease"}}>
      <div style={{fontSize:16,fontWeight:700,color:C.text,marginBottom:4}}>🔄 Flusso Completo — Esempio Reale</div>
      <div style={{fontSize:13,color:C.textSec,marginBottom:20}}>Una sessione completa passo per passo con numeri reali</div>

      {/* Esempio numerico */}
      <div style={{...card,borderColor:`${C.accent}33`,marginBottom:16,background:"linear-gradient(135deg,#0D1E3A,#090F1E)"}}>
        <div style={cardDeco(C.accent)}/>
        <div style={{display:"flex",gap:10,alignItems:"center",marginBottom:16}}>
          <span style={{fontSize:20}}>⚽</span>
          <div>
            <div style={{fontSize:15,fontWeight:700,color:C.text}}>Esempio: Atletico Madrid - Juventus</div>
            <div style={{fontSize:12,color:C.textSec}}>Champions League — Gara difensiva tra due squadre a bassa media gol</div>
          </div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:16}}>
          {[["xG Casa (Atletico)","0.95 a partita",C.accent],["xG Ospite (Juve)","0.88 a partita",C.accent],["Quota Betfair CS 0-0","9.40",C.warn]].map(([l,v,c])=>(
            <div key={l} style={{background:"#050D1A",border:`1px solid ${C.border}`,borderRadius:6,padding:"10px 12px"}}>
              <div style={{fontSize:10,color:C.textDim,marginBottom:3}}>{l}</div>
              <div style={{fontFamily:"monospace",fontSize:16,fontWeight:700,color:c}}>{v}</div>
            </div>
          ))}
        </div>

        {[
          {step:1,tool:"CS Matrix",icon:"⊞",color:C.purple,title:"Risultato CS Matrix",items:[["Prob. CS 0-0","14.8%"],["Quota fair 0-0","6.76"],["Quota Betfair","9.40"],["Edge grezzo","+2.24% ✅"]]},
          {step:2,tool:"Value Finder",icon:"◎",color:C.profit,title:"Risultato Value Finder",items:[["Stake ipotetica","€100"],["EV netto (comm 5%)","€13.20"],["ROI atteso","+13.2% ✅"],["Verdetto","VALUE BET ✅"]]},
          {step:3,tool:"Masaniello",icon:"⚡",color:C.warn,title:"Parametri Masaniello",items:[["Bankroll sessione","€800"],["Target","€160 (20%)"],["Step corrente","Step 3 di 10"],["Stake calcolata","€18.50"]]},
        ].map(s=>(
          <div key={s.step} style={{background:"#070E1C",border:`1px solid ${s.color}30`,borderRadius:8,padding:"14px 16px",marginBottom:10}}>
            <div style={{display:"flex",gap:10,alignItems:"center",marginBottom:10}}>
              <span style={{padding:"3px 8px",background:`${s.color}15`,border:`1px solid ${s.color}30`,borderRadius:4,fontSize:11,color:s.color,fontFamily:"monospace"}}>STEP {s.step} → {s.tool}</span>
              <div style={{fontSize:13,fontWeight:600,color:C.text}}>{s.title}</div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
              {s.items.map(([l,v])=>(
                <div key={l} style={{display:"flex",justifyContent:"space-between",padding:"4px 0",borderBottom:`1px solid ${C.border}20`}}>
                  <span style={{fontSize:12,color:C.textSec}}>{l}</span>
                  <span style={{fontFamily:"monospace",fontSize:12,color:v.includes("✅")?C.profit:C.text,fontWeight:600}}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Esito */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginTop:4}}>
          <div style={{background:`${C.profit}0A`,border:`1px solid ${C.profit}30`,borderRadius:8,padding:"12px 14px"}}>
            <div style={{fontSize:12,fontWeight:700,color:C.profit,marginBottom:6}}>✅ Scenario vincente (0-0 finale)</div>
            <div style={{fontSize:12,color:C.textSec,lineHeight:1.65}}>Stake €18.50 × quota 9.40 = <strong style={{color:C.profit}}>€173.90 lordi</strong><br/>Commissione 5% = -€7.77<br/>Profitto netto = <strong style={{color:C.profit}}>€155.63</strong></div>
          </div>
          <div style={{background:`${C.loss}0A`,border:`1px solid ${C.loss}30`,borderRadius:8,padding:"12px 14px"}}>
            <div style={{fontSize:12,fontWeight:700,color:C.loss,marginBottom:6}}>❌ Scenario perdente (altro risultato)</div>
            <div style={{fontSize:12,color:C.textSec,lineHeight:1.65}}>Stake persa: <strong style={{color:C.loss}}>-€18.50</strong><br/>Il Masaniello adegua la stake<br/>al prossimo step per compensare</div>
          </div>
        </div>
      </div>

      {/* Regole d'oro */}
      <div style={{...card,borderColor:`${C.warn}33`}}>
        <div style={cardDeco(C.warn)}/>
        <div style={{fontSize:13,fontWeight:700,color:C.warn,marginBottom:14}}>📌 Le 5 regole d'oro del metodo</div>
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {[
            ["Non scommettere senza edge positivo","Mai entrare su una partita se il Value Finder mostra EV negativo, anche se 'sembra sicura'. Il modello batte l'istinto nel lungo periodo.",C.loss],
            ["Rispetta sempre la stake del Masaniello","Mai aumentare la stake per 'recuperare' o diminuirla per paura. La progressione matematica funziona solo se seguita fedelmente.",C.warn],
            ["Una sequenza = un tipo di mercato","Non mescolare CS 0-0, Over 2.5 e 1X2 nella stessa sequenza Masaniello. Quote e probabilità diverse rendono il calcolo incoerente.",C.accent],
            ["Minimum 50 scommesse per giudicare","Con meno di 50 entry non puoi valutare se il metodo funziona. La varianza nel breve periodo è normale — non cambiare strategia dopo 5 perdite.",C.purple],
            ["Tieni un registro di ogni scommessa","Annota partita, xG inseriti, EV calcolato, quota reale, esito. Solo così puoi capire se il tuo edge stimato è reale o se stai sovrastimando le probabilità.",C.profit],
          ].map(([title,desc,color],i)=>(
            <div key={i} style={{display:"flex",gap:12,padding:"10px 12px",background:"#070E1C",border:`1px solid ${color}20`,borderRadius:6}}>
              <div style={{minWidth:22,height:22,borderRadius:"50%",background:`${color}15`,border:`1px solid ${color}40`,color:color,fontSize:11,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{i+1}</div>
              <div><div style={{fontSize:13,fontWeight:600,color:color,marginBottom:3}}>{title}</div><div style={{fontSize:12,color:C.textSec,lineHeight:1.6}}>{desc}</div></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const content = {overview:overviewContent, pre:preContent, live:liveContent, flow:flowContent};

  return (
    <div style={{position:"relative",zIndex:1}}>
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:4}}>
        <div style={{color:C.profit,filter:`drop-shadow(0 0 8px ${C.profit})`}}><IconStrategy/></div>
        <div style={{fontSize:24,fontWeight:700,fontFamily:"'JetBrains Mono',monospace"}}>Strategia di Gioco</div>
      </div>
      <div style={{fontSize:13,color:C.textSec,marginBottom:20}}>Metodo completo — dall'analisi statistica alla gestione live</div>

      {/* Phase tabs */}
      <div style={{display:"flex",gap:8,marginBottom:20,flexWrap:"wrap"}}>
        {phases.map(p=>(
          <button key={p.id} className="phase-tab" onClick={()=>{setPhase(p.id);setActiveStep(null);}}
            style={{padding:"8px 16px",borderRadius:6,border:`1px solid ${phase===p.id?p.color:C.border}`,background:phase===p.id?`${p.color}18`:"transparent",color:phase===p.id?p.color:C.textSec,fontSize:13,fontWeight:phase===p.id?700:400,cursor:"pointer",fontFamily:"inherit",transition:"all .15s"}}>
            {p.label}
          </button>
        ))}
      </div>

      {content[phase]}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   MASANIELLO TOOL
══════════════════════════════════════════════════════════════ */
const MASA_GUIDE={steps:[{title:"Inserisci il bankroll",desc:"Il capitale dedicato a questa sequenza. Non tutto il saldo Betfair, solo la quota da rischiare.",example:"Bankroll: €1000"},{title:"Imposta il target",desc:"Quanto vuoi guadagnare a fine sequenza. Più alto rispetto al bankroll, più aggressiva la progressione.",example:"Target: €200 (20%)"},{title:"Numero di eventi (n)",desc:"Quante partite compongono la sequenza. Con n alto le stake sono più basse ma serve più disciplina.",example:"n = 10 eventi"},{title:"Quota e tipo scommessa",desc:"Quota media prevista per gli eventi. Back = punti su un esito, Lay = punti contro.",example:"Quota: 2.0, Back"},{title:"Calcola e segui la tabella",desc:"Ogni step mostra la stake esatta, già arrotondata a €0.50. Non deviare mai dalla stake calcolata."}],tip:"Usa sempre la stessa quota per tutta la sequenza. Se le partite hanno quote molto diverse, ricomincia una nuova sequenza."};

function MasanielloTool(){
  const[form,setForm]=useState({bankroll:1000,target:200,events:10,odds:2.0,betType:"back",commission:5});
  const[steps,setSteps]=useState([]);
  const set=(k,v)=>setForm(f=>({...f,[k]:v}));
  const isLay=form.betType==="lay";
  const Q=(parseFloat(form.bankroll)+parseFloat(form.target))/parseFloat(form.bankroll);
  const coeff=Math.pow(Q,1/parseInt(form.events));
  const calculate=()=>{
    const{bankroll,target,events,odds,betType,commission}=form;
    const n=parseInt(events),B=parseFloat(bankroll),T=parseFloat(target),q=parseFloat(odds),comm=parseFloat(commission)/100;
    const netOdds=betType==="back"?q-1:1/(q-1),Qv=(B+T)/B,cf=Math.pow(Qv,1/n);
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
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:4}}><div style={{color:C.accent,filter:`drop-shadow(0 0 8px ${C.accent})`}}><IconMasa/></div><div style={{fontSize:24,fontWeight:700,fontFamily:"'JetBrains Mono',monospace"}}>Masaniello Calculator</div></div>
      <div style={{fontSize:13,color:C.textSec,marginBottom:20}}>Gestione progressiva Back / Lay con rounding Betfair €0.50</div>
      <GuidePanel {...MASA_GUIDE}/>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
        <div style={{...card,borderColor:C.borderBright}} className="ec-card">
          <div style={cardDeco(C.accent)}/>
          <div style={{fontSize:11,color:C.textDim,letterSpacing:2,textTransform:"uppercase",marginBottom:16}}>Parametri sequenza</div>
          {[["Bankroll (€)","bankroll","1"],["Target Profitto (€)","target","1"],["Numero eventi (n)","events","1"],["Quota","odds","0.1"]].map(([lbl,key,step])=>(<div key={key}><label style={{fontSize:12,color:C.textSec,marginBottom:5,display:"block"}}>{lbl}</label><input className="ec-input" style={inputStyle} type="number" step={step} value={form[key]} onChange={e=>set(key,e.target.value)}/></div>))}
          <label style={{fontSize:12,color:C.textSec,marginBottom:5,display:"block"}}>Tipo scommessa</label>
          <select className="ec-input" style={{...inputStyle,cursor:"pointer"}} value={form.betType} onChange={e=>set("betType",e.target.value)}><option value="back">Back</option><option value="lay">Lay</option></select>
          <label style={{fontSize:12,color:C.textSec,marginBottom:5,display:"block"}}>Commissione Betfair (%)</label>
          <input className="ec-input" style={inputStyle} type="number" step="0.5" value={form.commission} onChange={e=>set("commission",e.target.value)}/>
          <button className="ec-btn" onClick={calculate} style={btnStyle}>Calcola Sequenza →</button>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          <div style={card} className="ec-card">
            <div style={cardDeco(C.profit)}/>
            <div style={{fontSize:11,color:C.textDim,letterSpacing:2,textTransform:"uppercase",marginBottom:14}}>Riepilogo</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12}}>
              {[["Q^(1/n)",f4(coeff),C.accent],["Target",`€${parseFloat(form.target).toFixed(0)}`,C.profit],["Tipo",isLay?"LAY":"BACK",isLay?C.warn:C.accent],["Quota",form.odds,C.text]].map(([lbl,val,col])=>(<div key={lbl} style={{background:"#050D1A",border:`1px solid ${C.border}`,borderRadius:6,padding:"10px 12px"}}><div style={{fontSize:10,color:C.textDim,marginBottom:4}}>{lbl}</div><div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:18,fontWeight:700,color:col,textShadow:`0 0 10px ${col}50`}}>{val}</div></div>))}
            </div>
            {steps.length>0&&<StakeBarChart steps={steps}/>}
          </div>
          <div style={card} className="ec-card">
            <div style={{fontSize:11,color:C.textDim,letterSpacing:2,textTransform:"uppercase",marginBottom:10}}>Regole Exchange</div>
            {[["Rounding","€ 0.50"],["Stake min","€ 2.00"],["Commissione","su vincite nette"]].map(([l,v])=>(<div key={l} style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:`1px solid ${C.border}30`,fontSize:12}}><span style={{color:C.textSec}}>{l}</span><span style={{color:C.accent,fontFamily:"monospace"}}>{v}</span></div>))}
          </div>
        </div>
      </div>
      {steps.length>0&&(
        <div style={{...card,marginTop:16}} className="ec-card">
          <div style={cardDeco(C.accent)}/>
          <div style={{fontSize:11,color:C.textDim,letterSpacing:2,textTransform:"uppercase",marginBottom:14}}>Sequenza — {steps.length} eventi</div>
          <div style={{overflowX:"auto"}}>
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
              <thead><tr>{["Step","Stake (€)","Quota",isLay?"Liability (€)":"Profitto (€)","Bank ✓","Bank ✗"].map(h=>(<th key={h} style={{padding:"8px 10px",textAlign:"left",color:C.textDim,fontSize:11,letterSpacing:1,textTransform:"uppercase",borderBottom:`1px solid ${C.border}`}}>{h}</th>))}</tr></thead>
              <tbody>{steps.map(r=>(<tr key={r.step} style={{borderBottom:`1px solid ${C.border}18`}}><td style={{padding:"8px 10px",fontFamily:"monospace",color:C.textSec}}>{r.step}</td><td style={{padding:"8px 10px",fontFamily:"monospace",color:C.accent,fontWeight:600}}>{f2(r.stake)}</td><td style={{padding:"8px 10px",fontFamily:"monospace"}}>{f2(parseFloat(form.odds))}</td><td style={{padding:"8px 10px",fontFamily:"monospace",color:isLay?C.warn:C.profit}}>{f2(isLay?r.liability:r.profitIfWin)}</td><td style={{padding:"8px 10px",fontFamily:"monospace",color:C.profit}}>{f2(r.bankAfterWin)}</td><td style={{padding:"8px 10px",fontFamily:"monospace",color:C.loss}}>{f2(r.bankAfterLoss)}</td></tr>))}</tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   CS MATRIX TOOL
══════════════════════════════════════════════════════════════ */
const CS_GUIDE={steps:[{title:"Trova gli xG delle due squadre",desc:"Cerca le medie xG su Understat.com o FBref. Prendi le ultime 5-10 partite.",example:"Casa: 1.5 xG — Ospite: 1.0 xG"},{title:"Inserisci i valori λ",desc:"Lambda = gol attesi per squadra. Più è alto, più la squadra è offensiva.",example:"λ Casa = 0.95, λ Ospite = 0.88"},{title:"Calcola e leggi la heatmap",desc:"Le celle più luminose sono i risultati più probabili. Il 0-0 è evidenziato in giallo."},{title:"Confronta con le quote Betfair",desc:"Inserisci la quota Betfair in ogni cella. Edge verde = valore. Edge rosso = quota bassa.",example:"Quota 9.40 su 0-0 con prob 14.8% → edge +2.24%"}],tip:"Cerca partite con λ casa < 1.2 e λ ospite < 1.0 — gare difensive dove il 0-0 ha più probabilità."};

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
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:4}}><div style={{color:C.accent,filter:`drop-shadow(0 0 8px ${C.accent})`}}><IconCS/></div><div style={{fontSize:24,fontWeight:700,fontFamily:"'JetBrains Mono',monospace"}}>Correct Score Matrix</div></div>
      <div style={{fontSize:13,color:C.textSec,marginBottom:20}}>Probabilità Poisson bivariata — confronto con quote Betfair Exchange</div>
      <GuidePanel {...CS_GUIDE}/>
      <div style={{display:"grid",gridTemplateColumns:matrix?"1fr 1fr 1fr":"1fr",gap:16,marginBottom:16}}>
        <div style={{...card,borderColor:C.borderBright}} className="ec-card">
          <div style={cardDeco(C.accent)}/>
          <div style={{fontSize:11,color:C.textDim,letterSpacing:2,textTransform:"uppercase",marginBottom:16}}>Parametri attacco</div>
          {[["xG Casa (λ)","lambdaH"],["xG Ospite (λ)","lambdaA"]].map(([lbl,key])=>(<div key={key}><label style={{fontSize:12,color:C.textSec,marginBottom:5,display:"block"}}>{lbl}</label><input className="ec-input" style={inputStyle} type="number" step="0.1" value={form[key]} onChange={e=>setForm(f=>({...f,[key]:e.target.value}))}/></div>))}
          <button className="ec-btn" onClick={calc} style={btnStyle}>Calcola Matrice →</button>
        </div>
        {matrix&&(<>
          <div style={card} className="ec-card">
            <div style={cardDeco(C.warn)}/>
            <div style={{fontSize:11,color:C.textDim,letterSpacing:2,textTransform:"uppercase",marginBottom:14}}>Probabilità aggregate</div>
            {[["🏠 Casa vince",scores.filter(([h,a])=>h>a).reduce((s,[h,a])=>s+matrix[h][a],0),C.text],["➖ Pareggio",scores.filter(([h,a])=>h===a).reduce((s,[h,a])=>s+matrix[h][a],0),C.text],["✈️ Ospite vince",scores.filter(([h,a])=>h<a).reduce((s,[h,a])=>s+matrix[h][a],0),C.text],["📉 Under 2.5",scores.filter(([h,a])=>h+a<3).reduce((s,[h,a])=>s+matrix[h][a],0),C.textSec],["📈 Over 2.5",scores.filter(([h,a])=>h+a>=3).reduce((s,[h,a])=>s+matrix[h][a],0),C.textSec],["⭐ 0-0 (CS)",matrix[0][0],C.warn]].map(([lbl,prob,col])=>(<div key={lbl} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"7px 0",borderBottom:`1px solid ${C.border}25`,fontSize:13}}><span style={{color:C.textSec,fontSize:12}}>{lbl}</span><div style={{textAlign:"right"}}><span style={{fontFamily:"monospace",color:col,fontWeight:600}}>{pct(prob)}</span><span style={{color:C.textDim,fontSize:11,marginLeft:6}}>({f2(1/prob)})</span></div></div>))}
          </div>
          <div style={card} className="ec-card">
            <div style={cardDeco(C.profit)}/>
            <div style={{fontSize:11,color:C.textDim,letterSpacing:2,textTransform:"uppercase",marginBottom:12}}>Top 10 risultati</div>
            {sorted.map(([h,a])=>{const prob=matrix[h][a];const edge=getEdge(h,a);const w=Math.min(prob/matrix[sorted[0][0]][sorted[0][1]]*100,100);return(<div key={`${h}-${a}`} style={{marginBottom:8}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:3}}><span style={{minWidth:28,padding:"1px 5px",background:`${C.accent}20`,color:C.accent,borderRadius:3,fontSize:11,fontWeight:700,fontFamily:"monospace",textAlign:"center"}}>{h}-{a}</span><div style={{flex:1,height:5,background:C.border,borderRadius:3,overflow:"hidden"}}><div style={{height:5,width:`${w}%`,background:`linear-gradient(90deg,${C.accent},${C.profit})`,borderRadius:3}}/></div><span style={{fontFamily:"monospace",fontSize:12,color:C.text,minWidth:38}}>{pct(prob)}</span>{edge!==null&&<span style={{padding:"1px 5px",background:edge>0?`${C.profit}20`:`${C.loss}20`,color:edge>0?C.profit:C.loss,borderRadius:3,fontSize:10,fontFamily:"monospace",minWidth:46,textAlign:"center"}}>{edge>0?"+":""}{edge.toFixed(1)}%</span>}</div></div>);})}
          </div>
        </>)}
      </div>
      {matrix&&(
        <div style={card} className="ec-card">
          <div style={{fontSize:11,color:C.textDim,letterSpacing:2,textTransform:"uppercase",marginBottom:14}}>Heatmap — inserisci quota Betfair per vedere l'edge</div>
          <div style={{overflowX:"auto"}}>
            <table style={{borderCollapse:"separate",borderSpacing:3}}>
              <thead><tr><th style={{padding:"4px 8px",fontSize:10,color:C.textDim,textAlign:"center"}}>C\O</th>{Array.from({length:MAX+1},(_,i)=><th key={i} style={{padding:"4px 8px",fontSize:11,color:C.textSec,textAlign:"center",minWidth:82}}>{i}</th>)}</tr></thead>
              <tbody>{Array.from({length:MAX+1},(_,h)=>(<tr key={h}><td style={{padding:"4px 8px",fontSize:11,color:C.textSec,fontWeight:600,textAlign:"center"}}>{h}</td>{Array.from({length:MAX+1},(_,a)=>{const prob=matrix[h][a];const edge=getEdge(h,a);const intensity=Math.min(prob*8,.85);const isZZ=h===0&&a===0;const bg=isZZ?`rgba(255,184,0,${intensity+.1})`:`rgba(0,194,255,${intensity})`;const bord=isZZ?`1px solid rgba(255,184,0,${intensity*.7+.1})`:`1px solid rgba(0,194,255,${intensity*.5+.05})`;return(<td key={a} style={{padding:2}}><div style={{background:bg,border:bord,borderRadius:6,padding:"5px 4px",textAlign:"center",minWidth:78,boxShadow:isZZ&&intensity>0.3?`0 0 10px ${C.warnGlow}`:"none"}}><div style={{fontFamily:"monospace",fontSize:11,fontWeight:600,color:intensity>0.55?"#040C1A":C.text}}>{pct(prob)}</div><input placeholder="quota" value={odds[`${h}-${a}`]||""} onChange={e=>setOdds(o=>({...o,[`${h}-${a}`]:e.target.value}))} style={{width:56,fontSize:10,background:"rgba(0,0,0,0.35)",border:"1px solid rgba(255,255,255,0.12)",borderRadius:3,color:"#fff",padding:"2px 4px",textAlign:"center",fontFamily:"monospace",outline:"none",marginTop:2,boxSizing:"border-box"}}/>{edge!==null&&<div style={{fontSize:10,color:edge>0?C.profit:C.loss,fontFamily:"monospace",fontWeight:700,marginTop:1}}>{edge>0?"+":""}{edge.toFixed(1)}%</div>}</div></td>);})}</tr>))}</tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   VALUE FINDER TOOL
══════════════════════════════════════════════════════════════ */
const VALUE_GUIDE={steps:[{title:"Scegli Back o Lay",desc:"Back = punti su un esito. Lay = punti contro un esito (fai la banca).",example:"Tipo: Back"},{title:"Inserisci la quota Betfair Exchange",desc:"Quota dall'Exchange, non dal Sportsbook. Non usare quote bookmaker.",example:"Quota: 9.40"},{title:"Stima la probabilità",desc:"Usa la probabilità dalla CS Matrix — non la probabilità implicita della quota!",example:"Prob. CS Matrix: 14.8%"},{title:"Leggi il verdetto",desc:"EV positivo = VALUE BET. Il gauge mostra visivamente l'intensità del vantaggio."},{title:"Controlla le quote fair",desc:"Fair Back < quota Betfair = edge positivo su Back. Usa questo per decidere il limite di entrata.",example:"Fair 6.76 — Betfair 9.40 → VALUE"}],tip:"Collega sempre CS Matrix → Value Finder. Inserisci la probabilità dalla matrice, non la tua sensazione."};

function ValueFinderTool(){
  const[form,setForm]=useState({betType:"back",odds:3.0,probPct:35,commission:5,stake:100});
  const set=(k,v)=>setForm(f=>({...f,[k]:v}));
  const q=parseFloat(form.odds),prob=parseFloat(form.probPct)/100,comm=parseFloat(form.commission)/100,stake=parseFloat(form.stake);
  const isBack=form.betType==="back";
  const bNP=stake*(q-1)*(1-comm),bEV=prob*bNP-(1-prob)*stake,bROI=bEV/stake,bBE=1/q,impl=1/q,bEdge=prob-impl;
  const lLia=stake*(q-1),lNP=stake*(1-comm),lEV=(1-prob)*lNP-prob*lLia,lROI=lEV/stake,lBE=1-1/q,lEdge=(1-prob)-(1-1/q);
  const ev=isBack?bEV:lEV,roi=isBack?bROI:lROI,edge=isBack?bEdge:lEdge,be=isBack?bBE:lBE;
  const fairB=1/prob,fairL=1/(1-prob),evColor=ev>0?C.profit:ev<0?C.loss:C.textSec;
  return(
    <div style={{position:"relative",zIndex:1}}>
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:4}}><div style={{color:C.accent,filter:`drop-shadow(0 0 8px ${C.accent})`}}><IconValue/></div><div style={{fontSize:24,fontWeight:700,fontFamily:"'JetBrains Mono',monospace"}}>Value Finder</div></div>
      <div style={{fontSize:13,color:C.textSec,marginBottom:20}}>Expected Value, edge e breakeven per Back e Lay su Betfair Exchange</div>
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
          <div style={{...card,border:`1px solid ${ev>0?C.profit:ev<0?C.loss:C.border}`,background:ev>0?`linear-gradient(135deg,#0D1E3A,#081A10)`:ev<0?`linear-gradient(135deg,#0D1E3A,#1A080A)`:"#0D1E3A"}} className="ec-card">
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <div>
                <div style={{fontSize:11,color:C.textDim,letterSpacing:2,textTransform:"uppercase",marginBottom:8}}>Verdetto</div>
                <div style={{fontSize:28,fontFamily:"'JetBrains Mono',monospace",fontWeight:700,color:evColor,textShadow:`0 0 20px ${evColor}60`,lineHeight:1.1}}>{ev>0?"✓ VALUE BET":ev<0?"✗ NO VALUE":"— NEUTRO"}</div>
                <div style={{fontSize:12,color:C.textSec,marginTop:8,maxWidth:220}}>{ev>0?`Edge +${(edge*100).toFixed(2)}% · EV €${f2(ev)} per €${stake} di stake`:`Edge ${(edge*100).toFixed(2)}% · Non conveniente a lungo termine`}</div>
              </div>
              <Gauge value={parseFloat((ev/stake*100).toFixed(1))} min={-50} max={50} label="ROI%" color={evColor}/>
            </div>
          </div>
          <div style={card} className="ec-card">
            <div style={cardDeco(C.profit)}/>
            <div style={{fontSize:11,color:C.textDim,letterSpacing:2,textTransform:"uppercase",marginBottom:12}}>Metriche</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
              {[["Expected Value",`€ ${f2(ev)}`,ev>=0?C.profit:C.loss],["ROI atteso",`${(roi*100).toFixed(2)}%`,roi>=0?C.profit:C.loss],["Edge",`${(edge*100).toFixed(2)}%`,edge>=0?C.profit:C.loss],["Breakeven",pct(be),C.warn],["Prob. stimata",pct(prob),C.accent],["Prob. implicita",pct(impl),C.textSec],["Fair Back",f2(fairB),C.accent],["Fair Lay",f2(fairL),C.warn]].map(([lbl,val,col])=>(<div key={lbl} style={{background:"#050D1A",border:`1px solid ${C.border}`,borderRadius:6,padding:"9px 11px"}}><div style={{fontSize:10,color:C.textDim,marginBottom:3}}>{lbl}</div><div style={{fontFamily:"monospace",fontSize:15,fontWeight:700,color:col}}>{val}</div></div>))}
            </div>
          </div>
        </div>
      </div>
      <div style={{...card,marginTop:16}} className="ec-card">
        <div style={cardDeco(C.textSec)}/>
        <div style={{fontSize:11,color:C.textDim,letterSpacing:2,textTransform:"uppercase",marginBottom:14}}>Confronto Back vs Lay</div>
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
            <thead><tr>{["Metrica","BACK","LAY"].map((h,i)=>(<th key={h} style={{padding:"8px 12px",textAlign:"left",color:i===0?C.textDim:i===1&&isBack?C.accent:i===2&&!isBack?C.accent:C.textSec,fontSize:11,letterSpacing:1,textTransform:"uppercase",borderBottom:`1px solid ${C.border}`,background:i===1&&isBack?`${C.accent}08`:i===2&&!isBack?`${C.accent}08`:"transparent"}}>{h}</th>))}</tr></thead>
            <tbody>{[["Stake / Liability",`€ ${f2(stake)}`,`€ ${f2(lLia)}`],["Profitto se vince",`€ ${f2(bNP)}`,`€ ${f2(lNP)}`],["Expected Value",`€ ${f2(bEV)}`,`€ ${f2(lEV)}`],["ROI atteso",`${(bROI*100).toFixed(2)}%`,`${(lROI*100).toFixed(2)}%`],["Breakeven",pct(bBE),pct(lBE)]].map(([lbl,b,l])=>(<tr key={lbl}><td style={{padding:"9px 12px",color:C.textSec,borderBottom:`1px solid ${C.border}18`}}>{lbl}</td><td style={{padding:"9px 12px",fontFamily:"monospace",color:isBack?C.accent:C.textSec,fontWeight:isBack?600:400,background:isBack?`${C.accent}05`:"transparent",borderBottom:`1px solid ${C.border}18`}}>{b}</td><td style={{padding:"9px 12px",fontFamily:"monospace",color:!isBack?C.accent:C.textSec,fontWeight:!isBack?600:400,background:!isBack?`${C.accent}05`:"transparent",borderBottom:`1px solid ${C.border}18`}}>{l}</td></tr>))}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ─── APP ────────────────────────────────────────────────────── */
const TOOLS=[
  {id:"strategy", label:"Strategia",   Icon:IconStrategy, component:StrategyPage,  color:C.profit},
  {id:"masaniello",label:"Masaniello", Icon:IconMasa,     component:MasanielloTool,color:C.accent},
  {id:"cs-matrix", label:"CS Matrix",  Icon:IconCS,       component:CorrectScoreTool,color:C.accent},
  {id:"value",     label:"Value Finder",Icon:IconValue,   component:ValueFinderTool,color:C.accent},
];

export default function App(){
  const[active,setActive]=useState("strategy");
  const ActiveTool=TOOLS.find(t=>t.id===active)?.component??(()=>null);
  return(
    <>
      <style>{globalCSS}</style>
      <div style={{display:"flex",height:"100vh",width:"100%",background:C.bg,fontFamily:"'Inter',system-ui,sans-serif",color:C.text,overflow:"hidden",position:"relative"}}>
        <GridBackground/>
        {/* Sidebar */}
        <div style={{width:220,minWidth:220,background:`${C.sidebar}EE`,borderRight:`1px solid ${C.border}`,display:"flex",flexDirection:"column",padding:"0 0 16px 0",overflow:"hidden",position:"relative",zIndex:2,backdropFilter:"blur(8px)"}}>
          <div style={{padding:"20px 20px 16px",borderBottom:`1px solid ${C.border}`}}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <IconDelta/>
              <div>
                <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:18,fontWeight:700,color:C.accent,letterSpacing:"-0.5px",textShadow:`0 0 20px ${C.accent}66`}}>EdgeCalc</div>
                <div style={{fontSize:9,color:C.textDim,letterSpacing:2.5,textTransform:"uppercase",marginTop:1}}>Exchange Tools</div>
              </div>
            </div>
          </div>
          {/* Nav sections */}
          <div style={{padding:"12px 12px 4px",fontSize:9,color:C.textDim,letterSpacing:2.5,textTransform:"uppercase"}}>Inizia da qui</div>
          {TOOLS.slice(0,1).map(({id,label,Icon,color})=>{
            const a=active===id;
            return(<button key={id} className="ec-nav" onClick={()=>setActive(id)} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 20px",cursor:"pointer",border:"none",background:a?`${color}18`:"transparent",color:a?color:C.textSec,borderLeft:a?`2px solid ${color}`:"2px solid transparent",fontSize:13.5,fontWeight:a?600:400,width:"100%",textAlign:"left",transition:"all .15s"}}><Icon/>{label}{a&&<div style={{marginLeft:"auto",width:6,height:6,borderRadius:"50%",background:color,boxShadow:`0 0 6px ${color}`}}/>}</button>);
          })}
          <div style={{padding:"12px 12px 4px",fontSize:9,color:C.textDim,letterSpacing:2.5,textTransform:"uppercase"}}>Tools</div>
          {TOOLS.slice(1).map(({id,label,Icon,color})=>{
            const a=active===id;
            return(<button key={id} className="ec-nav" onClick={()=>setActive(id)} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 20px",cursor:"pointer",border:"none",background:a?`${color}18`:"transparent",color:a?color:C.textSec,borderLeft:a?`2px solid ${color}`:"2px solid transparent",fontSize:13.5,fontWeight:a?600:400,width:"100%",textAlign:"left",transition:"all .15s"}}><Icon/>{label}</button>);
          })}
          <div style={{flex:1}}/>
          {/* Workflow hint */}
          <div style={{margin:"0 12px 12px",background:`${C.profit}08`,border:`1px solid ${C.profit}20`,borderRadius:6,padding:"10px 12px"}}>
            <div style={{fontSize:10,color:C.profit,fontWeight:700,marginBottom:4}}>FLUSSO CONSIGLIATO</div>
            {["① Strategia","② CS Matrix","③ Value Finder","④ Masaniello"].map((s,i)=>(<div key={i} style={{fontSize:11,color:C.textSec,padding:"2px 0"}}>{s}</div>))}
          </div>
          <div style={{padding:"0 12px"}}><div style={{background:`${C.accent}10`,border:`1px solid ${C.border}`,borderRadius:6,padding:"6px 10px"}}><div style={{fontFamily:"monospace",fontSize:11,color:C.accent}}>v2.0</div></div></div>
        </div>
        {/* Main */}
        <div style={{flex:1,overflow:"auto",padding:"28px 32px",position:"relative",zIndex:1}}>
          <div style={{maxWidth:1100,margin:"0 auto"}}>
            <ActiveTool/>
          </div>
        </div>
      </div>
    </>
  );
}
