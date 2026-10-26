import type { Metadata } from "next";
import { PROFILE } from "@/lib/constants";
import { PageShell } from "@/components/layout/PageShell";
import { Reveal } from "@/components/motion/Reveal";
import { MagneticButton } from "@/components/motion/MagneticButton";
import HeroShutterText from "@/components/ui/hero-shutter-text";
import { ContactOrbit } from "@/components/three/LazyScene";

export const metadata: Metadata = {
  title: "Contact — Gazi Faysal Jubayer",
  description: "Get in touch — collaborations in CAD, code, and beyond.",
};

export default function ContactPage() {
  return (
    <PageShell
      pageNumber="05"
      pageLabel="CONTACT"
      className="flex flex-col justify-center"
    >
      <ContactOrbit className="pointer-events-none absolute right-[3%] top-1/2 -z-10 hidden h-[440px] w-[440px] -translate-y-1/2 opacity-60 lg:block xl:h-[540px] xl:w-[540px] xl:opacity-100" />
      <HeroShutterText
        text="Open channel"
        as="h2"
        className="text-[clamp(2rem,8vw,6.5rem)] text-accent"
      />

      <Reveal delay={0.1}>
        <p className="mt-6 max-w-lg text-sm text-dim sm:mt-8 sm:text-lg">
          Open to collaborations in mechanical design, software, and
          cross-disciplinary projects. Based in {PROFILE.location}.
        </p>
      </Reveal>

      <Reveal delay={0.2} className="mt-8 sm:mt-12">
        <a
          href={`mailto:${PROFILE.email}`}
          className="link-draw break-all font-display text-lg font-bold text-bone transition-colors hover:text-accent sm:text-2xl md:text-4xl"
        >
          {PROFILE.email}
        </a>
      </Reveal>

      <Reveal delay={0.3} className="mt-8 flex flex-col gap-3 sm:mt-12 sm:flex-row sm:flex-wrap sm:gap-4">
        <MagneticButton href={PROFILE.github} external>
          GitHub
        </MagneticButton>
        <MagneticButton href={PROFILE.linkedin} variant="ghost" external>
          LinkedIn
        </MagneticButton>
        <MagneticButton href="/resume" variant="ghost" transitionLabel="CV">
          CV / Résumé
        </MagneticButton>
        <MagneticButton href={PROFILE.business} variant="ghost" external>
          3D Bytes
        </MagneticButton>
      </Reveal>

      <Reveal delay={0.4} className="mt-14 sm:mt-20">
        <p className="tech-label text-[9px] sm:text-[11px]">
          <span className="animate-blink text-accent">▮</span> RESPONSE TIME:
          USUALLY WITHIN 24H — {PROFILE.location.toUpperCase()}
        </p>
      </Reveal>
    </PageShell>
  );
}
