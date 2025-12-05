"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Bell,
  Calendar,
  Moon,
  Sun,
  Wifi,
  Bluetooth,
  Plane,
  Settings,
  GitBranch,
  Box,
  Award,
  type LucideIcon,
} from "lucide-react";
import { useOSStore } from "@/store/useOSStore";
import { NOTIFICATIONS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const NOTIFICATION_ICONS: Record<string, LucideIcon> = {
  git: GitBranch,
  cube: Box,
  award: Award,
};

export default function NotificationCenter() {
  const {
    isNotificationCenterOpen,
    closeNotificationCenter,
    isDarkMode,
    toggleDarkMode,
    openWindow,
  } = useOSStore();

  const quickSettings = [
    { id: "wifi", icon: Wifi, label: "Wi-Fi", active: true },
    { id: "bluetooth", icon: Bluetooth, label: "Bluetooth", active: false },
    { id: "airplane", icon: Plane, label: "Airplane", active: false },
    {
      id: "theme",
      icon: isDarkMode ? Sun : Moon,
      label: isDarkMode ? "Light" : "Dark",
      active: isDarkMode,
      onClick: toggleDarkMode,
    },
  ];

  const handleSettingsClick = () => {
    openWindow("settings", "Settings", "settings");
    closeNotificationCenter();
  };

  return (
    <AnimatePresence>
      {isNotificationCenterOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40"
            onClick={closeNotificationCenter}
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={cn(
              "fixed bottom-14 right-3 z-50",
              "w-[380px] max-h-[calc(100vh-80px)]",
              "rounded-win-lg overflow-hidden",
              isDarkMode ? "glass-dark glass-border-dark" : "glass glass-border",
              isDarkMode ? "window-shadow-dark" : "window-shadow"
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Quick settings */}
            <div className="p-4">
              <div className="grid grid-cols-4 gap-2 mb-4">
                {quickSettings.map((setting) => {
                  const Icon = setting.icon;
                  return (
                    <button
                      key={setting.id}
                      onClick={setting.onClick}
                      className={cn(
                        "flex flex-col items-center gap-1 p-3 rounded-win",
                        "transition-colors",
                        setting.active
                          ? "bg-accent text-white"
                          : isDarkMode
                          ? "bg-white/10 hover:bg-white/15"
                          : "bg-black/5 hover:bg-black/10"
                      )}
                    >
                      <Icon size={18} />
                      <span className="text-xs">{setting.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Brightness slider placeholder */}
              <div className="mb-4">
                <div
                  className={cn(
                    "h-2 rounded-full",
                    isDarkMode ? "bg-white/20" : "bg-black/10"
                  )}
                >
                  <div
                    className="h-full w-3/4 bg-accent rounded-full"
                    style={{ maxWidth: "75%" }}
                  />
                </div>
              </div>

              {/* Settings button */}
              <button
                onClick={handleSettingsClick}
                className={cn(
                  "flex items-center gap-2 w-full px-3 py-2 rounded-win",
                  isDarkMode ? "hover:bg-white/10" : "hover:bg-black/5"
                )}
              >
                <Settings
                  size={16}
                  className={isDarkMode ? "text-white/70" : "text-black/60"}
                />
                <span
                  className={cn(
                    "text-sm",
                    isDarkMode ? "text-white/80" : "text-black/70"
                  )}
                >
                  All settings
                </span>
              </button>
            </div>

            {/* Notifications */}
            <div
              className={cn(
                "border-t",
                isDarkMode ? "border-white/10" : "border-black/10"
              )}
            >
              <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-2">
                  <Bell
                    size={16}
                    className={isDarkMode ? "text-white/70" : "text-black/60"}
                  />
                  <span
                    className={cn(
                      "text-sm font-medium",
                      isDarkMode ? "text-white" : "text-black"
                    )}
                  >
                    Notifications
                  </span>
                </div>
                <button
                  className={cn(
                    "text-xs px-2 py-1 rounded",
                    isDarkMode
                      ? "text-white/60 hover:bg-white/10"
                      : "text-black/50 hover:bg-black/5"
                  )}
                >
                  Clear all
                </button>
              </div>

              {/* Notification list */}
              <div className="px-4 pb-4 space-y-2 max-h-[300px] overflow-y-auto">
                {NOTIFICATIONS.map((notification) => {
                  const Icon = NOTIFICATION_ICONS[notification.icon] || Bell;
                  return (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={cn(
                        "flex gap-3 p-3 rounded-win group",
                        isDarkMode ? "bg-white/5 hover:bg-white/10" : "bg-black/5 hover:bg-black/10"
                      )}
                    >
                      <div
                        className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                          isDarkMode ? "bg-white/10" : "bg-accent/10"
                        )}
                      >
                        <Icon
                          size={16}
                          className={isDarkMode ? "text-white/70" : "text-accent"}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p
                          className={cn(
                            "text-sm font-medium truncate",
                            isDarkMode ? "text-white/90" : "text-black/80"
                          )}
                        >
                          {notification.title}
                        </p>
                        <p
                          className={cn(
                            "text-xs truncate",
                            isDarkMode ? "text-white/60" : "text-black/50"
                          )}
                        >
                          {notification.message}
                        </p>
                        <p
                          className={cn(
                            "text-xs mt-1",
                            isDarkMode ? "text-white/40" : "text-black/40"
                          )}
                        >
                          {notification.time}
                        </p>
                      </div>
                      <button
                        className={cn(
                          "opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded",
                          isDarkMode ? "hover:bg-white/10" : "hover:bg-black/10"
                        )}
                      >
                        <X
                          size={14}
                          className={isDarkMode ? "text-white/50" : "text-black/40"}
                        />
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Calendar preview */}
            <div
              className={cn(
                "border-t px-4 py-3",
                isDarkMode ? "border-white/10" : "border-black/10"
              )}
            >
              <div className="flex items-center gap-2">
                <Calendar
                  size={16}
                  className={isDarkMode ? "text-white/70" : "text-black/60"}
                />
                <span
                  className={cn(
                    "text-sm",
                    isDarkMode ? "text-white/80" : "text-black/70"
                  )}
                >
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

