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
