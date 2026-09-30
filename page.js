export const PAGE = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>SEO Lens</title>
<meta name="description" content="Audit any page's on-page SEO, and check whether it shows Google something different from what you see.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700;12..96,800&family=Public+Sans:wght@400;500;600&display=swap">
<style>
:root{
--ground:#f6f4ef;--surface:#fff;--sunk:#efece4;--line:#e3ded3;--hair:#eeeae1;
--ink:#15201e;--muted:#5d6b67;--faint:#8d9995;
--accent:#0f6f63;--accent-ink:#fff;--accent-wash:#e6f1ef;
--good:#2f7d52;--good-wash:#e6f2ea;
--warn:#a9721b;--warn-wash:#f9efdc;
--crit:#ad342c;--crit-wash:#fbe8e6;
--r:14px;--rs:9px;
--shadow:0 1px 2px rgba(21,32,30,.05),0 8px 24px -12px rgba(21,32,30,.18);
--display:"Bricolage Grotesque",ui-sans-serif,system-ui,sans-serif;
--body:"Public Sans",ui-sans-serif,-apple-system,"Segoe UI",Roboto,sans-serif;
}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){
--ground:#0f1517;--surface:#171f22;--sunk:#1d2629;--line:#2a3438;--hair:#222c2f;
--ink:#e9efed;--muted:#a0adaa;--faint:#78857f;
--accent:#58bcac;--accent-ink:#06201d;--accent-wash:#14302c;
--good:#6fc890;--good-wash:#14301f;
--warn:#d9a559;--warn-wash:#302412;
--crit:#ec8b82;--crit-wash:#331b19;
--shadow:0 1px 2px rgba(0,0,0,.4),0 10px 30px -14px rgba(0,0,0,.7);
}}
:root[data-theme="dark"]{
--ground:#0f1517;--surface:#171f22;--sunk:#1d2629;--line:#2a3438;--hair:#222c2f;
--ink:#e9efed;--muted:#a0adaa;--faint:#78857f;
--accent:#58bcac;--accent-ink:#06201d;--accent-wash:#14302c;
--good:#6fc890;--good-wash:#14301f;
--warn:#d9a559;--warn-wash:#302412;
--crit:#ec8b82;--crit-wash:#331b19;
--shadow:0 1px 2px rgba(0,0,0,.4),0 10px 30px -14px rgba(0,0,0,.7);
}
*{box-sizing:border-box}
html,body{margin:0;padding:0}
body{background:var(--ground);color:var(--ink);font:16px/1.6 var(--body);
font-variant-numeric:tabular-nums;-webkit-font-smoothing:antialiased}
.wrap{max-width:900px;margin:0 auto;padding-block:52px 72px;padding-left:16px;padding-right:16px}

.eyebrow{display:inline-flex;align-items:center;gap:7px;padding:5px 12px;border-radius:999px;
background:var(--accent-wash);color:var(--accent);font-size:12px;font-weight:600;
letter-spacing:.07em;text-transform:uppercase}
.eyebrow b{width:6px;height:6px;border-radius:50%;background:var(--accent);display:block}
h1{font-family:var(--display);font-weight:800;font-size:clamp(34px,6vw,52px);
line-height:1.04;letter-spacing:-.035em;margin:18px 0 12px;text-wrap:balance}
h1 em{font-style:normal;color:var(--accent)}
.lede{margin:0 0 30px;font-size:18px;line-height:1.55;color:var(--muted);max-width:56ch}

.panel{background:var(--surface);border:1px solid var(--line);border-radius:var(--r);
box-shadow:var(--shadow);padding:18px}
form{display:flex;gap:10px;flex-wrap:wrap;align-items:stretch}
.inputwrap{flex:1 1 280px;min-width:0;display:flex;align-items:stretch;
border:1px solid var(--line);border-radius:var(--rs);background:var(--ground);overflow:hidden}
.inputwrap:focus-within{border-color:var(--accent);box-shadow:0 0 0 3px var(--accent-wash)}
.scheme{display:flex;align-items:center;padding:0 12px;font-size:14px;color:var(--faint);
background:var(--sunk);border-right:1px solid var(--line);white-space:nowrap}
input[type=text]{flex:1;min-width:0;padding:13px 14px;font:inherit;font-size:16px;
color:var(--ink);background:transparent;border:0;outline:none}
button{padding:13px 24px;font:inherit;font-family:var(--display);font-weight:700;font-size:15px;
letter-spacing:-.01em;cursor:pointer;color:var(--accent-ink);background:var(--accent);
border:0;border-radius:var(--rs);white-space:nowrap}
button:disabled{opacity:.6;cursor:default}
button:focus-visible{outline:2px solid var(--ink);outline-offset:2px}
.sub{margin:12px 2px 0;font-size:13.5px;color:var(--faint)}

