import type { Metadata } from "next";
import {
  EXPERIENCE,
  CERTIFICATIONS,
  PUBLICATIONS,
  type ExperienceEntry,
} from "@/lib/constants";
import {
  companyDuration,
  formatDuration,
  formatPeriod,
  nowMonthYear,
} from "@/lib/utils";
import { PageShell } from "@/components/layout/PageShell";
import { Reveal } from "@/components/motion/Reveal";
import HeroShutterText from "@/components/ui/hero-shutter-text";
import { AchievementSection } from "@/components/experience/AchievementSection";
import { ScholarStats } from "@/components/experience/ScholarStats";

export const revalidate = 86400;

function CompanyBlock({
  entry,
  index,
}: {
  entry: ExperienceEntry;
  index: number;
}) {
  const hasMultipleRoles = entry.roles.length > 1;
  const total = companyDuration(entry.roles);

  return (
    <Reveal delay={Math.min(index * 0.06, 0.25)} y={20}>
      <div className="border-b border-line py-6 sm:py-8">
        <div className="flex items-start gap-4 sm:gap-5">
          <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center border border-line text-accent sm:h-12 sm:w-12">
            <span className="font-mono text-[10px] font-bold uppercase sm:text-xs">
              {entry.company
                .split(" ")
                .slice(0, 2)
                .map((w) => w[0])
                .join("")}
            </span>
          </div>

          <div className="flex-1">
            <h3 className="font-display text-base font-bold uppercase tracking-tight text-bone sm:text-lg md:text-xl">
              {entry.company}
            </h3>
            <p className="mt-0.5 font-mono text-[10px] text-dim sm:text-[11px]">
              {total}
            </p>

            <div
              className={
                hasMultipleRoles
                  ? "mt-4 border-l border-line pl-4 sm:mt-5 sm:pl-5"
                  : "mt-3 sm:mt-4"
              }
            >
              {entry.roles.map((role, ri) => {
                const period = formatPeriod(role.start, role.end);
                const roleDuration = formatDuration(
                  role.start,
                  role.end ?? nowMonthYear()
                );
                return (
                  <div
                    key={`${role.title}-${period}`}
                    className={ri > 0 ? "mt-5 sm:mt-6" : ""}
                  >
                    {hasMultipleRoles && (
                      <span
                        aria-hidden
                        className="relative -ml-[calc(1rem+5px)] mr-3 inline-block h-2 w-2 border border-accent bg-void sm:-ml-[calc(1.25rem+5px)]"
                      />
                    )}
                    <p className="inline font-display text-sm font-bold uppercase tracking-tight text-bone sm:text-base">
                      {role.title}
                    </p>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-accent sm:text-[11px] sm:tracking-[0.2em]">
                      {period} · {roleDuration}
                    </p>
                    {role.description && (
                      <p className="mt-2 max-w-lg text-xs leading-relaxed text-dim sm:text-sm">
                        {role.description}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export const metadata: Metadata = {
  title: "Log — Gazi Faysal Jubayer",
  description: "Experience, achievements, certifications, and publications.",
};

export default function ExperiencePage() {
  return (
    <PageShell pageNumber="03" pageLabel="LOG">
      <HeroShutterText
        text="Mission log"
        as="h2"
        className="text-[clamp(2rem,7vw,5.5rem)] text-bone"
      />

      <div className="mt-10 grid gap-14 sm:mt-16 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-7">
          <Reveal>
            <h2 className="tech-label mb-6 sm:mb-8">
              <span className="text-accent">&gt;</span> Experience
            </h2>
          </Reveal>

          <div>
            {EXPERIENCE.map((entry, i) => (
              <CompanyBlock key={entry.company} entry={entry} index={i} />
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          <Reveal>
            <h2 className="tech-label mb-8 sm:mb-10">
              <span className="text-accent">&gt;</span> Achievements
            </h2>
          </Reveal>
          <AchievementSection />

          <ScholarStats />

          {PUBLICATIONS.length > 0 && (
            <div className="mt-12 sm:mt-16">
              <Reveal>
                <h2 className="tech-label mb-6 sm:mb-8">
                  <span className="text-accent">&gt;</span> Publication
                </h2>
              </Reveal>
              {PUBLICATIONS.map((pub) => (
                <Reveal key={pub.title}>
                  <div className="relative overflow-hidden border border-accent/50 bg-[color-mix(in_srgb,var(--page-accent)_8%,transparent)] p-5 sm:p-6">
                    <span
                      aria-hidden
                      className="absolute left-0 top-0 h-full w-1 bg-accent"
                    />
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                        Peer-reviewed · {pub.status}
                      </p>
                      <span className="font-mono text-[10px] text-dim">·</span>
                      <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-dim">
                        Vol. {pub.volume} · Issue {pub.issue} · Art.{" "}
                        {pub.articleNumber}
                      </p>
                    </div>
                    <p className="mt-3 text-sm font-medium leading-relaxed text-bone sm:text-base md:text-lg md:leading-relaxed">
                      {pub.title}
                    </p>
                    <p className="mt-3 font-mono text-[10px] leading-relaxed text-dim sm:text-[11px]">
                      {pub.journal}
                    </p>
                    <p className="mt-2 font-mono text-[10px] leading-relaxed text-dim/80 sm:text-[11px]">
                      {pub.authors.join(" · ")}
                    </p>
                    <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.15em] text-dim sm:text-[11px]">
                      {pub.date} · Online {pub.publishedOnline}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      <a
                        href={pub.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 border border-accent bg-accent px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-void transition-opacity hover:opacity-90 sm:text-[11px]"
                      >
                        Read on ScienceDirect
                        <span aria-hidden>↗</span>
                      </a>
                      <a
                        href={pub.doi}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 border border-line px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-bone transition-colors hover:border-accent hover:text-accent sm:text-[11px]"
                      >
                        DOI
                        <span aria-hidden>↗</span>
                      </a>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          )}

          <Reveal className="mt-12 sm:mt-16">
            <h2 className="tech-label mb-6 sm:mb-8">
              <span className="text-accent">&gt;</span> Certifications
            </h2>
          </Reveal>
          <ul className="space-y-3 sm:space-y-4">
            {CERTIFICATIONS.map((cert, i) => (
              <Reveal key={cert.name} delay={Math.min(i * 0.04, 0.2)}>
                <li>
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
                  >
                    <span className="link-draw text-xs text-bone group-hover:text-accent sm:text-sm">
                      {cert.name}
                    </span>
                    <span className="whitespace-nowrap font-mono text-[10px] text-dim sm:text-[11px]">
                      {cert.date}
                    </span>
                  </a>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </PageShell>
  );
}
