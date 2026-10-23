import fs from "fs";
import path from "path";

const PUBLIC_ROOT = path.join(process.cwd(), "public");
const ACHIEVEMENTS_ROOT = path.join(PUBLIC_ROOT, "achievements");

const IMAGE_EXTS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".gif",
  ".avif",
]);
const VIDEO_EXTS = new Set([".mp4", ".webm", ".mov", ".ogg"]);

export type AchievementMedia = {
  type: "image" | "video";
  src: string;
  poster?: string;
};

/** Media in public/<folder>/<slug>/ — achievements by default, also used for projects. */
export function readAchievementMedia(
  slug: string,
  folder = "achievements"
): AchievementMedia[] {
  const dir = path.join(PUBLIC_ROOT, folder, slug);
  try {
    const files = fs.readdirSync(dir).sort();
    const media: AchievementMedia[] = [];

    for (const file of files) {
      const ext = path.extname(file).toLowerCase();
      const src = `/${folder}/${slug}/${file}`;

      if (IMAGE_EXTS.has(ext)) {
        media.push({ type: "image", src });
      } else if (VIDEO_EXTS.has(ext)) {
        const poster = files.find(
          (f) =>
            f.startsWith(path.basename(file, ext)) &&
            IMAGE_EXTS.has(path.extname(f).toLowerCase())
        );
        media.push({
          type: "video",
          src,
          poster: poster
            ? `/${folder}/${slug}/${poster}`
            : undefined,
        });
      }
    }

    return media;
  } catch {
    return [];
  }
}

export function getAchievementThumbnail(
  slug: string,
  media: AchievementMedia[]
): string | undefined {
  const firstImage = media.find((m) => m.type === "image");
  if (firstImage) return firstImage.src;

  try {
    const dir = path.join(ACHIEVEMENTS_ROOT, slug);
    const thumb = fs
      .readdirSync(dir)
      .find((f) => f.toLowerCase().startsWith("thumb"));
    if (thumb) return `/achievements/${slug}/${thumb}`;
  } catch {
    /* empty */
  }

  return undefined;
}
