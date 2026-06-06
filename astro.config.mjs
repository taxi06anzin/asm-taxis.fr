// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://asm-taxis.fr',
  trailingSlash: 'always',
  build: { format: 'directory' },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    sitemap({
      // Pages utilitaires/légales : présentes mais priorité basse
      serialize(item) {
        if (/\/(mentions-legales|cgv|confidentialite|politique-cookies)\//.test(item.url)) {
          item.priority = 0.2;
          item.changefreq = 'yearly';
        }
        return item;
      },
    }),
  ],
});
