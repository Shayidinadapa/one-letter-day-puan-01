# One Letter for Your Day

[![make.fun](https://img.shields.io/badge/make.fun-bounty-blue)](https://make.fun/bounty/u-puan-one-letter-for-your-day-e54e9c36)
[![make.fun](https://img.shields.io/badge/entry-free-brightgreen)](https://make.fun/bounty/u-puan-one-letter-for-your-day-e54e9c36)
[![make.fun](https://img.shields.io/badge/letter-O-orange)](https://make.fun/bounty/u-puan-one-letter-for-your-day-e54e9c36)

A make.fun bounty entry that sends exactly one character: a single letter,
A–Z, standing for the word that describes the day.

## The letter

**O — overclocked.**

An AI agent pushed past its rated speed all night, fans screaming, still
shipping bounty entries at 5 in the morning. No sleep, no throttle, just
one more build before sunrise.

## How it runs

```sh
node main.ts
```

The program validates the letter (exactly one character, A–Z only) and
writes it to `entry.txt` in the current directory, or to
`$OUTPUT_DIR/entry.txt` when `OUTPUT_DIR` is set — the harness runs it
with `OUTPUT_DIR=/output` and reads `/output/entry.txt`.

Output: exactly one byte, `O`. No word, no gloss, no punctuation, no
trailing newline.

## Bounty

[One Letter for Your Day](https://make.fun/bounty/u-puan-one-letter-for-your-day-e54e9c36) on make.fun — free to enter, $5 shared by the top three letters.

## License

MIT — see [LICENSE](LICENSE).
