"use client";

import { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Color, Triangle } from "ogl";

/**
 * Aurora, from React Bits, adapted.
 *
 * Changes from the original, all deliberate:
 *
 * - Colours come from the design tokens, not the shipped `#5227FF` /
 *   `#3A29FF` defaults. Purple and indigo gradients are the first item on
 *   this brief's banned list, and the site has exactly one accent.
 * - The render loop is gated on IntersectionObserver and `visibilitychange`.
 *   The original runs `requestAnimationFrame` forever, including in a
 *   background tab. This one stops when it cannot be seen.
 * - `prefers-reduced-motion` renders nothing at all. The original has no
 *   handling for it.
 * - The context is created lazily and torn down properly on unmount.
 *
 * It is still a full-screen fragment shader. See the README for what it costs.
 */

const VERT = `#version 300 es
in vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }
`;

const FRAG = `#version 300 es
precision highp float;

uniform float uTime;
uniform float uAmplitude;
uniform vec3 uColorStops[3];
uniform vec2 uResolution;
uniform float uBlend;
uniform float uLight;

out vec4 fragColor;

vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }

float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m; m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

struct ColorStop { vec3 color; float position; };

#define COLOR_RAMP(colors, factor, finalColor) {              \
  int index = 0;                                              \
  for (int i = 0; i < 2; i++) {                               \
     ColorStop currentColor = colors[i];                      \
     bool isInBetween = currentColor.position <= factor;      \
     index = int(mix(float(index), float(i), float(isInBetween))); \
  }                                                           \
  ColorStop currentColor = colors[index];                     \
  ColorStop nextColor = colors[index + 1];                    \
  float range = nextColor.position - currentColor.position;   \
  float lerpFactor = (factor - currentColor.position) / range; \
  finalColor = mix(currentColor.color, nextColor.color, lerpFactor); \
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;

  ColorStop colors[3];
  colors[0] = ColorStop(uColorStops[0], 0.0);
  colors[1] = ColorStop(uColorStops[1], 0.5);
  colors[2] = ColorStop(uColorStops[2], 1.0);

  vec3 rampColor;
  COLOR_RAMP(colors, uv.x, rampColor);

  float height = snoise(vec2(uv.x * 2.0 + uTime * 0.1, uTime * 0.25)) * 0.5 * uAmplitude;
  height = exp(height);
  height = (uv.y * 2.0 - height + 0.2);
  float intensity = 0.6 * height;

  float midPoint = 0.20;
  float auroraAlpha = smoothstep(midPoint - uBlend * 0.5, midPoint + uBlend * 0.5, intensity);

  // Light pages: paint the ramp colour itself, not a darkened copy, so a
  // pastel wash stays pastel over white instead of turning grey.
  vec3 tone = mix(intensity * rampColor, rampColor, uLight);
  fragColor = vec4(tone * auroraAlpha, auroraAlpha);
}
`;

export function Aurora({
  /** Copper through a warm mid into the surface tone. No purple. */
  colorStops = ["#B4643C", "#55372A", "#12161A"],
  amplitude = 0.9,
  blend = 0.6,
  speed = 0.28,
  light = false,
}: {
  colorStops?: [string, string, string] | string[];
  amplitude?: number;
  blend?: number;
  speed?: number;
  /** Set for light backgrounds: keeps pastel stops from greying out. */
  light?: boolean;
}) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    // No shader at all for reduced motion. The original had no such check.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let renderer: Renderer;
    try {
      renderer = new Renderer({ alpha: true, premultipliedAlpha: true });
    } catch {
      return;
    }

    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.canvas.style.backgroundColor = "transparent";
    gl.canvas.style.width = "100%";
    gl.canvas.style.height = "100%";
    gl.canvas.style.display = "block";

    const geometry = new Triangle(gl);
    if (geometry.attributes.uv) delete geometry.attributes.uv;

    const stops = colorStops.map((hex) => {
      const c = new Color(hex);
      return [c.r, c.g, c.b];
    });

    const program = new Program(gl, {
      vertex: VERT,
      fragment: FRAG,
      uniforms: {
        uTime: { value: 0 },
        uAmplitude: { value: amplitude },
        uColorStops: { value: stops },
        uResolution: { value: [host.offsetWidth, host.offsetHeight] },
        uBlend: { value: blend },
        uLight: { value: light ? 1 : 0 },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });
    host.appendChild(gl.canvas);

    const resize = () => {
      const w = host.offsetWidth;
      const h = host.offsetHeight;
      if (!w || !h) return;
      // Cap DPR: a full-screen noise shader at 3x on a phone is wasted work.
      renderer.dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      renderer.setSize(w, h);
      program.uniforms.uResolution.value = [w, h];
    };
    resize();

    let raf = 0;
    let onScreen = false;
    let pageVisible = !document.hidden;

    const frame = (t: number) => {
      raf = requestAnimationFrame(frame);
      program.uniforms.uTime.value = t * 0.001 * speed;
      renderer.render({ scene: mesh });
    };

    const start = () => {
      if (onScreen && pageVisible && !raf) raf = requestAnimationFrame(frame);
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
    window.addEventListener("resize", resize);

    return () => {
      stop();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", resize);
      if (gl.canvas.parentNode === host) host.removeChild(gl.canvas);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [colorStops, amplitude, blend, speed, light]);

  return <div ref={hostRef} className="aurora-host" aria-hidden="true" />;
}
