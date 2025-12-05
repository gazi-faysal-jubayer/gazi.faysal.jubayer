"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Wifi, Volume2, Battery, BatteryCharging, ChevronUp } from "lucide-react";
import { useOSStore } from "@/store/useOSStore";
import { formatTime, formatDate, cn } from "@/lib/utils";

interface BatteryState {
  level: number;
  charging: boolean;
}

export default function SystemTray() {
  const [time, setTime] = useState<Date>(new Date());
  const [battery, setBattery] = useState<BatteryState>({ level: 100, charging: false });
  const { isDarkMode, toggleNotificationCenter, isNotificationCenterOpen } = useOSStore();

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Get battery status
  useEffect(() => {
    const getBattery = async () => {
      try {
        // @ts-expect-error - Battery API not in TypeScript types
        const batteryManager = await navigator.getBattery?.();
        if (batteryManager) {
          const updateBattery = () => {
            setBattery({
              level: Math.round(batteryManager.level * 100),
              charging: batteryManager.charging,
            });
          };
          updateBattery();
          batteryManager.addEventListener("levelchange", updateBattery);
          batteryManager.addEventListener("chargingchange", updateBattery);

          return () => {
            batteryManager.removeEventListener("levelchange", updateBattery);
            batteryManager.removeEventListener("chargingchange", updateBattery);
          };
        }
      } catch {
        // Battery API not available
      }
    };
    getBattery();
  }, []);

  const handleTrayClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      toggleNotificationCenter();
    },
    [toggleNotificationCenter]
  );

  const BatteryIcon = battery.charging ? BatteryCharging : Battery;

  return (
    <div className="flex items-center h-12">
      {/* Hidden icons arrow */}
      <button
        className={cn(
          "taskbar-icon w-6",
          isDarkMode ? "hover:bg-white/10" : "hover:bg-black/5"
        )}
      >
        <ChevronUp
          size={14}
          className={isDarkMode ? "text-white/60" : "text-black/50"}
        />
      </button>

      {/* System icons */}
      <div
        className={cn(
          "flex items-center gap-2 px-2 h-10 rounded-win cursor-pointer transition-colors",
          isDarkMode ? "hover:bg-white/10" : "hover:bg-black/5"
        )}
        onClick={handleTrayClick}
      >
        <Wifi
          size={16}
          className={isDarkMode ? "text-white/80" : "text-black/70"}
        />
        <Volume2
          size={16}
          className={isDarkMode ? "text-white/80" : "text-black/70"}
        />
        <div className="flex items-center gap-0.5">
          <BatteryIcon
            size={16}
            className={cn(
              isDarkMode ? "text-white/80" : "text-black/70",
              battery.level < 20 && "text-red-500"
            )}
          />
          <span
            className={cn(
              "text-xs",
              isDarkMode ? "text-white/60" : "text-black/50"
            )}
          >
            {battery.level}%
          </span>
        </div>
      </div>

      {/* Date/Time */}
      <motion.button
        onClick={handleTrayClick}
        className={cn(
          "flex flex-col items-end justify-center px-3 h-10 rounded-win cursor-pointer transition-colors",
          isNotificationCenterOpen && (isDarkMode ? "bg-white/10" : "bg-black/5"),
          isDarkMode ? "hover:bg-white/10" : "hover:bg-black/5"
        )}
      >
        <span
          className={cn(
            "text-xs leading-tight",
            isDarkMode ? "text-white/90" : "text-black/80"
          )}
        >
          {formatTime(time)}
        </span>
        <span
          className={cn(
            "text-xs leading-tight",
            isDarkMode ? "text-white/70" : "text-black/60"
          )}
        >
          {formatDate(time)}
        </span>
      </motion.button>

      {/* Show desktop button */}
      <div
        className={cn(
          "w-1 h-full",
          isDarkMode ? "hover:bg-white/20" : "hover:bg-black/10",
          "cursor-pointer transition-colors"
        )}
        title="Show desktop"
      />
    </div>
  );
}

