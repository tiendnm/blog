import { GiscusProps } from "@giscus/react";
import { useQuery } from "@tanstack/react-query";
import { ReactNode, createContext, useContext } from "react";
import { getGiscusConfig } from "./config";

type GiscusContextProps = {
  children: ReactNode;
};

type GiscusContext = { config?: GiscusProps };

const initialGiscusContext: GiscusContext = {};
const giscusContext = createContext<GiscusContext>(initialGiscusContext);

const GiscusContextProvider = ({ children }: GiscusContextProps) => {
  const config = useQuery({
    queryKey: ["giscus config"],
    queryFn: async () => {
      const data = await getGiscusConfig();
      return data;
    },
    refetchOnMount: false,
  });
  return (
    <giscusContext.Provider
      value={{
        config: config.data,
      }}
    >
      {children}
    </giscusContext.Provider>
  );
};

export const useGiscusContext = () => useContext(giscusContext);

export default GiscusContextProvider;
