import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://skrinakcreative.com',
  output: 'static',
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
