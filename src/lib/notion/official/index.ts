"use server";
import { toPost } from "@/model/post";
import {
  DatabaseObjectResponse,
  PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { notionConfig, notionOfficial } from "..";
import { SignedUrlRequest } from "../modified-api";
import { getSignedFileUrls } from "../unofficial";

type QueryParams = Omit<
  Parameters<typeof notionOfficial.databases.query>[0],
  "database_id"
>;

export const getDatabaseInfo = async () => {
  return notionOfficial.databases.retrieve({
    database_id: notionConfig.databaseId!,
  }) as Promise<DatabaseObjectResponse>;
};
export const getPageInfo = async (id: string) => {
  const page = (await notionOfficial.pages.retrieve({
    page_id: id,
  })) as PageObjectResponse;
  //await signUrl([page]);
  return page;
};
export const increaseView = async (id: string) => {
  const page = await getPageInfo(id);
  const post = toPost(page);
  const increase = await notionOfficial.pages.update({
    page_id: id,
    properties: {
      View: {
        number: post.View + 1,
      },
    },
  });
  return increase;
};
export const fetchPagesByTag = async (tag: string, args: QueryParams) => {
  const rs = await notionOfficial.databases.query({
    database_id: notionConfig.databaseId!,
    filter: {
      and: [
        {
          property: "Status",
          select: {
            equals: "Published",
          },
        },
        {
          property: "Tags",
          multi_select: {
            contains: tag,
          },
        },
      ],
    },
    ...args,
  });
  const pages = rs.results as PageObjectResponse[];
  //await signUrl(pages);
  return {
    ...rs,
    results: pages,
  };
};
export const fetchLatestPosts = async (args: QueryParams) => {
  const rs = await notionOfficial.databases.query({
    database_id: notionConfig.databaseId!,
    filter: {
      property: "Status",
      select: {
        equals: "Published",
      },
    },
    sorts: [
      {
        property: "Date Published",
        direction: "descending",
      },
    ],
    ...args,
  });
  const pages = rs.results as PageObjectResponse[];
  //await signUrl(pages);
  return {
    ...rs,
    results: pages,
  };
};

const signUrl = async (pages: PageObjectResponse[]) => {
  const links: (SignedUrlRequest & { type: string })[] = [];
  pages.forEach((page) => {
    if (
      page.cover?.type === "external" &&
      page.cover.external.url.includes("prod-files-secure.s3")
    ) {
      links.push({
        permissionRecord: { table: "block", id: page.id },
        url: page.cover.external.url,
        type: "cover",
      });
    }
    if (
      page.cover?.type === "file" &&
      page.cover.file.url.includes("prod-files-secure.s3")
    ) {
      links.push({
        permissionRecord: { table: "block", id: page.id },
        url: page.cover.file.url,
        type: "cover",
      });
    }
    if (
      page.icon?.type === "external" &&
      page.icon.external.url.includes("prod-files-secure.s3")
    ) {
      links.push({
        permissionRecord: { table: "block", id: page.id },
        url: page.icon.external.url,
        type: "icon",
      });
    }
    if (
      page.icon?.type === "file" &&
      page.icon.file.url.includes("prod-files-secure.s3")
    ) {
      links.push({
        permissionRecord: { table: "block", id: page.id },
        url: page.icon.file.url,
        type: "icon",
      });
    }
  });
  if (links.length > 0) {
    const getSign = await getSignedFileUrls(links);
    links.forEach((link, index) => {
      const signed = getSign[index];
      if (!signed) return;
      const _i = pages.findIndex((x) => x.id === link.permissionRecord.id);
      if (_i === -1) return;
      const page = pages[_i];
      if (link.type === "cover") {
        if (page.cover?.type === "external") {
          page.cover.external.url = signed;
          return;
        }
        if (page.cover?.type === "file") {
          page.cover.file.url = signed;
          return;
        }
      }
      if (link.type === "icon") {
        if (page.icon?.type === "external") {
          page.icon.external.url = signed;
          return;
        }
        if (page.icon?.type === "file") {
          page.icon.file.url = signed;
          return;
        }
      }
    });
  }
};

export const fetchMostViewedPosts = async (args: QueryParams) => {
  const rs = await notionOfficial.databases.query({
    database_id: notionConfig.databaseId!,
    filter: {
      property: "Status",
      select: {
        equals: "Published",
      },
    },
    sorts: [
      {
        property: "View",
        direction: "descending",
      },
      {
        property: "Date Published",
        direction: "descending",
      },
    ],
    ...args,
  });
  const pages = rs.results as PageObjectResponse[];
  //await signUrl(pages);
  return {
    ...rs,
    results: pages,
  };
};
export const fetchPageBySlug = async (slug: string) => {
  const query = await notionOfficial.databases.query({
    database_id: notionConfig.databaseId!,
    filter: {
      and: [
        {
          property: "Status",
          select: {
            equals: "Published",
          },
        },
        {
          property: "Slug",
          rich_text: {
            equals: slug,
          },
        },
      ],
    },
    page_size: 1,
  });
  const pages = query.results as PageObjectResponse[];
  //await signUrl(pages);
  return pages[0];
};
