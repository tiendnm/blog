import withCover from "@/HOCs/with-cover";
import Link from "@/components/next/link";
import NotionTitle from "@/components/notion/title";
import { getDatabaseInfo } from "@/lib/notion-v2";
import { getTags } from "@/lib/notion-v2/utils";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
export const runtime = "edge";
export const revalidate = 30;
const BlogsLayout = async ({
  children,
  params,
}: {
  children: ReactNode;
  params: { slugs: string[] };
}) => {
  const route = params.slugs[0];
  const slug = params.slugs[1];
  const dbInfo = await getDatabaseInfo();
  const tags = getTags(dbInfo.properties);
  tags.sort((a, b) => a.name.localeCompare(b.name));
  const path = ("/" + [route, slug].filter(Boolean).join("/")).toLowerCase();
  const active = path === "/blogs";
  return (
    <>
      <NotionTitle title="Bài viết" className="lowercase" />
      <div className="flex gap-5 mt-5 flex-wrap">
        <Link
          href={`/blogs`}
          className={cn(
            active && "scale-125 bg-primary text-primary-foreground",
            !active && "text-primary bg-primary/20",
            "border-primary border ",
            "notion-property-multi_select-item bg-opacity-100",
            `hover:scale-125 transition-transform`
          )}
        >
          all
        </Link>
        {tags.map((tag) => {
          const active = path === `/tag/${tag.name.toLowerCase()}`;
          return (
            <Link
              href={`/tag/${tag.name.toLowerCase()}`}
              key={tag.id}
              style={{
                border: `var(--notion-item-${tag.color}) 1px solid`,
                color: active ? "" : `var(--notion-item-${tag.color})`,
                backgroundColor: active
                  ? `var(--notion-item-${tag.color})`
                  : `var(--notion-item-${tag.color}-inactive)`,
              }}
              className={cn(
                active && `scale-125 notion-item-${tag.color} text-foreground`,
                "notion-property-multi_select-item bg-opacity-100",
                `hover:scale-125 transition-transform`
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
