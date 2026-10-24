"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/*
 * Monochrome luminous fabric: a waving sheet drawn only with contour lines and points.
 * Brightness comes from light grazing the crests (normal vs. a fixed light direction),
 * so the sheet reveals itself like caustics instead of being shaded as a surface.
 */
const vertexShader = `
  uniform float uTime;
  uniform vec2 uPointer;
  uniform float uPx;
  uniform float uPoints;
  attribute vec2 aUv;
  varying float vLit;
  varying float vFade;

  float height(vec2 p, float t) {
    float w = sin(p.x * 1.15 + t * .75) * .38;
    w += sin(p.x * 2.7 - t * .45 + p.y * .9) * .13;
    w += cos(p.y * 2.3 + t * .35) * .14;
    return w;
  }

  void main() {
    float t = uTime;
    vec2 p = position.xy;
    float e = .03;
    float h0 = height(p, t);
    float hx = (height(p + vec2(e, 0.), t) - h0) / e;
    float hy = (height(p + vec2(0., e), t) - h0) / e;
    vec3 n = normalize(vec3(-hx, -hy, 1.));
    vec3 light = normalize(vec3(-.55, .45, .7));
    float d = max(dot(n, light), 0.);
    float graze = pow(d, 7.);
    float caustic = .5 + .5 * sin(p.x * 4.2 + h0 * 9. - t * .9);

    vLit = .12 + 1.5 * graze + .22 * caustic * d;
    vFade = smoothstep(0., .14, aUv.x) * smoothstep(0., .14, 1. - aUv.x)
          * smoothstep(0., .2, aUv.y) * smoothstep(0., .2, 1. - aUv.y);

    vec3 q = vec3(p, h0 + uPointer.x * p.y * .12);
    q.y += sin(p.x * .72 + t * .3) * .2 + uPointer.y * .12;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(q, 1.);
    gl_PointSize = (1.4 + 3.2 * graze) * uPx * uPoints;
  }
`;

const lineFragment = `
  varying float vLit;
  varying float vFade;
  void main() {
    gl_FragColor = vec4(vec3(1., .93, .84), vLit * vFade * .9);
  }
`;

const pointFragment = `
  varying float vLit;
  varying float vFade;
  void main() {
    float r = length(gl_PointCoord - .5) * 2.;
    if (r > 1.) discard;
    gl_FragColor = vec4(vec3(1., .93, .84), vLit * vFade * pow(1. - r, 1.4));
  }
`;

const WIDTH = 6.4;
const HEIGHT = 3.5;

function buildGeometry(rows: number, segments: number, columns: number) {
  const linePositions: number[] = [];
  const lineUv: number[] = [];
  for (let r = 0; r <= rows; r++) {
    const v = r / rows;
    for (let s = 0; s < segments; s++) {
      for (const u of [s / segments, (s + 1) / segments]) {
        linePositions.push((u - .5) * WIDTH, (v - .5) * HEIGHT, 0);
        lineUv.push(u, v);
      }
    }
  }
  const lines = new THREE.BufferGeometry();
  lines.setAttribute("position", new THREE.Float32BufferAttribute(linePositions, 3));
  lines.setAttribute("aUv", new THREE.Float32BufferAttribute(lineUv, 2));

  const pointPositions: number[] = [];
  const pointUv: number[] = [];
  for (let r = 0; r <= rows; r++) {
    for (let c = 0; c <= columns; c++) {
      const u = c / columns;
      const v = r / rows;
      pointPositions.push((u - .5) * WIDTH, (v - .5) * HEIGHT, 0);
      pointUv.push(u, v);
    }
  }
  const points = new THREE.BufferGeometry();
  points.setAttribute("position", new THREE.Float32BufferAttribute(pointPositions, 3));
  points.setAttribute("aUv", new THREE.Float32BufferAttribute(pointUv, 2));
  return { lines, points };
}

