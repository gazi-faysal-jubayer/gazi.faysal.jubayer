---
name: Fix Pointer Events Conflict
overview: Fix the z-index and pointer-events layering issue where the windows container blocks desktop icon interactions. Ensure both desktop icons and windows are fully interactive without conflicts.
todos:
  - id: remove-wrapper
    content: Remove pointer-events-auto wrapper from Desktop.tsx
    status: completed
  - id: update-windowframe
    content: Add pointer-events-auto to Rnd in WindowFrame.tsx
    status: completed
  - id: test-interactions
    content: Test all interactions work correctly
    status: completed
---

# Fix Pointer Events Conflict

## Problem

The windows container has `pointer-events-auto` which blocks all clicks from reaching desktop icons underneath. Removing it breaks window dragging/resizing.

## Root Cause

Two overlapping layers with conflicting pointer-events settings:

- **Desktop icons layer** (z-10) - needs to be clickable
- **Windows layer** (z-30) - needs to be clickable, but blocks everything underneath

## Solution

Apply pointer-events strategically at the component level, not container level.

### Step 1: Update Desktop.tsx

Remove the inner `<div className="pointer-events-auto">` wrapper:

```tsx
{/* Windows container */}
<div className="absolute inset-0 pb-12 z-30 pointer-events-none">
  <AnimatePresence>
    {windows.map((win) => {
      const AppComponent = APP_COMPONENTS[win.appId];
      if (!AppComponent) return null;

      return (
        <WindowFrame key={win.id} window={win}>
          <AppComponent />
        </WindowFrame>
      );
    })}
  </AnimatePresence>
</div>
```

**Why:** This lets clicks pass through empty space to reach desktop icons below.

### Step 2: Update WindowFrame.tsx

Ensure the Rnd component has `pointer-events-auto` applied:

```tsx
<Rnd
  // ... existing props
  className="pointer-events-auto"  // Add this
  // ... rest of props
>
  {/* window content */}
</Rnd>
```

**Why:** Each individual window captures pointer events, but only within its own bounds.

### Step 3: Verify Desktop Icons

Ensure DesktopIcon wrapper has `pointer-events-auto`:

Already exists at line ~92:

```tsx
<div ref={nodeRef} className="absolute pointer-events-auto z-20">
```

**Why:** Icons explicitly capture pointer events in their layer.

## Expected Result

- ✅ Desktop icons: clickable and draggable
- ✅ Windows: clickable, draggable, and resizable  
- ✅ Empty desktop space: closes menus (from previous fix)
- ✅ No z-index conflicts

## Files to Modify

1. [`src/components/os/Desktop.tsx`](src/components/os/Desktop.tsx) - Remove inner div wrapper
2. [`src/components/os/WindowFrame.tsx`](src/components/os/WindowFrame.tsx) - Add pointer-events-auto to Rnd

## Testing Steps

1. Click desktop icon → should select
2. Double-click desktop icon → should open app
3. Drag desktop icon → should move
4. Click window → should focus
5. Drag window title bar → should move window
6. Resize window edges → should resize
7. Click empty desktop → should close start menu