// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const site =
  process.env.SITE_URL ||'http://localhost:4321';

// https://astro.build/config
export default defineConfig({
  site,
 
  integrations: [sitemap()],
});
