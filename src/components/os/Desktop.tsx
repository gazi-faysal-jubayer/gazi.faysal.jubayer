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
import FileExplorer from "@/components/apps/FileExplorer";
import VSCodeLite from "@/components/apps/VSCodeLite";
import CADViewer from "@/components/apps/CADViewer";
import Notepad from "@/components/apps/Notepad";
import Terminal from "@/components/apps/Terminal";
import Browser from "@/components/apps/Browser";
import Settings from "@/components/apps/Settings";

const APP_COMPONENTS: Record<string, React.ComponentType> = {
  "file-explorer": FileExplorer,
  vscode: VSCodeLite,
  "cad-viewer": CADViewer,
  notepad: Notepad,
  terminal: Terminal,
  browser: Browser,
  settings: Settings,
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
        "relative w-full h-full overflow-hidden",
        isDarkMode ? "dark" : ""
      )}
      style={{
        background: wallpaper.type === "gradient" ? wallpaper.value : undefined,
        backgroundColor: wallpaper.type === "solid" ? wallpaper.value : undefined,
      }}
      onClick={handleDesktopClick}
    >
      {/* Desktop icons grid */}
      <div className="absolute inset-0 p-4 pb-16">
        <div className="grid grid-cols-1 gap-1 w-fit">
          {desktopApps.map((app) => (
            <DesktopIcon key={app.id} app={app} />
          ))}
        </div>
      </div>

      {/* Windows container */}
      <div className="absolute inset-0 pointer-events-none pb-12">
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

