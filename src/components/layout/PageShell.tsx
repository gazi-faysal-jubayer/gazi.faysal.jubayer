import { cn } from "@/lib/utils";

type PageShellProps = {
  children: React.ReactNode;
  className?: string;
  pageNumber: string;
  pageLabel: string;
};

export function PageShell({
  children,
  className,
  pageNumber,
  pageLabel,
}: PageShellProps) {
  return (
    <main
      className={cn(
        "bg-grid relative min-h-[100svh] overflow-x-clip px-4 pb-20 pt-20 sm:px-6 md:px-10 md:pb-28 md:pt-28 lg:px-16",
        className
      )}
    >
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