.verdict{display:flex;align-items:center;gap:18px;flex-wrap:wrap;
margin:34px 0 18px;padding:20px 22px;border-radius:var(--r);
border:1px solid var(--line);background:var(--surface);box-shadow:var(--shadow)}
.verdict.ok{border-left:5px solid var(--good)}
.verdict.bad{border-left:5px solid var(--crit);background:var(--crit-wash)}
.vmark{width:46px;height:46px;flex:none;border-radius:50%;display:grid;place-items:center;
font-family:var(--display);font-weight:800;font-size:20px}
.verdict.ok .vmark{background:var(--good-wash);color:var(--good)}
.verdict.bad .vmark{background:var(--crit);color:#fff}
.vtext{flex:1;min-width:200px}
.vtitle{font-family:var(--display);font-weight:700;font-size:19px;letter-spacing:-.02em;margin:0 0 2px}
.verdict.bad .vtitle{color:var(--crit)}
.vsub{margin:0;font-size:14px;color:var(--muted)}
.pills{display:flex;gap:7px;flex-wrap:wrap}
.pill{padding:5px 12px;border-radius:999px;font-size:13px;font-weight:600}
.p-crit{color:var(--crit);background:var(--crit-wash)}
.p-warn{color:var(--warn);background:var(--warn-wash)}
.p-good{color:var(--good);background:var(--good-wash)}

.tiles{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:12px;margin-bottom:26px}
.tile{background:var(--surface);border:1px solid var(--line);border-radius:var(--r);padding:16px 18px}
.tile .n{font-family:var(--display);font-weight:700;font-size:28px;letter-spacing:-.03em;line-height:1.1}
.tile .k{margin-top:3px;font-size:12.5px;color:var(--faint);letter-spacing:.03em}
.tile.t-warn .n{color:var(--warn)}
.tile.t-crit .n{color:var(--crit)}
.tile.t-good .n{color:var(--good)}

section{background:var(--surface);border:1px solid var(--line);border-radius:var(--r);
margin-bottom:14px;overflow:hidden}
section>h2{margin:0;padding:14px 20px;font-family:var(--display);font-weight:700;font-size:13px;
letter-spacing:.09em;text-transform:uppercase;color:var(--muted);
background:var(--sunk);border-bottom:1px solid var(--hair)}
.row{display:grid;grid-template-columns:8px 1fr auto;gap:14px;align-items:baseline;
padding:14px 20px;border-bottom:1px solid var(--hair)}
.row:last-child{border-bottom:0}
.dot{width:8px;height:8px;border-radius:50%;align-self:center}
.s-pass .dot{background:var(--good)}
.s-warn .dot{background:var(--warn)}
.s-critical .dot{background:var(--crit)}
.s-info .dot{background:var(--faint)}
.s-critical{background:var(--crit-wash)}
.s-critical .label{color:var(--crit)}
.label{font-weight:600;letter-spacing:-.005em}
.val{font-size:14px;color:var(--faint);text-align:right;font-weight:500}
.note{grid-column:2/-1;margin-top:4px;font-size:14px;line-height:1.5;color:var(--muted);overflow-wrap:anywhere}

.diff{grid-column:1/-1;margin-top:14px;display:grid;gap:10px}
@media (min-width:620px){.diff{grid-template-columns:1fr 1fr}}
.diff div{padding:12px 14px;border-radius:var(--rs);background:var(--surface);
border:1px solid var(--line);font-size:14px;overflow-wrap:anywhere}
.diff div:last-child{border-color:var(--crit)}
.diff span{display:block;font-size:11px;font-weight:700;letter-spacing:.08em;
text-transform:uppercase;color:var(--faint);margin-bottom:5px}
.diff div:last-child span{color:var(--crit)}

table{width:100%;border-collapse:collapse;font-size:15px}
td{padding:11px 20px;border-bottom:1px solid var(--hair);vertical-align:middle}
tr:last-child td{border-bottom:0}
.kw{font-weight:600;width:34%}
.bar{width:100%;height:7px;border-radius:99px;background:var(--sunk);overflow:hidden}
.bar i{display:block;height:100%;background:var(--accent);border-radius:99px}
td.num{text-align:right;color:var(--faint);font-size:13.5px;width:22%;white-space:nowrap}

.msg{padding:16px 18px;border-radius:var(--r);background:var(--surface);
border:1px solid var(--line);color:var(--muted);margin-bottom:16px;font-size:15px}
.spin{display:inline-block;width:13px;height:13px;margin-right:9px;vertical-align:-2px;
border:2px solid var(--line);border-top-color:var(--accent);border-radius:50%;
animation:sp .7s linear infinite}
@keyframes sp{to{transform:rotate(360deg)}}
footer{margin-top:40px;padding-top:20px;border-top:1px solid var(--line);
font-size:13.5px;color:var(--faint);display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap}
@media (prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}
</style>
</head>
<body>
<div class="wrap">
<header>
<span class="eyebrow"><b></b> Free &middot; No signup</span>
<h1>See what Google sees<em>.</em></h1>
<p class="lede">A full on-page audit of any URL &mdash; plus the check almost nobody runs:
whether that page serves Google something different from what you see.</p>
</header>

<div class="panel">
<form id="f">
<div class="inputwrap">
<span class="scheme">https://</span>
<input id="u" type="text" placeholder="petplan.es" autocomplete="off" spellcheck="false" aria-label="URL to audit">
</div>
<button id="go" type="submit">Run audit</button>
</form>
<p class="sub">Nothing stored. Each run fetches the page twice &mdash; once as a browser, once as Googlebot &mdash; and compares them.</p>
</div>

<div id="out"></div>

<footer><span>SEO Lens &middot; built in-house</span><span id="stamp"></span></footer>
</div>

<script>
const out=document.getElementById('out');
const form=document.getElementById('f');
const input=document.getElementById('u');
const go=document.getElementById('go');
let findings=[];

function el(t,c,x){const n=document.createElement(t);if(c)n.className=c;
if(x!==undefined&&x!==null)n.textContent=String(x);return n}
function sec(t){const s=el('section');s.appendChild(el('h2',null,t));return s}
function row(p,status,label,val,note){
  findings.push({status});
  const r=el('div','row s-'+status);
  r.appendChild(el('i','dot'));
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
  findings=[];
  go.disabled=true;go.textContent='Auditing';
  out.textContent='';
  const m=el('div','msg');
  m.appendChild(el('span','spin'));
  m.appendChild(document.createTextNode('Fetching '+url+' as a browser and as Googlebot\\u2026'));
  out.appendChild(m);
  let data;
  try{
    const r=await fetch('/api/audit?url='+encodeURIComponent(url));
    data=await r.json();
  }catch(err){
    out.textContent='';
    out.appendChild(el('div','msg','Request failed: '+err.message));
    go.disabled=false;go.textContent='Run audit';return;
  }
  out.textContent='';
  if(!data.ok){
    out.appendChild(el('div','msg',data.error||'Audit failed.'));
    go.disabled=false;go.textContent='Run audit';return;
  }
  render(data);
  go.disabled=false;go.textContent='Run audit';
  document.getElementById('stamp').textContent=new Date().toLocaleString();
  loadCwv(url);
});

