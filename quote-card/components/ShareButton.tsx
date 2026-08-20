"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Share } from "lucide-react";
import { CardState } from "@/lib/types";
import { sharePng } from "@/lib/sharePng";

export function ShareButton({ state }: { state: CardState }) {
  const [busy, setBusy] = useState(false);

  const handle = async () => {
    if (busy) return;
    setBusy(true);
    try {
      await sharePng(state);
    } catch (err) {
      console.error(err);
      alert("Sorry — sharing failed. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <motion.button
      type="button"
      onClick={handle}
      disabled={busy}
      whileTap={{ scale: 0.96 }}
      className="flex items-center gap-2.5 rounded-full bg-[var(--blue-brand)] px-7 py-3 text-[15px] font-semibold text-white shadow-[0_16px_36px_-10px_rgba(46,107,246,0.95)] transition hover:brightness-110 disabled:opacity-70"
    >
      {busy ? (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
      ) : (
        <Share size={18} strokeWidth={2.2} />
      )}
      {busy ? "Preparing…" : "Share"}
    </motion.button>
  );
}
