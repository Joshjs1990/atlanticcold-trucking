# AtlanticCold Trucking

AtlanticCold is a refrigerated and frozen food trucking company serving New
York, New Jersey, Pennsylvania, and Connecticut.

## Local development

```bash
npm install
npm run dev
```

The local site runs at `http://localhost:3001`.

## Cloudflare Workers deployment

This project is configured for a direct GitHub-to-Cloudflare Workers workflow.
It does not require application environment variables or Cloudflare bindings.

```bash
npm run deploy:worker
```

The deployment script builds the Vinext Worker output and deploys the generated
server and client assets using `wrangler.jsonc`.

For Cloudflare Workers Builds, use:

- Build command: `npm run build`
- Deploy command: `npx wrangler deploy --config wrangler.jsonc`
- Root directory: `/`

## Contact form email delivery

The contact page, homepage footer form, and service-area quote forms submit to
`/api/contact`, which sends the inquiry through Resend. Copy `.env.example` to
`.env.local` for local development and set `RESEND_API_KEY` to a Resend API
key. `RESEND_TO_EMAIL` is the inbox that receives inquiries, and
`RESEND_FROM_EMAIL` should use a sender address from a domain verified in
Resend. The example `onboarding@resend.dev` sender is only suitable for initial
testing.

For the Cloudflare Worker, add the API key as a secret rather than committing
it to Git:

```bash
npx wrangler secret put RESEND_API_KEY --config wrangler.jsonc
```

Set `RESEND_TO_EMAIL` and `RESEND_FROM_EMAIL` as Worker variables in the
Cloudflare dashboard or in the Wrangler configuration when ready.
