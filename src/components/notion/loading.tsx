import { cn } from "@/lib/utils";
import { FC } from "react";
import { Skeleton } from "../ui/skeleton";

export const CoverLoading = () => {
  return <Skeleton className="h-[8vh] md:h-[20vh] w-full rounded-none" />;
};

export const TitleLoading = () => {
  return (
    <div className="space-y-2 mt-2">
      <Skeleton className="h-8 w-1/2" />
      <Skeleton className="h-12 w-2/3" />
    </div>
  );
};

const RENDERDER_LOADING_LENGTH = 20;
export const RendererLoading = () => {
  return (
    <div className="w-full space-y-2 mt-2">
      {Array.from({ length: RENDERDER_LOADING_LENGTH }).map((_, index) => {
        const random = Math.floor(Math.random() * 3) as 0 | 1 | 2;
        return (
          <Skeleton
            key={index}
            className={cn("h-8", {
              "w-1/2": random === 0,
              "w-full": random === 1,
              "w-2/3": random === 2,
            })}
          />
        );
      })}
    </div>
  );
};
export const PageLoading = () => {
  return (
    <>
      <CoverLoading />
      <div className="px-5 lg:px-10">
        <TitleLoading />
        <RendererLoading />
      </div>
    </>
  );
};

type NotionGalleryLoadingProps = {
  length: number;
};

export const NotionGalleryLoading: FC<NotionGalleryLoadingProps> = ({
  length,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-5">
      {Array.from({ length }).map((_, i) => {
        return <NotionGalleryItemLoading key={i} />;
      })}
    </div>
  );
};

export const NotionGalleryItemLoading = () => {
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
        <div className="px-2 pt-2 mb-2 text-xs">
          <Skeleton className="w-1/4 h-4 px-2 pt-2 mb-2" />
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
export const NotionGalleryCoverLoading = () => {
  return <Skeleton className="w-full h-full rounded-none" />;
};
