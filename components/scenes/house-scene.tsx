"use client";

import { useMemo, useRef, type RefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Edges, OrthographicCamera } from "@react-three/drei";
import type { MotionValue } from "motion/react";
import * as THREE from "three";
import { AirflowParticles, type StreamMode } from "@/components/scenes/airflow-particles";

/**
 * Isometric cutaway house, drawn like an architectural illustration: white
 * walls with ink edges, flat colour on the floors, no glow. The front and
 * right walls are removed so all four rooms read at once.
 *
 * `balance` (0..1, from scroll) is the whole story. At 0 each room is off
 * target: its floor is tinted by how cold or hot it is and its wall unit is
 * pushing warm or cool air to correct it. As balance reaches 1 every floor
 * settles to the same neutral tone and the air calms to a gentle filtered
 * flow. Temperature badges are DOM elements projected from 3D each frame.
 */

export type HouseRoom = { id: string; name: string; before: number };

const INK = "#0c1a26";
const WALL = "#fbfbf9";
const FLOOR_OK = new THREE.Color("#eef1ef");
const FLOOR_COLD = new THREE.Color("#a9d6f5");
const FLOOR_HOT = new THREE.Color("#f8b894");

const W = 8; // x extent
const D = 6; // z extent
const H = 2.5; // storey height
const T = 0.18; // wall thickness

type Layout = {
  id: string;
  floor: number; // 0 ground, 1 upper
  x0: number;
  x1: number;
  unitX: number;
};

/* Rooms in plan. Upper floor: bedroom | nursery. Ground: living | kitchen. */
const LAYOUT: Layout[] = [
  { id: "bed1", floor: 1, x0: -W / 2, x1: 0, unitX: -2 },
  { id: "bed2", floor: 1, x0: 0, x1: W / 2, unitX: 2 },
  { id: "living", floor: 0, x0: -W / 2, x1: 1, unitX: -1.7 },
  { id: "kitchen", floor: 0, x0: 1, x1: W / 2, unitX: 2.6 },
];

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function Box({
  args,
  position,
  color = WALL,
  rotation,
  edge = 0.55,
}: {
  args: [number, number, number];
  position: [number, number, number];
  color?: string;
  rotation?: [number, number, number];
  edge?: number;
}) {
  return (
    <mesh position={position} rotation={rotation}>
      <boxGeometry args={args} />
      <meshLambertMaterial color={color} />
      <Edges color={INK} transparent opacity={edge} />
    </mesh>
  );
}

/* Furniture, kept to a few honest boxes per room. */
function Furniture() {
  return (
    <group>
      {/* Living room */}
      <Box args={[2.6, 0.02, 1.8]} position={[-1.7, 0.02, 0.6]} color="#e7dccd" edge={0.25} />
      <Box args={[2.4, 0.45, 0.85]} position={[-1.8, 0.25, -1.9]} color="#d7dee2" />
      <Box args={[2.4, 0.5, 0.25]} position={[-1.8, 0.7, -2.25]} color="#d7dee2" />
      <Box args={[1.1, 0.35, 0.6]} position={[-1.7, 0.2, 0.4]} color="#c9a57f" />
      <Box args={[0.35, 0.9, 1.6]} position={[-3.7, 0.45, 0.8]} color="#f4f1ea" />
      {/* Kitchen */}
      <Box args={[2.8, 0.95, 0.7]} position={[2.5, 0.48, -2.5]} color="#f4f1ea" />
      <Box args={[1.5, 0.95, 0.8]} position={[2.5, 0.48, 0.4]} color="#e7dccd" />
      <Box args={[0.35, 0.7, 0.35]} position={[2.1, 0.35, 1.3]} color="#c9a57f" />
      <Box args={[0.35, 0.7, 0.35]} position={[2.9, 0.35, 1.3]} color="#c9a57f" />
      {/* Bedroom (upper) */}
      <Box args={[1.8, 0.45, 2.3]} position={[-2.2, H + 0.25, -1.6]} color="#f4f1ea" />
      <Box args={[1.8, 0.15, 1.2]} position={[-2.2, H + 0.55, -1.1]} color="#cfe3f0" edge={0.35} />
      <Box args={[0.5, 0.5, 0.5]} position={[-0.8, H + 0.26, -2.5]} color="#c9a57f" />
      {/* Nursery (upper) */}
      <Box args={[1.4, 0.9, 0.8]} position={[1.3, H + 0.46, -2.3]} color="#f4f1ea" edge={0.45} />
      <Box args={[0.8, 0.02, 0.8]} position={[2.8, H + 0.02, 0.6]} color="#f8d9c9" edge={0.25} />
      <Box args={[0.6, 1.4, 0.35]} position={[3.6, H + 0.7, -2.6]} color="#e7dccd" />
    </group>
  );
}

