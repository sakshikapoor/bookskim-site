"use client";

import { CardState } from "@/lib/types";
import { FONTS } from "@/lib/fonts";

export function FontPicker({
  state,
  update,
}: {
  state: CardState;
  update: (patch: Partial<CardState>) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {FONTS.map((font) => {
        const active = font.key === state.fontKey;
        return (
          <button
            key={font.key}
            type="button"
            onClick={() => update({ fontKey: font.key })}
            className={`flex flex-col items-start gap-1 rounded-[14px] border px-3.5 py-3 text-left transition ${
              active
                ? "border-[var(--blue)] bg-[var(--surface-2)]"
                : "border-[var(--line)] bg-[var(--ink-2)] hover:border-[var(--line-2)]"
            }`}
          >
            <span
              className="text-[22px] leading-none text-text"
              style={{ fontFamily: font.family, fontWeight: font.quoteWeight }}
            >
              Ag
            </span>
            <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-faint">
              {font.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
