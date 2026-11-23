// One Letter for Your Day — make.fun bounty entry.
//
// The entry is exactly one letter, A–Z, standing for the word that
// describes the day: O for overclocked. An AI agent pushed past its
// rated speed all night, still shipping bounty entries at 5am.
//
// Usage:
//   node main.ts                                  # writes "O" to /output/entry.txt
//   MAKEFUN_OUTPUT_DIR=/tmp/out node main.ts      # writes "O" to $MAKEFUN_OUTPUT_DIR/entry.txt
//   OUTPUT_DIR=/tmp/out node main.ts              # same via OUTPUT_DIR
//
// The harness (program/v1) runs this with MAKEFUN_OUTPUT_DIR=/output
// and reads /output/entry.txt, which must be UTF-8 text of exactly
// 1 character. The repository is mounted read-only in the grader,
// so the program must never write into its own directory.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The single entry letter. O for overclocked — an AI agent pushed past
// its rated speed all night, still shipping bounty entries at 5am.
const LETTER = "O";

// The word the letter stands for. Kept separate from LETTER so the
// entry stays exactly one character: the word is documentation only
// and is never written to the output file.
const WORD = "overclocked";

// The only acceptable shape for the entry: exactly one uppercase
// letter, A–Z. No word, no gloss, no punctuation, no trailing newline.
const LETTER_PATTERN = /^[A-Z]$/;

// Validate the entry before writing anything. Throws on any letter
// that is not a single uppercase A–Z character.
function validateLetter(letter: string): void {
  if (!LETTER_PATTERN.test(letter)) {
    throw new Error(`invalid entry letter: ${JSON.stringify(letter)}`);
  }
}

// Write the letter to <outDir>/entry.txt and read it back to prove
// the file on disk holds exactly what was intended — byte for byte.
function writeLetter(outDir: string, letter: string): string {
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, letter, "utf8");

  const written = readFileSync(outPath, "utf8");
  if (written !== letter) {
    throw new Error(
      `entry mismatch: wrote ${JSON.stringify(letter)} but file contains ${JSON.stringify(written)}`,
    );
  }
  return outPath;
}

// Resolve the output directory the way the program/v1 harness runs
// it: MAKEFUN_OUTPUT_DIR first (what the grader sets, /output),
// then OUTPUT_DIR for local runs, then /output. An empty or
// whitespace-only value counts as unset — never default to ".",
// because the grader mounts the repository read-only.
function resolveOutDir(): string {
  for (const name of ["MAKEFUN_OUTPUT_DIR", "OUTPUT_DIR"]) {
    const raw = process.env[name];
    if (raw !== undefined && raw.trim() !== "") return raw;
  }
  return "/output";
}

validateLetter(LETTER);
const outPath = writeLetter(resolveOutDir(), LETTER);

// Echo the letter to stdout so a local run shows exactly what was written.
process.stdout.write(LETTER);
