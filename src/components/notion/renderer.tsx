"use client";

import Link from "@/components/next/link";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import { ComponentProps, memo, useMemo } from "react";
import { Skeleton } from "../ui/skeleton";

const NotionRenderer = dynamic(() =>
  import("@/lib/notion/react-notion-x").then((x) => x.NotionRenderer)
);
const NextImage = dynamic(() => import("@/components/next/image"));

type NotionCustomRendererProps = Omit<
  ComponentProps<typeof NotionRenderer>,
  "components"
>;
export const RendererLoading = () => {
  return (
    <div className="w-full space-y-2 mt-2">
      <Skeleton className="h-8 w-1/2" />
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-2/3" />
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-2/3" />
      <Skeleton className="h-8 w-1/2" />
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-2/3" />
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-2/3" />
      <Skeleton className="h-8 w-1/2" />
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-2/3" />
      <Skeleton className="h-8 w-1/2" />
      <Skeleton className="h-8 w-2/3" />
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-2/3" />
      <Skeleton className="h-8 w-1/2" />
    </div>
  );
};
const NotionCustomRenderer = memo(
  ({ className, ...props }: NotionCustomRendererProps) => {
    return useMemo(() => {
      return (
        <NotionRenderer
          {...props}
          className={cn("text-secondary-foreground w-full px-0", className)}
          forceCustomImages
          previewImages
          components={{
            Code: CodeWithProps,
            Equation,
            // Modal,
            // Collection,
            PageLink: Link,
            nextImage: Image,
          }}
        />
      );
    }, [className, props]);
  }
);
NotionCustomRenderer.displayName = "NotionCustomRenderer";
export default NotionCustomRenderer;

const Image = (props: ComponentProps<typeof NextImage>) => {
  return (
    <NextImage
      src={props.src}
      alt={props.alt}
      className={props.className}
      style={{
        objectFit: props.objectFit as any,
        objectPosition: props.objectPosition,
        ...props.style,
        width: "100%",
        height: "auto",
      }}
      sizes="100vw"
      width={0}
      height={0}
    />
  );
};

const Code = dynamic(() =>
  import("@/lib/notion/react-notion-x/third-party/code").then((m) => m.Code)
);

const CodeWithProps = ({
  className,
  ...props
}: ComponentProps<typeof Code>) => {
  return (
    <Code
      {...props}
      className={cn(
        className,
        // jb.variable,
        "shadow-md",
        "!font-jetbrains_mono [&>code]:!font-jetbrains_mono"
      )}
    ></Code>
  );
};

const Equation = dynamic(() =>
  import("@/lib/notion/react-notion-x/third-party/equation").then(
    (m) => m.Equation
  )
);
// const Collection = dynamic(() =>
//   import("@/lib/notion/react-notion-x/third-party/collection").then(
//     (m) => m.Collection
//   )
// // );
// const Modal = dynamic(
//   () =>
//     import("@/lib/notion/react-notion-x/third-party/modal").then(
//       (m) => m.Modal
//     ),
//   {
//     ssr: false,
//   }
// );
