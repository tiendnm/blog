// import { Img, ImgProps } from 'react-image'

export const GracefulImage = (props: any) => {
  // if (isBrowser) {
  //   return <Img {...props} />
  // } else {
  //   // @ts-expect-error (must use the appropriate subset of props for <img> if using SSR)
  //   return <img {...props} />
  // }
  // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
  return <img {...props} />;
};
