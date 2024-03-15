import { toDate } from "@/lib/utils";
import {
  PageObjectResponse,
  RichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints";

export type Post = {
  Id: string;
  Title: string;
  PublishedDate: Date | undefined;
  LastEditedTime: Date | undefined;
  Slug: string;
  Description: string;
  Cover: NotionCover;
  Icon: NotionIcon;
  Tags: Tag[];
  View: number;
};
type Tag = {
  id: string;
  name: string;
  color: string;
};
type Properties = {
  Slug: {
    type: "rich_text";
    rich_text: Array<RichTextItemResponse>;
    id: string;
  };
  Description: {
    type: "rich_text";
    rich_text: Array<RichTextItemResponse>;
    id: string;
  };
  Title: {
    type: "title";
    title: Array<RichTextItemResponse>;
    id: string;
  };
  "Date Published": {
    type: "date";
    date: {
      start: string;
      end: string | null;
    } | null;
    id: string;
  };
  Tags: {
    type: "multi_select";
    id: string;
    multi_select: Tag[];
  };
  View: {
    type: "number";
    id: string;
    number: number;
  };
  "Last Edited Time": {
    id: string;
    type: "last_edited_time";
    last_edited_time: string;
  };
};

export type NotionCover = PageObjectResponse["cover"];
export type NotionIcon = PageObjectResponse["icon"];

export const toPost = (pageObject: PageObjectResponse) => {
  const properties = pageObject.properties as Properties;
  const post: Post = {
    Id: pageObject.id,
    Slug: properties.Slug?.rich_text?.[0]?.plain_text,
    Title: properties.Title?.title?.[0]?.plain_text,
    Description: properties.Description?.rich_text?.[0]?.plain_text,
    PublishedDate: toDate(properties["Date Published"]?.date?.start),
    LastEditedTime: toDate(properties["Last Edited Time"].last_edited_time),
    Cover: pageObject.cover,
    Icon: pageObject.icon,
    Tags: properties.Tags?.multi_select,
    View: properties.View?.number || 0,
  };
  return post;
};
export const parseCoverAndIconToUrl = (item: NotionCover | NotionIcon) => {
  switch (item?.type) {
    case "external":
      return item.external.url;
    case "file":
      return item.file.url;
    case "emoji":
      return item.emoji;
    default:
      return "";
  }
};
export const toMinifiedPost = (pageObject: PageObjectResponse) => {
  const properties = pageObject.properties as Properties;
  const post: MinifiedPost = {
    Id: pageObject.id,
    Slug: properties.Slug?.rich_text?.[0]?.plain_text,
    Title: properties.Title?.title?.[0]?.plain_text,
    Description: properties.Description?.rich_text?.[0]?.plain_text,
    PublishedDate: toDate(properties["Date Published"]?.date?.start),
    LastEditedTime: toDate(properties["Last Edited Time"]?.last_edited_time),
    Tags: properties.Tags?.multi_select.map((tag) => tag.name),
  };
  return post;
};
export type MinifiedPost = {
  Id: string;
  Title: string;
  PublishedDate: Date | undefined;
  Slug: string;
  Description: string;
  Tags: string[];
  LastEditedTime: Date | undefined;
};
