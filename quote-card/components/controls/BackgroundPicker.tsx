"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { CardState } from "@/lib/types";
import { GRADIENTS, Gradient } from "@/lib/gradients";
import { Slider, Segmented } from "@/components/ui/Field";

export function gradientCss(g: Gradient): string {
  const stops = g.stops.map((s) => `${s.color} ${Math.round(s.at * 100)}%`);
  return `linear-gradient(${g.angle}deg, ${stops.join(", ")})`;
}

function readAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function BackgroundPicker({
  state,
  update,
}: {
  state: CardState;
  update: (patch: Partial<CardState>) => void;
}) {
  const [tab, setTab] = useState<"gradient" | "image">(state.bgType);

  const onDrop = useCallback(
    async (files: File[]) => {
      const file = files[0];
      if (!file) return;
      const src = await readAsDataUrl(file);
      update({ bgType: "image", image: { ...state.image, src } });
    },
    [state.image, update]
  );

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
    noClick: true,
    noKeyboard: true,
  });

  return (
    <div className="space-y-4">
      <Segmented<"gradient" | "image">
        options={[
          { value: "gradient", label: "Gradients" },
          { value: "image", label: "Custom image" },
        ]}
        value={tab}
        onChange={(v) => {
          setTab(v);
          if (v === "gradient") update({ bgType: "gradient" });
          else if (state.image.src) update({ bgType: "image" });
        }}
      />

      {tab === "gradient" ? (
        <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4">
          {GRADIENTS.map((g) => {
            const active =
              state.bgType === "gradient" && state.gradientId === g.id;
            return (
              <button
                key={g.id}
                type="button"
                title={g.name}
                onClick={() => update({ bgType: "gradient", gradientId: g.id })}
                className="group flex flex-col items-center gap-1.5"
              >
                <span
                  className={`aspect-square w-full rounded-[14px] transition ${
                    active
                      ? "ring-2 ring-[var(--blue)] ring-offset-2 ring-offset-[var(--surface)]"
                      : "ring-1 ring-[var(--line-2)] group-hover:ring-[var(--line-2)]"
                  }`}
                  style={{ background: gradientCss(g) }}
                />
                <span className="text-[10.5px] font-medium text-faint group-hover:text-muted">
                  {g.name}
                </span>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="space-y-4">
          <div
            {...getRootProps()}
            onClick={open}
            className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-[16px] border-2 border-dashed px-4 py-8 text-center transition ${
              isDragActive
                ? "border-[var(--blue)] bg-[rgba(76,134,255,0.08)]"
                : "border-[var(--line-2)] bg-[var(--ink-2)] hover:border-[var(--blue)]"
            }`}
          >
            <input {...getInputProps()} />
            <div className="text-[24px]">🖼️</div>
            <div className="text-[13px] font-medium text-text">
              {state.image.src ? "Replace image" : "Drop an image or tap to upload"}
            </div>
            <div className="text-[11.5px] text-faint">PNG or JPG · stays on your device</div>
          </div>

          {state.image.src && (
            <div className="space-y-4">
              <Slider
                label="Blur"
                value={state.image.blur}
                min={0}
                max={24}
                step={1}
                format={(v) => `${v}px`}
                onChange={(v) =>
                  update({ image: { ...state.image, blur: v } })
                }
              />
              <Slider
                label="Brightness"
                value={state.image.brightness}
                min={0.3}
                max={1.4}
                step={0.01}
                format={(v) => `${Math.round(v * 100)}%`}
                onChange={(v) =>
                  update({ image: { ...state.image, brightness: v } })
                }
              />
              <Slider
                label="Dark overlay"
                value={state.image.overlay}
                min={0}
                max={0.85}
                step={0.01}
                format={(v) => `${Math.round(v * 100)}%`}
                onChange={(v) =>
                  update({ image: { ...state.image, overlay: v } })
                }
              />
              <button
                type="button"
                onClick={() =>
                  update({
                    bgType: "gradient",
                    image: { ...state.image, src: null },
                  })
                }
                className="text-[12px] font-medium text-faint underline decoration-[var(--line-2)] underline-offset-2 hover:text-muted"
              >
                Remove image
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
