import Script from "next/script";
import { googleAdsConfig } from "./config";

const GoogleAdsense = async () => {
  if (process.env.NODE_ENV !== "production") {
    return null;
  }
  const config = await googleAdsConfig();
  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${config.ID}`}
      crossOrigin="anonymous"
      strategy="lazyOnload"
    />
  );
};

export default GoogleAdsense;
