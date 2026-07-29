"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function SignalScene() {
  const mount = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = mount.current;
    if (!host) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x070707, 0.055);
    const camera = new THREE.PerspectiveCamera(42, innerWidth / innerHeight, 0.1, 100);
    camera.position.set(0, 0, 8.5);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: !reduced, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.7));
    renderer.setSize(innerWidth, innerHeight);
    renderer.setClearColor(0x000000, 0);
    host.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);
    const geometry = new THREE.IcosahedronGeometry(2.15, reduced ? 3 : 6);
    const positions = geometry.attributes.position;
    const colors = new Float32Array(positions.count * 3);
    const lime = new THREE.Color(0xc7ff2f);
    const cyan = new THREE.Color(0x65f4ff);
    for (let i = 0; i < positions.count; i++) {
      const color = i % 7 === 0 ? cyan : lime;
      colors.set([color.r, color.g, color.b], i * 3);
    }
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    const points = new THREE.Points(geometry, new THREE.PointsMaterial({
      size: 0.024,
      vertexColors: true,
      transparent: true,
      opacity: 0.86,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }));
    group.add(points);

    const wire = new THREE.Mesh(
      new THREE.IcosahedronGeometry(2.17, 2),
      new THREE.MeshBasicMaterial({ color: 0x52621c, wireframe: true, transparent: true, opacity: 0.17 })
    );
    group.add(wire);

    const ringMaterial = new THREE.MeshBasicMaterial({ color: 0xc7ff2f, wireframe: true, transparent: true, opacity: 0.18 });
    const ring = new THREE.Mesh(new THREE.TorusGeometry(2.85, 0.006, 3, 180), ringMaterial);
    ring.rotation.set(1.13, 0.15, 0.3);
    group.add(ring);
    const ringTwo = ring.clone();
    ringTwo.scale.setScalar(0.78);
    ringTwo.rotation.set(-0.55, 0.8, 0.2);
    group.add(ringTwo);

    const starGeometry = new THREE.BufferGeometry();
    const starCount = reduced ? 300 : 900;
    const stars = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const radius = 3.5 + Math.random() * 8;
      const theta = Math.random() * Math.PI * 2;
      stars[i * 3] = Math.cos(theta) * radius;
      stars[i * 3 + 1] = (Math.random() - 0.5) * 10;
      stars[i * 3 + 2] = Math.sin(theta) * radius - 2;
    }
    starGeometry.setAttribute("position", new THREE.BufferAttribute(stars, 3));
    const starField = new THREE.Points(starGeometry, new THREE.PointsMaterial({ color: 0x849d34, size: 0.015, transparent: true, opacity: 0.45 }));
    scene.add(starField);

    const pointer = new THREE.Vector2();
    const onPointer = (event: PointerEvent) => {
      pointer.x = (event.clientX / innerWidth - 0.5) * 2;
      pointer.y = (event.clientY / innerHeight - 0.5) * 2;
    };
    const onResize = () => {
      camera.aspect = innerWidth / innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(innerWidth, innerHeight);
      renderer.setPixelRatio(Math.min(devicePixelRatio, 1.7));
    };
    addEventListener("pointermove", onPointer, { passive: true });
    addEventListener("resize", onResize);

    const clock = new THREE.Clock();
    let frame = 0;
    const draw = () => {
      const time = clock.getElapsedTime();
      const scroll = scrollY / Math.max(innerHeight, 1);
      group.position.x += ((innerWidth > 800 ? 2.25 : 0.65) - pointer.x * 0.22 - group.position.x) * 0.025;
      group.position.y += ((innerWidth > 800 ? 0.15 : -0.25) + pointer.y * 0.15 - scroll * 0.65 - group.position.y) * 0.025;
      if (!reduced) {
        points.rotation.y = time * 0.075 + pointer.x * 0.08;
        points.rotation.x = time * 0.035 - pointer.y * 0.06;
        wire.rotation.copy(points.rotation);
        ring.rotation.z = time * 0.045;
        ringTwo.rotation.y = time * -0.08;
        starField.rotation.y = time * 0.006;
      }
      group.scale.setScalar(Math.max(0.68, 1 - scroll * 0.06));
      renderer.render(scene, camera);
      frame = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(frame);
      removeEventListener("pointermove", onPointer);
      removeEventListener("resize", onResize);
      geometry.dispose();
      starGeometry.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={mount} className="signal-scene" aria-hidden="true" />;
}
