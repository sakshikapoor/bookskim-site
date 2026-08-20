# bookskim-web

Landing page for [BookSkim](https://play.google.com/store/apps/details?id=com.wildkidstudio.bookskim),
an offline EPUB reader for Android.

Astro, no framework, no CDN. Fonts are self-hosted through Fontsource.

## Run it

Needs [Bun](https://bun.sh).

```sh
bun install
bun run dev      # http://localhost:4321
```

Other scripts:

```sh
bun run build    # static site into dist/
bun run preview  # serve dist/ locally
bun run check    # Astro type check
```

## Layout

```
public/assets/   app screenshots, icons, mascot
src/
  layouts/       Base.astro — nav, footer, sticky dock, theme switcher
  components/    FastSkim.astro, Phone.astro
  lib/           fastskim.ts (the bolding rule), url.ts (base-aware paths)
  pages/         index.astro, privacy.astro
  styles/        global.css — the four theme palettes live here
```

Two things on the page are live demos of real app features, not decoration:

- **The headline and the demo paragraph** are rendered through `FastSkim.astro`,
  which applies the same bolding rule the app uses.
- **The dots in the navbar** switch the whole page between the app's four
  reading themes — Light, Sepia, Dark and AMOLED. Sepia is the default.

`WeightTuner.astro` renders a weight slider panel in `bun run dev` only, for
dialling in the two Fast Skim weights. Once you settle on a pair, write them
into `--fs-normal` / `--fs-bold` in `src/styles/global.css`. It never ships —
it is behind `import.meta.env.DEV`.

## Deploy to GitHub Pages

`.github/workflows/deploy.yml` builds and deploys on every push to `main`.

One-time setup: in the repo, go to **Settings → Pages → Build and deployment**
and set **Source** to **GitHub Actions**. Push to `main` and it deploys.

The workflow passes `SITE` and `BASE_PATH` into the build from
`actions/configure-pages`, so the same code works at a project path
(`user.github.io/bookskim-web/`) or at a domain root. All internal links and
asset paths go through `url()` in `src/lib/url.ts` — use it for any new one,
or the site breaks under a project path.

### Custom domain

Add the domain under **Settings → Pages → Custom domain**, then commit a
`public/CNAME` file containing just the domain. `BASE_PATH` becomes `/`
automatically.

### Building for a project path locally

```sh
BASE_PATH=/bookskim-web bun run build && bun run preview
```
