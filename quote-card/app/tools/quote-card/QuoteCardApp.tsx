"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { CardState, DEFAULT_STATE } from "@/lib/types";
import { autoStyle, randomInitialGradientId } from "@/lib/autoStyle";
import { loadState, saveState } from "@/lib/storage";
import { QuoteCanvas } from "@/components/QuoteCanvas";
import { Toolbar } from "@/components/Toolbar";
import { BottomToolbar } from "@/components/BottomToolbar";
import { BottomSheet } from "@/components/BottomSheet";
import { TextControls } from "@/components/controls/TextControls";
import { FontPicker } from "@/components/controls/FontPicker";
import { BackgroundPicker } from "@/components/controls/BackgroundPicker";

type Sheet = "text" | "background" | null;

export default function QuoteCardApp() {
  const searchParams = useSearchParams();
  const [state, setState] = useState<CardState>(DEFAULT_STATE);
  const [sheet, setSheet] = useState<Sheet>(null);
  const [pulse, setPulse] = useState(0);
  const initialized = useRef(false);

  // ---- one-time init: saved settings → random gradient → URL param overrides
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const saved = loadState();
    let next: CardState = saved
      ? saved
      : { ...DEFAULT_STATE, gradientId: randomInitialGradientId() };

    const quote = searchParams.get("quote");
    const book = searchParams.get("book");
    const author = searchParams.get("author");
    if (quote !== null) next = { ...next, quote };
    if (book !== null) next = { ...next, book };
    if (author !== null) next = { ...next, author };

    setState(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---- persist on change (after init)
  useEffect(() => {
    if (!initialized.current) return;
    saveState(state);
  }, [state]);

  const update = useCallback((patch: Partial<CardState>) => {
    setState((s) => ({ ...s, ...patch }));
  }, []);

  const onAuto = useCallback(() => {
    setState((s) => ({ ...s, ...autoStyle(s) }));
    setPulse((p) => p + 1);
  }, []);

  return (
    <div className="flex min-h-[100dvh] flex-col">
      <Header />

      {/* ===== Desktop: two columns · Mobile: preview + bottom toolbar ===== */}
      <main className="mx-auto flex w-full max-w-[1240px] flex-1 flex-col gap-6 px-4 pb-4 pt-4 lg:flex-row lg:px-6 lg:pb-8">
        {/* Preview */}
        <div className="order-1 flex flex-1 items-center justify-center lg:order-2">
          <motion.div
            key={pulse}
            initial={pulse === 0 ? false : { scale: 0.985, opacity: 0.85 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 26, stiffness: 320 }}
            className="w-full max-w-[min(88vw,560px)] lg:max-w-[600px]"
          >
            <QuoteCanvas
              state={state}
              onClick={() => setSheet("text")}
              className="lg:cursor-default"
            />
          </motion.div>
        </div>

        {/* Desktop control panel */}
        <aside className="order-2 hidden w-[400px] flex-shrink-0 lg:order-1 lg:block">
          <div
            className="h-[calc(100dvh-66px-4rem)] rounded-[var(--r)] border border-[var(--line)] p-6"
            style={{ background: "var(--surface)" }}
          >
            <Toolbar state={state} update={update} onAuto={onAuto} />
          </div>
        </aside>
      </main>

      {/* Mobile bottom toolbar */}
      <div className="lg:hidden">
        <BottomToolbar
          state={state}
          onText={() => setSheet("text")}
          onBackground={() => setSheet("background")}
          onAuto={onAuto}
        />
      </div>

      {/* Mobile sheets */}
      <BottomSheet
        open={sheet === "text"}
        title="Text"
        onClose={() => setSheet(null)}
      >
        <div className="space-y-6">
          <TextControls state={state} update={update} />
          <div>
            <h3 className="mb-3 text-[13px] font-semibold uppercase tracking-[0.14em] text-muted">
              Font
            </h3>
            <FontPicker state={state} update={update} />
          </div>
        </div>
      </BottomSheet>

      <BottomSheet
        open={sheet === "background"}
        title="Background"
        onClose={() => setSheet(null)}
      >
        <BackgroundPicker state={state} update={update} />
      </BottomSheet>
    </div>
  );
}

function Header() {
  return (
    <header
      className="sticky top-0 z-20 border-b border-[var(--line)]"
      style={{
        background: "rgba(19,17,23,0.72)",
        backdropFilter: "blur(14px)",
      }}
    >
      <div className="mx-auto flex h-[66px] max-w-[1240px] items-center gap-3 px-4 lg:px-6">
        <a
          href="https://sakshikapoor.github.io/bookskim-site/"
          className="flex items-center gap-2.5"
          aria-label="BookSkim home"
        >
          <BrandLogo />
          <span
            className="text-[18px] font-extrabold tracking-[-0.02em]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            BookSkim
          </span>
        </a>
        <span className="text-[var(--line-2)]">/</span>
        <span className="text-[14px] font-medium text-muted">Quote Cards</span>

        <a
          href="https://play.google.com/store/apps/details?id=com.wildkidstudio.bookskim"
          target="_blank"
          rel="noopener"
          className="ml-auto hidden rounded-full bg-[var(--blue-brand)] px-4 py-2 text-[13px] font-medium text-white shadow-[0_6px_20px_-6px_rgba(46,107,246,0.7)] transition hover:-translate-y-px sm:inline-flex"
        >
          ▸ Get the app
        </a>
      </div>
    </header>
  );
}

function BrandLogo() {
  return (
    <svg width="30" height="30" viewBox="0 0 493 493" aria-hidden="true">
      <defs>
        <clipPath id="qc_badge">
          <rect width="493" height="493" rx="104" />
        </clipPath>
      </defs>
      <g clipPath="url(#qc_badge)">
        <rect width="493" height="493" fill="#3862DC" />
        <path
          d="M130.341 207.741C167.646 207.741 199.868 224.146 215.001 247.906C199.868 271.667 167.647 288.073 130.341 288.073C93.0347 288.073 60.8131 271.667 45.6807 247.906C60.8135 224.146 93.0353 207.741 130.341 207.741Z"
          fill="#FAFAFA"
        />
        <circle cx="98.2" cy="247.9" r="32" fill="#000" />
        <path
          d="M362.66 207.741C399.966 207.741 432.187 224.146 447.32 247.906C432.188 271.667 399.966 288.073 362.66 288.073C325.354 288.073 293.132 271.667 278 247.906C293.133 224.146 325.355 207.741 362.66 207.741Z"
          fill="#FAFAFA"
        />
        <circle cx="336.7" cy="247.9" r="32" fill="#000" />
      </g>
    </svg>
  );
}
