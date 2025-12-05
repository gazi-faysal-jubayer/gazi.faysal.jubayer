"use client";

import { useState } from "react";
import {
  Monitor,
  Palette,
  User,
  Bell,
  Lock,
  Clock,
  Globe,
  Info,
  Moon,
  Sun,
  Check,
} from "lucide-react";
import { useOSStore } from "@/store/useOSStore";
import { WALLPAPERS, PROFILE } from "@/lib/constants";
import { cn } from "@/lib/utils";

type SettingsCategory =
  | "system"
  | "personalization"
  | "accounts"
  | "notifications"
  | "privacy"
  | "time"
  | "language"
  | "about";

const CATEGORIES = [
  { id: "system" as const, name: "System", icon: Monitor },
  { id: "personalization" as const, name: "Personalization", icon: Palette },
  { id: "accounts" as const, name: "Accounts", icon: User },
  { id: "notifications" as const, name: "Notifications", icon: Bell },
  { id: "privacy" as const, name: "Privacy", icon: Lock },
  { id: "time" as const, name: "Time & language", icon: Clock },
  { id: "language" as const, name: "Region", icon: Globe },
  { id: "about" as const, name: "About", icon: Info },
];

export default function Settings() {
  const { isDarkMode, toggleDarkMode, currentWallpaper, setWallpaper } = useOSStore();
  const [activeCategory, setActiveCategory] = useState<SettingsCategory>("personalization");

  const renderContent = () => {
    switch (activeCategory) {
      case "personalization":
        return (
          <div className="space-y-6">
            {/* Theme section */}
            <section>
              <h3
                className={cn(
                  "text-lg font-semibold mb-4",
                  isDarkMode ? "text-white" : "text-black"
                )}
              >
                Theme
              </h3>
              <div className="flex gap-4">
                <button
                  onClick={() => !isDarkMode || toggleDarkMode()}
                  className={cn(
                    "flex flex-col items-center gap-2 p-4 rounded-win-lg border-2 transition-all",
                    !isDarkMode
                      ? "border-accent"
                      : isDarkMode
                      ? "border-white/10 hover:border-white/20"
                      : "border-black/10 hover:border-black/20"
                  )}
                >
                  <div className="w-24 h-16 rounded-win bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                    <Sun size={24} className="text-white" />
                  </div>
                  <span
                    className={cn(
                      "text-sm font-medium",
                      isDarkMode ? "text-white" : "text-black"
                    )}
                  >
                    Light
                  </span>
                  {!isDarkMode && (
                    <Check size={16} className="text-accent" />
                  )}
                </button>

                <button
                  onClick={() => isDarkMode || toggleDarkMode()}
                  className={cn(
                    "flex flex-col items-center gap-2 p-4 rounded-win-lg border-2 transition-all",
                    isDarkMode
                      ? "border-accent"
                      : "border-black/10 hover:border-black/20"
                  )}
                >
                  <div className="w-24 h-16 rounded-win bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                    <Moon size={24} className="text-white" />
                  </div>
                  <span
                    className={cn(
                      "text-sm font-medium",
                      isDarkMode ? "text-white" : "text-black"
                    )}
                  >
                    Dark
                  </span>
                  {isDarkMode && (
                    <Check size={16} className="text-accent" />
                  )}
                </button>
              </div>
            </section>

            {/* Wallpaper section */}
            <section>
              <h3
                className={cn(
                  "text-lg font-semibold mb-4",
                  isDarkMode ? "text-white" : "text-black"
                )}
              >
                Background
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {WALLPAPERS.map((wallpaper) => (
                  <button
                    key={wallpaper.id}
                    onClick={() => setWallpaper(wallpaper.id)}
                    className={cn(
                      "relative rounded-win-lg overflow-hidden border-2 transition-all",
                      currentWallpaper === wallpaper.id
                        ? "border-accent"
                        : isDarkMode
                        ? "border-white/10 hover:border-white/20"
                        : "border-black/10 hover:border-black/20"
                    )}
                  >
                    <div
                      className="w-full h-20"
                      style={{
                        background:
                          wallpaper.type === "gradient"
                            ? wallpaper.value
                            : wallpaper.value,
                      }}
                    />
                    <div
                      className={cn(
                        "p-2 text-xs text-center",
                        isDarkMode ? "bg-white/5 text-white/80" : "bg-black/5 text-black/80"
                      )}
                    >
                      {wallpaper.name}
                    </div>
                    {currentWallpaper === wallpaper.id && (
                      <div className="absolute top-2 right-2 w-5 h-5 bg-accent rounded-full flex items-center justify-center">
                        <Check size={12} className="text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </section>
          </div>
        );

      case "about":
        return (
          <div className="space-y-6">
            <section>
              <h3
                className={cn(
                  "text-lg font-semibold mb-4",
                  isDarkMode ? "text-white" : "text-black"
                )}
              >
                About this PC
              </h3>
              <div
                className={cn(
                  "rounded-win-lg p-6 space-y-4",
                  isDarkMode ? "bg-white/5" : "bg-black/5"
                )}
              >
                {/* Windows logo */}
                <div className="flex items-center gap-4 pb-4 border-b border-white/10">
                  <div className="w-16 h-16 bg-accent rounded-win flex items-center justify-center">
                    <svg viewBox="0 0 88 88" className="w-10 h-10 text-white" fill="currentColor">
                      <rect x="0" y="0" width="40" height="40" />
                      <rect x="44" y="0" width="40" height="40" />
                      <rect x="0" y="44" width="40" height="40" />
                      <rect x="44" y="44" width="40" height="40" />
                    </svg>
                  </div>
                  <div>
                    <h4
                      className={cn(
                        "text-xl font-semibold",
                        isDarkMode ? "text-white" : "text-black"
                      )}
                    >
                      GaziOS
                    </h4>
                    <p
                      className={cn(
                        "text-sm",
                        isDarkMode ? "text-white/60" : "text-black/60"
                      )}
                    >
                      Portfolio Edition
                    </p>
                  </div>
                </div>

                {/* Specs */}
                <div className="space-y-3">
                  {[
                    { label: "Device name", value: "GAZI-PORTFOLIO" },
                    { label: "Owner", value: PROFILE.name },
                    { label: "Version", value: "1.0.0" },
                    { label: "Framework", value: "Next.js 14" },
                    { label: "Language", value: "TypeScript" },
                    { label: "Styling", value: "Tailwind CSS" },
                    { label: "State", value: "Zustand" },
                    { label: "3D Engine", value: "Three.js / R3F" },
                  ].map((spec) => (
                    <div key={spec.label} className="flex justify-between">
                      <span
                        className={cn(
                          "text-sm",
                          isDarkMode ? "text-white/60" : "text-black/60"
                        )}
                      >
                        {spec.label}
                      </span>
                      <span
                        className={cn(
                          "text-sm font-medium",
                          isDarkMode ? "text-white" : "text-black"
                        )}
                      >
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        );

      case "system":
        return (
          <div className="space-y-6">
            <section>
              <h3
                className={cn(
                  "text-lg font-semibold mb-4",
                  isDarkMode ? "text-white" : "text-black"
                )}
              >
                Display
              </h3>
              <p
                className={cn(
                  "text-sm",
                  isDarkMode ? "text-white/60" : "text-black/60"
                )}
              >
                Display settings are managed by your browser.
              </p>
            </section>
          </div>
        );

      default:
        return (
          <div className="flex items-center justify-center h-full">
            <p
              className={cn(
                "text-sm",
                isDarkMode ? "text-white/50" : "text-black/50"
              )}
            >
              This section is coming soon.
            </p>
          </div>
        );
    }
  };

  return (
    <div className={cn("flex h-full", isDarkMode ? "text-white" : "text-black")}>
      {/* Sidebar */}
      <div
        className={cn(
          "w-64 border-r overflow-y-auto py-4",
          isDarkMode ? "border-white/10" : "border-black/10"
        )}
      >
        {/* Search */}
        <div className="px-4 mb-4">
          <input
            type="text"
            placeholder="Find a setting"
            className={cn(
              "w-full px-4 py-2 rounded-win text-sm outline-none",
              isDarkMode
                ? "bg-white/10 text-white placeholder:text-white/40"
                : "bg-black/5 text-black placeholder:text-black/40"
            )}
          />
        </div>

        {/* Categories */}
        <div className="space-y-1 px-2">
          {CATEGORIES.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  "flex items-center gap-3 w-full px-3 py-2.5 rounded-win text-left transition-colors",
                  activeCategory === category.id
                    ? "bg-accent/20 text-accent"
                    : isDarkMode
                    ? "hover:bg-white/10"
                    : "hover:bg-black/5"
                )}
              >
                <Icon size={20} />
                <span className="text-sm">{category.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">{renderContent()}</div>
    </div>
  );
}

