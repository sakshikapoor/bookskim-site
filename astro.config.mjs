import { defineConfig } from 'astro/config';

// Both are overridable so the same build works at a domain root or under a
// GitHub Pages project path. See README.md.
export default defineConfig({
  site: process.env.SITE ?? 'https://bookskim.app',
  base: process.env.BASE_PATH ?? '/',
  trailingSlash: 'ignore',
  build: { inlineStylesheets: 'auto' },
});
