import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// Versão para abrir com duplo clique (file://): rotas por # e script sem módulo.
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist-pages',
    emptyOutDir: true,
    modulePreload: false,
    rollupOptions: { input: 'standalone.html', output: { format: 'iife', inlineDynamicImports: true, entryFileNames: 'assets/site.js', assetFileNames: 'assets/[name][extname]' } },
  },
});
