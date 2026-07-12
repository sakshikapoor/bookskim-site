"use client";

import { Minus, Plus } from "lucide-react";
import { Labeled } from "./Field";

/** A compact numeric input with −/+ increment controls (space-saving on mobile). */
export function Stepper({
  label,
  value,
  min,
  max,
  step = 1,
  suffix,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  suffix?: string;
  onChange: (v: number) => void;
}) {
  const clamp = (v: number) => Math.min(max, Math.max(min, v));
  const set = (v: number) => onChange(clamp(Math.round(v)));

  return (
    <Labeled label={label}>
      <div className="flex items-stretch overflow-hidden rounded-[12px] border border-[var(--line)] bg-[var(--ink-2)]">
        <button
          type="button"
          aria-label={`Decrease ${label}`}
          onClick={() => set(value - step)}
          disabled={value <= min}
          className="grid w-11 flex-shrink-0 place-items-center text-muted transition hover:bg-[var(--surface)] hover:text-text disabled:opacity-40"
        >
          <Minus size={16} strokeWidth={2.4} />
        </button>
        <div className="flex flex-1 items-center justify-center border-x border-[var(--line)]">
          <input
            type="number"
            inputMode="numeric"
            value={value}
            min={min}
            max={max}
            step={step}
            onChange={(e) => {
              const n = parseInt(e.target.value, 10);
              if (!Number.isNaN(n)) set(n);
            }}
            className="w-full [appearance:textfield] bg-transparent py-2 text-center text-[14px] font-medium text-text outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
          {suffix && (
            <span className="pr-2 text-[12px] text-faint">{suffix}</span>
          )}
        </div>
        <button
          type="button"
          aria-label={`Increase ${label}`}
          onClick={() => set(value + step)}
          disabled={value >= max}
          className="grid w-11 flex-shrink-0 place-items-center text-muted transition hover:bg-[var(--surface)] hover:text-text disabled:opacity-40"
        >
          <Plus size={16} strokeWidth={2.4} />
        </button>
      </div>
    </Labeled>
  );
}
