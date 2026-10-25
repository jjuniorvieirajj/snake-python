# Sketch Preview Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a separate `index-2.html` page that displays the current `sketch.js` drawing.

**Architecture:** Keep the existing snake-game `index.html` unchanged. The new static page references the local p5.js library before the sketch and reuses the existing stylesheet.

**Tech Stack:** HTML, local p5.js (`libraries/p5.min.js`), `sketch.js`, `style.css`.

## Global Constraints

- Load the repository's local p5.js library before `sketch.js`.
- Keep the existing snake-game page unchanged.
- Refreshing the page loads the current `sketch.js`; live hot-reloading is out of scope.

---

### Task 1: Add the sketch preview page

**Files:**
- Create: `index-2.html`
- Read-only dependencies: `libraries/p5.min.js`, `sketch.js`, `style.css`

**Interfaces:**
- Consumes the global p5.js drawing API supplied by `libraries/p5.min.js`.
- Loads `sketch.js`, which defines global `setup()` and `draw()` functions and creates the canvas.
- Reuses `style.css` for zero-margin page and block canvas styling.

- [ ] **Step 1: Create the standalone HTML document**

Create `index-2.html` with a document title, viewport metadata, a stylesheet reference, and scripts in this order:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Sketch Preview</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <script src="libraries/p5.min.js"></script>
    <script src="sketch.js"></script>
  </body>
</html>
```

- [ ] **Step 2: Verify page references and order**

Confirm that `index-2.html` references the existing `style.css`, loads `libraries/p5.min.js` before `sketch.js`, and leaves `index.html` unchanged.

- [ ] **Step 3: Open the page locally**

Open `index-2.html` in a browser. Confirm the 400-by-400 p5.js canvas displays the sky, sun, water, boat hull, and sail. Refresh after editing `sketch.js` and confirm the updated sketch is displayed.
