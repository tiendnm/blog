import { notionUnOfficial } from "..";
import { SignedUrlRequest } from "../modified-api";

type GetPageOption = Parameters<typeof notionUnOfficial.getPage>[1];
export type ExtendedRecordMap = Awaited<ReturnType<typeof getPage>>;
export const getPage = async (pageId: string, options?: GetPageOption) => {
  return notionUnOfficial.getPage(pageId, options);
};

export const getSignedFileUrls = async (urls: SignedUrlRequest[]) => {
  const req = await notionUnOfficial.getSignedFileUrls(urls);
  return req.signedUrls;
};
