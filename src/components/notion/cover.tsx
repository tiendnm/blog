import {
  DatabaseObjectResponse,
  PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { memo, useMemo } from "react";
import NextImage from "../next/image";
import { Skeleton } from "../ui/skeleton";

type NotionCoverProps =
  | {
      info: DatabaseObjectResponse | PageObjectResponse;
      src?: never;
    }
  | {
      src: string;
      info?: never;
    };
export const CoverLoading = () => {
  return <Skeleton className="h-[8vh] md:h-[20vh] w-full rounded-none" />;
};

const NotionCover = memo(({ src, info }: NotionCoverProps) => {
  const iconUrl = useMemo(() => {
    if (src) return "";
    const icon = info?.icon;
    if (icon?.type === "emoji") return icon.emoji;
    if (icon?.type === "external") return icon.external.url;
    if (icon?.type === "file") return icon.file.url;
    return "";
  }, [info?.icon, src]);
  // =========
  const coverUrl = useMemo(() => {
    if (src) return "";
    const cover = info?.cover;
    if (cover?.type === "external") {
      return cover.external.url;
    }
    if (cover?.type === "file") {
      return cover.file.url;
    }
    return "";
  }, [info?.cover, src]);

  return useMemo(() => {
    if (src) {
      return (
        <div className="h-[8vh] md:h-[20vh] w-full relative overflow-hidden">
          <NextImage
            alt={"notion-cover"}
            width={944}
            height={191}
            quality={90}
            sizes="100vw"
            src={src}
            className="h-full w-full object-cover brightness-90"
            priority
          />
          <div className="noise absolute top-0 left-0 w-full h-full bg-repeat backdrop-blur-sm opacity-60"></div>
        </div>
      );
    }
    return (
      <>
        <div className="h-[8vh] md:h-[20vh] w-full relative mb-16">
          <NextImage
            width={944}
            height={191}
            quality={90}
            alt="notion-cover"
            className="h-full w-full object-cover brightness-90"
            src={coverUrl}
            priority
          />
          <div className="noise absolute top-0 left-0 w-full h-full bg-repeat backdrop-blur-sm opacity-60"></div>
          {info?.icon ? (
            info.icon?.type === "emoji" ? (
              <span className="z-10 aspect-square text-[40px] flex justify-center items-center w-[100px] h-[100px] left-5 lg:left-10 absolute bottom-0 translate-y-1/2 rounded-tr-lg drop-shadow-md">
                {iconUrl}
              </span>
            ) : (
              <NextImage
                width={100}
                height={100}
                alt="notion-icon"
                className="z-10 w-[100px] h-[100px] aspect-square left-5 lg:left-10 absolute bottom-0 translate-y-1/2 rounded-tr-lg drop-shadow-md"
                src={iconUrl}
              />
            )
          ) : (
            <span className="z-10 aspect-square text-[40px] flex justify-center items-center w-[100px] h-[100px] left-5 lg:left-10 absolute bottom-0 translate-y-1/2 rounded-tr-lg drop-shadow-md">
              📰
            </span>
          )}
        </div>
      </>
    );
  }, [coverUrl, iconUrl, info?.icon, src]);
});
NotionCover.displayName = "NotionCover";
export default NotionCover;
