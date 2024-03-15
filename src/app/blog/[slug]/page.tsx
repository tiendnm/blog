import RenderNotionPage from "@/components/notion/page";
import { fetchPageBySlug } from "@/lib/notion/official";
import { parseCoverAndIconToUrl, toPost } from "@/model/post";
import { Metadata, ResolvingMetadata } from "next";
import { unstable_cache } from "next/cache";
export const runtime = "edge";
type Props = {
  params: { slug: string };
};

const c_fetchPageBySlug = unstable_cache(
  fetchPageBySlug,
  ["c_fetchPageBySlug"],
  {
    revalidate: 10,
  }
);

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.slug;

  // fetch data
  const postObject = await c_fetchPageBySlug(slug);
  const post = toPost(postObject);
  const coverUrl = parseCoverAndIconToUrl(post.Cover);

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];
  const title = post.Title.toLowerCase();
  const description = post.Description.toLowerCase();
  return {
    title: title,
    description: description,
    openGraph: {
      images: [coverUrl, ...previousImages],
    },
  };
}

async function Page({ params }: Props) {
  if (!params.slug) return <></>;
  const post = await c_fetchPageBySlug(params.slug);
  return (
    <>
      <RenderNotionPage post={post} />
    </>
  );
}
export default Page;
