"use client";

import { CardState, TextAlign } from "@/lib/types";
import { Segmented } from "@/components/ui/Field";
import { Stepper } from "@/components/ui/Stepper";
import { FontDropdown } from "./FontDropdown";
import { ColorDropdown } from "./ColorDropdown";

export function TextControls({
  state,
  update,
}: {
  state: CardState;
  update: (patch: Partial<CardState>) => void;
}) {
  return (
    <div className="space-y-4 lg:space-y-5">
      <FontDropdown state={state} update={update} />

      <Stepper
        label="Font size"
        value={state.fontSize}
        min={32}
        max={100}
        step={2}
        suffix="px"
        onChange={(v) => update({ fontSize: v })}
      />

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

      <ColorDropdown state={state} update={update} />
    </div>
  );
}
