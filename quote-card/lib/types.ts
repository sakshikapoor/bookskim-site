export type TextAlign = "left" | "center" | "right";

export type BackgroundType = "gradient" | "image";

export interface ImageSettings {
  /** data URL of the uploaded image, or null when none */
  src: string | null;
  /** blur radius in px applied to the image (0–24) */
  blur: number;
  /** brightness multiplier (0.3–1.4) */
  brightness: number;
  /** dark overlay opacity (0–0.85) */
  overlay: number;
}

export interface CardState {
  quote: string;
  book: string;
  author: string;

  /** key into the font registry (see lib/fonts.ts) */
  fontKey: string;
  /** quote font size in canvas px at 1080 (roughly 32–96) */
  fontSize: number;
  /** any CSS color string */
  textColor: string;
  align: TextAlign;
  /** quote text column width as a fraction of the 1080 canvas (0.45–0.9) */
  quoteWidthPct: number;
  /** line height multiplier for the quote (1.05–1.8) */
  lineHeight: number;
  /** letter spacing in px (-2–8) */
  letterSpacing: number;
  /** wrap the quote in decorative “ ” marks */
  showQuoteMarks: boolean;

  bgType: BackgroundType;
  /** id into the gradient list (see lib/gradients.ts) */
  gradientId: string;
  image: ImageSettings;
}

export const DEFAULT_IMAGE: ImageSettings = {
  src: null,
  blur: 0,
  brightness: 0.85,
  overlay: 0.35,
};

export const DEFAULT_STATE: CardState = {
  quote:
    "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
  book: "The Nicomachean Ethics",
  author: "Aristotle",
  fontKey: "playfair",
  fontSize: 62,
  textColor: "#ffffff",
  align: "center",
  quoteWidthPct: 0.72,
  lineHeight: 1.28,
  letterSpacing: 0,
  showQuoteMarks: true,
  bgType: "gradient",
  gradientId: "midnight",
  image: DEFAULT_IMAGE,
};
