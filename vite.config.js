import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: '/Story-App-Dicoding/',
  root: 'src',                                    
  build: {
    outDir: '../docs',                           
    emptyOutDir: true,
  },
  server: {
    port: 5173,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});