"use client";
import { inputVariants } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useTheme } from "@/providers/theme";
import algoliasearch from "algoliasearch";
import Image from "next/image";
import { Configure, Hits, InstantSearch, SearchBox } from "react-instantsearch";
import algoliaBlue from "../assets/Algolia-mark-blue.png";
import algoliaWhite from "../assets/Algolia-mark-white.png";
import { AlgoliaConfig } from "../config";
import { Hit } from "./hit";
import { useAlgoliaContext } from "./provider";

let timerId: NodeJS.Timeout | undefined = undefined;
let timeout = 500;
const queryHook = (query: string, search: (value: string) => void) => {
  if (timerId) {
    clearTimeout(timerId);
  }
  timerId = setTimeout(() => search(query), timeout);
};

export const SearchPanel = () => {
  const algolia = useAlgoliaContext();
  if (!algolia.config) {
    return <></>;
  } else {
    return <AlgoliaSearch config={algolia.config} />;
  }
};

const AlgoliaSearch = ({ config }: { config: AlgoliaConfig }) => {
  const theme = useTheme();
  const algoliaClient = algoliasearch(config.appID, config.token);
  return (
    <InstantSearch
      searchClient={algoliaClient}
      indexName={config.indexName}
      future={{
        preserveSharedStateOnUnmount: true,
      }}
    >
      <Configure hitsPerPage={5} />
      <div className="flex flex-col gap-2">
        <div className="flex flex-nowrap flex-row relative">
          <div className="absolute flex h-full items-center left-1.5 pointer-events-none select-none">
            <Image
              src={theme.darkMode ? algoliaWhite : algoliaBlue}
              width={24}
              height={24}
              alt="algolia logo"
              className="object-contain w-6 h-6 "
            />
          </div>
          <SearchBox
            className="flex-1"
            classNames={{
              input: cn(inputVariants(), "pl-10"),
              submit: "hidden",
              reset: "hidden",
              loadingIndicator: "hidden",
            }}
            loadingIconComponent={() => "Loading…"}
            queryHook={queryHook}
          />
        </div>
        <Hits
          hitComponent={Hit}
          className="max-h-[400px] min-h-[400px] overflow-y-auto"
        />
      </div>
    </InstantSearch>
  );
};
