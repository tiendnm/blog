import { REVALIDATE } from "@/data/constant";
import { unstable_cache } from "next/cache";
import {
  fetchLatestPosts,
  fetchMostViewedPosts,
  fetchPageBySlug,
  fetchPagesByTag,
  getDatabaseInfo,
  getPageInfo,
} from ".";
export const cache_getDatabaseInfo = unstable_cache(
  getDatabaseInfo,
  ["official", "getDatabaseInfo"],
  {
    revalidate: REVALIDATE,
    tags: ["official", "getDatabaseInfo"],
  }
);
export const cache_getPageInfo = unstable_cache(
  getPageInfo,
  ["official", "getPageInfo"],
  {
    revalidate: REVALIDATE,
    tags: ["official", "official", "getPageInfo"],
  }
);
export const cache_fetchPagesByTag = unstable_cache(
  fetchPagesByTag,
  ["official", "fetchPagesByTag"],
  {
    revalidate: REVALIDATE,
    tags: ["official", "fetchPagesByTag"],
  }
);
export const cache_fetchLatestPosts = unstable_cache(
  fetchLatestPosts,
  ["official", "fetchLatestPosts"],
  {
    revalidate: REVALIDATE,
    tags: ["official", "fetchLatestPosts"],
  }
);
export const cache_fetchMostViewedPosts = unstable_cache(
  fetchMostViewedPosts,
  ["official", "fetchMostViewedPosts"],
  {
    revalidate: REVALIDATE,
    tags: ["official", "fetchMostViewedPosts"],
  }
);
export const cache_fetchPageBySlug = unstable_cache(
  fetchPageBySlug,
  ["official", "fetchPageBySlug"],
  {
    revalidate: REVALIDATE,
    tags: ["official", "fetchPageBySlug"],
  }
);
