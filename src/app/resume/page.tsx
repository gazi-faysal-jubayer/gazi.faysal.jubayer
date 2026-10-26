import type { Metadata } from "next";
import Image from "next/image";
import { PageShell } from "@/components/layout/PageShell";
import { Reveal } from "@/components/motion/Reveal";
import { MagneticButton } from "@/components/motion/MagneticButton";
import HeroShutterText from "@/components/ui/hero-shutter-text";

export const metadata: Metadata = {
  title: "CV — Gazi Faysal Jubayer",
  description:
    "Résumé and CV of Gazi Faysal Jubayer — mechanical engineering, Formula Student, CAD, machine learning and full-stack development. View online or download the one-page résumé or the full two-page CV as PDF.",
};

// Page images are rendered from each PDF with pdftoppm; sources live in resume/*.tex.
const DOCS = [
  {
    id: "one-page",
    title: "One-page résumé",
    note: "The compact version — highlights only.",
    pdf: "/resume-1page.pdf",
    pages: ["/resume/onepage-1.png"],
  },
  {
    id: "full-cv",
    title: "Full CV — 2 pages",
    note: "Every role, project, award and certification in detail.",
    pdf: "/resume.pdf",
    pages: ["/resume/page-1.png", "/resume/page-2.png"],
  },
];

export default function ResumePage() {
  return (
    <PageShell pageNumber="CV" pageLabel="RÉSUMÉ">
      <HeroShutterText
        text="Curriculum vitae"
        as="h2"
        className="text-[clamp(2rem,7vw,5.5rem)] text-bone"
      />

      <Reveal delay={0.15}>
        <p className="mt-4 max-w-xl font-mono text-xs text-dim sm:mt-6 sm:text-sm">
          Experience, notable projects, awards and certifications — updated
          October 2026. Pick the one-page résumé or the full two-page CV.
        </p>
      </Reveal>

      {DOCS.map((doc, d) => (
        <section
          key={doc.id}
          id={doc.id}
          className="mt-14 border-t border-line pt-10 sm:mt-20 sm:pt-14"
        >
          <Reveal delay={d === 0 ? 0.2 : 0}>
            <h3 className="tech-label">
              <span className="text-accent">&gt;</span> {doc.title}
            </h3>
            <p className="mt-2 font-mono text-[11px] text-dim sm:text-xs">{doc.note}</p>
          </Reveal>

          <Reveal
            delay={d === 0 ? 0.25 : 0.05}
            className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4"
          >
            <MagneticButton href={doc.pdf} download>
              Download PDF
            </MagneticButton>
            <MagneticButton href={doc.pdf} variant="ghost" external>
              Open PDF in new tab
            </MagneticButton>
          </Reveal>

          <div className="mt-8 space-y-6 sm:mt-10 sm:space-y-10">
            {doc.pages.map((src, i) => (
              <Reveal key={src} delay={0.1} y={24}>
                <figure className="mx-auto w-full max-w-4xl">
                  <figcaption className="tech-label mb-3">
                    <span className="text-accent">&gt;</span> PAGE{" "}
                    {String(i + 1).padStart(2, "0")} /{" "}
                    {String(doc.pages.length).padStart(2, "0")}
                  </figcaption>
                  <a
                    href={doc.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block border border-line bg-white shadow-[0_20px_60px_rgba(0,0,0,0.45)] transition-colors hover:border-accent"
                  >
                    <Image
                      src={src}
                      alt={`${doc.title}, page ${i + 1} of ${doc.pages.length}`}
                      width={1360}
                      height={1760}
                      sizes="(min-width: 1024px) 896px, 100vw"
                      className="h-auto w-full"
                      priority={d === 0}
                    />
                  </a>
                </figure>
              </Reveal>
            ))}
          </div>
        </section>
      ))}
    </PageShell>
  );
}
