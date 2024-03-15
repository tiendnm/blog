import { BASE_URL } from "@/data/constant";
import { fetchLatestPosts, getDatabaseInfo } from "@/lib/notion/official";
import { getTags } from "@/lib/notion/official/utils";
import { MinifiedPost, toMinifiedPost } from "@/model/post";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await fetchAllPost();
  const sitemapPosts = posts.map((item) => {
    return {
      url: `${BASE_URL}/blog/${item.Slug}`,
      lastModified: item.LastEditedTime,
      priority: 0.8,
    };
  });
  const tags = await fetchAllTags();
  const sitemapTags = tags.map((item) => {
    return {
      url: `${BASE_URL}/tag/${item.name}`,
      priority: 0.5,
    };
  });
  return [
    {
      url: `${BASE_URL}`,
      priority: 1,
    },
    {
      url: `${BASE_URL}/home`,
      priority: 1,
    },
    {
      url: `${BASE_URL}/about`,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blogs`,
      priority: 0.5,
    },
    ...sitemapTags,
    ...sitemapPosts,
  ];
}
const fetchAllPost = async (start?: string | null): Promise<MinifiedPost[]> => {
  const posts = await fetchLatestPosts({
    start_cursor: start || undefined,
  });
  const mapPost = posts.results.map(toMinifiedPost);
  if (posts.has_more) {
    const more = await fetchAllPost(posts.next_cursor);
    return [...mapPost, ...more];
  }
  return [...mapPost];
};

const fetchAllTags = async () => {
  const dbInfo = await getDatabaseInfo();
  const tags = getTags(dbInfo.properties);
  return tags;
};
