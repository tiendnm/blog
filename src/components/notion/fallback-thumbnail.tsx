"use client";
import { ComponentProps, useState } from "react";
import NextImage from "../next/image";
import defaultThumbnail from "./assets/default-thumbnail.webp";
type FallBackThumbnailProps = ComponentProps<typeof NextImage> & {
  thumbnailType: "cover" | "icon";
};

const FallBackThumbnail = ({
  thumbnailType,
  src,
  ...props
}: FallBackThumbnailProps) => {
  const [isError, setIsError] = useState(false);
  if (isError) {
    return (
      <NextImage
        {...props}
        src={thumbnailType === "cover" ? defaultThumbnail : defaultThumbnail}
      />
    );
  }
  // if (typeof src !== "string" || src.startsWith("/")) {
  //   return (
  //     <NextImage
  //       {...props}
  //       src={src}
  //       onError={(e) => {
  //         setIsError(true);
  //       }}
  //     />
  //   );
  // }
  return (
    <NextImage
      {...props}
      src={src}
      onError={(e) => {
        setIsError(true);
      }}
    />
  );
};

export default FallBackThumbnail;
