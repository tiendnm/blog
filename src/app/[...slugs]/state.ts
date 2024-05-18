"use client";
import { createFamily } from "@/lib/zustand";

export type BlogListState = {
  cursors: (string | undefined)[];
  page: number;
};
export type BlogListAction = {
  goToPage: (next: string | undefined) => void;
  goBack: () => void;
};
export const initialBlogListState: BlogListState = {
  cursors: [undefined],
  page: 0,
};

// const blogStoreCache = new Map<
//   string,
//   UseBoundStore<StoreApi<BlogListState & BlogListAction>>
// >();

const blogFamily = createFamily<BlogListState & BlogListAction>(
  "blogs_and_tags",
  (set) => ({
    ...initialBlogListState,
    goToPage: (next) =>
      set((prev) => {
        const clone = structuredClone(prev.cursors);
        const indexOf = clone.indexOf(next);
        if (indexOf === -1) {
          return {
            cursors: [...prev.cursors, next],
            page: prev.page + 1,
          };
        } else {
          return {
            ...prev,
            page: indexOf,
          };
        }
      }),
    goBack: () => set((prev) => ({ page: prev.page - 1 })),
  })
);

type UseBlogListStateProps = {
  route: string;
  slug?: string;
};
export const useBlogListState = (key: UseBlogListStateProps) => {
  const atomKey = [key.route, key.slug].filter(Boolean).join("_");
  const { cursors, goBack, goToPage, page } = blogFamily(atomKey).getState();
  const current = cursors[page];
  return [
    page,
    cursors,
    {
      current,
      goToPage,
      goBack,
    },
  ] as const;
};
