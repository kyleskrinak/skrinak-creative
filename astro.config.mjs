import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://skrinakcreative.com',
  output: 'static',
  integrations: [
    sitemap(),
  ],
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
