import { Path, Shape } from "three";

const TAU = Math.PI * 2;
// Tooth spans 0 → 0.65 of a pitch step at the root; these are its centre and the gap centre.
const TOOTH_CENTER = 0.325;
const GAP_CENTER = 0.825;

/** Spur gear outline with trapezoid teeth. Module m → pitch radius m·z/2. */
export function gearShape(z: number, m: number, bore = 0.28) {
  const r = (m * z) / 2;
  const ra = r + m;
  const rf = r - 1.25 * m;
  const s = TAU / z;
  const at = (rad: number, a: number) =>
    [rad * Math.cos(a), rad * Math.sin(a)] as const;

  const shape = new Shape();
  for (let i = 0; i < z; i++) {
    const t = i * s;
    const pts = [
      at(rf, t),
      at(ra, t + 0.2 * s),
      at(ra, t + 0.45 * s),
      at(rf, t + 0.65 * s),
    ];
    pts.forEach(([x, y], j) =>
      i === 0 && j === 0 ? shape.moveTo(x, y) : shape.lineTo(x, y)
    );
    shape.absarc(0, 0, rf, t + 0.65 * s, t + s, false);
  }
  shape.closePath();

  const boreR = r * bore;
  const hole = new Path();
  hole.absarc(0, 0, boreR, 0, TAU, true);
  shape.holes.push(hole);

  // Lightening holes on the bigger gears — reads as a machined part.
  if (z >= 18) {
    const ring = (boreR + rf) / 2;
    const holeR = (rf - boreR) * 0.28;
    for (let i = 0; i < 5; i++) {
      const [x, y] = at(ring, (i / 5) * TAU);
      const h = new Path();
      h.absarc(x, y, holeR, 0, TAU, true);
      shape.holes.push(h);
    }
  }

  return shape;
}

export type MeshedGear = {
  z: number;
  x: number;
  y: number;
  /** rotation(A) = base + ratio · A, where A is the driver gear's angle */
  base: number;
  ratio: number;
};

/**
 * Lays out a gear train: each gear meshes with the previous one, placed at
 * angle `dir` from it, and phased so a tooth sits in the opposite gap.
 */
export function meshGears(
  specs: readonly { z: number; dir?: number }[],
  m: number
): MeshedGear[] {
  const out: MeshedGear[] = [];
  specs.forEach(({ z, dir = 0 }, k) => {
    if (k === 0) {
      out.push({ z, x: 0, y: 0, base: 0, ratio: 1 });
      return;
    }
    const p = out[k - 1];
    const sp = TAU / p.z;
    const s = TAU / z;
    const d = (m * (p.z + z)) / 2;
    const ratio = (-p.ratio * p.z) / z;
    // Driver angle at which the previous gear has a tooth centred on `dir`.
    const a = (dir - p.base - TOOTH_CENTER * sp) / p.ratio;
    out.push({
      z,
      x: p.x + d * Math.cos(dir),
      y: p.y + d * Math.sin(dir),
      ratio,
      base: dir + Math.PI - GAP_CENTER * s - ratio * a,
    });
  });
  return out;
}

export const GEAR_PHASE = { TOOTH_CENTER, GAP_CENTER };
