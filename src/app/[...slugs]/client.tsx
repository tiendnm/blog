"use client";

import NotionGallery from "@/components/notion/gallery";
import NotionGalleryItem from "@/components/notion/gallery/item";
import { NotionGalleryLoading } from "@/components/notion/loading";
import { cn } from "@/lib/utils";
import { PackageOpenIcon } from "lucide-react";
import { useBlogListContext } from "./context";

const Client = () => {
  const { notionBlog, state, goToPage, goBack, route } = useBlogListContext();
  if (notionBlog?.isFetching) {
    return (
      <NotionGalleryLoading length={notionBlog?.data?.results.length || 6} />
    );
  }
  if (notionBlog?.data?.results.length === 0) {
    return (
      <>
        <div className="flex flex-col justify-center items-center pt-14 gap-4">
          <PackageOpenIcon className="text-muted-foreground" size={100} />
          <p className="text-xl font-light text-muted-foreground">
            không có bài viết nào được tìm thấy
          </p>
        </div>
      </>
    );
  }
  return (
    <>
      <NotionGallery>
        {notionBlog?.data?.results.map((post_obj) => {
          return <NotionGalleryItem key={post_obj.id} {...post_obj} />;
        })}
      </NotionGallery>

      <div className={cn("flex mt-5 empty:mt-0")}>
        {state.page > 0 && (
          <div className="flex-1 text-left text-foreground">
            <button
              onClick={(e) => {
                goBack();
              }}
            >
              Trang trước
            </button>
          </div>
        )}
        {notionBlog?.data?.has_more && (
          <div className="flex-1 text-right  text-foreground">
            <button
              onClick={async (e) => {
                goToPage(notionBlog?.data.next_cursor || undefined);
              }}
            >
              Trang tiếp
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Client;
