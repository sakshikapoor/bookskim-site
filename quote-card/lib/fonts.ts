import {
  Inter,
  Manrope,
  DM_Sans,
  Space_Grotesk,
  Instrument_Serif,
  EB_Garamond,
  Cormorant_Garamond,
  Libre_Baskerville,
  Playfair_Display,
  Lora,
} from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-instrument-serif",
  display: "swap",
});
const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-eb-garamond",
  display: "swap",
});
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});
const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-libre-baskerville",
  display: "swap",
});
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-playfair",
  display: "swap",
});
const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-lora",
  display: "swap",
});

export interface FontDef {
  key: string;
  label: string;
  /** the font-family string to feed to canvas ctx.font and inline styles */
  family: string;
  serif: boolean;
  /** weight used when drawing the quote */
  quoteWeight: number;
  /** weight used for the book/author line */
  metaWeight: number;
}

export const FONTS: FontDef[] = [
  { key: "inter", label: "Inter", family: inter.style.fontFamily, serif: false, quoteWeight: 600, metaWeight: 500 },
  { key: "manrope", label: "Manrope", family: manrope.style.fontFamily, serif: false, quoteWeight: 700, metaWeight: 500 },
  { key: "dm-sans", label: "DM Sans", family: dmSans.style.fontFamily, serif: false, quoteWeight: 600, metaWeight: 500 },
  { key: "space-grotesk", label: "Space Grotesk", family: spaceGrotesk.style.fontFamily, serif: false, quoteWeight: 600, metaWeight: 500 },
  { key: "instrument-serif", label: "Instrument Serif", family: instrumentSerif.style.fontFamily, serif: true, quoteWeight: 400, metaWeight: 400 },
  { key: "eb-garamond", label: "EB Garamond", family: ebGaramond.style.fontFamily, serif: true, quoteWeight: 600, metaWeight: 500 },
  { key: "cormorant", label: "Cormorant Garamond", family: cormorant.style.fontFamily, serif: true, quoteWeight: 600, metaWeight: 500 },
  { key: "libre-baskerville", label: "Libre Baskerville", family: libreBaskerville.style.fontFamily, serif: true, quoteWeight: 700, metaWeight: 400 },
  { key: "playfair", label: "Playfair Display", family: playfair.style.fontFamily, serif: true, quoteWeight: 600, metaWeight: 500 },
  { key: "lora", label: "Lora", family: lora.style.fontFamily, serif: true, quoteWeight: 600, metaWeight: 500 },
];

/** all next/font variable classes, applied to <body> so the @font-face rules exist */
export const FONT_VARIABLES = [
  inter.variable,
  manrope.variable,
  dmSans.variable,
  spaceGrotesk.variable,
  instrumentSerif.variable,
  ebGaramond.variable,
  cormorant.variable,
  libreBaskerville.variable,
  playfair.variable,
  lora.variable,
].join(" ");

const FONT_MAP = new Map(FONTS.map((f) => [f.key, f]));

export function getFont(key: string): FontDef {
  return FONT_MAP.get(key) ?? FONTS[0];
}

export const SERIF_FONT_KEYS = FONTS.filter((f) => f.serif).map((f) => f.key);
export const SANS_FONT_KEYS = FONTS.filter((f) => !f.serif).map((f) => f.key);

/**
 * Ensure the weights needed for a given font are actually downloaded before we
 * paint them onto the canvas (canvas does not trigger font loading itself).
 */
export async function ensureFontLoaded(font: FontDef): Promise<void> {
  if (typeof document === "undefined" || !document.fonts) return;
  try {
    await Promise.all([
      document.fonts.load(`${font.quoteWeight} 64px ${font.family}`),
      document.fonts.load(`${font.metaWeight} 32px ${font.family}`),
    ]);
    await document.fonts.ready;
  } catch {
    /* fall back to whatever is available */
  }
}
