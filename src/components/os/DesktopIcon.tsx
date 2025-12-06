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
  defaultPosition: { x: number; y: number };
}

export default function DesktopIcon({ app, defaultPosition }: DesktopIconProps) {
  const [isSelected, setIsSelected] = useState(false);
  const [dragDistance, setDragDistance] = useState(0);
  const nodeRef = useRef<HTMLDivElement>(null);
  const { openWindow, isDarkMode, iconPositions, updateIconPosition } = useOSStore();

  const Icon = ICON_MAP[app.icon] || Folder;

  // Get saved position or use calculated default position
  const savedPosition = iconPositions[app.id];
  const position = savedPosition || defaultPosition;

  const handleDoubleClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      // Only open if we haven't dragged significantly
      if (dragDistance < 10) {
        // Handle folder apps specially - they open File Explorer at a path
        if (app.id === "cad-projects-folder") {
          openWindow("file-explorer", "File Explorer - CAD Projects", "folder");
        } else if (app.id === "code-projects-folder") {
          openWindow("file-explorer", "File Explorer - Code Projects", "folder");
        } else {
          openWindow(app.id, app.name, app.icon);
        }
      }
      setDragDistance(0);
    },
    [dragDistance, app, openWindow]
  );

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (dragDistance < 5) {
        setIsSelected(true);
      }
    },
    [dragDistance]
  );

  const handleBlur = useCallback(() => {
    setIsSelected(false);
  }, []);

  const handleDragStart = useCallback(() => {
    setDragDistance(0);
  }, []);

  const handleDrag = useCallback((_e: DraggableEvent, data: DraggableData) => {
    setDragDistance((prev) => prev + Math.abs(data.deltaX) + Math.abs(data.deltaY));
  }, []);

  const handleDragStop = useCallback(
    (_e: DraggableEvent, data: DraggableData) => {
      updateIconPosition(app.id, { x: data.x, y: data.y });
      // Reset drag distance after a short delay to allow click events to check it
      setTimeout(() => setDragDistance(0), 150);
    },
    [app.id, updateIconPosition]
  );

  const isDragging = dragDistance > 5;

  return (
    <Draggable
      nodeRef={nodeRef}
      position={position}
      grid={[10, 10]}
      bounds="parent"
      onStart={handleDragStart}
      onDrag={handleDrag}
      onStop={handleDragStop}
    >
      <div
        ref={nodeRef}
        className="absolute pointer-events-auto z-20"
        style={{ cursor: isDragging ? "grabbing" : "pointer" }}
      >
        <motion.button
          whileHover={{ scale: isDragging ? 1 : 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleClick}
          onDoubleClick={handleDoubleClick}
          onBlur={handleBlur}
          className={cn(
            "flex flex-col items-center gap-1 w-20 p-2 rounded-win transition-all",
            "focus:outline-none select-none",
            isSelected && "bg-white/10 border border-white/20 backdrop-blur-sm",
            isDragging && "bg-white/20 scale-105"
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
                app.id === "quran-app" && "text-teal-500",
                app.id === "cad-projects-folder" && "text-yellow-600",
                app.id === "code-projects-folder" && "text-blue-400"
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
