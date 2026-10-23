import fs from "fs";
import path from "path";
import { VerticalTicker } from "@/components/ui/vertical-ticker";
import { Reveal } from "@/components/motion/Reveal";
import { Tilt } from "@/components/motion/Tilt";

const GALLERY_ROOT = path.join(process.cwd(), "public", "gallery");
const IMAGE_EXTS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".gif",
  ".avif",
]);

function readImages(folder: string): string[] {
  try {
    return fs
      .readdirSync(path.join(GALLERY_ROOT, folder))
      .filter((f) => IMAGE_EXTS.has(path.extname(f).toLowerCase()))
      .sort()
      .map((f) => `/gallery/${folder}/${f}`);
  } catch {
    return [];
  }
}

const COLUMNS = [
  { folder: "achievements", label: "Achievements", reverse: false, duration: 52 },
  { folder: "certificates", label: "Certificates", reverse: true, duration: 64 },
  { folder: "workspace", label: "In the field", reverse: false, duration: 58 },
] as const;

export function GallerySection() {
  const columns = COLUMNS.map((col) => ({
    ...col,
    images: readImages(col.folder),
  }));

  if (columns.every((c) => c.images.length === 0)) return null;

  return (
    <Reveal delay={0.12} y={24} className="mt-8 sm:mt-10 md:mt-12">
      <p className="tech-label mb-4 sm:mb-6">
        <span className="text-accent">&gt;</span> FIELD LOG — FRAMES
      </p>

      {/* Mobile: stacked rows */}
      <div className="flex flex-col gap-6 sm:hidden">
        {columns.map((col) => (
          <div key={col.folder} className="min-w-0">
            <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.15em] text-dim">
              [{col.label}]
            </p>
            <div className="h-[220px]">
              <VerticalTicker
                images={col.images}
                reverse={col.reverse}
                duration={col.duration}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Tablet: 2 columns then 1 */}
      <div className="hidden gap-4 sm:grid sm:grid-cols-2 md:hidden">
        {columns.map((col, i) => (
          <div
            key={col.folder}
            className={i === 2 ? "sm:col-span-2" : "min-w-0"}
          >
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-dim">
              [{col.label}]
            </p>
            <div className={i === 2 ? "h-[280px]" : "h-[340px]"}>
              <VerticalTicker
                images={col.images}
                reverse={col.reverse}
                duration={col.duration}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Desktop: 3 columns */}
      <div className="hidden gap-4 md:grid md:grid-cols-3 lg:gap-5">
        {columns.map((col) => (
          <div key={col.folder} className="min-w-0">
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-dim lg:mb-4">
              [{col.label}]
            </p>
            <Tilt className="h-[400px] lg:h-[480px]" max={5}>
              <VerticalTicker
                images={col.images}
                reverse={col.reverse}
                duration={col.duration}
              />
            </Tilt>
          </div>
        ))}
      </div>
    </Reveal>
  );
}
