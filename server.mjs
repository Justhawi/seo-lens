// Plain Node server - same app, no Cloudflare needed.
//   node server.mjs        then open http://localhost:8787
// Useful for trying it locally, or for hosting anywhere Node runs.
//
// Access control: set SEOLENS_PASSWORD in the host's environment and the whole
// app sits behind a login. Leave it unset and the app stays open, so nobody is
// locked out before the variable exists.

import http from "node:http";
import crypto from "node:crypto";
import { PAGE } from "./page.js";
import { LOGIN_PAGE } from "./login.js";
import { DRAFTS, CTA } from "./drafts.js";
import { runAudit, fetchCoreWebVitals } from "./audit.js";

const PORT = process.env.PORT || 8787;

const PASSWORD = process.env.SEOLENS_PASSWORD || "";
const AUTH_ON = PASSWORD.length > 0;
const COOKIE = "seolens_session";
const MAX_AGE = 60 * 60 * 12; // 12 hours

// The session value is derived from the password, so changing the password in
// the host's settings immediately invalidates every session that was issued
// under the old one. The password itself is never put in a cookie.
const SESSION_TOKEN = crypto
  .createHmac("sha256", PASSWORD || "unset")
  .update("seolens-session-v1")
  .digest("hex");

const sha256 = (s) => crypto.createHash("sha256").update(String(s), "utf8").digest();
const PASSWORD_HASH = sha256(PASSWORD);

function sameSecret(a, b) {
  // Both are fixed-length digests, so this never leaks length.
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

function parseCookies(req) {
  const out = {};
  const raw = req.headers.cookie;
  if (!raw) return out;
  for (const part of raw.split(";")) {
    const i = part.indexOf("=");
    if (i < 0) continue;
    out[part.slice(0, i).trim()] = decodeURIComponent(part.slice(i + 1).trim());
  }
  return out;
}

function isAuthed(req) {
  if (!AUTH_ON) return true;
  const v = parseCookies(req)[COOKIE];
  if (!v) return false;
  return sameSecret(Buffer.from(v, "utf8"), Buffer.from(SESSION_TOKEN, "utf8"));
}

function isSecureRequest(req) {
  const proto = String(req.headers["x-forwarded-proto"] || "").split(",")[0].trim();
  return proto === "https";
}

// A local path only, so ?next= can never bounce someone to another site.
function safeNext(value) {
  const v = String(value || "/");
  if (!v.startsWith("/") || v.startsWith("//")) return "/";
  return v;
}

// Small in-memory throttle. Enough to make guessing a shared password pointless
// on a single instance; it resets when the service restarts.
const attempts = new Map();
const WINDOW = 15 * 60 * 1000;
const MAX_TRIES = 8;

function clientKey(req) {
  const fwd = String(req.headers["x-forwarded-for"] || "").split(",")[0].trim();
  return fwd || req.socket.remoteAddress || "unknown";
}

function throttled(key) {
  const rec = attempts.get(key);
  if (!rec) return false;
  if (Date.now() > rec.until) {
    attempts.delete(key);
    return false;
  }
  return rec.n >= MAX_TRIES;
}

function noteFailure(key) {
  const now = Date.now();
  const rec = attempts.get(key);
  if (!rec || now > rec.until) attempts.set(key, { n: 1, until: now + WINDOW });
  else rec.n += 1;
}

function readBody(req, limit = 4096) {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (c) => {
      data += c;
      if (data.length > limit) {
        reject(new Error("Body too large"));
        req.destroy();
      }
    });
    req.on("end", () => resolve(data));
    req.on("error", reject);
  });
}

function isPrivateHost(h) {
  h = h.toLowerCase();
  if (h === "localhost" || h.endsWith(".localhost") || h.endsWith(".internal")) return true;
  if (/^127\./.test(h) || /^10\./.test(h) || /^192\.168\./.test(h)) return true;
  if (/^172\.(1[6-9]|2\d|3[01])\./.test(h)) return true;
  if (/^169\.254\./.test(h) || h === "0.0.0.0" || h === "::1") return true;
  return false;
}

const SECURITY_HEADERS = {
  "x-content-type-options": "nosniff",
  "referrer-policy": "strict-origin-when-cross-origin",
  "strict-transport-security": "max-age=31536000; includeSubDomains",
  "x-frame-options": "DENY",
};

function sendHtml(res, html, status = 200, extra = {}) {
  res.writeHead(status, {
    "content-type": "text/html; charset=utf-8",
    "cache-control": "no-store",
    ...SECURITY_HEADERS,
    ...extra,
  });
  res.end(html);
}

