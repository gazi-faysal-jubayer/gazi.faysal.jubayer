"use client";

import { useCallback, useState, useRef } from "react";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import { motion } from "framer-motion";
import {
  Folder,
  Code,
  Box,
  FileText,
  Terminal,
  Globe,
  Settings,
  Calculator,
  Play,
  BookOpen,
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
  calculator: Calculator,
  play: Play,
  book: BookOpen,
};

interface DesktopIconProps {
  app: AppDefinition;
  index: number;
}

export default function DesktopIcon({ app, index }: DesktopIconProps) {
  const [isSelected, setIsSelected] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const nodeRef = useRef<HTMLDivElement>(null);
  const { openWindow, isDarkMode, iconPositions, updateIconPosition } = useOSStore();

  const Icon = ICON_MAP[app.icon] || Folder;

  // Get saved position or calculate default position
  const savedPosition = iconPositions[app.id];
  const defaultPosition = savedPosition || { x: 0, y: index * 90 };

  const handleDoubleClick = useCallback(() => {
    if (!isDragging) {
      openWindow(app.id, app.name, app.icon);
    }
  }, [app, openWindow, isDragging]);

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isDragging) {
      setIsSelected(true);
    }
  }, [isDragging]);

  const handleBlur = useCallback(() => {
    setIsSelected(false);
  }, []);

  const handleDragStart = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleDragStop = useCallback(
    (_e: DraggableEvent, data: DraggableData) => {
      updateIconPosition(app.id, { x: data.x, y: data.y });
      // Small delay to prevent double-click from firing after drag
      setTimeout(() => setIsDragging(false), 100);
    },
    [app.id, updateIconPosition]
  );

  return (
    <Draggable
      nodeRef={nodeRef}
      position={defaultPosition}
      grid={[10, 10]}
      bounds="parent"
      onStart={handleDragStart}
      onStop={handleDragStop}
    >
      <div ref={nodeRef} className="absolute pointer-events-auto z-20 cursor-pointer">
        <motion.button
          whileHover={{ scale: isDragging ? 1 : 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleClick}
          onDoubleClick={handleDoubleClick}
          onBlur={handleBlur}
          className={cn(
            "flex flex-col items-center gap-1 w-20 p-2 rounded-win transition-all cursor-default",
            "focus:outline-none",
            isSelected && "bg-white/10 border border-white/20 backdrop-blur-sm",
            isDragging && "cursor-grabbing bg-white/20"
          )}
        >
          <div
            className={cn(
              "w-12 h-12 flex items-center justify-center rounded-win transition-all",
              isDarkMode ? "bg-white/10" : "bg-black/5",
              isDragging && "scale-110 shadow-lg",
              isSelected && "bg-white/20"
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
                app.id === "settings" && "text-gray-600",
                app.id === "pdf-viewer" && "text-red-500",
                app.id === "eng-calc" && "text-blue-600",
                app.id === "media-player" && "text-purple-500",
                app.id === "quran-app" && "text-teal-500"
              )}
            />
          </div>
          <span
            className={cn(
              "text-xs text-center leading-tight px-1 select-none",
              "text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
            )}
          >
            {app.name}
          </span>
        </motion.button>
      </div>
    </Draggable>
  );
}
