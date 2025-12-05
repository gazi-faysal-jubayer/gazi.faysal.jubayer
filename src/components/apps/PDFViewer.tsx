"use client";

import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import {
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
  Download,
  Printer,
} from "lucide-react";
import { useOSStore } from "@/store/useOSStore";
import { cn } from "@/lib/utils";

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

export default function PDFViewer() {
  const { isDarkMode } = useOSStore();
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);
  const [pdfUrl] = useState<string>("/resume.pdf");

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  const zoomIn = () => setScale((prev) => Math.min(prev + 0.25, 3));
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.25, 0.5));
  const nextPage = () => setPageNumber((prev) => Math.min(prev + 1, numPages));
  const prevPage = () => setPageNumber((prev) => Math.max(prev - 1, 1));

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "resume.pdf";
    link.click();
  };

  const handlePrint = () => {
    window.open(pdfUrl, "_blank");
  };

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
        {/* Left controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={prevPage}
            disabled={pageNumber <= 1}
            className={cn(
              "p-2 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed",
              isDarkMode
                ? "hover:bg-white/10 text-white"
                : "hover:bg-gray-200 text-gray-700"
            )}
            aria-label="Previous page"
          >
            <ChevronLeft size={18} />
          </button>

          <span
            className={cn(
              "text-sm px-2",
              isDarkMode ? "text-white/80" : "text-gray-700"
            )}
          >
            Page {pageNumber} of {numPages}
          </span>

          <button
            onClick={nextPage}
            disabled={pageNumber >= numPages}
            className={cn(
              "p-2 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed",
              isDarkMode
                ? "hover:bg-white/10 text-white"
                : "hover:bg-gray-200 text-gray-700"
            )}
            aria-label="Next page"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Center controls - Zoom */}
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
            {Math.round(scale * 100)}%
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

        {/* Right controls */}
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
          >
            <Printer size={18} />
          </button>
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="flex-1 overflow-auto flex items-center justify-center p-4">
        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={
            <div
              className={cn(
                "flex items-center justify-center p-8",
                isDarkMode ? "text-white" : "text-gray-700"
              )}
            >
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-current" />
            </div>
          }
          error={
            <div
              className={cn(
                "flex flex-col items-center justify-center p-8 text-center",
                isDarkMode ? "text-white/70" : "text-gray-600"
              )}
            >
              <p className="text-lg font-medium mb-2">Failed to load PDF</p>
              <p className="text-sm">Please ensure resume.pdf exists in the public folder</p>
            </div>
          }
        >
          <Page
            pageNumber={pageNumber}
            scale={scale}
            renderTextLayer={true}
            renderAnnotationLayer={true}
            className="shadow-lg"
          />
        </Document>
      </div>
    </div>
  );
}

