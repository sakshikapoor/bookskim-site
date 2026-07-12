import { CardState, TextAlign } from "./types";
import { GRADIENTS, getGradient } from "./gradients";

/** A hand-tuned "mood" — a set of choices known to look good together. */
interface Recipe {
  name: string;
  gradientIds: string[];
  fontKeys: string[];
  sizeRange: [number, number];
  widthRange: [number, number];
  lineHeightRange: [number, number];
  aligns: TextAlign[];
  /** color choices for light backgrounds (dark text) */
  darkText: string[];
  /** color choices for dark backgrounds (light text) */
  lightText: string[];
}

const LIGHT_TEXT = ["#ffffff", "#fdfbf7", "#f4f1ff", "#eaf6ff"];
const DARK_TEXT = ["#1c1626", "#241a2e", "#2a2016", "#20303a"];

const RECIPES: Recipe[] = [
  {
    name: "Elegant Serif",
    gradientIds: ["midnight", "indigo", "royal-blue", "berry", "purple", "forest"],
    fontKeys: ["playfair", "cormorant", "eb-garamond", "lora"],
    sizeRange: [58, 70],
    widthRange: [0.62, 0.74],
    lineHeightRange: [1.26, 1.42],
    aligns: ["center", "center", "left"],
    darkText: DARK_TEXT,
    lightText: LIGHT_TEXT,
  },
  {
    name: "Modern Sans",
    gradientIds: ["ocean", "cyan", "emerald", "warm-orange", "coral", "sunset"],
    fontKeys: ["inter", "manrope", "dm-sans", "space-grotesk"],
    sizeRange: [52, 64],
    widthRange: [0.66, 0.8],
    lineHeightRange: [1.22, 1.36],
    aligns: ["center", "left"],
    darkText: DARK_TEXT,
    lightText: LIGHT_TEXT,
  },
  {
    name: "Bold Statement",
    gradientIds: ["cherry", "purple", "berry", "warm-orange", "royal-blue"],
    fontKeys: ["manrope", "space-grotesk", "playfair"],
    sizeRange: [66, 82],
    widthRange: [0.6, 0.72],
    lineHeightRange: [1.16, 1.3],
    aligns: ["center", "left"],
    darkText: DARK_TEXT,
    lightText: LIGHT_TEXT,
  },
  {
    name: "Editorial Left",
    gradientIds: ["midnight", "forest", "indigo", "moss", "ocean"],
    fontKeys: ["libre-baskerville", "space-grotesk", "lora", "eb-garamond"],
    sizeRange: [48, 60],
    widthRange: [0.7, 0.84],
    lineHeightRange: [1.28, 1.44],
    aligns: ["left"],
    darkText: DARK_TEXT,
    lightText: LIGHT_TEXT,
  },
  {
    name: "Soft Light",
    gradientIds: ["lavender", "peach", "cream", "sand", "mint"],
    fontKeys: ["cormorant", "eb-garamond", "lora", "instrument-serif", "playfair"],
    sizeRange: [58, 72],
    widthRange: [0.64, 0.78],
    lineHeightRange: [1.26, 1.4],
    aligns: ["center", "center", "left"],
    darkText: DARK_TEXT,
    lightText: LIGHT_TEXT,
  },
];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function inRange([min, max]: [number, number]): number {
  return min + Math.random() * (max - min);
}

/**
 * Produce a curated set of style fields (never the text content). Every call
 * returns a combination that is intentional and readable. Avoids repeating the
 * previous gradient so consecutive clicks feel distinct.
 */
export function autoStyle(prev: CardState): Partial<CardState> {
  const recipe = pick(RECIPES);

  let gradientIds = recipe.gradientIds;
  const filtered = gradientIds.filter((id) => id !== prev.gradientId);
  if (filtered.length > 0) gradientIds = filtered;
  const gradientId = pick(gradientIds);
  const gradient = getGradient(gradientId);

  const fontKey = pick(recipe.fontKeys);
  const fontSize = Math.round(inRange(recipe.sizeRange));
  const quoteWidthPct = Math.round(inRange(recipe.widthRange) * 100) / 100;
  const lineHeight = Math.round(inRange(recipe.lineHeightRange) * 100) / 100;
  const align = pick(recipe.aligns);
  const textColor = gradient.prefersDarkText
    ? pick(recipe.darkText)
    : pick(recipe.lightText);

  return {
    bgType: "gradient",
    gradientId,
    fontKey,
    fontSize,
    quoteWidthPct,
    lineHeight,
    align,
    textColor,
    letterSpacing: 0,
    showQuoteMarks: Math.random() > 0.25,
  };
}

/** used for the very first paint so the card is never empty/ugly */
export function randomInitialGradientId(): string {
  return pick(GRADIENTS).id;
}
