"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

function signalArc(seed: number, material: THREE.LineBasicMaterial) {
  const points: THREE.Vector3[] = [];
  const angle = seed * 1.91;
  const end = new THREE.Vector3(Math.cos(angle) * 2.6, Math.sin(angle * 1.3) * 1.8, Math.sin(angle) * 1.5);
  for (let i = 0; i < 13; i++) {
    const t = i / 12;
    const jitter = i === 0 || i === 12 ? 0 : Math.sin(i * 19.7 + seed) * 0.13;
    points.push(new THREE.Vector3(end.x * t + jitter, end.y * t - jitter * .6, end.z * t + jitter * .4));
  }
  return new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), material);
}

export function SignalScene() {
  const mount = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = mount.current;
    if (!host) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x07040d, 0.052);
    const camera = new THREE.PerspectiveCamera(42, innerWidth / innerHeight, .1, 100);
    camera.position.set(0, 0, 9.3);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: !reduced, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.65));
    renderer.setSize(innerWidth, innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    host.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0x3b1b64, 2.2));
    const ultraviolet = new THREE.PointLight(0x9b5cff, 45, 14, 1.8);
    ultraviolet.position.set(3.2, 2.2, 4.2);
    scene.add(ultraviolet);
    const magenta = new THREE.PointLight(0xff3c9d, 18, 9, 2);
    magenta.position.set(-2.5, -1.8, 2.5);
    scene.add(magenta);
    const rim = new THREE.DirectionalLight(0xe7d9ff, 3.2);
    rim.position.set(-2, 4, 3);
    scene.add(rim);

    const core = new THREE.Group();
    scene.add(core);
    const crystalGeometry = new THREE.DodecahedronGeometry(2.08, reduced ? 1 : 2);
    const pos = crystalGeometry.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i), y = pos.getY(i), z = pos.getZ(i);
      const warp = 1 + Math.sin(x * 3.1 + y * 4.7 + z * 2.2) * .07 + Math.sin((x - y) * 8) * .025;
      pos.setXYZ(i, x * warp * 1.06, y * warp * .93, z * warp);
    }
    crystalGeometry.computeVertexNormals();
    const crystal = new THREE.Mesh(crystalGeometry, new THREE.MeshPhysicalMaterial({
      color: 0x160925, emissive: 0x210a3b, emissiveIntensity: .65, roughness: .18,
      metalness: .25, transmission: .38, thickness: 2.4, ior: 1.7,
      transparent: true, opacity: .93, flatShading: true, side: THREE.DoubleSide,
    }));
    crystal.rotation.set(.12, -.32, -.08);
    core.add(crystal);

    const edges = new THREE.LineSegments(
      new THREE.EdgesGeometry(crystalGeometry, 18),
      new THREE.LineBasicMaterial({ color: 0x9b5cff, transparent: true, opacity: .42, blending: THREE.AdditiveBlending })
    );
    edges.rotation.copy(crystal.rotation);
    core.add(edges);

    const inner = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.25, 2),
      new THREE.MeshBasicMaterial({ color: 0x752ee8, wireframe: true, transparent: true, opacity: .28, blending: THREE.AdditiveBlending })
    );
    core.add(inner);

    const strataMaterial = new THREE.MeshBasicMaterial({ color: 0x5c1faa, transparent: true, opacity: .095, side: THREE.DoubleSide, blending: THREE.AdditiveBlending });
    for (let i = -6; i <= 6; i++) {
      const width = 3.6 + Math.cos(i * .74) * .55;
      const plate = new THREE.Mesh(new THREE.PlaneGeometry(width, width * .74), strataMaterial);
      plate.rotation.x = Math.PI / 2;
      plate.position.y = i * .245;
      plate.rotation.z = -.08 + i * .008;
      core.add(plate);
    }

    const arcMaterial = new THREE.LineBasicMaterial({ color: 0xb57aff, transparent: true, opacity: .65, blending: THREE.AdditiveBlending });
    const arcs = Array.from({ length: reduced ? 3 : 8 }, (_, i) => signalArc(i + 1, arcMaterial));
    arcs.forEach((arc) => core.add(arc));

    const beamMaterial = new THREE.MeshBasicMaterial({ color: 0xd9b7ff, transparent: true, opacity: .9, blending: THREE.AdditiveBlending });
    const beam = new THREE.Mesh(new THREE.CylinderGeometry(.014, .055, 5.3, 8), beamMaterial);
    beam.rotation.z = -Math.PI / 2;
    beam.position.x = 4.45;
    beam.position.y = -.03;
    core.add(beam);
    const beamGlow = new THREE.Mesh(new THREE.CylinderGeometry(.08, .16, 5.3, 10), new THREE.MeshBasicMaterial({ color: 0x7b35e6, transparent: true, opacity: .09, blending: THREE.AdditiveBlending }));
    beamGlow.rotation.copy(beam.rotation); beamGlow.position.copy(beam.position); core.add(beamGlow);

    const halo = new THREE.Mesh(new THREE.TorusGeometry(2.85, .007, 3, 200), new THREE.MeshBasicMaterial({ color: 0x9b5cff, transparent: true, opacity: .22 }));
    halo.rotation.set(1.12, .4, -.22);
    core.add(halo);

    const dustGeometry = new THREE.BufferGeometry();
    const dustCount = reduced ? 260 : 850;
    const dust = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      const radius = 3.4 + Math.random() * 8;
      const theta = Math.random() * Math.PI * 2;
      dust[i * 3] = Math.cos(theta) * radius;
      dust[i * 3 + 1] = (Math.random() - .5) * 9;
      dust[i * 3 + 2] = Math.sin(theta) * radius - 2;
    }
    dustGeometry.setAttribute("position", new THREE.BufferAttribute(dust, 3));
    const dustField = new THREE.Points(dustGeometry, new THREE.PointsMaterial({ color: 0x8f55df, size: .012, transparent: true, opacity: .48 }));
    scene.add(dustField);

    const pointer = new THREE.Vector2();
    const onPointer = (event: PointerEvent) => {
      pointer.set((event.clientX / innerWidth - .5) * 2, (event.clientY / innerHeight - .5) * 2);
    };
    const onResize = () => {
      camera.aspect = innerWidth / innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(innerWidth, innerHeight);
      renderer.setPixelRatio(Math.min(devicePixelRatio, 1.65));
    };
    addEventListener("pointermove", onPointer, { passive: true });
    addEventListener("resize", onResize);

    const clock = new THREE.Clock();
    let frame = 0;
    const draw = () => {
      const time = clock.getElapsedTime();
      const scroll = scrollY / Math.max(innerHeight, 1);
      const targetX = innerWidth > 800 ? 2.05 : .85;
      core.position.x += (targetX - pointer.x * .16 - core.position.x) * .025;
      core.position.y += ((innerWidth > 800 ? .18 : -.6) + pointer.y * .12 - scroll * .7 - core.position.y) * .025;
      if (!reduced) {
        crystal.rotation.y = -.32 + time * .045 + pointer.x * .045;
        crystal.rotation.x = .12 + Math.sin(time * .25) * .035 - pointer.y * .03;
        edges.rotation.copy(crystal.rotation);
        inner.rotation.y = -time * .09;
        inner.rotation.x = time * .045;
        halo.rotation.z = -.22 + time * .035;
        beamMaterial.opacity = .72 + Math.sin(time * 13.2) * .16;
        arcMaterial.opacity = .42 + Math.sin(time * 4.7) * .2;
        dustField.rotation.y = time * .007;
      }
      core.scale.setScalar(Math.max(.69, 1 - scroll * .075));
      renderer.render(scene, camera);
      frame = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(frame);
      removeEventListener("pointermove", onPointer);
      removeEventListener("resize", onResize);
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Line || object instanceof THREE.LineSegments || object instanceof THREE.Points) {
          object.geometry?.dispose();
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.forEach((material) => material?.dispose());
        }
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={mount} className="signal-scene" aria-hidden="true" />;
}
