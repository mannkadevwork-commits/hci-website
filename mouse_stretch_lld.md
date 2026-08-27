# Mouse Stretch Feature
## Low Level Design (LLD)

---

### 1. Overview

The Mouse Stretch feature provides in-viewport interactive scaling of 3D models. Users manipulate assets by dragging overlaid UI handles along specific axes, which translates to physical dimensional changes in the 3D scene. 

### 2. Objective

The objective is to implement a performant, single-axis 3D manipulation tool operating at 60 FPS without triggering full DOM re-renders during high-frequency pointer movements.

The feature is currently under development. The existing codebase already contains the required architectural foundation and mathematical utilities. This document describes the proposed implementation using the current architecture.

### 3. Scope

*   **Current System:**
    *   3D bounding box extents calculation.
    *   3D-to-2D screen coordinate projection mapping.
    *   Ray-plane intersection math for pointer tracking.
    *   Direct scene graph mutation for instant WebGL updates.
*   **Proposed Implementation:**
    *   Binding calculation loops to the active UI state for continuous stretching.
    *   Flushing final coordinates to the backend database upon mouse release.
*   **Out of Scope:**
    *   Parametric scaling of native structural IFC components (e.g., pulling a wall's edge directly)[cite: 1, 3].

---

### 4. Existing System Architecture

```mermaid
flowchart TD
    User([User]) --> BIMViewer

    subgraph React Layer
        BIMViewer
    end

    subgraph Hook Layer
        useBIMEngine
        useStretchHandles
        useProjectSync
    end

    subgraph 3D Engine
        xeokitViewer[(xeokit Viewer)]
    end

    subgraph Persistence Layer
        ProjectState[(Project State)]
    end

    BIMViewer --> useBIMEngine
    BIMViewer --> useStretchHandles
    BIMViewer --> useProjectSync

    useBIMEngine --> xeokitViewer
    useStretchHandles --> xeokitViewer
    
    useProjectSync --> ProjectState
    useProjectSync --> useBIMEngine