export interface AppDefinition {
  id: string;
  name: string;
  icon: string;
  description?: string;
  showOnDesktop: boolean;
  showInStartMenu: boolean;
  category: "system" | "productivity" | "development" | "utilities";
}

export const APPS: AppDefinition[] = [
  {
    id: "file-explorer",
    name: "File Explorer",
    icon: "folder",
    description: "Browse projects and files",
    showOnDesktop: true,
    showInStartMenu: true,
    category: "system",
  },
  {
    id: "vscode",
    name: "VS Code",
    icon: "code",
    description: "View code projects",
    showOnDesktop: true,
    showInStartMenu: true,
    category: "development",
  },
  {
    id: "cad-viewer",
    name: "3D Viewer",
    icon: "box",
    description: "View CAD models",
    showOnDesktop: true,
    showInStartMenu: true,
    category: "development",
  },
  {
    id: "notepad",
    name: "Notepad",
    icon: "file-text",
    description: "View resume",
    showOnDesktop: true,
    showInStartMenu: true,
    category: "productivity",
  },
  {
    id: "terminal",
    name: "Terminal",
    icon: "terminal",
    description: "Command line interface",
    showOnDesktop: true,
    showInStartMenu: true,
    category: "development",
  },
  {
    id: "browser",
    name: "Edge",
    icon: "globe",
    description: "Browse projects",
    showOnDesktop: true,
    showInStartMenu: true,
    category: "productivity",
  },
  {
    id: "settings",
    name: "Settings",
    icon: "settings",
    description: "System settings",
    showOnDesktop: true,
    showInStartMenu: true,
    category: "system",
  },
];

export const getApp = (id: string): AppDefinition | undefined => {
  return APPS.find((app) => app.id === id);
};

export const getDesktopApps = (): AppDefinition[] => {
  return APPS.filter((app) => app.showOnDesktop);
};

export const getStartMenuApps = (): AppDefinition[] => {
  return APPS.filter((app) => app.showInStartMenu);
};

export const getAppsByCategory = (category: AppDefinition["category"]): AppDefinition[] => {
  return APPS.filter((app) => app.category === category);
};

