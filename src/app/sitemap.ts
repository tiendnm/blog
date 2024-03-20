import { BASE_URL } from "@/data/constant";
import { getDatabaseInfo, getLatestPosts } from "@/lib/notion-v2";
import { getTags } from "@/lib/notion-v2/utils";
import { MinifiedPost, toMinifiedPost } from "@/model/post";
import { MetadataRoute } from "next";
export const runtime = "edge";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, tags] = await Promise.all([fetchAllPost(), fetchAllTags()]);
  const sitemapPosts = posts.map((item) => {
    return {
      url: `${BASE_URL}/blog/${item.Slug}`,
      lastModified: item.LastEditedTime,
      priority: 0.8,
    };
  });

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
  const posts = await getLatestPosts({
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
