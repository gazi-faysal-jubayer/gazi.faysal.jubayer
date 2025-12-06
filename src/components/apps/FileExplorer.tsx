"use client";

import { useState, useCallback, useEffect } from "react";
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
  Box,
  FileType,
  Github,
  Upload,
  ExternalLink,
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
  content?: string;
  modelPath?: string;
  pdfPath?: string;
  isGitHub?: boolean;
  isUploaded?: boolean;
};

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  updated_at: string;
}

export default function FileExplorer() {
  const { isDarkMode, openWindow, uploadedFiles, fileExplorerInitialPath, setFileExplorerInitialPath } = useOSStore();
  const [currentPath, setCurrentPath] = useState<string[]>(
    fileExplorerInitialPath || ["C:"]
  );
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(
    new Set(["C:", "C:/Projects", "C:/Users", "C:/Users/Gazi", "C:/Users/Gazi/Desktop", "D:", "D:/Projects"])
  );
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [gitHubRepos, setGitHubRepos] = useState<GitHubRepo[]>([]);
  const [isLoadingGitHub, setIsLoadingGitHub] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  // Clear initial path after using it
  useEffect(() => {
    if (fileExplorerInitialPath) {
      setCurrentPath(fileExplorerInitialPath);
      setFileExplorerInitialPath(null);
    }
  }, [fileExplorerInitialPath, setFileExplorerInitialPath]);

  // Fetch GitHub repos when in Code Projects folder
  useEffect(() => {
    const pathStr = currentPath.join("/");
    if (pathStr === "C:/Users/Gazi/Desktop/Code Projects" || pathStr.includes("Code Projects")) {
      setIsLoadingGitHub(true);
      fetch("https://api.github.com/users/gazi-faysal-jubayer/repos?sort=updated&per_page=15")
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setGitHubRepos(data);
          }
          setIsLoadingGitHub(false);
        })
        .catch(() => {
          setIsLoadingGitHub(false);
        });
    }
  }, [currentPath]);

  const getNodeAtPath = useCallback((path: string[]): FileNode | null => {
    let current: Record<string, FileNode> = FILE_SYSTEM as unknown as Record<string, FileNode>;
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
    const pathStr = currentPath.join("/");
    
    // Check if we're in Code Projects folder - show GitHub repos
    if (pathStr === "C:/Users/Gazi/Desktop/Code Projects" && gitHubRepos.length > 0) {
      return gitHubRepos.map((repo) => [
        repo.name,
        {
          name: repo.name,
          type: "folder" as const,
          isGitHub: true,
          projectId: repo.html_url,
          children: {},
        },
      ]);
    }
    
    if (node?.children) {
      const entries = Object.entries(node.children) as [string, FileNode][];
      
      // Also add any uploaded files for this path
      const uploadedForPath = Object.entries(uploadedFiles)
        .filter(([filePath]) => {
          const parentPath = filePath.substring(0, filePath.lastIndexOf("/"));
          return parentPath === pathStr || (pathStr === "C:/Users/Gazi/Desktop" && filePath.startsWith("Desktop/"));
        })
        .map(([filePath, file]) => {
          const fileName = filePath.split("/").pop() || file.name;
          const ext = fileName.split(".").pop()?.toLowerCase();
          return [
            fileName,
            {
              name: fileName,
              type: "file" as const,
              fileType: ext,
              isUploaded: true,
            },
          ] as [string, FileNode];
        });
      
      return [...entries, ...uploadedForPath];
    }
    return [];
  }, [currentPath, getNodeAtPath, gitHubRepos, uploadedFiles]);

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
        // Check if it's a GitHub repo folder
        if (node.isGitHub && node.projectId) {
          // Open in VS Code with repo info
          openWindow("vscode", `VS Code - ${node.name}`, "code");
          // Also open GitHub URL in new tab
          window.open(node.projectId, "_blank");
          return;
        }
        navigateTo([...currentPath, name]);
      } else if (node.type === "project" && node.projectId) {
        const project = PROJECTS.find((p) => p.id === node.projectId);
        if (project?.type === "code") {
          openWindow("vscode", `VS Code - ${node.name}`, "code");
        } else if (project?.type === "mechanical") {
          openWindow("cad-viewer", `3D Viewer - ${node.name}`, "box");
        }
      } else if (node.type === "file") {
        // Handle different file types
        const extension = name.split(".").pop()?.toLowerCase();

        switch (extension) {
          case "glb":
          case "gltf":
            // Open in 3D Viewer
            openWindow("cad-viewer", `3D Viewer - ${name}`, "box");
            break;
          case "txt":
            // Open in Notepad with content
            if (node.content) {
              // Store content temporarily for notepad to read
              sessionStorage.setItem("notepad-content", node.content);
              sessionStorage.setItem("notepad-filename", name);
            }
            openWindow("notepad", `Notepad - ${name}`, "file-text");
            break;
          case "pdf":
            // Open in PDF Viewer
            openWindow("pdf-viewer", `DocuRead - ${name}`, "file-text");
            break;
          default:
            // Default: try notepad
            openWindow("notepad", `Notepad - ${name}`, "file-text");
            break;
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

  // Drag and drop handlers
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragOver(false);

      const { addUploadedFile } = useOSStore.getState();
      const files = Array.from(e.dataTransfer.files);
      const pathStr = currentPath.join("/");
      
      files.forEach((file) => {
        addUploadedFile(`${pathStr}/${file.name}`, file);
      });
    },
    [currentPath]
  );

  const getFileIcon = (node: FileNode, name: string) => {
    if (node.type === "drive") return HardDrive;
    if (node.type === "folder" || node.type === "project") {
      if (node.isGitHub) return Github;
      return Folder;
    }
    
    const ext = name.split(".").pop()?.toLowerCase();
    switch (ext) {
      case "glb":
      case "gltf":
        return Box;
      case "pdf":
        return FileType;
      case "txt":
        return FileText;
      default:
        return node.projectId ? Code : FileText;
    }
  };

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
    const Icon = isExpanded && (node.type === "folder" || node.type === "project")
      ? FolderOpen
      : getFileIcon(node, name);

    return (
      <div key={fullPath}>
        <button
          onClick={() => {
            setSelectedItem(fullPath);
            if (hasChildren || node.type === "folder") {
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
          {hasChildren || node.type === "folder" ? (
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
              (node.type === "folder" || node.type === "project") && "text-yellow-500",
              node.isGitHub && "text-purple-500"
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
        {(hasChildren || node.isGitHub) && isExpanded && node.children && (
          <div>
            {Object.entries(node.children).map(([childName, childNode]) =>
              renderTreeNode(childName, childNode as FileNode, fullPath, level + 1)
            )}
          </div>
        )}
      </div>
    );
  };

  const contents = getCurrentContents();
  const currentNode = getNodeAtPath(currentPath);
  const isCodeProjects = currentPath.join("/").includes("Code Projects");

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
        <div
          className={cn(
            "flex-1 overflow-y-auto p-4",
            isDragOver && "bg-accent/10 ring-2 ring-inset ring-accent/50"
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {/* GitHub loading indicator */}
          {isLoadingGitHub && isCodeProjects && (
            <div className="flex items-center justify-center py-8 gap-2">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-accent"></div>
              <span className={isDarkMode ? "text-white/60" : "text-black/60"}>
                Loading GitHub repositories...
              </span>
            </div>
          )}

          {/* Drop zone indicator */}
          {isDragOver && (
            <div className="absolute inset-4 flex items-center justify-center bg-accent/10 border-2 border-dashed border-accent rounded-lg pointer-events-none">
              <div className="flex items-center gap-2 text-accent">
                <Upload size={24} />
                <span className="font-medium">Drop files here</span>
              </div>
            </div>
          )}

          {viewMode === "grid" ? (
            <div className="grid grid-cols-4 gap-4">
              {contents.map(([name, node]) => {
                const Icon = getFileIcon(node, name);
                const isGitHubRepo = node.isGitHub;

                return (
                  <button
                    key={name}
                    onClick={() => setSelectedItem(`${currentPath.join("/")}/${name}`)}
                    onDoubleClick={() => handleItemDoubleClick(name, node as FileNode)}
                    className={cn(
                      "flex flex-col items-center gap-2 p-4 rounded-win",
                      "transition-colors relative",
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
                        (node.type === "folder" || node.type === "project") && !isGitHubRepo && "text-yellow-500",
                        isGitHubRepo && "text-purple-500",
                        node.fileType === "glb" && "text-orange-500",
                        node.fileType === "pdf" && "text-red-500"
                      )}
                    />
                    <span className="text-sm text-center truncate w-full">{node.name}</span>
                    {isGitHubRepo && (
                      <ExternalLink size={12} className="absolute top-2 right-2 opacity-50" />
                    )}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="space-y-1">
              {contents.map(([name, node]) => {
                const Icon = getFileIcon(node, name);
                const isGitHubRepo = node.isGitHub;
                const repo = gitHubRepos.find((r) => r.name === name);

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
                        (node.type === "folder" || node.type === "project") && !isGitHubRepo && "text-yellow-500",
                        isGitHubRepo && "text-purple-500",
                        node.fileType === "glb" && "text-orange-500",
                        node.fileType === "pdf" && "text-red-500"
                      )}
                    />
                    <span className="flex-1">{node.name}</span>
                    {repo && (
                      <span
                        className={cn(
                          "text-xs px-2 py-0.5 rounded",
                          isDarkMode ? "bg-white/10" : "bg-black/10"
                        )}
                      >
                        {repo.language || "No language"}
                      </span>
                    )}
                    {isGitHubRepo && (
                      <ExternalLink size={14} className="opacity-50" />
                    )}
                    <span
                      className={cn(
                        "text-xs capitalize",
                        isDarkMode ? "text-white/50" : "text-black/50"
                      )}
                    >
                      {node.fileType || node.type}
                    </span>
                  </button>
                );
              })}
              {contents.length === 0 && !isLoadingGitHub && (
                <div
                  className={cn(
                    "text-center py-8",
                    isDarkMode ? "text-white/50" : "text-black/50"
                  )}
                >
                  {isCodeProjects ? (
                    <div className="flex flex-col items-center gap-2">
                      <Github size={40} className="opacity-30" />
                      <p>No repositories found</p>
                      <p className="text-xs">Check your GitHub username</p>
                    </div>
                  ) : (
                    "This folder is empty"
                  )}
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
