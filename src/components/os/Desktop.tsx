"use client";

import { useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { useOSStore } from "@/store/useOSStore";
import { getDesktopApps } from "@/lib/appRegistry";
import { WALLPAPERS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import WindowFrame from "./WindowFrame";
import DesktopIcon from "./DesktopIcon";

// App components
import dynamic from "next/dynamic";
import FileExplorer from "@/components/apps/FileExplorer";
import VSCodeLite from "@/components/apps/VSCodeLite";
import CADViewer from "@/components/apps/CADViewer";
import Notepad from "@/components/apps/Notepad";
import Terminal from "@/components/apps/Terminal";
import Browser from "@/components/apps/Browser";
import Settings from "@/components/apps/Settings";
import EngCalculator from "@/components/apps/EngCalculator";
import MediaPlayer from "@/components/apps/MediaPlayer";
import QuranApp from "@/components/apps/QuranApp";

// PDF Viewer needs to be loaded dynamically to avoid SSR issues
const PDFViewer = dynamic(() => import("@/components/apps/PDFViewer"), {
  ssr: false,
});

const APP_COMPONENTS: Record<string, React.ComponentType> = {
  "file-explorer": FileExplorer,
  vscode: VSCodeLite,
  "cad-viewer": CADViewer,
  notepad: Notepad,
  terminal: Terminal,
  browser: Browser,
  settings: Settings,
  "pdf-viewer": PDFViewer,
  "eng-calc": EngCalculator,
  "media-player": MediaPlayer,
  "quran-app": QuranApp,
};

export default function Desktop() {
  const {
    windows,
    currentWallpaper,
    isDarkMode,
    closeStartMenu,
    closeNotificationCenter,
    closeSearch,
  } = useOSStore();

  const wallpaper = WALLPAPERS.find((w) => w.id === currentWallpaper) || WALLPAPERS[0];
  const desktopApps = getDesktopApps();

  const handleDesktopClick = useCallback(() => {
    closeStartMenu();
    closeNotificationCenter();
    closeSearch();
  }, [closeStartMenu, closeNotificationCenter, closeSearch]);

  return (
    <div
      className={cn(
        "relative w-full h-full overflow-hidden z-0",
        isDarkMode ? "dark" : ""
      )}
      style={{
        background: wallpaper.type === "gradient" ? wallpaper.value : undefined,
        backgroundColor: wallpaper.type === "solid" ? wallpaper.value : undefined,
      }}
      onClick={handleDesktopClick}
    >
      {/* Desktop icons - now draggable */}
      <div className="absolute inset-0 p-4 pb-16 z-10">
        {desktopApps.map((app, index) => (
          <DesktopIcon key={app.id} app={app} index={index} />
        ))}
      </div>

      {/* Windows container */}
      <div className="absolute inset-0 pb-12 z-30 pointer-events-none">
        <div className="relative w-full h-full pointer-events-auto">
          <AnimatePresence>
            {windows.map((win) => {
              const AppComponent = APP_COMPONENTS[win.appId];
              if (!AppComponent) return null;

              return (
                <WindowFrame key={win.id} window={win}>
                  <AppComponent />
                </WindowFrame>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

