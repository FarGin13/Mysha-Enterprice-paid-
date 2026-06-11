import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// ─── Port ────────────────────────────────────────────────────────────────────
const rawPort = process.env.PORT;
const port = rawPort && !Number.isNaN(Number(rawPort)) && Number(rawPort) > 0
  ? Number(rawPort)
  : 5173; // fallback to 5173 locally if PORT is not set

// ─── API proxy target ────────────────────────────────────────────────────────
const apiTarget =
  process.env.VITE_API_BASE_URL?.replace(/\/+$/, "") ?? "http://localhost:8080";

export default defineConfig({
  base: "/",

  plugins: [
    react(),
    tailwindcss(),
  ],

  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
    },
    dedupe: ["react", "react-dom"],
  },

  root: path.resolve(import.meta.dirname),

  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    // Broaden browser support so older phones and in-app browsers (Facebook,
    // Instagram, etc.) can run the bundle instead of showing a blank page.
    target: ["es2018", "chrome79", "safari13", "firefox72", "edge79"],
    rollupOptions: {
      onwarn(warning, warn) {
        // shadcn/ui files ship with a Next.js "use client" directive that Vite
        // doesn't need. Ignore that harmless warning (and the sourcemap noise it
        // produces) so the build log stays clean.
        if (warning.code === "MODULE_LEVEL_DIRECTIVE") return;
        if (
          typeof warning.message === "string" &&
          warning.message.includes("use client")
        ) {
          return;
        }
        warn(warning);
      },
    },
  },

  server: {
    port,
    strictPort: true,
    host: "0.0.0.0",
    allowedHosts: true,
    fs: { strict: true },
    proxy: {
      "/api": {
        target: apiTarget,
        changeOrigin: true,
        secure: false,
      },
    },
  },

  preview: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
  },
});