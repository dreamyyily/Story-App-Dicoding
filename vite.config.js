import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  root: "src",
  base: "/Story-App-Dicoding/",

  build: {
    outDir: "../docs",
    emptyOutDir: true,
  },

  server: {
    port: 5173,
  },

  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
});
