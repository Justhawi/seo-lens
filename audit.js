// Shared analysis. No DOM: everything here works on raw HTML strings, so it
// runs identically in a Cloudflare Worker, in Node, or behind any other server.

export const GOOGLEBOT_UA =
  "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; Googlebot/2.1; +http://www.google.com/bot.html) Chrome/120.0.0.0 Safari/537.36";

export const BROWSER_UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

const SPAM_PATTERNS = [
  /\bcialis\b/gi,
  /\bviagra\b/gi,
  /\btadalafil\b/gi,
  /\bsildenafil\b/gi,
  /\bivermectin[ao]?\b/gi,
  /\bkamagra\b/gi,
  /\bcasino\b/gi,
  /\bpoker\b/gi,
  /\bescort\b/gi,
  /\breplica watches\b/gi,
  /\bpayday loan/gi,
];

const decode = (s) =>
  (s || "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;/g, "'")
    .replace(/&nbsp;/g, " ");

const clean = (s) => decode(s).replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();

function pick(html, re) {
  const m = html.match(re);
  return m ? clean(m[1]) : null;
}

function metaContent(html, attrName, attrValue) {
  const re = new RegExp(
    `<meta[^>]+${attrName}=["']${attrValue}["'][^>]*>`,
    "i"
  );
  const tag = html.match(re);
  if (!tag) return null;
  const c = tag[0].match(/content=["']([^"']*)["']/i);
  return c ? decode(c[1]).trim() : null;
}

export function stripToText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function spamHits(html) {
  const hits = [];
  for (const re of SPAM_PATTERNS) {
    const m = html.match(re);
    if (m && m.length) hits.push({ term: m[0].toLowerCase(), count: m.length });
  }
  return hits;
}

export function summarise(html) {
  return {
    title: pick(html, /<title[^>]*>([\s\S]*?)<\/title>/i),
    description: metaContent(html, "name", "description"),
    h1: pick(html, /<h1[^>]*>([\s\S]*?)<\/h1>/i),
    textLength: stripToText(html).length,
  };
}

const STOP = new Set(
  ("de la que el en y a los se del las un por con no una su para es al lo como mas " +
    "pero sus le ya o este si porque esta entre cuando muy sin sobre tambien me hasta " +
    "hay donde quien desde todo nos durante todos uno les ni contra otros ese eso ante " +
    "ellos esto mi antes algunos unos yo otro otras otra tanto esa estos mucho quienes " +
    "nada muchos cual sea poco ella estar haber estas estaba estamos algunas algo " +
    "nosotros puede pueden tiene tienen hacer segun cada mismo tras ademas " +
    "the of and to in is it you that was for on are with as be this have from or one " +
    "had by not what all were we when your can said there use an each which she do how " +
    "their if will up other about out many then them these so some her would make like " +
    "him into time has look two more been also may only such most"
  ).split(/\s+/)
);

export function analyseHtml(html, finalUrl, headers) {
  const base = new URL(finalUrl);
  const host = base.hostname.replace(/^www\./, "");

  const title = pick(html, /<title[^>]*>([\s\S]*?)<\/title>/i) || "";
  const description = metaContent(html, "name", "description") || "";
  const robots = metaContent(html, "name", "robots");
  const viewport = metaContent(html, "name", "viewport");

  const canonicalTag = html.match(/<link[^>]+rel=["']canonical["'][^>]*>/i);
  let canonical = null;
  if (canonicalTag) {
    const h = canonicalTag[0].match(/href=["']([^"']*)["']/i);
    canonical = h ? decode(h[1]) : null;
  }
  let canonicalSelf = false;
  if (canonical) {
    try {
      canonicalSelf =
        new URL(canonical, finalUrl).href.replace(/\/$/, "") ===
        finalUrl.split(/[?#]/)[0].replace(/\/$/, "");
    } catch (e) {
      canonicalSelf = false;
    }
  }

  const hreflangs = [
    ...html.matchAll(/<link[^>]+rel=["']alternate["'][^>]*hreflang=["']([^"']+)["'][^>]*>/gi),
  ].map((m) => m[1]);
  const hasXDefault = hreflangs.some((h) => h.toLowerCase() === "x-default");

  const og = {
    title: metaContent(html, "property", "og:title"),
    description: metaContent(html, "property", "og:description"),
    image: metaContent(html, "property", "og:image"),
  };

  const langM = html.match(/<html[^>]+lang=["']([^"']+)["']/i);
  const htmlLang = langM ? langM[1] : null;

  const headings = {};
  for (const t of ["h1", "h2", "h3", "h4", "h5", "h6"]) {
    headings[t] = (html.match(new RegExp(`<${t}[\\s>]`, "gi")) || []).length;
  }
  const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) => clean(m[1]));

  const text = stripToText(html);
  const words = text ? text.split(" ").filter(Boolean) : [];
  const wordCount = words.length;

  // images
  const imgTags = [...html.matchAll(/<img\b[^>]*>/gi)].map((m) => m[0]);
  let missingAltAttr = 0;
  let emptyAlt = 0;
  let meaningfulAlt = 0;
  const formats = {};
  for (const tag of imgTags) {
    const alt = tag.match(/\balt=["']([^"']*)["']/i);
    if (!/\balt=/i.test(tag)) missingAltAttr++;
    else if (!alt || alt[1].trim() === "") emptyAlt++;
    else meaningfulAlt++;
    const src = tag.match(/\b(?:src|data-src)=["']([^"']+)["']/i);
    if (src) {
      const f = (src[1].split("?")[0].match(/\.([a-z0-9]+)$/i) || [, "other"])[1].toLowerCase();
      formats[f] = (formats[f] || 0) + 1;
    }
  }
  const modernFormats = (formats.webp || 0) + (formats.avif || 0);
  const legacyFormats = (formats.png || 0) + (formats.jpg || 0) + (formats.jpeg || 0);

  // links
  let internal = 0;
  let external = 0;
  let nofollow = 0;
  for (const m of html.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>/gi)) {
    const tag = m[0];
    if (/rel=["'][^"']*nofollow/i.test(tag)) nofollow++;
    let h;
    try {
      h = new URL(m[1], finalUrl).hostname.replace(/^www\./, "");
    } catch (e) {
      continue;
    }
    if (!h || h === host) internal++;
    else external++;
  }

  // structured data
  const schemaTypes = new Set();
  for (const m of html.matchAll(
    /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi
  )) {
    try {
      const walk = (n) => {
        if (!n) return;
        if (Array.isArray(n)) return n.forEach(walk);
        if (typeof n === "object") {
          if (n["@type"]) [].concat(n["@type"]).forEach((t) => schemaTypes.add(t));
          Object.values(n).forEach(walk);
        }
      };
      walk(JSON.parse(m[1].trim()));
    } catch (e) {
      schemaTypes.add("(invalid JSON-LD)");
    }
  }

  // platform
  let cms = "Unknown";
  if (/wp-content|wp-includes|wp-json/i.test(html)) cms = "WordPress";
  else if (/cdn\.shopify\.com|Shopify\.theme/i.test(html)) cms = "Shopify";
  else if (/webflow/i.test(html)) cms = "Webflow";
  else if (/parastorage|wixstatic/i.test(html)) cms = "Wix";
  else if (/framerusercontent/i.test(html)) cms = "Framer";
  else if (/drupal/i.test(html)) cms = "Drupal";

  const analytics = [];
  if (/googletagmanager\.com\/gtag|gtag\/js/i.test(html)) analytics.push("Google Analytics 4");
  if (/googletagmanager\.com\/gtm/i.test(html)) analytics.push("Google Tag Manager");
  if (/clarity\.ms/i.test(html)) analytics.push("Microsoft Clarity");
  if (/connect\.facebook\.net/i.test(html)) analytics.push("Meta Pixel");

  // keywords
  const freq = {};
  for (const raw of words) {
    const w = raw.toLowerCase().replace(/[^\p{L}\p{N}ñáéíóúü-]/gu, "");
    if (w.length < 4 || STOP.has(w)) continue;
    freq[w] = (freq[w] || 0) + 1;
  }
  const topKeywords = Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([word, count]) => ({
      word,
      count,
      density: wordCount ? ((count / wordCount) * 100).toFixed(2) : "0.00",
    }));

  // mixed language
  const sample = text.toLowerCase().slice(0, 12000);
  const hits = (list) =>
    list.reduce((n, w) => n + (sample.match(new RegExp(`(^|\\s)${w}(\\s|$)`, "g")) || []).length, 0);
  const esHits = hits(["que", "para", "como", "pero", "porque", "desde", "cuando"]);
  const enHits = hits(["the", "that", "with", "from", "which", "because", "when"]);
  const bothLanguages =
    esHits > 8 && enHits > 8 && Math.min(esHits, enHits) / Math.max(esHits, enHits) > 0.2;

  const securityHeaders = {};
  for (const h of [
    "strict-transport-security",
    "x-content-type-options",
    "referrer-policy",
    "content-security-policy",
    "x-frame-options",
    "x-powered-by",
    "server",
  ]) {
    securityHeaders[h] = headers ? headers.get(h) : null;
  }

  return {
    url: finalUrl,
    host,
    title,
    titleLength: title.length,
    description,
    descriptionLength: description.length,
    canonical,
    canonicalSelf,
    robots,
    viewport,
    htmlLang,
    hreflangs,
    hasXDefault,
    og,
    h1s,
    headings,
    wordCount,
    images: {
      total: imgTags.length,
      missingAltAttr,
      emptyAlt,
      meaningfulAlt,
      formats,
    },
    modernFormats,
    legacyFormats,
    links: { internal, external, nofollow, total: internal + external },
    schemaTypes: [...schemaTypes],
    cms,
    analytics,
    topKeywords,
    language: { esHits, enHits, bothLanguages },
    securityHeaders,
  };
}

export function compareForCloaking(browserHtml, botHtml) {
  const a = summarise(browserHtml);
  const b = summarise(botHtml);
  const norm = (s) => (s || "").toLowerCase().replace(/\s+/g, " ").trim();

  const titleDiffers = norm(a.title) !== norm(b.title);
  const descDiffers = norm(a.description) !== norm(b.description);
  const h1Differs = norm(a.h1) !== norm(b.h1);
  const sizeDelta =
    a.textLength && b.textLength
      ? Math.abs(a.textLength - b.textLength) / Math.max(a.textLength, b.textLength)
      : 0;

  const botSpam = spamHits(botHtml);
  const browserSpam = spamHits(browserHtml);

  return {
    asBrowser: a,
    asGooglebot: b,
    titleDiffers,
    descDiffers,
    h1Differs,
    sizeDelta: Number(sizeDelta.toFixed(3)),
    botSpam,
    browserSpam,
    suspicious:
      titleDiffers ||
      descDiffers ||
      botSpam.length > browserSpam.length ||
      sizeDelta > 0.3,
  };
}

export function checkRobots(body) {
  const sitemaps = [...body.matchAll(/^\s*sitemap:\s*(\S+)/gim)].map((m) => m[1]);
  const bots = [
    "GPTBot",
    "ChatGPT-User",
    "ClaudeBot",
    "PerplexityBot",
    "Google-Extended",
    "CCBot",
  ];
  const lines = body.split(/\r?\n/);
  const aiCrawlers = {};
  for (const bot of bots) {
    let blocked = false;
    let inBlock = false;
    for (const line of lines) {
      const ua = line.match(/^\s*user-agent:\s*(.+)$/i);
      if (ua) {
        inBlock = ua[1].trim().toLowerCase() === bot.toLowerCase();
        continue;
      }
      if (inBlock) {
        const dis = line.match(/^\s*disallow:\s*(.*)$/i);
        if (dis && dis[1].trim() === "/") blocked = true;
      }
    }
    aiCrawlers[bot] = blocked ? "blocked" : "allowed";
  }
  return { sitemaps, aiCrawlers };
}

export async function runAudit(rawUrl, fetchImpl = fetch) {
  let target;
  try {
    target = new URL(/^https?:\/\//i.test(rawUrl) ? rawUrl : "https://" + rawUrl);
  } catch (e) {
    return { ok: false, error: "That doesn't look like a valid URL." };
  }
  if (!/^https?:$/.test(target.protocol)) {
    return { ok: false, error: "Only http and https URLs can be audited." };
  }

  const opts = (ua) => ({
    headers: { "user-agent": ua, accept: "text/html,*/*" },
    redirect: "follow",
  });

  let browserRes;
  let browserHtml;
  try {
    browserRes = await fetchImpl(target.href, opts(BROWSER_UA));
    browserHtml = await browserRes.text();
  } catch (e) {
    return { ok: false, error: "Could not reach that URL: " + (e.message || e) };
  }

  let botHtml = "";
  let botError = null;
  try {
    const botRes = await fetchImpl(target.href, opts(GOOGLEBOT_UA));
    botHtml = await botRes.text();
  } catch (e) {
    botError = e.message || String(e);
  }

  const finalUrl = browserRes.url || target.href;
  const page = analyseHtml(browserHtml, finalUrl, browserRes.headers);
  const cloaking = botError ? { error: botError } : compareForCloaking(browserHtml, botHtml);

  let robots = { error: "not checked" };
  try {
    const r = await fetchImpl(target.origin + "/robots.txt", opts(BROWSER_UA));
    if (r.ok) {
      robots = checkRobots(await r.text());
      robots.reachable = true;
    } else {
      robots = { reachable: false, status: r.status };
    }
  } catch (e) {
    robots = { reachable: false, error: e.message || String(e) };
  }

  return {
    ok: true,
    status: browserRes.status,
    fetchedAt: new Date().toISOString(),
    page,
    cloaking,
    robots,
  };
}

// ---------------------------------------------------------------- Core Web Vitals
// Google's PageSpeed Insights API. Free, no key, rate-limited per IP.
// Field data (real Chrome users) is used when Google has enough traffic for the
// URL; otherwise only the lab run is reported, and the two are labelled apart.
export async function fetchCoreWebVitals(rawUrl, fetchImpl = fetch) {
  let target;
  try {
    target = new URL(/^https?:\/\//i.test(rawUrl) ? rawUrl : 'https://' + rawUrl);
  } catch (e) {
    return { error: "That doesn't look like a valid URL." };
  }
  const api =
    'https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=' +
    encodeURIComponent(target.href) +
    '&strategy=mobile&category=performance';
  let j;
  try {
    const r = await fetchImpl(api);
    if (!r.ok) {
      return { error: 'PageSpeed API returned ' + r.status + '. It rate-limits by IP; try again shortly.' };
    }
    j = await r.json();
  } catch (e) {
    return { error: 'Could not reach the PageSpeed API: ' + (e.message || e) };
  }
  const lh = j.lighthouseResult || {};
  const audits = lh.audits || {};
  const num = (k) =>
    audits[k] && typeof audits[k].numericValue === 'number' ? audits[k].numericValue : null;
  const score =
    lh.categories && lh.categories.performance && typeof lh.categories.performance.score === 'number'
      ? Math.round(lh.categories.performance.score * 100)
      : null;
  let field = null;
  const m = j.loadingExperience && j.loadingExperience.metrics;
  if (m) {
    field = {};
    if (m.LARGEST_CONTENTFUL_PAINT_MS)
      field.lcp = { value: m.LARGEST_CONTENTFUL_PAINT_MS.percentile / 1000, category: m.LARGEST_CONTENTFUL_PAINT_MS.category };
    if (m.CUMULATIVE_LAYOUT_SHIFT_SCORE)
      field.cls = { value: m.CUMULATIVE_LAYOUT_SHIFT_SCORE.percentile / 100, category: m.CUMULATIVE_LAYOUT_SHIFT_SCORE.category };
    if (m.INTERACTION_TO_NEXT_PAINT)
      field.inp = { value: m.INTERACTION_TO_NEXT_PAINT.percentile, category: m.INTERACTION_TO_NEXT_PAINT.category };
    if (!Object.keys(field).length) field = null;
  }
  return {
    ok: true,
    score,
    strategy: 'mobile',
    lab: {
      lcp: num('largest-contentful-paint'),
      cls: num('cumulative-layout-shift'),
      tbt: num('total-blocking-time'),
      fcp: num('first-contentful-paint'),
      si: num('speed-index'),
    },
    field,
  };
}
