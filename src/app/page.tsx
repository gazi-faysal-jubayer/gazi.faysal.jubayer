import {
  ACHIEVEMENTS,
  CERTIFICATIONS,
  EDUCATION,
  EXPERIENCE,
  PAGES,
  PROFILE,
  PROJECTS,
  SKILLS,
} from "@/lib/constants";
import { Reveal } from "@/components/motion/Reveal";
import { MagneticButton } from "@/components/motion/MagneticButton";
import HeroShutterText from "@/components/ui/hero-shutter-text";
import { HeroGears } from "@/components/three/LazyScene";
import {
  HomeExplore,
  ScrollCue,
  type ExploreItem,
} from "@/components/home/HomeExplore";

const MARQUEE_ITEMS = [...SKILLS.engineering, ...SKILLS.programming];

const current = EXPERIENCE[0];
const TEASERS: Record<string, Pick<ExploreItem, "title" | "teaser" | "meta">> = {
  "/about": {
    title: "About",
    teaser:
      "Dual craft — mechanical design meets software. Skills, education, and a field log in frames.",
    meta: `${MARQUEE_ITEMS.length} skills · ${EDUCATION.length} institutions`,
  },
  "/experience": {
    title: "Log",
    teaser: `Now: ${current.roles[0].title} at ${current.company}. Roles, achievements, certifications, and research.`,
    meta: `${EXPERIENCE.length} organisations · ${ACHIEVEMENTS.length} achievements · ${CERTIFICATIONS.length} certifications`,
  },
  "/work": {
    title: "Work",
    teaser:
      "CAD assemblies, hands-on builds, simulation, and software — each with its own case file.",
    meta: `${PROJECTS.length} projects`,
  },
  "/contact": {
    title: "Contact",
    teaser: "Open channel — collaborations in mechanical design, code, and beyond.",
    meta: PROFILE.location,
  },
};

// Every page after INDEX, numbered like their "PAGE 0X" labels.
const EXPLORE: ExploreItem[] = PAGES.slice(1).map((page, i) => ({
  href: page.href,
  label: page.label,
  number: String(i + 2).padStart(2, "0"),
  ...TEASERS[page.href],
}));

export default function IndexPage() {
  return (
    <main className="bg-grid relative overflow-x-clip pb-24 sm:pb-28">
      <section className="relative flex min-h-[100svh] flex-col pb-16 pt-16 sm:pb-20 sm:pt-24 md:pt-28">
        {/* Behind the text (negative z under the grid lines), never blocks clicks */}
        <HeroGears className="pointer-events-none absolute inset-x-0 bottom-32 top-12 -z-10 opacity-25 md:bottom-24 md:left-auto md:top-16 md:w-[58%] md:opacity-50 lg:w-1/2 lg:opacity-75" />
        <div className="mx-auto flex w-full max-w-content flex-1 flex-col justify-center px-4 sm:px-6 md:px-10 lg:px-16">
          <Reveal y={16}>
            <p className="tech-label">
              <span className="text-accent">&gt;</span> PAGE 01 — INDEX
            </p>
          </Reveal>

          <HeroShutterText
            text={"Gazi\nFaysal\nJubayer"}
            className="mt-6 text-[clamp(2.4rem,11vw,10rem)] text-accent sm:mt-8"
            delay={0.1}
          />

          <Reveal delay={0.25} y={20}>
            <div className="mt-6 flex flex-col gap-2 font-mono text-xs text-dim sm:mt-8 sm:text-sm md:flex-row md:items-center md:gap-6">
              <p className="uppercase tracking-[0.2em] sm:tracking-[0.25em]">
                Mechanical Engineer <span className="text-accent">/</span> Programmer
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.35} y={16} className="mt-8 flex flex-wrap gap-3 sm:mt-12 sm:gap-4">
            <MagneticButton href="/work" transitionLabel="WORK">
              View work
            </MagneticButton>
            <MagneticButton
              href="/contact"
              transitionLabel="CONTACT"
              variant="ghost"
            >
              Contact
            </MagneticButton>
            <MagneticButton href="/resume" transitionLabel="CV" variant="ghost">
              View CV
            </MagneticButton>
          </Reveal>

          <Reveal delay={0.45} y={12} className="mt-10 sm:mt-14">
            <ScrollCue to="explore" />
          </Reveal>
        </div>

        <div className="mt-8 overflow-hidden border-y border-line py-3 sm:mt-12 sm:py-4">
          <div className="flex w-max animate-marquee gap-8 sm:gap-10">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((skill, i) => (
              <span
                key={`${skill}-${i}`}
                className="flex items-center gap-8 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.25em] text-dim sm:gap-10 sm:text-xs sm:tracking-[0.3em]"
              >
                {skill}
                <span className="text-accent">+</span>
              </span>
            ))}
          </div>
        </div>

        <p className="mx-auto mt-4 w-full max-w-content px-4 font-mono text-[10px] tracking-[0.15em] text-dim sm:mt-6 sm:px-6 sm:text-xs sm:tracking-[0.2em] md:px-10 lg:px-16">
          {PROFILE.location.toUpperCase()} — MECHANICAL ENGINEERING, KUET
        </p>
      </section>

      <HomeExplore items={EXPLORE} />

      {/* Tall enough that the last rows can still scroll up to mid-screen and light up. */}
      <footer className="mx-auto flex min-h-[45svh] w-full max-w-content flex-col justify-center gap-5 px-4 py-12 sm:px-6 md:px-10 lg:px-16">
        <p className="tech-label">
          <span className="text-accent">&gt;</span> END OF FILE — INDEX
        </p>
        <p className="max-w-xl font-mono text-[10px] uppercase leading-relaxed tracking-[0.15em] text-dim sm:text-xs">
          © {new Date().getFullYear()} {PROFILE.name} · Built with Next.js, three.js &amp; Framer Motion
        </p>
        <ScrollCue>Back to top</ScrollCue>
      </footer>
    </main>
  );
}
