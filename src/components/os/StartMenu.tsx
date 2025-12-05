"use client";

import { useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Power,
  User,
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
import { PROFILE, SKILLS } from "@/lib/constants";
import { getStartMenuApps } from "@/lib/appRegistry";
import { cn } from "@/lib/utils";

const ICON_MAP: Record<string, LucideIcon> = {
  folder: Folder,
  code: Code,
  box: Box,
  "file-text": FileText,
  terminal: Terminal,
  globe: Globe,
  settings: Settings,
};

export default function StartMenu() {
  const {
    isStartMenuOpen,
    closeStartMenu,
    openWindow,
    isDarkMode,
  } = useOSStore();

  const apps = getStartMenuApps();

  const handleAppClick = useCallback(
    (appId: string, name: string, icon: string) => {
      openWindow(appId, name, icon);
      closeStartMenu();
    },
    [openWindow, closeStartMenu]
  );

  return (
    <AnimatePresence>
      {isStartMenuOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40"
            onClick={closeStartMenu}
          />

          {/* Start Menu */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={cn(
              "fixed bottom-14 left-1/2 -translate-x-1/2 z-50",
              "w-[640px] max-w-[calc(100vw-32px)]",
              "rounded-win-lg overflow-hidden",
              isDarkMode ? "glass-dark glass-border-dark" : "glass glass-border",
              isDarkMode ? "window-shadow-dark" : "window-shadow"
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search bar */}
            <div className="p-4 pb-2">
              <div
                className={cn(
                  "flex items-center gap-3 px-4 py-2.5 rounded-full",
                  isDarkMode ? "bg-white/10" : "bg-black/5"
                )}
              >
                <Search
                  size={18}
                  className={isDarkMode ? "text-white/50" : "text-black/40"}
                />
                <span
                  className={cn(
                    "text-sm",
                    isDarkMode ? "text-white/50" : "text-black/40"
                  )}
                >
                  Search apps, settings, and more
                </span>
              </div>
            </div>

            {/* Pinned section */}
            <div className="px-6 py-4">
              <div className="flex items-center justify-between mb-4">
                <h3
                  className={cn(
                    "text-sm font-semibold",
                    isDarkMode ? "text-white" : "text-black"
                  )}
                >
                  Pinned
                </h3>
                <button
                  className={cn(
                    "text-xs px-2 py-1 rounded",
                    isDarkMode
                      ? "text-white/70 hover:bg-white/10"
                      : "text-black/60 hover:bg-black/5"
                  )}
                >
                  All apps →
                </button>
              </div>

              {/* App grid */}
              <div className="grid grid-cols-6 gap-2">
                {apps.map((app) => {
                  const Icon = ICON_MAP[app.icon] || Folder;
                  return (
                    <button
                      key={app.id}
                      onClick={() => handleAppClick(app.id, app.name, app.icon)}
                      className={cn(
                        "flex flex-col items-center gap-1 p-3 rounded-win",
                        "transition-colors",
                        isDarkMode ? "hover:bg-white/10" : "hover:bg-black/5"
                      )}
                    >
                      <div
                        className={cn(
                          "w-10 h-10 flex items-center justify-center rounded-win",
                          isDarkMode ? "bg-white/10" : "bg-white"
                        )}
                      >
                        <Icon
                          size={24}
                          className={cn(
                            app.id === "file-explorer" && "text-yellow-500",
                            app.id === "vscode" && "text-blue-500",
                            app.id === "cad-viewer" && "text-orange-500",
                            app.id === "notepad" && "text-gray-500",
                            app.id === "terminal" && (isDarkMode ? "text-white" : "text-gray-800"),
                            app.id === "browser" && "text-cyan-500",
                            app.id === "settings" && "text-gray-600"
                          )}
                        />
                      </div>
                      <span
                        className={cn(
                          "text-xs text-center leading-tight",
                          isDarkMode ? "text-white/80" : "text-black/80"
                        )}
                      >
                        {app.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Skills section */}
            <div
              className={cn(
                "px-6 py-4",
                isDarkMode ? "bg-white/5" : "bg-black/5"
              )}
            >
              <h3
                className={cn(
                  "text-sm font-semibold mb-3",
                  isDarkMode ? "text-white" : "text-black"
                )}
              >
                Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {[...SKILLS.engineering.slice(0, 3), ...SKILLS.programming.slice(0, 3)].map(
                  (skill) => (
                    <span
                      key={skill}
                      className={cn(
                        "px-3 py-1 text-xs rounded-full",
                        isDarkMode
                          ? "bg-white/10 text-white/80"
                          : "bg-accent/10 text-accent"
                      )}
                    >
                      {skill}
                    </span>
                  )
                )}
              </div>
            </div>

            {/* Bottom bar */}
            <div
              className={cn(
                "flex items-center justify-between px-6 py-3",
                isDarkMode ? "bg-black/30" : "bg-white/50"
              )}
            >
              {/* User */}
              <button
                className={cn(
                  "flex items-center gap-3 px-2 py-1.5 rounded-win",
                  isDarkMode ? "hover:bg-white/10" : "hover:bg-black/5"
                )}
              >
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center",
                    "bg-accent text-white"
                  )}
                >
                  <User size={16} />
                </div>
                <span
                  className={cn(
                    "text-sm",
                    isDarkMode ? "text-white/90" : "text-black/80"
                  )}
                >
                  {PROFILE.name.split(" ")[0]}
                </span>
              </button>

              {/* Power */}
              <button
                className={cn(
                  "p-2 rounded-win",
                  isDarkMode ? "hover:bg-white/10" : "hover:bg-black/5"
                )}
              >
                <Power
                  size={18}
                  className={isDarkMode ? "text-white/70" : "text-black/60"}
                />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

