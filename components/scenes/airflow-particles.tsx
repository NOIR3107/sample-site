"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * AirflowParticles: the 3D sibling of <Airflow>.
 *
 * Glowing particles travel along one or more curved paths (ducts, coils,
 * vents). Each particle drags a short fading trail made of ghost points, so
 * the stream reads as moving air rather than floating dust.
 *
 *   mode "cycle"    warm amber until `switchAt`, then through white to cyan:
 *                   return air being conditioned into supply air
 *   mode "cool"     cyan (cooling)
 *   mode "warm"     amber (heating)
 *   mode "neutral"  cool white (filtered / fresh air)
 *
 * Paths are baked once into arc-length lookup tables, so per-frame work is a
 * linear interpolation per point, not a spline evaluation. One draw call for
 * the whole stream (THREE.Points with additive blending).
 */

export type StreamMode = "cycle" | "cool" | "warm" | "neutral";

/* Palettes: glowing (additive, for dark backdrops) and ink (normal
   blending, for light pages where additive colour would wash to white). */
const PALETTES = {
  glow: {
    warm: new THREE.Color("#ffa24c"),
    cool: new THREE.Color("#35d6f2"),
    neutral: new THREE.Color("#e6f1fb"),
  },
  ink: {
    warm: new THREE.Color("#e8622b"),
    cool: new THREE.Color("#2b84c6"),
    neutral: new THREE.Color("#8fb3c9"),
  },
};

const LUT_N = 256;

const VERT = /* glsl */ `
  attribute float aAlpha;
  attribute float aSize;
  attribute vec3 aColor;
  uniform float uScale;
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = aSize * uScale / max(0.001, -mv.z);
    vColor = aColor;
    vAlpha = aAlpha;
  }
`;

const FRAG = /* glsl */ `
  uniform float uOpacity;
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    float core = smoothstep(0.5, 0.0, d);
    float a = pow(core, 1.8) * vAlpha * uOpacity;
    if (a < 0.003) discard;
    gl_FragColor = vec4(vColor * (0.75 + core * 0.35), a);
  }
`;

function bake(points: THREE.Vector3[]) {
  const curve = new THREE.CatmullRomCurve3(points, false, "catmullrom", 0.15);
  const spaced = curve.getSpacedPoints(LUT_N - 1);
  const lut = new Float32Array(LUT_N * 3);
  spaced.forEach((p, i) => {
    lut[i * 3] = p.x;
    lut[i * 3 + 1] = p.y;
    lut[i * 3 + 2] = p.z;
  });
  return lut;
}

