'use client'

import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// ─── Vertex shader — fullscreen quad ────────────────────────────────────────
const vertexShader = /* glsl */`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`

// ─── Fragment shader — 2D glass bolt over text ──────────────────────────────
// Mask + pre-blurred mask act as a distance field. Gradient of the blur gives
// the normal direction. Refraction shifts text sampling along that normal,
// with R/G/B at different magnitudes for chromatic dispersion.
const fragmentShader = /* glsl */`
  precision highp float;

  varying vec2 vUv;
  uniform sampler2D u_text;
  uniform sampler2D u_mask;
  uniform sampler2D u_blur;
  uniform vec2  u_resolution;

  void main() {
    vec2 uv = vUv;
    float aspect = u_resolution.x / u_resolution.y;

    // ── Background text ───────────────────────────────────────────────────
    vec3 bg = texture2D(u_text, uv).rgb;

    // ── Sharp mask: 1 inside the bolt, 0 outside ─────────────────────────
    float mask = texture2D(u_mask, uv).r;

    // ── Blurred mask acts as a smooth distance field ─────────────────────
    // Inside  → blur ≈ 1.0
    // Edge    → blur ≈ 0.5
    // Outside → blur ≈ 0.0
    float blur = texture2D(u_blur, uv).r;

    // ── Gradient of the blur = inward-pointing direction (toward the bolt)
    float px = 2.0 / u_resolution.y;
    vec2 grad = vec2(
      texture2D(u_blur, uv + vec2(px, 0.0)).r - texture2D(u_blur, uv - vec2(px, 0.0)).r,
      texture2D(u_blur, uv + vec2(0.0, px)).r - texture2D(u_blur, uv - vec2(0.0, px)).r
    );
    vec2 n = length(grad) > 0.0001 ? normalize(grad) : vec2(0.0, 1.0);

    // ── Refraction strength — bell curve peaking at the edge (blur≈0.5) ──
    // 4·blur·(1-blur) is a parabola: 0 at blur=0 and blur=1, peaks at 0.5
    float refrStrength = blur * (1.0 - blur) * 4.0;

    // Refraction direction = inward (toward bolt interior), aspect-corrected
    vec2 refrDir = n * vec2(1.0 / aspect, 1.0);

    // ── Chromatic dispersion: R bends least, B bends most ─────────────────
    float amp = 0.075 * refrStrength;
    vec2 offR = refrDir * amp * 0.45;
    vec2 offG = refrDir * amp * 1.00;
    vec2 offB = refrDir * amp * 1.70;

    float r = texture2D(u_text, uv + offR).r;
    float g = texture2D(u_text, uv + offG).g;
    float b = texture2D(u_text, uv + offB).b;
    vec3 refracted = vec3(r, g, b);

    // ── Glass body — slight darkening with cool tint ─────────────────────
    vec3 glassBody = refracted * 0.70 * vec3(0.92, 0.97, 1.08) + vec3(0.01, 0.02, 0.05);

    // Composite the body inside the bolt
    vec3 color = mix(bg, glassBody, mask);

    // ── Bright rim at the silhouette — a band centred on blur ≈ 0.5 ──────
    // Wider, brighter than before for the heavy white bevel in the reference
    float rim = exp(-pow((blur - 0.5) * 7.0, 2.0));
    color = mix(color, vec3(1.0), rim * 0.95);

    // ── Inner bevel — cool soft glow just inside the rim ─────────────────
    float bevel = smoothstep(0.55, 0.78, blur) - smoothstep(0.78, 1.0, blur) * 0.55;
    color += bevel * vec3(0.55, 0.72, 1.0) * 0.55;

    // ── Outer halo — soft glow outside the bolt ──────────────────────────
    float halo = smoothstep(0.0, 0.4, blur) - smoothstep(0.4, 0.55, blur);
    color += halo * vec3(0.30, 0.45, 0.85) * 0.20;

    // ── Fake-3D specular highlights ──────────────────────────────────────
    // fakeN tilts outward near the edge, points at camera in the centre
    float tilt = 1.0 - blur;
    vec3 fakeN  = normalize(vec3(n * (1.0 - blur * 0.4), 0.45 + blur * 0.55));
    vec3 lightA = normalize(vec3( 0.45,  0.65, 1.0));
    vec3 lightB = normalize(vec3(-0.40, -0.20, 1.0));

    float specA = pow(max(dot(fakeN, lightA), 0.0), 14.0) * mask;
    float specB = pow(max(dot(fakeN, lightB), 0.0), 28.0) * mask;
    color += specA * vec3(1.0) * 0.90;
    color += specB * vec3(0.88, 0.94, 1.10) * 0.55;

    // Reinhard tonemap
    color = color / (color + 0.95) * 1.95;

    gl_FragColor = vec4(color, 1.0);
  }
`

