"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const vertexShader = `
  uniform float uTime;
  uniform vec2 uPointer;
  varying vec2 vUv;
  varying float vWave;
  void main() {
    vUv = uv;
    vec3 p = position;
    float wave = sin(p.x * 1.15 + uTime * .75) * .38;
    wave += sin(p.x * 2.7 - uTime * .45) * .13;
    wave += cos(p.y * 2.3 + uTime * .35) * .14;
    p.z += wave + uPointer.x * p.y * .12;
    p.y += sin(p.x * .72 + uTime * .3) * .2 + uPointer.y * .12;
    vWave = wave;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  varying vec2 vUv;
  varying float vWave;
  void main() {
    vec3 deep = vec3(.12,.025,.24);
    vec3 violet = vec3(.58,.17,.98);
    vec3 hot = vec3(1.0,.30,.67);
    float edge = smoothstep(0.0,.16,vUv.y) * smoothstep(0.0,.16,1.0-vUv.y);
    float stripe = .55 + .45 * sin((vUv.x * 18.0 - uTime) + vWave * 8.0);
    vec3 color = mix(deep, violet, vUv.x + vWave * .3);
    color = mix(color, hot, pow(max(vWave,0.0),2.0) * .8 + stripe * .08);
    gl_FragColor = vec4(color, edge * .84);
  }
`;

export function FabricScene() {
  const mount = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const host = mount.current;
    if (!host) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, innerWidth / innerHeight, .1, 50);
    camera.position.set(0, 0, 8.5);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: !reduced, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.6));
    renderer.setSize(innerWidth, innerHeight);
    renderer.setClearColor(0x000000, 0);
    host.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);
    const uniforms = { uTime: { value: 0 }, uPointer: { value: new THREE.Vector2() } };
    const geometry = new THREE.PlaneGeometry(6.4, 3.5, reduced ? 45 : 110, reduced ? 25 : 58);
    const material = new THREE.ShaderMaterial({ vertexShader, fragmentShader, uniforms, transparent: true, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false });
    const fabric = new THREE.Mesh(geometry, material);
    fabric.rotation.set(-.18, -.52, -.14);
    group.add(fabric);

    const wire = new THREE.Mesh(geometry.clone(), new THREE.ShaderMaterial({
      vertexShader, fragmentShader: `varying vec2 vUv; varying float vWave; void main(){ gl_FragColor=vec4(.70,.42,1.0,.16); }`, uniforms,
      transparent: true, wireframe: true, blending: THREE.AdditiveBlending, depthWrite: false,
    }));
    wire.rotation.copy(fabric.rotation); wire.scale.setScalar(1.012); group.add(wire);

    const dustGeometry = new THREE.BufferGeometry();
    const count = reduced ? 180 : 620;
    const points = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      points[i * 3] = (Math.random() - .5) * 13;
      points[i * 3 + 1] = (Math.random() - .5) * 8;
      points[i * 3 + 2] = (Math.random() - .5) * 5 - 1;
    }
    dustGeometry.setAttribute("position", new THREE.BufferAttribute(points, 3));
    const dust = new THREE.Points(dustGeometry, new THREE.PointsMaterial({ color: 0x8d55d9, size: .014, transparent: true, opacity: .5 }));
    scene.add(dust);

    const pointer = new THREE.Vector2();
    const onPointer = (event: PointerEvent) => pointer.set((event.clientX / innerWidth - .5) * 2, (event.clientY / innerHeight - .5) * 2);
    const onResize = () => { camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); renderer.setSize(innerWidth, innerHeight); };
    addEventListener("pointermove", onPointer, { passive: true }); addEventListener("resize", onResize);

    const clock = new THREE.Clock(); let frame = 0;
    const draw = () => {
      const time = clock.getElapsedTime();
      uniforms.uTime.value = reduced ? .7 : time;
      uniforms.uPointer.value.lerp(pointer, .035);
      const scroll = scrollY / Math.max(innerHeight, 1);
      group.position.x += ((innerWidth > 800 ? 2.7 : .65) - pointer.x * .14 - group.position.x) * .025;
      group.position.y += ((innerWidth > 800 ? .15 : -1.3) + pointer.y * .12 - scroll * .72 - group.position.y) * .025;
      if (!reduced) { group.rotation.z = Math.sin(time * .18) * .04; dust.rotation.y = time * .006; }
      group.scale.setScalar(Math.max(.7, 1 - scroll * .08));
      renderer.render(scene, camera); frame = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(frame); removeEventListener("pointermove", onPointer); removeEventListener("resize", onResize);
      geometry.dispose(); material.dispose(); dustGeometry.dispose(); renderer.dispose(); renderer.domElement.remove();
    };
  }, []);
  return <div ref={mount} className="scene" aria-hidden="true" />;
}
