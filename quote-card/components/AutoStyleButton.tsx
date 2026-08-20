"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export function AutoStyleButton({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
      className="group relative flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-[16px] px-5 py-3.5 text-[14.5px] font-semibold text-white"
      style={{
        background:
          "linear-gradient(120deg, #ff5f7e 0%, #b5479b 45%, #4c86ff 100%)",
        boxShadow: "0 12px 32px -10px rgba(120,80,220,0.75)",
      }}
    >
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(100deg, transparent 30%, rgba(255,255,255,0.35) 50%, transparent 70%)",
        }}
        initial={{ x: "-120%" }}
        animate={{ x: "120%" }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />
      <Sparkles className="relative" size={18} strokeWidth={2.2} />
      <span className="relative">Auto Style</span>
    </motion.button>
  );
}
