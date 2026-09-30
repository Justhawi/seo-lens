// Cloudflare Worker entry point.
// GET /                  -> the UI
// GET /api/audit?url=... -> JSON audit (server-side fetch, so no CORS limits)

import { PAGE } from "./page.js";
import { runAudit, fetchCoreWebVitals } from "./audit.js";

const json = (obj, status = 200) =>
  new Response(JSON.stringify(obj), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });

// Block obvious attempts to point the auditor at private network addresses.
function isPrivateHost(hostname) {
  const h = hostname.toLowerCase();
  if (h === "localhost" || h.endsWith(".localhost") || h.endsWith(".internal")) return true;
  if (/^127\./.test(h) || /^10\./.test(h) || /^192\.168\./.test(h)) return true;
  if (/^172\.(1[6-9]|2\d|3[01])\./.test(h)) return true;
  if (h === "0.0.0.0" || h === "::1" || h === "[::1]") return true;
  if (/^169\.254\./.test(h)) return true;
  return false;
}

export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === "/api/audit") {
      const target = url.searchParams.get("url");
      if (!target) return json({ ok: false, error: "Add a ?url= parameter." }, 400);

      let parsed;
      try {
        parsed = new URL(/^https?:\/\//i.test(target) ? target : "https://" + target);
      } catch (e) {
        return json({ ok: false, error: "That doesn't look like a valid URL." }, 400);
      }
      if (isPrivateHost(parsed.hostname)) {
        return json({ ok: false, error: "Private and local addresses cannot be audited." }, 400);
      }

      try {
        const result = await runAudit(parsed.href);
        return json(result, result.ok ? 200 : 400);
      } catch (e) {
        return json({ ok: false, error: String((e && e.message) || e) }, 500);
      }
    }

    if (url.pathname === "/api/cwv") {
      const target = url.searchParams.get("url");
      if (!target) return json({ ok: false, error: "Add a ?url= parameter." }, 400);
      try {
        return json(await fetchCoreWebVitals(target));
      } catch (e) {
        return json({ ok: false, error: String((e && e.message) || e) }, 500);
      }
    }

    if (url.pathname === "/" || url.pathname === "/index.html") {
      return new Response(PAGE, {
        headers: {
          "content-type": "text/html; charset=utf-8",
          "cache-control": "public, max-age=300",
          "x-content-type-options": "nosniff",
          "referrer-policy": "strict-origin-when-cross-origin",
        },
      });
    }

    return new Response("Not found", { status: 404 });
  },
};
