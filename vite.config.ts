import react from "@vitejs/plugin-react";
import type { UserConfig } from "vite";
import { defineConfig } from "vite";
import type { InlineConfig } from "vitest";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    setupFiles: ["./test/setup.ts"],
    environment: "happy-dom",
  },
  define: {
    "process.env.MODE": JSON.stringify(process.env.MODE || "development"),
  },
} as UserConfig & {
  test: InlineConfig;
});
