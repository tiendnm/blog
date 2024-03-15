"use client";

import {
  DatabaseObjectResponse,
  PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { ReactNode, createContext, useContext } from "react";

type NotionClientProviderProps = {
  children: ReactNode;
  dbInfo: DatabaseObjectResponse;
  rootPage: PageObjectResponse;
};
type Notion = {
  dbInfo?: DatabaseObjectResponse;
  rootPage?: PageObjectResponse;
};
const NotionContext = createContext<Notion>({});
const NotionClientProvider = ({
  children,
  dbInfo,
  rootPage,
}: NotionClientProviderProps) => {
  return (
    <NotionContext.Provider
      value={{
        dbInfo,
        rootPage,
      }}
    >
      {children}
    </NotionContext.Provider>
  );
};
export const useNotion = () => {
  const context = useContext(NotionContext);
  return context;
};
export default NotionClientProvider;
