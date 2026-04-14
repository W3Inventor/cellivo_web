import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import express from "express";

const isProduction = process.env.NODE_ENV === "production";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const resolve = (filePath) => path.resolve(__dirname, filePath);

const app = express();

let vite;
let productionTemplate = "";
let productionRender;

if (isProduction) {
  productionTemplate = await fs.readFile(resolve("dist/client/index.html"), "utf-8");
  ({ render: productionRender } = await import(pathToFileURL(resolve("dist/server/entry-server.js")).href));

  app.use(
    express.static(resolve("dist/client"), {
      index: false,
    }),
  );
} else {
  const { createServer } = await import("vite");

  vite = await createServer({
    appType: "custom",
    root: __dirname,
    server: {
      middlewareMode: true,
    },
  });

  app.use(vite.middlewares);
}

app.use("*", async (req, res, next) => {
  const url = req.originalUrl;

  try {
    let template;
    let render;

    if (isProduction) {
      template = productionTemplate;
      render = productionRender;
    } else {
      template = await fs.readFile(resolve("index.html"), "utf-8");
      template = await vite.transformIndexHtml(url, template);
      ({ render } = await vite.ssrLoadModule("/entry-server.js"));
    }

    const siteUrl = process.env.SITE_URL || `${req.protocol}://${req.get("host")}`;
    const { appHtml, headTags, statusCode } = await render(url, { siteUrl });

    const html = template
      .replace("<!--head-tags-->", headTags ?? "")
      .replace("<!--app-html-->", appHtml ?? "");

    res.status(statusCode ?? 200).setHeader("Content-Type", "text/html").end(html);
  } catch (error) {
    if (vite) {
      vite.ssrFixStacktrace(error);
    }

    next(error);
  }
});

const port = Number(process.env.PORT || 8080);

app.listen(port, () => {
  console.log(`SSR server running at http://localhost:${port}`);
});
