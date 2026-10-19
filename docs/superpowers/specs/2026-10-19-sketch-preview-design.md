# Sketch Preview Page Design

## Goal

Add `index-2.html` as a separate browser page for viewing the drawing in `sketch.js`, without changing the existing snake-game page.

## Design

The new page will load the repository's local `libraries/p5.min.js` first, then `sketch.js`, so p5.js provides the drawing API used by the sketch. It will reuse `style.css` for the existing canvas reset and display styling. The page is static: refreshing it loads the current `sketch.js`; live hot-reloading is out of scope.

## Validation

Check that the scripts are referenced in the correct order and use repository-relative paths. Open the page locally if the available environment allows it and confirm that p5.js runs `setup()` and `draw()` to show the boat sketch.
