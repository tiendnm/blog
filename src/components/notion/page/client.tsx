"use client";
import { ExtendedRecordMap } from "@/lib/notion/notion-types";
import { increaseView } from "@/lib/notion/official";
import { columnMap } from "@/lib/notion/official/utils";
import { toPost } from "@/model/post";
import { useTheme } from "@/providers/theme";
import {
  DatabaseObjectResponse,
  PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import dynamic from "next/dynamic";
import { memo, useEffect, useMemo, useRef } from "react";
import { CoverLoading } from "../cover";
import { RendererLoading } from "../renderer";
import { TitleLoading } from "../title";

const Giscus = dynamic(() => import("@/components/giscus"), { ssr: false });
const NotionCover = dynamic(() => import("../cover"), {
  loading: CoverLoading,
});
const NotionTitle = dynamic(() => import("../title"), {
  loading: TitleLoading,
});
const NotionCustomRenderer = dynamic(() => import("../renderer"), {
  loading: RendererLoading,
});

export const PageLoading = () => {
  return (
    <>
      <CoverLoading />
      <div className="px-5 lg:px-10">
        <TitleLoading />
        <RendererLoading />
      </div>
    </>
  );
};

const RenderNotionPageClient = memo(
  ({
    recordMap,
    dbInfo,
    post,
  }: {
    recordMap: ExtendedRecordMap;
    dbInfo: DatabaseObjectResponse;
    post: PageObjectResponse;
  }) => {
    const { darkMode } = useTheme();
    const timeoutRef = useRef<NodeJS.Timeout | number>(0);
    const colMap = useMemo(() => {
      return columnMap(dbInfo.properties);
    }, [dbInfo.properties]);

    const postInfo = useMemo(() => {
      return toPost(post);
    }, [post]);

    useEffect(() => {
      timeoutRef.current = setTimeout(() => {
        increaseView(postInfo.Id);
      }, 1000 * 5); // increase view after 3 second
      return () => {
        clearTimeout(timeoutRef.current);
      };
    }, [postInfo.Id]);

    return (
      <>
        <NotionCover info={post} />
        <div className="px-5 lg:px-10 ">
          <NotionTitle
            title={postInfo.Title}
            description={postInfo.Description}
          />
          <NotionCustomRenderer
            darkMode={darkMode}
            recordMap={recordMap}
            isLinkCollectionToUrlProperty
            linkTableTitleProperties
            showTableOfContents
            mapPageUrl={(url) => {
              const slugColumnId = colMap["Slug"];
              const slug =
                recordMap.block[url].value.properties[slugColumnId]?.[0]?.[0];
              if (slug) return `/blog/${slug}`;
              return url;
            }}
            className="text-secondary-foreground !w-full px-0"
            previewImages
          />
          <Giscus />
        </div>
      </>
    );
  }
);
RenderNotionPageClient.displayName = "RenderNotionPageClient";
export default RenderNotionPageClient;
