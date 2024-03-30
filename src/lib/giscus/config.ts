"use server";
import { GiscusProps } from "@giscus/react";

export const getGiscusConfig = (): GiscusProps => {
  return {
    id: "comments",
    // @ts-ignore
    repo: process.env.GISCUS_REPO!,
    repoId: process.env.GISCUS_REPO_ID!,
    category: process.env.GISCUS_CATEGORY!,
    categoryId: process.env.GISCUS_CATEGORY_ID,
    mapping: "pathname",
    reactionsEnabled: "1",
    emitMetadata: "0",
    inputPosition: "top",
    lang: "vi",
    loading: "lazy",
  };
};
