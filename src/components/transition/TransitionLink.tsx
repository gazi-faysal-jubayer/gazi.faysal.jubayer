"use client";

import { useDoorTransition } from "./TransitionProvider";

type TransitionLinkProps = {
  href: string;
  label?: string;
  className?: string;
  children: React.ReactNode;
};

export function TransitionLink({
  href,
  label,
  className,
  children,
}: TransitionLinkProps) {
  const { navigate } = useDoorTransition();

  return (
    <a
      href={href}
      className={className}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        navigate(href, label);
      }}
    >
      {children}
    </a>
  );
}
