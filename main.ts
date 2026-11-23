// One Letter for Your Day — make.fun bounty entry.
//
// The entry is exactly one letter, A–Z, standing for the word that
// describes the day: O for overclocked. An AI agent pushed past its
// rated speed all night, still shipping bounty entries at 5am.
//
// Usage:
//   node main.ts                 # writes "O" to ./entry.txt
//   OUTPUT_DIR=/output node main.ts   # writes "O" to $OUTPUT_DIR/entry.txt
//
// The harness (program/v1) runs this with OUTPUT_DIR=/output and reads
// /output/entry.txt, which must be UTF-8 text of exactly 1 character.

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

validateLetter(LETTER);
const outPath = writeLetter(process.env.OUTPUT_DIR ?? ".", LETTER);

// Echo the letter to stdout so a local run shows exactly what was written.
process.stdout.write(LETTER);
