import { fetchLatestPosts } from "@/lib/notion/official";
import { toMinifiedPost, type MinifiedPost } from "@/model/post";
import { NextResponse } from "next/server";
export async function GET() {
  const posts = await fetchAllPost();
  return NextResponse.json(posts, { status: 200 });
}
const fetchAllPost = async (start?: string | null): Promise<MinifiedPost[]> => {
  const posts = await fetchLatestPosts({
    start_cursor: start || undefined,
  });
  const mapPost = posts.results.map(toMinifiedPost);
  if (posts.has_more) {
    const more = await fetchAllPost(posts.next_cursor);
    return [...mapPost, ...more];
  }
  return [...mapPost];
};
