import type { Metadata } from "next";
import { PROJECTS, WORK_CATEGORIES } from "@/lib/constants";
import { PageShell } from "@/components/layout/PageShell";
import { Reveal } from "@/components/motion/Reveal";
import HeroShutterText from "@/components/ui/hero-shutter-text";
import WorkImpactCards from "@/components/ui/work-impact-cards";

export const metadata: Metadata = {
  title: "Work — Gazi Faysal Jubayer",
  description:
    "Selected projects — CAD, simulation, hands-on builds, and programming.",
};

export default function WorkPage() {
  return (
    <PageShell pageNumber="04" pageLabel="WORK" object="work">
      <HeroShutterText
        text="Selected work"
        as="h2"
        className="text-[clamp(2rem,7vw,5.5rem)] text-bone"
      />

      <Reveal delay={0.15}>
        <p className="mt-4 max-w-md font-mono text-xs text-dim sm:mt-6 sm:text-sm">
          CAD, simulation, hands-on builds, and programming — a cross-section
          of what I design and ship.
        </p>
      </Reveal>

      <div className="mt-10 space-y-14 sm:mt-16 sm:space-y-20">
        {WORK_CATEGORIES.map((category, ci) => {
          const items = PROJECTS.filter((p) => p.type === category.id);
          if (items.length === 0) return null;

          return (
            <section key={category.id}>
              <Reveal delay={Math.min(ci * 0.05, 0.2)}>
                <h3 className="tech-label mb-4 sm:mb-6">
                  <span className="text-accent">&gt;</span> {category.label}
                  <span className="ml-3 text-dim">
                    [{String(items.length).padStart(2, "0")}]
                  </span>
                </h3>
              </Reveal>

              <Reveal delay={Math.min(ci * 0.05 + 0.05, 0.25)} y={24}>
                <WorkImpactCards projects={items} />
              </Reveal>
            </section>
          );
        })}
      </div>
    </PageShell>
  );
}
