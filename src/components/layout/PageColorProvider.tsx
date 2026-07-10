"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { getPageColor } from "@/lib/page-colors";

export function PageColorProvider() {
  const pathname = usePathname();

  useEffect(() => {
    const { accent } = getPageColor(pathname);
    document.documentElement.style.setProperty("--page-accent", accent);
  }, [pathname]);

  return null;
}
