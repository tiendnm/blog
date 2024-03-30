"use server";
export type AlgoliaConfig = {
  appID: string;
  token: string;
  indexName: string;
};

export const getAlgoliaConfig = async (): Promise<AlgoliaConfig> => {
  return {
    appID: process.env.ALGOLIA_APP_ID!,
    token: process.env.ALGOLIA_TOKEN!,
    indexName: process.env.ALGOLIA_INDEX!,
  };
};
