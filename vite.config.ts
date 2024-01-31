import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import content from "@originjs/vite-plugin-content";

import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    content({
      xml: {
        xml2jsOptions: {
          includeWhiteChars: true,
          explicitArray: false,
          attrkey: "",
          childkey: "",
          charkey: "value",
          mergeAttrs: true,
          normalize: true,
        },
        enabled: true,
      },
    }),
  ],
  server: {
    port: 3000,
    host: true,
  },
  appType: "spa",
  build: {
    cssMinify: true,
    rollupOptions: {
      treeshake: true,
    },
  },
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve(process.cwd(), "src"),
      },
    ],
  },
});
