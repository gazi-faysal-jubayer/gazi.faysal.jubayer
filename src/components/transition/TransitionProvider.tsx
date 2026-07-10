"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { useReducedMotion, useAnimate } from "framer-motion";
import { getPageColor } from "@/lib/page-colors";

type TransitionState = "idle" | "closing" | "closed" | "opening";

type TransitionContextValue = {
  navigate: (href: string, label?: string) => void;
};

const TransitionContext = createContext<TransitionContextValue>({
  navigate: () => {},
});

export function useDoorTransition() {
  return useContext(TransitionContext);
}

const EASE = [0.76, 0, 0.24, 1] as [number, number, number, number];
const DOOR_DURATION = 0.55;

export function TransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const reduce = useReducedMotion();

  const [state, setState] = useState<TransitionState>("idle");
  const [label, setLabel] = useState("");
  const [doorColor, setDoorColor] = useState(() =>
    getPageColor(pathname).accent
  );
  const targetRef = useRef<string | null>(null);
  const stateRef = useRef(state);
  stateRef.current = state;

  const [leftRef, animateLeft] = useAnimate<HTMLDivElement>();
  const [rightRef, animateRight] = useAnimate<HTMLDivElement>();
  const [labelRef, animateLabel] = useAnimate<HTMLParagraphElement>();

  const openDoors = useCallback(async () => {
    setState("opening");
    animateLabel(labelRef.current, { opacity: 0 }, { duration: 0.15 });
    await Promise.all([
      animateLeft(
        leftRef.current,
        { x: "-101%" },
        { duration: DOOR_DURATION, ease: EASE }
      ),
      animateRight(
        rightRef.current,
        { x: "101%" },
        { duration: DOOR_DURATION, ease: EASE }
      ),
    ]);
    setState("idle");
  }, [animateLeft, animateRight, animateLabel, leftRef, rightRef, labelRef]);

  const closeDoors = useCallback(async () => {
    setState("closing");
    animateLabel(labelRef.current, { opacity: 1 }, { duration: 0.2, delay: 0.15 });
    await Promise.all([
      animateLeft(
        leftRef.current,
        { x: "0%" },
        { duration: DOOR_DURATION, ease: EASE }
      ),
      animateRight(
        rightRef.current,
        { x: "0%" },
        { duration: DOOR_DURATION, ease: EASE }
      ),
    ]);
    setState("closed");
  }, [animateLeft, animateRight, animateLabel, leftRef, rightRef, labelRef]);

  const navigate = useCallback(
    async (href: string, lbl?: string) => {
      if (href === pathname) return;
      if (reduce) {
        router.push(href);
        return;
      }
      if (stateRef.current !== "idle") return;
      targetRef.current = href;
      setLabel(lbl ?? "");
      setDoorColor(getPageColor(href).accent);
      await new Promise((r) => requestAnimationFrame(r));
      await closeDoors();
      router.push(href);
    },
    [pathname, reduce, router, closeDoors]
  );

  useEffect(() => {
    if (
      stateRef.current === "closed" &&
      pathname === targetRef.current
    ) {
      targetRef.current = null;
      window.scrollTo(0, 0);
      openDoors();
    }
  }, [pathname, openDoors]);

  return (
    <TransitionContext.Provider value={{ navigate }}>
      {children}

      {!reduce && (
        <div
          className="pointer-events-none fixed inset-0 z-[60]"
          aria-hidden
        >
          <div
            ref={leftRef}
            className="absolute inset-y-0 left-0 w-[50.5%]"
            style={{
              backgroundColor: doorColor,
              transform: "translateX(-101%)",
            }}
          />
          <div
            ref={rightRef}
            className="absolute inset-y-0 right-0 w-[50.5%]"
            style={{
              backgroundColor: doorColor,
              transform: "translateX(101%)",
            }}
          />
          <p
            ref={labelRef}
            className="absolute inset-0 flex items-center justify-center font-mono text-xs uppercase tracking-[0.4em] text-void"
            style={{ opacity: 0 }}
          >
            {label ? `> ${label}` : "> LOADING"}
          </p>
        </div>
      )}
    </TransitionContext.Provider>
  );
}
