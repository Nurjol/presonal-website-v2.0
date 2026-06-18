import { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

// --- Particle field ---
function ParticleField() {
  const pointsRef = useRef()

  const { positions, colors } = useMemo(() => {
    const count = 2500
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    // Neon palette: cyan #00f5ff, magenta #ff0080, lime #00ff88
    const palette = [
      new THREE.Color('#00f5ff'),
      new THREE.Color('#ff0080'),
      new THREE.Color('#00ff88'),
    ]

    for (let i = 0; i < count; i++) {
      // Spread in a wide volume around origin
      positions[i * 3]     = (Math.random() - 0.5) * 30
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15

      const c = palette[Math.floor(Math.random() * palette.length)]
      colors[i * 3]     = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b
    }

    return { positions, colors }
  }, [])

  useFrame((state) => {
    if (!pointsRef.current) return
    // Slow drift rotation
    pointsRef.current.rotation.y += 0.0006
    pointsRef.current.rotation.x += 0.0002

    // Gentle mouse parallax on the point cloud
    const px = state.pointer.x
    const py = state.pointer.y
    pointsRef.current.rotation.y += px * 0.0003
    pointsRef.current.rotation.x += py * 0.0002
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <PointMaterial
        size={0.055}
        vertexColors
        transparent
        opacity={0.75}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

// --- Individual wireframe shape wrapper ---
function WireShape({ geometry, position, color, rotSpeed }) {
  const meshRef = useRef()

  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x += rotSpeed[0]
    meshRef.current.rotation.y += rotSpeed[1]
    meshRef.current.rotation.z += rotSpeed[2]

    // Very subtle mouse parallax
    const px = state.pointer.x
    const py = state.pointer.y
    meshRef.current.position.x = position[0] + px * 0.4
    meshRef.current.position.y = position[1] + py * 0.3
  })

  return (
    <mesh ref={meshRef} position={position}>
      {geometry}
      <meshBasicMaterial
        color={color}
        wireframe
        transparent
        opacity={0.18}
      />
    </mesh>
  )
}

// --- Scene with all shapes ---
function Scene() {
  const shapes = useMemo(() => [
    {
      id: 'ico',
      geometry: <icosahedronGeometry args={[2.2, 1]} />,
      position: [-6, 1.5, -5],
      color: '#00f5ff',
      rotSpeed: [0.002, 0.003, 0.001],
      floatIntensity: 0.6,
    },
    {
      id: 'torus',
      geometry: <torusGeometry args={[1.8, 0.5, 8, 24]} />,
      position: [6, -1.5, -4],
      color: '#ff0080',
      rotSpeed: [0.003, 0.002, 0.004],
      floatIntensity: 0.8,
    },
    {
      id: 'octa',
      geometry: <octahedronGeometry args={[1.6, 0]} />,
      position: [0, 3, -6],
      color: '#00ff88',
      rotSpeed: [0.004, 0.001, 0.003],
      floatIntensity: 1.0,
    },
    {
      id: 'tetra',
      geometry: <tetrahedronGeometry args={[1.4, 0]} />,
      position: [-4, -3, -3],
      color: '#ff0080',
      rotSpeed: [0.002, 0.005, 0.002],
      floatIntensity: 0.7,
    },
  ], [])

  return (
    <>
      <ParticleField />
      {shapes.map((s) => (
        <Float
          key={s.id}
          speed={1.2}
          rotationIntensity={0}
          floatIntensity={s.floatIntensity}
          floatingRange={[-0.3, 0.3]}
        >
          <WireShape
            geometry={s.geometry}
            position={s.position}
            color={s.color}
            rotSpeed={s.rotSpeed}
          />
        </Float>
      ))}
    </>
  )
}

// --- Main export ---
export default function NeuralBackground() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 10], fov: 60, near: 0.1, far: 100 }}
        gl={{ alpha: true, antialias: false, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  )
}
