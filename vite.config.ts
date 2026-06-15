import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

const prioritizeCriticalAssets = () => ({
  name: "prioritize-critical-assets",
  transformIndexHtml(html: string) {
    const stylesheetPattern = / {4}<link rel="stylesheet" crossorigin href="[^"]+">\n/g;
    const stylesheets = html.match(stylesheetPattern)?.join("") ?? "";
    const htmlWithoutStylesheets = html.replace(stylesheetPattern, "");
    const headTagsMarker = "    <!--head-tags-->";
    const htmlWithPrioritizedStylesheets = htmlWithoutStylesheets.includes(headTagsMarker)
      ? htmlWithoutStylesheets.replace(headTagsMarker, `${stylesheets}${headTagsMarker}`)
      : htmlWithoutStylesheets;

    return htmlWithPrioritizedStylesheets.replace(
      /( {4}<script type="module" crossorigin )src=/,
      "$1fetchpriority=\"low\" src=",
    );
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), prioritizeCriticalAssets(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
  },
  ssr: {
    noExternal: ["react-helmet-async"],
  },
  build: {
    modulePreload: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return undefined;

          const normalizedId = id.split(path.sep).join("/");

          if (
            /node_modules\/(react|react-dom|scheduler)\//.test(normalizedId) ||
            normalizedId.includes("node_modules/react/jsx-runtime")
          ) {
            return "react";
          }

          if (normalizedId.includes("node_modules/react-router") || normalizedId.includes("node_modules/@remix-run/router")) {
            return "router";
          }

          if (normalizedId.includes("node_modules/framer-motion")) return "motion";
          if (normalizedId.includes("node_modules/lucide-react")) return "icons";
          if (normalizedId.includes("node_modules/@radix-ui")) return "radix";
          if (normalizedId.includes("node_modules/@tanstack")) return "query";
          if (normalizedId.includes("node_modules/react-helmet-async")) return "seo";
          if (normalizedId.includes("node_modules/recharts")) return "charts";
          if (normalizedId.includes("node_modules/embla-carousel-react")) return "carousel";

          return undefined;
        },
      },
    },
  },
}));
