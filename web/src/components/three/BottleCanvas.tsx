"use client";

import { Suspense, useRef, type RefObject } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, Lightformer, useGLTF } from "@react-three/drei";

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const smooth = (a: number, b: number, v: number) => {
  const t = clamp01((v - a) / (b - a));
  return t * t * (3 - 2 * t);
};

const MODEL_URL = "/models/rollon.glb";

// Runtime materials for the transmissive parts: three.js transmission samples the (transparent) page
// background as black, so glass/oil/insert use tuned clear-reflective materials instead.
const glassMat = new THREE.MeshPhysicalMaterial({
  color: "#fff4e6", transparent: true, opacity: 0.17, roughness: 0.02, metalness: 0,
  clearcoat: 1, clearcoatRoughness: 0.02, envMapIntensity: 2.4, specularIntensity: 1,
  side: THREE.DoubleSide, depthWrite: false,
});
const oilMat = new THREE.MeshPhysicalMaterial({
  color: "#1e0c02", emissive: "#6b2c05", emissiveIntensity: 1.0, roughness: 0.25,
  clearcoat: 0.18, clearcoatRoughness: 0.45, envMapIntensity: 0.22,
});
const insertMat = new THREE.MeshStandardMaterial({ color: "#efe8dc", roughness: 0.55, metalness: 0, transparent: true, opacity: 0.85 });

type RigProps = { progress: RefObject<number>; lowPower: boolean };

function Bottle({ progress }: RigProps) {
  const group = useRef<THREE.Group>(null);
  const cap = useRef<THREE.Group>(null);
  const smoothed = useRef(0);
  const size = useThree((st) => st.size);
  const { nodes } = useGLTF(MODEL_URL) as unknown as { nodes: Record<string, THREE.Mesh> };

  useFrame((state, delta) => {
    const target = progress.current ?? 0;
    smoothed.current = THREE.MathUtils.damp(smoothed.current, target, 3.2, delta);
    const p = smoothed.current;
    const wide = size.width >= 900;
    const settle = smooth(0, 0.16, p); // hero → centred stage
    const uncap = smooth(0.3, 0.52, p);
    const dolly = smooth(0.55, 0.82, p);
    const g = group.current;
    if (g) {
      const px = state.pointer.x;
      const py = state.pointer.y;
      g.position.x = THREE.MathUtils.lerp(wide ? 2.1 : 0, 0, settle);
      g.position.y = THREE.MathUtils.lerp(wide ? -0.45 : 0.35, -0.55, settle);
      const idle = state.clock.elapsedTime * 0.18 * (1 - settle * 0.7);
      g.rotation.y = THREE.MathUtils.damp(g.rotation.y, idle + p * Math.PI * 2.1 + px * 0.28, 4, delta);
      g.rotation.x = THREE.MathUtils.damp(g.rotation.x, -py * 0.12 + uncap * 0.18, 4, delta);
      g.rotation.z = THREE.MathUtils.damp(g.rotation.z, 0.08 * (1 - settle) + px * 0.04, 4, delta);
      const s = wide ? 1 : 0.78;
      g.scale.setScalar(s);
    }
    if (cap.current) {
      cap.current.position.y = uncap * 1.35;
      cap.current.rotation.y = uncap * 1.6;
      cap.current.position.x = uncap * 0.3;
    }
    const cam = state.camera;
    cam.position.z = THREE.MathUtils.lerp(9.2, 7.6, dolly);
    cam.position.y = THREE.MathUtils.lerp(0.2, 0.4, dolly);
    cam.lookAt(0, THREE.MathUtils.lerp(0, 0.15, dolly), 0);
  });

  return (
    <Float speed={1.1} rotationIntensity={0.12} floatIntensity={0.35} floatingRange={[-0.06, 0.06]}>
      <group ref={group}>
        <mesh geometry={nodes.Glass.geometry} material={glassMat} renderOrder={2} />
        <mesh geometry={nodes.Oil.geometry} material={oilMat} />
        <mesh geometry={nodes.Insert.geometry} material={insertMat} />
        <mesh geometry={nodes.Ball.geometry} material={nodes.Ball.material} position={nodes.Ball.position} />
        <group ref={cap}>
          <mesh geometry={nodes.Cap.geometry} material={nodes.Cap.material} />
        </group>
      </group>
    </Float>
  );
}

type CanvasProps = {
  progress: RefObject<number>;
  active: boolean;
  eventSource: RefObject<HTMLElement | null>;
  lowPower: boolean;
};

export default function BottleCanvas({ progress, active, eventSource, lowPower }: CanvasProps) {
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={lowPower ? [1, 1.25] : [1, 1.6]}
      camera={{ position: [0, 0.2, 9.2], fov: 30 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      eventSource={eventSource as RefObject<HTMLElement>}
      eventPrefix="client"
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.05;
      }}
      aria-hidden="true"
    >
      <ambientLight intensity={0.25} />
      <directionalLight position={[3, 5, 4]} intensity={1.3} color="#ffd6a3" />
      <Environment resolution={256} frames={1}>
        <Lightformer form="rect" intensity={2.4} color="#ffdcb0" position={[0, 4, -6]} scale={[10, 3, 1]} />
        <Lightformer form="rect" intensity={1.6} color="#ff9a3c" position={[-5, 1, -2]} rotation-y={Math.PI / 2.5} scale={[6, 2, 1]} />
        <Lightformer form="rect" intensity={1.2} color="#ffe6c4" position={[5, 2, 1]} rotation-y={-Math.PI / 2.2} scale={[5, 3, 1]} />
        <Lightformer form="ring" intensity={0.8} color="#ffb35c" position={[0, -3, 3]} scale={3} />
      </Environment>
      <Suspense fallback={null}>
        <Bottle progress={progress} lowPower={lowPower} />
      </Suspense>
    </Canvas>
  );
}

useGLTF.preload(MODEL_URL);
