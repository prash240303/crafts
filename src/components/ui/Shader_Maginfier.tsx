"use client";

import React, { useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { MAGNIFIER_URI } from "../../lib/constants"; // Adjust path as needed

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
varying vec2 vUv;
uniform sampler2D u_bgTex;
uniform sampler2D u_dispTex;
uniform vec2 u_resolution;
uniform vec2 u_lensPos; 
uniform float u_radius; 

void main() {
    vec2 fragCoord = vUv * u_resolution;
    vec4 bgColor = texture2D(u_bgTex, vUv);

    // --- Shadow Logic ---
    float shadowOffset = 8.0;
    vec2 shadowPos = u_lensPos + vec2(0.0, -shadowOffset);
    float shadowDist = length(fragCoord - shadowPos) - u_radius;
    float shadow = smoothstep(25.0, -5.0, shadowDist);
    shadow *= 0.6;
    bgColor.rgb *= 1.0 - shadow * 0.2;

    vec4 color = bgColor;

    // --- Mask Logic ---
    float dist = length(fragCoord - u_lensPos) - u_radius;
    float edgeSoftness = 1.5;
    float mask = smoothstep(edgeSoftness, -edgeSoftness, dist);

    if (mask > 0.01) {
        // 1. ZOOM LOGIC
        float zoomFactor = 1.2; // Higher = more zoom
        
        // Calculate UV relative to the lens center
        vec2 lensUvCenter = u_lensPos / u_resolution;
        vec2 zoomedUv = (vUv - lensUvCenter) / zoomFactor + lensUvCenter;

        // 2. DISPLACEMENT (From your texture)
        vec2 dispUv = (fragCoord - u_lensPos) / (u_radius * 2.0) + 0.5;
        vec4 dispMap = texture2D(u_dispTex, dispUv);
        vec2 direction = (dispMap.rg - 0.5) * 2.0;

        // 3. CHROMATIC ABERRATION (Applied to the zoomed UVs)
        vec2 offsetR = direction * (22.0 / u_resolution);
        vec2 offsetG = direction * (20.0 / u_resolution);
        vec2 offsetB = direction * (18.0 / u_resolution);

        float r = texture2D(u_bgTex, zoomedUv + offsetR).r;
        float g = texture2D(u_bgTex, zoomedUv + offsetG).g;
        float b = texture2D(u_bgTex, zoomedUv + offsetB).b;

        vec3 magnifiedColor = vec3(r, g, b);

        // Mix result
        color.rgb = mix(color.rgb, magnifiedColor, mask);
        
        // Glass rim
        float border = smoothstep(4.0, 0.0, abs(dist));
        color.rgb += border * 0.15;
    }

    gl_FragColor = color;
}
`;

function Scene({ bgImage }: { bgImage: string }) {
  // Load the textures
  const [bgTex, dispTex] = useTexture([bgImage, MAGNIFIER_URI]);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { size, viewport } = useThree();

  const smoothedPos = useRef(
    new THREE.Vector2(size.width / 2, size.height / 2),
  );

  const { gl } = useThree();

  const maxAnisotropy = gl.capabilities.getMaxAnisotropy();

  bgTex.anisotropy = maxAnisotropy;
  dispTex.anisotropy = maxAnisotropy;

  useFrame((state) => {
    if (!materialRef.current) return;

    // 1. Convert R3F normalized pointer (-1 to +1) to pixel coordinates
    // R3F pointer: bottom-left is (-1, -1), top-right is (1, 1)
    // Screen pixels: bottom-left is (0, 0)
    const targetX = (state.pointer.x * 0.5 + 0.5) * size.width;
    const targetY = (state.pointer.y * 0.5 + 0.5) * size.height;

    // 2. Smoothly interpolate (lerp) toward the target
    // Increase 0.1 for faster follow, decrease for more "lag/weight"
    smoothedPos.current.x = THREE.MathUtils.lerp(
      smoothedPos.current.x,
      targetX,
      0.15,
    );
    smoothedPos.current.y = THREE.MathUtils.lerp(
      smoothedPos.current.y,
      targetY,
      0.15,
    );

    // 3. Update the shader uniform
    materialRef.current.uniforms.u_lensPos.value.copy(smoothedPos.current);

    // Ensure resolution is always up to date if window is resized
    materialRef.current.uniforms.u_resolution.value.set(
      size.width,
      size.height,
    );
  });

  return (
    <mesh
      onPointerDown={(e) => {
        if (e.target) {
          (e.target as any).setPointerCapture(e.pointerId);
        }
      }}
      onPointerUp={(e) => {
        if (e.target) {
          (e.target as any).releasePointerCapture(e.pointerId);
        }
      }}
      // Notice we entirely removed onPointerLeave!
    >
      <planeGeometry args={[viewport.width, viewport.height]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          u_bgTex: { value: bgTex },
          u_dispTex: { value: dispTex },
          u_resolution: { value:  new THREE.Vector2(size.width, size.height) },
          u_lensPos: {
            value: new THREE.Vector2(size.width / 2, size.height / 2),
          },
          u_radius: { value: 100 },
        }}
      />
    </mesh>
  );
}

export default function ShaderMagnifier({ bgImage }: { bgImage: string }) {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <Canvas
        gl={{ powerPreference: "high-performance", alpha: false }}
        dpr={[1, 4]} // or even [1, 3] if your GPU can handle it
      >
        <Scene bgImage={bgImage} />
      </Canvas>
    </div>
  );
}
