"use client";
import GiscusContextProvider from "@/lib/giscus/provider";
import { AlgoliaProvider } from "../lib/algolia/components/provider";
import { QueryProvider } from "./query-client";
import { ThemeContextProvider } from "./theme";
const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <QueryProvider>
        <ThemeContextProvider>
          <GiscusContextProvider>
            <AlgoliaProvider>{children}</AlgoliaProvider>
          </GiscusContextProvider>
        </ThemeContextProvider>
      </QueryProvider>
    </>
  );
};

export default AppProvider;
