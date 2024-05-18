"use client";
import { StoreApi, UseBoundStore, create } from "zustand";

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

const blogStoreCache = new Map<
  string,
  UseBoundStore<StoreApi<BlogListState & BlogListAction>>
>();
const storeFamilyBlog = (stateKey: string) => {
  let store = blogStoreCache.get(stateKey);
  if (!store) {
    store = create<BlogListState & BlogListAction>((set) => ({
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
    }));
    blogStoreCache.set(stateKey, store);
  }
  return store;
};

type UseBlogListStateProps = {
  route: string;
  slug?: string;
};
export const useBlogListState = (key: UseBlogListStateProps) => {
  const atomKey = [key.route, key.slug].join("_");
  const family = storeFamilyBlog(atomKey);
  const state = family((state) => {
    const { goBack, goToPage, ...rest } = state;
    return rest;
  });
  const current = family((state) => state.cursors[state.page]);
  const goBack = family((state) => state.goBack);
  const goToPage = family((state) => state.goToPage);
  return [
    state,
    {
      current,
      goToPage,
      goBack,
    },
  ] as const;
};
