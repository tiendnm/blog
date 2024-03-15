"use client";

import NotionCustomRenderer from "@/components/notion/renderer";
import { ExtendedRecordMap } from "@/lib/notion/unofficial";
import { useTheme } from "@/providers/theme";
import dynamic from "next/dynamic";
const Giscus = dynamic(() => import("@/components/giscus"), { ssr: false });
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
