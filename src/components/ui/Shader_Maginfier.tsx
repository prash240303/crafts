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
    // Convert UV to pixel coordinates
    vec2 fragCoord = vUv * u_resolution;
    
    // Sample the default background
    vec4 color = texture2D(u_bgTex, vUv);

    // 1. Circle SDF: Distance from current pixel to lens center minus radius
    float dist = length(fragCoord - u_lensPos) - u_radius;

    // 2. Smooth mask for anti-aliasing (prevents jagged edges)
    float edgeSoftness = 1.5;
    float mask = smoothstep(edgeSoftness, -edgeSoftness, dist);

    // Only run expensive math if we are inside the circle
    if (mask > 0.01) {
        // Calculate UV for the displacement texture (normalized 0-1 over the circle)
        vec2 dispUv = (fragCoord - u_lensPos) / (u_radius * 2.0) + 0.5;
        
        // Sample displacement map
        vec4 dispMap = texture2D(u_dispTex, dispUv);
        
        // Convert displacement to vector direction (-1 to 1)
        vec2 direction = (dispMap.rg - 0.5) * 2.0;

        // 3. Chromatic Aberration offsets
        vec2 offsetR = direction * (22.0 / u_resolution);
        vec2 offsetG = direction * (20.0 / u_resolution);
        vec2 offsetB = direction * (18.0 / u_resolution);

        float r = texture2D(u_bgTex, vUv + offsetR).r;
        float g = texture2D(u_bgTex, vUv + offsetG).g;
        float b = texture2D(u_bgTex, vUv + offsetB).b;

        vec3 magnifiedColor = vec3(r, g, b);

        // Mix the background with the magnified result based on the mask
        color.rgb = mix(color.rgb, magnifiedColor, mask);
        
        // 4. Subtle glass rim highlight
        float border = smoothstep(3.0, 0.0, abs(dist));
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

  const smoothedPos = useRef(new THREE.Vector2(size.width / 2, size.height / 2));


  useFrame((state) => {
    if (!materialRef.current) return;

    // 1. Convert R3F normalized pointer (-1 to +1) to pixel coordinates
    // R3F pointer: bottom-left is (-1, -1), top-right is (1, 1)
    // Screen pixels: bottom-left is (0, 0)
    const targetX = (state.pointer.x * 0.5 + 0.5) * size.width;
    const targetY = (state.pointer.y * 0.5 + 0.5) * size.height;

    // 2. Smoothly interpolate (lerp) toward the target
    // Increase 0.1 for faster follow, decrease for more "lag/weight"
    smoothedPos.current.x = THREE.MathUtils.lerp(smoothedPos.current.x, targetX, 0.15);
    smoothedPos.current.y = THREE.MathUtils.lerp(smoothedPos.current.y, targetY, 0.15);

    // 3. Update the shader uniform
    materialRef.current.uniforms.u_lensPos.value.copy(smoothedPos.current);
    
    // Ensure resolution is always up to date if window is resized
    materialRef.current.uniforms.u_resolution.value.set(size.width, size.height);
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
          u_resolution: { value: new THREE.Vector2(size.width, size.height) },
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
      <Canvas gl={{ powerPreference: "high-performance", alpha: false }}>
        <Scene bgImage={bgImage} />
      </Canvas>
    </div>
  );
}
