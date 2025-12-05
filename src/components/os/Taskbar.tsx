"use client";

import { useCallback } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Folder,
  Code,
  Box,
  FileText,
  Terminal,
  Globe,
  Settings,
  type LucideIcon,
} from "lucide-react";
import { useOSStore } from "@/store/useOSStore";
import { cn } from "@/lib/utils";
import SystemTray from "./SystemTray";

const ICON_MAP: Record<string, LucideIcon> = {
  folder: Folder,
  code: Code,
  box: Box,
  "file-text": FileText,
  terminal: Terminal,
  globe: Globe,
  settings: Settings,
};

// Windows logo SVG
function WindowsLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 88 88"
      className={className}
      fill="currentColor"
    >
      <rect x="0" y="0" width="40" height="40" />
      <rect x="44" y="0" width="40" height="40" />
      <rect x="0" y="44" width="40" height="40" />
      <rect x="44" y="44" width="40" height="40" />
    </svg>
  );
}

export default function Taskbar() {
  const {
    windows,
    activeWindowId,
    isDarkMode,
    toggleStartMenu,
    isStartMenuOpen,
    toggleSearch,
    focusWindow,
    minimizeWindow,
    openWindow,
  } = useOSStore();

  const handleStartClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      toggleStartMenu();
    },
    [toggleStartMenu]
  );

  const handleSearchClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      toggleSearch();
    },
    [toggleSearch]
  );

  const handleTaskbarAppClick = useCallback(
    (windowId: string, isMinimized: boolean) => {
      if (isMinimized || activeWindowId !== windowId) {
        focusWindow(windowId);
      } else {
        minimizeWindow(windowId);
      }
    },
    [activeWindowId, focusWindow, minimizeWindow]
  );

  // Pinned apps for taskbar
  const pinnedApps = [
    { id: "file-explorer", icon: "folder", name: "File Explorer" },
    { id: "vscode", icon: "code", name: "VS Code" },
    { id: "terminal", icon: "terminal", name: "Terminal" },
    { id: "browser", icon: "globe", name: "G-Net Explorer" },
  ];

  return (
    <motion.div
      initial={{ y: 48 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
      className={cn(
        "fixed bottom-0 left-0 right-0 h-12 z-[100]",
        "flex items-center px-4"
      )}
      style={{
        backdropFilter: "blur(40px) saturate(150%)",
        WebkitBackdropFilter: "blur(40px) saturate(150%)",
        backgroundColor: isDarkMode ? "rgba(32, 32, 32, 0.85)" : "rgba(243, 243, 243, 0.85)",
        borderTop: `1px solid ${isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"}`,
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Center section - Start, Search, and Apps - Absolutely positioned */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1.5">
        {/* Start button */}
          <button
            onClick={handleStartClick}
            className={cn(
              "taskbar-icon",
              isStartMenuOpen && "active",
              isDarkMode ? "hover:bg-white/20" : "hover:bg-white/50"
            )}
            aria-label="Start menu"
          >
          <WindowsLogo
            className={cn(
              "w-5 h-5",
              isDarkMode ? "text-white" : "text-accent"
            )}
          />
        </button>

        {/* Search button */}
          <button
            onClick={handleSearchClick}
            className={cn(
              "taskbar-icon",
              isDarkMode ? "hover:bg-white/20" : "hover:bg-white/50"
            )}
            aria-label="Search"
          >
          <Search
            size={18}
            className={isDarkMode ? "text-white/80" : "text-black/70"}
          />
        </button>

        {/* Divider */}
        <div
          className={cn(
            "w-px h-6 mx-1",
            isDarkMode ? "bg-white/10" : "bg-black/10"
          )}
        />

        {/* Pinned apps */}
        {pinnedApps.map((app) => {
          const Icon = ICON_MAP[app.icon] || Folder;
          const appWindow = windows.find((w) => w.appId === app.id);
          const isOpen = !!appWindow;
          const isActive = appWindow?.id === activeWindowId;

          return (
            <button
              key={app.id}
              onClick={() => {
                if (appWindow) {
                  handleTaskbarAppClick(appWindow.id, appWindow.isMinimized);
                } else {
                  openWindow(app.id, app.name, app.icon);
                }
              }}
              className={cn(
                "taskbar-icon relative",
                isActive && "active",
                isDarkMode ? "hover:bg-white/20" : "hover:bg-white/50"
              )}
              aria-label={app.name}
            >
              <Icon
                size={20}
                className={cn(
                  app.id === "file-explorer" && "text-yellow-500",
                  app.id === "vscode" && "text-blue-500",
                  app.id === "terminal" && (isDarkMode ? "text-white" : "text-gray-800"),
                  app.id === "browser" && "text-cyan-500"
                )}
              />
              {/* Running indicator */}
              {isOpen && !isActive && (
                <span
                  className={cn(
                    "absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full",
                    isDarkMode ? "bg-white/60" : "bg-black/40"
                  )}
                />
              )}
            </button>
          );
        })}

        {/* Other open windows not in pinned */}
        {windows
          .filter((w) => !pinnedApps.some((p) => p.id === w.appId))
          .map((win) => {
            const Icon = ICON_MAP[win.icon] || Folder;
            const isActive = win.id === activeWindowId;

            return (
              <button
                key={win.id}
                onClick={() => handleTaskbarAppClick(win.id, win.isMinimized)}
                className={cn(
                  "taskbar-icon relative",
                  isActive && "active",
                  isDarkMode ? "hover:bg-white/10" : "hover:bg-black/5"
                )}
                aria-label={win.title}
              >
                <Icon
                  size={20}
                  className={isDarkMode ? "text-white/80" : "text-black/70"}
                />
                {!isActive && (
                  <span
                    className={cn(
                      "absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full",
                      isDarkMode ? "bg-white/60" : "bg-black/40"
                    )}
                  />
                )}
              </button>
            );
          })}
      </div>

      {/* Right section - System tray */}
      <div className="ml-auto">
        <SystemTray />
      </div>
    </motion.div>
  );
}

