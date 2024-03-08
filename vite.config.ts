import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";

import { createFilter } from "@rollup/pluginutils";
import toSource from "tosource";
import { XMLParser } from "fast-xml-parser";
import { readFileSync } from "fs";

function xmlTransform(code: string, id: string, options: any = { xml: {} }) {
  const filter = createFilter(options.xml!.include, options.xml!.exclude);
  if (!filter(id)) {
    return null;
  }

  const parser = new XMLParser({
    parseAttributeValue: true,
    attributeNamePrefix: "",
    textNodeName: "value",
    ignoreAttributes: false,
    ignoreDeclaration: true,
  });

  const result = parser.parse(readFileSync(id).toString());
  return {
    code: `var data = ${toSource(result)};\nexport default data;`,
  };
}

const XML_EXTENSION = /\.xml$/;

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    {
      name: "vite:content",
      async transform(code, id, options) {
        if (XML_EXTENSION.test(id)) {
          return xmlTransform(code, id);
        }
        return null;
      },
    },
  ],
  server: {
    port: 3000,
    host: true,
  },
  assetsInclude: ["xml/**"],

  appType: "spa",
  build: {
    cssMinify: true,
    rollupOptions: {
      treeshake: true,
    },
  },
  // resolve: {
  //   alias: [
  //     {
  //       find: "@",
  //       replacement: path.resolve(process.cwd(), "src"),
  //     },
  //     {
  //       find: "~",
  //       replacement: path.resolve(process.cwd()),
  //     },
  //   ],
  // },
});
