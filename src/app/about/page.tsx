import withCover from "@/HOCs/with-cover";
import NotionTitle from "@/components/notion/title";
import { notionConfig } from "@/lib/notion";
import { getPage } from "@/lib/notion/unofficial";
import { Metadata } from "next";
import Client from "./client";

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
      <Client recordMap={post} />
    </>
  );
};

export default withCover(Page);
