import { defineConfig } from "vitest/config";

export default defineConfig({
  base: "/IP-Tracker",
  test: {
    environment: "jsdom", // or 'jsdom', 'node'
  },
});
``;
