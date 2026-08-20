/**
 * Splits text the way the app's Fast Skim mode does: the first part of each
 * word gets bolded, so the eye has an anchor to land on.
 */
export type Piece = { head: string; tail: string } | string;

function headLength(word: string): number {
  const n = word.length;
  if (n <= 1) return n;
  if (n <= 3) return 1;
  if (n <= 6) return 2;
  if (n <= 9) return 3;
  return Math.ceil(n * 0.4);
}

export function skim(text: string): Piece[] {
  const out: Piece[] = [];
  // Keep separators so spacing and punctuation survive the round trip.
  for (const token of text.split(/(\s+)/)) {
    if (!token) continue;
    if (/^\s+$/.test(token)) {
      out.push(token);
      continue;
    }
    const m = token.match(/^([^\p{L}\p{N}]*)([\p{L}\p{N}'’-]*)(.*)$/u);
    if (!m || !m[2]) {
      out.push(token);
      continue;
    }
    const [, lead, word, trail] = m;
    const k = headLength(word);
    if (lead) out.push(lead);
    out.push({ head: word.slice(0, k), tail: word.slice(k) });
    if (trail) out.push(trail);
  }
  return out;
}