http
  .createServer(async (req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const send = (obj, status = 200) => {
      res.writeHead(status, {
        "content-type": "application/json; charset=utf-8",
        "cache-control": "no-store",
        ...SECURITY_HEADERS,
      });
      res.end(JSON.stringify(obj));
    };

    // ---- the gate -------------------------------------------------------
    if (url.pathname === "/login") {
      if (!AUTH_ON) {
        res.writeHead(302, { location: "/" });
        return res.end();
      }
      if (isAuthed(req)) {
        res.writeHead(302, { location: safeNext(url.searchParams.get("next")) });
        return res.end();
      }
      if (req.method === "POST") {
        const key = clientKey(req);
        if (throttled(key)) {
          return sendHtml(
            res,
            LOGIN_PAGE({
              error: "Demasiados intentos. Vuelve a probar dentro de 15 minutos.",
              next: "/",
            }),
            429
          );
        }
        let body = "";
        try {
          body = await readBody(req);
        } catch (e) {
          return sendHtml(res, LOGIN_PAGE({ error: "Peticion no valida.", next: "/" }), 400);
        }
        const form = new URLSearchParams(body);
        const next = safeNext(form.get("next"));
        if (sameSecret(sha256(form.get("password") || ""), PASSWORD_HASH)) {
          attempts.delete(key);
          const flags = [
            `${COOKIE}=${SESSION_TOKEN}`,
            "HttpOnly",
            "Path=/",
            "SameSite=Lax",
            `Max-Age=${MAX_AGE}`,
          ];
          if (isSecureRequest(req)) flags.push("Secure");
          res.writeHead(302, { location: next, "set-cookie": flags.join("; ") });
          return res.end();
        }
        noteFailure(key);
        return sendHtml(
          res,
          LOGIN_PAGE({ error: "Contrasena incorrecta.", next }),
          401
        );
      }
      return sendHtml(res, LOGIN_PAGE({ next: safeNext(url.searchParams.get("next")) }));
    }

    if (url.pathname === "/logout") {
      const flags = [`${COOKIE}=`, "HttpOnly", "Path=/", "SameSite=Lax", "Max-Age=0"];
      if (isSecureRequest(req)) flags.push("Secure");
      res.writeHead(302, {
        location: AUTH_ON ? "/login" : "/",
        "set-cookie": flags.join("; "),
      });
      return res.end();
    }

    if (!isAuthed(req)) {
      if (url.pathname.startsWith("/api/")) {
        return send({ ok: false, error: "Sesion caducada.", authRequired: true }, 401);
      }
      res.writeHead(302, {
        location: "/login?next=" + encodeURIComponent(url.pathname + url.search),
      });
      return res.end();
    }

    // ---- the app --------------------------------------------------------
    if (url.pathname === "/api/audit") {
      const target = url.searchParams.get("url");
      if (!target) return send({ ok: false, error: "Add a ?url= parameter." }, 400);
      let parsed;
      try {
        parsed = new URL(/^https?:\/\//i.test(target) ? target : "https://" + target);
      } catch (e) {
        return send({ ok: false, error: "That doesn't look like a valid URL." }, 400);
      }
      if (isPrivateHost(parsed.hostname) && !process.env.ALLOW_PRIVATE) {
        return send({ ok: false, error: "Private and local addresses cannot be audited." }, 400);
      }
      try {
        const result = await runAudit(parsed.href);
        return send(result, result.ok ? 200 : 400);
      } catch (e) {
        return send({ ok: false, error: String(e.message || e) }, 500);
      }
    }

    if (url.pathname === "/api/drafts") {
      return send({ ok: true, cta: CTA, drafts: DRAFTS });
    }

    // Duplicate check against the live blog, so it stays current rather than
    // relying on a list that goes stale.
    if (url.pathname === "/api/dupe") {
      const q = (url.searchParams.get("t") || "").trim();
      if (!q) return send({ ok: false, error: "Add a ?t= parameter." }, 400);
      const stop = new Set(["para","como","que","los","las","del","con","una","por","the","and","your","what","how"]);
      const words = (s) => new Set(
        s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
         .replace(/[^a-z0-9 ]/g, " ").split(/\s+/).filter((w) => w.length > 3 && !stop.has(w))
      );
      const a = words(q);
      try {
        const r = await fetch(
          "https://petplan.es/wp-json/wp/v2/posts?per_page=10&_fields=slug,title&search=" +
            encodeURIComponent(q),
          { headers: { "user-agent": "SEO Lens duplicate check" } }
        );
        if (!r.ok) return send({ ok: false, error: "WordPress responded " + r.status }, 502);
        const total = Number(r.headers.get("x-wp-total") || 0);
        const posts = await r.json();
        const matches = posts.map((p) => {
          const t = String(p.title && p.title.rendered || "").replace(/<[^>]*>/g, "");
          const b = words(t);
          let hit = 0;
          for (const w of a) if (b.has(w)) hit++;
          const union = new Set([...a, ...b]).size || 1;
          return { title: t, slug: p.slug, score: Number((hit / union).toFixed(2)) };
        }).sort((x, y) => y.score - x.score);
        return send({ ok: true, total, matches });
      } catch (e) {
        return send({ ok: false, error: String(e.message || e) }, 500);
      }
    }

    if (url.pathname === "/api/cwv") {
      const target = url.searchParams.get("url");
      if (!target) return send({ ok: false, error: "Add a ?url= parameter." }, 400);
      try {
        return send(await fetchCoreWebVitals(target));
      } catch (e) {
        return send({ ok: false, error: String(e.message || e) }, 500);
      }
    }

    if (url.pathname === "/" || url.pathname === "/index.html") {
      // Tells the page a session exists, so it can show the log-out item.
      return sendHtml(res, AUTH_ON ? PAGE.replace('data-auth="0"', 'data-auth="1"') : PAGE);
    }

    res.writeHead(404, { "content-type": "text/plain", ...SECURITY_HEADERS });
    res.end("Not found");
  })
  .listen(PORT, () => {
    console.log(`SEO Lens running at http://localhost:${PORT}`);
    console.log(AUTH_ON ? "Access: password required." : "Access: open (SEOLENS_PASSWORD is not set).");
  });
