---
name: Desktop Enhancement Suite
overview: "Comprehensive desktop upgrade including: (1) CAD Projects folder with file type associations, (2) Code Projects folder fetching real GitHub repos, (3) Drag-and-drop file upload from real PC, (4) Fix desktop icon dragging/double-click bugs and implement grid row wrapping."
todos:
  - id: fix-icon-drag
    content: Fix DesktopIcon drag detection blocking double-click
    status: completed
  - id: fix-icon-grid
    content: Implement grid layout with row wrapping for desktop icons
    status: completed
  - id: add-cad-structure
    content: Add CAD Projects folder structure to constants.ts
    status: completed
  - id: add-cad-icon
    content: Add CAD Projects folder desktop icon
    status: completed
  - id: enhance-file-explorer
    content: Update FileExplorer to handle file types and open apps
    status: completed
  - id: update-app-props
    content: Update Notepad/CADViewer/PDFViewer to accept file props
    status: completed
  - id: add-github-fetch
    content: Add GitHub API fetch for Code Projects folder
    status: completed
  - id: add-drag-drop
    content: Implement drag-drop file upload from real PC
    status: completed
  - id: update-store
    content: Add uploadedFiles state to useOSStore
    status: completed
---

# Desktop Enhancement Suite

## Overview

Comprehensive desktop upgrade including four major features:

1. CAD Projects folder with 3D models, text, and PDF files
2. Code Projects folder fetching real GitHub repositories
3. Drag-and-drop file upload from real PC into GaziOS
4. Fix desktop icon bugs and implement proper grid layout with row wrapping

---

## Part 1: CAD Projects Folder

### Files to Modify

**[`src/lib/constants.ts`](src/lib/constants.ts)** - Add CAD Projects structure:

```typescript
// Add to FILE_SYSTEM under C:/Users/Gazi/Desktop/
"CAD Projects": {
  name: "CAD Projects",
  type: "folder",
  children: {
    "Gearbox Assembly": {
      children: {
        "gearbox.glb": { type: "file", fileType: "glb", modelPath: "/models/gearbox.glb" },
        "details.txt": { type: "file", fileType: "txt", content: "..." },
        "drawing.pdf": { type: "file", fileType: "pdf", pdfPath: "/pdfs/gearbox.pdf" }
      }
    },
    // 4-5 more projects: Heat Exchanger, Bracket, Hydraulic Cylinder, Conveyor
  }
}
```

**[`src/lib/appRegistry.ts`](src/lib/appRegistry.ts)** - Add CAD Projects desktop folder:

```typescript
{
  id: "cad-projects-folder",
  name: "CAD Projects",
  icon: "folder",
  showOnDesktop: true,
  category: "system",
  folderPath: ["C:", "Users", "Gazi", "Desktop", "CAD Projects"]
}
```

**[`src/components/apps/FileExplorer.tsx`](src/components/apps/FileExplorer.tsx)** - Enhance double-click:

```typescript
// Update handleItemDoubleClick to detect file extensions
case 'glb': case 'gltf':
  openWindow("cad-viewer", name, "box", { modelPath: node.modelPath });
  break;
case 'txt':
  openWindow("notepad", name, "file-text", { content: node.content });
  break;
case 'pdf':
  openWindow("pdf-viewer", name, "file-text", { pdfPath: node.pdfPath });
  break;
```

---

## Part 2: GitHub Code Projects Integration

### Files to Modify

**[`src/lib/constants.ts`](src/lib/constants.ts)** - Add Code Projects structure (placeholder):

```typescript
"Code Projects": {
  name: "Code Projects", 
  type: "folder",
  children: {} // Will be populated from GitHub API
}
```

**[`src/components/apps/FileExplorer.tsx`](src/components/apps/FileExplorer.tsx)** - Add GitHub fetch:

```typescript
// Fetch GitHub repos when opening Code Projects folder
useEffect(() => {
  if (currentPath.join('/') === 'C:/Users/Gazi/Desktop/Code Projects') {
    fetch('https://api.github.com/users/gazi-faysal-jubayer/repos?sort=updated&per_page=10')
      .then(res => res.json())
      .then(repos => setGitHubRepos(repos));
  }
}, [currentPath]);
```

**Opening repos in VS Code Lite**:

- Double-click repo folder opens VS Code with repo info
- Show README.md content if available

