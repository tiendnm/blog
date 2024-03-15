"use client";
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
            <AlgoliaProvider>{children}</AlgoliaProvider>
          </ThemeContextProvider>
        </QueryProvider>
      </RecoilProvider>
    </>
  );
};

export default AppProvider;
