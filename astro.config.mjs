// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export const SITE = 'https://ideacollaborative.com';

export default defineConfig({
  site: SITE,
  output: 'static',
  // Clean URLs on Bluehost (Apache): public/.htaccess maps /about → about.html.
  // Keep format: 'file'. Nested routes like /workshops/ai-advantage.html sit
  // under a workshops/ folder; .htaccess prefers workshops.html over that dir.
  trailingSlash: 'never',
  build: { format: 'file', inlineStylesheets: 'auto' },
  prefetch: { prefetchAll: true, defaultStrategy: 'viewport' },
  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes('/thanks') &&
        !page.includes('/404') &&
        !page.includes('/dev/'),
      changefreq: 'weekly',
      lastmod: new Date(),
    }),
  ],
  vite: { plugins: [tailwindcss()] },
  image: { service: { entrypoint: 'astro/assets/services/sharp' } },
});
