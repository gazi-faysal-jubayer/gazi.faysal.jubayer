import { getScholarStats } from "@/lib/scholar";
import { Reveal } from "@/components/motion/Reveal";
import { ExternalLink } from "lucide-react";

function formatUpdated(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

export async function ScholarStats() {
  const stats = await getScholarStats();

  const metrics = [
    { label: "Citations", value: stats.citations },
    { label: "h-index", value: stats.hIndex },
    { label: "i10-index", value: stats.i10Index },
    { label: "Articles", value: stats.articles },
  ];

  return (
    <Reveal className="mt-12 sm:mt-16">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3 sm:mb-6">
        <h2 className="tech-label">
          <span className="text-accent">&gt;</span> Google Scholar
        </h2>
        <a
          href={stats.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 border border-accent bg-accent px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-void transition-opacity hover:opacity-90 sm:text-[11px]"
        >
          Open profile
          <ExternalLink size={12} />
        </a>
      </div>

      <div className="border border-accent/40 bg-[color-mix(in_srgb,var(--page-accent)_7%,transparent)] p-4 sm:p-5">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {metrics.map((m) => (
            <div
              key={m.label}
              className="border border-line bg-void/40 px-3 py-3 sm:px-4 sm:py-4"
            >
              <p className="font-display text-2xl font-bold tabular-nums tracking-tight text-accent sm:text-3xl">
                {m.value}
              </p>
              <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.18em] text-dim sm:text-[10px]">
                {m.label}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.15em] text-dim sm:text-[10px]">
          Auto-updates daily · Last sync {formatUpdated(stats.updatedAt)}
          {stats.source === "google-scholar" ? " · Live" : " · Cached"}
        </p>
      </div>
    </Reveal>
  );
}
