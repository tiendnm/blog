import { Skeleton } from "@/components/ui/skeleton";
import { FC } from "react";
import NotionGallery from ".";

type NotionGalleryLoadingProps = {
  length: number;
};

const NotionGalleryLoading: FC<NotionGalleryLoadingProps> = ({ length }) => {
  return (
    <NotionGallery>
      {Array.from({ length }).map((_, i) => {
        return <NotionGalleryItemLoading key={i} />;
      })}
    </NotionGallery>
  );
};

export default NotionGalleryLoading;

const NotionGalleryItemLoading = () => {
  return (
    <>
      <div className="bg-card hover:bg-secondary hover:text-secondary-foreground  text-card-foreground relative group overflow-hidden rounded-sm shadow-md">
        <div className="h-48 w-full relative overflow-hidden">
          <Skeleton className="w-full h-full rounded-none" />
        </div>
        <span className="flex gap-2 flex-nowrap pt-2 px-2">
          <Skeleton className="w-5 h-5" />
          <Skeleton className="flex-1 h-4" />
        </span>
        <div className="px-2 pt-2 mb-2 text-xs">
          <Skeleton className="w-1/2 h-4 px-2 pt-2 mb-2" />
        </div>
        <div className="px-2 mb-2 text-xs line-clamp-2 text-secondary-foreground">
          <Skeleton className="w-full h-8" />
        </div>
        <div className="flex gap-2 px-2 mb-2 text-xs">
          {Array.from({ length: 2 }).map((tag, i) => {
            return <Skeleton key={i} className={"w-10 h-4"}></Skeleton>;
          })}
        </div>
      </div>
    </>
  );
};
