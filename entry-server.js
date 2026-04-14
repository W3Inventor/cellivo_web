import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { matchRoutes } from "react-router-dom";
import { StaticRouter } from "react-router-dom/server";
import App from "./src/App.tsx";
import { appRoutes } from "./src/route-config.tsx";

export function render(url, { siteUrl } = {}) {
  const helmetContext = {};

  const appHtml = renderToString(
    createElement(
      StaticRouter,
      { location: url },
      createElement(App, { helmetContext, siteUrl }),
    ),
  );

  const { helmet } = helmetContext;
  const matchedRoutes = matchRoutes(appRoutes, url);
  const lastMatch = matchedRoutes?.[matchedRoutes.length - 1];
  const statusCode = lastMatch?.route?.path === "*" ? 404 : 200;
  const headTags = [
    helmet?.title?.toString(),
    helmet?.priority?.toString(),
    helmet?.meta?.toString(),
    helmet?.link?.toString(),
  ]
    .filter(Boolean)
    .join("\n");

  return {
    appHtml,
    headTags,
    statusCode,
  };
}
