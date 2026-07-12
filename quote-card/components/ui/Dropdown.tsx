"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ReactNode,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

interface Placement {
  left: number;
  width: number;
  maxHeight: number;
  openUp: boolean;
  /** set when opening downward (distance from viewport top) */
  top?: number;
  /** set when opening upward (distance from viewport bottom) */
  bottom?: number;
}

/**
 * A custom dropdown whose menu is rendered in a portal with fixed positioning,
 * so it is never clipped by scrolling/overflow containers (accordion panels,
 * bottom sheets). Flips upward when there isn't room below.
 */
export function Dropdown({
  trigger,
  children,
  ariaLabel,
}: {
  trigger: ReactNode;
  children: (close: () => void) => ReactNode;
  ariaLabel?: string;
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [pos, setPos] = useState<Placement | null>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  const place = () => {
    const btn = btnRef.current;
    if (!btn) return;
    const r = btn.getBoundingClientRect();
    const gap = 6;
    const spaceBelow = window.innerHeight - r.bottom - 12;
    const spaceAbove = r.top - 12;
    const openUp = spaceBelow < 240 && spaceAbove > spaceBelow;
    const maxHeight = Math.min(
      300,
      Math.max(150, openUp ? spaceAbove : spaceBelow)
    );
    setPos({
      left: r.left,
      width: r.width,
      maxHeight,
      openUp,
      ...(openUp
        ? { bottom: window.innerHeight - (r.top - gap) }
        : { top: r.bottom + gap }),
    });
  };

  useLayoutEffect(() => {
    if (open) place();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      const t = e.target as Node;
      if (btnRef.current?.contains(t) || menuRef.current?.contains(t)) return;
      setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const close = () => setOpen(false);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", close);
    window.addEventListener("scroll", close, true);
    return () => {
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", close);
      window.removeEventListener("scroll", close, true);
    };
  }, [open]);

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-2 rounded-[12px] border border-[var(--line)] bg-[var(--ink-2)] px-3.5 py-2.5 text-[14px] text-text transition hover:border-[var(--line-2)]"
      >
        <span className="flex min-w-0 items-center gap-2.5">{trigger}</span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          className={`flex-shrink-0 text-faint transition-transform ${
            open ? "rotate-180" : ""
          }`}
        >
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && pos && (
              <motion.div
                ref={menuRef}
                role="listbox"
                initial={{ opacity: 0, y: pos.openUp ? 6 : -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: pos.openUp ? 6 : -6 }}
                transition={{ duration: 0.14 }}
                className="panel-scroll fixed z-[100] overflow-y-auto rounded-[14px] border border-[var(--line-2)] p-1.5 shadow-[0_18px_44px_-12px_rgba(0,0,0,0.75)]"
                style={{
                  left: pos.left,
                  top: pos.top,
                  bottom: pos.bottom,
                  width: pos.width,
                  maxHeight: pos.maxHeight,
                  background: "var(--surface-2)",
                }}
              >
                {children(() => setOpen(false))}
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}

export function Check() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      className="flex-shrink-0 text-[var(--blue-lt)]"
    >
      <path
        d="M5 12l5 5 9-10"
        stroke="currentColor"
        strokeWidth="2.4"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