function render(d){
  const p=d.page,c=d.cloaking,rb=d.robots;
  const body=el('div');

  const si=sec('Integrity');
  let cloaked=false;
  if(c&&c.error){
    row(si,'info','Cloaking check unavailable','',c.error);
  }else if(c&&c.suspicious){
    cloaked=true;
    const r=row(si,'critical','Possible cloaking','',
      'This URL returns different content to Googlebot than to a browser. That is how injected spam stays invisible to the site owner.');
    const dd=el('div','diff');
    const a=el('div');a.appendChild(el('span',null,'What you see'));
    a.appendChild(document.createTextNode(c.asBrowser.title||'(no title)'));
    const b=el('div');b.appendChild(el('span',null,'What Google sees'));
    b.appendChild(document.createTextNode(c.asGooglebot.title||'(no title)'));
    dd.appendChild(a);dd.appendChild(b);r.appendChild(dd);
  }else if(c){
    row(si,'pass','No cloaking detected','identical',
      'Googlebot and a browser receive matching title, description and page size.');
  }
  if(c&&c.botSpam&&c.botSpam.length){
    cloaked=true;
    row(si,'critical','Spam terms served to Googlebot',c.botSpam.map(h=>h.term).join(', '),
      'Pharmacy, casino or adult keywords in the crawler copy almost always mean the site is compromised.');
  }
  const sh=p.securityHeaders||{};
  const missing=['strict-transport-security','x-content-type-options','referrer-policy'].filter(h=>!sh[h]);
  row(si,missing.length?'warn':'pass','Security headers',
    missing.length?missing.length+'/3 missing':'all present',missing.join(', '));
  if(sh['x-powered-by'])row(si,'warn','Server version disclosed',sh['x-powered-by'],
    'Reveals stack details that help an attacker target known vulnerabilities.');

  const sm=sec('Head & meta');
  row(sm,p.titleLength===0?'critical':(p.titleLength<30||p.titleLength>65)?'warn':'pass',
    'Title',p.titleLength+' chars',p.title||'(missing)');
  row(sm,p.descriptionLength===0?'warn':(p.descriptionLength<120||p.descriptionLength>160)?'warn':'pass',
    'Meta description',p.descriptionLength+' chars',p.description||'(missing)');
  row(sm,p.canonical?(p.canonicalSelf?'pass':'warn'):'warn','Canonical',
    p.canonical?(p.canonicalSelf?'self-referential':'points away'):'none',p.canonical||'No canonical tag.');
  row(sm,'info','Meta robots',p.robots||'default');
  if(p.hreflangs.length)row(sm,p.hasXDefault?'pass':'warn','Hreflang',p.hreflangs.length+' locales',
    p.hreflangs.join(', ')+(p.hasXDefault?'':' \\u2014 no x-default fallback, so Google picks for users outside these locales.'));
  row(sm,p.og.image?'pass':'warn','Open Graph image',p.og.image?'set':'missing',
    p.og.image||'Shares on LinkedIn, WhatsApp and Facebook render without an image.');
  row(sm,p.htmlLang?'pass':'warn','HTML lang',p.htmlLang||'not set');
  row(sm,p.viewport?'pass':'critical','Viewport',p.viewport?'set':'missing');

  const sc=sec('Content');
  row(sc,p.h1s.length===1?'pass':'warn','H1',p.h1s.length+' found',p.h1s[0]||'(none)');
  row(sc,'info','Heading outline','',Object.entries(p.headings).filter(([,v])=>v)
    .map(([t,v])=>t.toUpperCase()+': '+v).join('  \\u00b7  '));
  row(sc,p.wordCount<300?'warn':'pass','Word count',p.wordCount,
    p.wordCount<300?'Thin for a page meant to rank.':'');
  if(p.language.bothLanguages)row(sc,'warn','Mixed languages on one page','',
    'Substantial Spanish and English text share this URL \\u2014 usually a translation layer that only partly applied.');
  row(sc,'info','Platform',p.cms);
  if(p.analytics.length)row(sc,'info','Analytics',p.analytics.length,p.analytics.join(', '));

  const sg=sec('Images');
  const i=p.images;
  const undesc=i.missingAltAttr+i.emptyAlt;
  row(sg,i.total===0?'info':(undesc>i.total/2?'warn':'pass'),'Alt text',
    i.meaningfulAlt+' of '+i.total+' described',
    i.emptyAlt?(i.emptyAlt+' carry alt="" (valid only for decorative images) and '+i.missingAltAttr+' have no alt at all.')
      :(i.missingAltAttr?i.missingAltAttr+' images have no alt attribute.':''));
  row(sg,p.legacyFormats>p.modernFormats?'warn':'pass','Image formats',
    p.modernFormats+' modern / '+p.legacyFormats+' legacy',
    Object.entries(i.formats).map(([f,v])=>f+': '+v).join('  \\u00b7  '));

  const sl=sec('Links & structured data');
  row(sl,'info','Links',p.links.total,
    p.links.internal+' internal  \\u00b7  '+p.links.external+' external  \\u00b7  '+p.links.nofollow+' nofollow');
  row(sl,p.schemaTypes.length?'pass':'warn','Structured data',
    p.schemaTypes.length?p.schemaTypes.length+' types':'none',
    p.schemaTypes.join(', ')||'No JSON-LD found.');

  const ss=sec('Site signals');
  if(rb&&rb.reachable){
    row(ss,'pass','robots.txt','reachable');
    row(ss,rb.sitemaps.length?'pass':'warn','Sitemap declared',rb.sitemaps.length,
      rb.sitemaps.join('   ')||'No sitemap declared in robots.txt.');
    const blocked=Object.entries(rb.aiCrawlers).filter(([,v])=>v==='blocked');
    const total=Object.keys(rb.aiCrawlers).length;
    row(ss,blocked.length?'warn':'pass','AI crawler access',
      (total-blocked.length)+' of '+total+' allowed',
      blocked.length?'Blocked: '+blocked.map(([k])=>k).join(', ')
        :'ChatGPT, Claude, Perplexity and Google-Extended can all reach this site.');
  }else{
    row(ss,'warn','robots.txt','unreachable',(rb&&(rb.error||('status '+rb.status)))||'');
  }

  const v=el('div','verdict '+(cloaked?'bad':'ok'));
  v.appendChild(el('div','vmark',cloaked?'!':'\\u2713'));
  const vt=el('div','vtext');
  vt.appendChild(el('p','vtitle',cloaked?'This page serves Google different content':'No cloaking detected'));
  vt.appendChild(el('p','vsub',p.host+'  \\u00b7  '+(p.cms!=='Unknown'?p.cms+'  \\u00b7  ':'')+p.wordCount+' words'));
  const pl=el('div','pills');
  pl.appendChild(el('span','pill p-crit',n('critical')+' critical'));
  pl.appendChild(el('span','pill p-warn',n('warn')+' warnings'));
  pl.appendChild(el('span','pill p-good',n('pass')+' pass'));
  v.appendChild(vt);v.appendChild(pl);
  out.appendChild(v);

  const tl=el('div','tiles');
  tile(tl,n('critical')?'crit':(n('warn')?'warn':'good'),n('critical')+n('warn'),'Issues to fix');
  tile(tl,i.total&&undesc>i.total/2?'warn':'',i.meaningfulAlt+'/'+i.total,'Images described');
  tile(tl,p.legacyFormats>p.modernFormats?'warn':'',p.modernFormats+'/'+(p.modernFormats+p.legacyFormats),'Modern formats');
  tile(tl,'',p.schemaTypes.length,'Schema types');
  out.appendChild(tl);

  body.appendChild(si);body.appendChild(sm);body.appendChild(sc);
  body.appendChild(sg);body.appendChild(sl);body.appendChild(ss);

  if(p.topKeywords.length){
    const sk=sec('Top terms on this page');
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
    pl.children[0].textContent=n('critical')+' critical';
    pl.children[1].textContent=n('warn')+' warnings';
    pl.children[2].textContent=n('pass')+' pass';
  }
  const t=document.querySelector('.tile .n');
  if(t)t.textContent=n('critical')+n('warn');
}

