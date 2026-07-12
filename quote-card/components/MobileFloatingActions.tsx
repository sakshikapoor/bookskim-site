"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Download, Sparkles } from "lucide-react";
import { CardState } from "@/lib/types";
import { exportPng } from "@/lib/exportPng";

/**
 * Mobile-only floating actions layered over the preview:
 *  - Export (download) at the top-left
 *  - Auto Style (randomizer) at the top-right
 */
export function MobileFloatingActions({
  state,
  onAuto,
}: {
  state: CardState;
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

  const glass: React.CSSProperties = {
    background: "rgba(30,27,38,0.72)",
    backdropFilter: "blur(16px)",
    boxShadow: "0 10px 26px -10px rgba(0,0,0,0.7)",
  };

  return (
    <div className="lg:hidden">
      <motion.button
        type="button"
        onClick={doExport}
        disabled={busy}
        whileTap={{ scale: 0.92 }}
        aria-label="Download PNG"
        className="fixed left-4 top-[80px] z-30 grid h-12 w-12 place-items-center rounded-full border border-[var(--line-2)] text-text"
        style={glass}
      >
        {busy ? (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
        ) : (
          <Download size={20} strokeWidth={2} />
        )}
      </motion.button>

      <motion.button
        type="button"
        onClick={onAuto}
        whileTap={{ scale: 0.92 }}
        aria-label="Auto style"
        className="fixed right-4 top-[80px] z-30 grid h-12 w-12 place-items-center rounded-full text-white"
        style={{
          background:
            "linear-gradient(120deg, #ff5f7e 0%, #b5479b 50%, #4c86ff 100%)",
          boxShadow: "0 10px 26px -6px rgba(120,80,220,0.8)",
        }}
      >
        <Sparkles size={20} strokeWidth={2} />
      </motion.button>
    </div>
  );
}
