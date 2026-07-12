"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { CardState } from "@/lib/types";
import { exportPng } from "@/lib/exportPng";

export function ExportButton({
  state,
  className,
}: {
  state: CardState;
  className?: string;
}) {
  const [busy, setBusy] = useState(false);

  const handle = async () => {
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
    <motion.button
      type="button"
      onClick={handle}
      disabled={busy}
      whileTap={{ scale: 0.98 }}
      className={`flex w-full items-center justify-center gap-2.5 rounded-[16px] bg-[var(--blue-brand)] px-5 py-3.5 text-[14.5px] font-semibold text-white shadow-[0_12px_30px_-10px_rgba(46,107,246,0.85)] transition hover:brightness-110 disabled:opacity-70 ${
        className ?? ""
      }`}
    >
      {busy ? (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
      ) : (
        <Download size={17} strokeWidth={2.2} />
      )}
      {busy ? "Rendering…" : "Download PNG"}
      <span className="text-[11px] font-medium opacity-70">1080×1080</span>
    </motion.button>
  );
}
