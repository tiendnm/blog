"use client";

import algoliasearch from "algoliasearch";

export const algoliaConfig = {
  appID: process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  token: process.env.NEXT_PUBLIC_ALGOLIA_TOKEN,
};

export const algoliaClient = algoliasearch(
  algoliaConfig.appID!,
  algoliaConfig.token!
);
