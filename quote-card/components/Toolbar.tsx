"use client";

import { ReactNode, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CardState } from "@/lib/types";
import { ValueControls } from "./controls/ValueControls";
import { TextControls } from "./controls/TextControls";
import { BackgroundPicker } from "./controls/BackgroundPicker";
import { AutoStyleButton } from "./AutoStyleButton";
import { ExportButton } from "./ExportButton";

export type SectionId = "value" | "text" | "background";

export const SECTIONS: { id: SectionId; title: string }[] = [
  { id: "value", title: "Value" },
  { id: "text", title: "Text" },
  { id: "background", title: "Background" },
];

function AccordionSection({
  title,
  open,
  onToggle,
  children,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: ReactNode;
}) {
  // keep content clipped while animating, then let dropdowns overflow freely
  const [overflow, setOverflow] = useState<"hidden" | "visible">(
    open ? "visible" : "hidden"
  );
  useEffect(() => {
    if (!open) setOverflow("hidden");
  }, [open]);

  return (
    <section className="overflow-hidden rounded-[16px] border border-[var(--line)] bg-[var(--ink-2)]">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between px-4 py-3.5 text-left transition hover:bg-[var(--surface)]"
      >
        <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-text">
          {title}
        </span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          className={`text-faint transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        style={{ overflow }}
        onAnimationComplete={() => open && setOverflow("visible")}
      >
        <div className="px-4 pb-5 pt-1">{children}</div>
      </motion.div>
    </section>
  );
}

export function Toolbar({
  state,
  update,
  onAuto,
}: {
  state: CardState;
  update: (patch: Partial<CardState>) => void;
  onAuto: () => void;
}) {
  const [open, setOpen] = useState<SectionId | null>("value");

  const render = (id: SectionId) => {
    if (id === "value") return <ValueControls state={state} update={update} />;
    if (id === "text") return <TextControls state={state} update={update} />;
    return <BackgroundPicker state={state} update={update} />;
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-col gap-2.5 pb-5">
        <AutoStyleButton onClick={onAuto} />
        <ExportButton state={state} />
      </div>
      <div className="panel-scroll flex-1 space-y-2.5 overflow-y-auto pr-1">
        {SECTIONS.map((s) => (
          <AccordionSection
            key={s.id}
            title={s.title}
            open={open === s.id}
            onToggle={() => setOpen((cur) => (cur === s.id ? null : s.id))}
          >
            {render(s.id)}
          </AccordionSection>
        ))}
      </div>
    </div>
  );
}
