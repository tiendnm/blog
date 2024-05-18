"use client";
import Giscus from "@/lib/giscus/client";
import { increasePostView } from "@/lib/notion-v2";
import { columnMap } from "@/lib/notion-v2/utils";
import { ExtendedRecordMap } from "@/lib/notion/notion-types";
import { toPost } from "@/model/post";
import { useTheme } from "@/providers/theme";
import {
  DatabaseObjectResponse,
  PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { CoverLoading, RendererLoading, TitleLoading } from "../loading";

const NotionCover = dynamic(() => import("../cover"), {
  loading: CoverLoading,
});
const NotionTitle = dynamic(() => import("../title"), {
  loading: TitleLoading,
});
const NotionCustomRenderer = dynamic(() => import("../renderer"), {
  loading: RendererLoading,
});

const RenderNotionPageClient = ({
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
  const colMap = columnMap(dbInfo.properties);

  const postInfo = toPost(post);

  useEffect(() => {
    const env = process.env.NODE_ENV;
    if (env === "production") {
      timeoutRef.current = setTimeout(() => {
        increasePostView(postInfo.Id);
        console.log("view is increased");
        clearTimeout(timeoutRef.current);
      }, 1000 * 10); // increase view after 10 second
      return () => {
        clearTimeout(timeoutRef.current);
        console.log("view is not increased");
      };
    }
  }, [postInfo.Id]);

  return (
    <>
      <NotionCover src={recordMap.signed_urls[post.id]} mixblend />
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
        <div className="py-2">
          <p className="text-xs text-muted-foreground italic">
            lượt xem: {postInfo.View}
          </p>
        </div>
        <Giscus />
      </div>
    </>
  );
};
RenderNotionPageClient.displayName = "RenderNotionPageClient";
export default RenderNotionPageClient;