/* Wall-mounted indoor unit on the back wall of a room. */
function IndoorUnit({ x, y }: { x: number; y: number }) {
  return (
    <group position={[x, y, -D / 2 + T / 2 + 0.2]}>
      <Box args={[1.1, 0.34, 0.3]} position={[0, 0, 0]} color="#ffffff" edge={0.7} />
      <mesh position={[0, -0.12, 0.16]}>
        <boxGeometry args={[0.9, 0.04, 0.02]} />
        <meshBasicMaterial color="#7c8b96" />
      </mesh>
    </group>
  );
}

/* Outdoor heat pump beside the left wall. */
function OutdoorUnit() {
  return (
    <group position={[-W / 2 - 1.1, 0, -1.2]}>
      <Box args={[1.1, 1.0, 1.4]} position={[0, 0.5, 0]} color="#f4f5f4" edge={0.7} />
      <mesh position={[-0.56, 0.5, 0]} rotation={[0, Math.PI / 2, 0]}>
        <ringGeometry args={[0.18, 0.4, 32]} />
        <meshBasicMaterial color={INK} transparent opacity={0.55} side={THREE.DoubleSide} />
      </mesh>
      <Box args={[1.3, 0.08, 1.6]} position={[0, 0.04, 0]} color="#dfe5e7" edge={0.3} />
    </group>
  );
}

function Shell({ floorRefs }: { floorRefs: RefObject<(THREE.MeshLambertMaterial | null)[]> }) {
  return (
    <group>
      {/* Ground slab and first floor slab */}
      <Box args={[W + 0.4, 0.25, D + 0.4]} position={[0, -0.13, 0]} color="#e3e8ea" edge={0.6} />
      <Box args={[W, 0.16, D]} position={[0, H, 0]} color="#f4f1ea" edge={0.6} />

      {/* Floors, tinted per room */}
      {LAYOUT.map((room, i) => (
        <mesh
          key={room.id}
          position={[(room.x0 + room.x1) / 2, room.floor * H + (room.floor ? 0.085 : 0.005), 0]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[room.x1 - room.x0 - 0.05, D - 0.05]} />
          <meshLambertMaterial
            ref={(m) => {
              floorRefs.current[i] = m;
            }}
            color={FLOOR_OK}
          />
        </mesh>
      ))}

      {/* Back and left walls, both storeys */}
      <Box args={[W, H * 2, T]} position={[0, H, -D / 2]} />
      <Box args={[T, H * 2, D]} position={[-W / 2, H, 0]} />
      {/* Windows cut as darker panels on the back wall */}
      <Box args={[1.4, 1.1, 0.02]} position={[1.9, 1.4, -D / 2 + T / 2 + 0.01]} color="#dbeaf3" edge={0.5} />
      <Box args={[1.2, 1.0, 0.02]} position={[-2.4, H + 1.5, -D / 2 + T / 2 + 0.01]} color="#dbeaf3" edge={0.5} />
      <Box args={[0.02, 1.1, 1.6]} position={[-W / 2 + T / 2 + 0.01, 1.4, 1.2]} color="#dbeaf3" edge={0.5} />

      {/* Partitions, low enough to see over */}
      <Box args={[T, H, D * 0.62]} position={[0, H + H / 2, -D * 0.19]} />
      <Box args={[T, H, D * 0.5]} position={[1, H / 2, -D * 0.25]} />

      {/* Stair hint */}
      {Array.from({ length: 6 }, (_, i) => (
        <Box
          key={i}
          args={[0.9, 0.2, 0.42]}
          position={[3.4, 0.1 + i * 0.4, 2.6 - i * 0.42]}
          color="#f4f1ea"
          edge={0.4}
        />
      ))}
    </group>
  );
}

