import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://skrinak-creative.pages.dev',
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
  // Vite optimization for better performance
  vite: {
    build: {
      rollupOptions: {
        output: {
          // Split vendor code for better caching
          manualChunks: {
            'vendor-glightbox': ['glightbox'],
          },
        },
      },
    },
  },
});
