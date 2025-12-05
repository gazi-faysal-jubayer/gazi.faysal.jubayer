import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface WindowState {
  id: string;
  appId: string;
  title: string;
  icon: string;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

interface OSState {
  // Window management
  windows: WindowState[];
  activeWindowId: string | null;
  nextZIndex: number;

  // Theme
  isDarkMode: boolean;
  currentWallpaper: string;

  // UI state
  isStartMenuOpen: boolean;
  isNotificationCenterOpen: boolean;
  isSearchOpen: boolean;

  // Boot state
  hasBooted: boolean;

  // Actions
  openWindow: (appId: string, title: string, icon: string) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  restoreWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  updateWindowPosition: (id: string, position: { x: number; y: number }) => void;
  updateWindowSize: (id: string, size: { width: number; height: number }) => void;

  toggleDarkMode: () => void;
  setWallpaper: (wallpaperId: string) => void;

  toggleStartMenu: () => void;
  closeStartMenu: () => void;
  toggleNotificationCenter: () => void;
  closeNotificationCenter: () => void;
  toggleSearch: () => void;
  closeSearch: () => void;

  setHasBooted: (value: boolean) => void;
}

const generateWindowId = () => `window-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

export const useOSStore = create<OSState>()(
  persist(
    (set, get) => ({
      // Initial state
      windows: [],
      activeWindowId: null,
      nextZIndex: 1,
      isDarkMode: false,
      currentWallpaper: "default",
      isStartMenuOpen: false,
      isNotificationCenterOpen: false,
      isSearchOpen: false,
      hasBooted: false,

      // Window actions
      openWindow: (appId, title, icon) => {
        const { windows, nextZIndex } = get();
        
        // Check if window with same appId already exists
        const existingWindow = windows.find((w) => w.appId === appId);
        if (existingWindow) {
          // If minimized, restore it; otherwise just focus
          if (existingWindow.isMinimized) {
            set((state) => ({
              windows: state.windows.map((w) =>
                w.id === existingWindow.id
                  ? { ...w, isMinimized: false, zIndex: state.nextZIndex }
                  : w
              ),
              activeWindowId: existingWindow.id,
              nextZIndex: state.nextZIndex + 1,
            }));
          } else {
            get().focusWindow(existingWindow.id);
          }
          return;
        }

        const newWindow: WindowState = {
          id: generateWindowId(),
          appId,
          title,
          icon,
          isMinimized: false,
          isMaximized: false,
          zIndex: nextZIndex,
          position: { x: 100 + windows.length * 30, y: 50 + windows.length * 30 },
          size: { width: 900, height: 600 },
        };

        set((state) => ({
          windows: [...state.windows, newWindow],
          activeWindowId: newWindow.id,
          nextZIndex: state.nextZIndex + 1,
          isStartMenuOpen: false,
        }));
      },

      closeWindow: (id) => {
        set((state) => {
          const newWindows = state.windows.filter((w) => w.id !== id);
          const newActiveId =
            state.activeWindowId === id
              ? newWindows.length > 0
                ? newWindows.reduce((prev, curr) =>
                    prev.zIndex > curr.zIndex ? prev : curr
                  ).id
                : null
              : state.activeWindowId;
          return {
            windows: newWindows,
            activeWindowId: newActiveId,
          };
        });
      },

      minimizeWindow: (id) => {
        set((state) => ({
          windows: state.windows.map((w) =>
            w.id === id ? { ...w, isMinimized: true } : w
          ),
          activeWindowId:
            state.activeWindowId === id
              ? state.windows
                  .filter((w) => w.id !== id && !w.isMinimized)
                  .reduce<WindowState | null>(
                    (prev, curr) =>
                      !prev || curr.zIndex > prev.zIndex ? curr : prev,
                    null
                  )?.id ?? null
              : state.activeWindowId,
        }));
      },

      maximizeWindow: (id) => {
        set((state) => ({
          windows: state.windows.map((w) =>
            w.id === id ? { ...w, isMaximized: true } : w
          ),
        }));
      },

      restoreWindow: (id) => {
        set((state) => ({
          windows: state.windows.map((w) =>
            w.id === id ? { ...w, isMaximized: false, isMinimized: false } : w
          ),
        }));
      },

      focusWindow: (id) => {
        const { nextZIndex } = get();
        set((state) => ({
          windows: state.windows.map((w) =>
            w.id === id ? { ...w, zIndex: nextZIndex, isMinimized: false } : w
          ),
          activeWindowId: id,
          nextZIndex: state.nextZIndex + 1,
        }));
      },

      updateWindowPosition: (id, position) => {
        set((state) => ({
          windows: state.windows.map((w) =>
            w.id === id ? { ...w, position } : w
          ),
        }));
      },

      updateWindowSize: (id, size) => {
        set((state) => ({
          windows: state.windows.map((w) =>
            w.id === id ? { ...w, size } : w
          ),
        }));
      },

      // Theme actions
      toggleDarkMode: () => {
        set((state) => ({ isDarkMode: !state.isDarkMode }));
      },

      setWallpaper: (wallpaperId) => {
        set({ currentWallpaper: wallpaperId });
      },

      // UI actions
      toggleStartMenu: () => {
        set((state) => ({
          isStartMenuOpen: !state.isStartMenuOpen,
          isNotificationCenterOpen: false,
          isSearchOpen: false,
        }));
      },

      closeStartMenu: () => {
        set({ isStartMenuOpen: false });
      },

      toggleNotificationCenter: () => {
        set((state) => ({
          isNotificationCenterOpen: !state.isNotificationCenterOpen,
          isStartMenuOpen: false,
          isSearchOpen: false,
        }));
      },

      closeNotificationCenter: () => {
        set({ isNotificationCenterOpen: false });
      },

      toggleSearch: () => {
        set((state) => ({
          isSearchOpen: !state.isSearchOpen,
          isStartMenuOpen: false,
          isNotificationCenterOpen: false,
        }));
      },

      closeSearch: () => {
        set({ isSearchOpen: false });
      },

      setHasBooted: (value) => {
        set({ hasBooted: value });
      },
    }),
    {
      name: "gazi-os-storage",
      partialize: (state) => ({
        isDarkMode: state.isDarkMode,
        currentWallpaper: state.currentWallpaper,
        hasBooted: state.hasBooted,
      }),
    }
  )
);

