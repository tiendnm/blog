import { BLUR_URL } from "@/data/constant";
import Image from "next/image";
import { ComponentProps } from "react";

type NextImageProps = ComponentProps<typeof Image>;

const NextImage = (props: NextImageProps) => {
  // eslint-disable-next-line jsx-a11y/alt-text
  return <Image placeholder="blur" blurDataURL={BLUR_URL} {...props} />;
};

export default NextImage;
