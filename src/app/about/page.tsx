import type { Metadata } from "next";
import { PROFILE, EDUCATION, SKILLS, LANGUAGES } from "@/lib/constants";
import { PageShell } from "@/components/layout/PageShell";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";

export const metadata: Metadata = {
  title: "About — Gazi Faysal Jubayer",
  description:
    "Mechanical design and software — the dual craft of Gazi Faysal Jubayer.",
};

export default function AboutPage() {
  return (
    <PageShell pageNumber="03" pageLabel="ABOUT">
      <TextReveal className="font-display text-[clamp(2rem,7vw,5.5rem)] font-bold uppercase leading-[0.9] tracking-tight text-bone">
        Dual craft
      </TextReveal>

      <div className="mt-10 grid gap-12 sm:mt-16 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="text-base leading-relaxed text-bone sm:text-xl md:text-2xl md:leading-relaxed">
              {PROFILE.bio}
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mt-10 grid gap-8 sm:mt-12 sm:grid-cols-2 sm:gap-10">
            <div className="border-l border-accent pl-4 sm:pl-5">
              <h2 className="tech-label">Engineering</h2>
              <ul className="mt-4 space-y-1.5 sm:mt-5 sm:space-y-2">
                {SKILLS.engineering.map((skill) => (
                  <li
                    key={skill}
                    className="font-display text-base font-bold uppercase tracking-tight text-bone transition-colors hover:text-accent sm:text-lg"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-l border-accent pl-4 sm:pl-5">
              <h2 className="tech-label">Programming</h2>
              <ul className="mt-4 space-y-1.5 sm:mt-5 sm:space-y-2">
                {SKILLS.programming.map((skill) => (
                  <li
                    key={skill}
                    className="font-display text-base font-bold uppercase tracking-tight text-bone transition-colors hover:text-accent sm:text-lg"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-4 lg:col-start-9">
          <Reveal delay={0.15} className="space-y-10 sm:space-y-12">
            <div>
              <h2 className="tech-label">Location</h2>
              <p className="mt-3 font-mono text-sm text-bone sm:mt-4">
                {PROFILE.location}
              </p>
            </div>

            <div>
              <h2 className="tech-label">Education</h2>
              <ul className="mt-3 space-y-5 sm:mt-4 sm:space-y-6">
                {EDUCATION.map((ed) => (
                  <li key={ed.institution} className="border-b border-line pb-5 sm:pb-6">
                    <p className="font-display text-sm font-bold uppercase text-bone sm:text-base">
                      {ed.degree}
                    </p>
                    <p className="mt-1 font-mono text-[10px] text-dim sm:text-xs">
                      {ed.institution}
                    </p>
                    <p className="mt-1 font-mono text-[10px] text-accent sm:text-xs">
                      {ed.year}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="tech-label">Languages</h2>
              <ul className="mt-3 space-y-2 sm:mt-4">
                {LANGUAGES.map((lang) => (
                  <li
                    key={lang.name}
                    className="flex items-baseline justify-between font-mono text-xs sm:text-sm"
                  >
                    <span className="text-bone">{lang.name}</span>
                    <span className="text-dim">{lang.level}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </PageShell>
  );
}
