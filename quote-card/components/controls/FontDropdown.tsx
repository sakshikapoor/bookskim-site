"use client";

import { CardState } from "@/lib/types";
import { FONTS, getFont } from "@/lib/fonts";
import { Labeled } from "@/components/ui/Field";
import { Dropdown, Check } from "@/components/ui/Dropdown";

export function FontDropdown({
  state,
  update,
}: {
  state: CardState;
  update: (patch: Partial<CardState>) => void;
}) {
  const current = getFont(state.fontKey);
  return (
    <Labeled label="Font style">
      <Dropdown
        ariaLabel="Font style"
        trigger={
          <span
            className="truncate text-[15px]"
            style={{ fontFamily: current.family, fontWeight: current.quoteWeight }}
          >
            {current.label}
          </span>
        }
      >
        {(close) =>
          FONTS.map((f) => {
            const active = f.key === state.fontKey;
            return (
              <button
                key={f.key}
                type="button"
                onClick={() => {
                  update({ fontKey: f.key });
                  close();
                }}
                className={`flex w-full items-center justify-between gap-3 rounded-[10px] px-3 py-2.5 text-left transition ${
                  active ? "bg-[var(--surface)]" : "hover:bg-[var(--surface)]"
                }`}
              >
                <span
                  className="truncate text-[17px] text-text"
                  style={{ fontFamily: f.family, fontWeight: f.quoteWeight }}
                >
                  {f.label}
                </span>
                {active && <Check />}
              </button>
            );
          })
        }
      </Dropdown>
    </Labeled>
  );
}
