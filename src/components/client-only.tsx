"use client";

import { ReactNode, useEffect, useState } from "react";

export function ClientOnly({
  children,
  loading,
}: {
  children: ReactNode;
  loading?: ReactNode;
}) {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasMounted(true);
    }
  }, []);
  if (!hasMounted) {
    return loading;
  }

  return <>{children}</>;
}
