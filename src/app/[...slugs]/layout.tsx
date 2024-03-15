import withCover from "@/HOCs/with-cover";
import Link from "@/components/next/link";
import NotionTitle from "@/components/notion/title";
import { getDatabaseInfo } from "@/lib/notion/official";
import { getTags } from "@/lib/notion/official/utils";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

const BlogsLayout = async ({ children }: { children: ReactNode }) => {
  const dbInfo = await getDatabaseInfo();
  const tags = getTags(dbInfo.properties);

  return (
    <>
      <NotionTitle title="Bài viết" className="lowercase" />
      <div className="flex gap-3 mt-5 flex-wrap">
        <Link
          href={`/blogs`}
          className={cn(
            "notion-property-multi_select-item bg-opacity-100",
            `bg-primary text-primary-foreground hover:scale-125 transition-transform`
          )}
        >
          all
        </Link>
        {tags.map((tag) => {
          return (
            <Link
              href={`/tag/${tag.name.toLowerCase()}`}
              key={tag.id}
              className={cn(
                "notion-property-multi_select-item bg-opacity-100",
                `notion-item-${tag.color} text-foreground hover:scale-125 transition-transform`
              )}
            >
              {tag.name}
            </Link>
          );
        })}
      </div>
      {children}
    </>
  );
};

export default withCover(BlogsLayout);
