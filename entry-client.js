import "./src/index.css";

const rootElement = document.getElementById("root");
const initialData = window.__CELLIVO_INITIAL_DATA__ ?? {};
const routerFuture = {
  v7_startTransition: true,
  v7_relativeSplatPath: true,
};

if (!rootElement) {
  throw new Error("Root element '#root' was not found.");
}

let hydrationStarted = false;

const start = async () => {
  if (hydrationStarted) return;
  hydrationStarted = true;

  const [{ createElement }, { hydrateRoot }, { BrowserRouter }, { default: App }, routeConfig] = await Promise.all([
    import("react"),
    import("react-dom/client"),
    import("react-router-dom"),
    import("./src/App.tsx"),
    import("./src/route-config.tsx"),
  ]);

  const { appRoutes, preloadRouteForPath } = routeConfig;

  await preloadRouteForPath(window.location.pathname);

  hydrateRoot(
    rootElement,
    createElement(
      BrowserRouter,
      { future: routerFuture },
      createElement(App, {
        routes: appRoutes,
        siteUrl: import.meta.env.VITE_SITE_URL || "https://cellivo.com",
        initialData,
      }),
    ),
  );
};

const shouldHydrateImmediately = /^\/(admin|contact|login|signup)(\/|$)/.test(window.location.pathname);

if (shouldHydrateImmediately) {
  void start();
} else {
  let fallbackTimer;
  const interactionEvents = ["pointerdown", "keydown", "touchstart"];
  const startOnInteraction = (event) => {
    const pendingButton =
      event.target instanceof Element ? event.target.closest("button") : null;

    cleanup();
    void start().then(() => {
      if (pendingButton?.isConnected) {
        window.setTimeout(() => pendingButton.click(), 0);
      }
    });
  };
  const startAfterPageSettle = () => {
    fallbackTimer = window.setTimeout(() => {
      cleanup();
      void start();
    }, 4000);
  };
  const cleanup = () => {
    if (fallbackTimer) {
      window.clearTimeout(fallbackTimer);
    }
    interactionEvents.forEach((eventName) => {
      window.removeEventListener(eventName, startOnInteraction);
    });
  };

  interactionEvents.forEach((eventName) => {
    window.addEventListener(eventName, startOnInteraction, { once: true, passive: true });
  });

  if (document.readyState === "complete") {
    startAfterPageSettle();
  } else {
    window.addEventListener("load", startAfterPageSettle, { once: true });
  }
}
