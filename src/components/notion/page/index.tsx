import { getDatabaseInfo } from "@/lib/notion/official";
import { getPage } from "@/lib/notion/unofficial";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { PageLoading } from "./client";
const RenderNotionPageClient = dynamic(() => import("./client"), {
  loading: PageLoading,
});
export default async function RenderNotionPage({
  post,
}: {
  post: PageObjectResponse | undefined;
}) {
  if (!post) notFound();
  const dbInfo = await getDatabaseInfo();
  const recordMap = await getPage(post?.id);
  return (
    <RenderNotionPageClient dbInfo={dbInfo} post={post} recordMap={recordMap} />
  );
}
