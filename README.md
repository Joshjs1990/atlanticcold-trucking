# AtlanticCold Trucking

AtlanticCold is a refrigerated and frozen food trucking company serving New
York, New Jersey, Pennsylvania, and Connecticut. This project uses Next.js App
Router and is configured for Vercel.

## Local development

Use Node.js 22.x.

```bash
npm ci
npm run dev
```

The local site runs at `http://localhost:3001`.

## Production checks

```bash
npm run build
npm run typecheck
npm run lint
```

To serve the production build locally, run `npm start` after building.

## Vercel deployment

Import this repository into Vercel and use these project settings:

- Framework preset: **Next.js**
- Root directory: the repository root (`.`)
- Node.js version: **22.x**
- Install command: `npm ci`
- Build command: `npm run build`
- Output directory: leave at the Next.js default (`.next`)

The framework, install command, and build command are also set in `vercel.json`.
Remove any existing project overrides that still reference Wrangler, Vinext,
`dist`, or a Worker deploy command. Vercel handles deployment after the build.
See [Vercel's Next.js documentation](https://vercel.com/docs/frameworks/full-stack/nextjs).

No application secrets or database bindings are required. The contact page and
quote sections use phone and email links directly; they do not submit to an
email API.

Optionally set `SITE_URL` in Vercel's environment settings to your final domain
(for example, `https://your-domain.com`) before building. Metadata and article
URLs otherwise use Vercel's production project domain, with the current
Vercel deployment domain as a fallback. Local development uses
`http://localhost:3001`. Redeploy after changing `SITE_URL`.

After deploying, check the homepage, a service detail page, a service-area page,
an insight article, and the equipment viewer. Confirm the header call button
and email links work.
