export const PAGE = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>SEO Lens</title>
<meta name="description" content="Audit any page, and check whether it shows Google something different from what you see.">
<style>
:root{
--ground:#fbfaf7;--surface:#fff;--sunk:#f4f2ec;--line:#e4e1d8;--line-soft:#efece4;
--ink:#1b2225;--ink-soft:#5f6a66;--ink-faint:#8b948f;
--accent:#0f6f63;--accent-ink:#fff;
--good:#2c7a4f;--good-soft:#e4f1e8;
--warn:#9c6414;--warn-soft:#f8eedb;
--critical:#a92f28;--critical-soft:#fae7e5;
--radius:8px;
}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){
--ground:#14191b;--surface:#1b2124;--sunk:#202729;--line:#2d3538;--line-soft:#262d30;
--ink:#e8eceb;--ink-soft:#a3aeaa;--ink-faint:#7b8682;
--accent:#54b5a6;--accent-ink:#0d1a18;
--good:#6cc48c;--good-soft:#17301f;
--warn:#d6a052;--warn-soft:#332714;
--critical:#e8837a;--critical-soft:#341c1a;
}}
:root[data-theme="dark"]{
--ground:#14191b;--surface:#1b2124;--sunk:#202729;--line:#2d3538;--line-soft:#262d30;
--ink:#e8eceb;--ink-soft:#a3aeaa;--ink-faint:#7b8682;
--accent:#54b5a6;--accent-ink:#0d1a18;
--good:#6cc48c;--good-soft:#17301f;
--warn:#d6a052;--warn-soft:#332714;
--critical:#e8837a;--critical-soft:#341c1a;
}
*{box-sizing:border-box}
html,body{margin:0;padding:0}
body{background:var(--ground);color:var(--ink);
font:15px/1.6 ui-sans-serif,-apple-system,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
font-variant-numeric:tabular-nums;}
.wrap{max-width:860px;margin:0 auto;padding-block:40px 64px;padding-left:16px;padding-right:16px}
header h1{margin:0 0 6px;font-size:28px;letter-spacing:-0.02em;text-wrap:balance}
header p{margin:0 0 28px;color:var(--ink-soft);max-width:58ch}
form{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px}
input[type=url],input[type=text]{flex:1 1 260px;min-width:0;padding:11px 13px;
font:inherit;color:var(--ink);background:var(--surface);
border:1px solid var(--line);border-radius:var(--radius)}
input:focus-visible{outline:2px solid var(--accent);outline-offset:1px}
button{padding:11px 20px;font:inherit;font-weight:600;cursor:pointer;
color:var(--accent-ink);background:var(--accent);border:0;border-radius:var(--radius)}
button:disabled{opacity:.6;cursor:default}
button:focus-visible{outline:2px solid var(--ink);outline-offset:2px}
.hint{margin:0 0 28px;font-size:13px;color:var(--ink-faint)}
.tally{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:18px}
.chip{padding:4px 11px;font-size:13px;border-radius:999px}
.c-critical{color:var(--critical);background:var(--critical-soft)}
.c-warn{color:var(--warn);background:var(--warn-soft)}
.c-good{color:var(--good);background:var(--good-soft)}
section{background:var(--surface);border:1px solid var(--line);
border-radius:var(--radius);margin-bottom:16px;overflow:hidden}
section>h2{margin:0;padding:11px 16px;font-size:11px;font-weight:700;
letter-spacing:.08em;text-transform:uppercase;color:var(--ink-soft);
background:var(--sunk);border-bottom:1px solid var(--line-soft)}
.row{display:grid;grid-template-columns:10px 1fr auto;gap:12px;align-items:baseline;
padding:12px 16px;border-bottom:1px solid var(--line-soft)}
.row:last-child{border-bottom:0}
.dot{width:8px;height:8px;border-radius:50%;align-self:center}
.s-pass .dot{background:var(--good)}
.s-warn .dot{background:var(--warn)}
.s-critical .dot{background:var(--critical)}
.s-info .dot{background:var(--ink-faint)}
.s-critical{background:var(--critical-soft)}
.s-critical .label{color:var(--critical)}
.label{font-weight:600}
.val{font-size:13px;color:var(--ink-faint);text-align:right}
.note{grid-column:2/-1;margin-top:3px;font-size:13.5px;color:var(--ink-soft);overflow-wrap:anywhere}
.diff{grid-column:1/-1;margin-top:10px;display:grid;gap:6px}
.diff div{padding:9px 11px;border-radius:6px;background:var(--sunk);
font-size:13px;overflow-wrap:anywhere}
.diff span{display:block;font-size:10.5px;letter-spacing:.06em;text-transform:uppercase;
color:var(--ink-faint);margin-bottom:3px}
table{width:100%;border-collapse:collapse;font-size:14px}
td{padding:9px 16px;border-bottom:1px solid var(--line-soft)}
tr:last-child td{border-bottom:0}
td:last-child{text-align:right;color:var(--ink-faint)}
.kw{font-weight:600}
.msg{padding:14px 16px;border-radius:var(--radius);background:var(--sunk);
color:var(--ink-soft);margin-bottom:16px}
footer{margin-top:36px;padding-top:18px;border-top:1px solid var(--line);
font-size:13px;color:var(--ink-faint)}
@media (prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}
</style>
</head>
<body>
<div class="wrap">
<header>
<h1>SEO Lens</h1>
<p>Audit any page's on-page SEO &mdash; and check whether that page serves Google
something different from what you see. Paste a URL, yours or a competitor's.</p>
</header>

