"use client";
import { useQuery } from "@tanstack/react-query";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  use,
  useState,
} from "react";
import { AlgoliaConfig, getAlgoliaConfig } from "../config";

type AlgoliaContext = {
  searchVisible: boolean;
  setSearchVisible: Dispatch<SetStateAction<boolean>>;
  config?: AlgoliaConfig;
};
const initialContext: AlgoliaContext = {
  searchVisible: false,
  setSearchVisible: () => {},
};
const algoliaContext = createContext<AlgoliaContext>(initialContext);

export const AlgoliaProvider = ({ children }: { children: ReactNode }) => {
  const [searchVisible, setSearchVisible] = useState<boolean>(
    initialContext.searchVisible
  );
  const config = useQuery({
    queryKey: ["algolia config"],
    queryFn: async () => {
      const data = await getAlgoliaConfig();
      return data;
    },
    refetchOnMount: false,
  });
  return (
    <algoliaContext.Provider
      value={{
        searchVisible,
        setSearchVisible,
        config: config.data,
      }}
    >
      {children}
    </algoliaContext.Provider>
  );
};

export const useAlgoliaContext = () => {
  return use(algoliaContext);
};
