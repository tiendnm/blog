import withCover from "@/HOCs/with-cover";
import NotionTitle from "@/components/notion/title";
import { getPage } from "@/lib/notion-v2";
import { notionConfig } from "@/lib/notion-v2/config";
import { Metadata } from "next";
import Client from "./client";
export const runtime = "edge";
type PageProps = {};

export async function generateMetadata(): Promise<Metadata> {
  const defaultMeta = {
    title: `giới thiệu`,
  };
  return {
    ...defaultMeta,
  };
}

const Page = async ({}: PageProps) => {
  if (!notionConfig.aboutMePageId) return <></>;
  const post = await getPage(notionConfig.aboutMePageId);
  if (!post) return <></>;
  return (
    <>
      <NotionTitle title="Giới thiệu" className="lowercase" />
      <Client recordMap={post.recordMap} />
    </>
  );
};

export default withCover(Page);