<form id="f">
<input id="u" type="text" placeholder="petplan.es" autocomplete="off" spellcheck="false" aria-label="URL to audit">
<button id="go" type="submit">Run audit</button>
</form>
<p class="hint">No account, nothing stored. Each run fetches the page twice &mdash; once as a browser, once as Googlebot.</p>

<div id="out"></div>

<footer>SEO Lens &middot; built in-house &middot; <span id="stamp"></span></footer>
</div>

<script>
const out = document.getElementById('out');
const form = document.getElementById('f');
const input = document.getElementById('u');
const go = document.getElementById('go');
let findings = [];

function el(t,c,x){const n=document.createElement(t);if(c)n.className=c;
if(x!==undefined&&x!==null)n.textContent=String(x);return n;}
function sec(t){const s=el('section');s.appendChild(el('h2',null,t));return s;}
function row(p,status,label,val,note){
  findings.push({status,label});
  const r=el('div','row s-'+status);
  r.appendChild(el('i','dot'));
  r.appendChild(el('div','label',label));
  r.appendChild(el('div','val',val==null?'':val));
  if(note)r.appendChild(el('div','note',note));
  p.appendChild(r);return r;
}
function tally(){
  const n=s=>findings.filter(f=>f.status===s).length;
  const d=el('div','tally');
  d.appendChild(el('span','chip c-critical',n('critical')+' critical'));
  d.appendChild(el('span','chip c-warn',n('warn')+' warnings'));
  d.appendChild(el('span','chip c-good',n('pass')+' pass'));
  return d;
}

form.addEventListener('submit',async e=>{
  e.preventDefault();
  const url=input.value.trim();
  if(!url)return;
  findings=[];
  go.disabled=true;go.textContent='Auditing\\u2026';
  out.textContent='';
  out.appendChild(el('div','msg','Fetching '+url+' as a browser and as Googlebot\\u2026'));
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
  document.getElementById('stamp').textContent='last run '+new Date().toLocaleString();
});

