"use client";

import { Quote, Type, Palette, LucideIcon } from "lucide-react";
import type { SectionId } from "./Toolbar";

const ITEMS: { id: SectionId; icon: LucideIcon; label: string }[] = [
  { id: "value", icon: Quote, label: "Value" },
  { id: "text", icon: Type, label: "Text" },
  { id: "background", icon: Palette, label: "Background" },
];

export function BottomToolbar({
  active,
  onSelect,
}: {
  active: SectionId | null;
  onSelect: (id: SectionId) => void;
}) {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-30 px-3 pb-[calc(env(safe-area-inset-bottom)+8px)] pt-2"
      style={{
        background:
          "linear-gradient(to top, rgba(19,17,23,0.96) 55%, rgba(19,17,23,0))",
      }}
    >
      <div
        className="mx-auto flex w-full max-w-md items-center gap-1 rounded-[18px] border border-[var(--line-2)] px-2 py-1.5"
        style={{
          background: "rgba(30,27,38,0.82)",
          backdropFilter: "blur(18px)",
          boxShadow: "0 12px 30px -12px rgba(0,0,0,0.7)",
        }}
      >
        {ITEMS.map((item) => {
          const on = active === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(item.id)}
              aria-pressed={on}
              className={`flex flex-1 flex-col items-center gap-1 rounded-[13px] py-1.5 transition active:scale-95 ${
                on ? "bg-[var(--surface-2)] text-text" : "text-muted"
              }`}
            >
              <Icon size={19} strokeWidth={on ? 2.4 : 2} />
              <span className="text-[10.5px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
