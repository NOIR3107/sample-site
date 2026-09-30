"use client";

import { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Triangle } from "ogl";

/**
 * Topography, from React Bits, adapted.
 *
 * Kept: the contour-field shader, the bezier control-point morphing, and the
 * IntersectionObserver plus `visibilitychange` gating, which was already
 * sensible in the original.
 *
 * Changed:
 * - Colours are design tokens. The shipped defaults are `#5227FF` purple,
 *   `#FF9FFC` pink and pure `#FFFFFF`, all three of which this brief bans.
 *   Contours now run line grey through muted to copper at the ridges.
 * - `prefers-reduced-motion` renders nothing. The original has no handling.
 * - Mouse interaction is disabled on coarse pointers, where it cannot fire
 *   and only costs listeners.
 * - Grain defaults off: it is film-grain decoration over a site that has none.
 * - DPR capped at 1.5 rather than 2.
 * - The prop-sync effect is dropped. These values never change at runtime
 *   here, so the second effect and its twenty-two dependencies are dead code.
 */

const hexToRgb = (hex: string): [number, number, number] => {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!m) return [1, 1, 1];
  return [
    parseInt(m[1], 16) / 255,
    parseInt(m[2], 16) / 255,
    parseInt(m[3], 16) / 255,
  ];
};

const VERT = `#version 300 es
in vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }
`;

const FRAG = `#version 300 es
precision highp float;
uniform vec2 iResolution;
uniform float uMorphAmount, uBands, uThickness, uScale, uGlow;
uniform float uContrast, uBrightness, uOpacity;
uniform vec3 uLow, uMid, uHigh;
uniform vec2 uMouse;
uniform float uMouseEnabled, uMouseRadius, uMouseStrength, uMouseActive;
uniform vec4 uCtrlA, uCtrlB, uCtrlC, uCtrlD;
out vec4 fragColor;

float bez(float t, vec4 c) {
  float w = 6.2831853 * t;
  return 0.5 * (c.x * sin(w) + c.y * cos(w) + c.z * sin(2.0 * w) + c.w * cos(2.0 * w));
}

float field(vec2 uv) {
  vec2 a = vec2(bez(uv.x, uCtrlA), bez(uv.x, uCtrlB));
  vec2 b = vec2(bez(uv.y, uCtrlC), bez(uv.y, uCtrlD));
  return distance(a, b);
}

vec3 elevationColor(float e) {
  vec3 c = mix(uLow, uMid, smoothstep(0.0, 0.5, e));
  return mix(c, uHigh, smoothstep(0.5, 1.0, e));
}

void main() {
  vec2 res = iResolution.xy;
  vec2 uv = gl_FragCoord.xy / res;
  vec2 suv = (uv - 0.5) / max(uScale, 0.001) + 0.5;

  float fv = field(suv);

  if (uMouseEnabled > 0.5) {
    vec2 d = uv - uMouse;
    d.x *= res.x / max(res.y, 1.0);
    float r = max(uMouseRadius, 0.001);
    fv += exp(-dot(d, d) / (r * r)) * uMouseStrength * uMouseActive;
  }

  float f = fv * uBands;
  float frac = fract(f);
  float lineDist = min(frac, 1.0 - frac);

  float aa = fwidth(f) + 0.0001;
  float mask = 1.0 - smoothstep(uThickness - aa, uThickness + aa, lineDist);
  float glowR = uThickness + uGlow * 0.5 + aa;
  float glow = (1.0 - smoothstep(uThickness, glowR, lineDist)) * step(0.0001, uGlow);

  float elev = clamp(fv / (uMorphAmount * 2.5 + 0.001), 0.0, 1.0);
  vec3 lineCol = elevationColor(elev);

  float coverage = clamp(mask + glow * 0.55, 0.0, 1.0);
  coverage = pow(coverage, max(uContrast, 0.001));

  vec3 outColor = clamp(lineCol * uBrightness, 0.0, 1.0);
  float a = clamp(coverage, 0.0, 1.0) * uOpacity;
  fragColor = vec4(outColor * a, a);
}
`;

const CTRL_INDICES = [
  [1, -2, 3, -4],
  [9, -8, 7, -6],
  [5, 2, 5, -5],
  [-1, -3, 8, 9],
];

