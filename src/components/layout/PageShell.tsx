import { cn } from "@/lib/utils";
import { PageObject, type PageObjectKind } from "@/components/three/LazyScene";

type PageShellProps = {
  children: React.ReactNode;
  className?: string;
  pageNumber: string;
  pageLabel: string;
  object?: PageObjectKind;
};

export function PageShell({
  children,
  className,
  pageNumber,
  pageLabel,
  object,
}: PageShellProps) {
  return (
    <main
      className={cn(
        "bg-grid relative min-h-[100svh] overflow-x-clip px-4 pb-24 pt-20 sm:px-6 sm:pb-28 md:px-10 md:pb-32 md:pt-28 lg:px-16",
        className
      )}
    >
      {object && <PageObject kind={object} />}
      <div className="content-width mx-auto w-full">
        <p className="tech-label mb-8 md:mb-14">
          <span className="text-accent">&gt;</span> PAGE {pageNumber} —{" "}
          {pageLabel}
        </p>
        {children}
      </div>
    </main>
  );
}