---

## Part 3: Drag-and-Drop File Upload

### Files to Modify

**[`src/components/os/Desktop.tsx`](src/components/os/Desktop.tsx)** - Add drop zone:

```typescript
const handleDrop = useCallback((e: React.DragEvent) => {
  e.preventDefault();
  const files = Array.from(e.dataTransfer.files);
  // Process dropped files - store in memory/state
  files.forEach(file => {
    addFileToSystem(currentDropPath, {
      name: file.name,
      type: "file",
      fileType: file.name.split('.').pop(),
      blob: file // Store file blob for viewing
    });
  });
}, []);

<div onDragOver={handleDragOver} onDrop={handleDrop}>
```

**[`src/store/useOSStore.ts`](src/store/useOSStore.ts)** - Add file upload state:

```typescript
uploadedFiles: Record<string, File>;
addUploadedFile: (path: string, file: File) => void;
```

**[`src/components/apps/FileExplorer.tsx`](src/components/apps/FileExplorer.tsx)** - Support drag-drop into folders:

- Show drop indicator when dragging over folders
- Merge uploaded files with FILE_SYSTEM data

---

## Part 4: Fix Desktop Icon Bugs

### Issue 1: Icons not dragging/opening properly

**[`src/components/os/DesktopIcon.tsx`](src/components/os/DesktopIcon.tsx)** - Current issues:

1. `isDragging` state blocks double-click incorrectly
2. Position calculation uses vertical stack instead of grid

**Fix**:

```typescript
// Use distance-based drag detection instead of boolean
const [dragDistance, setDragDistance] = useState(0);

const handleDrag = (_e: DraggableEvent, data: DraggableData) => {
  setDragDistance(prev => prev + Math.abs(data.deltaX) + Math.abs(data.deltaY));
};

const handleDoubleClick = useCallback(() => {
  // Only prevent if actually dragged more than threshold
  if (dragDistance < 5) {
    openWindow(app.id, app.name, app.icon);
  }
  setDragDistance(0);
}, [dragDistance, app, openWindow]);
```

### Issue 2: Icons should wrap to rows (grid layout)

**[`src/components/os/Desktop.tsx`](src/components/os/Desktop.tsx)** - Calculate grid positions:

```typescript
const ICON_WIDTH = 90;
const ICON_HEIGHT = 100;
const PADDING = 16;
const TASKBAR_HEIGHT = 48;

const calculateDefaultPosition = (index: number) => {
  const containerHeight = window.innerHeight - TASKBAR_HEIGHT - PADDING * 2;
  const iconsPerColumn = Math.floor(containerHeight / ICON_HEIGHT);
  
  const column = Math.floor(index / iconsPerColumn);
  const row = index % iconsPerColumn;
  
  return {
    x: column * ICON_WIDTH + PADDING,
    y: row * ICON_HEIGHT + PADDING
  };
};
```

---

## Files Summary

| File | Changes |

|------|---------|

| [`src/lib/constants.ts`](src/lib/constants.ts) | Add CAD Projects and Code Projects folder structures |

| [`src/lib/appRegistry.ts`](src/lib/appRegistry.ts) | Add folder desktop icons |

| [`src/components/apps/FileExplorer.tsx`](src/components/apps/FileExplorer.tsx) | File type handling, GitHub fetch, drag-drop support |

| [`src/components/os/Desktop.tsx`](src/components/os/Desktop.tsx) | Drop zone, grid position calculator |

| [`src/components/os/DesktopIcon.tsx`](src/components/os/DesktopIcon.tsx) | Fix drag/click detection, use grid positions |

| [`src/store/useOSStore.ts`](src/store/useOSStore.ts) | Add uploaded files state, window props |

| [`src/components/apps/Notepad.tsx`](src/components/apps/Notepad.tsx) | Accept content prop for .txt files |

| [`src/components/apps/CADViewer.tsx`](src/components/apps/CADViewer.tsx) | Accept modelPath prop |

| [`src/components/apps/PDFViewer.tsx`](src/components/apps/PDFViewer.tsx) | Accept pdfPath prop |

---

## Implementation Order

1. Fix desktop icon bugs first (Part 4) - enables testing other features
2. Add CAD Projects folder structure (Part 1)
3. Add GitHub integration (Part 2)
4. Add drag-drop upload (Part 3)