import { useMemo } from "react";
import {
  AtomEffect,
  CallbackInterface,
  atomFamily,
  selectorFamily,
  useRecoilCallback,
  useRecoilValue,
} from "recoil";

export type BlogListState = {
  cursors: (string | undefined)[];
  page: number;
};
export const initialBlogListState: BlogListState = {
  cursors: [undefined],
  page: 0,
};
const sessionStorageEffect: AtomEffect<BlogListState> = ({
  setSelf,
  onSet,
  node,
}) => {
  if (typeof window !== "undefined") {
    const savedValue = sessionStorage.getItem(node.key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }
    onSet((newValue, _, isReset) => {
      isReset
        ? sessionStorage.removeItem(node.key)
        : sessionStorage.setItem(node.key, JSON.stringify(newValue));
    });
  }
};
export const blogListAtom = atomFamily({
  key: "blogList",
  default: initialBlogListState,
  effects: [sessionStorageEffect],
});

const currentCursor = selectorFamily({
  key: "blogList_current-page",
  get:
    (blogList) =>
    ({ get }) => {
      const state = get(blogListAtom(blogList));
      return state.cursors[state.page];
    },
});

type UseBlogListStateProps = {
  route: string;
  slug?: string;
};
export const useBlogListState = (key: UseBlogListStateProps) => {
  const recoilParams = useMemo(() => {
    return [key.route, key.slug].join("_");
  }, [key]);
  const state = useRecoilValue(blogListAtom(recoilParams));
  const current = useRecoilValue(currentCursor(recoilParams));

  const goBack = useRecoilCallback(
    ({ set }: CallbackInterface) => {
      return () => {
        set(blogListAtom(recoilParams), (prev) => ({
          ...prev,
          page: prev.page - 1,
        }));
      };
    },
    [recoilParams]
  );
  const goToPage = useRecoilCallback(
    ({ set }: CallbackInterface) => {
      return (next: string | undefined) => {
        const clone = structuredClone(state.cursors);
        const indexOf = clone.indexOf(next);
        if (indexOf === -1) {
          set(blogListAtom(recoilParams), (prev) => ({
            ...prev,
            cursors: [...state.cursors, next],
            page: prev.page + 1,
          }));
        } else {
          set(blogListAtom(recoilParams), (prev) => ({
            ...prev,
            page: indexOf,
          }));
        }
      };
    },
    [recoilParams]
  );

  return [
    state,
    {
      current,
      goToPage,
      goBack,
    },
  ] as const;
};