export function Topography({
  /** Line grey, through muted, to copper at the ridges. */
  lowColor = "#1F262C",
  midColor = "#5C666E",
  highColor = "#B4643C",
  speed = 0.18,
  morphAmount = 2.4,
  morphSpeed = 0.05,
  bands = 3.0,
  thickness = 0.006,
  scale = 1.15,
  glow = 0.16,
  contrast = 2.4,
  brightness = 0.95,
  opacity = 1.0,
  mouseRadius = 0.3,
  mouseStrength = 0.4,
}: {
  lowColor?: string;
  midColor?: string;
  highColor?: string;
  speed?: number;
  morphAmount?: number;
  morphSpeed?: number;
  bands?: number;
  thickness?: number;
  scale?: number;
  glow?: number;
  contrast?: number;
  brightness?: number;
  opacity?: number;
  mouseRadius?: number;
  mouseStrength?: number;
}) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Pointer-driven elevation is meaningless without a hovering pointer.
    const wantsMouse = window.matchMedia("(pointer: fine)").matches;

    let renderer: Renderer;
    try {
      renderer = new Renderer({
        webgl: 2,
        alpha: true,
        premultipliedAlpha: true,
        antialias: false,
        dpr: Math.min(window.devicePixelRatio || 1, 1.5),
      });
    } catch {
      return;
    }

    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    const canvas = gl.canvas;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    host.appendChild(canvas);

    const program = new Program(gl, {
      vertex: VERT,
      fragment: FRAG,
      uniforms: {
        iResolution: { value: new Float32Array([1, 1]) },
        uMorphAmount: { value: morphAmount },
        uBands: { value: bands },
        uThickness: { value: thickness },
        uScale: { value: scale },
        uGlow: { value: glow },
        uContrast: { value: contrast },
        uBrightness: { value: brightness },
        uOpacity: { value: opacity },
        uLow: { value: new Float32Array(hexToRgb(lowColor)) },
        uMid: { value: new Float32Array(hexToRgb(midColor)) },
        uHigh: { value: new Float32Array(hexToRgb(highColor)) },
        uMouse: { value: new Float32Array([0.5, 0.5]) },
        uMouseEnabled: { value: wantsMouse ? 1 : 0 },
        uMouseRadius: { value: mouseRadius },
        uMouseStrength: { value: mouseStrength },
        uMouseActive: { value: 0 },
        uCtrlA: { value: new Float32Array(4) },
        uCtrlB: { value: new Float32Array(4) },
        uCtrlC: { value: new Float32Array(4) },
        uCtrlD: { value: new Float32Array(4) },
      },
    });

    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });

    const setSize = () => {
      const rect = host.getBoundingClientRect();
      renderer.setSize(
        Math.max(1, Math.floor(rect.width)),
        Math.max(1, Math.floor(rect.height)),
      );
      const res = program.uniforms.iResolution.value;
      res[0] = gl.drawingBufferWidth;
      res[1] = gl.drawingBufferHeight;
      renderer.render({ scene: mesh });
    };
    const ro = new ResizeObserver(setSize);
    ro.observe(host);
    setSize();

    const cur = [0.5, 0.5];
    const tgt = [0.5, 0.5];
    let active = 0;
    let activeTarget = 0;

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      tgt[0] = (e.clientX - r.left) / r.width;
      tgt[1] = 1 - (e.clientY - r.top) / r.height;
      activeTarget = 1;
    };
    const onLeave = () => {
      activeTarget = 0;
    };
    if (wantsMouse) {
      window.addEventListener("mousemove", onMove, { passive: true });
      document.addEventListener("mouseleave", onLeave);
    }

    const ctrls = [
      program.uniforms.uCtrlA.value,
      program.uniforms.uCtrlB.value,
      program.uniforms.uCtrlC.value,
      program.uniforms.uCtrlD.value,
    ];

    let raf = 0;
    let onScreen = true;
    let pageVisible = !document.hidden;
    const t0 = performance.now();

    const loop = (t: number) => {
      const time = (t - t0) * 0.001;
      for (let g = 0; g < 4; g += 1) {
        const arr = ctrls[g];
        for (let j = 0; j < 4; j += 1) {
          const i = CTRL_INDICES[g][j];
          arr[j] = morphAmount * Math.sin(time * speed * Math.sin(i * morphSpeed) + i);
        }
      }
      cur[0] += 0.05 * (tgt[0] - cur[0]);
      cur[1] += 0.05 * (tgt[1] - cur[1]);
      program.uniforms.uMouse.value[0] = cur[0];
      program.uniforms.uMouse.value[1] = cur[1];
      active += 0.05 * (activeTarget - active);
      program.uniforms.uMouseActive.value = active;

      renderer.render({ scene: mesh });
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (onScreen && pageVisible && raf === 0) raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        if (onScreen) start();
        else stop();
      },
      { threshold: 0 },
    );
    io.observe(host);

    const onVisibility = () => {
      pageVisible = !document.hidden;
      if (pageVisible) start();
      else stop();
    };
    document.addEventListener("visibilitychange", onVisibility);
    start();

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      if (wantsMouse) {
        window.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseleave", onLeave);
      }
      if (canvas.parentNode === host) host.removeChild(canvas);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [
    lowColor,
    midColor,
    highColor,
    speed,
    morphAmount,
    morphSpeed,
    bands,
    thickness,
    scale,
    glow,
    contrast,
    brightness,
    opacity,
    mouseRadius,
    mouseStrength,
  ]);

  return <div ref={hostRef} className="aurora-host" aria-hidden="true" />;
}
