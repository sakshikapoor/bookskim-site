"use client";

import { ReactNode } from "react";

export function Field({
  label,
  value,
  children,
}: {
  label: string;
  value?: ReactNode;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[12px] font-medium uppercase tracking-[0.12em] text-faint">
          {label}
        </span>
        {value != null && (
          <span className="text-[12px] font-medium text-muted tabular-nums">
            {value}
          </span>
        )}
      </div>
      {children}
    </label>
  );
}

/** A labeled block for non-<input> controls (dropdowns, custom pickers). */
export function Labeled({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div>
      <div className="mb-2 text-[12px] font-medium uppercase tracking-[0.12em] text-faint">
        {label}
      </div>
      {children}
    </div>
  );
}

export function Slider({
  label,
  value,
  min,
  max,
  step,
  format,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  format?: (v: number) => string;
  onChange: (v: number) => void;
}) {
  return (
    <Field label={label} value={format ? format(value) : value}>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
      />
    </Field>
  );
}

export function Segmented<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label?: string;
  options: { value: T; label: ReactNode; title?: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div>
      {label && (
        <div className="mb-2 text-[12px] font-medium uppercase tracking-[0.12em] text-faint">
          {label}
        </div>
      )}
      <div className="flex gap-1 rounded-[14px] border border-[var(--line)] bg-[var(--ink-2)] p-1">
        {options.map((opt) => {
          const active = opt.value === value;
          return (
            <button
              key={opt.value}
              type="button"
              title={opt.title}
              onClick={() => onChange(opt.value)}
              className={`flex-1 rounded-[10px] px-3 py-2 text-[13px] font-medium transition ${
                active
                  ? "bg-[var(--surface-2)] text-text shadow-[0_2px_8px_rgba(0,0,0,0.35)]"
                  : "text-muted hover:text-text"
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
