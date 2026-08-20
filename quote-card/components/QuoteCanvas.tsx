"use client";

import { useEffect, useRef } from "react";
import { CardState } from "@/lib/types";
import { renderCard, CARD_SIZE } from "@/lib/renderCard";
import { getFont, ensureFontLoaded } from "@/lib/fonts";

/**
 * The single canvas used for the live preview. It is always backed by a
 * 1080×1080 buffer and scaled down with CSS, so what you see is exactly what
 * exports. Redraws synchronously on every state change.
 */
export function QuoteCanvas({
  state,
  onClick,
  className,
}: {
  state: CardState;
  onClick?: () => void;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const imgSrcRef = useRef<string | null>(null);

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    renderCard(ctx, state, { size: CARD_SIZE, image: imgRef.current });
  };

  // (re)load the background image when the source changes, then redraw
  useEffect(() => {
    const src = state.bgType === "image" ? state.image.src : null;
    if (src === imgSrcRef.current) {
      draw();
      return;
    }
    imgSrcRef.current = src;
    if (!src) {
      imgRef.current = null;
      draw();
      return;
    }
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      imgRef.current = img;
      draw();
    };
    img.src = src;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.bgType, state.image.src]);

  // make sure the selected font is loaded before painting text
  useEffect(() => {
    let cancelled = false;
    draw();
    ensureFontLoaded(getFont(state.fontKey)).then(() => {
      if (!cancelled) draw();
    });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <canvas
      ref={canvasRef}
      width={CARD_SIZE}
      height={CARD_SIZE}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      aria-label="Quote card preview"
      className={className}
      style={{
        width: "100%",
        height: "auto",
        aspectRatio: "1 / 1",
        display: "block",
        borderRadius: 24,
        boxShadow:
          "0 30px 80px -20px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.06)",
        cursor: onClick ? "pointer" : "default",
      }}
    />
  );
}
