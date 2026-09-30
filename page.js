export const PAGE = `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>SEO Lens · Petplan</title>
<meta name="description" content="Audita cualquier URL y comprueba si esa página muestra a Google algo distinto de lo que ves tú.">
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

--logo:var(--pp-blue);
--radius:5px;
--shadow:0 1px 2px rgba(56,69,84,.06),0 3px 12px rgba(56,69,84,.07);
--font:Arial,"Helvetica Neue",Helvetica,sans-serif;
--font-display:"American Typewriter","Zilla Slab",Rockwell,"Roboto Slab","Bookman Old Style",Georgia,serif;
}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){
--surface-0:#0c1620;--surface-1:#13212e;--surface-2:#1a2c3c;--surface-3:#24384a;
--border:#23384a;--border-strong:#35506a;
--text-primary:#eaf2f7;--text-secondary:#b3c4d0;--text-muted:#8598a6;
--brand:#82bcf1;--brand-soft:#16293b;--logo:#ffffff;
--ok:#a5d45e;--ok-soft:#1d2c17;
--warn:#f79553;--warn-soft:#2c1f10;
--crit:#e8646a;--crit-soft:#2e1416;
--shadow:0 1px 2px rgba(0,0,0,.35),0 3px 12px rgba(0,0,0,.45);
}}
:root[data-theme="dark"]{
--surface-0:#0c1620;--surface-1:#13212e;--surface-2:#1a2c3c;--surface-3:#24384a;
--border:#23384a;--border-strong:#35506a;
--text-primary:#eaf2f7;--text-secondary:#b3c4d0;--text-muted:#8598a6;
--brand:#82bcf1;--brand-soft:#16293b;--logo:#ffffff;
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
display:flex;align-items:center;gap:14px;padding:0 18px;
padding-top:env(safe-area-inset-top,0px);box-sizing:content-box}

.lede{margin:0;color:var(--text-secondary);max-width:78ch;font-size:14.5px;line-height:1.5}
.pagebar{display:flex;align-items:center;gap:16px;min-height:44px;margin-bottom:16px}
.pagebar .lede{flex:1}
.ghost{flex:none;margin-left:auto;background:var(--surface-1);border:1px solid var(--border-strong);
border-radius:var(--radius);padding:10px 20px;font:inherit;font-size:14.25px;
color:var(--text-primary);cursor:pointer;white-space:nowrap}
.ghost:hover{background:var(--surface-2)}
.split{display:grid;grid-template-columns:minmax(0,1.35fr) minmax(0,1fr);gap:16px;
align-items:start;margin-bottom:16px}
@media (max-width:1040px){.split{grid-template-columns:1fr}}
.flash{animation:fl 1.1s ease-out}
@keyframes fl{0%,40%{box-shadow:0 0 0 3px var(--pp-yellow),var(--shadow)}100%{box-shadow:var(--shadow)}}

.card{background:var(--surface-1);border:1px solid var(--border);border-radius:var(--radius);
box-shadow:var(--shadow);margin-bottom:16px}
.card>h2{margin:0;padding:18px 20px 10px;font-family:var(--font-display);font-weight:400;
font-size:19.5px;color:var(--brand)}
.card .pad{padding:18px 20px}
.card>h2+.pad{padding-top:6px}

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
padding:12px 20px;border-bottom:1px solid var(--border)}
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
.logo{padding:20px 22px 16px}
.logo svg{display:block;width:152px;height:auto;color:var(--logo)}
.licence{margin-top:14px;font-size:11.5px;color:var(--text-muted)}
.nav{padding:4px 0}
.nav a{display:flex;align-items:center;gap:14px;padding:12px 22px;font-size:14.25px;text-decoration:none;
color:var(--text-primary);font-size:15px;border-left:3px solid transparent;cursor:pointer}
.nav a:hover{background:var(--surface-2)}
.nav a.on{background:var(--brand-soft);color:var(--pp-blue);font-weight:560;border-left-color:var(--pp-blue)}
.ico{width:19px;height:19px;flex:none;display:block}
.i-y{color:var(--pp-yellow)}.i-o{color:var(--pp-orange)}.i-g{color:var(--pp-green)}
.main{flex:1;min-width:0;display:flex;flex-direction:column}
.burger{display:grid;place-content:center;gap:4px;width:30px;height:30px;flex:none;
border:0;background:transparent;cursor:pointer;padding:0}
.burger span{display:block;width:30px;height:2px;background:#fff;border-radius:2px}
.tbtitle{margin:0;font-family:var(--font);font-size:12.6px;font-weight:500;
letter-spacing:.09em;text-transform:uppercase;color:#fff}
.tbright{margin-left:auto;display:flex;align-items:center;gap:8px}
.icobtn{width:32px;height:32px;border:0;background:transparent;color:rgba(255,255,255,.9);
cursor:pointer;border-radius:4px;padding:0;display:grid;place-items:center}
.icobtn:hover{background:rgba(255,255,255,.16);color:#fff}
.icobtn svg{display:block}
.acct{position:relative;display:flex}
.acctmenu{position:absolute;right:0;top:38px;min-width:212px;background:var(--surface-1);
border:1px solid var(--border);border-radius:var(--radius);box-shadow:0 8px 28px rgba(0,48,87,.18);
padding:6px;z-index:45}
.acctmenu[hidden]{display:none}
.acctmenu .who{padding:9px 12px 8px;border-bottom:1px solid var(--border);margin-bottom:4px}
.acctmenu .name{font-weight:bold;font-size:13.5px;color:var(--text-primary)}
.acctmenu .sub{display:block;font-size:12px;color:var(--text-muted);margin-top:2px}
.acctmenu .item{display:flex;align-items:center;gap:10px;width:100%;padding:9px 12px;border:0;
background:transparent;font:inherit;font-size:13.5px;color:var(--text-primary);cursor:pointer;
border-radius:4px;text-align:left}
.acctmenu .item:hover{background:var(--surface-2)}
.acctmenu .item svg{flex:none;color:var(--text-muted)}
.wrap{flex:1;min-width:0;padding:18px 22px 32px;width:100%;margin:0}
.guide ol{margin:0;padding-left:0;list-style:none}
.guide li{display:flex;gap:12px;padding:11px 0;border-bottom:1px solid var(--border)}
.guide li:last-child{border-bottom:0}
.guide li b.num{flex:none;width:22px;height:22px;border-radius:50%;background:var(--pp-blue);
color:#fff;display:grid;place-items:center;font-size:12px;font-weight:400}
.guide p{margin:0;font-size:14px;color:var(--text-secondary)}
.guide strong{color:var(--text-primary)}
.callout{margin-top:14px;padding:11px 14px;background:var(--ok-soft);border-radius:var(--radius);font-size:13.5px;color:var(--text-secondary)}
.help{position:fixed;right:20px;bottom:20px;z-index:30;display:flex;align-items:center;gap:8px;
padding:10px 16px;border:0;border-radius:999px;background:var(--pp-blue);color:#fff;
font:inherit;font-size:12.6px;cursor:pointer;box-shadow:0 6px 20px rgba(0,0,0,.22)}
.help svg{display:block}
.app.railoff .side{display:none}
.help:hover{background:var(--pp-blue-dark)}
@media (max-width:860px){
.side{position:fixed;left:0;top:0;z-index:40;transform:translateX(-100%);transition:transform .2s;box-shadow:0 0 30px rgba(0,0,0,.2)}
.side.open{transform:none}
.app.railoff .side{display:flex}
.wrap{padding:18px 16px 32px}
.pagebar{flex-wrap:wrap}.pagebar .ghost{width:100%}}
@media (prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}
.langs{display:flex;gap:2px;padding:2px;background:rgba(255,255,255,.14);
border:1px solid rgba(255,255,255,.28);border-radius:999px}
.lang{display:flex;align-items:center;gap:5px;height:22px;padding:0 10px;border:0;border-radius:999px;
background:transparent;color:rgba(255,255,255,.82);font:inherit;font-size:11.5px;font-weight:bold;
letter-spacing:.03em;cursor:pointer;line-height:1}
.lang:hover{color:#fff}
.lang.on{background:#fff;color:var(--pp-blue)}
.lang .flag{display:block;width:20px;height:14px;border-radius:2px;flex:none}
@media (max-width:520px){.lang .code{display:none}.lang{padding:0 7px}}
</style>
</head>
<body>
<div class="app" id="app">
<aside class="side" id="side">
  <div class="logo">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 725.25 215.92" role="img" aria-label="Petplan"><path fill="currentColor" fill-rule="nonzero" d="M 432.09 8.09 L 416.39 141.82 C 415.29 150.8 417.39 158.31 422.45 163.54 C 428.82 170.1 439.65 172.88 453.74 171.56 L 455.34 171.41 L 457.58 154.24 L 455.37 154.15 C 447.96 153.88 444.21 152.91 442.42 150.79 C 441 149.11 440.6 146.34 441.16 142.09 C 441.16 142.05 457.85 0.07 457.85 0.07 L 432.09 8.09 M 182.7 104.77 L 142.07 104.77 C 145.36 94.24 155.84 83.36 168.02 83.36 C 177.74 83.36 182.32 88.28 182.89 99.3 C 182.92 99.87 182.93 100.44 182.93 101.02 C 182.93 102.29 182.84 103.56 182.7 104.77 Z M 209.47 98.14 C 208.28 75.25 193.68 61.59 170.4 61.59 C 153.09 61.59 138.1 67.8 127.02 79.53 C 115.03 92.23 109.04 110 110.17 129.56 C 111.75 155.9 130.02 171.61 159.05 171.61 C 170.74 171.61 184.04 169.05 194.64 164.76 C 196.89 163.8 199.25 162.51 199.07 159.08 L 199.04 158.4 L 197.38 146.72 C 196.84 143.73 194.82 143.28 193.67 143.28 C 192.93 143.28 192.25 143.51 191.66 143.71 L 190.81 143.98 C 182.21 147.12 172.23 149 164.12 149 C 149.11 149 139.69 140.43 138.95 126.07 C 138.95 126.07 138.97 123.75 138.97 123.56 C 140.96 123.56 199.74 123.56 199.74 123.56 C 205.34 123.56 207.85 122.96 208.53 117.15 C 208.52 117.15 208.52 117.16 208.52 117.17 L 208.53 117.15 C 209.08 113.19 209.52 105.42 209.52 100.56 C 209.52 99.63 209.5 98.82 209.47 98.14 M 704.99 30.33 L 708.18 30.33 C 710.61 30.33 711.67 29.37 711.67 27.1 C 711.67 25.47 710.3 24.08 708.12 24.08 L 704.99 24.08 Z M 704.99 38.77 C 704.99 39.5 704.54 39.94 703.82 39.94 C 703.11 39.94 702.65 39.5 702.65 38.77 L 702.65 23.39 C 702.65 22.73 703.02 22.2 703.9 22.2 L 708.22 22.2 C 711.2 22.2 714.01 24.08 714.01 26.95 C 714.01 30.5 711.67 31.84 708.86 31.94 L 707.86 31.96 L 713.88 38.11 C 714.19 38.43 714.32 38.7 714.32 39.1 C 714.32 39.56 713.86 39.94 713.27 39.94 C 712.79 39.94 712.47 39.71 712.21 39.45 L 704.99 32.09 L 704.99 38.77 M 722.13 31.54 C 722.13 23.94 715.12 17.42 708 17.42 C 700.21 17.42 693.89 23.98 693.89 31.54 C 693.89 39.15 700.25 45.67 708 45.67 C 715.07 45.67 722.13 39.15 722.13 31.54 Z M 691.51 31.54 C 691.51 22.48 698.76 15.05 708 15.05 C 716.57 15.05 724.5 22.48 724.5 31.54 C 724.5 40.61 716.57 48.04 708 48.04 C 698.76 48.04 691.51 40.61 691.51 31.54 M 71.21 85.82 C 66.45 91.05 57.12 94.4 47.45 94.4 C 43.79 94.4 41.37 94.39 38.02 94.24 C 38.29 92.13 44.14 45.3 44.35 43.57 C 45.9 43.57 54.65 43.57 54.65 43.57 C 70.37 43.57 79.62 46.25 80.33 59.94 C 80.85 69.97 77.53 79.39 71.21 85.82 Z M 110.29 58.77 C 108.98 33.4 90.18 20.53 54.41 20.53 L 23.94 20.53 C 18.64 20.53 17.27 23.19 16.84 27.18 C 16.84 27.18 0.28 168.51 0.08 170.24 C 0.04 170.4 0.02 170.56 0 170.71 L 16.27 170.71 C 21.41 170.3 27.07 164.73 29.98 156.8 C 30.64 155.02 31.08 153.24 31.36 151.5 C 32.83 137.78 34.6 121.21 35.04 117.08 C 38.96 117.44 42.92 117.64 46.84 117.64 C 67.13 117.64 84.5 110.99 95.76 98.91 C 104.89 89.27 110.36 75.11 110.36 61.39 C 110.36 60.52 110.34 59.64 110.29 58.77 Z M 95.75 98.91 L 95.76 98.91 L 95.76 98.91 Z M 95.75 98.91 M 373.99 117.04 C 372.15 132.76 367.73 150.94 349.75 152.01 C 342.16 152.6 334.43 149.04 328.94 145.68 C 329.23 143.26 335.97 87.69 336.18 86 C 338.96 84.05 345.34 81.05 353.14 80.09 C 353.84 80 355.9 79.87 356.42 79.88 C 357.75 79.91 359.57 80.02 359.57 80.02 C 363.88 80.19 367.17 81.66 369.61 84.51 C 373.06 88.52 374.78 95.32 374.78 104.79 C 374.78 108.47 374.52 112.55 373.99 117.04 Z M 390.89 69.78 C 384.34 62.53 375.41 58.95 364.37 59.12 C 330.78 59.56 314.54 75.71 311.62 78.94 L 311.19 79.41 L 311.1 80.08 L 295.43 215.69 L 295.49 215.72 C 299.23 215.74 304.06 215.76 307.81 215.77 C 312.96 215.34 318.61 209.77 321.52 201.86 C 322.16 200.12 322.6 198.38 322.88 196.69 C 324.42 183.24 325.98 169.49 326.27 166.91 C 334.57 171.19 342.65 173.12 351.48 172.92 L 353.62 172.87 C 353.62 172.87 353.6 172.61 353.6 172.5 C 382.92 170.37 398.89 144 401.7 118.2 C 402.16 114.26 402.39 110.44 402.39 106.75 C 402.39 91.17 398.37 78.05 390.89 69.78 M 506.93 149.75 C 497.44 149.75 492.13 144.02 491.55 133.18 C 490.8 118.6 495.69 104.97 505.34 94.79 C 514.07 85.6 525.87 80.33 537.71 80.33 C 540.01 80.33 541.77 80.44 543.33 80.57 C 542.87 84.1 540.22 107.62 540.22 107.62 C 536.84 132.82 520.2 149.75 506.93 149.75 Z M 534.51 158 C 534.34 159.47 533.49 167.04 533.05 170.95 C 536.9 170.95 541.86 170.95 545.62 170.95 C 550.69 170.34 556.2 164.85 559.05 157.07 C 559.56 155.68 559.94 154.29 560.22 152.94 L 570.69 61.38 L 569.12 61.1 C 564.53 60.31 554.45 59 538.66 59 C 518.36 59 498.9 67.24 485.23 81.62 C 471.95 95.62 465.5 114 466.61 134.78 C 467.86 158.62 486.09 171.09 503.44 171.09 C 516.45 171.09 526.98 166.59 534.51 158 M 261.79 84 C 261.79 84 261.82 84 261.84 84 L 272.75 84 C 277.9 83.57 283.56 78.01 286.47 70.08 C 287.17 68.14 287.64 66.22 287.93 64.35 C 283.79 64.35 265.83 64.35 263.96 64.35 C 264.17 62.59 266.36 43.04 267.11 36.33 L 238.62 45.48 C 237.95 50.86 236.65 61.25 236.27 64.35 C 234.72 64.35 226.39 64.35 226.39 64.35 C 223.28 64.35 221.29 66.23 220.95 69.51 L 219.61 79.21 C 219.59 79.39 219.58 79.55 219.58 79.71 C 219.58 80.69 219.91 81.55 220.54 82.25 C 221.53 83.34 223.23 84 225.09 84 C 225.09 84 232.24 84 234.07 84 C 233.8 86.21 228.51 130.02 228.51 130.02 C 228.51 130.03 228.19 132.73 228.19 132.73 C 227.7 136.71 227.29 140.25 227.29 144.11 C 227.29 145.09 227.32 146.09 227.37 147.13 C 228.28 162.45 239.38 171.61 257.09 171.61 C 265.83 171.61 274.23 169.92 282.8 166.45 C 285.01 165.54 286.11 163.88 285.98 161.62 L 285.96 161.4 C 285.96 161.39 285.07 149.75 285.07 149.75 C 284.95 147.66 283.54 146.25 281.56 146.25 C 280.54 146.25 279.79 146.5 279.13 146.73 C 279.18 146.71 278.6 146.87 278.6 146.87 C 274.26 148.07 270.16 149.21 265.64 149.21 C 258.71 149.21 256.13 147.08 255.78 141.09 C 255.73 140.28 255.7 139.47 255.7 138.6 C 255.7 136.3 255.9 133.51 256.51 128.59 C 256.51 128.57 261.02 90.37 261.79 84 M 643.76 83.71 C 646.64 86.88 647.83 91.63 647.17 97.46 L 640.01 170.92 L 652.44 170.92 C 657.59 170.5 663.25 164.93 666.16 157.01 C 666.75 155.37 667.18 153.74 667.47 152.15 L 673.86 89.8 C 675.69 72.1 662.46 62.75 650.56 60.12 C 637.74 57.18 625.4 59.79 617.21 62 C 605.5 65.2 596.73 70.83 587.28 77.3 L 586.52 77.83 L 576.68 170.94 L 589.04 170.94 C 594.19 170.52 599.85 164.94 602.75 157.01 C 603.42 155.21 603.87 153.41 604.15 151.67 C 606.77 125.9 610.79 86.16 610.91 84.81 C 614.46 82.79 621.94 79.12 629.86 78.89 C 635.97 78.77 640.78 80.45 643.76 83.71"/></svg>
    <div class="licence" data-t="licence"></div>
  </div>
  <nav class="nav">
    <a class="on" id="navAudit"><svg class="ico i-y" viewBox="0 0 24 24" width="19" height="19" aria-hidden="true"><path fill="currentColor" d="M10 2a8 8 0 1 0 4.9 14.3l5.4 5.4 1.4-1.4-5.4-5.4A8 8 0 0 0 10 2zm0 2a6 6 0 1 1 0 12 6 6 0 0 1 0-12z"/></svg> <span data-t="navAudit"></span></a>
    <a id="navGuide"><svg class="ico i-g" viewBox="0 0 24 24" width="19" height="19" aria-hidden="true"><path fill="currentColor" d="M6 3h12a2 2 0 0 1 2 2v16l-8-4-8 4V5a2 2 0 0 1 2-2z"/></svg> <span data-t="navGuide"></span></a>
  </nav>
</aside>
<div class="main">
<div class="topbar">
<button class="burger" id="burger" type="button" data-ta="menu"><span></span><span></span><span></span></button>
<h1 class="tbtitle" id="tbtitle"></h1>
<span class="tbright">
<div class="langs" id="langs" role="group" aria-label="Idioma / Language">
<button class="lang on" type="button" data-lang="es" lang="es" title="Espa&ntilde;ol"><svg class="flag" viewBox="0 0 60 40" aria-hidden="true"><rect width="60" height="40" fill="#AA151B"/><rect y="10" width="60" height="20" fill="#F1BF00"/></svg><span class="code">ES</span></button>
<button class="lang" type="button" data-lang="en" lang="en" title="English"><svg class="flag" viewBox="0 0 60 30" aria-hidden="true"><rect width="60" height="30" fill="#012169"/><path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" stroke-width="6"/><path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" stroke-width="3"/><path d="M30,0 V30 M0,15 H60" stroke="#fff" stroke-width="10"/><path d="M30,0 V30 M0,15 H60" stroke="#C8102E" stroke-width="6"/></svg><span class="code">EN</span></button>
</div>
<button class="icobtn" id="theme" type="button" data-ta="theme"><svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M12 3a9 9 0 1 0 9 9 7 7 0 0 1-9-9z"/></svg></button>
<div class="acct">
<button class="icobtn" id="acct" type="button" aria-haspopup="true" aria-expanded="false" aria-controls="acctmenu" data-ta="account"><svg viewBox="0 0 24 24" width="19" height="19" aria-hidden="true"><path fill="currentColor" d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4zm0 2c-3.3 0-8 1.7-8 4.5V21h16v-2.5c0-2.8-4.7-4.5-8-4.5z"/></svg></button>
<div class="acctmenu" id="acctmenu" role="menu" hidden>
  <div class="who"><span class="name">Petplan Ib&eacute;rica SL</span><span class="sub" data-t="acctSub"></span></div>
  <button class="item" type="button" id="acctGuide" role="menuitem"><svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true"><path fill="currentColor" d="M6 3h12a2 2 0 0 1 2 2v16l-8-4-8 4V5a2 2 0 0 1 2-2z"/></svg><span data-t="navGuide"></span></button>
</div>
</div>
</span>
</div>

<main class="wrap">
<div class="pagebar">
  <p class="lede" data-t="lede"></p>
  <button class="ghost" type="button" id="guideBtn" data-t="navGuide"></button>
</div>

<div class="split">
  <div>
    <div class="card"><div class="pad">
      <form id="f">
        <div class="inputwrap">
          <span class="scheme">https://</span>
          <input id="u" type="text" placeholder="petplan.es" autocomplete="off" spellcheck="false" data-ta="urlField">
        </div>
        <button id="go" type="submit" data-t="btnAudit"></button>
      </form>
      <p class="hint" data-t="hint"></p>
    </div></div>
  </div>
  <div class="card guide" id="guide">
    <h2 data-t="guideTitle"></h2>
    <div class="pad">
      <ol>
        <li><b class="num">1</b><p><strong data-t="g1t"></strong> <span data-t="g1"></span></p></li>
        <li><b class="num">2</b><p><strong data-t="g2t"></strong> <span data-t="g2"></span></p></li>
        <li><b class="num">3</b><p><strong data-t="g3t"></strong> <span data-t="g3"></span></p></li>
      </ol>
      <div class="callout" data-t="callout"></div>
    </div>
  </div>
</div>

<div id="out"></div>

<div class="foot"><span>SEO Lens &middot; Petplan Ib&eacute;rica</span><span id="stamp"></span></div>
</main>
</div>
</div>

<button class="help" id="help" type="button"><svg viewBox="0 0 24 24" width="19" height="19" aria-hidden="true"><path fill="currentColor" d="M12 3C6.5 3 2 6.6 2 11c0 2.3 1.2 4.4 3.2 5.8V21l3.9-2.3c.9.2 1.9.3 2.9.3 5.5 0 10-3.6 10-8s-4.5-8-10-8z"/></svg><span data-t="help"></span></button>

<script>
const I18N={
es:{
licence:"Licencia: Petplan Ibérica SL",navAudit:"Auditar",navGuide:"Guía",
tbAudit:"Auditar página",tbGuide:"Guía",menu:"Menú",theme:"Cambiar tema",urlField:"URL a auditar",
h1:"Comprueba lo que ve Google",
lede:"Auditoría on-page completa de cualquier URL, más la comprobación que casi nadie hace: si esa página sirve a Google algo distinto de lo que ves tú.",
btnAudit:"Auditar",btnAuditing:"Auditando",
hint:"No se guarda nada. Cada análisis descarga la página dos veces — una como navegador y otra como Googlebot — y las compara.",
guideTitle:"Cómo funciona",help:"Ayuda",
g1t:"Descarga la página dos veces.",g1:"Una con la identidad de un navegador normal y otra con la de Googlebot, desde el mismo servidor.",
g2t:"Compara las dos copias.",g2:"Título, meta description y tamaño del texto. Si no coinciden, la página hace cloaking: enseña a Google algo que tú no ves al visitarla.",
g3t:"Audita el resto.",g3:"Canonical, hreflang, Open Graph, encabezados, texto alternativo, datos estructurados, robots.txt, rastreadores de IA y densidad de términos.",
callout:"Funciona con cualquier dominio, también el de la competencia. No hace falta acceso al sitio ni cuenta de ningún tipo.",
loading:"Descargando {url} como navegador y como Googlebot…",
reqFailed:"Falló la petición: {msg}",auditFailed:"La auditoría falló.",stamp:"último análisis {t}",
cIntegrity:"Integridad",cMeta:"Cabecera y meta",cContent:"Contenido",cImages:"Imágenes",
cLinks:"Enlaces y datos estructurados",cSite:"Señales del sitio",cKeywords:"Términos más frecuentes",
cSpeed:"Velocidad (Core Web Vitals)",
cloakNA:"Comprobación de cloaking no disponible",cloakYes:"Posible cloaking",
cloakYesNote:"Esta URL devuelve contenido distinto a Googlebot que a un navegador. Así es como el spam inyectado permanece invisible para el propietario del sitio.",
youSee:"Lo que ves tú",googleSees:"Lo que ve Google",noTitle:"(sin título)",
cloakNo:"Sin cloaking",identical:"idéntico",
cloakNoNote:"Googlebot y un navegador reciben el mismo título, descripción y tamaño de página.",
spamTerms:"Términos de spam servidos a Googlebot",
spamNote:"Palabras de farmacia, casino o contenido adulto en la copia del rastreador casi siempre indican que el sitio está comprometido.",
secHeaders:"Cabeceras de seguridad",missingN:"{n}/3 ausentes",allPresent:"todas presentes",
serverVersion:"Versión del servidor expuesta",
serverVersionNote:"Revela detalles del stack que ayudan a un atacante a buscar vulnerabilidades conocidas.",
rTitle:"Title",chars:"{n} caracteres",absent:"(ausente)",metaDesc:"Meta description",
canonical:"Canonical",canonSelf:"autorreferencial",canonOther:"apunta a otra",canonNone:"ninguna",
canonNoneNote:"Sin etiqueta canonical.",metaRobots:"Meta robots",byDefault:"por defecto",
hreflang:"Hreflang",nLangs:"{n} idiomas",
noXDefault:" — sin x-default, así que Google elige por los usuarios fuera de estos idiomas.",
ogImage:"Imagen Open Graph",ogSet:"definida",ogMissing:"ausente",
ogNote:"Al compartir en LinkedIn, WhatsApp o Facebook no aparece imagen.",
htmlLang:"HTML lang",notSet:"sin definir",viewport:"Viewport",vpSet:"definido",vpMissing:"ausente",
rH1:"H1",none:"(ninguno)",headingStructure:"Estructura de encabezados",
wordCount:"Número de palabras",thinNote:"Escaso para una página que deba posicionar.",
twoLangs:"Dos idiomas en la misma página",
twoLangsNote:"Hay texto en español y en inglés en esta URL — normalmente una capa de traducción aplicada a medias.",
platform:"Plataforma",analytics:"Analítica",
altText:"Texto alternativo",describedOf:"{a} de {b} descritas",
altNote1:"{e} llevan alt=\\"\\" (válido sólo para imágenes decorativas) y {m} no tienen alt.",
altNote2:"{m} imágenes sin atributo alt.",
formats:"Formatos",modernLegacy:"{m} modernos / {l} antiguos",
links:"Enlaces",linksNote:"{i} internos  ·  {e} externos  ·  {n} nofollow",
structured:"Datos estructurados",nTypes:"{n} tipos",noJsonLd:"No se encontró JSON-LD.",
robotsTxt:"robots.txt",reachable:"accesible",unreachable:"inaccesible",statusN:"estado {n}",
sitemapDeclared:"Sitemap declarado",noSitemap:"No hay sitemap declarado en robots.txt.",
aiCrawlers:"Acceso de rastreadores de IA",allowedOf:"{a} de {b} permitidos",blockedList:"Bloqueados: {list}",
aiOk:"ChatGPT, Claude, Perplexity y Google-Extended pueden acceder al sitio.",
verdictBad:"Esta página sirve a Google contenido distinto",verdictGood:"Sin cloaking",
words:"{n} palabras",pillCrit:"{n} críticos",pillWarn:"{n} avisos",pillPass:"{n} correctos",
tileFix:"Puntos a corregir",tileAlt:"Imágenes descritas",tileFormats:"Formatos modernos",tileSchema:"Tipos de schema",
measuring:"Midiendo",measuringNote:"Ejecutando Google PageSpeed Insights en móvil. Tarda entre 15 y 40 segundos.",
measureFailed:"La medición falló",measureNA:"Medición no disponible",
perfScore:"Puntuación de rendimiento",labNote:"Ejecución de laboratorio Lighthouse, móvil.",
lcpField:"LCP, usuarios reales",lcpNote:"Largest Contentful Paint de visitantes reales de Chrome. Bueno por debajo de 2,5 s.",
inpField:"INP, usuarios reales",inpNote:"Interaction to Next Paint. Bueno por debajo de 200 ms.",
clsField:"CLS, usuarios reales",clsNote:"Cumulative Layout Shift. Bueno por debajo de 0,1.",
noFieldData:"Sin datos de usuarios reales",
noFieldNote:"Google no tiene tráfico de Chrome suficiente para esta URL, así que sólo hay datos de laboratorio.",
lcpLab:"LCP, laboratorio",clsLab:"CLS, laboratorio",tbt:"Tiempo total de bloqueo",fcp:"First contentful paint",
zero:"ninguno",docTitle:"SEO Lens · Auditoría · Petplan",
account:"Cuenta",acctSub:"SEO Lens · auditoría on-page"
},
en:{
licence:"Licence: Petplan Ibérica SL",navAudit:"Audit",navGuide:"Guide",
tbAudit:"Audit page",tbGuide:"Guide",menu:"Menu",theme:"Toggle theme",urlField:"URL to audit",
h1:"See what Google sees",
lede:"A full on-page audit of any URL, plus the check almost nobody runs: whether that page serves Google something different from what you see.",
btnAudit:"Audit",btnAuditing:"Auditing",
hint:"Nothing is stored. Each analysis downloads the page twice — once as a browser, once as Googlebot — and compares them.",
guideTitle:"How it works",help:"Help",
g1t:"Downloads the page twice.",g1:"Once identifying as an ordinary browser and once as Googlebot, from the same server.",
g2t:"Compares the two copies.",g2:"Title, meta description and text size. If they do not match, the page is cloaking: showing Google something you do not see when you visit it.",
g3t:"Audits everything else.",g3:"Canonical, hreflang, Open Graph, headings, alt text, structured data, robots.txt, AI crawlers and term density.",
callout:"Works on any domain, competitors included. It needs no access to the site and no account of any kind.",
loading:"Downloading {url} as a browser and as Googlebot…",
reqFailed:"Request failed: {msg}",auditFailed:"The audit failed.",stamp:"last analysis {t}",
cIntegrity:"Integrity",cMeta:"Head and meta",cContent:"Content",cImages:"Images",
cLinks:"Links and structured data",cSite:"Site signals",cKeywords:"Most frequent terms",
cSpeed:"Speed (Core Web Vitals)",
cloakNA:"Cloaking check unavailable",cloakYes:"Possible cloaking",
cloakYesNote:"This URL returns different content to Googlebot than to a browser. This is how injected spam stays invisible to the site owner.",
youSee:"What you see",googleSees:"What Google sees",noTitle:"(no title)",
cloakNo:"No cloaking",identical:"identical",
cloakNoNote:"Googlebot and a browser receive the same title, description and page size.",
spamTerms:"Spam terms served to Googlebot",
spamNote:"Pharmacy, casino or adult terms in the crawler's copy almost always mean the site is compromised.",
secHeaders:"Security headers",missingN:"{n}/3 missing",allPresent:"all present",
serverVersion:"Server version exposed",
serverVersionNote:"Reveals stack details that help an attacker look for known vulnerabilities.",
rTitle:"Title",chars:"{n} characters",absent:"(absent)",metaDesc:"Meta description",
canonical:"Canonical",canonSelf:"self-referencing",canonOther:"points elsewhere",canonNone:"none",
canonNoneNote:"No canonical tag.",metaRobots:"Meta robots",byDefault:"default",
hreflang:"Hreflang",nLangs:"{n} languages",
noXDefault:" — no x-default, so Google chooses for users outside these languages.",
ogImage:"Open Graph image",ogSet:"set",ogMissing:"missing",
ogNote:"Shared on LinkedIn, WhatsApp or Facebook, no image appears.",
htmlLang:"HTML lang",notSet:"not set",viewport:"Viewport",vpSet:"set",vpMissing:"missing",
rH1:"H1",none:"(none)",headingStructure:"Heading structure",
wordCount:"Word count",thinNote:"Thin for a page that needs to rank.",
twoLangs:"Two languages on the same page",
twoLangsNote:"There is Spanish and English text on this URL — usually a translation layer only half applied.",
platform:"Platform",analytics:"Analytics",
altText:"Alt text",describedOf:"{a} of {b} described",
altNote1:"{e} use alt=\\"\\" (valid only for decorative images) and {m} have no alt.",
altNote2:"{m} images with no alt attribute.",
formats:"Formats",modernLegacy:"{m} modern / {l} legacy",
links:"Links",linksNote:"{i} internal  ·  {e} external  ·  {n} nofollow",
structured:"Structured data",nTypes:"{n} types",noJsonLd:"No JSON-LD found.",
robotsTxt:"robots.txt",reachable:"reachable",unreachable:"unreachable",statusN:"status {n}",
sitemapDeclared:"Sitemap declared",noSitemap:"No sitemap declared in robots.txt.",
aiCrawlers:"AI crawler access",allowedOf:"{a} of {b} allowed",blockedList:"Blocked: {list}",
aiOk:"ChatGPT, Claude, Perplexity and Google-Extended can reach the site.",
verdictBad:"This page serves Google different content",verdictGood:"No cloaking",
words:"{n} words",pillCrit:"{n} critical",pillWarn:"{n} warnings",pillPass:"{n} passing",
tileFix:"Points to fix",tileAlt:"Images described",tileFormats:"Modern formats",tileSchema:"Schema types",
measuring:"Measuring",measuringNote:"Running Google PageSpeed Insights on mobile. Takes 15 to 40 seconds.",
measureFailed:"The measurement failed",measureNA:"Measurement unavailable",
perfScore:"Performance score",labNote:"Lighthouse lab run, mobile.",
lcpField:"LCP, real users",lcpNote:"Largest Contentful Paint from real Chrome visitors. Good below 2.5 s.",
inpField:"INP, real users",inpNote:"Interaction to Next Paint. Good below 200 ms.",
clsField:"CLS, real users",clsNote:"Cumulative Layout Shift. Good below 0.1.",
noFieldData:"No real-user data",
noFieldNote:"Google does not have enough Chrome traffic for this URL, so only lab data is available.",
lcpLab:"LCP, lab",clsLab:"CLS, lab",tbt:"Total blocking time",fcp:"First contentful paint",
zero:"none",docTitle:"SEO Lens · Audit · Petplan",
account:"Account",acctSub:"SEO Lens · on-page audit"
}};

let LANG='es';
try{const sl=localStorage.getItem('seolens-lang');if(sl==='es'||sl==='en')LANG=sl;}catch(e){}

function T(k,v){
  const d=I18N[LANG]||I18N.es;
  let s=d[k]!=null?d[k]:(I18N.es[k]!=null?I18N.es[k]:k);
  if(v)for(const key in v)s=s.split('{'+key+'}').join(v[key]);
  return s;
}
function fx(x,d){const s=x.toFixed(d);return LANG==='es'?s.replace('.',','):s}
function locale(){return LANG==='es'?'es-ES':'en-GB'}

const out=document.getElementById('out');
const form=document.getElementById('f');
const input=document.getElementById('u');
const go=document.getElementById('go');
let findings=[];
let lastData=null,lastCwv=null,lastStamp=null;

const guide=document.getElementById('guide');
document.getElementById('burger').addEventListener('click',()=>{
  if(matchMedia('(max-width:860px)').matches)document.getElementById('side').classList.toggle('open');
  else document.getElementById('app').classList.toggle('railoff');
});
document.getElementById('theme').addEventListener('click',()=>{
  const r=document.documentElement;
  const dark=r.getAttribute('data-theme')==='dark'||(!r.getAttribute('data-theme')&&matchMedia('(prefers-color-scheme:dark)').matches);
  r.setAttribute('data-theme',dark?'light':'dark');
  try{localStorage.setItem('seolens-theme',dark?'light':'dark')}catch(e){}
});
try{const t=localStorage.getItem('seolens-theme');if(t)document.documentElement.setAttribute('data-theme',t)}catch(e){}

function applyStatic(){
  document.documentElement.lang=LANG;
  for(const n of document.querySelectorAll('[data-t]'))n.textContent=T(n.getAttribute('data-t'));
  for(const n of document.querySelectorAll('[data-ta]')){
    const s=T(n.getAttribute('data-ta'));
    n.setAttribute('aria-label',s);
    if(n.tagName==='BUTTON')n.setAttribute('title',s);
  }
  document.getElementById('tbtitle').textContent=T('tbAudit');
  if(!go.disabled)go.textContent=T('btnAudit');
  for(const b of document.querySelectorAll('.lang'))b.classList.toggle('on',b.getAttribute('data-lang')===LANG);
  document.title=T('docTitle');
}
function setLang(code){
  if(code===LANG)return;
  LANG=code;
  try{localStorage.setItem('seolens-lang',code)}catch(e){}
  applyStatic();
  redraw();
}
for(const b of document.querySelectorAll('.lang'))
  b.addEventListener('click',()=>setLang(b.getAttribute('data-lang')));

function focusGuide(){
  guide.scrollIntoView({behavior:'smooth',block:'nearest'});
  guide.classList.remove('flash');void guide.offsetWidth;guide.classList.add('flash');
  document.getElementById('side').classList.remove('open');
  closeAcct();
}
function focusAudit(){
  window.scrollTo({top:0,behavior:'smooth'});
  input.focus({preventScroll:true});
  document.getElementById('side').classList.remove('open');
}
document.getElementById('navGuide').addEventListener('click',focusGuide);
document.getElementById('guideBtn').addEventListener('click',focusGuide);
document.getElementById('acctGuide').addEventListener('click',focusGuide);
document.getElementById('help').addEventListener('click',focusGuide);
document.getElementById('navAudit').addEventListener('click',focusAudit);

const acctBtn=document.getElementById('acct'),acctMenu=document.getElementById('acctmenu');
function closeAcct(){acctMenu.hidden=true;acctBtn.setAttribute('aria-expanded','false')}
acctBtn.addEventListener('click',e=>{
  e.stopPropagation();
  const open=acctMenu.hidden;
  acctMenu.hidden=!open;
  acctBtn.setAttribute('aria-expanded',String(open));
});
document.addEventListener('click',e=>{if(!acctMenu.hidden&&!acctMenu.contains(e.target))closeAcct()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeAcct()});

function el(t,c,x){const n=document.createElement(t);if(c)n.className=c;
if(x!==undefined&&x!==null)n.textContent=String(x);return n}
function card(t){const s=el('div','card');if(t)s.appendChild(el('h2',null,t));return s}
function row(p,status,label,val,note){
  findings.push({status});
  const r=el('div','row s-'+status);
  const mark={pass:'✓',warn:'!',critical:'!',info:'i'}[status]||'';
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
function stampNow(){
  if(!lastStamp)return;
  document.getElementById('stamp').textContent=T('stamp',{t:lastStamp.toLocaleString(locale())});
}
function redraw(){
  if(!lastData)return;
  findings=[];
  out.textContent='';
  render(lastData);
  if(lastCwv)fillCwv(newCwvHolder(),lastCwv);
  stampNow();
}

form.addEventListener('submit',async e=>{
  e.preventDefault();
  const url=input.value.trim();
  if(!url)return;
  findings=[];lastData=null;lastCwv=null;
  go.disabled=true;go.textContent=T('btnAuditing');
  out.textContent='';
  const m=el('div','msg');
  m.appendChild(el('span','spin'));
  m.appendChild(document.createTextNode(T('loading',{url:url})));
  out.appendChild(m);
  let data;
  try{
    const r=await fetch('/api/audit?url='+encodeURIComponent(url));
    data=await r.json();
  }catch(err){
    out.textContent='';
    out.appendChild(el('div','msg',T('reqFailed',{msg:err.message})));
    go.disabled=false;go.textContent=T('btnAudit');return;
  }
  out.textContent='';
  if(!data.ok){
    out.appendChild(el('div','msg',data.error||T('auditFailed')));
    go.disabled=false;go.textContent=T('btnAudit');return;
  }
  lastData=data;
  render(data);
  go.disabled=false;go.textContent=T('btnAudit');
  lastStamp=new Date();stampNow();
  loadCwv(url);
});

function render(d){
  const p=d.page,c=d.cloaking,rb=d.robots;
  const body=el('div');

  const si=card(T('cIntegrity'));
  let cloaked=false;
  if(c&&c.error){
    row(si,'info',T('cloakNA'),'',c.error);
  }else if(c&&c.suspicious){
    cloaked=true;
    const r=row(si,'critical',T('cloakYes'),'',T('cloakYesNote'));
    const dd=el('div','diff');
    const a=el('div');a.appendChild(el('span',null,T('youSee')));
    a.appendChild(document.createTextNode(c.asBrowser.title||T('noTitle')));
    const b=el('div');b.appendChild(el('span',null,T('googleSees')));
    b.appendChild(document.createTextNode(c.asGooglebot.title||T('noTitle')));
    dd.appendChild(a);dd.appendChild(b);r.appendChild(dd);
  }else if(c){
    row(si,'pass',T('cloakNo'),T('identical'),T('cloakNoNote'));
  }
  if(c&&c.botSpam&&c.botSpam.length){
    cloaked=true;
    row(si,'critical',T('spamTerms'),c.botSpam.map(h=>h.term).join(', '),T('spamNote'));
  }
  const sh=p.securityHeaders||{};
  const missing=['strict-transport-security','x-content-type-options','referrer-policy'].filter(h=>!sh[h]);
  row(si,missing.length?'warn':'pass',T('secHeaders'),
    missing.length?T('missingN',{n:missing.length}):T('allPresent'),missing.join(', '));
  if(sh['x-powered-by'])row(si,'warn',T('serverVersion'),sh['x-powered-by'],T('serverVersionNote'));

  const sm=card(T('cMeta'));
  row(sm,p.titleLength===0?'critical':(p.titleLength<30||p.titleLength>65)?'warn':'pass',
    T('rTitle'),T('chars',{n:p.titleLength}),p.title||T('absent'));
  row(sm,p.descriptionLength===0?'warn':(p.descriptionLength<120||p.descriptionLength>160)?'warn':'pass',
    T('metaDesc'),T('chars',{n:p.descriptionLength}),p.description||T('absent'));
  row(sm,p.canonical?(p.canonicalSelf?'pass':'warn'):'warn',T('canonical'),
    p.canonical?(p.canonicalSelf?T('canonSelf'):T('canonOther')):T('canonNone'),p.canonical||T('canonNoneNote'));
  row(sm,'info',T('metaRobots'),p.robots||T('byDefault'));
  if(p.hreflangs.length)row(sm,p.hasXDefault?'pass':'warn',T('hreflang'),T('nLangs',{n:p.hreflangs.length}),
    p.hreflangs.join(', ')+(p.hasXDefault?'':T('noXDefault')));
  row(sm,p.og.image?'pass':'warn',T('ogImage'),p.og.image?T('ogSet'):T('ogMissing'),
    p.og.image||T('ogNote'));
  row(sm,p.htmlLang?'pass':'warn',T('htmlLang'),p.htmlLang||T('notSet'));
  row(sm,p.viewport?'pass':'critical',T('viewport'),p.viewport?T('vpSet'):T('vpMissing'));

  const sc=card(T('cContent'));
  row(sc,p.h1s.length===1?'pass':'warn',T('rH1'),p.h1s.length,p.h1s[0]||T('none'));
  row(sc,'info',T('headingStructure'),'',Object.entries(p.headings).filter(([,v])=>v)
    .map(([t,v])=>t.toUpperCase()+': '+v).join('  ·  '));
  row(sc,p.wordCount<300?'warn':'pass',T('wordCount'),p.wordCount,
    p.wordCount<300?T('thinNote'):'');
  if(p.language.bothLanguages)row(sc,'warn',T('twoLangs'),'',T('twoLangsNote'));
  row(sc,'info',T('platform'),p.cms);
  if(p.analytics.length)row(sc,'info',T('analytics'),p.analytics.length,p.analytics.join(', '));

  const sg=card(T('cImages'));
  const i=p.images;
  const undesc=i.missingAltAttr+i.emptyAlt;
  row(sg,i.total===0?'info':(undesc>i.total/2?'warn':'pass'),T('altText'),
    T('describedOf',{a:i.meaningfulAlt,b:i.total}),
    i.emptyAlt?T('altNote1',{e:i.emptyAlt,m:i.missingAltAttr})
      :(i.missingAltAttr?T('altNote2',{m:i.missingAltAttr}):''));
  row(sg,p.legacyFormats>p.modernFormats?'warn':'pass',T('formats'),
    T('modernLegacy',{m:p.modernFormats,l:p.legacyFormats}),
    Object.entries(i.formats).map(([f,v])=>f+': '+v).join('  ·  '));

  const sl=card(T('cLinks'));
  row(sl,'info',T('links'),p.links.total,
    T('linksNote',{i:p.links.internal,e:p.links.external,n:p.links.nofollow}));
  row(sl,p.schemaTypes.length?'pass':'warn',T('structured'),
    p.schemaTypes.length?T('nTypes',{n:p.schemaTypes.length}):T('zero'),
    p.schemaTypes.join(', ')||T('noJsonLd'));

  const ss=card(T('cSite'));
  if(rb&&rb.reachable){
    row(ss,'pass',T('robotsTxt'),T('reachable'));
    row(ss,rb.sitemaps.length?'pass':'warn',T('sitemapDeclared'),rb.sitemaps.length,
      rb.sitemaps.join('   ')||T('noSitemap'));
    const blocked=Object.entries(rb.aiCrawlers).filter(([,v])=>v==='blocked');
    const total=Object.keys(rb.aiCrawlers).length;
    row(ss,blocked.length?'warn':'pass',T('aiCrawlers'),
      T('allowedOf',{a:total-blocked.length,b:total}),
      blocked.length?T('blockedList',{list:blocked.map(([k])=>k).join(', ')}):T('aiOk'));
  }else{
    row(ss,'warn',T('robotsTxt'),T('unreachable'),(rb&&(rb.error||T('statusN',{n:rb.status})))||'');
  }

  const v=el('div','verdict'+(cloaked?' bad':''));
  v.appendChild(el('div','vmark',cloaked?'!':'✓'));
  const vt=el('div','vtext');
  vt.appendChild(el('p','vtitle',cloaked?T('verdictBad'):T('verdictGood')));
  vt.appendChild(el('p','vsub',p.host+'  ·  '+(p.cms!=='Unknown'?p.cms+'  ·  ':'')+T('words',{n:p.wordCount})));
  const pl=el('div','pills');
  pl.appendChild(el('span','pill p-crit',T('pillCrit',{n:n('critical')})));
  pl.appendChild(el('span','pill p-warn',T('pillWarn',{n:n('warn')})));
  pl.appendChild(el('span','pill p-good',T('pillPass',{n:n('pass')})));
  v.appendChild(vt);v.appendChild(pl);
  out.appendChild(v);

  const tl=el('div','tiles');
  tile(tl,n('critical')?'crit':(n('warn')?'warn':'good'),n('critical')+n('warn'),T('tileFix'));
  tile(tl,i.total&&undesc>i.total/2?'warn':'',i.meaningfulAlt+'/'+i.total,T('tileAlt'));
  tile(tl,p.legacyFormats>p.modernFormats?'warn':'',p.modernFormats+'/'+(p.modernFormats+p.legacyFormats),T('tileFormats'));
  tile(tl,'',p.schemaTypes.length,T('tileSchema'));
  out.appendChild(tl);

  body.appendChild(si);body.appendChild(sm);body.appendChild(sc);
  body.appendChild(sg);body.appendChild(sl);body.appendChild(ss);

  if(p.topKeywords.length){
    const sk=card(T('cKeywords'));
    const t=el('table');
    const max=p.topKeywords[0].count||1;
    for(const k of p.topKeywords.slice(0,8)){
      const tr=el('tr');
      tr.appendChild(el('td','kw',k.word));
      const bt=el('td');const bar=el('div','bar');const fill=el('i');
      fill.style.width=Math.round((k.count/max)*100)+'%';
      bar.appendChild(fill);bt.appendChild(bar);tr.appendChild(bt);
      tr.appendChild(el('td','num',k.count+'  ·  '+k.density+'%'));
      t.appendChild(tr);
    }
    sk.appendChild(t);body.appendChild(sk);
  }

  out.appendChild(body);
}

function refreshPills(){
  const pl=document.querySelector('.pills');
  if(pl){
    pl.children[0].textContent=T('pillCrit',{n:n('critical')});
    pl.children[1].textContent=T('pillWarn',{n:n('warn')});
    pl.children[2].textContent=T('pillPass',{n:n('pass')});
  }
  const t=document.querySelector('.tile .n');
  if(t)t.textContent=n('critical')+n('warn');
}

function newCwvHolder(){
  const sk=card(T('cSpeed'));
  const holder=el('div');
  sk.appendChild(holder);
  out.appendChild(sk);
  return holder;
}

async function loadCwv(url){
  const holder=newCwvHolder();
  const load=row(holder,'info',T('measuring'),'',T('measuringNote'));
  const badge=load.querySelector('.badge');
  if(badge)badge.replaceWith(el('span','spin'));
  let d;
  try{
    const r=await fetch('/api/cwv?url='+encodeURIComponent(url));
    d=await r.json();
  }catch(e){
    d={ok:false,threw:e.message};
  }
  lastCwv=d;
  holder.textContent='';
  fillCwv(holder,d);
}

function fillCwv(holder,d){
  if(d.threw){row(holder,'info',T('measureFailed'),'',d.threw);refreshPills();return;}
  if(!d.ok){row(holder,'info',T('measureNA'),'',d.error||'');refreshPills();return;}
  const g=c=>c==='FAST'?'pass':(c==='AVERAGE'?'warn':'critical');
  if(d.score!=null)row(holder,d.score>=90?'pass':(d.score>=50?'warn':'critical'),
    T('perfScore'),d.score+' / 100',T('labNote'));
  if(d.field){
    if(d.field.lcp)row(holder,g(d.field.lcp.category),T('lcpField'),fx(d.field.lcp.value,2)+' s',T('lcpNote'));
    if(d.field.inp)row(holder,g(d.field.inp.category),T('inpField'),Math.round(d.field.inp.value)+' ms',T('inpNote'));
    if(d.field.cls)row(holder,g(d.field.cls.category),T('clsField'),fx(d.field.cls.value,3),T('clsNote'));
  }else{
    row(holder,'info',T('noFieldData'),'',T('noFieldNote'));
  }
  const L=d.lab||{};
  if(L.lcp!=null)row(holder,L.lcp<=2500?'pass':(L.lcp<=4000?'warn':'critical'),T('lcpLab'),fx(L.lcp/1000,2)+' s');
  if(L.cls!=null)row(holder,L.cls<=0.1?'pass':(L.cls<=0.25?'warn':'critical'),T('clsLab'),fx(L.cls,3));
  if(L.tbt!=null)row(holder,L.tbt<=200?'pass':(L.tbt<=600?'warn':'critical'),T('tbt'),Math.round(L.tbt)+' ms');
  if(L.fcp!=null)row(holder,'info',T('fcp'),fx(L.fcp/1000,2)+' s');
  refreshPills();
}

applyStatic();

const q=new URLSearchParams(location.search).get('url');
if(q){input.value=q.replace(/^https?:\\/\\//,'');form.dispatchEvent(new Event('submit'));}
</script>
</body>
</html>`;
