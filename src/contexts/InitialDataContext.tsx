import { createContext, type ReactNode, useContext } from "react";
import type { BlogInitialDataPayload } from "@/lib/blog";

const InitialDataContext = createContext<BlogInitialDataPayload>({});

export const InitialDataProvider = ({
  children,
  initialData,
}: {
  children: ReactNode;
  initialData?: BlogInitialDataPayload;
}) => <InitialDataContext.Provider value={initialData ?? {}}>{children}</InitialDataContext.Provider>;

export const useInitialData = () => useContext(InitialDataContext);
