"use server";

import { parseCoverToUrl, toPost } from "@/model/post";
import {
  DatabaseObjectResponse,
  PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import notionAPI from "./client";
import { notionConfig } from "./config";

type QueryParams = Omit<
  Parameters<typeof notionAPI.official.databases.query>[0],
  "database_id"
>;

export async function getDatabaseInfo() {
  //headers(); // for no-cache server action, see: https://github.com/vercel/next.js/discussions/50045
  const dbInfo = await notionAPI.official.databases.retrieve({
    database_id: notionConfig.databaseId!,
  });
  return dbInfo as DatabaseObjectResponse;
}
// ---
export async function getPage(id: string) {
  //headers(); // for no-cache server action, see: https://github.com/vercel/next.js/discussions/50045
  const page_official = notionAPI.official.pages.retrieve({
    page_id: id,
  });
  const page_unofficial = notionAPI.unofficial.getPage(id);
  const [page, recordMap, dbInfo] = await Promise.all([
    page_official,
    page_unofficial,
    getDatabaseInfo(),
  ]);
  return {
    page: page as PageObjectResponse,
    recordMap,
    dbInfo,
  };
}
//---
export async function getMostViewedPosts(args?: QueryParams) {
  //headers(); // for no-cache server action, see: https://github.com/vercel/next.js/discussions/50045
  const query = await notionQuery({
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
  const pages = query.results as PageObjectResponse[];
  await signCover(pages);
  return {
    ...query,
    results: pages,
  };
}
//---
export async function getLatestPosts(args?: QueryParams) {
  //headers(); // for no-cache server action, see: https://github.com/vercel/next.js/discussions/50045
  const query = await notionQuery({
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
  const pages = query.results as PageObjectResponse[];
  await signCover(pages);
  return {
    ...query,
    results: pages,
  };
}
//---
export async function getPostsByTag(tag: string, args?: QueryParams) {
  //headers(); // for no-cache server action, see: https://github.com/vercel/next.js/discussions/50045
  const query = await notionQuery({
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
  const pages = query.results as PageObjectResponse[];
  await signCover(pages);
  return {
    ...query,
    results: pages,
  };
}
//---
export async function getPostBySlug(slug: string) {
  //headers(); // for no-cache server action, see: https://github.com/vercel/next.js/discussions/50045
  const query = await notionQuery({
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
  const page = query.results[0] as PageObjectResponse;
  const page_unofficial = notionAPI.unofficial.getPage(page.id);
  const [recordMap, dbInfo] = await Promise.all([
    page_unofficial,
    getDatabaseInfo(),
  ]);
  return {
    page,
    recordMap,
    dbInfo,
  };
}
//---
export async function increasePostView(id: string) {
  //headers(); // for no-cache server action, see: https://github.com/vercel/next.js/discussions/50045
  const page = await notionAPI.official.pages.retrieve({
    page_id: id,
  });
  const post = toPost(page as PageObjectResponse);
  const increase = await notionAPI.official.pages.update({
    page_id: id,
    properties: {
      View: {
        number: post.View + 1,
      },
    },
  });
  return increase;
}
//---
async function notionQuery(args: QueryParams) {
  return notionAPI.official.databases.query({
    database_id: notionConfig.databaseId!,
    ...args,
  });
}

const signSingleCover = async (page: PageObjectResponse) => {
  const id = page.id;
  const cover = parseCoverToUrl(page.cover);
  const url = new URL(cover);
  const rawUrl = url.origin + url.pathname;
  const sign = await notionAPI.unofficial.getSignedFileUrls([
    { permissionRecord: { id, table: "block" }, url: rawUrl },
  ]);
  const signed = sign.signedUrls?.[0];
  if (page.cover?.type === "external" && signed) {
    page.cover.external.url = signed;
  }
  if (page.cover?.type === "file" && signed) {
    page.cover.file.url = signed;
  }
  return page;
};
export async function signCover(pages: PageObjectResponse[]) {
  const promises: Promise<PageObjectResponse>[] = [];
  for (let index = 0; index < pages.length; index++) {
    const page = pages[index];
    promises.push(signSingleCover(page));
  }
  const newPages = await Promise.all(promises);
  return newPages;
}
// export async function signCoverUrl(id: string, coverUrl: NotionCover) {
//   const cover = parseCoverToUrl(coverUrl);
//   const url = new URL(cover);
//   const rawUrl = url.origin + url.pathname;
//   const sign = await notionAPI.unofficial.getSignedFileUrls([
//     { permissionRecord: { id, table: "block" }, url: rawUrl },
//   ]);
//   if (sign.signedUrls.length === 0) return cover;
//   return sign.signedUrls[0];
// }
