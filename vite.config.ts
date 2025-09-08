/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwind from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwind()],
  test: {
    globals: true,             // pozwala pisać testy bez importowania describe/it/expect
    environment: "jsdom",      // DOM w Node
    setupFiles: "./vitest.setup.ts", // globalny setup (matchery RTL)
  },
});
