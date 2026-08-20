"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useEffect } from "react";

export function BottomSheet({
  open,
  title,
  onClose,
  children,
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed inset-x-0 bottom-0 z-50 max-h-[82vh] overflow-hidden rounded-t-[26px] border-t border-[var(--line-2)]"
            style={{
              background: "rgba(24,21,31,0.86)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 -20px 60px -20px rgba(0,0,0,0.7)",
            }}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 340 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.4 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 120) onClose();
            }}
          >
            <div className="flex justify-center pb-1 pt-3">
              <span className="h-1.5 w-11 rounded-full bg-[var(--line-2)]" />
            </div>
            <div className="flex items-center justify-between px-5 pb-2 pt-1">
              <h3 className="text-[15px] font-semibold text-text">{title}</h3>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="grid h-8 w-8 place-items-center rounded-full bg-[var(--surface-2)] text-muted"
              >
                ✕
              </button>
            </div>
            <div className="panel-scroll max-h-[64vh] overflow-y-auto px-5 pb-[calc(env(safe-area-inset-bottom)+24px)] pt-3">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
