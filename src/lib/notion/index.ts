import "server-only";

import { Client } from "@notionhq/client";
import { NotionAPI } from "./modified-api";

export const notionConfig = {
  token: process.env.NOTION_TOKEN,
  tokenV2: process.env.NOTION_TOKEN_V2,
  databaseId: process.env.NOTION_DATABASE_ID,
  userId: process.env.NOTION_USER_ID,
  aboutMePageId: process.env.NOTION_ABOUT_ME_PAGE,
};

export const notionUnOfficial = new NotionAPI({
  authToken: notionConfig.tokenV2,
  activeUser: notionConfig.userId,
  userTimeZone: "Asia/Ho_Chi_Minh",
});

export const notionOfficial = new Client({
  auth: notionConfig.token,
  fetch: fetch,
});
