import { createElement } from "react";
import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./src/App.tsx";
import "./src/index.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element '#root' was not found.");
}

hydrateRoot(
  rootElement,
  createElement(
    BrowserRouter,
    null,
    createElement(App, { siteUrl: window.location.origin }),
  ),
);
