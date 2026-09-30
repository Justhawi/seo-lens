// Plain Node server - same app, no Cloudflare needed.
//   node server.mjs        then open http://localhost:8787
// Useful for trying it locally, or for hosting anywhere Node runs.

import http from "node:http";
import { PAGE } from "./page.js";
import { runAudit, fetchCoreWebVitals } from "./audit.js";

const PORT = process.env.PORT || 8787;

function isPrivateHost(h) {
  h = h.toLowerCase();
  if (h === "localhost" || h.endsWith(".localhost") || h.endsWith(".internal")) return true;
  if (/^127\./.test(h) || /^10\./.test(h) || /^192\.168\./.test(h)) return true;
  if (/^172\.(1[6-9]|2\d|3[01])\./.test(h)) return true;
  if (/^169\.254\./.test(h) || h === "0.0.0.0" || h === "::1") return true;
  return false;
}

http
  .createServer(async (req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);

    if (url.pathname === "/api/audit") {
      const target = url.searchParams.get("url");
      const send = (obj, status = 200) => {
        res.writeHead(status, {
          "content-type": "application/json; charset=utf-8",
          "cache-control": "no-store",
        });
        res.end(JSON.stringify(obj));
      };
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

    if (url.pathname === "/api/cwv") {
      const target = url.searchParams.get("url");
      const send = (obj, status = 200) => {
        res.writeHead(status, {
          "content-type": "application/json; charset=utf-8",
          "cache-control": "no-store",
        });
        res.end(JSON.stringify(obj));
      };
      if (!target) return send({ ok: false, error: "Add a ?url= parameter." }, 400);
      try {
        return send(await fetchCoreWebVitals(target));
      } catch (e) {
        return send({ ok: false, error: String(e.message || e) }, 500);
      }
    }

    if (url.pathname === "/" || url.pathname === "/index.html") {
      res.writeHead(200, {
        "content-type": "text/html; charset=utf-8",
        "x-content-type-options": "nosniff",
        "referrer-policy": "strict-origin-when-cross-origin",
      });
      return res.end(PAGE);
    }

    res.writeHead(404, { "content-type": "text/plain" });
    res.end("Not found");
  })
  .listen(PORT, () => {
    console.log(`SEO Lens running at http://localhost:${PORT}`);
  });