export function FabricScene({ active }: { active: boolean }) {
  const mount = useRef<HTMLDivElement>(null);
  const activeRef = useRef(active);
  const sync = useRef<() => void>(() => {});

  useEffect(() => {
    activeRef.current = active;
    sync.current();
  }, [active]);

  useEffect(() => {
    const host = mount.current;
    if (!host) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pixelRatio = Math.min(devicePixelRatio, 1.6);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, innerWidth / innerHeight, .1, 50);
    camera.position.set(0, 0, 7.2);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: !reduced, powerPreference: "high-performance" });
    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(innerWidth, innerHeight);
    renderer.setClearColor(0x0e0d0b, 0);
    host.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);
    const uniforms = {
      uTime: { value: .7 },
      uPointer: { value: new THREE.Vector2() },
      uPx: { value: pixelRatio },
      uPoints: { value: 1 },
    };
    const { lines, points } = buildGeometry(reduced ? 28 : 46, reduced ? 70 : 150, reduced ? 56 : 96);
    const blending = { transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, depthTest: false } as const;
    const lineMaterial = new THREE.ShaderMaterial({ vertexShader, fragmentShader: lineFragment, uniforms, ...blending });
    const pointMaterial = new THREE.ShaderMaterial({ vertexShader, fragmentShader: pointFragment, uniforms, ...blending });
    const fabric = new THREE.LineSegments(lines, lineMaterial);
    const nodes = new THREE.Points(points, pointMaterial);
    fabric.rotation.set(-.18, -.52, -.14);
    nodes.rotation.copy(fabric.rotation);
    group.add(fabric, nodes);

    const dustGeometry = new THREE.BufferGeometry();
    const count = reduced ? 160 : 520;
    const dustPositions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      dustPositions[i * 3] = (Math.random() - .5) * 13;
      dustPositions[i * 3 + 1] = (Math.random() - .5) * 8;
      dustPositions[i * 3 + 2] = (Math.random() - .5) * 5 - 1;
    }
    dustGeometry.setAttribute("position", new THREE.BufferAttribute(dustPositions, 3));
    const dustMaterial = new THREE.PointsMaterial({ color: 0xffeed6, size: .012, transparent: true, opacity: .42, depthWrite: false });
    const dust = new THREE.Points(dustGeometry, dustMaterial);
    scene.add(dust);

    const pointer = new THREE.Vector2();
    const timer = new THREE.Timer();
    let time = .7;
    let frame = 0;

    const place = (snap: boolean) => {
      const wide = innerWidth > 800;
      const tx = (wide ? 2.3 : .5) - pointer.x * .14;
      const ty = (wide ? .15 : -2.5) + pointer.y * .12;
      const k = snap ? 1 : .025;
      group.position.x += (tx - group.position.x) * k;
      group.position.y += (ty - group.position.y) * k;
    };

    const render = () => {
      uniforms.uTime.value = time;
      renderer.render(scene, camera);
    };

    const draw = () => {
      timer.update();
      time += Math.min(timer.getDelta(), .05);
      uniforms.uPointer.value.lerp(pointer, .035);
      place(false);
      group.rotation.z = Math.sin(time * .18) * .04;
      dust.rotation.y = time * .006;
      render();
      frame = requestAnimationFrame(draw);
    };

    const update = () => {
      const run = activeRef.current && !document.hidden && !reduced;
      if (run && !frame) {
        timer.update();
        frame = requestAnimationFrame(draw);
      } else if (!run && frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    };
    sync.current = update;

    const onPointer = (event: PointerEvent) => pointer.set((event.clientX / innerWidth - .5) * 2, (event.clientY / innerHeight - .5) * 2);
    const onResize = () => {
      camera.aspect = innerWidth / innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(innerWidth, innerHeight);
      place(true);
      if (!frame) render();
    };

    place(true);
    render();
    update();
    addEventListener("pointermove", onPointer, { passive: true });
    addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", update);

    return () => {
      sync.current = () => {};
      cancelAnimationFrame(frame);
      removeEventListener("pointermove", onPointer);
      removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", update);
      lines.dispose(); points.dispose(); dustGeometry.dispose();
      lineMaterial.dispose(); pointMaterial.dispose(); dustMaterial.dispose();
      timer.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={mount} className="scene" aria-hidden="true" />;
}
