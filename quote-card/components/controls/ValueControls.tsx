"use client";

import { CardState } from "@/lib/types";
import { Field } from "@/components/ui/Field";

const inputClass =
  "w-full rounded-[12px] border border-[var(--line)] bg-[var(--ink-2)] px-3.5 py-2 text-[14px] text-text placeholder:text-faint outline-none transition focus:border-[var(--blue)] lg:py-2.5";

export function ValueControls({
  state,
  update,
}: {
  state: CardState;
  update: (patch: Partial<CardState>) => void;
}) {
  return (
    <div className="space-y-4 lg:space-y-5">
      <Field label="Quote">
        <textarea
          value={state.quote}
          onChange={(e) => update({ quote: e.target.value })}
          rows={3}
          placeholder="Paste or type a quote…"
          className={`${inputClass} resize-none leading-relaxed`}
        />
      </Field>

      <Field label="Book title">
        <input
          value={state.book}
          onChange={(e) => update({ book: e.target.value })}
          placeholder="Book"
          className={inputClass}
        />
      </Field>

      <Field label="Author">
        <input
          value={state.author}
          onChange={(e) => update({ author: e.target.value })}
          placeholder="Author"
          className={inputClass}
        />
      </Field>
    </div>
  );
}
