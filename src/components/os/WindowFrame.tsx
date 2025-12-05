"use client";

import React, { useCallback, useRef, useEffect } from "react";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import { motion } from "framer-motion";
import { Minus, Square, X, Copy } from "lucide-react";
import { useOSStore, WindowState } from "@/store/useOSStore";
import { cn } from "@/lib/utils";

interface WindowFrameProps {
  window: WindowState;
  children: React.ReactNode;
}

export default function WindowFrame({ window: win, children }: WindowFrameProps) {
  const nodeRef = useRef<HTMLDivElement>(null);
  const {
    activeWindowId,
    isDarkMode,
    focusWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    restoreWindow,
    updateWindowPosition,
  } = useOSStore();

  const isActive = activeWindowId === win.id;

  const handleDrag = useCallback(
    (_e: DraggableEvent, data: DraggableData) => {
      updateWindowPosition(win.id, { x: data.x, y: data.y });
    },
    [win.id, updateWindowPosition]
  );

  const handleFocus = useCallback(() => {
    if (!isActive) {
      focusWindow(win.id);
    }
  }, [isActive, focusWindow, win.id]);

  const handleClose = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      closeWindow(win.id);
    },
    [closeWindow, win.id]
  );

  const handleMinimize = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      minimizeWindow(win.id);
    },
    [minimizeWindow, win.id]
  );

  const handleMaximize = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (win.isMaximized) {
        restoreWindow(win.id);
      } else {
        maximizeWindow(win.id);
      }
    },
    [win.id, win.isMaximized, maximizeWindow, restoreWindow]
  );

  const handleDoubleClick = useCallback(
    (e: React.MouseEvent) => {
      if ((e.target as HTMLElement).closest(".window-controls")) return;
      handleMaximize(e);
    },
    [handleMaximize]
  );

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isActive) return;
      
      if (e.altKey && e.key === "F4") {
        e.preventDefault();
        closeWindow(win.id);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isActive, closeWindow, win.id]);

  if (win.isMinimized) {
    return null;
  }

  const windowStyle = win.isMaximized
    ? {
        width: "100%",
        height: "calc(100vh - 48px)",
        top: 0,
        left: 0,
      }
    : {
        width: win.size.width,
        height: win.size.height,
      };

  const content = (
    <motion.div
      ref={nodeRef}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.95, opacity: 0 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className={cn(
        "absolute flex flex-col overflow-hidden rounded-win-lg",
        isDarkMode ? "glass-dark glass-border-dark window-shadow-dark" : "glass glass-border window-shadow",
        isActive ? "ring-1 ring-accent/20" : ""
      )}
      style={{
        ...windowStyle,
        zIndex: win.zIndex,
        ...(win.isMaximized ? {} : { transform: `translate(${win.position.x}px, ${win.position.y}px)` }),
      }}
      onMouseDown={handleFocus}
    >
      {/* Title bar */}
      <div
        className={cn(
          "window-titlebar flex items-center justify-between h-9 px-3 select-none shrink-0",
          isDarkMode ? "bg-white/5" : "bg-black/5"
        )}
        onDoubleClick={handleDoubleClick}
      >
        {/* Title */}
        <div className="flex items-center gap-2 min-w-0">
          <span
            className={cn(
              "text-xs font-medium truncate",
              isDarkMode ? "text-white/90" : "text-black/90"
            )}
          >
            {win.title}
          </span>
        </div>

        {/* Window controls */}
        <div className="window-controls flex items-center -mr-1">
          <button
            onClick={handleMinimize}
            className="window-btn"
            aria-label="Minimize"
          >
            <Minus size={16} className={isDarkMode ? "text-white/70" : "text-black/70"} />
          </button>
          <button
            onClick={handleMaximize}
            className="window-btn"
            aria-label={win.isMaximized ? "Restore" : "Maximize"}
          >
            {win.isMaximized ? (
              <Copy size={12} className={cn("rotate-90", isDarkMode ? "text-white/70" : "text-black/70")} />
            ) : (
              <Square size={12} className={isDarkMode ? "text-white/70" : "text-black/70"} />
            )}
          </button>
          <button
            onClick={handleClose}
            className="window-btn close"
            aria-label="Close"
          >
            <X size={16} className={isDarkMode ? "text-white/70" : "text-black/70"} />
          </button>
        </div>
      </div>

      {/* Content area */}
      <div className={cn(
        "flex-1 overflow-hidden",
        isDarkMode ? "bg-win-dark-bg/50" : "bg-white/50"
      )}>
        {children}
      </div>
    </motion.div>
  );

  // If maximized, don't make it draggable
  if (win.isMaximized) {
    return content;
  }

  return (
    <Draggable
      nodeRef={nodeRef}
      handle=".window-titlebar"
      bounds="parent"
      position={win.position}
      onDrag={handleDrag}
      onStart={handleFocus}
    >
      {content}
    </Draggable>
  );
}

