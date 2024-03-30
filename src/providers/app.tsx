"use client";
import GiscusContextProvider from "@/lib/giscus/provider";
import { AlgoliaProvider } from "../lib/algolia/components/provider";
import { QueryProvider } from "./query-client";
import { RecoilProvider } from "./recoil";
import { ThemeContextProvider } from "./theme";
const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <RecoilProvider>
        <QueryProvider>
          <ThemeContextProvider>
            <GiscusContextProvider>
              <AlgoliaProvider>{children}</AlgoliaProvider>
            </GiscusContextProvider>
          </ThemeContextProvider>
        </QueryProvider>
      </RecoilProvider>
    </>
  );
};

export default AppProvider;
