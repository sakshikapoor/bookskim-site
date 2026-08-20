const base = import.meta.env.BASE_URL;

/** Prefixes a site-root path with Astro's `base`, so the site works both at a
 *  domain root and under a GitHub Pages project path. */
export const url = (p: string): string =>
  `${base.replace(/\/$/, '')}/${p.replace(/^\//, '')}`;
