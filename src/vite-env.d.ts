/// <reference types="vite/client" />

import type { BlogInitialDataPayload } from "@/lib/blog";

interface ImportMetaEnv {
  readonly VITE_WOOCOMMERCE_ACCOUNT_URL?: string;
}

declare global {
  interface Window {
    __CELLIVO_INITIAL_DATA__?: BlogInitialDataPayload;
  }
}
