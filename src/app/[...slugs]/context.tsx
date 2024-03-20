"use client";
import { getLatestPosts, getPostsByTag } from "@/lib/notion-v2";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { ReactNode, createContext, useContext } from "react";
import { BlogListState, initialBlogListState, useBlogListState } from "./state";

export type PostResponse = {
  results: PageObjectResponse[];
  type: "page_or_database";
  page_or_database: any;
  object: "list";
  next_cursor: string | null;
  has_more: boolean;
};
type BlogListContextProps = {
  children: ReactNode;
  initialData: PostResponse;
  pageSize: number;
  route: string;
  slug?: string | undefined;
};
type BlogListContext = {
  state: BlogListState;
  goToPage: (next: string | undefined) => void;
  goBack: () => void;
  notionBlog?: UseQueryResult<PostResponse, Error> | undefined;
  pageSize: number;
  route: string;
};
const initialBlogListContext: BlogListContext = {
  state: initialBlogListState,
  goToPage: () => {},
  goBack: () => {},
  pageSize: 0,
  route: "",
};
const blogListContext = createContext<BlogListContext>(initialBlogListContext);

const BlogListContextProvider = ({
  children,
  initialData,
  pageSize,
  route,
  slug,
}: BlogListContextProps) => {
  const [state, { current, goToPage, goBack }] = useBlogListState({
    route,
    slug,
  });

  const notionBlogByTag = useQuery({
    queryKey: ["notion-blog-by-tag", slug, current],
    queryFn: async () => {
      const data = await getPostsByTag(slug || "", {
        page_size: pageSize,
        start_cursor: current || undefined,
      });
      // await signCover(data.results);
      return data as PostResponse;
    },
    initialData: initialData,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: route === "tag",
  });

  const latestBlog = useQuery({
    queryKey: ["notion-blog-latest", current],
    queryFn: async () => {
      const data = await getLatestPosts({
        page_size: pageSize,
        start_cursor: current || undefined,
      });
      // await signCover(data.results);
      return data as PostResponse;
    },
    initialData: initialData,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: route === "blogs",
  });

  return (
    <blogListContext.Provider
      value={{
        state,
        goToPage,
        pageSize,
        goBack,
        notionBlog: route === "blogs" ? latestBlog : notionBlogByTag,
        route,
      }}
    >
      {children}
    </blogListContext.Provider>
  );
};

export default BlogListContextProvider;

export const useBlogListContext = () => {
  return useContext(blogListContext);
};
