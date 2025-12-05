"use client";

import { useState, useCallback } from "react";
import {
  ArrowLeft,
  ArrowRight,
  RotateCw,
  Home,
  Star,
  Shield,
  MoreHorizontal,
  Plus,
  X,
  Globe,
  ExternalLink,
} from "lucide-react";
import { useOSStore } from "@/store/useOSStore";
import { PROJECTS, PROFILE } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface Tab {
  id: string;
  title: string;
  url: string;
  favicon?: string;
}

const BOOKMARKS = [
  { name: "GitHub", url: PROFILE.github, icon: "github" },
  { name: "LinkedIn", url: PROFILE.linkedin, icon: "linkedin" },
  { name: "Portfolio", url: "/", icon: "home" },
];

const QUICK_LINKS = [
  { name: "GitHub Profile", url: PROFILE.github, description: "View my repositories and contributions" },
  { name: "LinkedIn", url: PROFILE.linkedin, description: "Connect with me professionally" },
  { name: "Portfolio OS", url: "/", description: "You are here!" },
];

export default function Browser() {
  const { isDarkMode } = useOSStore();
  const [tabs, setTabs] = useState<Tab[]>([
    { id: "1", title: "New Tab", url: "edge://newtab" },
  ]);
  const [activeTabId, setActiveTabId] = useState("1");
  const [urlInput, setUrlInput] = useState("");

  const activeTab = tabs.find((t) => t.id === activeTabId);

  const navigate = useCallback((url: string) => {
    setTabs((prev) =>
      prev.map((tab) =>
        tab.id === activeTabId
          ? { ...tab, url, title: new URL(url.startsWith("http") ? url : `https://${url}`).hostname }
          : tab
      )
    );
    setUrlInput(url);
  }, [activeTabId]);

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (urlInput) {
      const url = urlInput.startsWith("http") ? urlInput : `https://${urlInput}`;
      navigate(url);
    }
  };

  const addTab = () => {
    const newTab: Tab = {
      id: Date.now().toString(),
      title: "New Tab",
      url: "edge://newtab",
    };
    setTabs((prev) => [...prev, newTab]);
    setActiveTabId(newTab.id);
    setUrlInput("");
  };

  const closeTab = (tabId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (tabs.length === 1) return;
    
    const newTabs = tabs.filter((t) => t.id !== tabId);
    setTabs(newTabs);
    
    if (activeTabId === tabId) {
      setActiveTabId(newTabs[newTabs.length - 1].id);
    }
  };

  const openExternal = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const isNewTab = activeTab?.url === "edge://newtab";

  return (
    <div className={cn("flex flex-col h-full", isDarkMode ? "bg-[#202020]" : "bg-white")}>
      {/* Tab bar */}
      <div
        className={cn(
          "flex items-center gap-1 px-2 pt-2",
          isDarkMode ? "bg-[#1f1f1f]" : "bg-[#f0f0f0]"
        )}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTabId(tab.id);
              setUrlInput(tab.url === "edge://newtab" ? "" : tab.url);
            }}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 min-w-[120px] max-w-[200px] rounded-t-win",
              "transition-colors text-sm",
              tab.id === activeTabId
                ? isDarkMode
                  ? "bg-[#202020] text-white"
                  : "bg-white text-black"
                : isDarkMode
                ? "text-white/60 hover:bg-white/5"
                : "text-black/60 hover:bg-black/5"
            )}
          >
            <Globe size={14} className="shrink-0" />
            <span className="truncate flex-1">{tab.title}</span>
            <button
              onClick={(e) => closeTab(tab.id, e)}
              className={cn(
                "p-0.5 rounded hover:bg-black/10",
                isDarkMode && "hover:bg-white/10"
              )}
            >
              <X size={12} />
            </button>
          </button>
        ))}
        <button
          onClick={addTab}
          className={cn(
            "p-1.5 rounded-full transition-colors",
            isDarkMode ? "hover:bg-white/10 text-white/60" : "hover:bg-black/5 text-black/60"
          )}
        >
          <Plus size={16} />
        </button>
      </div>

      {/* Navigation bar */}
      <div
        className={cn(
          "flex items-center gap-2 px-3 py-2 border-b",
          isDarkMode ? "border-white/10" : "border-black/10"
        )}
      >
        <div className="flex items-center gap-1">
          <button
            className={cn(
              "p-1.5 rounded transition-colors",
              isDarkMode ? "hover:bg-white/10 text-white/60" : "hover:bg-black/5 text-black/60"
            )}
          >
            <ArrowLeft size={16} />
          </button>
          <button
            className={cn(
              "p-1.5 rounded transition-colors",
              isDarkMode ? "hover:bg-white/10 text-white/60" : "hover:bg-black/5 text-black/60"
            )}
          >
            <ArrowRight size={16} />
          </button>
          <button
            className={cn(
              "p-1.5 rounded transition-colors",
              isDarkMode ? "hover:bg-white/10 text-white/60" : "hover:bg-black/5 text-black/60"
            )}
          >
            <RotateCw size={16} />
          </button>
          <button
            onClick={() => navigate("edge://newtab")}
            className={cn(
              "p-1.5 rounded transition-colors",
              isDarkMode ? "hover:bg-white/10 text-white/60" : "hover:bg-black/5 text-black/60"
            )}
          >
            <Home size={16} />
          </button>
        </div>

        {/* URL bar */}
        <form onSubmit={handleUrlSubmit} className="flex-1">
          <div
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-full",
              isDarkMode ? "bg-white/10" : "bg-black/5"
            )}
          >
            <Shield size={14} className={isDarkMode ? "text-white/40" : "text-black/40"} />
            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="Search or enter web address"
              className={cn(
                "flex-1 bg-transparent outline-none text-sm",
                isDarkMode
                  ? "text-white placeholder:text-white/40"
                  : "text-black placeholder:text-black/40"
              )}
            />
          </div>
        </form>

        <div className="flex items-center gap-1">
          <button
            className={cn(
              "p-1.5 rounded transition-colors",
              isDarkMode ? "hover:bg-white/10 text-white/60" : "hover:bg-black/5 text-black/60"
            )}
          >
            <Star size={16} />
          </button>
          <button
            className={cn(
              "p-1.5 rounded transition-colors",
              isDarkMode ? "hover:bg-white/10 text-white/60" : "hover:bg-black/5 text-black/60"
            )}
          >
            <MoreHorizontal size={16} />
          </button>
        </div>
      </div>

      {/* Bookmarks bar */}
      <div
        className={cn(
          "flex items-center gap-2 px-3 py-1.5 text-sm border-b",
          isDarkMode ? "border-white/10" : "border-black/10"
        )}
      >
        {BOOKMARKS.map((bookmark) => (
          <button
            key={bookmark.name}
            onClick={() => openExternal(bookmark.url)}
            className={cn(
              "flex items-center gap-1.5 px-2 py-1 rounded transition-colors",
              isDarkMode ? "hover:bg-white/10 text-white/70" : "hover:bg-black/5 text-black/70"
            )}
          >
            <Globe size={12} />
            <span>{bookmark.name}</span>
          </button>
        ))}
      </div>

      {/* Content area */}
      <div className="flex-1 overflow-auto">
        {isNewTab ? (
          // New tab page
          <div className="flex flex-col items-center justify-center h-full p-8">
            <h1
              className={cn(
                "text-3xl font-light mb-8",
                isDarkMode ? "text-white" : "text-black"
              )}
            >
              Good {new Date().getHours() < 12 ? "morning" : new Date().getHours() < 18 ? "afternoon" : "evening"}
            </h1>

            {/* Search box */}
            <form onSubmit={handleUrlSubmit} className="w-full max-w-xl mb-12">
              <div
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-full shadow-lg",
                  isDarkMode ? "bg-white/10" : "bg-white"
                )}
              >
                <Globe size={20} className={isDarkMode ? "text-white/50" : "text-black/50"} />
                <input
                  type="text"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="Search the web"
                  className={cn(
                    "flex-1 bg-transparent outline-none",
                    isDarkMode
                      ? "text-white placeholder:text-white/40"
                      : "text-black placeholder:text-black/40"
                  )}
                />
              </div>
            </form>

            {/* Quick links */}
            <div className="grid grid-cols-3 gap-4 w-full max-w-2xl">
              {QUICK_LINKS.map((link) => (
                <button
                  key={link.name}
                  onClick={() => openExternal(link.url)}
                  className={cn(
                    "flex flex-col items-center gap-3 p-6 rounded-win-lg transition-all",
                    isDarkMode
                      ? "bg-white/5 hover:bg-white/10"
                      : "bg-black/5 hover:bg-black/10"
                  )}
                >
                  <div
                    className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center",
                      "bg-accent text-white"
                    )}
                  >
                    <Globe size={24} />
                  </div>
                  <div className="text-center">
                    <p
                      className={cn(
                        "font-medium",
                        isDarkMode ? "text-white" : "text-black"
                      )}
                    >
                      {link.name}
                    </p>
                    <p
                      className={cn(
                        "text-xs mt-1",
                        isDarkMode ? "text-white/50" : "text-black/50"
                      )}
                    >
                      {link.description}
                    </p>
                  </div>
                  <ExternalLink
                    size={14}
                    className={isDarkMode ? "text-white/30" : "text-black/30"}
                  />
                </button>
              ))}
            </div>

            {/* Projects section */}
            <div className="mt-12 w-full max-w-2xl">
              <h2
                className={cn(
                  "text-lg font-medium mb-4",
                  isDarkMode ? "text-white" : "text-black"
                )}
              >
                My Projects
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {PROJECTS.map((project) => (
                  <div
                    key={project.id}
                    className={cn(
                      "p-4 rounded-win",
                      isDarkMode ? "bg-white/5" : "bg-black/5"
                    )}
                  >
                    <p
                      className={cn(
                        "font-medium",
                        isDarkMode ? "text-white" : "text-black"
                      )}
                    >
                      {project.title}
                    </p>
                    <p
                      className={cn(
                        "text-sm mt-1",
                        isDarkMode ? "text-white/50" : "text-black/50"
                      )}
                    >
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {project.tech.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className={cn(
                            "px-2 py-0.5 text-xs rounded",
                            isDarkMode ? "bg-white/10 text-white/70" : "bg-accent/10 text-accent"
                          )}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          // Iframe for external URLs
          <div className="h-full flex items-center justify-center">
            <div
              className={cn(
                "text-center p-8",
                isDarkMode ? "text-white/50" : "text-black/50"
              )}
            >
              <Globe size={48} className="mx-auto mb-4 opacity-50" />
              <p className="text-lg mb-2">External Website</p>
              <p className="text-sm mb-4">
                For security reasons, external websites open in a new tab
              </p>
              <button
                onClick={() => openExternal(activeTab?.url || "")}
                className="px-4 py-2 bg-accent text-white rounded-win hover:bg-accent/90"
              >
                Open {activeTab?.title} in new tab
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

