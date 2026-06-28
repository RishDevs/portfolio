"use client"

import { useMemo, useRef, useState, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

/* ------------------------------------------------------------------
   Flowing "neural aurora" fragment shader.
   Layered domain-warped fractal noise tinted with the brand palette,
   warped softly toward the cursor. Deep-navy base, green/cyan/violet.
------------------------------------------------------------------- */

const vertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragment = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2  uMouse;
  uniform float uAspect;

  // --- simplex noise (Ashima / IQ) ---
  vec3 mod289(vec3 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
  vec2 mod289(vec2 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
  vec3 permute(vec3 x){ return mod289(((x*34.0)+1.0)*x); }
  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0,0.0) : vec2(0.0,1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0))
           + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
                            dot(x12.zw,x12.zw)), 0.0);
    m = m*m; m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  float fbm(vec2 p){
    float v = 0.0;
    float a = 0.5;
    for(int i = 0; i < 5; i++){
      v += a * snoise(p);
      p *= 2.0;
      a *= 0.5;
    }
    return v;
  }

  void main(){
    vec2 uv = vUv;
    vec2 p = (uv - 0.5);
    p.x *= uAspect;

    float t = uTime * 0.045;

    // domain warp
    vec2 q = vec2(fbm(p * 1.6 + t), fbm(p * 1.6 - t + 4.7));
    vec2 r = vec2(
      fbm(p * 1.8 + 1.5 * q + vec2(1.7, 9.2) + 0.15 * t),
      fbm(p * 1.8 + 1.5 * q + vec2(8.3, 2.8) - 0.12 * t)
    );
    float f = fbm(p * 2.0 + 2.2 * r);

    // cursor glow
    vec2 m = uMouse; m.x *= uAspect;
    float d = distance(p, m);
    float glow = smoothstep(0.55, 0.0, d) * 0.5;
    f += glow * (0.6 + 0.4 * sin(uTime * 0.6));

    // palette — Cobalt & Chalk: ink base, electric cobalt energy, tangerine flares
    vec3 base   = vec3(0.027, 0.031, 0.059); // #07080F
    vec3 deep   = vec3(0.043, 0.063, 0.188); // #0B1030 cobalt-dark
    vec3 cobalt = vec3(0.153, 0.278, 1.000);  // #2747FF
    vec3 orange = vec3(1.000, 0.302, 0.180);  // #FF4D2E

    vec3 col = mix(base, deep, smoothstep(-0.6, 0.6, f));
    col = mix(col, cobalt * 0.85, smoothstep(0.05, 0.78, f) * 0.9);
    col = mix(col, orange * 0.4, smoothstep(0.55, 1.0, length(r)) * 0.42);
    col += cobalt * glow * 0.55;
    col += orange * glow * 0.16;

    // vignette
    float vig = smoothstep(1.25, 0.25, length((uv - 0.5) * vec2(uAspect, 1.0)));
    col *= 0.35 + 0.65 * vig;

    // subtle scanline grain via noise
    col += (snoise(uv * 900.0 + uTime) * 0.012);

    gl_FragColor = vec4(col, 1.0);
  }
`

function AuroraPlane() {
  const mat = useRef<THREE.ShaderMaterial>(null)
  const { viewport, size } = useThree()
  const mouse = useRef(new THREE.Vector2(0, 0))
  const target = useRef(new THREE.Vector2(0, 0))

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uAspect: { value: size.width / size.height },
    }),
    [] // eslint-disable-line react-hooks/exhaustive-deps
  )

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      target.current.set(
        (e.clientX / window.innerWidth - 0.5),
        -(e.clientY / window.innerHeight - 0.5)
      )
    }
    window.addEventListener("pointermove", onMove)
    return () => window.removeEventListener("pointermove", onMove)
  }, [])

  useFrame((_, delta) => {
    if (!mat.current) return
    uniforms.uTime.value += delta
    uniforms.uAspect.value = size.width / size.height
    mouse.current.lerp(target.current, 0.05)
    uniforms.uMouse.value.copy(mouse.current)
  })

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={mat}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
      />
    </mesh>
  )
}

export function ShaderBackground() {
  const [reduce, setReduce] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReduce(mq.matches)
    const fn = () => setReduce(mq.matches)
    mq.addEventListener("change", fn)
    return () => mq.removeEventListener("change", fn)
  }, [])

  if (reduce) {
    return (
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 70% 20%, #0c1d3e 0%, #03102a 40%, #020a19 100%)",
        }}
        aria-hidden
      />
    )
  }

  return (
    <Canvas
      className="absolute inset-0"
      dpr={[1, 1.75]}
      gl={{ antialias: false, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 1], fov: 50 }}
      aria-hidden
    >
      <AuroraPlane />
    </Canvas>
  )
}
