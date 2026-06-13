"use client"

import { useRef, useMemo, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

function ParticleField({ count = 2500 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null)
  const mouse = useRef<THREE.Vector2>(new THREE.Vector2(0, 0))
  const { camera } = useThree()

  const { positions, originalPositions, velocities } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const originalPositions = new Float32Array(count * 3)
    const velocities = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)
      const r = 3 + Math.random() * 8
      const x = r * Math.sin(phi) * Math.cos(theta)
      const y = r * Math.sin(phi) * Math.sin(theta)
      const z = (Math.random() - 0.5) * 6
      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z
      originalPositions[i * 3] = x
      originalPositions[i * 3 + 1] = y
      originalPositions[i * 3 + 2] = z
    }
    return { positions, originalPositions, velocities }
  }, [count])

  const colors = useMemo(() => {
    const colors = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const t = Math.random()
      if (t < 0.5) {
        // cyan
        colors[i * 3] = 0.43
        colors[i * 3 + 1] = 0.92
        colors[i * 3 + 2] = 1.0
      } else if (t < 0.8) {
        // violet
        colors[i * 3] = 0.55
        colors[i * 3 + 1] = 0.42
        colors[i * 3 + 2] = 1.0
      } else {
        // green
        colors[i * 3] = 0.72
        colors[i * 3 + 1] = 1.0
        colors[i * 3 + 2] = 0.24
      }
    }
    return colors
  }, [count])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useFrame(({ clock }) => {
    if (!pointsRef.current) return
    const pos = pointsRef.current.geometry.attributes.position.array as Float32Array
    const t = clock.getElapsedTime()

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const ox = originalPositions[i3]
      const oy = originalPositions[i3 + 1]

      // Wave motion
      pos[i3] = ox + Math.sin(t * 0.4 + oy * 0.5) * 0.15
      pos[i3 + 1] = oy + Math.cos(t * 0.3 + ox * 0.4) * 0.15

      // Mouse repulsion
      const mx = mouse.current.x * 6
      const my = mouse.current.y * 4
      const dx = pos[i3] - mx
      const dy = pos[i3 + 1] - my
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < 2.5) {
        const force = (1 - dist / 2.5) * 0.8
        pos[i3] += (dx / dist) * force
        pos[i3 + 1] += (dy / dist) * force
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true
    pointsRef.current.rotation.y = t * 0.02
    pointsRef.current.rotation.x = Math.sin(t * 0.05) * 0.1
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  )
}

function ConnectionLines({ count = 80 }: { count?: number }) {
  const ref = useRef<THREE.LineSegments>(null)

  const { positions } = useMemo(() => {
    const positions = new Float32Array(count * 6)
    for (let i = 0; i < count; i++) {
      const i6 = i * 6
      for (let j = 0; j < 6; j++) {
        positions[i6 + j] = (Math.random() - 0.5) * 14
      }
    }
    return { positions }
  }, [count])

  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.rotation.y = clock.getElapsedTime() * 0.015
  })

  return (
    <lineSegments ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <lineBasicMaterial color="#1A2D44" transparent opacity={0.3} />
    </lineSegments>
  )
}

export function HeroCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 12], fov: 60 }}
      style={{ position: "absolute", inset: 0 }}
      gl={{ antialias: false, powerPreference: "high-performance" }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.5} />
      <ParticleField count={2000} />
      <ConnectionLines count={60} />
    </Canvas>
  )
}
