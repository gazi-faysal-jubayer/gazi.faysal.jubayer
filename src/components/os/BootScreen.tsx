"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PROFILE, SKILLS } from "@/lib/constants";

interface BootScreenProps {
  onBootComplete: () => void;
}

const allSkills = [...SKILLS.engineering, ...SKILLS.programming];

export default function BootScreen({ onBootComplete }: BootScreenProps) {
  const [phase, setPhase] = useState<"bios" | "loading" | "welcome" | "done">("bios");
  const [loadedSkills, setLoadedSkills] = useState<string[]>([]);
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0);

  useEffect(() => {
    // BIOS phase
    const biosTimer = setTimeout(() => {
      setPhase("loading");
    }, 1500);

    return () => clearTimeout(biosTimer);
  }, []);

  useEffect(() => {
    if (phase !== "loading") return;

    // Load skills one by one
    const loadInterval = setInterval(() => {
      setCurrentSkillIndex((prev) => {
        if (prev >= allSkills.length - 1) {
          clearInterval(loadInterval);
          setTimeout(() => setPhase("welcome"), 500);
          return prev;
        }
        setLoadedSkills((skills) => [...skills, allSkills[prev]]);
        return prev + 1;
      });
    }, 200);

    // Initial skill
    setLoadedSkills([allSkills[0]]);

    return () => clearInterval(loadInterval);
  }, [phase]);

  useEffect(() => {
    if (phase === "welcome") {
      const welcomeTimer = setTimeout(() => {
        setPhase("done");
        onBootComplete();
      }, 1500);
      return () => clearTimeout(welcomeTimer);
    }
  }, [phase, onBootComplete]);

  return (
    <AnimatePresence mode="wait">
      {phase === "bios" && (
        <motion.div
          key="bios"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black flex flex-col items-center justify-center font-mono text-green-500"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center space-y-4"
          >
            <pre className="text-xs sm:text-sm text-green-400 opacity-80">
              {`
 ██████╗  █████╗ ███████╗██╗ ██████╗ ███████╗
██╔════╝ ██╔══██╗╚══███╔╝██║██╔═══██╗██╔════╝
██║  ███╗███████║  ███╔╝ ██║██║   ██║███████╗
██║   ██║██╔══██║ ███╔╝  ██║██║   ██║╚════██║
╚██████╔╝██║  ██║███████╗██║╚██████╔╝███████║
 ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═╝ ╚═════╝ ╚══════╝
              `}
            </pre>
            <div className="text-xs opacity-60 space-y-1">
              <p>GaziOS BIOS v1.0</p>
              <p>Copyright (C) 2024 {PROFILE.name}</p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8 text-xs animate-pulse"
          >
            Initializing system...
          </motion.div>
        </motion.div>
      )}

      {phase === "loading" && (
        <motion.div
          key="loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-[#0078D4] flex flex-col items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="mb-12"
          >
            <svg
              width="80"
              height="80"
              viewBox="0 0 88 88"
              className="text-white"
            >
              <rect x="0" y="0" width="40" height="40" fill="currentColor" />
              <rect x="44" y="0" width="40" height="40" fill="currentColor" />
              <rect x="0" y="44" width="40" height="40" fill="currentColor" />
              <rect x="44" y="44" width="40" height="40" fill="currentColor" />
            </svg>
          </motion.div>

          {/* Loading dots */}
          <div className="flex gap-2 mb-8">
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-white rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.15,
                }}
              />
            ))}
          </div>

          {/* Skills loading */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white/80 text-sm font-light"
          >
            Loading: {loadedSkills[loadedSkills.length - 1] || "System"}
          </motion.div>

          {/* Progress bar */}
          <div className="mt-4 w-64 h-1 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-white"
              initial={{ width: "0%" }}
              animate={{ width: `${((currentSkillIndex + 1) / allSkills.length) * 100}%` }}
              transition={{ duration: 0.2 }}
            />
          </div>
        </motion.div>
      )}

      {phase === "welcome" && (
        <motion.div
          key="welcome"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-[#0078D4] flex flex-col items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="text-center text-white"
          >
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl font-light mb-2"
            >
              Welcome
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg font-light opacity-80"
            >
              {PROFILE.name}
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

