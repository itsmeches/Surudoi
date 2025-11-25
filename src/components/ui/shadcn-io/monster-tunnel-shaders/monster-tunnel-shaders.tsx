"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { cn } from "@/lib/utils";

export interface MonsterTunnelShadersProps extends React.HTMLAttributes<HTMLDivElement> {
  speed?: number;
  rotationSpeed?: number;
  segments?: number;
  intensity?: number;
  zoomSpeed?: number; // zoom effect
  onFirstFrame?: () => void; // callback to notify parent
}

// FORCE FULL SCREEN (Clip Space)
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;

  uniform float iTime;
  uniform vec2 iResolution;
  uniform float u_speed;
  uniform float u_rotationSpeed;
  uniform float u_segments;
  uniform float u_intensity;
  uniform float u_zoom;

  varying vec2 vUv;

  const float PI = 3.1415926535;

  vec2 rot(vec2 p, float r) {
    mat2 m = mat2(cos(r), sin(r), -sin(r), cos(r));
    return m * p;
  }

  vec2 pmod(vec2 p, float n) {
    float np = 2.0 * PI / n;
    float r = atan(p.x, p.y) - 0.5 * np;
    r = mod(r, np) - 0.5 * np;
    return length(p) * vec2(cos(r), sin(r));
  }

  float cube(vec3 p, vec3 s) {
    vec3 q = abs(p);
    vec3 m = max(s - q, 0.0);
    return length(max(q - s, 0.0)) - min(min(m.x, m.y), m.z);
  }

  float dist(vec3 p) {
    p.z -= u_speed * iTime * u_zoom;
    p.xy = rot(p.xy, 1.0 * p.z);
    p.xy = pmod(p.xy, u_segments);
    float k = 0.7;
    float zid = floor(p.z * k);
    p = mod(p, k) - 0.5 * k;

    for (int i = 0; i < 4; i++) {
      p = abs(p) - 0.3;
      p.xy = rot(p.xy, 1.0 + zid + 0.1 * u_rotationSpeed * iTime);
      p.xz = rot(p.xz, 1.0 + 4.7 * zid + 0.3 * u_rotationSpeed * iTime);
    }

    return min(cube(p, vec3(0.3)), length(p) - 0.4);
  }

  vec3 hsl2rgb(vec3 hsl) {
      float c = (1.0 - abs(2.0*hsl.z - 1.0)) * hsl.y;
      float x = c * (1.0 - abs(mod(hsl.x*6.0, 2.0) - 1.0));
      float m = hsl.z - c/2.0;
      vec3 rgb;
      if (0.0 <= hsl.x && hsl.x < 1.0/6.0) rgb = vec3(c, x, 0.0);
      else if (1.0/6.0 <= hsl.x && hsl.x < 2.0/6.0) rgb = vec3(x, c, 0.0);
      else if (2.0/6.0 <= hsl.x && hsl.x < 3.0/6.0) rgb = vec3(0.0, c, x);
      else if (3.0/6.0 <= hsl.x && hsl.x < 4.0/6.0) rgb = vec3(0.0, x, c);
      else if (4.0/6.0 <= hsl.x && hsl.x < 5.0/6.0) rgb = vec3(x, 0.0, c);
      else rgb = vec3(c, 0.0, x);
      return rgb + vec3(m);
  }

  void main() {
    vec2 uv = vUv * 2.0 - 1.0;
    uv.x *= iResolution.x / iResolution.y;
    uv = rot(uv, u_rotationSpeed * iTime);

    vec3 ro = vec3(0.0, 0.0, 0.1);
    vec3 rd = normalize(vec3(uv, 0.0) - ro);

    float t = 2.0;
    float d = 0.0;
    float ac = 0.0;

    for (int i = 0; i < 66; i++) {
      d = dist(ro + rd * t) * 0.2;
      d = max(0.0001, abs(d));
      t += d;
      if (d < 0.001) ac += 0.1;
    }

    vec3 col = hsl2rgb(vec3(12.0/360.0, 0.76, 0.61)) * 0.2 * vec3(ac) * u_intensity;
    vec3 pn = ro + rd * t;
    float kn = 0.5;
    pn.z += -1.5 * iTime * u_speed * u_zoom;
    pn.z = mod(pn.z, kn) - 0.5 * kn;
    float em = clamp(0.01 / pn.z, 0.0, 100.0);
    col += 3.0 * em * hsl2rgb(vec3(173.0/360.0, 0.58, 0.39)) * u_intensity;

    col = clamp(col, 0.0, 1.0);
    gl_FragColor = vec4(col, 1.0);
  }
`;

const TunnelMesh = ({
  speed,
  rotationSpeed,
  segments,
  intensity,
  zoom,
  onFirstFrame,
}: Required<Omit<MonsterTunnelShadersProps, "className">> & { zoom: number; onFirstFrame?: () => void }) => {
  const mesh = useRef<THREE.Mesh>(null);
  const shaderStarted = useRef(false);

  const uniforms = useMemo(
    () => ({
      iTime: { value: 0 },
      iResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      u_speed: { value: speed },
      u_rotationSpeed: { value: rotationSpeed },
      u_segments: { value: segments },
      u_intensity: { value: intensity },
      u_zoom: { value: zoom },
    }),
    [speed, rotationSpeed, segments, intensity, zoom]
  );

  useFrame((state) => {
    if (!shaderStarted.current) {
      onFirstFrame?.();
      shaderStarted.current = true;
    }

    if (mesh.current) {
      const material = mesh.current.material as THREE.ShaderMaterial;
      material.uniforms.iTime.value = state.clock.elapsedTime;
      material.uniforms.iResolution.value.set(state.size.width, state.size.height);
    }
  });

  return (
    <mesh ref={mesh}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthTest={false}
      />
    </mesh>
  );
};

export const MonsterTunnelShaders = ({
  className,
  speed = 1.0,
  rotationSpeed = 1.0,
  segments = 6.0,
  intensity = 1.0,
  zoomSpeed = 1.2,
  onFirstFrame,
  ...props
}: MonsterTunnelShadersProps) => {
  return (
    <div className={cn("w-full h-full bg-black", className)} {...props}>
      <Canvas resize={{ scroll: false }}>
        <TunnelMesh
          speed={speed}
          rotationSpeed={rotationSpeed}
          segments={segments}
          intensity={intensity}
          zoom={zoomSpeed}
          onFirstFrame={onFirstFrame}
        />
      </Canvas>
    </div>
  );
};

MonsterTunnelShaders.displayName = "MonsterTunnelShaders";

export default MonsterTunnelShaders;
