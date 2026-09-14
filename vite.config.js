import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";

export default defineConfig({
  test: {
  environment: "jsdom",
  setupFiles: "./src/test/setup.js",
},
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: "./src/test/setup.js",
  },
});
