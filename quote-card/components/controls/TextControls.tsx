"use client";

import { CardState, TextAlign } from "@/lib/types";
import { Field, Slider, Segmented } from "@/components/ui/Field";

const SWATCHES = [
  "#ffffff",
  "#fdfbf7",
  "#f4f1ff",
  "#ffe9d6",
  "#1c1626",
  "#241a2e",
  "#2a2016",
  "#20303a",
];

const inputClass =
  "w-full rounded-[12px] border border-[var(--line)] bg-[var(--ink-2)] px-3.5 py-2.5 text-[14px] text-text placeholder:text-faint outline-none transition focus:border-[var(--blue)]";

export function TextControls({
  state,
  update,
}: {
  state: CardState;
  update: (patch: Partial<CardState>) => void;
}) {
  return (
    <div className="space-y-5">
      <Field label="Quote">
        <textarea
          value={state.quote}
          onChange={(e) => update({ quote: e.target.value })}
          rows={4}
          placeholder="Paste or type a quote…"
          className={`${inputClass} resize-none leading-relaxed`}
        />
      </Field>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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

      <Segmented<TextAlign>
        label="Alignment"
        value={state.align}
        onChange={(v) => update({ align: v })}
        options={[
          { value: "left", label: "Left" },
          { value: "center", label: "Center" },
          { value: "right", label: "Right" },
        ]}
      />

      <Field label="Text color">
        <div className="flex flex-wrap items-center gap-2">
          {SWATCHES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => update({ textColor: c })}
              aria-label={`Use ${c}`}
              className={`h-8 w-8 rounded-full transition ${
                state.textColor.toLowerCase() === c.toLowerCase()
                  ? "ring-2 ring-[var(--blue)] ring-offset-2 ring-offset-[var(--surface)]"
                  : "ring-1 ring-[var(--line-2)]"
              }`}
              style={{ background: c }}
            />
          ))}
          <label
            className="relative h-8 w-8 cursor-pointer overflow-hidden rounded-full ring-1 ring-[var(--line-2)]"
            title="Custom color"
            style={{
              background:
                "conic-gradient(#ff5f7e,#ffc24b,#7bd6a6,#4c86ff,#b5479b,#ff5f7e)",
            }}
          >
            <input
              type="color"
              value={state.textColor}
              onChange={(e) => update({ textColor: e.target.value })}
              className="absolute inset-0 cursor-pointer opacity-0"
            />
          </label>
        </div>
      </Field>

      <Slider
        label="Font size"
        value={state.fontSize}
        min={32}
        max={100}
        step={1}
        format={(v) => `${v}px`}
        onChange={(v) => update({ fontSize: v })}
      />
      <Slider
        label="Quote width"
        value={state.quoteWidthPct}
        min={0.45}
        max={0.9}
        step={0.01}
        format={(v) => `${Math.round(v * 100)}%`}
        onChange={(v) => update({ quoteWidthPct: v })}
      />
      <Slider
        label="Line height"
        value={state.lineHeight}
        min={1.05}
        max={1.8}
        step={0.01}
        format={(v) => v.toFixed(2)}
        onChange={(v) => update({ lineHeight: v })}
      />
      <Slider
        label="Letter spacing"
        value={state.letterSpacing}
        min={-2}
        max={8}
        step={0.5}
        format={(v) => `${v}px`}
        onChange={(v) => update({ letterSpacing: v })}
      />

      <label className="flex cursor-pointer items-center justify-between rounded-[12px] border border-[var(--line)] bg-[var(--ink-2)] px-4 py-3">
        <span className="text-[13px] font-medium text-text">
          Quotation marks
        </span>
        <span
          className={`relative h-6 w-11 rounded-full transition ${
            state.showQuoteMarks ? "bg-[var(--blue-brand)]" : "bg-[var(--line-2)]"
          }`}
        >
          <input
            type="checkbox"
            checked={state.showQuoteMarks}
            onChange={(e) => update({ showQuoteMarks: e.target.checked })}
            className="sr-only"
          />
          <span
            className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${
              state.showQuoteMarks ? "left-[22px]" : "left-0.5"
            }`}
          />
        </span>
      </label>
    </div>
  );
}
