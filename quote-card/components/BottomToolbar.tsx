"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CardState } from "@/lib/types";
import { exportPng } from "@/lib/exportPng";

function Item({
  icon,
  label,
  onClick,
}: {
  icon: string;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-1 flex-col items-center gap-1 py-1 text-muted transition active:scale-95"
    >
      <span className="text-[19px]">{icon}</span>
      <span className="text-[10.5px] font-medium">{label}</span>
    </button>
  );
}

export function BottomToolbar({
  state,
  onText,
  onBackground,
  onAuto,
}: {
  state: CardState;
  onText: () => void;
  onBackground: () => void;
  onAuto: () => void;
}) {
  const [busy, setBusy] = useState(false);

  const doExport = async () => {
    if (busy) return;
    setBusy(true);
    try {
      await exportPng(state);
    } catch (err) {
      console.error(err);
      alert("Sorry — the export failed. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-30 flex items-center gap-1 px-3 pb-[calc(env(safe-area-inset-bottom)+10px)] pt-2.5"
      style={{
        background:
          "linear-gradient(to top, rgba(19,17,23,0.96) 55%, rgba(19,17,23,0))",
      }}
    >
      <div
        className="mx-auto flex w-full max-w-md items-center gap-1 rounded-[20px] border border-[var(--line-2)] px-2 py-1.5"
        style={{
          background: "rgba(30,27,38,0.82)",
          backdropFilter: "blur(18px)",
          boxShadow: "0 12px 30px -12px rgba(0,0,0,0.7)",
        }}
      >
        <Item icon="🅣" label="Text" onClick={onText} />
        <Item icon="🎨" label="Background" onClick={onBackground} />

        <motion.button
          type="button"
          onClick={onAuto}
          whileTap={{ scale: 0.92 }}
          aria-label="Auto style"
          className="mx-1 grid h-12 w-12 flex-shrink-0 place-items-center rounded-full text-[20px] text-white"
          style={{
            background:
              "linear-gradient(120deg, #ff5f7e 0%, #b5479b 50%, #4c86ff 100%)",
            boxShadow: "0 8px 22px -6px rgba(120,80,220,0.8)",
          }}
        >
          ✨
        </motion.button>

        <button
          type="button"
          onClick={doExport}
          className="flex flex-1 flex-col items-center gap-1 py-1 text-muted transition active:scale-95"
        >
          <span className="text-[19px]">
            {busy ? (
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white align-middle" />
            ) : (
              "⬇"
            )}
          </span>
          <span className="text-[10.5px] font-medium">Export</span>
        </button>
      </div>
    </div>
  );
}
