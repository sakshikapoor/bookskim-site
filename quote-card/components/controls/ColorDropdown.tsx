"use client";

import { CardState } from "@/lib/types";
import { Labeled } from "@/components/ui/Field";
import { Dropdown, Check } from "@/components/ui/Dropdown";

const COLORS: { value: string; name: string }[] = [
  { value: "#ffffff", name: "White" },
  { value: "#fdfbf7", name: "Ivory" },
  { value: "#f4f1ff", name: "Lilac Tint" },
  { value: "#ffe9d6", name: "Peach Tint" },
  { value: "#1c1626", name: "Ink" },
  { value: "#241a2e", name: "Plum" },
  { value: "#2a2016", name: "Espresso" },
  { value: "#20303a", name: "Slate" },
];

function nameFor(hex: string): string {
  const found = COLORS.find((c) => c.value.toLowerCase() === hex.toLowerCase());
  return found ? found.name : hex.toUpperCase();
}

function Swatch({ color }: { color: string }) {
  return (
    <span
      className="h-5 w-5 flex-shrink-0 rounded-full ring-1 ring-[var(--line-2)]"
      style={{ background: color }}
    />
  );
}

export function ColorDropdown({
  state,
  update,
}: {
  state: CardState;
  update: (patch: Partial<CardState>) => void;
}) {
  return (
    <Labeled label="Text color">
      <Dropdown
        ariaLabel="Text color"
        trigger={
          <>
            <Swatch color={state.textColor} />
            <span className="truncate text-[14px]">{nameFor(state.textColor)}</span>
          </>
        }
      >
        {(close) => (
          <>
            {COLORS.map((c) => {
              const active = c.value.toLowerCase() === state.textColor.toLowerCase();
              return (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => {
                    update({ textColor: c.value });
                    close();
                  }}
                  className={`flex w-full items-center gap-2.5 rounded-[10px] px-3 py-2.5 text-left transition ${
                    active ? "bg-[var(--surface)]" : "hover:bg-[var(--surface)]"
                  }`}
                >
                  <Swatch color={c.value} />
                  <span className="text-[13.5px] text-text">{c.name}</span>
                  {active && <span className="ml-auto"><Check /></span>}
                </button>
              );
            })}
            <label className="mt-1 flex cursor-pointer items-center gap-2.5 rounded-[10px] border-t border-[var(--line)] px-3 py-2.5 hover:bg-[var(--surface)]">
              <span
                className="h-5 w-5 flex-shrink-0 rounded-full ring-1 ring-[var(--line-2)]"
                style={{
                  background:
                    "conic-gradient(#ff5f7e,#ffc24b,#7bd6a6,#4c86ff,#b5479b,#ff5f7e)",
                }}
              />
              <span className="text-[13.5px] text-text">Custom…</span>
              <input
                type="color"
                value={state.textColor}
                onChange={(e) => update({ textColor: e.target.value })}
                className="ml-auto h-7 w-9 cursor-pointer rounded border-none bg-transparent p-0"
              />
            </label>
          </>
        )}
      </Dropdown>
    </Labeled>
  );
}
