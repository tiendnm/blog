"use client";
import { useTheme } from "@/providers/theme";
import GiscusReact, { GiscusProps } from "@giscus/react";

const gitcusProps: GiscusProps = {
  id: "comments",
  repo: "tiendnm/blog",
  repoId: process.env.NEXT_PUBLIC_GISCUS_REPO_ID!,
  category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY!,
  categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
  mapping: "pathname",
  reactionsEnabled: "1",
  emitMetadata: "0",
  inputPosition: "top",
  lang: "vi",
  loading: "lazy",
};

const Giscus = () => {
  const theme = useTheme();
  if (theme.darkMode) {
    return (
      <div className="mt-5">
        <GiscusReact {...gitcusProps} theme={"noborder_dark"} />
      </div>
    );
  }
  return (
    <div className="mt-5">
      <GiscusReact {...gitcusProps} theme={"noborder_light"} />
    </div>
  );
};

export default Giscus;