function Rig({
  progress,
  still,
  groupRef,
}: {
  progress: MotionValue<number>;
  still: boolean;
  groupRef: RefObject<THREE.Group | null>;
}) {
  const size = useThree((s) => s.size);
  const cam = useThree((s) => s.camera) as THREE.OrthographicCamera;
  const ptr = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    // Fit the house to the canvas.
    // Phones are width-limited, so the house gets a little more of the width.
    const fit = Math.min(size.width / (size.width < 640 ? 11 : 12.5), size.height / 10.2);
    if (Math.abs(cam.zoom - fit) > 0.01) {
      cam.zoom = fit;
      cam.updateProjectionMatrix();
    }
    const g = groupRef.current;
    if (!g) return;
    const p = progress.get();
    const k = still ? 1 : 1 - Math.pow(0.002, delta);
    if (!still) {
      ptr.current.x += (state.pointer.x - ptr.current.x) * 0.04;
      ptr.current.y += (state.pointer.y - ptr.current.y) * 0.04;
    }
    const targetY = lerp(-0.12, 0.12, p) + ptr.current.x * 0.06;
    g.rotation.y = lerp(g.rotation.y, targetY, k);
    g.position.y = lerp(g.position.y, -2.1 + ptr.current.y * 0.08, k);
  });
  return null;
}

/** Projects each room's badge anchor to screen space and writes it directly. */
function BadgeTracker({
  groupRef,
  els,
  progress,
  rooms,
  target,
}: {
  groupRef: RefObject<THREE.Group | null>;
  els: RefObject<(HTMLDivElement | null)[]>;
  progress: MotionValue<number>;
  rooms: HouseRoom[];
  target: number;
}) {
  const v = useMemo(() => new THREE.Vector3(), []);
  useFrame((state) => {
    const g = groupRef.current;
    if (!g) return;
    const p = progress.get();
    const { width, height } = state.size;
    LAYOUT.forEach((room, i) => {
      const el = els.current?.[i];
      if (!el) return;
      v.set((room.x0 + room.x1) / 2, room.floor * H + 1.75, -0.4).applyMatrix4(g.matrixWorld).project(state.camera);
      el.style.transform = `translate3d(${((v.x * 0.5 + 0.5) * width).toFixed(1)}px, ${((-v.y * 0.5 + 0.5) * height).toFixed(1)}px, 0) translate(-50%, -50%)`;
      el.style.visibility = "visible";
      const t = Math.round(lerp(rooms[i].before, target, p));
      const text = el.querySelector("[data-temp]");
      if (text && text.textContent !== `${t}°`) text.textContent = `${t}°`;
      const dev = t - target;
      el.dataset.state = Math.abs(dev) <= 1 ? "ok" : dev < 0 ? "cold" : "hot";
    });
  });
  return null;
}

