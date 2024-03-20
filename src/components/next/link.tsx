"use client";
import { resolveHref } from "next/dist/client/resolve-href";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import Router from "next/router";
import NProgress from "nprogress";
import { ComponentProps, Suspense } from "react";
function NoSusLink({
  scroll,
  href,
  onClick,
  ...props
}: ComponentProps<typeof Link>) {
  let stringHref = "";
  if (typeof href !== "string") {
    const [, resolvedAs] = resolveHref(Router, href, true);
    stringHref = resolvedAs || "";
  } else {
    stringHref = href;
  }
  const current_searchParams = useSearchParams();
  const current_path = usePathname();
  const withoutHash = stringHref.split("#")[0];

  const current_Path = current_searchParams?.toString()
    ? `${current_path}?${current_searchParams?.toString()}`
    : current_path;
  return (
    <Link
      onClick={(e) => {
        onClick?.(e);
        if (!stringHref) return;
        if (stringHref === "#") return;
        if (withoutHash === current_Path) return;
        if (e.detail > 1) return;
        NProgress.start();
      }}
      href={href}
      scroll={scroll || false}
      {...props}
    />
  );
}

const NextLink = (props: ComponentProps<typeof NoSusLink>) => {
  return (
    <Suspense>
      <NoSusLink {...props} />
    </Suspense>
  );
};

export default NextLink;
