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
.logo{padding:20px 24px 16px 27px}
.logo svg{display:block;width:152px;height:auto;color:var(--logo)}
.licence{margin-top:14px;font-size:11.5px;color:var(--text-muted)}
.nav{padding:4px 0}
.nav a{display:flex;align-items:center;gap:12px;padding:11px 24px;text-decoration:none;
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
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 725.25 215.92" role="img" aria-label="Petplan"><path fill="currentColor" fill-rule="nonzero" d="M 432.09 8.09 L 416.39 141.82 C 415.29 150.8 417.39 158.31 422.45 163.54 C 428.82 170.1 439.65 172.88 453.74 171.56 L 455.34 171.41 L 457.58 154.24 L 455.37 154.15 C 447.96 153.88 444.21 152.91 442.42 150.79 C 441 149.11 440.6 146.34 441.16 142.09 C 441.16 142.05 457.85 0.07 457.85 0.07 L 432.09 8.09 M 182.7 104.77 L 142.07 104.77 C 145.36 94.24 155.84 83.36 168.02 83.36 C 177.74 83.36 182.32 88.28 182.89 99.3 C 182.92 99.87 182.93 100.44 182.93 101.02 C 182.93 102.29 182.84 103.56 182.7 104.77 Z M 209.47 98.14 C 208.28 75.25 193.68 61.59 170.4 61.59 C 153.09 61.59 138.1 67.8 127.02 79.53 C 115.03 92.23 109.04 110 110.17 129.56 C 111.75 155.9 130.02 171.61 159.05 171.61 C 170.74 171.61 184.04 169.05 194.64 164.76 C 196.89 163.8 199.25 162.51 199.07 159.08 L 199.04 158.4 L 197.38 146.72 C 196.84 143.73 194.82 143.28 193.67 143.28 C 192.93 143.28 192.25 143.51 191.66 143.71 L 190.81 143.98 C 182.21 147.12 172.23 149 164.12 149 C 149.11 149 139.69 140.43 138.95 126.07 C 138.95 126.07 138.97 123.75 138.97 123.56 C 140.96 123.56 199.74 123.56 199.74 123.56 C 205.34 123.56 207.85 122.96 208.53 117.15 C 208.52 117.15 208.52 117.16 208.52 117.17 L 208.53 117.15 C 209.08 113.19 209.52 105.42 209.52 100.56 C 209.52 99.63 209.5 98.82 209.47 98.14 M 704.99 30.33 L 708.18 30.33 C 710.61 30.33 711.67 29.37 711.67 27.1 C 711.67 25.47 710.3 24.08 708.12 24.08 L 704.99 24.08 Z M 704.99 38.77 C 704.99 39.5 704.54 39.94 703.82 39.94 C 703.11 39.94 702.65 39.5 702.65 38.77 L 702.65 23.39 C 702.65 22.73 703.02 22.2 703.9 22.2 L 708.22 22.2 C 711.2 22.2 714.01 24.08 714.01 26.95 C 714.01 30.5 711.67 31.84 708.86 31.94 L 707.86 31.96 L 713.88 38.11 C 714.19 38.43 714.32 38.7 714.32 39.1 C 714.32 39.56 713.86 39.94 713.27 39.94 C 712.79 39.94 712.47 39.71 712.21 39.45 L 704.99 32.09 L 704.99 38.77 M 722.13 31.54 C 722.13 23.94 715.12 17.42 708 17.42 C 700.21 17.42 693.89 23.98 693.89 31.54 C 693.89 39.15 700.25 45.67 708 45.67 C 715.07 45.67 722.13 39.15 722.13 31.54 Z M 691.51 31.54 C 691.51 22.48 698.76 15.05 708 15.05 C 716.57 15.05 724.5 22.48 724.5 31.54 C 724.5 40.61 716.57 48.04 708 48.04 C 698.76 48.04 691.51 40.61 691.51 31.54 M 71.21 85.82 C 66.45 91.05 57.12 94.4 47.45 94.4 C 43.79 94.4 41.37 94.39 38.02 94.24 C 38.29 92.13 44.14 45.3 44.35 43.57 C 45.9 43.57 54.65 43.57 54.65 43.57 C 70.37 43.57 79.62 46.25 80.33 59.94 C 80.85 69.97 77.53 79.39 71.21 85.82 Z M 110.29 58.77 C 108.98 33.4 90.18 20.53 54.41 20.53 L 23.94 20.53 C 18.64 20.53 17.27 23.19 16.84 27.18 C 16.84 27.18 0.28 168.51 0.08 170.24 C 0.04 170.4 0.02 170.56 0 170.71 L 16.27 170.71 C 21.41 170.3 27.07 164.73 29.98 156.8 C 30.64 155.02 31.08 153.24 31.36 151.5 C 32.83 137.78 34.6 121.21 35.04 117.08 C 38.96 117.44 42.92 117.64 46.84 117.64 C 67.13 117.64 84.5 110.99 95.76 98.91 C 104.89 89.27 110.36 75.11 110.36 61.39 C 110.36 60.52 110.34 59.64 110.29 58.77 Z M 95.75 98.91 L 95.76 98.91 L 95.76 98.91 Z M 95.75 98.91 M 373.99 117.04 C 372.15 132.76 367.73 150.94 349.75 152.01 C 342.16 152.6 334.43 149.04 328.94 145.68 C 329.23 143.26 335.97 87.69 336.18 86 C 338.96 84.05 345.34 81.05 353.14 80.09 C 353.84 80 355.9 79.87 356.42 79.88 C 357.75 79.91 359.57 80.02 359.57 80.02 C 363.88 80.19 367.17 81.66 369.61 84.51 C 373.06 88.52 374.78 95.32 374.78 104.79 C 374.78 108.47 374.52 112.55 373.99 117.04 Z M 390.89 69.78 C 384.34 62.53 375.41 58.95 364.37 59.12 C 330.78 59.56 314.54 75.71 311.62 78.94 L 311.19 79.41 L 311.1 80.08 L 295.43 215.69 L 295.49 215.72 C 299.23 215.74 304.06 215.76 307.81 215.77 C 312.96 215.34 318.61 209.77 321.52 201.86 C 322.16 200.12 322.6 198.38 322.88 196.69 C 324.42 183.24 325.98 169.49 326.27 166.91 C 334.57 171.19 342.65 173.12 351.48 172.92 L 353.62 172.87 C 353.62 172.87 353.6 172.61 353.6 172.5 C 382.92 170.37 398.89 144 401.7 118.2 C 402.16 114.26 402.39 110.44 402.39 106.75 C 402.39 91.17 398.37 78.05 390.89 69.78 M 506.93 149.75 C 497.44 149.75 492.13 144.02 491.55 133.18 C 490.8 118.6 495.69 104.97 505.34 94.79 C 514.07 85.6 525.87 80.33 537.71 80.33 C 540.01 80.33 541.77 80.44 543.33 80.57 C 542.87 84.1 540.22 107.62 540.22 107.62 C 536.84 132.82 520.2 149.75 506.93 149.75 Z M 534.51 158 C 534.34 159.47 533.49 167.04 533.05 170.95 C 536.9 170.95 541.86 170.95 545.62 170.95 C 550.69 170.34 556.2 164.85 559.05 157.07 C 559.56 155.68 559.94 154.29 560.22 152.94 L 570.69 61.38 L 569.12 61.1 C 564.53 60.31 554.45 59 538.66 59 C 518.36 59 498.9 67.24 485.23 81.62 C 471.95 95.62 465.5 114 466.61 134.78 C 467.86 158.62 486.09 171.09 503.44 171.09 C 516.45 171.09 526.98 166.59 534.51 158 M 261.79 84 C 261.79 84 261.82 84 261.84 84 L 272.75 84 C 277.9 83.57 283.56 78.01 286.47 70.08 C 287.17 68.14 287.64 66.22 287.93 64.35 C 283.79 64.35 265.83 64.35 263.96 64.35 C 264.17 62.59 266.36 43.04 267.11 36.33 L 238.62 45.48 C 237.95 50.86 236.65 61.25 236.27 64.35 C 234.72 64.35 226.39 64.35 226.39 64.35 C 223.28 64.35 221.29 66.23 220.95 69.51 L 219.61 79.21 C 219.59 79.39 219.58 79.55 219.58 79.71 C 219.58 80.69 219.91 81.55 220.54 82.25 C 221.53 83.34 223.23 84 225.09 84 C 225.09 84 232.24 84 234.07 84 C 233.8 86.21 228.51 130.02 228.51 130.02 C 228.51 130.03 228.19 132.73 228.19 132.73 C 227.7 136.71 227.29 140.25 227.29 144.11 C 227.29 145.09 227.32 146.09 227.37 147.13 C 228.28 162.45 239.38 171.61 257.09 171.61 C 265.83 171.61 274.23 169.92 282.8 166.45 C 285.01 165.54 286.11 163.88 285.98 161.62 L 285.96 161.4 C 285.96 161.39 285.07 149.75 285.07 149.75 C 284.95 147.66 283.54 146.25 281.56 146.25 C 280.54 146.25 279.79 146.5 279.13 146.73 C 279.18 146.71 278.6 146.87 278.6 146.87 C 274.26 148.07 270.16 149.21 265.64 149.21 C 258.71 149.21 256.13 147.08 255.78 141.09 C 255.73 140.28 255.7 139.47 255.7 138.6 C 255.7 136.3 255.9 133.51 256.51 128.59 C 256.51 128.57 261.02 90.37 261.79 84 M 643.76 83.71 C 646.64 86.88 647.83 91.63 647.17 97.46 L 640.01 170.92 L 652.44 170.92 C 657.59 170.5 663.25 164.93 666.16 157.01 C 666.75 155.37 667.18 153.74 667.47 152.15 L 673.86 89.8 C 675.69 72.1 662.46 62.75 650.56 60.12 C 637.74 57.18 625.4 59.79 617.21 62 C 605.5 65.2 596.73 70.83 587.28 77.3 L 586.52 77.83 L 576.68 170.94 L 589.04 170.94 C 594.19 170.52 599.85 164.94 602.75 157.01 C 603.42 155.21 603.87 153.41 604.15 151.67 C 606.77 125.9 610.79 86.16 610.91 84.81 C 614.46 82.79 621.94 79.12 629.86 78.89 C 635.97 78.77 640.78 80.45 643.76 83.71"/></svg>
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
