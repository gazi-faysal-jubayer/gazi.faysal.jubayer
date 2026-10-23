// Self-check: every adjacent pair stays tooth-in-gap at any driver angle.
// Run: node src/components/three/gear.check.mts
import assert from "node:assert";
import { meshGears, GEAR_PHASE } from "./gear.ts";

const TAU = Math.PI * 2;
const frac = (v: number) => ((v % 1) + 1) % 1;
const specs = [{ z: 26 }, { z: 14, dir: -0.55 }, { z: 20, dir: 0.95 }];
const gears = meshGears(specs, 0.1);

for (const A of [0, 0.37, 1.9, -4.2, 13]) {
  for (let k = 1; k < gears.length; k++) {
    const p = gears[k - 1], g = gears[k], dir = specs[k].dir!;
    // Phase of prev's tooth vs. contact line, and of this gear's gap vs. the opposite direction.
    const f = frac((p.base + p.ratio * A + GEAR_PHASE.TOOTH_CENTER * (TAU / p.z) - dir) / (TAU / p.z));
    const h = frac((g.base + g.ratio * A + GEAR_PHASE.GAP_CENTER * (TAU / g.z) - dir - Math.PI) / (TAU / g.z));
    const err = Math.min(frac(f + h), 1 - frac(f + h));
    assert(err < 1e-9, `pair ${k} slips at A=${A}: ${err}`);
    assert(Math.abs(Math.hypot(g.x - p.x, g.y - p.y) - (0.1 * (p.z + g.z)) / 2) < 1e-9);
  }
}
console.log("gear train meshes ✓");
