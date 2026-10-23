// Self-check: contour vertices lie on each surface's zero level, layer counts are monotonic.
// Run: node src/components/three/tpms.check.mts
import assert from "node:assert";
import { contourLayers, schoenIWP, schwarzP } from "./tpms.ts";

for (const [name, fn, tol] of [
  ["schwarzP", schwarzP, 0.1],
  ["schoenIWP", schoenIWP, 0.4],
] as const) {
  const { positions, layerEnd, span } = contourLayers(fn, { layers: 12, grid: 36, periods: 2 });
  assert(positions.length > 0 && positions.length % 6 === 0, `${name}: no segments`);
  assert.strictEqual(layerEnd[layerEnd.length - 1], positions.length / 3);
  for (let l = 1; l < layerEnd.length; l++) assert(layerEnd[l] >= layerEnd[l - 1]);

  const back = (u: number) => ((u + 1) / 2) * span;
  let worst = 0;
  for (let i = 0; i < positions.length; i += 3) {
    const [X, Y, Z] = [positions[i], positions[i + 1], positions[i + 2]];
    assert(Math.abs(X) <= 1 && Math.abs(Y) <= 1 && Math.abs(Z) <= 1, `${name}: out of bounds`);
    worst = Math.max(worst, Math.abs(fn(back(X), back(Z), back(Y))));
  }
  assert(worst < tol, `${name}: vertex off surface by ${worst}`);
  console.log(`${name}: ${positions.length / 6} segments, max |f| = ${worst.toFixed(3)} ✓`);
}
