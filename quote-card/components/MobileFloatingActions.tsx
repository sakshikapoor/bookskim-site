"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

/**
 * Mobile-only floating action: Auto Style (randomizer) at the top-right,
 * layered over the preview. Sharing lives in the centered button below the card.
 */
export function MobileFloatingActions({ onAuto }: { onAuto: () => void }) {
  return (
    <div className="lg:hidden">
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
