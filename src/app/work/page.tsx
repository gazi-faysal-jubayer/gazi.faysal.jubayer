import type { Metadata } from "next";
import { PROJECTS } from "@/lib/constants";
import { typeLabel } from "@/lib/utils";
import { PageShell } from "@/components/layout/PageShell";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { TransitionLink } from "@/components/transition/TransitionLink";

export const metadata: Metadata = {
  title: "Work — Gazi Faysal Jubayer",
  description: "Selected projects — code, CAD, and engineering challenges.",
};

export default function WorkPage() {
  return (
    <PageShell pageNumber="02" pageLabel="WORK">
      <TextReveal className="font-display text-[clamp(2rem,7vw,5.5rem)] font-bold uppercase leading-[0.9] tracking-tight text-bone">
        Selected work
      </TextReveal>

      <Reveal delay={0.15}>
        <p className="mt-4 max-w-md font-mono text-xs text-dim sm:mt-6 sm:text-sm">
          Code, CAD, and challenges — a cross-section of what I build and
          design.
        </p>
      </Reveal>

      <ul className="mt-10 border-t border-line sm:mt-16">
        {PROJECTS.map((project, i) => (
          <Reveal key={project.slug} delay={Math.min(i * 0.04, 0.25)} y={20}>
            <li className="border-b border-line">
              <TransitionLink
                href={`/projects/${project.slug}`}
                label={project.title.toUpperCase()}
                className="group flex flex-col gap-2 py-5 sm:grid sm:grid-cols-12 sm:items-center sm:gap-4 sm:py-8"
              >
                <span className="font-mono text-xs text-dim sm:col-span-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="sm:col-span-6">
                  <h2 className="font-display text-xl font-bold uppercase tracking-tight text-bone transition-colors group-hover:text-accent sm:text-2xl md:text-4xl">
                    {project.title}
                  </h2>
                  <p className="mt-1 text-xs text-dim sm:mt-2 sm:text-sm">
                    {project.summary}
                  </p>
                </div>
                <span className="hidden font-mono text-[11px] uppercase tracking-[0.2em] text-dim sm:col-span-3 sm:block">
                  [{typeLabel(project.type)}]
                </span>
                <span className="flex items-center justify-between font-mono text-xs text-dim sm:col-span-2 sm:justify-end sm:gap-6">
                  <span>{project.year}</span>
                  <span className="text-accent opacity-0 transition-opacity group-hover:opacity-100">
                    -&gt;
                  </span>
                </span>
              </TransitionLink>
            </li>
          </Reveal>
        ))}
      </ul>
    </PageShell>
  );
}
