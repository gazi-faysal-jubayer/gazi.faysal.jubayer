"use client";

import { useEffect, useState } from "react";
import { useOSStore } from "@/store/useOSStore";
import BootScreen from "@/components/os/BootScreen";
import Desktop from "@/components/os/Desktop";
import Taskbar from "@/components/os/Taskbar";
import StartMenu from "@/components/os/StartMenu";
import NotificationCenter from "@/components/os/NotificationCenter";
import { cn } from "@/lib/utils";

export default function Home() {
  const { hasBooted, setHasBooted, isDarkMode } = useOSStore();
  const [showBoot, setShowBoot] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Handle hydration
  useEffect(() => {
    setIsClient(true);
    // Show boot screen on first visit
    if (!hasBooted) {
      setShowBoot(true);
    }
  }, [hasBooted]);

  const handleBootComplete = () => {
    setShowBoot(false);
    setHasBooted(true);
  };

  // Show nothing during SSR to prevent hydration mismatch
  if (!isClient) {
    return (
      <div className="h-screen w-screen bg-black flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Show boot screen
  if (showBoot) {
    return <BootScreen onBootComplete={handleBootComplete} />;
  }

  // Main desktop
  return (
    <main
      className={cn(
        "h-screen w-screen overflow-hidden",
        isDarkMode ? "dark" : ""
      )}
    >
      {/* Desktop environment */}
      <div className="h-full pb-12">
        <Desktop />
        </div>

      {/* Taskbar */}
      <Taskbar />

      {/* Overlays */}
      <StartMenu />
      <NotificationCenter />
      </main>
  );
}
