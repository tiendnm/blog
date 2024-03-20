import withCover from "@/HOCs/with-cover";
import NotionGallery from "@/components/notion/gallery";
import NotionGalleryItem from "@/components/notion/gallery/item";
import { TitleLoading } from "@/components/notion/loading";
import { getMostViewedPosts } from "@/lib/notion-v2";
import { default as next_dynamic } from "next/dynamic";
export const runtime = "edge";
export const revalidate = 30;
const NotionTitle = next_dynamic(() => import("@/components/notion/title"), {
  loading: TitleLoading,
});
async function Page() {
  const posts = await getMostViewedPosts({
    page_size: 6,
  });
  return (
    <>
      <NotionTitle title="Trang chủ" className="lowercase" />
      <NotionGallery>
        {posts.results.map((post_obj) => {
          return <NotionGalleryItem key={post_obj.id} {...post_obj} />;
        })}
      </NotionGallery>
    </>
  );
}
export default withCover(Page);