function render(d){
  const p=d.page, c=d.cloaking, rb=d.robots;
  const body=el('div');

  // Integrity first - it is the part that matters most and the part other tools skip.
  const si=sec('Integrity');
  if(c && c.error){
    row(si,'info','Cloaking check unavailable','',c.error);
  }else if(c && c.suspicious){
    const r=row(si,'critical','Possible cloaking','',
      'This URL returns different content to Googlebot than to a browser. That is how injected spam stays invisible to the site owner.');
    const dd=el('div','diff');
    const a=el('div');a.appendChild(el('span',null,'As a browser'));
    a.appendChild(document.createTextNode(c.asBrowser.title||'(no title)'));
    const b=el('div');b.appendChild(el('span',null,'As Googlebot'));
    b.appendChild(document.createTextNode(c.asGooglebot.title||'(no title)'));
    dd.appendChild(a);dd.appendChild(b);r.appendChild(dd);
  }else if(c){
    row(si,'pass','No cloaking detected','same content',
      'Googlebot and a browser receive matching title, description and page size.');
  }
  if(c && c.botSpam && c.botSpam.length){
    row(si,'critical','Spam terms served to Googlebot',
      c.botSpam.map(h=>h.term).join(', '),
      'Pharmacy, casino or adult keywords in the crawler copy almost always mean the site is compromised.');
  }
  const sh=p.securityHeaders||{};
  const missing=['strict-transport-security','x-content-type-options','referrer-policy'].filter(h=>!sh[h]);
  row(si,missing.length?'warn':'pass','Security headers',
    missing.length?missing.length+'/3 missing':'present',missing.join(', '));
  if(sh['x-powered-by'])row(si,'warn','Server version disclosed',sh['x-powered-by'],
    'Reveals stack details that help an attacker target known vulnerabilities.');
  body.appendChild(si);

  // Head & meta
  const sm=sec('Head & meta');
  row(sm,p.titleLength===0?'critical':(p.titleLength<30||p.titleLength>65)?'warn':'pass',
    'Title',p.titleLength+' chars',p.title||'(missing)');
  row(sm,p.descriptionLength===0?'warn':(p.descriptionLength<120||p.descriptionLength>160)?'warn':'pass',
    'Meta description',p.descriptionLength+' chars',p.description||'(missing)');
  row(sm,p.canonical?(p.canonicalSelf?'pass':'warn'):'warn','Canonical',
    p.canonical?(p.canonicalSelf?'self':'points away'):'none',p.canonical||'No canonical tag.');
  row(sm,'info','Meta robots',p.robots||'default (index, follow)');
  if(p.hreflangs.length)row(sm,p.hasXDefault?'pass':'warn','Hreflang',p.hreflangs.length+' tags',
    p.hreflangs.join(', ')+(p.hasXDefault?'':' \\u2014 no x-default fallback, so Google picks for users outside these locales.'));
  row(sm,p.og.image?'pass':'warn','Open Graph image',p.og.image?'set':'missing',
    p.og.image||'Shares on LinkedIn, WhatsApp and Facebook render without an image.');
  row(sm,p.htmlLang?'pass':'warn','HTML lang',p.htmlLang||'not set');
  row(sm,p.viewport?'pass':'critical','Viewport',p.viewport?'set':'missing');
  body.appendChild(sm);

  // Content
  const sc=sec('Content');
  row(sc,p.h1s.length===1?'pass':'warn','H1',p.h1s.length+' found',p.h1s[0]||'(none)');
  row(sc,'info','Heading outline','',Object.entries(p.headings).filter(([,n])=>n)
    .map(([t,n])=>t.toUpperCase()+': '+n).join(' \\u00b7 '));
  row(sc,p.wordCount<300?'warn':'pass','Word count',p.wordCount,
    p.wordCount<300?'Thin for a page meant to rank.':'');
  if(p.language.bothLanguages)row(sc,'warn','Mixed languages on one page','',
    'Substantial Spanish and English text share this URL \\u2014 usually a translation layer that only partly applied.');
  row(sc,'info','Platform',p.cms);
  if(p.analytics.length)row(sc,'info','Analytics',p.analytics.length,p.analytics.join(', '));
  body.appendChild(sc);

  // Images
  const sg=sec('Images');
  const i=p.images;
  const undescribed=i.missingAltAttr+i.emptyAlt;
  row(sg,i.total===0?'info':(undescribed>i.total/2?'warn':'pass'),'Alt text',
    i.meaningfulAlt+'/'+i.total+' described',
    i.emptyAlt?(i.emptyAlt+' have alt="" (valid only for decorative images) and '+i.missingAltAttr+' have no alt at all.')
      :(i.missingAltAttr?i.missingAltAttr+' images have no alt attribute.':''));
  row(sg,p.legacyFormats>p.modernFormats?'warn':'pass','Image formats',
    p.modernFormats+' modern / '+p.legacyFormats+' legacy',
    Object.entries(i.formats).map(([f,n])=>f+': '+n).join(' \\u00b7 '));
  body.appendChild(sg);

  // Links & schema
  const sl=sec('Links & structured data');
  row(sl,'info','Links',p.links.total,
    p.links.internal+' internal \\u00b7 '+p.links.external+' external \\u00b7 '+p.links.nofollow+' nofollow');
  row(sl,p.schemaTypes.length?'pass':'warn','Structured data',
    p.schemaTypes.length?p.schemaTypes.length+' types':'none',
    p.schemaTypes.join(', ')||'No JSON-LD found.');
  body.appendChild(sl);

  // Site signals
  const ss=sec('Site signals');
  if(rb && rb.reachable){
    row(ss,'pass','robots.txt','reachable');
    row(ss,rb.sitemaps.length?'pass':'warn','Sitemap declared',rb.sitemaps.length,
      rb.sitemaps.join('  ')||'No sitemap declared in robots.txt.');
    const blocked=Object.entries(rb.aiCrawlers).filter(([,v])=>v==='blocked');
    const total=Object.keys(rb.aiCrawlers).length;
    row(ss,blocked.length?'warn':'pass','AI crawler access',
      (total-blocked.length)+'/'+total+' allowed',
      blocked.length?'Blocked: '+blocked.map(([k])=>k).join(', ')
        :'ChatGPT, Claude, Perplexity and Google-Extended can all reach this site.');
  }else{
    row(ss,'warn','robots.txt','unreachable',(rb&&(rb.error||('status '+rb.status)))||'');
  }
  body.appendChild(ss);

  // Keywords
  if(p.topKeywords.length){
    const sk=sec('Top terms on this page');
    const t=el('table');
    for(const k of p.topKeywords.slice(0,8)){
      const tr=el('tr');
      tr.appendChild(el('td','kw',k.word));
      tr.appendChild(el('td',null,k.count+' \\u00b7 '+k.density+'%'));
      t.appendChild(tr);
    }
    sk.appendChild(t);body.appendChild(sk);
  }

  out.appendChild(tally());
  out.appendChild(body);
}

// Deep link: /?url=example.com runs immediately, so a report can be shared.
const q=new URLSearchParams(location.search).get('url');
if(q){input.value=q;form.dispatchEvent(new Event('submit'));}
</script>
</body>
</html>`;
