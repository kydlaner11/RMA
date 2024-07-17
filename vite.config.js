// <reference types="vitest" />
// <reference types="vite/client" />

import basicSsl from "@vitejs/plugin-basic-ssl";
import react from "@vitejs/plugin-react";
import reactRefresh from "@vitejs/plugin-react-refresh";
import million from "million/compiler";
import { defineConfig } from "vite";
import envCompatible from "vite-plugin-env-compatible";
import eslintPlugin from "vite-plugin-eslint";
import svgrPlugin from "vite-plugin-svgr";

export default defineConfig({
  build: {
    outDir: "build",
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    rollupOptions: {
      output: {
        manualChunks: {
          apollo: ["@apollo/client", "graphql"],
          ant: ["antd"],
          antico: ["@ant-design/icons"],
          lottie: ["lottie-web", "lottie-react"],
          rrr: ["react", "react-dom", "react-router-dom"],
        },
      },
    },
  },
  plugins: [
    basicSsl(),
    react(),
    reactRefresh(),
    envCompatible(),
    million.vite({ auto: true }),
    eslintPlugin({
      cache: false,
      include: ["./src/**/*.jsx"],
      exclude: [],
    }),
    svgrPlugin({
      svgrOptions: {
        icon: true,
      },
    }),
  ],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.jsx",
    deps: {
      inline: ["@vue", "@vueuse", "vue-demi", "@vue/composition-api"],
    },
    reporters: "dot",
  },
  server: {
    open: false,
    port: 3000,
    https: false,
  },
});
