const deploymentHost =
  process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;

export const siteUrl = new URL(
  process.env.SITE_URL ||
    (deploymentHost ? `https://${deploymentHost}` : 'http://localhost:3001'),
);
