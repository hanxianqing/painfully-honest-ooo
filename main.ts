import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The Painfully Honest Out-of-Office: one sentence, at most 200 characters.
// Fresh angle: the honest truth is not "I'm on holiday" but the inbox
// itself — 312 unread emails left behind on purpose, with a polite
// request to resend anything urgent because the backlog will never
// be read. Honest, specific, and still professional enough to stand.
const LINE =
  "I'm away until Monday, ignoring the 312 unread emails I left behind on purpose — please resend anything urgent, as the backlog and I have agreed never to speak again.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
// Gate self-check: the entry must be one sentence of 1–200 UTF-8
// characters, not only whitespace.
if (LINE.length < 1 || LINE.length > 200 || LINE.trim().length === 0) {
  throw new Error(`entry line must be 1-200 characters, got ${LINE.length}`);
}
if (LINE.split(".").length - 1 > 1) {
  throw new Error("entry must be a single sentence");
}
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