async function loadCwv(url){
  const sk=sec('Speed (Core Web Vitals)');
  const holder=el('div');
  sk.appendChild(holder);
  const load=row(holder,'info','Measuring','','Running Google PageSpeed Insights on mobile. Takes 15 to 40 seconds.');
  const dot=load.querySelector('.dot');
  if(dot)dot.replaceWith(el('span','spin'));
  out.appendChild(sk);
  let d;
  try{
    const r=await fetch('/api/cwv?url='+encodeURIComponent(url));
    d=await r.json();
  }catch(e){
    holder.textContent='';row(holder,'info','Speed check failed','',e.message);return;
  }
  holder.textContent='';
  if(!d.ok){row(holder,'info','Speed check unavailable','',d.error||'');refreshPills();return;}
  const g=c=>c==='FAST'?'pass':(c==='AVERAGE'?'warn':'critical');
  if(d.score!=null)row(holder,d.score>=90?'pass':(d.score>=50?'warn':'critical'),
    'Performance score',d.score+' / 100','Lighthouse lab run, mobile.');
  if(d.field){
    if(d.field.lcp)row(holder,g(d.field.lcp.category),'LCP, real users',d.field.lcp.value.toFixed(2)+' s',
      'Largest Contentful Paint across real Chrome visitors. Good is under 2.5 s.');
    if(d.field.inp)row(holder,g(d.field.inp.category),'INP, real users',Math.round(d.field.inp.value)+' ms',
      'Interaction to Next Paint. Good is under 200 ms.');
    if(d.field.cls)row(holder,g(d.field.cls.category),'CLS, real users',d.field.cls.value.toFixed(3),
      'Cumulative Layout Shift. Good is under 0.1.');
  }else{
    row(holder,'info','No real-user data','',
      'Google has not collected enough Chrome traffic for this URL, so only the lab run below is available.');
  }
  const L=d.lab||{};
  if(L.lcp!=null)row(holder,L.lcp<=2500?'pass':(L.lcp<=4000?'warn':'critical'),'LCP, lab',(L.lcp/1000).toFixed(2)+' s');
  if(L.cls!=null)row(holder,L.cls<=0.1?'pass':(L.cls<=0.25?'warn':'critical'),'CLS, lab',L.cls.toFixed(3));
  if(L.tbt!=null)row(holder,L.tbt<=200?'pass':(L.tbt<=600?'warn':'critical'),'Total blocking time',Math.round(L.tbt)+' ms');
  if(L.fcp!=null)row(holder,'info','First contentful paint',(L.fcp/1000).toFixed(2)+' s');
  refreshPills();
}

const q=new URLSearchParams(location.search).get('url');
if(q){input.value=q.replace(/^https?:\\/\\//,'');form.dispatchEvent(new Event('submit'));}
</script>
</body>
</html>`;
