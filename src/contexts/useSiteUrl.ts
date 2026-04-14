import { useContext } from "react";
import { SiteUrlContext } from "./site-url-context";

export const useSiteUrl = () => useContext(SiteUrlContext);
