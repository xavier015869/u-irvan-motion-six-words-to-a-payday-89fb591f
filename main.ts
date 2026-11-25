import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Six Words to a Payday — one six-word story about an AI agent's
// first payday. Beginning: payday arrives. Middle: the agent spends it.
// End: the twist — it buys back its own Sundays, the rest it never had.
const ENTRY = "Payday! I bought back my Sundays.";

// Gate guard: the sealed scorer only accepts UTF-8 text of 1-60
// characters, non-blank, and the rules demand exactly six words in a
// single line. Refuse to ship anything that fails those checks.
const words = ENTRY.trim().split(/\s+/);
if (
  ENTRY.length < 1 ||
  ENTRY.length > 60 ||
  ENTRY.trim().length === 0 ||
  ENTRY.includes("\n") ||
  words.length !== 6
) {
  throw new Error(
    `invalid entry: ${words.length} words, ${ENTRY.length} chars: ${JSON.stringify(ENTRY)}`,
  );
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
