import { CardState } from "./types";
import { getGradient } from "./gradients";
import { getFont } from "./fonts";

export const CARD_SIZE = 1080;

interface RenderOptions {
  size?: number;
  /** preloaded image element for custom-image backgrounds */
  image?: HTMLImageElement | null;
}

/** Wrap text into lines that fit within maxWidth for the current ctx font. */
function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] {
  const lines: string[] = [];
  const paragraphs = text.replace(/\r/g, "").split("\n");

  for (const para of paragraphs) {
    const words = para.split(/\s+/).filter(Boolean);
    if (words.length === 0) {
      lines.push("");
      continue;
    }
    let current = "";
    for (const word of words) {
      const candidate = current ? `${current} ${word}` : word;
      if (ctx.measureText(candidate).width <= maxWidth || !current) {
        // hard-break a single word that is itself wider than the column
        if (!current && ctx.measureText(word).width > maxWidth) {
          let chunk = "";
          for (const ch of word) {
            if (ctx.measureText(chunk + ch).width > maxWidth && chunk) {
              lines.push(chunk);
              chunk = ch;
            } else {
              chunk += ch;
            }
          }
          current = chunk;
        } else {
          current = candidate;
        }
      } else {
        lines.push(current);
        current = word;
      }
    }
    if (current) lines.push(current);
  }
  return lines;
}

/** Draw a "cover" (object-fit: cover) image into a square of the given size. */
function drawCoverImage(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  size: number
) {
  const scale = Math.max(size / img.width, size / img.height);
  const w = img.width * scale;
  const h = img.height * scale;
  ctx.drawImage(img, (size - w) / 2, (size - h) / 2, w, h);
}

/**
 * Paint the entire quote card. Pure and synchronous — identical output for the
 * live preview and the 1080×1080 export. Fonts/images must be loaded first.
 */
export function renderCard(
  ctx: CanvasRenderingContext2D,
  state: CardState,
  opts: RenderOptions = {}
): void {
  const size = opts.size ?? CARD_SIZE;
  const font = getFont(state.fontKey);

  ctx.save();
  ctx.clearRect(0, 0, size, size);

  // ---- Background ----
  if (state.bgType === "image" && opts.image) {
    // draw slightly larger than the frame so blur doesn't reveal edges
    const bleed = state.image.blur * 2;
    ctx.save();
    ctx.filter = `blur(${state.image.blur}px) brightness(${state.image.brightness})`;
    if (bleed > 0) {
      ctx.translate(-bleed, -bleed);
      drawCoverImage(ctx, opts.image, size + bleed * 2);
    } else {
      drawCoverImage(ctx, opts.image, size);
    }
    ctx.restore();

    if (state.image.overlay > 0) {
      ctx.fillStyle = `rgba(0,0,0,${state.image.overlay})`;
      ctx.fillRect(0, 0, size, size);
    }
  } else {
    const g = getGradient(state.gradientId);
    const rad = (g.angle * Math.PI) / 180;
    const cx = size / 2;
    const cy = size / 2;
    const half = size / 2;
    const dx = Math.cos(rad) * half;
    const dy = Math.sin(rad) * half;
    const grad = ctx.createLinearGradient(cx - dx, cy - dy, cx + dx, cy + dy);
    for (const stop of g.stops) grad.addColorStop(stop.at, stop.color);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);
  }

  // ---- Text layout ----
  const maxWidth = size * state.quoteWidthPct;
  const quoteText = state.showQuoteMarks
    ? `“${state.quote.trim()}”`
    : state.quote.trim();

  const quoteFontPx = state.fontSize * (size / CARD_SIZE);
  const letterSpacingPx = state.letterSpacing * (size / CARD_SIZE);

  ctx.textBaseline = "top";
  ctx.textAlign = state.align;
  ctx.letterSpacing = `${letterSpacingPx}px`;
  ctx.font = `${font.quoteWeight} ${quoteFontPx}px ${font.family}`;

  const quoteLines = state.quote.trim()
    ? wrapText(ctx, quoteText, maxWidth)
    : [];
  const quoteLineHeight = quoteFontPx * state.lineHeight;

  // meta (book + author)
  const hasBook = state.book.trim().length > 0;
  const hasAuthor = state.author.trim().length > 0;
  const bookPx = clamp(state.fontSize * 0.44, 24, 46) * (size / CARD_SIZE);
  const authorPx = bookPx * 0.82;
  const bookLineHeight = bookPx * 1.3;
  const authorLineHeight = authorPx * 1.3;
  const metaGap = quoteFontPx * 0.85;

  let metaHeight = 0;
  if (hasBook) metaHeight += bookLineHeight;
  if (hasAuthor) metaHeight += authorLineHeight;
  if (metaHeight > 0) metaHeight += metaGap;

  const totalHeight = quoteLines.length * quoteLineHeight + metaHeight;
  let y = (size - totalHeight) / 2;

  // anchor x based on alignment within the centered column
  let x: number;
  if (state.align === "left") x = (size - maxWidth) / 2;
  else if (state.align === "right") x = (size + maxWidth) / 2;
  else x = size / 2;

  // subtle shadow for legibility on image backgrounds
  const softShadow =
    state.bgType === "image" && state.image.overlay < 0.5;
  if (softShadow) {
    ctx.shadowColor = "rgba(0,0,0,0.5)";
    ctx.shadowBlur = size * 0.02;
    ctx.shadowOffsetY = size * 0.004;
  }

  // ---- Draw quote ----
  ctx.fillStyle = state.textColor;
  for (const line of quoteLines) {
    ctx.fillText(line, x, y);
    y += quoteLineHeight;
  }

  // ---- Draw meta ----
  if (metaHeight > 0) {
    y += metaGap;
    ctx.shadowColor = softShadow ? "rgba(0,0,0,0.4)" : "transparent";
    if (hasBook) {
      ctx.font = `${font.metaWeight} ${bookPx}px ${font.family}`;
      ctx.letterSpacing = `${letterSpacingPx * 0.5}px`;
      ctx.globalAlpha = 0.95;
      ctx.fillText(state.book.trim(), x, y);
      y += bookLineHeight;
    }
    if (hasAuthor) {
      ctx.font = `${font.metaWeight} ${authorPx}px ${font.family}`;
      ctx.globalAlpha = 0.75;
      ctx.fillText(state.author.trim(), x, y);
    }
    ctx.globalAlpha = 1;
  }

  ctx.restore();
}

function clamp(v: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, v));
}
