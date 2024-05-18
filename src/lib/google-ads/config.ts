"use server";
export const googleAdsConfig = async () => {
  return {
    ID: process.env.GOOGLE_ADS_ID,
  };
};
