import { useEffect, useRef, useState } from "react"
import * as THREE from "three"

export default function ThreeScene() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (!containerRef.current) return

    // Setup
    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0xffffff, 0.001)

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000)
    camera.position.z = 1000
    camera.position.y = 400
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0xffffff, 1)
    containerRef.current.appendChild(renderer.domElement)

    // Particles Wave
    const numParticlesX = 100
    const numParticlesZ = 100
    const separation = 40

    const numParticles = numParticlesX * numParticlesZ
    const positions = new Float32Array(numParticles * 3)
    const scales = new Float32Array(numParticles)

    let i = 0
    let j = 0
    for (let ix = 0; ix < numParticlesX; ix++) {
      for (let iz = 0; iz < numParticlesZ; iz++) {
        positions[i] = ix * separation - ((numParticlesX * separation) / 2)
        positions[i + 1] = 0
        positions[i + 2] = iz * separation - ((numParticlesZ * separation) / 2)
        scales[j] = 1
        i += 3
        j++
      }
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1))

    const material = new THREE.PointsMaterial({
      color: 0x000000,
      size: 3,
      transparent: true,
      opacity: 0.6,
    })

    const particles = new THREE.Points(geometry, material)
    scene.add(particles)

    let count = 0
    let mouseX = 0
    let mouseY = 0

    const onMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX - window.innerWidth / 2
      mouseY = event.clientY - window.innerHeight / 2
    }

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    document.addEventListener('mousemove', onMouseMove)
    window.addEventListener('resize', onResize)

    const animate = () => {
      requestAnimationFrame(animate)

      const positionsArray = particles.geometry.attributes.position.array as Float32Array
      const scalesArray = particles.geometry.attributes.scale.array as Float32Array

      let idx = 0
      let scaleIdx = 0

      for (let ix = 0; ix < numParticlesX; ix++) {
        for (let iz = 0; iz < numParticlesZ; iz++) {
          positionsArray[idx + 1] = 
            (Math.sin((ix + count) * 0.3) * 50) +
            (Math.sin((iz + count) * 0.5) * 50)

          scalesArray[scaleIdx] = 
            (Math.sin((ix + count) * 0.3) + 1) * 2 +
            (Math.sin((iz + count) * 0.5) + 1) * 2

          idx += 3
          scaleIdx++
        }
      }

      particles.geometry.attributes.position.needsUpdate = true
      particles.geometry.attributes.scale.needsUpdate = true

      // Camera follows mouse
      camera.position.x += (mouseX - camera.position.x) * 0.02
      camera.position.y += (-mouseY + 400 - camera.position.y) * 0.02
      camera.lookAt(scene.position)

      count += 0.05
      renderer.render(scene, camera)
    }

    setIsLoaded(true)
    animate()

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement)
      }
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}
      style={{ zIndex: -1 }}
    />
  )
}
