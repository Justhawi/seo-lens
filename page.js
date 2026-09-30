export const PAGE = `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>SEO Lens</title>
<meta name="description" content="Audita cualquier URL y comprueba si esa pagina muestra a Google algo distinto de lo que ves tu.">
<style>
/* Petplan design tokens - matched to lector-facturas-petplan */
:root{
--pp-blue:#0055a4;--pp-blue-dark:#00427f;--pp-blue-deep:#003057;
--pp-green:#8ebe3f;--pp-green-dark:#6f9a2c;
--pp-yellow:#ffcb05;--pp-orange:#f47721;
--pp-cta:#c9252c;--pp-cta-dark:#a51d23;

--surface-0:#f2f7fa;--surface-1:#ffffff;--surface-2:#e6f0f5;--surface-3:#d3e2ea;
--border:#d8e3ea;--border-strong:#b6c9d5;
--text-primary:#333333;--text-secondary:#5c6b76;--text-muted:#8a97a1;
--brand:#0055a4;--brand-soft:#e6f0f5;

--ok:#6f9a2c;--ok-soft:#eef5e2;
--warn:#b45d0e;--warn-soft:#fdf0e2;
--crit:#c9252c;--crit-soft:#fbe9ea;

--radius:5px;
--shadow:0 1px 2px rgba(56,69,84,.06),0 3px 12px rgba(56,69,84,.07);
--font:Arial,"Helvetica Neue",Helvetica,sans-serif;
--font-display:"American Typewriter","Zilla Slab",Rockwell,"Roboto Slab","Bookman Old Style",Georgia,serif;
}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){
--surface-0:#0c1620;--surface-1:#13212e;--surface-2:#1a2c3c;--surface-3:#24384a;
--border:#23384a;--border-strong:#35506a;
--text-primary:#eaf2f7;--text-secondary:#b3c4d0;--text-muted:#8598a6;
--brand:#82bcf1;--brand-soft:#16293b;
--ok:#a5d45e;--ok-soft:#1d2c17;
--warn:#f79553;--warn-soft:#2c1f10;
--crit:#e8646a;--crit-soft:#2e1416;
--shadow:0 1px 2px rgba(0,0,0,.35),0 3px 12px rgba(0,0,0,.45);
}}
:root[data-theme="dark"]{
--surface-0:#0c1620;--surface-1:#13212e;--surface-2:#1a2c3c;--surface-3:#24384a;
--border:#23384a;--border-strong:#35506a;
--text-primary:#eaf2f7;--text-secondary:#b3c4d0;--text-muted:#8598a6;
--brand:#82bcf1;--brand-soft:#16293b;
--ok:#a5d45e;--ok-soft:#1d2c17;
--warn:#f79553;--warn-soft:#2c1f10;
--crit:#e8646a;--crit-soft:#2e1416;
--shadow:0 1px 2px rgba(0,0,0,.35),0 3px 12px rgba(0,0,0,.45);
}
*{box-sizing:border-box}
html,body{margin:0;padding:0}
body{background:var(--surface-0);color:var(--text-primary);font:15px/1.55 var(--font)}

/* top bar */
.topbar{position:sticky;top:0;z-index:20;height:52px;background:var(--pp-blue);color:#fff;
display:flex;align-items:center;gap:14px;padding:0 20px;
padding-top:env(safe-area-inset-top,0px);box-sizing:content-box}
.topbar .brand{font-family:var(--font-display);font-size:19px;letter-spacing:.01em}
.topbar .sep{width:1px;height:22px;background:rgba(255,255,255,.35)}
.topbar .page{font-size:12px;letter-spacing:.13em;text-transform:uppercase;opacity:.92}
.topbar .right{margin-left:auto;font-size:12px;opacity:.85}

.wrap{max-width:980px;margin:0 auto;padding-block:26px 64px;padding-left:16px;padding-right:16px}
h1{font-family:var(--font-display);font-weight:400;font-size:26px;color:var(--brand);
margin:0 0 8px;letter-spacing:.005em;text-wrap:balance}
.lede{margin:0 0 20px;color:var(--text-secondary);max-width:70ch}

.card{background:var(--surface-1);border:1px solid var(--border);border-radius:var(--radius);
box-shadow:var(--shadow);margin-bottom:16px}
.card>h2{margin:0;padding:13px 18px;font-family:var(--font-display);font-weight:400;font-size:17px;
color:var(--brand);border-bottom:1px solid var(--border)}
.card .pad{padding:18px}

form{display:flex;gap:10px;flex-wrap:wrap;align-items:stretch}
.inputwrap{flex:1 1 280px;min-width:0;display:flex;align-items:stretch;
border:1px solid var(--border-strong);border-radius:var(--radius);background:var(--surface-1);overflow:hidden}
.inputwrap:focus-within{border-color:var(--pp-blue);box-shadow:0 0 0 3px var(--brand-soft)}
.scheme{display:flex;align-items:center;padding:0 11px;font-size:13px;color:var(--text-muted);
background:var(--surface-2);border-right:1px solid var(--border);white-space:nowrap}
input[type=text]{flex:1;min-width:0;padding:10px 12px;font:inherit;color:var(--text-primary);
background:transparent;border:0;outline:none}
button{padding:10px 20px;font:inherit;font-size:14px;cursor:pointer;color:#fff;
background:var(--pp-cta);border:0;border-radius:var(--radius);white-space:nowrap}
button:hover{background:var(--pp-cta-dark)}
button:disabled{opacity:.6;cursor:default}
button:focus-visible{outline:2px solid var(--pp-blue);outline-offset:2px}
.hint{margin:11px 0 0;font-size:13px;color:var(--text-muted)}

/* verdict */
.verdict{display:flex;align-items:center;gap:15px;flex-wrap:wrap;
background:var(--surface-1);border:1px solid var(--border);border-left:4px solid var(--ok);
border-radius:var(--radius);box-shadow:var(--shadow);padding:16px 18px;margin-bottom:14px}
.verdict.bad{border-left-color:var(--crit);background:var(--crit-soft)}
.vmark{width:34px;height:34px;flex:none;border-radius:50%;display:grid;place-items:center;
font-size:17px;background:var(--ok-soft);color:var(--ok)}
.verdict.bad .vmark{background:var(--crit);color:#fff}
.vtext{flex:1;min-width:190px}
.vtitle{font-family:var(--font-display);font-weight:400;font-size:18px;margin:0 0 1px;color:var(--brand)}
.verdict.bad .vtitle{color:var(--crit)}
.vsub{margin:0;font-size:13px;color:var(--text-secondary)}
.pills{display:flex;gap:6px;flex-wrap:wrap}
.pill{padding:3px 11px;border-radius:999px;font-size:12.5px}
.p-crit{color:var(--crit);background:var(--crit-soft)}
.p-warn{color:var(--warn);background:var(--warn-soft)}
.p-good{color:var(--ok);background:var(--ok-soft)}

/* tiles */
.tiles{display:grid;grid-template-columns:repeat(auto-fit,minmax(148px,1fr));gap:12px;margin-bottom:18px}
.tile{background:var(--surface-1);border:1px solid var(--border);border-radius:var(--radius);
box-shadow:var(--shadow);padding:14px 16px}
.tile .n{font-family:var(--font-display);font-weight:400;font-size:26px;color:var(--brand);line-height:1.15}
.tile .k{margin-top:2px;font-size:12px;color:var(--text-muted)}
.tile.t-warn .n{color:var(--pp-orange)}
.tile.t-crit .n{color:var(--crit)}
.tile.t-good .n{color:var(--pp-green-dark)}

/* rows */
.row{display:grid;grid-template-columns:18px 1fr auto;gap:12px;align-items:baseline;
padding:12px 18px;border-bottom:1px solid var(--border)}
.row:last-child{border-bottom:0}
.badge{width:18px;height:18px;border-radius:50%;align-self:center;display:grid;place-items:center;
font-size:11px;color:#fff;line-height:1}
.s-pass .badge{background:var(--pp-green)}
.s-warn .badge{background:var(--pp-orange)}
.s-critical .badge{background:var(--pp-cta)}
.s-info .badge{background:var(--border-strong)}
.s-critical{background:var(--crit-soft)}
.s-critical .label{color:var(--crit)}
.label{font-weight:bold}
.val{font-size:13px;color:var(--text-muted);text-align:right}
.note{grid-column:2/-1;margin-top:3px;font-size:13.5px;color:var(--text-secondary);overflow-wrap:anywhere}

.diff{grid-column:1/-1;margin-top:12px;display:grid;gap:9px}
@media (min-width:620px){.diff{grid-template-columns:1fr 1fr}}
.diff div{padding:11px 13px;border-radius:var(--radius);background:var(--surface-1);
border:1px solid var(--border);font-size:13.5px;overflow-wrap:anywhere}
.diff div:last-child{border-color:var(--crit)}
.diff span{display:block;font-size:11px;letter-spacing:.09em;text-transform:uppercase;
color:var(--text-muted);margin-bottom:4px}
.diff div:last-child span{color:var(--crit)}

table{width:100%;border-collapse:collapse;font-size:14px}
td{padding:10px 18px;border-bottom:1px solid var(--border);vertical-align:middle}
tr:last-child td{border-bottom:0}
.kw{width:34%}
.bar{width:100%;height:8px;border-radius:2px;background:var(--surface-2);overflow:hidden}
.bar i{display:block;height:100%;background:var(--pp-blue)}
td.num{text-align:right;color:var(--text-muted);font-size:13px;width:22%;white-space:nowrap}

.msg{padding:14px 16px;border-radius:var(--radius);background:var(--surface-1);
border:1px solid var(--border);color:var(--text-secondary);margin-bottom:14px}
.spin{display:inline-block;width:12px;height:12px;margin-right:9px;vertical-align:-1px;
border:2px solid var(--border-strong);border-top-color:var(--pp-blue);border-radius:50%;
animation:sp .7s linear infinite}
@keyframes sp{to{transform:rotate(360deg)}}
.foot{margin-top:26px;font-size:12.5px;color:var(--text-muted);
display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap}
.app{display:flex;min-height:100vh}
.side{width:252px;flex:none;background:var(--surface-1);border-right:1px solid var(--border);
display:flex;flex-direction:column;position:sticky;top:0;height:100vh}
.logo{padding:16px 18px 14px}
.wordmark{font-family:var(--font-display);font-size:26px;font-weight:700;color:var(--pp-blue);letter-spacing:-.02em;line-height:1}
.wordmark sup{font-size:11px;vertical-align:super;font-weight:400}
.licence{margin-top:6px;font-size:11.5px;color:var(--text-muted)}
.nav{padding:4px 0}
.nav a{display:flex;align-items:center;gap:12px;padding:11px 18px;text-decoration:none;
color:var(--text-primary);font-size:15px;border-left:3px solid transparent;cursor:pointer}
.nav a:hover{background:var(--surface-2)}
.nav a.on{background:var(--brand-soft);color:var(--pp-blue);font-weight:bold;border-left-color:var(--pp-blue)}
.ico{width:16px;text-align:center;font-size:15px;line-height:1}
.i-y{color:var(--pp-yellow)}.i-o{color:var(--pp-orange)}.i-g{color:var(--pp-green)}
.main{flex:1;min-width:0;display:flex;flex-direction:column}
.burger{display:none;width:26px;height:26px;border:0;background:transparent;cursor:pointer;padding:0;align-items:center;justify-content:center}
.burger i{display:block;width:20px;height:2px;background:#fff;position:relative}
.burger i::before,.burger i::after{content:"";position:absolute;left:0;width:20px;height:2px;background:#fff}
.burger i::before{top:-6px}.burger i::after{top:6px}
.tbtitle{font-size:13px;letter-spacing:.13em;text-transform:uppercase}
.tbright{margin-left:auto;display:flex;align-items:center;gap:12px}
.icobtn{width:28px;height:28px;border:0;background:transparent;color:#fff;cursor:pointer;font-size:15px;line-height:1;border-radius:50%;padding:0}
.icobtn:hover{background:rgba(255,255,255,.16)}
.wrap{flex:1;padding:22px 26px 70px;max-width:1080px;width:100%;margin:0}
.guide ol{margin:0;padding-left:0;list-style:none}
.guide li{display:flex;gap:12px;padding:11px 0;border-bottom:1px solid var(--border)}
.guide li:last-child{border-bottom:0}
.guide li b.num{flex:none;width:22px;height:22px;border-radius:50%;background:var(--pp-blue);
color:#fff;display:grid;place-items:center;font-size:12px;font-weight:400}
.guide p{margin:0;font-size:14px;color:var(--text-secondary)}
.guide strong{color:var(--text-primary)}
.callout{margin-top:14px;padding:11px 14px;background:var(--ok-soft);border-radius:var(--radius);font-size:13.5px;color:var(--text-secondary)}
.help{position:fixed;right:22px;bottom:22px;z-index:30;display:flex;align-items:center;gap:8px;
padding:10px 18px;border:0;border-radius:999px;background:var(--pp-blue);color:#fff;
font:inherit;font-size:14px;cursor:pointer;box-shadow:0 2px 10px rgba(0,48,87,.3)}
.help:hover{background:var(--pp-blue-dark)}
@media (max-width:860px){
.side{position:fixed;left:0;top:0;z-index:40;transform:translateX(-100%);transition:transform .2s;box-shadow:0 0 30px rgba(0,0,0,.2)}
.side.open{transform:none}.burger{display:flex}.wrap{padding:18px 16px 70px}}
@media (prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}
</style>
</head>
<body>
<div class="app">
<aside class="side" id="side">
  <div class="logo">
    <div class="wordmark">Petplan<sup>&reg;</sup></div>
    <div class="licence">Licencia: Petplan Ib&eacute;rica SL</div>
  </div>
  <nav class="nav">
    <a class="on" id="navAudit"><span class="ico i-y">&#9650;</span> Auditar</a>
    <a id="navGuide"><span class="ico i-g">&#9646;</span> Gu&iacute;a</a>
  </nav>
</aside>
<div class="main">
<div class="topbar">
<button class="burger" id="burger" type="button" aria-label="Menu"><i></i></button>
<span class="tbtitle" id="tbtitle">Auditar p&aacute;gina</span>
<span class="tbright"><button class="icobtn" id="theme" type="button" aria-label="Cambiar tema">&#9789;</button></span>
</div>

<div class="wrap">
<h1>Comprueba lo que ve Google</h1>
<p class="lede">Auditoria on-page completa de cualquier URL, mas la comprobacion que casi nadie hace:
si esa pagina sirve a Google algo distinto de lo que ves tu.</p>

<div class="card"><div class="pad">
<form id="f">
<div class="inputwrap">
<span class="scheme">https://</span>
<input id="u" type="text" placeholder="petplan.es" autocomplete="off" spellcheck="false" aria-label="URL a auditar">
</div>
<button id="go" type="submit">Auditar</button>
</form>
<p class="hint">No se guarda nada. Cada analisis descarga la pagina dos veces &mdash; una como navegador y otra como Googlebot &mdash; y las compara.</p>
</div></div>

<div class="card guide" id="guide" style="display:none">
<h2>C&oacute;mo funciona</h2>
<div class="pad">
<ol>
<li><b class="num">1</b><p><strong>Descarga la p&aacute;gina dos veces.</strong> Una con la identidad de un navegador normal y otra con la de Googlebot, desde el mismo servidor.</p></li>
<li><b class="num">2</b><p><strong>Compara las dos copias.</strong> T&iacute;tulo, meta description y tama&ntilde;o del texto. Si no coinciden, la p&aacute;gina hace cloaking: ense&ntilde;a a Google algo que t&uacute; no ves al visitarla.</p></li>
<li><b class="num">3</b><p><strong>Audita el resto.</strong> Canonical, hreflang, Open Graph, encabezados, texto alternativo, datos estructurados, robots.txt, rastreadores de IA y densidad de t&eacute;rminos.</p></li>
</ol>
<div class="callout">Funciona con cualquier dominio, tambi&eacute;n el de la competencia. No hace falta acceso al sitio ni cuenta de ning&uacute;n tipo.</div>
</div></div>

<div id="out"></div>

<div class="foot"><span>SEO Lens &middot; Petplan Iberica</span><span id="stamp"></span></div>
</div>
</div>
</div>

<button class="help" id="help" type="button">&#9679; Ayuda</button>

<script>
const out=document.getElementById('out');
const form=document.getElementById('f');
const input=document.getElementById('u');
const go=document.getElementById('go');
let findings=[];

const guide=document.getElementById('guide');
document.getElementById('burger').addEventListener('click',()=>{document.getElementById('side').classList.toggle('open')});
document.getElementById('theme').addEventListener('click',()=>{
  const r=document.documentElement;
  const dark=r.getAttribute('data-theme')==='dark'||(!r.getAttribute('data-theme')&&matchMedia('(prefers-color-scheme:dark)').matches);
  r.setAttribute('data-theme',dark?'light':'dark');
  try{localStorage.setItem('seolens-theme',dark?'light':'dark')}catch(e){}
});
try{const t=localStorage.getItem('seolens-theme');if(t)document.documentElement.setAttribute('data-theme',t)}catch(e){}
function showGuide(on){
  guide.style.display=on?'':'none';
  document.getElementById('navGuide').classList.toggle('on',on);
  document.getElementById('navAudit').classList.toggle('on',!on);
  document.getElementById('tbtitle').textContent=on?'Guia':'Auditar pagina';
  document.getElementById('side').classList.remove('open');
}
document.getElementById('navGuide').addEventListener('click',()=>showGuide(true));
document.getElementById('navAudit').addEventListener('click',()=>showGuide(false));
document.getElementById('help').addEventListener('click',()=>showGuide(true));


function el(t,c,x){const n=document.createElement(t);if(c)n.className=c;
if(x!==undefined&&x!==null)n.textContent=String(x);return n}
function card(t){const s=el('div','card');if(t)s.appendChild(el('h2',null,t));return s}
function row(p,status,label,val,note){
  findings.push({status});
  const r=el('div','row s-'+status);
  const mark={pass:'\\u2713',warn:'!',critical:'!',info:'i'}[status]||'';
  r.appendChild(el('i','badge',mark));
  r.appendChild(el('div','label',label));
  r.appendChild(el('div','val',val==null?'':val));
  if(note)r.appendChild(el('div','note',note));
  p.appendChild(r);return r;
}
function n(s){return findings.filter(f=>f.status===s).length}
function tile(parent,kind,num,key){
  const t=el('div','tile'+(kind?' t-'+kind:''));
  t.appendChild(el('div','n',num));
  t.appendChild(el('div','k',key));
  parent.appendChild(t);
}

form.addEventListener('submit',async e=>{
  e.preventDefault();
  const url=input.value.trim();
  if(!url)return;
  showGuide(false);
  findings=[];
  go.disabled=true;go.textContent='Auditando';
  out.textContent='';
  const m=el('div','msg');
  m.appendChild(el('span','spin'));
  m.appendChild(document.createTextNode('Descargando '+url+' como navegador y como Googlebot\\u2026'));
  out.appendChild(m);
  let data;
  try{
    const r=await fetch('/api/audit?url='+encodeURIComponent(url));
    data=await r.json();
  }catch(err){
    out.textContent='';
    out.appendChild(el('div','msg','Fallo la peticion: '+err.message));
    go.disabled=false;go.textContent='Auditar';return;
  }
  out.textContent='';
  if(!data.ok){
    out.appendChild(el('div','msg',data.error||'La auditoria fallo.'));
    go.disabled=false;go.textContent='Auditar';return;
  }
  render(data);
  go.disabled=false;go.textContent='Auditar';
  document.getElementById('stamp').textContent='ultimo analisis '+new Date().toLocaleString();
  loadCwv(url);
});

function render(d){
  const p=d.page,c=d.cloaking,rb=d.robots;
  const body=el('div');

  const si=card('Integridad');
  let cloaked=false;
  if(c&&c.error){
    row(si,'info','Comprobacion de cloaking no disponible','',c.error);
  }else if(c&&c.suspicious){
    cloaked=true;
    const r=row(si,'critical','Posible cloaking','',
      'Esta URL devuelve contenido distinto a Googlebot que a un navegador. Asi es como el spam inyectado permanece invisible para el propietario del sitio.');
    const dd=el('div','diff');
    const a=el('div');a.appendChild(el('span',null,'Lo que ves tu'));
    a.appendChild(document.createTextNode(c.asBrowser.title||'(sin titulo)'));
    const b=el('div');b.appendChild(el('span',null,'Lo que ve Google'));
    b.appendChild(document.createTextNode(c.asGooglebot.title||'(sin titulo)'));
    dd.appendChild(a);dd.appendChild(b);r.appendChild(dd);
  }else if(c){
    row(si,'pass','Sin cloaking','identico',
      'Googlebot y un navegador reciben el mismo titulo, descripcion y tamano de pagina.');
  }
  if(c&&c.botSpam&&c.botSpam.length){
    cloaked=true;
    row(si,'critical','Terminos de spam servidos a Googlebot',c.botSpam.map(h=>h.term).join(', '),
      'Palabras de farmacia, casino o contenido adulto en la copia del rastreador casi siempre indican que el sitio esta comprometido.');
  }
  const sh=p.securityHeaders||{};
  const missing=['strict-transport-security','x-content-type-options','referrer-policy'].filter(h=>!sh[h]);
  row(si,missing.length?'warn':'pass','Cabeceras de seguridad',
    missing.length?missing.length+'/3 ausentes':'todas presentes',missing.join(', '));
  if(sh['x-powered-by'])row(si,'warn','Version del servidor expuesta',sh['x-powered-by'],
    'Revela detalles del stack que ayudan a un atacante a buscar vulnerabilidades conocidas.');

  const sm=card('Cabecera y meta');
  row(sm,p.titleLength===0?'critical':(p.titleLength<30||p.titleLength>65)?'warn':'pass',
    'Title',p.titleLength+' caracteres',p.title||'(ausente)');
  row(sm,p.descriptionLength===0?'warn':(p.descriptionLength<120||p.descriptionLength>160)?'warn':'pass',
    'Meta description',p.descriptionLength+' caracteres',p.description||'(ausente)');
  row(sm,p.canonical?(p.canonicalSelf?'pass':'warn'):'warn','Canonical',
    p.canonical?(p.canonicalSelf?'autorreferencial':'apunta a otra'):'ninguna',p.canonical||'Sin etiqueta canonical.');
  row(sm,'info','Meta robots',p.robots||'por defecto');
  if(p.hreflangs.length)row(sm,p.hasXDefault?'pass':'warn','Hreflang',p.hreflangs.length+' idiomas',
    p.hreflangs.join(', ')+(p.hasXDefault?'':' \\u2014 sin x-default, asi que Google elige por los usuarios fuera de estos idiomas.'));
  row(sm,p.og.image?'pass':'warn','Imagen Open Graph',p.og.image?'definida':'ausente',
    p.og.image||'Al compartir en LinkedIn, WhatsApp o Facebook no aparece imagen.');
  row(sm,p.htmlLang?'pass':'warn','HTML lang',p.htmlLang||'sin definir');
  row(sm,p.viewport?'pass':'critical','Viewport',p.viewport?'definido':'ausente');

  const sc=card('Contenido');
  row(sc,p.h1s.length===1?'pass':'warn','H1',p.h1s.length,p.h1s[0]||'(ninguno)');
  row(sc,'info','Estructura de encabezados','',Object.entries(p.headings).filter(([,v])=>v)
    .map(([t,v])=>t.toUpperCase()+': '+v).join('  \\u00b7  '));
  row(sc,p.wordCount<300?'warn':'pass','Numero de palabras',p.wordCount,
    p.wordCount<300?'Escaso para una pagina que deba posicionar.':'');
  if(p.language.bothLanguages)row(sc,'warn','Dos idiomas en la misma pagina','',
    'Hay texto en espanol y en ingles en esta URL \\u2014 normalmente una capa de traduccion aplicada a medias.');
  row(sc,'info','Plataforma',p.cms);
  if(p.analytics.length)row(sc,'info','Analitica',p.analytics.length,p.analytics.join(', '));

  const sg=card('Imagenes');
  const i=p.images;
  const undesc=i.missingAltAttr+i.emptyAlt;
  row(sg,i.total===0?'info':(undesc>i.total/2?'warn':'pass'),'Texto alternativo',
    i.meaningfulAlt+' de '+i.total+' descritas',
    i.emptyAlt?(i.emptyAlt+' llevan alt="" (valido solo para imagenes decorativas) y '+i.missingAltAttr+' no tienen alt.')
      :(i.missingAltAttr?i.missingAltAttr+' imagenes sin atributo alt.':''));
  row(sg,p.legacyFormats>p.modernFormats?'warn':'pass','Formatos',
    p.modernFormats+' modernos / '+p.legacyFormats+' antiguos',
    Object.entries(i.formats).map(([f,v])=>f+': '+v).join('  \\u00b7  '));

  const sl=card('Enlaces y datos estructurados');
  row(sl,'info','Enlaces',p.links.total,
    p.links.internal+' internos  \\u00b7  '+p.links.external+' externos  \\u00b7  '+p.links.nofollow+' nofollow');
  row(sl,p.schemaTypes.length?'pass':'warn','Datos estructurados',
    p.schemaTypes.length?p.schemaTypes.length+' tipos':'ninguno',
    p.schemaTypes.join(', ')||'No se encontro JSON-LD.');

  const ss=card('Senales del sitio');
  if(rb&&rb.reachable){
    row(ss,'pass','robots.txt','accesible');
    row(ss,rb.sitemaps.length?'pass':'warn','Sitemap declarado',rb.sitemaps.length,
      rb.sitemaps.join('   ')||'No hay sitemap declarado en robots.txt.');
    const blocked=Object.entries(rb.aiCrawlers).filter(([,v])=>v==='blocked');
    const total=Object.keys(rb.aiCrawlers).length;
    row(ss,blocked.length?'warn':'pass','Acceso de rastreadores de IA',
      (total-blocked.length)+' de '+total+' permitidos',
      blocked.length?'Bloqueados: '+blocked.map(([k])=>k).join(', ')
        :'ChatGPT, Claude, Perplexity y Google-Extended pueden acceder al sitio.');
  }else{
    row(ss,'warn','robots.txt','inaccesible',(rb&&(rb.error||('estado '+rb.status)))||'');
  }

  const v=el('div','verdict'+(cloaked?' bad':''));
  v.appendChild(el('div','vmark',cloaked?'!':'\\u2713'));
  const vt=el('div','vtext');
  vt.appendChild(el('p','vtitle',cloaked?'Esta pagina sirve a Google contenido distinto':'Sin cloaking'));
  vt.appendChild(el('p','vsub',p.host+'  \\u00b7  '+(p.cms!=='Unknown'?p.cms+'  \\u00b7  ':'')+p.wordCount+' palabras'));
  const pl=el('div','pills');
  pl.appendChild(el('span','pill p-crit',n('critical')+' criticos'));
  pl.appendChild(el('span','pill p-warn',n('warn')+' avisos'));
  pl.appendChild(el('span','pill p-good',n('pass')+' correctos'));
  v.appendChild(vt);v.appendChild(pl);
  out.appendChild(v);

  const tl=el('div','tiles');
  tile(tl,n('critical')?'crit':(n('warn')?'warn':'good'),n('critical')+n('warn'),'Puntos a corregir');
  tile(tl,i.total&&undesc>i.total/2?'warn':'',i.meaningfulAlt+'/'+i.total,'Imagenes descritas');
  tile(tl,p.legacyFormats>p.modernFormats?'warn':'',p.modernFormats+'/'+(p.modernFormats+p.legacyFormats),'Formatos modernos');
  tile(tl,'',p.schemaTypes.length,'Tipos de schema');
  out.appendChild(tl);

  body.appendChild(si);body.appendChild(sm);body.appendChild(sc);
  body.appendChild(sg);body.appendChild(sl);body.appendChild(ss);

  if(p.topKeywords.length){
    const sk=card('Terminos mas frecuentes');
    const t=el('table');
    const max=p.topKeywords[0].count||1;
    for(const k of p.topKeywords.slice(0,8)){
      const tr=el('tr');
      tr.appendChild(el('td','kw',k.word));
      const bt=el('td');const bar=el('div','bar');const fill=el('i');
      fill.style.width=Math.round((k.count/max)*100)+'%';
      bar.appendChild(fill);bt.appendChild(bar);tr.appendChild(bt);
      tr.appendChild(el('td','num',k.count+'  \\u00b7  '+k.density+'%'));
      t.appendChild(tr);
    }
    sk.appendChild(t);body.appendChild(sk);
  }

  out.appendChild(body);
}

function refreshPills(){
  const pl=document.querySelector('.pills');
  if(pl){
    pl.children[0].textContent=n('critical')+' criticos';
    pl.children[1].textContent=n('warn')+' avisos';
    pl.children[2].textContent=n('pass')+' correctos';
  }
  const t=document.querySelector('.tile .n');
  if(t)t.textContent=n('critical')+n('warn');
}

async function loadCwv(url){
  const sk=card('Velocidad (Core Web Vitals)');
  const holder=el('div');
  sk.appendChild(holder);
  const load=row(holder,'info','Midiendo','','Ejecutando Google PageSpeed Insights en movil. Tarda entre 15 y 40 segundos.');
  const badge=load.querySelector('.badge');
  if(badge)badge.replaceWith(el('span','spin'));
  out.appendChild(sk);
  let d;
  try{
    const r=await fetch('/api/cwv?url='+encodeURIComponent(url));
    d=await r.json();
  }catch(e){
    holder.textContent='';row(holder,'info','La medicion fallo','',e.message);return;
  }
  holder.textContent='';
  if(!d.ok){row(holder,'info','Medicion no disponible','',d.error||'');refreshPills();return;}
  const g=c=>c==='FAST'?'pass':(c==='AVERAGE'?'warn':'critical');
  if(d.score!=null)row(holder,d.score>=90?'pass':(d.score>=50?'warn':'critical'),
    'Puntuacion de rendimiento',d.score+' / 100','Ejecucion de laboratorio Lighthouse, movil.');
  if(d.field){
    if(d.field.lcp)row(holder,g(d.field.lcp.category),'LCP, usuarios reales',d.field.lcp.value.toFixed(2)+' s',
      'Largest Contentful Paint de visitantes reales de Chrome. Bueno por debajo de 2,5 s.');
    if(d.field.inp)row(holder,g(d.field.inp.category),'INP, usuarios reales',Math.round(d.field.inp.value)+' ms',
      'Interaction to Next Paint. Bueno por debajo de 200 ms.');
    if(d.field.cls)row(holder,g(d.field.cls.category),'CLS, usuarios reales',d.field.cls.value.toFixed(3),
      'Cumulative Layout Shift. Bueno por debajo de 0,1.');
  }else{
    row(holder,'info','Sin datos de usuarios reales','',
      'Google no tiene trafico de Chrome suficiente para esta URL, asi que solo hay datos de laboratorio.');
  }
  const L=d.lab||{};
  if(L.lcp!=null)row(holder,L.lcp<=2500?'pass':(L.lcp<=4000?'warn':'critical'),'LCP, laboratorio',(L.lcp/1000).toFixed(2)+' s');
  if(L.cls!=null)row(holder,L.cls<=0.1?'pass':(L.cls<=0.25?'warn':'critical'),'CLS, laboratorio',L.cls.toFixed(3));
  if(L.tbt!=null)row(holder,L.tbt<=200?'pass':(L.tbt<=600?'warn':'critical'),'Tiempo total de bloqueo',Math.round(L.tbt)+' ms');
  if(L.fcp!=null)row(holder,'info','First contentful paint',(L.fcp/1000).toFixed(2)+' s');
  refreshPills();
}

const q=new URLSearchParams(location.search).get('url');
if(q){input.value=q.replace(/^https?:\\/\\//,'');form.dispatchEvent(new Event('submit'));}
</script>
</body>
</html>`;
