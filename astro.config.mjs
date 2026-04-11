import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.skrinakcreative.com',
  output: 'static',
  integrations: [
    sitemap(),
  ],
  image: {
    // Enable Astro's built-in image optimization
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },
});
