"use client";

import { useState, useEffect } from "react";
import {
  ZoomIn,
  ZoomOut,
  Download,
  Printer,
  ExternalLink,
} from "lucide-react";
import { useOSStore } from "@/store/useOSStore";
import { cn } from "@/lib/utils";

export default function PDFViewer() {
  const { isDarkMode } = useOSStore();
  const [pdfUrl, setPdfUrl] = useState<string>("/resume.pdf");
  const [filename, setFilename] = useState<string>("resume.pdf");
  const [zoom, setZoom] = useState<number>(100);

  // Check for PDF path passed via sessionStorage (from FileExplorer)
  useEffect(() => {
    const storedPath = sessionStorage.getItem("pdf-viewer-path");
    const storedFilename = sessionStorage.getItem("pdf-viewer-filename");
    
    if (storedPath) {
      setPdfUrl(storedPath);
      sessionStorage.removeItem("pdf-viewer-path");
    }
    
    if (storedFilename) {
      setFilename(storedFilename);
      sessionStorage.removeItem("pdf-viewer-filename");
    }
  }, []);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = filename;
    link.click();
  };

  const handlePrint = () => {
    window.open(pdfUrl, "_blank");
  };

  const handleOpenExternal = () => {
    window.open(pdfUrl, "_blank");
  };

  const zoomIn = () => setZoom((prev) => Math.min(prev + 10, 200));
  const zoomOut = () => setZoom((prev) => Math.max(prev - 10, 50));

  return (
    <div
      className={cn(
        "flex flex-col h-full",
        isDarkMode ? "bg-[#2b2b2b]" : "bg-gray-100"
      )}
    >
      {/* Toolbar */}
      <div
        className={cn(
          "flex items-center justify-between px-4 py-2 border-b",
          isDarkMode
            ? "bg-[#1e1e1e] border-white/10"
            : "bg-white border-gray-300"
        )}
      >
        {/* Left - File name */}
        <div className="flex items-center gap-3">
          <span
            className={cn(
              "text-sm font-medium",
              isDarkMode ? "text-white/80" : "text-gray-700"
            )}
          >
            {filename}
          </span>
        </div>

        {/* Center - Zoom controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={zoomOut}
            className={cn(
              "p-2 rounded transition-colors",
              isDarkMode
                ? "hover:bg-white/10 text-white"
                : "hover:bg-gray-200 text-gray-700"
            )}
            aria-label="Zoom out"
          >
            <ZoomOut size={18} />
          </button>

          <span
            className={cn(
              "text-sm px-2 min-w-[60px] text-center",
              isDarkMode ? "text-white/80" : "text-gray-700"
            )}
          >
            {zoom}%
          </span>

          <button
            onClick={zoomIn}
            className={cn(
              "p-2 rounded transition-colors",
              isDarkMode
                ? "hover:bg-white/10 text-white"
                : "hover:bg-gray-200 text-gray-700"
            )}
            aria-label="Zoom in"
          >
            <ZoomIn size={18} />
          </button>
        </div>

        {/* Right - Action buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleDownload}
            className={cn(
              "p-2 rounded transition-colors",
              isDarkMode
                ? "hover:bg-white/10 text-white"
                : "hover:bg-gray-200 text-gray-700"
            )}
            aria-label="Download"
            title="Download PDF"
          >
            <Download size={18} />
          </button>

          <button
            onClick={handlePrint}
            className={cn(
              "p-2 rounded transition-colors",
              isDarkMode
                ? "hover:bg-white/10 text-white"
                : "hover:bg-gray-200 text-gray-700"
            )}
            aria-label="Print"
            title="Print PDF"
          >
            <Printer size={18} />
          </button>

          <button
            onClick={handleOpenExternal}
            className={cn(
              "p-2 rounded transition-colors",
              isDarkMode
                ? "hover:bg-white/10 text-white"
                : "hover:bg-gray-200 text-gray-700"
            )}
            aria-label="Open in new tab"
            title="Open in new tab"
          >
            <ExternalLink size={18} />
          </button>
        </div>
      </div>

      {/* PDF Viewer - Using iframe for reliable cross-browser support */}
      <div className="flex-1 overflow-hidden">
        <iframe
          src={`${pdfUrl}#zoom=${zoom}`}
          className="w-full h-full border-0"
          title={filename}
        />
      </div>
    </div>
  );
}
