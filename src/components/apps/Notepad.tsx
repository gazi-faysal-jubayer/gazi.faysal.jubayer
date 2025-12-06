"use client";

import { useState, useRef, useEffect } from "react";
import {
  File,
  Edit,
  Search,
  Settings,
  Download,
  Printer,
  Copy,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { useOSStore } from "@/store/useOSStore";
import { RESUME_CONTENT } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function Notepad() {
  const { isDarkMode } = useOSStore();
  const [zoom, setZoom] = useState(100);
  const [wordWrap, setWordWrap] = useState(true);
  const [content, setContent] = useState(RESUME_CONTENT);
  const [filename, setFilename] = useState("Resume.txt");
  const contentRef = useRef<HTMLPreElement>(null);

  // Check for content passed via sessionStorage (from FileExplorer)
  useEffect(() => {
    const storedContent = sessionStorage.getItem("notepad-content");
    const storedFilename = sessionStorage.getItem("notepad-filename");
    
    if (storedContent) {
      setContent(storedContent);
      sessionStorage.removeItem("notepad-content");
    }
    
    if (storedFilename) {
      setFilename(storedFilename);
      sessionStorage.removeItem("notepad-filename");
    }
  }, []);

  const handleDownload = () => {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename.endsWith(".txt") ? filename : `${filename}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
  };

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 10, 200));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 10, 50));
  };

  return (
    <div
      className={cn(
        "flex flex-col h-full",
        isDarkMode ? "bg-[#1e1e1e]" : "bg-white"
      )}
    >
      {/* Menu bar */}
      <div
        className={cn(
          "flex items-center gap-1 px-2 py-1 text-sm border-b",
          isDarkMode ? "border-white/10" : "border-black/10"
        )}
      >
        {[
          { name: "File", icon: File },
          { name: "Edit", icon: Edit },
          { name: "Search", icon: Search },
          { name: "View", icon: Settings },
        ].map((menu) => (
          <button
            key={menu.name}
            className={cn(
              "px-3 py-1 rounded transition-colors",
              isDarkMode ? "hover:bg-white/10 text-white/80" : "hover:bg-black/5 text-black/70"
            )}
          >
            {menu.name}
          </button>
        ))}
      </div>

      {/* Toolbar */}
      <div
        className={cn(
          "flex items-center gap-2 px-3 py-2 border-b",
          isDarkMode ? "border-white/10 bg-white/5" : "border-black/10 bg-black/5"
        )}
      >
        <button
          onClick={handleDownload}
          className={cn(
            "flex items-center gap-2 px-3 py-1.5 rounded text-sm",
            "bg-accent text-white hover:bg-accent/90"
          )}
        >
          <Download size={14} />
          Download
        </button>
        <button
          onClick={handleCopy}
          className={cn(
            "flex items-center gap-2 px-3 py-1.5 rounded text-sm",
            isDarkMode
              ? "bg-white/10 text-white/80 hover:bg-white/15"
              : "bg-black/5 text-black/70 hover:bg-black/10"
          )}
        >
          <Copy size={14} />
          Copy
        </button>
        <button
          className={cn(
            "flex items-center gap-2 px-3 py-1.5 rounded text-sm opacity-50 cursor-not-allowed",
            isDarkMode
              ? "bg-white/10 text-white/80"
              : "bg-black/5 text-black/70"
          )}
        >
          <Printer size={14} />
          Print
        </button>

        <div className="flex-1" />

        {/* Zoom controls */}
        <div className="flex items-center gap-1">
          <button
            onClick={handleZoomOut}
            className={cn(
              "p-1.5 rounded transition-colors",
              isDarkMode ? "hover:bg-white/10" : "hover:bg-black/5"
            )}
          >
            <ZoomOut size={16} className={isDarkMode ? "text-white/70" : "text-black/60"} />
          </button>
          <span
            className={cn(
              "text-sm w-12 text-center",
              isDarkMode ? "text-white/70" : "text-black/60"
            )}
          >
            {zoom}%
          </span>
          <button
            onClick={handleZoomIn}
            className={cn(
              "p-1.5 rounded transition-colors",
              isDarkMode ? "hover:bg-white/10" : "hover:bg-black/5"
            )}
          >
            <ZoomIn size={16} className={isDarkMode ? "text-white/70" : "text-black/60"} />
          </button>
        </div>

        {/* Word wrap toggle */}
        <button
          onClick={() => setWordWrap(!wordWrap)}
          className={cn(
            "px-3 py-1.5 rounded text-sm",
            wordWrap
              ? "bg-accent text-white"
              : isDarkMode
              ? "bg-white/10 text-white/80"
              : "bg-black/5 text-black/70"
          )}
        >
          Word Wrap
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4">
        <pre
          ref={contentRef}
          className={cn(
            "font-mono leading-relaxed",
            wordWrap ? "whitespace-pre-wrap" : "whitespace-pre",
            isDarkMode ? "text-white/90" : "text-black/80"
          )}
          style={{
            fontSize: `${zoom / 100}em`,
          }}
        >
          {content}
        </pre>
      </div>

      {/* Status bar */}
      <div
        className={cn(
          "flex items-center justify-between px-4 py-1.5 text-xs border-t",
          isDarkMode ? "border-white/10 text-white/50" : "border-black/10 text-black/50"
        )}
      >
        <span>{filename}</span>
        <div className="flex items-center gap-4">
          <span>UTF-8</span>
          <span>Ln 1, Col 1</span>
          <span>{zoom}%</span>
        </div>
      </div>
    </div>
  );
}
