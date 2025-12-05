"use client";

import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus, vs } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  File,
  Folder,
  FolderOpen,
  ChevronRight,
  ChevronDown,
  Search,
  GitBranch,
  Bug,
  Blocks,
  Settings,
  User,
} from "lucide-react";
import { useOSStore } from "@/store/useOSStore";
import { CODE_SNIPPETS, PROJECTS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function VSCodeLite() {
  const { isDarkMode } = useOSStore();
  const [activeProject, setActiveProject] = useState<string>("portfolio-os");
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(
    new Set(["portfolio-os", "automation-dashboard"])
  );
  const [activeTab, setActiveTab] = useState<string | null>(null);

  const projects = Object.entries(CODE_SNIPPETS).map(([id, data]) => ({
    id,
    name: id,
    files: [
      {
        name: data.filename,
        language: data.language,
        content: data.code,
      },
    ],
  }));

  const toggleFolder = (folderId: string) => {
    setExpandedFolders((prev) => {
      const next = new Set(prev);
      if (next.has(folderId)) {
        next.delete(folderId);
      } else {
        next.add(folderId);
      }
      return next;
    });
  };

  const openFile = (projectId: string, fileName: string) => {
    setActiveProject(projectId);
    setActiveTab(`${projectId}/${fileName}`);
  };

  const currentSnippet = CODE_SNIPPETS[activeProject as keyof typeof CODE_SNIPPETS];

  // Activity bar icons
  const activityBarItems = [
    { id: "explorer", icon: File, label: "Explorer" },
    { id: "search", icon: Search, label: "Search" },
    { id: "git", icon: GitBranch, label: "Source Control" },
    { id: "debug", icon: Bug, label: "Debug" },
    { id: "extensions", icon: Blocks, label: "Extensions" },
  ];

  return (
    <div className={cn("flex h-full", isDarkMode ? "bg-[#1e1e1e]" : "bg-[#f3f3f3]")}>
      {/* Activity Bar */}
      <div
        className={cn(
          "w-12 flex flex-col items-center py-2 gap-2",
          isDarkMode ? "bg-[#333333]" : "bg-[#2c2c2c]"
        )}
      >
        {activityBarItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              className={cn(
                "w-12 h-10 flex items-center justify-center",
                "transition-colors",
                item.id === "explorer"
                  ? "text-white border-l-2 border-white"
                  : "text-white/50 hover:text-white"
              )}
              title={item.label}
            >
              <Icon size={24} />
            </button>
          );
        })}
        <div className="flex-1" />
        <button
          className="w-12 h-10 flex items-center justify-center text-white/50 hover:text-white"
          title="Accounts"
        >
          <User size={24} />
        </button>
        <button
          className="w-12 h-10 flex items-center justify-center text-white/50 hover:text-white"
          title="Settings"
        >
          <Settings size={24} />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={cn(
          "w-60 flex flex-col",
          isDarkMode ? "bg-[#252526]" : "bg-[#f3f3f3]"
        )}
      >
        <div
          className={cn(
            "px-4 py-2 text-xs font-semibold uppercase tracking-wider",
            isDarkMode ? "text-white/50" : "text-black/50"
          )}
        >
          Explorer
        </div>
        <div className="flex-1 overflow-y-auto">
          {projects.map((project) => (
            <div key={project.id}>
              <button
                onClick={() => toggleFolder(project.id)}
                className={cn(
                  "flex items-center gap-1 w-full px-2 py-1 text-sm",
                  isDarkMode ? "text-white/90 hover:bg-white/10" : "text-black/80 hover:bg-black/5"
                )}
              >
                {expandedFolders.has(project.id) ? (
                  <ChevronDown size={16} className="shrink-0" />
                ) : (
                  <ChevronRight size={16} className="shrink-0" />
                )}
                {expandedFolders.has(project.id) ? (
                  <FolderOpen size={16} className="text-yellow-500 shrink-0" />
                ) : (
                  <Folder size={16} className="text-yellow-500 shrink-0" />
                )}
                <span className="truncate">{project.name}</span>
              </button>
              {expandedFolders.has(project.id) &&
                project.files.map((file) => (
                  <button
                    key={file.name}
                    onClick={() => openFile(project.id, file.name)}
                    className={cn(
                      "flex items-center gap-1 w-full px-2 py-1 pl-8 text-sm",
                      activeTab === `${project.id}/${file.name}`
                        ? isDarkMode
                          ? "bg-white/10"
                          : "bg-black/10"
                        : isDarkMode
                        ? "text-white/70 hover:bg-white/5"
                        : "text-black/70 hover:bg-black/5"
                    )}
                  >
                    <File
                      size={14}
                      className={cn(
                        "shrink-0",
                        file.language === "typescript" && "text-blue-400",
                        file.language === "python" && "text-yellow-400"
                      )}
                    />
                    <span className="truncate">{file.name}</span>
                  </button>
                ))}
            </div>
          ))}
        </div>
      </div>

      {/* Main editor area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Tabs */}
        <div
          className={cn(
            "flex items-center h-9 border-b overflow-x-auto",
            isDarkMode ? "bg-[#252526] border-[#1e1e1e]" : "bg-[#ececec] border-[#d4d4d4]"
          )}
        >
          {activeTab && (
            <div
              className={cn(
                "flex items-center gap-2 px-3 h-full text-sm border-r",
                isDarkMode
                  ? "bg-[#1e1e1e] text-white/90 border-[#252526]"
                  : "bg-white text-black/80 border-[#d4d4d4]"
              )}
            >
              <File
                size={14}
                className={cn(
                  currentSnippet?.language === "typescript" && "text-blue-400",
                  currentSnippet?.language === "python" && "text-yellow-400"
                )}
              />
              <span>{currentSnippet?.filename}</span>
            </div>
          )}
        </div>

        {/* Breadcrumb */}
        {activeTab && (
          <div
            className={cn(
              "flex items-center gap-1 px-4 py-1 text-xs border-b",
              isDarkMode
                ? "bg-[#1e1e1e] text-white/60 border-[#252526]"
                : "bg-white text-black/60 border-[#d4d4d4]"
            )}
          >
            <span>{activeProject}</span>
            <ChevronRight size={12} />
            <span>{currentSnippet?.filename}</span>
          </div>
        )}

        {/* Code editor */}
        <div className="flex-1 overflow-auto">
          {activeTab && currentSnippet ? (
            <SyntaxHighlighter
              language={currentSnippet.language}
              style={isDarkMode ? vscDarkPlus : vs}
              showLineNumbers
              customStyle={{
                margin: 0,
                padding: "1rem",
                fontSize: "13px",
                lineHeight: "1.5",
                background: isDarkMode ? "#1e1e1e" : "#ffffff",
                height: "100%",
              }}
              lineNumberStyle={{
                minWidth: "3em",
                paddingRight: "1em",
                color: isDarkMode ? "#858585" : "#999999",
                userSelect: "none",
              }}
            >
              {currentSnippet.code}
            </SyntaxHighlighter>
          ) : (
            <div
              className={cn(
                "flex flex-col items-center justify-center h-full gap-4",
                isDarkMode ? "text-white/40" : "text-black/40"
              )}
            >
              <div className="text-6xl font-light">VS</div>
              <p className="text-sm">Select a file from the explorer to view code</p>
              <div className="text-xs">
                Projects available:{" "}
                {PROJECTS.filter((p) => p.type === "code")
                  .map((p) => p.title)
                  .join(", ")}
              </div>
            </div>
          )}
        </div>

        {/* Status bar */}
        <div
          className={cn(
            "flex items-center justify-between px-3 h-6 text-xs",
            "bg-accent text-white"
          )}
        >
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <GitBranch size={12} />
              main
            </span>
          </div>
          <div className="flex items-center gap-3">
            {currentSnippet && (
              <>
                <span>Ln 1, Col 1</span>
                <span>Spaces: 2</span>
                <span>UTF-8</span>
                <span className="capitalize">{currentSnippet.language}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

