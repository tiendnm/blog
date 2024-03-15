import withCover from "@/HOCs/with-cover";
import NotionGallery from "@/components/notion/gallery";
import NotionGalleryItem from "@/components/notion/gallery/item";
import { TitleLoading } from "@/components/notion/title";
import { fetchMostViewedPosts } from "@/lib/notion/official";
import { toPost } from "@/model/post";
import { default as next_dynamic } from "next/dynamic";

const NotionTitle = next_dynamic(() => import("@/components/notion/title"), {
  loading: TitleLoading,
});
async function Page() {
  const posts = await fetchMostViewedPosts({
    page_size: 6,
  });
  return (
    <>
      <NotionTitle title="Trang chủ" className="lowercase" />
      <NotionGallery>
        {posts.results.map((post_obj) => {
          const post = toPost(post_obj);
          return <NotionGalleryItem key={post.Id} {...post} />;
        })}
      </NotionGallery>
    </>
  );
}
export default withCover(Page);
