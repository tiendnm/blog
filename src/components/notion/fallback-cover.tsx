"use client";
import { NotionCover, parseCoverToUrl } from "@/model/post";
import { ComponentProps, useMemo, useState } from "react";
import NextImage from "../next/image";
import defaultThumbnail from "./assets/default-thumbnail.webp";
type FallBackThumbnailProps = Omit<ComponentProps<typeof NextImage>, "src"> & {
  postCover: NotionCover;
  postId: string;
};
const FallbackCover = ({
  postId,
  postCover,
  ...props
}: FallBackThumbnailProps) => {
  const [isError, setIsError] = useState(false);
  const parseCover = useMemo(() => {
    return parseCoverToUrl(postCover);
  }, [postCover]);

  if (isError) {
    return <NextImage {...props} src={defaultThumbnail} />;
  }
  return (
    <NextImage
      {...props}
      src={parseCover}
      onError={(e) => {
        setIsError(true);
      }}
    />
  );
};

export default FallbackCover;
