---
name: Fix PDF Viewer and Add Resume
overview: Fix the PDFViewer to accept dynamic PDF paths from File Explorer, update constants to include the resume PDF path, and add a Resume shortcut to the desktop.
todos:
  - id: fix-file-explorer
    content: Update FileExplorer to store pdfPath in sessionStorage
    status: completed
  - id: fix-pdf-viewer
    content: Update PDFViewer to read path from sessionStorage
    status: completed
  - id: add-pdf-path-constant
    content: Add pdfPath to Resume.pdf in constants.ts
    status: completed
  - id: add-resume-desktop
    content: Add Resume desktop icon to appRegistry
    status: completed
  - id: handle-resume-icon
    content: Add double-click handler for Resume icon in DesktopIcon
    status: completed
---

# Fix PDF Viewer Error and Add Resume to Desktop

## Problem

PDFViewer component is hardcoded to load `/resume.pdf` and doesn't receive the `pdfPath` from File Explorer, causing a runtime error when opening PDF files.

## Solution

### 1. Update FileExplorer to Pass PDF Path

**File**: [`src/components/apps/FileExplorer.tsx`](src/components/apps/FileExplorer.tsx) (line ~208)

Store the PDF path in sessionStorage before opening PDFViewer:

```typescript
case "pdf":
  // Open in PDF Viewer with path
  if (node.pdfPath) {
    sessionStorage.setItem("pdf-viewer-path", node.pdfPath);
    sessionStorage.setItem("pdf-viewer-filename", name);
  }
  openWindow("pdf-viewer", `DocuRead - ${name}`, "file-text");
  break;
```

### 2. Update PDFViewer to Read Dynamic Path

**File**: [`src/components/apps/PDFViewer.tsx`](src/components/apps/PDFViewer.tsx) (line ~24)

Change from hardcoded path to sessionStorage read with fallback:

```typescript
const [pdfUrl, setPdfUrl] = useState<string>("/resume.pdf");
const [filename, setFilename] = useState<string>("resume.pdf");

useEffect(() => {
  const storedPath = sessionStorage.getItem("pdf-viewer-path");
  const storedFilename = sessionStorage.getItem("pdf-viewer-filename");
  
  if (storedPath) {
    setPdfUrl(storedPath);
    sessionStorage.removeItem("pdf-viewer-path");
  }
  
  if (storedFilename) {
    setFilename(storedFilename);
    sessionStorage.removeItem("pdf-viewer-filename");
  }
}, []);
```

Also update the download function to use dynamic filename.

### 3. Add pdfPath to Resume.pdf in Constants

**File**: [`src/lib/constants.ts`](src/lib/constants.ts) (line ~648)

```typescript
"Resume.pdf": {
  name: "Resume.pdf",
  type: "file",
  fileType: "pdf",
  pdfPath: "/resume.pdf",  // Add this
},
```

### 4. Add Resume to Desktop

**File**: [`src/lib/appRegistry.ts`](src/lib/appRegistry.ts)

Add a new desktop shortcut for Resume:

```typescript
{
  id: "resume-file",
  name: "Resume",
  icon: "file-text",
  description: "View my resume",
  showOnDesktop: true,
  showInStartMenu: false,
  category: "productivity",
},
```

**File**: [`src/components/os/DesktopIcon.tsx`](src/components/os/DesktopIcon.tsx)

Add special handling for "resume-file" to open PDFViewer directly with the resume path (similar to how CAD Projects and Code Projects folders are handled).

## Files to Modify

1. [`src/components/apps/FileExplorer.tsx`](src/components/apps/FileExplorer.tsx) - Add sessionStorage for pdfPath
2. [`src/components/apps/PDFViewer.tsx`](src/components/apps/PDFViewer.tsx) - Read from sessionStorage
3. [`src/lib/constants.ts`](src/lib/constants.ts) - Add pdfPath to Resume.pdf
4. [`src/lib/appRegistry.ts`](src/lib/appRegistry.ts) - Add Resume desktop icon
5. [`src/components/os/DesktopIcon.tsx`](src/components/os/DesktopIcon.tsx) - Handle Resume icon double-click