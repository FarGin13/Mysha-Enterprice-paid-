import type { IncomingMessage, ServerResponse } from "node:http";

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  const url = req.url ?? "";

  // Diagnostic marker — proves THIS build is the version actually running,
  // and shows what URL the function receives after Vercel's rewrite.
  if (url.includes("__diag")) {
    res.statusCode = 200;
    res.setHeader("content-type", "application/json");
    res.end(JSON.stringify({ ok: true, marker: "diag-v3", url }));
    return;
  }

  try {
    const mod = await import("../artifacts/api-server/src/app");
    const app = mod.default as unknown as (req: IncomingMessage, res: ServerResponse) => void;
    return app(req, res);
  } catch (err: unknown) {
    const e = err as { message?: string; stack?: string };
    console.error("[api] Initialization failed:", err);
    res.statusCode = 500;
    res.setHeader("content-type", "application/json");
    res.end(
      JSON.stringify({
        error: "API initialization failed",
        message: String(e?.message ?? err),
        stack: typeof e?.stack === "string" ? e.stack.split("\n").slice(0, 12) : undefined,
      }),
    );
  }
}
