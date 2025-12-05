"use client";

import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import {
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
import { AppDefinition } from "@/lib/appRegistry";
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

interface DesktopIconProps {
  app: AppDefinition;
}

export default function DesktopIcon({ app }: DesktopIconProps) {
  const [isSelected, setIsSelected] = useState(false);
  const { openWindow, isDarkMode } = useOSStore();

  const Icon = ICON_MAP[app.icon] || Folder;

  const handleDoubleClick = useCallback(() => {
    openWindow(app.id, app.name, app.icon);
  }, [app, openWindow]);

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSelected(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsSelected(false);
  }, []);

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onBlur={handleBlur}
      className={cn(
        "desktop-icon w-20 h-20 focus:outline-none",
        isSelected && "selected"
      )}
    >
      <div
        className={cn(
          "w-12 h-12 flex items-center justify-center rounded-win",
          isDarkMode ? "bg-white/10" : "bg-black/5"
        )}
      >
        <Icon
          size={28}
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
          "text-xs text-center leading-tight mt-1 px-1",
          isDarkMode ? "text-white" : "text-white",
          "drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
        )}
      >
        {app.name}
      </span>
    </motion.button>
  );
}

