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
    name: "G-Net Explorer",
    icon: "globe",
    description: "Search the web",
    showOnDesktop: true,
    showInStartMenu: true,
    category: "productivity",
  },
  {
    id: "pdf-viewer",
    name: "DocuRead",
    icon: "file-text",
    description: "View PDF documents",
    showOnDesktop: true,
    showInStartMenu: true,
    category: "productivity",
  },
  {
    id: "eng-calc",
    name: "Eng Calculator",
    icon: "calculator",
    description: "Engineering calculations",
    showOnDesktop: false,
    showInStartMenu: true,
    category: "utilities",
  },
  {
    id: "media-player",
    name: "G-Media",
    icon: "play",
    description: "Play videos and images",
    showOnDesktop: false,
    showInStartMenu: true,
    category: "productivity",
  },
  {
    id: "quran-app",
    name: "Al-Quran",
    icon: "book",
    description: "Read and listen to Quran",
    showOnDesktop: false,
    showInStartMenu: true,
    category: "utilities",
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
  {
    id: "cad-projects-folder",
    name: "CAD Projects",
    icon: "folder",
    description: "Browse CAD project files",
    showOnDesktop: true,
    showInStartMenu: false,
    category: "system",
  },
  {
    id: "code-projects-folder",
    name: "Code Projects",
    icon: "folder",
    description: "Browse GitHub repositories",
    showOnDesktop: true,
    showInStartMenu: false,
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

