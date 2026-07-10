import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PROJECTS, getProjectBySlug, PROFILE } from "@/lib/constants";
import { typeLabel } from "@/lib/utils";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { TransitionLink } from "@/components/transition/TransitionLink";

type PageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const project = getProjectBySlug(params.slug);
  if (!project) return { title: "Project not found" };

  return {
    title: `${project.title} — ${PROFILE.name}`,
    description: project.summary,
  };
}

export default function ProjectPage({ params }: PageProps) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  const index = PROJECTS.findIndex((p) => p.slug === project.slug);
  const related = PROJECTS.filter(
    (p) => p.slug !== project.slug && p.type === project.type
  ).slice(0, 3);
  const fallbackRelated =
    related.length > 0
      ? related
      : PROJECTS.filter((p) => p.slug !== project.slug).slice(0, 3);

  return (
    <main className="bg-grid relative min-h-[100svh] overflow-x-clip px-4 pb-20 pt-16 sm:px-6 sm:pb-28 sm:pt-24 md:px-10 md:pt-28 lg:px-16">
      <div className="content-width mx-auto w-full">
        <Reveal y={12}>
          <TransitionLink
            href="/work"
            label="WORK"
            className="font-mono text-[10px] uppercase tracking-[0.15em] text-dim transition-colors hover:text-accent sm:text-xs sm:tracking-[0.2em]"
          >
            &lt;- BACK TO WORK
          </TransitionLink>
        </Reveal>

        <Reveal delay={0.08} y={12}>
          <p className="tech-label mt-8 sm:mt-12">
            <span className="text-accent">&gt;</span> FILE{" "}
            {String(index + 1).padStart(2, "0")} — [{typeLabel(project.type)}]
            — {project.year}
          </p>
        </Reveal>

        <TextReveal
          as="h1"
          delay={0.12}
          className="mt-4 font-display text-[clamp(2rem,8vw,6.5rem)] font-bold uppercase leading-[0.9] tracking-tight text-accent sm:mt-6"
        >
          {project.title}
        </TextReveal>

        <Reveal delay={0.2}>
          <p className="mt-4 max-w-2xl text-sm text-dim sm:mt-6 sm:text-lg md:text-xl">
            {project.summary}
          </p>
        </Reveal>

        <div className="mt-10 grid gap-10 sm:mt-16 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <Reveal>
              <div
                aria-hidden
                className="mb-8 aspect-[16/10] w-full border border-line sm:mb-12"
                style={{
                  background:
                    project.type === "cad"
                      ? "linear-gradient(145deg, #B23246 0%, #1a0a0e 55%, #050505 100%)"
                      : project.type === "charity"
                        ? "linear-gradient(145deg, #FF5D73 0%, #40141c 45%, #050505 100%)"
                        : "linear-gradient(145deg, #2a2a2a 0%, #B23246 60%, #050505 100%)",
                }}
              />
            </Reveal>

            <Reveal delay={0.08}>
              <h2 className="tech-label">
                <span className="text-accent">&gt;</span> Overview
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-bone sm:mt-5 sm:text-lg md:text-xl md:leading-relaxed">
                {project.description}
              </p>
            </Reveal>

            {project.highlights && project.highlights.length > 0 && (
              <Reveal delay={0.12} className="mt-8 sm:mt-12">
                <h2 className="tech-label">
                  <span className="text-accent">&gt;</span> Highlights
                </h2>
                <ul className="mt-4 space-y-3 sm:mt-6 sm:space-y-4">
                  {project.highlights.map((item) => (
                    <li
                      key={item}
                      className="border-l-2 border-accent pl-4 text-xs leading-relaxed text-bone sm:pl-5 sm:text-sm md:text-base"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}
          </div>

          <aside className="lg:col-span-4 lg:col-start-9">
            <Reveal delay={0.1} className="sticky top-24 space-y-8 sm:space-y-10">
              <div className="border border-line p-4 sm:p-6">
                <h2 className="tech-label">Stack</h2>
                <ul className="mt-4 space-y-1.5 sm:mt-5 sm:space-y-2">
                  {project.tech.map((t) => (
                    <li
                      key={t}
                      className="font-display text-base font-bold uppercase tracking-tight text-bone sm:text-lg"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </div>

              {project.link && project.link !== "/" && (
                <MagneticButton href={project.link} external>
                  Visit project -&gt;
                </MagneticButton>
              )}
            </Reveal>
          </aside>
        </div>

        {fallbackRelated.length > 0 && (
          <section className="mt-16 border-t border-line pt-12 sm:mt-24 sm:pt-16">
            <Reveal>
              <h2 className="tech-label">
                <span className="text-accent">&gt;</span> Related files
              </h2>
            </Reveal>
            <ul className="mt-6 border-t border-line sm:mt-8">
              {fallbackRelated.map((p, i) => (
                <Reveal key={p.slug} delay={i * 0.05}>
                  <li className="border-b border-line">
                    <TransitionLink
                      href={`/projects/${p.slug}`}
                      label={p.title.toUpperCase()}
                      className="group flex items-center justify-between gap-4 py-4 sm:gap-6 sm:py-5"
                    >
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-dim sm:text-[11px] sm:tracking-[0.2em]">
                          [{typeLabel(p.type)}]
                        </p>
                        <h3 className="mt-1 font-display text-base font-bold uppercase tracking-tight text-bone transition-colors group-hover:text-accent sm:text-xl md:text-2xl">
                          {p.title}
                        </h3>
                      </div>
                      <span className="shrink-0 font-mono text-[10px] text-dim sm:text-xs">
                        {p.year}
                      </span>
                    </TransitionLink>
                  </li>
                </Reveal>
              ))}
            </ul>
          </section>
        )}
      </div>
    </main>
  );
}
