import { CardState, DEFAULT_STATE, DEFAULT_IMAGE } from "./types";

const KEY = "bookskim.quote-card.v1";

/** Read the last-saved state, merged over defaults. Returns null if none. */
export function loadState(): CardState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<CardState>;
    return {
      ...DEFAULT_STATE,
      ...parsed,
      image: { ...DEFAULT_IMAGE, ...(parsed.image ?? {}) },
    };
  } catch {
    return null;
  }
}

/**
 * Persist state. We deliberately drop a custom image data URL — it can be
 * multiple MB and blow the localStorage quota; the rest of the styling is kept.
 */
export function saveState(state: CardState): void {
  if (typeof window === "undefined") return;
  try {
    const toStore: CardState = {
      ...state,
      image: { ...state.image, src: null },
    };
    window.localStorage.setItem(KEY, JSON.stringify(toStore));
  } catch {
    /* quota / private mode — non-fatal */
  }
}
