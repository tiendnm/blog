import { Metadata } from "next";

export const siteMetadata: Metadata = {
  metadataBase: new URL("https://blog.tiendnm.com"),
  title: {
    default: "tiendnm",
    template: "%s | tiendnm",
  },
  description: "viết về lập trình và chia sẻ snippet hữu ích",
  openGraph: {
    images: "/banner.jpg",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: "/banner.jpg",
  },
};
export const additionalMetadata = {
  author: "tiendnm",
  siteLogo: "https://github.com/tiendnm.png",
  github: "https://github.com/tiendnm",
  twitter: "https://twitter.com/tiendnm_",
  linkedin: "https://www.linkedin.com/in/tiendnm",
  instagram: "https://www.instagram.com/tiendnm",
  email: "tien.dnm@outlook.com",
};
