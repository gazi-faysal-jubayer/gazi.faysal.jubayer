"use client";

import { useState, useCallback } from "react";
import {
  ChevronRight,
  ChevronDown,
  HardDrive,
  Folder,
  FolderOpen,
  FileText,
  Code,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Search,
  Grid,
  List,
} from "lucide-react";
import { useOSStore } from "@/store/useOSStore";
import { FILE_SYSTEM, PROJECTS } from "@/lib/constants";
import { cn } from "@/lib/utils";

type FileNode = {
  name: string;
  type: "drive" | "folder" | "file" | "project";
  children?: Record<string, FileNode>;
  fileType?: string;
  projectId?: string;
};

export default function FileExplorer() {
  const { isDarkMode, openWindow } = useOSStore();
  const [currentPath, setCurrentPath] = useState<string[]>(["C:"]);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(
    new Set(["C:", "C:/Projects", "D:", "D:/Projects"])
  );
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");

  const getNodeAtPath = useCallback((path: string[]): FileNode | null => {
    let current: Record<string, FileNode> = FILE_SYSTEM as Record<string, FileNode>;
    let node: FileNode | null = null;

    for (const segment of path) {
      if (current[segment]) {
        node = current[segment];
        current = (node.children || {}) as Record<string, FileNode>;
      } else {
        return null;
      }
    }
    return node;
  }, []);

  const getCurrentContents = useCallback((): [string, FileNode][] => {
    const node = getNodeAtPath(currentPath);
    if (node?.children) {
      return Object.entries(node.children);
    }
    return [];
  }, [currentPath, getNodeAtPath]);

  const toggleFolder = useCallback((path: string) => {
    setExpandedFolders((prev) => {
      const next = new Set(prev);
      if (next.has(path)) {
        next.delete(path);
      } else {
        next.add(path);
      }
      return next;
    });
  }, []);

  const navigateTo = useCallback((path: string[]) => {
    setCurrentPath(path);
    setSelectedItem(null);
  }, []);

  const handleItemDoubleClick = useCallback(
    (name: string, node: FileNode) => {
      if (node.type === "folder" || node.type === "drive") {
        navigateTo([...currentPath, name]);
      } else if (node.type === "project" && node.projectId) {
        const project = PROJECTS.find((p) => p.id === node.projectId);
        if (project?.type === "code") {
          openWindow("vscode", `VS Code - ${node.name}`, "code");
        } else if (project?.type === "mechanical") {
          openWindow("cad-viewer", `3D Viewer - ${node.name}`, "box");
        }
      } else if (node.type === "file") {
        if (node.fileType === "pdf" && node.name.toLowerCase().includes("resume")) {
          openWindow("notepad", "Resume", "file-text");
        }
      }
    },
    [currentPath, navigateTo, openWindow]
  );

  const goUp = useCallback(() => {
    if (currentPath.length > 1) {
      navigateTo(currentPath.slice(0, -1));
    }
  }, [currentPath, navigateTo]);

  const renderTreeNode = (
    name: string,
    node: FileNode,
    path: string,
    level: number = 0
  ) => {
    const fullPath = path ? `${path}/${name}` : name;
    const isExpanded = expandedFolders.has(fullPath);
    const hasChildren = node.children && Object.keys(node.children).length > 0;
    const isSelected = selectedItem === fullPath;

    const Icon =
      node.type === "drive"
        ? HardDrive
        : node.type === "folder" || node.type === "project"
        ? isExpanded
          ? FolderOpen
          : Folder
        : FileText;

    return (
      <div key={fullPath}>
        <button
          onClick={() => {
            setSelectedItem(fullPath);
            if (hasChildren) {
              toggleFolder(fullPath);
            }
          }}
          onDoubleClick={() => {
            if (node.type === "folder" || node.type === "drive") {
              navigateTo(fullPath.split("/"));
            }
          }}
          className={cn(
            "flex items-center gap-1 w-full px-2 py-1 text-left text-sm rounded",
            "transition-colors",
            isSelected
              ? "bg-accent/20"
              : isDarkMode
              ? "hover:bg-white/10"
              : "hover:bg-black/5"
          )}
          style={{ paddingLeft: `${level * 16 + 8}px` }}
        >
          {hasChildren ? (
            isExpanded ? (
              <ChevronDown size={14} className="shrink-0 opacity-60" />
            ) : (
              <ChevronRight size={14} className="shrink-0 opacity-60" />
            )
          ) : (
            <span className="w-3.5" />
          )}
          <Icon
            size={16}
            className={cn(
              "shrink-0",
              node.type === "drive" && "text-gray-500",
              (node.type === "folder" || node.type === "project") && "text-yellow-500"
            )}
          />
          <span
            className={cn(
              "truncate",
              isDarkMode ? "text-white/90" : "text-black/80"
            )}
          >
            {node.name}
          </span>
        </button>
        {hasChildren && isExpanded && (
          <div>
            {Object.entries(node.children!).map(([childName, childNode]) =>
              renderTreeNode(childName, childNode as FileNode, fullPath, level + 1)
            )}
          </div>
        )}
      </div>
    );
  };

  const contents = getCurrentContents();
  const currentNode = getNodeAtPath(currentPath);

  return (
    <div className={cn("flex flex-col h-full", isDarkMode ? "text-white" : "text-black")}>
      {/* Toolbar */}
      <div
        className={cn(
          "flex items-center gap-2 px-3 py-2 border-b",
          isDarkMode ? "border-white/10 bg-white/5" : "border-black/10 bg-black/5"
        )}
      >
        <button
          onClick={goUp}
          disabled={currentPath.length <= 1}
          className={cn(
            "p-1.5 rounded transition-colors",
            isDarkMode ? "hover:bg-white/10" : "hover:bg-black/5",
            "disabled:opacity-30"
          )}
        >
          <ArrowUp size={16} />
        </button>
        <button
          className={cn(
            "p-1.5 rounded transition-colors opacity-50",
            isDarkMode ? "hover:bg-white/10" : "hover:bg-black/5"
          )}
        >
          <ArrowLeft size={16} />
        </button>
        <button
          className={cn(
            "p-1.5 rounded transition-colors opacity-50",
            isDarkMode ? "hover:bg-white/10" : "hover:bg-black/5"
          )}
        >
          <ArrowRight size={16} />
        </button>

        {/* Address bar */}
        <div
          className={cn(
            "flex-1 flex items-center gap-1 px-3 py-1.5 rounded text-sm",
            isDarkMode ? "bg-white/10" : "bg-white"
          )}
        >
          {currentPath.map((segment, i) => (
            <span key={i} className="flex items-center gap-1">
              <button
                onClick={() => navigateTo(currentPath.slice(0, i + 1))}
                className={cn(
                  "hover:underline",
                  isDarkMode ? "text-white/80" : "text-black/70"
                )}
              >
                {segment}
              </button>
              {i < currentPath.length - 1 && (
                <ChevronRight size={14} className="opacity-50" />
              )}
            </span>
          ))}
        </div>

        {/* Search */}
        <div
          className={cn(
            "flex items-center gap-2 px-3 py-1.5 rounded",
            isDarkMode ? "bg-white/10" : "bg-white"
          )}
        >
          <Search size={14} className="opacity-50" />
          <input
            type="text"
            placeholder="Search"
            className={cn(
              "bg-transparent outline-none text-sm w-32",
              isDarkMode ? "placeholder:text-white/40" : "placeholder:text-black/40"
            )}
          />
        </div>

        {/* View toggle */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setViewMode("list")}
            className={cn(
              "p-1.5 rounded transition-colors",
              viewMode === "list"
                ? "bg-accent text-white"
                : isDarkMode
                ? "hover:bg-white/10"
                : "hover:bg-black/5"
            )}
          >
            <List size={16} />
          </button>
          <button
            onClick={() => setViewMode("grid")}
            className={cn(
              "p-1.5 rounded transition-colors",
              viewMode === "grid"
                ? "bg-accent text-white"
                : isDarkMode
                ? "hover:bg-white/10"
                : "hover:bg-black/5"
            )}
          >
            <Grid size={16} />
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div
          className={cn(
            "w-56 border-r overflow-y-auto py-2",
            isDarkMode ? "border-white/10" : "border-black/10"
          )}
        >
          <div className="px-2 mb-2">
            <span
              className={cn(
                "text-xs font-medium uppercase",
                isDarkMode ? "text-white/50" : "text-black/50"
              )}
            >
              This PC
            </span>
          </div>
          {Object.entries(FILE_SYSTEM).map(([name, node]) =>
            renderTreeNode(name, node as FileNode, "", 0)
          )}
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-y-auto p-4">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-4 gap-4">
              {contents.map(([name, node]) => {
                const Icon =
                  node.type === "folder" || node.type === "project"
                    ? Folder
                    : node.type === "drive"
                    ? HardDrive
                    : node.projectId
                    ? Code
                    : FileText;

                return (
                  <button
                    key={name}
                    onClick={() => setSelectedItem(`${currentPath.join("/")}/${name}`)}
                    onDoubleClick={() => handleItemDoubleClick(name, node as FileNode)}
                    className={cn(
                      "flex flex-col items-center gap-2 p-4 rounded-win",
                      "transition-colors",
                      selectedItem === `${currentPath.join("/")}/${name}`
                        ? "bg-accent/20"
                        : isDarkMode
                        ? "hover:bg-white/10"
                        : "hover:bg-black/5"
                    )}
                  >
                    <Icon
                      size={40}
                      className={cn(
                        (node.type === "folder" || node.type === "project") && "text-yellow-500"
                      )}
                    />
                    <span className="text-sm text-center">{node.name}</span>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="space-y-1">
              {contents.map(([name, node]) => {
                const Icon =
                  node.type === "folder" || node.type === "project"
                    ? Folder
                    : node.type === "drive"
                    ? HardDrive
                    : node.projectId
                    ? Code
                    : FileText;

                return (
                  <button
                    key={name}
                    onClick={() => setSelectedItem(`${currentPath.join("/")}/${name}`)}
                    onDoubleClick={() => handleItemDoubleClick(name, node as FileNode)}
                    className={cn(
                      "flex items-center gap-3 w-full px-3 py-2 rounded-win text-left",
                      "transition-colors",
                      selectedItem === `${currentPath.join("/")}/${name}`
                        ? "bg-accent/20"
                        : isDarkMode
                        ? "hover:bg-white/10"
                        : "hover:bg-black/5"
                    )}
                  >
                    <Icon
                      size={20}
                      className={cn(
                        (node.type === "folder" || node.type === "project") && "text-yellow-500"
                      )}
                    />
                    <span className="flex-1">{node.name}</span>
                    <span
                      className={cn(
                        "text-xs capitalize",
                        isDarkMode ? "text-white/50" : "text-black/50"
                      )}
                    >
                      {node.type}
                    </span>
                  </button>
                );
              })}
              {contents.length === 0 && (
                <div
                  className={cn(
                    "text-center py-8",
                    isDarkMode ? "text-white/50" : "text-black/50"
                  )}
                >
                  This folder is empty
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Status bar */}
      <div
        className={cn(
          "flex items-center justify-between px-4 py-1.5 text-xs border-t",
          isDarkMode ? "border-white/10 text-white/60" : "border-black/10 text-black/50"
        )}
      >
        <span>{contents.length} items</span>
        <span>{currentNode?.name}</span>
      </div>
    </div>
  );
}

