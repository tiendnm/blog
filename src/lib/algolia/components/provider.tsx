"use client";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

type AlgoliaContext = {
  searchVisible: boolean;
  setSearchVisible: Dispatch<SetStateAction<boolean>>;
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
  return (
    <algoliaContext.Provider
      value={{
        searchVisible,
        setSearchVisible,
      }}
    >
      {children}
    </algoliaContext.Provider>
  );
};

export const useAlgoliaContext = () => {
  return useContext(algoliaContext);
};
