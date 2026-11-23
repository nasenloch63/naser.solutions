"use client"

import { useEffect, useRef, useState, type RefObject } from "react"
import type * as ThreeTypes from "three"

const SCALE = 0.039
const CENTER_X = 100.5
const CENTER_Y = 74

function pt(x: number, y: number): [number, number] {
  return [(x - CENTER_X) * SCALE, (CENTER_Y - y) * SCALE]
}

function buildLogoShapes(THREE: typeof ThreeTypes): ThreeTypes.Shape[] {
  // Piece 1: Left tall swooping arch (exact trace from public/images/logo-invertable.png)
  const left = new THREE.Shape()
  left.moveTo(...pt(54, 38))
  left.lineTo(...pt(70, 38))
  left.bezierCurveTo(...pt(86, 38), ...pt(100, 50), ...pt(100, 68))
  left.lineTo(...pt(100, 110))
  left.lineTo(...pt(90, 110))
  left.lineTo(...pt(90, 82))
  left.bezierCurveTo(...pt(90, 66), ...pt(78, 59), ...pt(64, 57))
  left.bezierCurveTo(...pt(56, 55.5), ...pt(54, 51), ...pt(54, 44))
  left.closePath()

  // Piece 2: Right lower rounded arch (exact trace from public/images/logo-invertable.png)
  const right = new THREE.Shape()
  right.moveTo(...pt(105, 70))
  right.lineTo(...pt(119, 70))
  right.bezierCurveTo(...pt(136, 70), ...pt(147, 81), ...pt(147, 98))
  right.lineTo(...pt(147, 110))
  right.lineTo(...pt(128, 110))
  right.lineTo(...pt(128, 97))
  right.bezierCurveTo(...pt(128, 86), ...pt(119, 78.5), ...pt(105, 77))
  right.closePath()

  return [left, right]
}

function sampleMeshSurface(
  THREE: typeof ThreeTypes,
  geometries: ThreeTypes.BufferGeometry[],
  totalCount: number,
) {
  const triangles: { a: ThreeTypes.Vector3; b: ThreeTypes.Vector3; c: ThreeTypes.Vector3; area: number }[] = []
  let totalArea = 0

  for (const geom of geometries) {
    const pos = geom.attributes.position
    const index = geom.index
    const triCount = index ? index.count / 3 : pos.count / 3
    for (let i = 0; i < triCount; i++) {
      const i0 = index ? index.getX(i * 3) : i * 3
      const i1 = index ? index.getX(i * 3 + 1) : i * 3 + 1
      const i2 = index ? index.getX(i * 3 + 2) : i * 3 + 2
      const a = new THREE.Vector3().fromBufferAttribute(pos, i0)
      const b = new THREE.Vector3().fromBufferAttribute(pos, i1)
      const c = new THREE.Vector3().fromBufferAttribute(pos, i2)
      const area = new THREE.Vector3().subVectors(b, a).cross(new THREE.Vector3().subVectors(c, a)).length() * 0.5
      if (area > 1e-6) {
        totalArea += area
        triangles.push({ a, b, c, area })
      }
    }
  }

  const basePositions = new Float32Array(totalCount * 3)
  const velocities = new Float32Array(totalCount * 3)
  const seeds = new Float32Array(totalCount)
  const delays = new Float32Array(totalCount)

  const cumulative = new Float32Array(triangles.length)
  let acc = 0
  for (let i = 0; i < triangles.length; i++) {
    acc += triangles[i].area / totalArea
    cumulative[i] = acc
  }

  const p = new THREE.Vector3()
  for (let i = 0; i < totalCount; i++) {
    const r = Math.random()
    let lo = 0
    let hi = triangles.length - 1
    while (lo < hi) {
      const mid = (lo + hi) >> 1
      if (cumulative[mid] < r) lo = mid + 1
      else hi = mid
    }
    const tri = triangles[lo]
    let u = Math.random()
    let v = Math.random()
    if (u + v > 1) {
      u = 1 - u
      v = 1 - v
    }
    const w = 1 - u - v
    p.set(
      tri.a.x * w + tri.b.x * u + tri.c.x * v,
      tri.a.y * w + tri.b.y * u + tri.c.y * v,
      tri.a.z * w + tri.b.z * u + tri.c.z * v,
    )

    basePositions[i * 3] = p.x
    basePositions[i * 3 + 1] = p.y
    basePositions[i * 3 + 2] = p.z

    // Diagonal dissolve drift vector
    const angle = Math.atan2(p.y, p.x) + (Math.random() - 0.5) * 1.15
    const speed = 0.55 + Math.random() * 1.45
    velocities[i * 3] = Math.cos(angle) * speed * 0.85 + 0.35
    velocities[i * 3 + 1] = Math.sin(angle) * speed * 0.7 + 0.45 + Math.random() * 0.35
    velocities[i * 3 + 2] = (Math.random() - 0.5) * 1.7

    seeds[i] = Math.random() * Math.PI * 2
    const normalizedDiag = ((p.x + 1.8) / 3.6) * 0.65 + ((p.y + 1.4) / 2.8) * 0.35
    delays[i] = Math.max(0, Math.min(0.42, normalizedDiag * 0.34 + Math.random() * 0.08))
  }

  return { basePositions, velocities, seeds, delays }
}

