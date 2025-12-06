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

  // Desktop icon positions
  iconPositions: Record<string, { x: number; y: number }>;

  // Uploaded files from drag-drop
  uploadedFiles: Record<string, File>;

  // File Explorer initial path (for folder shortcuts)
  fileExplorerInitialPath: string[] | null;

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
  updateIconPosition: (appId: string, position: { x: number; y: number }) => void;
  resetIconPositions: () => void;
  addUploadedFile: (path: string, file: File) => void;
  removeUploadedFile: (path: string) => void;
  setFileExplorerInitialPath: (path: string[] | null) => void;
  
  // Icon collision detection helpers
  isPositionOccupied: (x: number, y: number, excludeId?: string) => boolean;
  findNearestAvailablePosition: (x: number, y: number, excludeId: string) => { x: number; y: number };
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
      iconPositions: {},
      uploadedFiles: {},
      fileExplorerInitialPath: null,

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

      updateIconPosition: (appId, position) => {
        set((state) => ({
          iconPositions: {
            ...state.iconPositions,
            [appId]: position,
          },
        }));
      },

      resetIconPositions: () => {
        set({ iconPositions: {} });
      },

      addUploadedFile: (path, file) => {
        set((state) => ({
          uploadedFiles: {
            ...state.uploadedFiles,
            [path]: file,
          },
        }));
      },

      removeUploadedFile: (path) => {
        set((state) => {
          const newFiles = { ...state.uploadedFiles };
          delete newFiles[path];
          return { uploadedFiles: newFiles };
        });
      },

      setFileExplorerInitialPath: (path) => {
        set({ fileExplorerInitialPath: path });
      },

      // Icon collision detection helpers
      isPositionOccupied: (x, y, excludeId) => {
        const { iconPositions } = get();
        const ICON_WIDTH = 90;
        const ICON_HEIGHT = 100;
        const MIN_DISTANCE = 45; // Half of icon width for overlap check

        return Object.entries(iconPositions).some(([id, pos]) => {
          if (excludeId && id === excludeId) return false;
          
          // Calculate distance between centers
          const centerX1 = x + ICON_WIDTH / 2;
          const centerY1 = y + ICON_HEIGHT / 2;
          const centerX2 = pos.x + ICON_WIDTH / 2;
          const centerY2 = pos.y + ICON_HEIGHT / 2;
          
          const distance = Math.sqrt(
            Math.pow(centerX2 - centerX1, 2) + 
            Math.pow(centerY2 - centerY1, 2)
          );
          
          return distance < MIN_DISTANCE;
        });
      },

      findNearestAvailablePosition: (targetX, targetY, excludeId) => {
        const ICON_WIDTH = 90;
        const ICON_HEIGHT = 100;
        const MAX_SEARCH_RADIUS = 10; // Search up to 10 grid cells away

        // Snap target to grid first
        const gridX = Math.round(targetX / ICON_WIDTH) * ICON_WIDTH;
        const gridY = Math.round(targetY / ICON_HEIGHT) * ICON_HEIGHT;

        // Check if target position is free
        if (!get().isPositionOccupied(gridX, gridY, excludeId)) {
          return { x: gridX, y: gridY };
        }

        // Spiral outward to find nearest free spot
        for (let radius = 1; radius <= MAX_SEARCH_RADIUS; radius++) {
          // Check positions in a square spiral
          for (let dx = -radius; dx <= radius; dx++) {
            for (let dy = -radius; dy <= radius; dy++) {
              // Only check edge of current radius (not interior)
              if (Math.abs(dx) === radius || Math.abs(dy) === radius) {
                const testX = gridX + dx * ICON_WIDTH;
                const testY = gridY + dy * ICON_HEIGHT;

                // Keep within reasonable bounds (not negative)
                if (testX >= 0 && testY >= 0) {
                  if (!get().isPositionOccupied(testX, testY, excludeId)) {
                    return { x: testX, y: testY };
                  }
                }
              }
            }
          }
        }

        // If no free position found, return original target (fallback)
        return { x: gridX, y: gridY };
      },
    }),
    {
      name: "gazi-os-storage",
      partialize: (state) => ({
        isDarkMode: state.isDarkMode,
        currentWallpaper: state.currentWallpaper,
        hasBooted: state.hasBooted,
        iconPositions: state.iconPositions,
      }),
    }
  )
);

