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
bun run build        # static site into dist/
bun run build:pages  # same, built for the GitHub Pages project path
bun run preview      # serve dist/ locally
bun run check        # Astro type check
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

The live site is <https://sakshikapoor.github.io/bookskim-site/>. It is served
straight from the root of `main` in the **bookskim-site** repo, not by an
Actions workflow, so the built files are committed alongside the source.

This repo keeps the two apart:

- `main` — source only. `dist/` is gitignored.
- `deploy` — the same source plus the built site copied to the repo root.
  This is the branch that gets pushed.

The build has to know the project path or every asset link breaks, so use
`build:pages` rather than plain `build` — it sets `SITE` and `BASE_PATH` for
you.

```sh
git checkout deploy
git merge main
bun run build:pages
rm -rf _astro assets index.html privacy
cp -R dist/_astro dist/assets dist/index.html dist/privacy .
git add -A && git commit -m "Rebuild the site"
git push site deploy:main
git checkout main
```

Check the diff before pushing: if `index.html` suddenly links to `/assets/…`
instead of `/bookskim-site/assets/…`, the build ran without `BASE_PATH` and
the live site will 404 on everything.

All internal links and asset paths go through `url()` in `src/lib/url.ts` —
use it for any new one, or the site breaks under the project path.

### Custom domain

Add the domain under **Settings → Pages → Custom domain**, then commit a
`public/CNAME` file containing just the domain. `BASE_PATH` becomes `/`, so
plain `bun run build` is the right command from then on.

### Building for a project path locally

```sh
bun run build:pages && bun run preview
```
