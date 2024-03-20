import NextImage from "@/components/next/image";
import Link from "@/components/next/link";
import SignCover from "@/components/notion/fallback-cover";
import { BLUR_URL } from "@/data/constant";
import { cn } from "@/lib/utils";
import { toPost } from "@/model/post";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import moment from "moment";
import { Suspense } from "react";
import { NotionGalleryCoverLoading } from "../loading";

type NotionGalleryItemProps = PageObjectResponse;

const NotionGalleryItem = async (props: NotionGalleryItemProps) => {
  const { Description, Id, PublishedDate, Slug, Title, Cover, Icon, Tags } =
    toPost(props);
  return (
    <>
      <Link
        scroll
        id={Id}
        className="bg-card hover:bg-secondary hover:text-secondary-foreground  text-card-foreground relative group overflow-hidden shadow-lg rounded-sm dark:shadow-muted/40"
        href={`/blog/${Slug}`}
      >
        <div
          className={cn(
            "h-48 w-full border-b border-foreground/50 relative overflow-hidden",
            "bg-gradient-to-r",
            "from-sky-200 to-pink-200",
            "dark:from-sky-700 dark:to-purple-900/40"
          )}
        >
          <Suspense fallback={<NotionGalleryCoverLoading />}>
            <SignCover
              alt={Title}
              postCover={Cover}
              postId={Id}
              width={309}
              height={191}
              unoptimized
              sizes="100vw"
              className={cn("h-full w-full object-cover mix-blend-overlay")}
            />
          </Suspense>
        </div>
        <span className="flex gap-2 flex-nowrap pt-2 px-2">
          {Icon?.type === "emoji" ? (
            <span
              className="notion-page-title-icon notion-page-icon"
              role="img"
              aria-label={Icon.emoji}
            >
              {Icon.emoji}
            </span>
          ) : (
            <>
              <NextImage
                alt={Title}
                width={22}
                height={22}
                sizes="100vw"
                src={
                  (Icon?.type === "external"
                    ? Icon.external.url
                    : Icon?.file.url) || BLUR_URL
                }
                className="w-5 h-5"
                placeholder={undefined}
              />
            </>
          )}
          <span className="text-ellipsis overflow-hidden whitespace-nowrap lowercase">
            {Title}
          </span>
        </span>
        <div className="px-2 mb-2 text-xs">
          {moment(PublishedDate).format("DD/MM/YYYY")}
        </div>
        <div className="px-2 mb-2 text-xs line-clamp-2 text-secondary-foreground lowercase">
          {Description}
        </div>
        <div className="flex gap-2 px-2 mb-2 text-xs">
          {Tags.map((tag) => {
            return (
              <div
                key={tag.id}
                className={`text-foreground notion-property-multi_select-item notion-item-${tag.color}`}
              >
                {tag.name}
              </div>
            );
          })}
        </div>
      </Link>
    </>
  );
};

export default NotionGalleryItem;
