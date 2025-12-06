"use client";

import { useCallback, useMemo, useState, useEffect } from "react";
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

// Grid layout constants
const ICON_WIDTH = 90;
const ICON_HEIGHT = 100;
const PADDING = 16;
const TASKBAR_HEIGHT = 56;

export default function Desktop() {
  const {
    windows,
    currentWallpaper,
    isDarkMode,
    closeStartMenu,
    closeNotificationCenter,
    closeSearch,
    addUploadedFile,
  } = useOSStore();

  const [containerHeight, setContainerHeight] = useState(0);
  const [isDragOver, setIsDragOver] = useState(false);

  const wallpaper = WALLPAPERS.find((w) => w.id === currentWallpaper) || WALLPAPERS[0];
  const desktopApps = getDesktopApps();

  // Update container height on mount and resize
  useEffect(() => {
    const updateHeight = () => {
      setContainerHeight(window.innerHeight - TASKBAR_HEIGHT - PADDING * 2);
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  // Calculate grid positions that wrap to new columns
  const calculateDefaultPosition = useCallback(
    (index: number) => {
      if (containerHeight === 0) return { x: PADDING, y: PADDING };
      
      const iconsPerColumn = Math.max(1, Math.floor(containerHeight / ICON_HEIGHT));
      const column = Math.floor(index / iconsPerColumn);
      const row = index % iconsPerColumn;

      return {
        x: column * ICON_WIDTH + PADDING,
        y: row * ICON_HEIGHT + PADDING,
      };
    },
    [containerHeight]
  );

  // Memoize default positions for all icons
  const defaultPositions = useMemo(() => {
    return desktopApps.map((_, index) => calculateDefaultPosition(index));
  }, [desktopApps, calculateDefaultPosition]);

  const handleDesktopClick = useCallback((e: React.MouseEvent) => {
    // Only close menus if clicking the desktop itself, not icons or other elements
    if (e.target === e.currentTarget) {
      closeStartMenu();
      closeNotificationCenter();
      closeSearch();
    }
  }, [closeStartMenu, closeNotificationCenter, closeSearch]);

  // Drag and drop handlers for file upload
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragOver(false);

      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0 && addUploadedFile) {
        files.forEach((file) => {
          // Store files in the desktop uploads folder
          addUploadedFile(`Desktop/${file.name}`, file);
        });
      }
    },
    [addUploadedFile]
  );

  return (
    <div
      className={cn(
        "relative w-full h-full overflow-hidden z-0",
        isDarkMode ? "dark" : "",
        isDragOver && "ring-4 ring-inset ring-accent/50"
      )}
      style={{
        background: wallpaper.type === "gradient" ? wallpaper.value : undefined,
        backgroundColor: wallpaper.type === "solid" ? wallpaper.value : undefined,
      }}
      onClick={handleDesktopClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Drop overlay */}
      {isDragOver && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm pointer-events-none">
          <div className="bg-white/90 dark:bg-gray-800/90 rounded-win px-8 py-4 shadow-lg">
            <p className="text-lg font-medium text-gray-800 dark:text-white">
              Drop files here to upload
            </p>
          </div>
        </div>
      )}

      {/* Desktop icons - now with grid layout */}
      <div className="absolute inset-0 p-4 pb-16 z-10">
        {desktopApps.map((app, index) => (
          <DesktopIcon
            key={app.id}
            app={app}
            index={index}
            defaultPosition={defaultPositions[index] || { x: PADDING, y: index * ICON_HEIGHT + PADDING }}
          />
        ))}
      </div>

      {/* Windows container */}
      <div className="absolute inset-0 pb-12 z-30 pointer-events-none">
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
  );
}
