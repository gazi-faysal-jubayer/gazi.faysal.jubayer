export type PageColorEntry = {
  accent: string;
  label: string;
};

export const PAGE_COLORS: Record<string, PageColorEntry> = {
  "/": { accent: "#A78BFA", label: "INDEX" },
  "/work": { accent: "#FACC15", label: "WORK" },
  "/about": { accent: "#34D399", label: "ABOUT" },
  "/experience": { accent: "#60A5FA", label: "LOG" },
  "/contact": { accent: "#FF5D73", label: "CONTACT" },
};

export function getPageColor(pathname: string): PageColorEntry {
  if (pathname.startsWith("/projects")) {
    return PAGE_COLORS["/work"];
  }
  return PAGE_COLORS[pathname] ?? PAGE_COLORS["/"];
}