export function AirflowParticles({
  paths,
  weights,
  count = 400,
  trail = 4,
  gap = 0.012,
  speed = 1,
  size = 0.09,
  spread = 0.22,
  switchAt = 0.5,
  mode = "cycle",
  modeRef,
  intensityRef,
  opacity = 1,
  look = "glow",
}: {
  /** Control points for each path, in model space. */
  paths: THREE.Vector3[][];
  /** Relative chance of a particle taking each path. */
  weights?: number[];
  count?: number;
  /** Ghost points per particle. */
  trail?: number;
  /** Spacing between ghosts, in path fraction. */
  gap?: number;
  speed?: number;
  /** Point size in world units. */
  size?: number;
  /** How far particles scatter across the duct section. */
  spread?: number;
  switchAt?: number;
  mode?: StreamMode;
  /** Live override for mode (e.g. a UI toggle) without re-mounting. */
  modeRef?: { current: StreamMode };
  /** Live 0..1 multiplier, e.g. driven by scroll. */
  intensityRef?: { current: number };
  opacity?: number;
  /** "glow" for dark scenes (additive), "ink" for light pages. */
  look?: "glow" | "ink";
}) {
  const { warm: WARM, cool: COOL, neutral: NEUTRAL } = PALETTES[look];
  const luts = useMemo(() => paths.map(bake), [paths]);

  const state = useMemo(() => {
    const total = weights?.reduce((a, b) => a + b, 0) ?? paths.length;
    const cumulative = (weights ?? paths.map(() => 1)).map(
      (_, i, arr) => arr.slice(0, i + 1).reduce((a, b) => a + b, 0) / total,
    );
    const pick = () => {
      const r = Math.random();
      const i = cumulative.findIndex((c) => r <= c);
      return i < 0 ? 0 : i;
    };

    const n = count;
    const t = new Float32Array(n);
    const spd = new Float32Array(n);
    const path = new Uint8Array(n);
    const off = new Float32Array(n * 3);
    const phase = new Float32Array(n);
    const scale = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      t[i] = Math.random();
      spd[i] = 0.06 + Math.random() * 0.05;
      path[i] = pick();
      // Random point in a disc across the duct, biased toward the centre.
      const a = Math.random() * Math.PI * 2;
      const r = Math.sqrt(Math.random());
      off[i * 3] = Math.cos(a) * r;
      off[i * 3 + 1] = Math.sin(a) * r;
      off[i * 3 + 2] = (Math.random() - 0.5) * 2;
      phase[i] = Math.random() * Math.PI * 2;
      scale[i] = 0.6 + Math.random() * 0.8;
    }
    return { t, spd, path, off, phase, scale, pick };
  }, [count, paths, weights]);

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const m = count * trail;
    g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(m * 3), 3));
    g.setAttribute("aColor", new THREE.BufferAttribute(new Float32Array(m * 3), 3));
    g.setAttribute("aAlpha", new THREE.BufferAttribute(new Float32Array(m), 1));
    g.setAttribute("aSize", new THREE.BufferAttribute(new Float32Array(m), 1));
    return g;
  }, [count, trail]);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: VERT,
        fragmentShader: FRAG,
        uniforms: { uScale: { value: 400 }, uOpacity: { value: opacity } },
        transparent: true,
        depthWrite: false,
        blending: look === "glow" ? THREE.AdditiveBlending : THREE.NormalBlending,
      }),
    // Opacity is updated per frame; the material itself is created once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const tint = useRef(new THREE.Color().copy(PALETTES[look].neutral));
  const scratch = useMemo(() => new THREE.Color(), []);
  const wobble = useRef({ amp: 0, px: 0, py: 0 });

  useFrame((frame, delta) => {
    const dt = Math.min(delta, 0.05);
    const time = frame.clock.elapsedTime;
    const activeMode = modeRef?.current ?? mode;
    const intensity = intensityRef?.current ?? 1;

    // Pointer speed stirs the air a little.
    const w = wobble.current;
    const pv = Math.hypot(frame.pointer.x - w.px, frame.pointer.y - w.py);
    w.px = frame.pointer.x;
    w.py = frame.pointer.y;
    w.amp += (Math.min(pv * 8, 1) - w.amp) * 0.08;

    // Size projection: world units to device pixels at distance 1.
    const cam = frame.camera as THREE.PerspectiveCamera;
    const fov = ((cam.fov ?? 35) * Math.PI) / 180;
    material.uniforms.uScale.value =
      (frame.size.height * frame.viewport.dpr * 0.5) / Math.tan(fov / 2);
    material.uniforms.uOpacity.value = opacity * (0.35 + 0.65 * intensity);

    if (activeMode !== "cycle") {
      const target = activeMode === "warm" ? WARM : activeMode === "cool" ? COOL : NEUTRAL;
      tint.current.lerp(target, 0.06);
    }

    const pos = geometry.attributes.position.array as Float32Array;
    const col = geometry.attributes.aColor.array as Float32Array;
    const alp = geometry.attributes.aAlpha.array as Float32Array;
    const siz = geometry.attributes.aSize.array as Float32Array;
    const { t, spd, path, off, phase, scale, pick } = state;
    const lo = switchAt - 0.07;
    const hi = switchAt + 0.07;

    for (let i = 0; i < count; i++) {
      t[i] += spd[i] * dt * speed;
      if (t[i] >= 1) {
        t[i] -= 1;
        path[i] = pick();
      }
      const lut = luts[path[i]];
      const jitter = spread * (1 + w.amp * 0.8);

      for (let k = 0; k < trail; k++) {
        const j = i * trail + k;
        const tk = t[i] - k * gap;
        if (tk < 0) {
          alp[j] = 0;
          continue;
        }
        const f = tk * (LUT_N - 1);
        const i0 = Math.min(LUT_N - 2, Math.floor(f));
        const fr = f - i0;
        const a = i0 * 3;
        const b = a + 3;
        const sway = Math.sin(time * 1.6 + phase[i] + tk * 9) * 0.25;
        pos[j * 3] = lut[a] + (lut[b] - lut[a]) * fr + off[i * 3 + 2] * jitter * 0.15;
        pos[j * 3 + 1] = lut[a + 1] + (lut[b + 1] - lut[a + 1]) * fr + (off[i * 3] + sway * 0.3) * jitter;
        pos[j * 3 + 2] = lut[a + 2] + (lut[b + 2] - lut[a + 2]) * fr + off[i * 3 + 1] * jitter;

        let c: THREE.Color;
        if (activeMode === "cycle") {
          if (tk <= lo) c = WARM;
          else if (tk >= hi) c = COOL;
          else {
            const m = (tk - lo) / (hi - lo);
            c = m < 0.5
              ? scratch.copy(WARM).lerp(NEUTRAL, m * 2)
              : scratch.copy(NEUTRAL).lerp(COOL, (m - 0.5) * 2);
          }
        } else {
          c = tint.current;
        }
        col[j * 3] = c.r;
        col[j * 3 + 1] = c.g;
        col[j * 3 + 2] = c.b;

        const edge = Math.min(1, tk * 12, (1 - tk) * 10);
        const fade = Math.pow(1 - k / trail, 1.6);
        alp[j] = Math.max(0, edge) * fade;
        siz[j] = size * scale[i] * (1 - (k / trail) * 0.45);
      }
    }

    geometry.attributes.position.needsUpdate = true;
    geometry.attributes.aColor.needsUpdate = true;
    geometry.attributes.aAlpha.needsUpdate = true;
    geometry.attributes.aSize.needsUpdate = true;
  });

  return <points geometry={geometry} material={material} frustumCulled={false} />;
}
