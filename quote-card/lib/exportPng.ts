import { CardState } from "./types";
import { renderCard, CARD_SIZE } from "./renderCard";
import { getFont, ensureFontLoaded } from "./fonts";

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function slugify(input: string): string {
  return (
    input
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 40) || "quote"
  );
}

/**
 * Render the card to a fresh 1080×1080 canvas and trigger a PNG download.
 * Waits for fonts (and the background image, if any) so the output is crisp.
 */
export async function exportPng(state: CardState): Promise<void> {
  await ensureFontLoaded(getFont(state.fontKey));

  let image: HTMLImageElement | null = null;
  if (state.bgType === "image" && state.image.src) {
    try {
      image = await loadImage(state.image.src);
    } catch {
      image = null;
    }
  }

  const canvas = document.createElement("canvas");
  canvas.width = CARD_SIZE;
  canvas.height = CARD_SIZE;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas 2D context unavailable");

  renderCard(ctx, state, { size: CARD_SIZE, image });

  const blob: Blob | null = await new Promise((resolve) =>
    canvas.toBlob((b) => resolve(b), "image/png")
  );
  if (!blob) throw new Error("PNG export failed");

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `bookskim-quote-${slugify(state.book || state.quote)}.png`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  // revoke on next tick so the download starts reliably
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
