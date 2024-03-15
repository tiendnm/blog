"use client";
import { usePathname, useSearchParams } from "next/navigation";
import NProgress from "nprogress";
import { useEffect } from "react";

NProgress.configure({
  showSpinner: false,
  easing: "ease",
  speed: 500,
});

export function NavigationEvents() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  useEffect(() => {
    NProgress.done(true);
  }, [pathname, searchParams]);
  return null;
}
