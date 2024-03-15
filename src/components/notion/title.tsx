import { cn } from "@/lib/utils";
import { memo } from "react";
import { Skeleton } from "../ui/skeleton";

type NotionTitleProps = {
  title?: string;
  description?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  className?: string;
};
export const TitleLoading = () => {
  return (
    <div className="space-y-2 mt-2">
      <Skeleton className="h-8 w-1/2" />
      <Skeleton className="h-12 w-2/3" />
    </div>
  );
};

const NotionTitle = memo(
  ({
    title,
    description,
    descriptionClassName,
    titleClassName,
    className,
  }: NotionTitleProps) => {
    return (
      <>
        <div className={cn("mt-5", className)}>
          <h1
            className={cn(
              "text-3xl font-semibold text-foreground",
              titleClassName
            )}
          >
            {title}
          </h1>
          <h2
            className={cn(
              "text-muted-foreground whitespace-pre-line mt-1",
              descriptionClassName
            )}
          >
            {description}
          </h2>
        </div>
      </>
    );
  }
);
NotionTitle.displayName = "NotionTitle";
export default NotionTitle;