function createStudioEnvironment(
  THREE: typeof ThreeTypes,
  renderer: ThreeTypes.WebGLRenderer,
) {
  const pmrem = new THREE.PMREMGenerator(renderer)
  const envScene = new THREE.Scene()
  envScene.background = new THREE.Color(0xf4f4f6)

  const panelConfigs = [
    { pos: [0, 7, 3] as const, rot: [Math.PI / 2.2, 0, 0] as const, scale: [14, 5, 1] as const, color: 0xffffff },
    { pos: [-7, 2, 4] as const, rot: [0, Math.PI / 2.4, 0] as const, scale: [10, 8, 1] as const, color: 0xffffff },
    { pos: [7, -1, 3] as const, rot: [0, -Math.PI / 2.4, 0] as const, scale: [10, 7, 1] as const, color: 0xd4d4d8 },
    { pos: [0, -6, 2] as const, rot: [-Math.PI / 2, 0, 0] as const, scale: [12, 5, 1] as const, color: 0x27272a },
    { pos: [0, 2, -7] as const, rot: [0, 0, 0] as const, scale: [14, 8, 1] as const, color: 0xfafafa },
  ]

  const panelMaterials: ThreeTypes.MeshBasicMaterial[] = []
  const plane = new THREE.PlaneGeometry(1, 1)
  for (const cfg of panelConfigs) {
    const mat = new THREE.MeshBasicMaterial({ color: cfg.color, side: THREE.DoubleSide })
    panelMaterials.push(mat)
    const mesh = new THREE.Mesh(plane, mat)
    mesh.position.set(cfg.pos[0], cfg.pos[1], cfg.pos[2])
    mesh.rotation.set(cfg.rot[0], cfg.rot[1], cfg.rot[2])
    mesh.scale.set(cfg.scale[0], cfg.scale[1], cfg.scale[2])
    envScene.add(mesh)
  }

  const target = pmrem.fromScene(envScene, 0.04)
  panelMaterials.forEach(material => material.dispose())
  plane.dispose()
  pmrem.dispose()
  return target
}

interface NaserLogo3DProps {
  hoverActive?: boolean
  pointer: RefObject<{ x: number; y: number }>
  className?: string
}

