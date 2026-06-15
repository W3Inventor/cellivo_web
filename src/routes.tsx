import { useRoutes } from "react-router-dom";
import type { RouteObject } from "react-router-dom";

export const AppRoutes = ({ routes }: { routes: RouteObject[] }) => useRoutes(routes);