// ─── Build the 3 canvas textures (text / sharp mask / blurred mask) ─────────
function buildTextures(w: number, h: number) {
  // 1. Background text
  const textCanvas = document.createElement('canvas')
  textCanvas.width  = w
  textCanvas.height = h
  const tctx = textCanvas.getContext('2d')!
  tctx.fillStyle = '#000000'
  tctx.fillRect(0, 0, w, h)
  tctx.fillStyle    = '#ffffff'
  tctx.textAlign    = 'center'
  tctx.textBaseline = 'middle'
  tctx.font         = `900 ${Math.round(h * 0.6)}px sans-serif`
  tctx.fillText('CRAFTS', w / 2, h / 2)

  const textTex = new THREE.CanvasTexture(textCanvas)
  textTex.minFilter = THREE.LinearFilter
  textTex.magFilter = THREE.LinearFilter
  textTex.needsUpdate = true

  // 2. Sharp lightning bolt mask (white shape on black)
  const cx = w / 2
  const cy = h / 2
  // Scale relative to height — bolt height ≈ 90% of screen
  const sy = h / 2
  // Aspect-correct the width so the bolt isn't stretched on widescreens
  const sx = sy

  const maskCanvas = document.createElement('canvas')
  maskCanvas.width  = w
  maskCanvas.height = h
  const mctx = maskCanvas.getContext('2d')!
  mctx.fillStyle = '#000000'
  mctx.fillRect(0, 0, w, h)
  mctx.fillStyle = '#ffffff'

  // Lightning bolt vertices (clockwise, canvas Y is top-down → invert sign)
  // World y=+0.90 (top) → canvas-y = cy - 0.90·sy (near top)
  mctx.beginPath()
  mctx.moveTo(cx + 0.10 * sx, cy - 0.90 * sy)   // top tip
  mctx.lineTo(cx + 0.50 * sx, cy - 0.08 * sy)   // right shoulder
  mctx.lineTo(cx + 0.08 * sx, cy - 0.08 * sy)   // inner notch top
  mctx.lineTo(cx - 0.10 * sx, cy + 0.90 * sy)   // bottom tip
  mctx.lineTo(cx - 0.50 * sx, cy + 0.08 * sy)   // left shoulder
  mctx.lineTo(cx - 0.08 * sx, cy + 0.08 * sy)   // inner notch bottom
  mctx.closePath()
  mctx.fill()

  const maskTex = new THREE.CanvasTexture(maskCanvas)
  maskTex.minFilter = THREE.LinearFilter
  maskTex.magFilter = THREE.LinearFilter
  maskTex.needsUpdate = true

  // 3. Blurred mask — acts as a distance field
  const blurCanvas = document.createElement('canvas')
  blurCanvas.width  = w
  blurCanvas.height = h
  const bctx = blurCanvas.getContext('2d')!
  bctx.fillStyle = '#000000'
  bctx.fillRect(0, 0, w, h)
  bctx.filter = `blur(${Math.round(h * 0.035)}px)`
  bctx.drawImage(maskCanvas, 0, 0)
  bctx.filter = 'none'

  const blurTex = new THREE.CanvasTexture(blurCanvas)
  blurTex.minFilter = THREE.LinearFilter
  blurTex.magFilter = THREE.LinearFilter
  blurTex.needsUpdate = true

  return { textTex, maskTex, blurTex }
}

// ─── Fullscreen quad with the glass shader ──────────────────────────────────
function LightningGlass() {
  const matRef = useRef<THREE.ShaderMaterial | null>(null) as React.MutableRefObject<THREE.ShaderMaterial | null>
  const { size } = useThree()

  const textures = useMemo(() => {
    const dpr = Math.min(2, typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1)
    const w = Math.max(1, Math.floor(size.width  * dpr))
    const h = Math.max(1, Math.floor(size.height * dpr))
    return buildTextures(w, h)
  }, [size.width, size.height])

  const uniforms = useMemo(() => ({
    u_text:       { value: textures.textTex },
    u_mask:       { value: textures.maskTex },
    u_blur:       { value: textures.blurTex },
    u_resolution: { value: new THREE.Vector2(size.width, size.height) },
  }), [textures]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!matRef.current) return
    matRef.current.uniforms.u_resolution.value.set(size.width, size.height)
    matRef.current.uniforms.u_text.value = textures.textTex
    matRef.current.uniforms.u_mask.value = textures.maskTex
    matRef.current.uniforms.u_blur.value = textures.blurTex
  }, [size.width, size.height, textures])

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  )
}

// ─── Root ────────────────────────────────────────────────────────────────────
export default function FractalGlassBox() {
  return (
    <div className="w-full h-screen bg-black overflow-hidden">
      <Canvas
        orthographic
        camera={{ position: [0, 0, 1], zoom: 1 }}
        gl={{ powerPreference: 'high-performance', alpha: false, antialias: true }}
        dpr={[1, 2]}
        style={{ width: '100%', height: '100%' }}
      >
        <LightningGlass />
      </Canvas>
    </div>
  )
}
