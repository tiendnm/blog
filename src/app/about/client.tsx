"use client";

import NotionCustomRenderer from "@/components/notion/renderer";
import Giscus from "@/lib/giscus/client";
import { ExtendedRecordMap } from "@/lib/notion/notion-types";
import { useTheme } from "@/providers/theme";
type ClientProps = { recordMap: ExtendedRecordMap };

const Client = ({ recordMap }: ClientProps) => {
  const { darkMode } = useTheme();
  return (
    <>
      <NotionCustomRenderer
        darkMode={darkMode}
        recordMap={recordMap}
        isLinkCollectionToUrlProperty
        linkTableTitleProperties
        showTableOfContents
        className="text-secondary-foreground !w-full px-0"
        previewImages
      />
      <Giscus />
    </>
  );
};

export default Client;
