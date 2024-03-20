import { Client } from "@notionhq/client";
import { NotionAPI } from "../notion/modified-api";
import { notionConfig } from "./config";

const notionUnOfficial = new NotionAPI({
  authToken: notionConfig.tokenV2,
  activeUser: notionConfig.userId,
  userTimeZone: "Asia/Ho_Chi_Minh",
});

const notionOfficial = new Client({
  auth: notionConfig.token,
});

const notionAPI = {
  official: notionOfficial,
  unofficial: notionUnOfficial,
};
export default notionAPI;