export function NaserLogo3D({
  hoverActive = false,
  pointer,
  className = "",
}: NaserLogo3DProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [webglFailed, setWebglFailed] = useState(false)
  const hoverRef = useRef(hoverActive)

  useEffect(() => { hoverRef.current = hoverActive }, [hoverActive])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let disposed = false
    let cleanupFn: (() => void) | null = null

    async function init() {
      const THREE = await import("three")
      if (disposed || !container) return

      let renderer: ThreeTypes.WebGLRenderer
      try {
        renderer = new THREE.WebGLRenderer({
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        })
      } catch {
        setWebglFailed(true)
        return
      }

      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      renderer.setPixelRatio(dpr)
      renderer.toneMapping = THREE.ACESFilmicToneMapping
      renderer.toneMappingExposure = 1.15
      renderer.domElement.style.width = "100%"
      renderer.domElement.style.height = "100%"
      renderer.domElement.style.display = "block"
      container.appendChild(renderer.domElement)

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100)
      camera.position.set(0, 0, 7.2)

      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
      let dark = document.documentElement.classList.contains("dark")
      const envRT = createStudioEnvironment(THREE, renderer)
      scene.environment = envRT.texture

      const keyLight = new THREE.DirectionalLight(0xffffff, dark ? 2.3 : 1.9)
      keyLight.position.set(4, 5, 6)
      scene.add(keyLight)

      const rimLight = new THREE.DirectionalLight(0xe4e4e7, dark ? 1.8 : 1.3)
      rimLight.position.set(-5, -2, -4)
      scene.add(rimLight)

      const fillLight = new THREE.PointLight(0xffffff, dark ? 2.4 : 1.6, 16)
      fillLight.position.set(-3, 2.5, 4)
      scene.add(fillLight)

      const pivot = new THREE.Group()
      scene.add(pivot)

      const shapes = buildLogoShapes(THREE)
      const extrudeSettings: ThreeTypes.ExtrudeGeometryOptions = {
        depth: 0.56,
        bevelEnabled: true,
        bevelThickness: 0.11,
        bevelSize: 0.08,
        bevelOffset: 0,
        bevelSegments: 6,
        curveSegments: 30,
      }

      const geometries = shapes.map((shape) => {
        const g = new THREE.ExtrudeGeometry(shape, extrudeSettings)
        g.translate(0, 0, -0.28)
        g.computeVertexNormals()
        return g
      })

      const bodyMaterial = new THREE.MeshPhysicalMaterial({
        color: dark ? 0xededf0 : 0x16161a,
        metalness: dark ? 0.88 : 0.68,
        roughness: dark ? 0.16 : 0.22,
        clearcoat: 1,
        clearcoatRoughness: 0.1,
        reflectivity: 1,
        envMapIntensity: dark ? 1.45 : 1.15,
        transparent: true,
        opacity: 1,
      })

      const edgeMaterial = new THREE.LineBasicMaterial({
        color: dark ? 0xffffff : 0x060606,
        transparent: true,
        opacity: dark ? 0.22 : 0.16,
      })

      const solidGroup = new THREE.Group()
      const edgeGeometries: ThreeTypes.EdgesGeometry[] = []

      for (const geom of geometries) {
        const mesh = new THREE.Mesh(geom, bodyMaterial)
        solidGroup.add(mesh)

        const edges = new THREE.EdgesGeometry(geom, 36)
        edgeGeometries.push(edges)
        const lines = new THREE.LineSegments(edges, edgeMaterial)
        solidGroup.add(lines)
      }
      pivot.add(solidGroup)

      // 3,800 surface particle grains for ambient hover Dissolve effect
      const PARTICLE_COUNT = 3800
      const { basePositions, velocities, seeds, delays } = sampleMeshSurface(THREE, geometries, PARTICLE_COUNT)

      const particleGeo = new THREE.BufferGeometry()
      particleGeo.setAttribute("position", new THREE.BufferAttribute(basePositions, 3))
      particleGeo.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1))

      particleGeo.setAttribute("aVelocity", new THREE.BufferAttribute(velocities, 3))
      particleGeo.setAttribute("aDelay", new THREE.BufferAttribute(delays, 1))

      const particleMat = new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        uniforms: {
          uColor: { value: new THREE.Color(dark ? 0xf8f8fa : 0x111114) },
          uOpacity: { value: 0 },
          uProgress: { value: 0 },
          uTime: { value: 0 },
          uPixelRatio: { value: dpr },
        },
        vertexShader: `
          attribute float aSeed;
          attribute vec3 aVelocity;
          attribute float aDelay;
          uniform float uProgress;
          uniform float uTime;
          uniform float uPixelRatio;
          varying float vAlpha;
          void main() {
            float local = clamp((uProgress - aDelay) / (1.0 - aDelay), 0.0, 1.0);
            float drift = 1.0 - pow(1.0 - local, 3.0);
            vec3 swirl = vec3(sin(uTime * 1.9 + aSeed), cos(uTime * 1.6 + aSeed), sin(uTime * 1.35 + aSeed * 1.5));
            vec4 mvPosition = modelViewMatrix * vec4(position + drift * (aVelocity + 0.24 * swirl), 1.0);
            gl_Position = projectionMatrix * mvPosition;
            float size = (9.5 + 7.5 * sin(aSeed * 3.14)) * uPixelRatio;
            gl_PointSize = clamp(size / max(1.0, -mvPosition.z), 1.5, 8.0);
            vAlpha = 0.5 + 0.5 * cos(aSeed);
          }
        `,
        fragmentShader: `
          uniform vec3 uColor;
          uniform float uOpacity;
          varying float vAlpha;
          void main() {
            vec2 c = gl_PointCoord - vec2(0.5);
            float d = length(c);
            if (d > 0.5) discard;
            float soft = 1.0 - smoothstep(0.14, 0.5, d);
            gl_FragColor = vec4(uColor, soft * vAlpha * uOpacity);
          }
        `,
      })

      const particles = new THREE.Points(particleGeo, particleMat)
      particles.visible = false
      pivot.add(particles)

      function resize() {
        if (!container) return
        const w = Math.max(1, container.clientWidth)
        const h = Math.max(1, container.clientHeight)
        camera.aspect = w / h
        camera.position.z = w < 480 ? 8.4 : 7.0
        camera.updateProjectionMatrix()
        renderer.setSize(w, h, false)
        if (reducedMotion.matches) renderer.render(scene, camera)
      }
      resize()

      function syncTheme() {
        const nextDark = document.documentElement.classList.contains("dark")
        if (nextDark === dark) return
        dark = nextDark
        bodyMaterial.color.setHex(dark ? 0xededf0 : 0x16161a)
        bodyMaterial.metalness = dark ? 0.88 : 0.68
        bodyMaterial.roughness = dark ? 0.16 : 0.22
        bodyMaterial.envMapIntensity = dark ? 1.45 : 1.15
        edgeMaterial.color.setHex(dark ? 0xffffff : 0x060606)
        particleMat.uniforms.uColor.value.setHex(dark ? 0xf8f8fa : 0x111114)
        keyLight.intensity = dark ? 2.3 : 1.9
        rimLight.intensity = dark ? 1.8 : 1.3
        fillLight.intensity = dark ? 2.4 : 1.6
      }

      const resizeObserver = new ResizeObserver(resize)
      resizeObserver.observe(container)

      const themeObserver = new MutationObserver(() => {
        syncTheme()
        if (reducedMotion.matches) renderer.render(scene, camera)
      })
      themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
      })

      let visible = true
      const intersectionObserver = new IntersectionObserver(
        (entries) => {
          visible = entries[0]?.isIntersecting ?? true
          syncPlayback()
        },
        { threshold: 0.02 },
      )
      intersectionObserver.observe(container)

      let rafId = 0
      let prevTime = performance.now()
      let dissolveProgress = 0
      let currentRotY = -0.22
      let currentRotX = 0.12

      let elapsed = 0

      function renderFrame(now: number) {
        rafId = 0
        const dt = Math.min(0.05, (now - prevTime) / 1000)
        prevTime = now
        if (!visible || document.hidden) return

        elapsed += dt
        const timeSec = elapsed

        if (!reducedMotion.matches) {
          // Gentle 3/4 architectural breathing sway so the iconic Naser logo stays recognizable at all times
          const swayYaw = -0.22 + Math.sin(timeSec * 0.45) * 0.28
          const px = pointer.current.x
          const py = pointer.current.y
          const targetY = swayYaw + px * 0.34
          const targetX = 0.12 + Math.cos(timeSec * 0.36) * 0.08 + py * 0.22
          currentRotY += (targetY - currentRotY) * (1 - Math.exp(-dt * 4.5))
          currentRotX += (targetX - currentRotX) * (1 - Math.exp(-dt * 4.5))

          pivot.rotation.y = currentRotY
          pivot.rotation.x = currentRotX
          pivot.position.y = Math.sin(timeSec * 0.95) * 0.07

          const blend = 1 - Math.exp(-dt * 5)
          fillLight.position.x += (-3 + px * 3 - fillLight.position.x) * blend
          fillLight.position.y += (2.5 - py * 2.4 - fillLight.position.y) * blend

          // Smooth hover-driven Dissolve <-> Gather interpolation
          const targetDissolve = hoverRef.current ? 0.96 : 0
          const rate = hoverRef.current ? 2.2 : 2.5
          dissolveProgress += (targetDissolve - dissolveProgress) * (1 - Math.exp(-dt * rate))

          if (dissolveProgress > 0.006) {
            particles.visible = true
            particleMat.uniforms.uProgress.value = dissolveProgress
            particleMat.uniforms.uTime.value = timeSec
            const solidAlpha = Math.max(0.08, 1 - dissolveProgress * 1.25)
            bodyMaterial.opacity = solidAlpha
            edgeMaterial.opacity = (dark ? 0.22 : 0.16) * Math.max(0.2, 1 - dissolveProgress * 0.8)
            particleMat.uniforms.uOpacity.value = Math.min(1, dissolveProgress * 1.45)
          } else {
            dissolveProgress = 0
            particles.visible = false
            bodyMaterial.opacity = 1
            edgeMaterial.opacity = dark ? 0.22 : 0.16
            particleMat.uniforms.uOpacity.value = 0
          }
        } else {
          pivot.rotation.y = -0.28
          pivot.rotation.x = 0.14
          pivot.position.y = 0
          particles.visible = false
          dissolveProgress = 0
          bodyMaterial.opacity = 1
          edgeMaterial.opacity = dark ? 0.22 : 0.16
        }

        renderer.render(scene, camera)
        if (!reducedMotion.matches) rafId = window.requestAnimationFrame(renderFrame)
      }

      function syncPlayback() {
        window.cancelAnimationFrame(rafId)
        prevTime = performance.now()
        if (visible && !document.hidden) renderFrame(prevTime)
      }

      reducedMotion.addEventListener("change", syncPlayback)
      document.addEventListener("visibilitychange", syncPlayback)
      syncPlayback()

      cleanupFn = () => {
        reducedMotion.removeEventListener("change", syncPlayback)
        document.removeEventListener("visibilitychange", syncPlayback)
        if (rafId) window.cancelAnimationFrame(rafId)
        resizeObserver.disconnect()
        themeObserver.disconnect()
        intersectionObserver.disconnect()
        geometries.forEach((g) => g.dispose())
        edgeGeometries.forEach((g) => g.dispose())
        particleGeo.dispose()
        particleMat.dispose()
        bodyMaterial.dispose()
        edgeMaterial.dispose()
        envRT.dispose()
        renderer.dispose()
        if (renderer.domElement.parentNode === container) container.removeChild(renderer.domElement)
      }
    }

    init()

    return () => {
      disposed = true
      cleanupFn?.()
    }
  }, [pointer])

  if (webglFailed) return null

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`pointer-events-none select-none transition-opacity duration-500 ${className}`}
    />
  )
}
