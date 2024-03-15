import NextImage from "@/components/next/image";
import Link from "@/components/next/link";
import Noise from "@/components/noise";
import { BLUR_URL } from "@/data/constant";
import { Post } from "@/model/post";
import moment from "moment";

type NotionGalleryItemProps = Post;

const NotionGalleryItem = ({
  Description,
  Id,
  PublishedDate,
  Slug,
  Title,
  Cover,
  Icon,
  Tags,
}: NotionGalleryItemProps) => {
  return (
    <>
      <Link
        id={Id}
        className="bg-card hover:bg-secondary hover:text-secondary-foreground  text-card-foreground relative group overflow-hidden shadow-lg rounded-sm dark:shadow-muted/40"
        href={`/blog/${Slug}`}
      >
        <div className="h-48 w-full border-b border-foreground/50 relative overflow-hidden">
          <NextImage
            alt={Title}
            width={309}
            height={191}
            priority
            unoptimized
            sizes="100vw"
            src={
              (Cover?.type === "external"
                ? Cover.external.url
                : Cover?.file.url) || BLUR_URL
            }
            className="object-cover object-center h-full w-full group-hover:scale-110 transition-transform"
          />
          <Noise />
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
                className={`notion-property-multi_select-item notion-item-${tag.color}`}
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
