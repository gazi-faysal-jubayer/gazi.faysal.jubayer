// Triply periodic minimal surfaces, sliced into per-layer contours like a slicer's infill.

export type Field = (x: number, y: number, z: number) => number;

/** Schwarz Primitive (P) */
export const schwarzP: Field = (x, y, z) => Math.cos(x) + Math.cos(y) + Math.cos(z);

/** Schoen I-WP */
export const schoenIWP: Field = (x, y, z) => {
  const cx = Math.cos(x);
  const cy = Math.cos(y);
  const cz = Math.cos(z);
  return (
    2 * (cx * cy + cy * cz + cz * cx) -
    (Math.cos(2 * x) + Math.cos(2 * y) + Math.cos(2 * z))
  );
};

export type ContourOptions = { layers?: number; grid?: number; periods?: number };

/**
 * Marching squares on each Z layer of fn = 0. Positions are normalised to
 * [-1, 1]³ with layers stacked along +Y (print direction). `layerEnd[l]` is the
 * vertex count after layer l, for revealing the print layer by layer.
 */
export function contourLayers(
  fn: Field,
  { layers = 28, grid = 40, periods = 2 }: ContourOptions = {}
) {
  const span = periods * Math.PI * 2;
  const n = grid + 1;
  const v = new Float64Array(n * n);
  const out: number[] = [];
  const layerEnd = new Int32Array(layers);
  const norm = (g: number) => -1 + (2 * g) / grid;

  for (let l = 0; l < layers; l++) {
    const zn = layers === 1 ? 0.5 : l / (layers - 1);
    const z = zn * span;
    const Y = -1 + 2 * zn;

    for (let j = 0; j < n; j++)
      for (let i = 0; i < n; i++) v[j * n + i] = fn((i / grid) * span, (j / grid) * span, z);

    for (let j = 0; j < grid; j++) {
      for (let i = 0; i < grid; i++) {
        const a = v[j * n + i];
        const b = v[j * n + i + 1];
        const c = v[(j + 1) * n + i + 1];
        const d = v[(j + 1) * n + i];
        const pts: number[] = [];
        // Walk the cell edges in order: bottom, right, top, left.
        const cross = (p: number, q: number, x0: number, y0: number, x1: number, y1: number) => {
          if (p < 0 !== q < 0) {
            const t = p / (p - q);
            pts.push(x0 + (x1 - x0) * t, y0 + (y1 - y0) * t);
          }
        };
        cross(a, b, i, j, i + 1, j);
        cross(b, c, i + 1, j, i + 1, j + 1);
        cross(c, d, i + 1, j + 1, i, j + 1);
        cross(d, a, i, j + 1, i, j);
        // 2 crossings → one segment; 4 (saddle) → two segments.
        for (let k = 0; k + 3 < pts.length; k += 4) {
          out.push(norm(pts[k]), Y, norm(pts[k + 1]), norm(pts[k + 2]), Y, norm(pts[k + 3]));
        }
      }
    }
    layerEnd[l] = out.length / 3;
  }

  return { positions: new Float32Array(out), layerEnd, span };
}
