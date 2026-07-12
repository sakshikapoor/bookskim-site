export interface GradientStop {
  /** css color */
  color: string;
  /** position 0–1 along the gradient axis */
  at: number;
}

export interface Gradient {
  id: string;
  name: string;
  /** angle in degrees, 0 = left→right, 90 = top→bottom */
  angle: number;
  stops: GradientStop[];
  /** true when the background is light and dark text reads better */
  prefersDarkText: boolean;
}

/**
 * ~20 hand-curated, premium gradients. Ordering and colors are intentional —
 * they are chosen to feel modern (Instagram / Canva / Arc energy), not random.
 */
export const GRADIENTS: Gradient[] = [
  {
    id: "sunset",
    name: "Sunset",
    angle: 135,
    stops: [
      { color: "#ff8f6b", at: 0 },
      { color: "#ff5f7e", at: 0.55 },
      { color: "#b8237a", at: 1 },
    ],
    prefersDarkText: false,
  },
  {
    id: "ocean",
    name: "Ocean",
    angle: 135,
    stops: [
      { color: "#2b5876", at: 0 },
      { color: "#2f80b8", at: 0.55 },
      { color: "#4e9fd6", at: 1 },
    ],
    prefersDarkText: false,
  },
  {
    id: "aurora",
    name: "Aurora",
    angle: 140,
    stops: [
      { color: "#1f3a5f", at: 0 },
      { color: "#3fa17a", at: 0.5 },
      { color: "#7bd6a6", at: 1 },
    ],
    prefersDarkText: false,
  },
  {
    id: "lavender",
    name: "Lavender",
    angle: 135,
    stops: [
      { color: "#a18cd1", at: 0 },
      { color: "#b8a4e3", at: 0.5 },
      { color: "#fbc2eb", at: 1 },
    ],
    prefersDarkText: true,
  },
  {
    id: "forest",
    name: "Forest",
    angle: 145,
    stops: [
      { color: "#13341f", at: 0 },
      { color: "#1e5631", at: 0.55 },
      { color: "#3a7d44", at: 1 },
    ],
    prefersDarkText: false,
  },
  {
    id: "emerald",
    name: "Emerald",
    angle: 135,
    stops: [
      { color: "#0f766e", at: 0 },
      { color: "#0f9b8e", at: 0.5 },
      { color: "#43c6ac", at: 1 },
    ],
    prefersDarkText: false,
  },
  {
    id: "peach",
    name: "Peach",
    angle: 130,
    stops: [
      { color: "#ffd3a5", at: 0 },
      { color: "#ffb8a0", at: 0.5 },
      { color: "#fd9d8f", at: 1 },
    ],
    prefersDarkText: true,
  },
  {
    id: "midnight",
    name: "Midnight",
    angle: 140,
    stops: [
      { color: "#0f0c29", at: 0 },
      { color: "#24243e", at: 0.5 },
      { color: "#302b63", at: 1 },
    ],
    prefersDarkText: false,
  },
  {
    id: "cherry",
    name: "Cherry",
    angle: 135,
    stops: [
      { color: "#8e0e2e", at: 0 },
      { color: "#c31432", at: 0.55 },
      { color: "#e35d5b", at: 1 },
    ],
    prefersDarkText: false,
  },
  {
    id: "royal-blue",
    name: "Royal Blue",
    angle: 140,
    stops: [
      { color: "#141e5c", at: 0 },
      { color: "#243b9c", at: 0.55 },
      { color: "#3a6bd6", at: 1 },
    ],
    prefersDarkText: false,
  },
  {
    id: "moss",
    name: "Moss",
    angle: 135,
    stops: [
      { color: "#3e5023", at: 0 },
      { color: "#5a7a2e", at: 0.55 },
      { color: "#8fad54", at: 1 },
    ],
    prefersDarkText: false,
  },
  {
    id: "coral",
    name: "Coral",
    angle: 130,
    stops: [
      { color: "#ff6f61", at: 0 },
      { color: "#ff8f70", at: 0.55 },
      { color: "#ffb088", at: 1 },
    ],
    prefersDarkText: false,
  },
  {
    id: "berry",
    name: "Berry",
    angle: 140,
    stops: [
      { color: "#42104f", at: 0 },
      { color: "#7b2d82", at: 0.55 },
      { color: "#b5479b", at: 1 },
    ],
    prefersDarkText: false,
  },
  {
    id: "cream",
    name: "Cream",
    angle: 130,
    stops: [
      { color: "#fdf6ec", at: 0 },
      { color: "#f6e7d2", at: 0.55 },
      { color: "#ecd8bd", at: 1 },
    ],
    prefersDarkText: true,
  },
  {
    id: "sand",
    name: "Sand",
    angle: 130,
    stops: [
      { color: "#e6d3b3", at: 0 },
      { color: "#d9bc94", at: 0.55 },
      { color: "#c9a97e", at: 1 },
    ],
    prefersDarkText: true,
  },
  {
    id: "indigo",
    name: "Indigo",
    angle: 140,
    stops: [
      { color: "#1a1a40", at: 0 },
      { color: "#33356e", at: 0.55 },
      { color: "#4b4fa6", at: 1 },
    ],
    prefersDarkText: false,
  },
  {
    id: "cyan",
    name: "Cyan",
    angle: 135,
    stops: [
      { color: "#0891b2", at: 0 },
      { color: "#22b8d4", at: 0.55 },
      { color: "#67e8f9", at: 1 },
    ],
    prefersDarkText: false,
  },
  {
    id: "warm-orange",
    name: "Warm Orange",
    angle: 130,
    stops: [
      { color: "#ff7e29", at: 0 },
      { color: "#ff9640", at: 0.55 },
      { color: "#ffb454", at: 1 },
    ],
    prefersDarkText: false,
  },
  {
    id: "purple",
    name: "Purple",
    angle: 140,
    stops: [
      { color: "#5b247a", at: 0 },
      { color: "#7a3aa0", at: 0.55 },
      { color: "#9d50bb", at: 1 },
    ],
    prefersDarkText: false,
  },
  {
    id: "mint",
    name: "Mint",
    angle: 130,
    stops: [
      { color: "#3eb489", at: 0 },
      { color: "#6fd6a8", at: 0.55 },
      { color: "#a8ecc9", at: 1 },
    ],
    prefersDarkText: true,
  },
];

const GRADIENT_MAP = new Map(GRADIENTS.map((g) => [g.id, g]));

export function getGradient(id: string): Gradient {
  return GRADIENT_MAP.get(id) ?? GRADIENTS[0];
}

export function randomGradient(exclude?: string): Gradient {
  const pool = exclude
    ? GRADIENTS.filter((g) => g.id !== exclude)
    : GRADIENTS;
  return pool[Math.floor(Math.random() * pool.length)];
}
