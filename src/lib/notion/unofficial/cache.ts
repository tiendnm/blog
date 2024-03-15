import { REVALIDATE } from "@/data/constant";
import { unstable_cache } from "next/cache";
import { getPage, getSignedFileUrls } from ".";

export const cache_getPage = unstable_cache(
  getPage,
  ["unofficial", "getPage"],
  {
    revalidate: REVALIDATE,
    tags: ["unofficial", "getPage"],
  }
);
export const cache_getSignedFileUrls = unstable_cache(
  getSignedFileUrls,
  ["unofficial", "getSignedFileUrls"],
  {
    revalidate: REVALIDATE,
    tags: ["unofficial", "getSignedFileUrls"],
  }
);
