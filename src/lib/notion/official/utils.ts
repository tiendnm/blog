import { DatabaseObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export const columnMap = (properties: DatabaseObjectResponse["properties"]) => {
  const result: Record<string, string> = {};
  Object.values(properties).forEach((item) => {
    result[item.name] = decodeURIComponent(item.id);
  });
  return result;
};

export const getTags = (properties: DatabaseObjectResponse["properties"]) => {
  const tags = properties.Tags;
  if (tags.type === "multi_select") {
    return tags.multi_select.options;
  }
  return [];
};