function Airflows({
  progress,
  rooms,
  target,
  mobile,
}: {
  progress: MotionValue<number>;
  rooms: HouseRoom[];
  target: number;
  mobile: boolean;
}) {
  // One stream per room, blowing out of the indoor unit into the room.
  const paths = useMemo(
    () =>
      LAYOUT.map((room) => {
        const y = room.floor * H + 2.05;
        const z0 = -D / 2 + 0.55;
        return [
          [
            new THREE.Vector3(room.unitX, y, z0),
            new THREE.Vector3(room.unitX, y - 0.35, z0 + 0.9),
            new THREE.Vector3(room.unitX + 0.2, y - 1.0, z0 + 2.4),
            new THREE.Vector3(room.unitX + 0.4, y - 1.6, z0 + 4.2),
            new THREE.Vector3(room.unitX + 0.5, y - 1.9, z0 + 5.4),
          ],
        ];
      }),
    [],
  );

  const modes = useRef<{ current: StreamMode }[]>(
    rooms.map((r) => ({ current: r.before < target ? "warm" : "cool" })),
  );
  const strength = useRef({ current: 1 });

  useFrame(() => {
    const p = progress.get();
    strength.current.current = 1 - p * 0.55;
    rooms.forEach((r, i) => {
      const t = lerp(r.before, target, p);
      modes.current[i].current = Math.abs(t - target) <= 1.2 ? "neutral" : r.before < target ? "warm" : "cool";
    });
  });

  return (
    <>
      {paths.map((path, i) => (
        <AirflowParticles
          key={LAYOUT[i].id}
          paths={path}
          count={mobile ? 60 : 110}
          trail={mobile ? 2 : 3}
          gap={0.02}
          size={0.13}
          spread={0.45}
          speed={0.9}
          mode="neutral"
          modeRef={modes.current[i]}
          intensityRef={strength.current}
          look="ink"
          opacity={0.9}
        />
      ))}
    </>
  );
}

function FloorTint({
  floorRefs,
  progress,
  rooms,
  target,
}: {
  floorRefs: RefObject<(THREE.MeshLambertMaterial | null)[]>;
  progress: MotionValue<number>;
  rooms: HouseRoom[];
  target: number;
}) {
  const c = useMemo(() => new THREE.Color(), []);
  useFrame(() => {
    const p = progress.get();
    rooms.forEach((r, i) => {
      const m = floorRefs.current?.[i];
      if (!m) return;
      const dev = Math.min(1, Math.abs(r.before - target) / 8) * (1 - p);
      c.copy(FLOOR_OK).lerp(r.before < target ? FLOOR_COLD : FLOOR_HOT, dev);
      m.color.copy(c);
    });
  });
  return null;
}

export default function HouseScene({
  progress,
  rooms,
  target,
  active = true,
  badgeEls,
}: {
  progress: MotionValue<number>;
  rooms: HouseRoom[];
  target: number;
  active?: boolean;
  badgeEls: RefObject<(HTMLDivElement | null)[]>;
}) {
  const mobile = useMemo(() => window.matchMedia("(max-width: 767px)").matches, []);
  const still = useMemo(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches, []);
  const group = useRef<THREE.Group>(null);
  const floorRefs = useRef<(THREE.MeshLambertMaterial | null)[]>([]);

  return (
    <Canvas
      dpr={mobile ? [1, 1.5] : [1, 2]}
      gl={{ antialias: true, alpha: true }}
      frameloop={!active ? "never" : "always"}
      onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
    >
      <OrthographicCamera makeDefault position={[12, 9.5, 12]} zoom={40} near={-100} far={200} onUpdate={(c) => c.lookAt(0, 0, 0)} />
      <ambientLight intensity={1.15} />
      <directionalLight position={[6, 12, 4]} intensity={0.9} />
      <directionalLight position={[-6, 4, 10]} intensity={0.35} />

      <group ref={group} position={[0, -2.1, 0]}>
        <Shell floorRefs={floorRefs} />
        <Furniture />
        {LAYOUT.map((room) => (
          <IndoorUnit key={room.id} x={room.unitX} y={room.floor * H + 2.05} />
        ))}
        <OutdoorUnit />
        <Airflows progress={progress} rooms={rooms} target={target} mobile={mobile} />
      </group>

      <Rig progress={progress} still={still} groupRef={group} />
      <FloorTint floorRefs={floorRefs} progress={progress} rooms={rooms} target={target} />
      <BadgeTracker groupRef={group} els={badgeEls} progress={progress} rooms={rooms} target={target} />
    </Canvas>
  );
}
