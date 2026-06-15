import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { matchRoutes } from "react-router-dom";
import { StaticRouter } from "react-router-dom/server";
import App from "./src/App.tsx";
import { appRoutes } from "./src/route-config.server.tsx";

const routerFuture = {
  v7_startTransition: true,
  v7_relativeSplatPath: true,
};

export function render(url, { siteUrl, initialData = {}, statusCode: overrideStatusCode } = {}) {
  const helmetContext = {};

  const appHtml = renderToString(
    createElement(
      StaticRouter,
      { location: url, future: routerFuture },
      createElement(App, { helmetContext, routes: appRoutes, siteUrl, initialData }),
    ),
  );

  const { helmet } = helmetContext;
  const matchedRoutes = matchRoutes(appRoutes, url);
  const lastMatch = matchedRoutes?.[matchedRoutes.length - 1];
  const statusCode = overrideStatusCode ?? (lastMatch?.route?.path === "*" ? 404 : 200);
  const headTags = [
    helmet?.title?.toString(),
    helmet?.priority?.toString(),
    helmet?.meta?.toString(),
    helmet?.link?.toString(),
    helmet?.script?.toString(),
  ]
    .filter(Boolean)
    .join("\n");

  return {
    appHtml,
    headTags,
    statusCode,
  };
}
