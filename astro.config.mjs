// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import cloudflare from '@astrojs/cloudflare';
const site = process.env.SITE_URL || 'http://localhost:4321';

// https://astro.build/config
export default defineConfig({
  site,
  adapter: cloudflare(),
  integrations: [sitemap(), react()],
});
