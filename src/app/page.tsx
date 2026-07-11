import { PROFILE, SKILLS } from "@/lib/constants";
import { Reveal } from "@/components/motion/Reveal";
import { MagneticButton } from "@/components/motion/MagneticButton";
import HeroShutterText from "@/components/ui/hero-shutter-text";

const MARQUEE_ITEMS = [...SKILLS.engineering, ...SKILLS.programming];

export default function IndexPage() {
  return (
    <main className="bg-grid relative flex min-h-[100svh] flex-col overflow-x-clip pb-24 pt-16 sm:pb-28 sm:pt-24 md:pt-28">
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
            <span className="hidden h-px w-16 bg-line md:block" />
            <p className="uppercase tracking-[0.2em] sm:tracking-[0.25em]">
              2× NASA Space Apps Winner
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
    </main>
  );
}
