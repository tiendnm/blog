import { getPostBySlug } from "@/lib/notion-v2";
import { toPost } from "@/model/post";
import { Metadata, ResolvingMetadata } from "next";
import { unstable_cache } from "next/cache";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
export const runtime = "edge";
export const revalidate = 30;
type Props = {
  params: { slug: string };
};
const RenderNotionPageClient = dynamic(
  () => import("@/components/notion/page/client")
);

const getPageBySlug_cache = unstable_cache(getPostBySlug, ["getPostBySlug"], {
  revalidate,
});

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.slug;

  // fetch data
  const postObject = await getPageBySlug_cache(slug);
  const post = toPost(postObject.page);
  const title = post.Title.toLowerCase();
  const description = post.Description.toLowerCase();
  const coverUrl = postObject.recordMap.signed_urls[post.Id];
  return {
    title,
    description,
    openGraph: {
      images: coverUrl,
    },
    twitter: {
      card: "summary_large_image",
      images: coverUrl,
    },
  };
}

async function Page({ params }: Props) {
  if (!params.slug) return notFound();
  const query = await getPageBySlug_cache(params.slug);
  return (
    <>
      <RenderNotionPageClient
        dbInfo={query.dbInfo}
        post={query.page}
        recordMap={query.recordMap}
      />
    </>
  );
}
export default Page;
