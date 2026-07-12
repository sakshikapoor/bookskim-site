"use client";

import { ReactNode } from "react";
import { CardState } from "@/lib/types";
import { TextControls } from "./controls/TextControls";
import { FontPicker } from "./controls/FontPicker";
import { BackgroundPicker } from "./controls/BackgroundPicker";
import { AutoStyleButton } from "./AutoStyleButton";
import { ExportButton } from "./ExportButton";

function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="border-t border-[var(--line)] pt-6 first:border-t-0 first:pt-0">
      <h2 className="mb-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-muted">
        {title}
      </h2>
      {children}
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
  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-col gap-2.5 pb-5">
        <AutoStyleButton onClick={onAuto} />
        <ExportButton state={state} />
      </div>
      <div className="panel-scroll flex-1 space-y-6 overflow-y-auto pr-1">
        <Section title="Text">
          <TextControls state={state} update={update} />
        </Section>
        <Section title="Font">
          <FontPicker state={state} update={update} />
        </Section>
        <Section title="Background">
          <BackgroundPicker state={state} update={update} />
        </Section>
      </div>
    </div>
  );
}
