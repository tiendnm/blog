import { getTags } from "@/lib/notion-v2/utils";

import {
  getDatabaseInfo,
  getLatestPosts,
  getPostsByTag,
  signCover,
} from "@/lib/notion-v2";
import { Metadata } from "next";
import Client from "./client";
import BlogListContextProvider from "./context";
export const runtime = "edge";
export const revalidate = 30;
type PageProps = { params: { slugs: string[] } };

export async function generateMetadata({
  params: { slugs },
}: PageProps): Promise<Metadata> {
  const route = slugs[0];
  const slug = slugs[1];
  if (route === "blogs") {
    return {
      title: `tất cả bài viết`,
      description: `danh sách các bài viết.`,
    };
  }
  return {
    title: `bài viết về ${slug}`,
    description: `danh sách các bài viết về chủ đề ${slug}.`,
  };
}

const Page = async ({ params: { slugs } }: PageProps) => {
  const route = slugs[0];
  const slug = slugs[1];
  if (route === "blogs" && slug === undefined) {
    return <BlogsPage slugs={slugs} />;
  }
  if (route === "tag" && slug !== undefined) {
    return <TagPage slugs={slugs} />;
  }
  return <></>;
};

export default Page;

const BlogsPage = async ({ slugs }: { slugs: string[] }) => {
  const route = slugs[0];
  const slug = slugs[1];

  const pageSize = 6;
  const initialData = await getLatestPosts({
    page_size: pageSize,
  });
  await signCover(initialData.results);
  return (
    <BlogListContextProvider
      initialData={initialData}
      pageSize={pageSize}
      route={route}
      slug={slug}
    >
      <Client />
    </BlogListContextProvider>
  );
};
const TagPage = async ({ slugs }: { slugs: string[] }) => {
  const route = slugs[0];
  const slug = slugs[1];
  const dbInfo = await getDatabaseInfo();
  const tags = getTags(dbInfo.properties).map((tag) => tag.name);
  if (!tags.includes(slug)) {
    return <></>;
  }
  const pageSize = 6;
  const initialData = await getPostsByTag(slug, {
    page_size: pageSize,
  });
  await signCover(initialData.results);
  return (
    <BlogListContextProvider
      initialData={initialData}
      pageSize={pageSize}
      route={route}
      slug={slug}
    >
      <Client />
    </BlogListContextProvider>
  );
};
