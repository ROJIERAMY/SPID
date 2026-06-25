import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    let width = container.clientWidth || 400;
    let height = container.clientHeight || 400;

    // Create scene, camera and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 0.5, 6.5);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    const mainLight = new THREE.PointLight(0xe31b1c, 4.0, 50);
    mainLight.position.set(5, 5, 8);
    scene.add(mainLight);

    const backLight = new THREE.PointLight(0x0082ff, 3.5, 50);
    backLight.position.set(-5, -3, -5);
    scene.add(backLight);

    const bottomGlow = new THREE.PointLight(0x0082ff, 3.0, 30);
    bottomGlow.position.set(0, -2, 2);
    scene.add(bottomGlow);

    // Master group for the spider & network
    const sceneGroup = new THREE.Group();
    scene.add(sceneGroup);

    // 1. BACKGROUND WEB GRID
    const webGroup = new THREE.Group();
    sceneGroup.add(webGroup);

    // Concentric web rings
    const ringCount = 8;
    const webRings: THREE.LineLoop[] = [];
    const ringMat = new THREE.LineBasicMaterial({
      color: 0xe31b1c,
      transparent: true,
      opacity: 0.15,
    });

    const blueRingMat = new THREE.LineBasicMaterial({
      color: 0x0082ff,
      transparent: true,
      opacity: 0.15,
    });

    for (let r = 1; r <= ringCount; r++) {
      const radius = r * 0.6;
      const ringGeom = new THREE.BufferGeometry();
      const points = [];
      const segments = 16;
      for (let s = 0; s <= segments; s++) {
        const theta = (s / segments) * Math.PI * 2;
        points.push(new THREE.Vector3(Math.cos(theta) * radius, Math.sin(theta) * radius, -1));
      }
      ringGeom.setFromPoints(points);
      const ring = new THREE.LineLoop(ringGeom, r % 2 === 0 ? blueRingMat : ringMat);
      webGroup.add(ring);
      webRings.push(ring);
    }

    // Radial web lines
    const radialLines = 12;
    for (let i = 0; i < radialLines; i++) {
      const theta = (i / radialLines) * Math.PI * 2;
      const maxRadius = ringCount * 0.6;
      const points = [
        new THREE.Vector3(0, 0, -1),
        new THREE.Vector3(Math.cos(theta) * maxRadius, Math.sin(theta) * maxRadius, -1)
      ];
      const radialGeom = new THREE.BufferGeometry().setFromPoints(points);
      const radialLine = new THREE.Line(radialGeom, ringMat);
      webGroup.add(radialLine);
    }

    // 2. THE CYBER SPIDER
    const spiderGroup = new THREE.Group();
    // Rotate slightly so it faces the viewer nicely
    spiderGroup.rotation.x = Math.PI * 0.15; 
    sceneGroup.add(spiderGroup);

    const redMat = new THREE.MeshPhongMaterial({
      color: 0xe31b1c,
      emissive: 0x1c0000,
      shininess: 120,
      flatShading: true,
    });

    const glowMat = new THREE.MeshBasicMaterial({
      color: 0x00ccff, // Electric neon blue wireframe overlay!
      wireframe: true,
      transparent: true,
      opacity: 0.6, // Higher opacity for more crisp visibility
    });

    // Abdomen (large back sphere, elongated)
    const abdomenGeom = new THREE.IcosahedronGeometry(1.0, 1);
    const abdomen = new THREE.Mesh(abdomenGeom, redMat);
    abdomen.position.set(0, -0.3, -0.7);
    abdomen.scale.set(0.9, 0.7, 1.45);
    spiderGroup.add(abdomen);

    const abdomenWire = new THREE.Mesh(abdomenGeom, glowMat);
    abdomenWire.position.copy(abdomen.position);
    abdomenWire.scale.copy(abdomen.scale).multiplyScalar(1.04);
    spiderGroup.add(abdomenWire);

    // Cephalothorax (front head-body)
    const headGeom = new THREE.IcosahedronGeometry(0.65, 1);
    const head = new THREE.Mesh(headGeom, redMat);
    head.position.set(0, 0.05, 0.45);
    head.scale.set(0.85, 0.65, 0.85);
    spiderGroup.add(head);

    const headWire = new THREE.Mesh(headGeom, glowMat);
    headWire.position.copy(head.position);
    headWire.scale.copy(head.scale).multiplyScalar(1.04);
    spiderGroup.add(headWire);

    // Eyes (small glowing spheres)
    const eyeGeom = new THREE.SphereGeometry(0.08, 8, 8);
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff }); // Electric blue eyes!
    const leftEye = new THREE.Mesh(eyeGeom, eyeMat);
    leftEye.position.set(-0.18, 0.25, 0.9);
    spiderGroup.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeom, eyeMat);
    rightEye.position.set(0.18, 0.25, 0.9);
    spiderGroup.add(rightEye);

    // Pedipalps (front short legs)
    const palpGeom = new THREE.CylinderGeometry(0.02, 0.01, 0.4, 5);
    palpGeom.translate(0, -0.2, 0);
    const leftPalp = new THREE.Mesh(palpGeom, redMat);
    leftPalp.position.set(-0.15, 0.0, 0.95);
    leftPalp.rotation.set(0.3, 0.1, -0.2);
    spiderGroup.add(leftPalp);

    const rightPalp = new THREE.Mesh(palpGeom, redMat);
    rightPalp.position.set(0.15, 0.0, 0.95);
    rightPalp.rotation.set(0.3, -0.1, 0.2);
    spiderGroup.add(rightPalp);

    // 8 Legs (4 pairs)
    interface LegGroup {
      femur: THREE.Mesh;
      tibia: THREE.Mesh;
      side: number;
      index: number;
    }
    const legObjects: LegGroup[] = [];

    // Joint leg construction helper
    const makeLeg = (side: number, index: number) => {
      // Create a local system for each leg pivot point
      const legPivot = new THREE.Group();
      
      // Distribute origin positions along the cephalothorax
      const zOffset = 0.5 - index * 0.25;
      legPivot.position.set(side * 0.35, 0.05, zOffset);

      // Femur (first major segment going outwards/upwards)
      const femurLen = 0.9 + index * 0.15;
      const femurGeom = new THREE.CylinderGeometry(0.045, 0.03, femurLen, 5);
      femurGeom.translate(0, femurLen / 2, 0); // pivot at base
      const femur = new THREE.Mesh(femurGeom, redMat);
      
      // Wireframe layer for femur (neon blue)
      const femurWire = new THREE.Mesh(femurGeom, glowMat);
      femurWire.scale.set(1.15, 1.01, 1.15);
      femur.add(femurWire);

      // Tibia (second major segment going downwards to floor)
      const tibiaLen = 1.3 + index * 0.2;
      const tibiaGeom = new THREE.CylinderGeometry(0.03, 0.015, tibiaLen, 5);
      tibiaGeom.translate(0, tibiaLen / 2, 0); // pivot at base
      const tibia = new THREE.Mesh(tibiaGeom, redMat);

      // Wireframe layer for tibia (neon blue)
      const tibiaWire = new THREE.Mesh(tibiaGeom, glowMat);
      tibiaWire.scale.set(1.15, 1.01, 1.15);
      tibia.add(tibiaWire);

      // Position Tibia at end of Femur
      tibia.position.set(0, femurLen, 0);
      femur.add(tibia);

      // Base rotations to orient leg nicely
      const spreadAngle = (index - 1.5) * 0.45;
      
      femur.rotation.z = -side * (Math.PI / 3.5);
      femur.rotation.y = spreadAngle;
      tibia.rotation.z = side * (Math.PI / 1.7);

      legPivot.add(femur);
      spiderGroup.add(legPivot);

      legObjects.push({ femur, tibia, side, index });
    };

    // Spawn 8 legs
    for (let index = 0; index < 4; index++) {
      makeLeg(-1, index); // Left side
      makeLeg(1, index);  // Right side
    }

    // 3. GLOWING WEB NODES (Pulsing cyber data spheres)
    const nodeGroup = new THREE.Group();
    sceneGroup.add(nodeGroup);

    const nodeGeom = new THREE.SphereGeometry(0.06, 8, 8);
    const nodeMat = new THREE.MeshBasicMaterial({
      color: 0x00d2ff, // Pulsing bright cyan-blue nodes!
      transparent: true,
      opacity: 0.8
    });

    const webNodes: THREE.Mesh[] = [];
    const nodeCount = 15;
    for (let n = 0; n < nodeCount; n++) {
      const node = new THREE.Mesh(nodeGeom, nodeMat);
      // Position nodes randomly along key intersections on the web
      const randomRadius = (Math.floor(Math.random() * 5) + 2) * 0.6;
      const randomAngle = (n / nodeCount) * Math.PI * 2 + (Math.random() * 0.4);
      node.position.set(Math.cos(randomAngle) * randomRadius, Math.sin(randomAngle) * randomRadius, -1);
      nodeGroup.add(node);
      webNodes.push(node);
    }

    // Interactive mouse movement variables
    let mouseX = 0;
    let mouseY = 0;
    const targetRotX = { current: 0 };
    const targetRotY = { current: 0 };

    const onMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      mouseX = (x / rect.width) * 2 - 1;
      mouseY = -(y / rect.height) * 2 + 1;
      
      targetRotY.current = mouseX * 0.35;
      targetRotX.current = -mouseY * 0.25;
    };

    container.addEventListener('mousemove', onMouseMove);

    let animationFrameId: number;
    let time = 0;

    // Animation Loop
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      time += 0.025;

      // Smoothly interpolate to mouse target rotation
      sceneGroup.rotation.y += (targetRotY.current - sceneGroup.rotation.y) * 0.08;
      sceneGroup.rotation.x += (targetRotX.current + Math.PI * 0.05 - sceneGroup.rotation.x) * 0.08;

      // Slow organic idle hover
      const hoverOffset = Math.sin(time) * 0.12;
      spiderGroup.position.y = hoverOffset;
      // Slight roll
      spiderGroup.rotation.z = Math.sin(time * 0.5) * 0.04;

      // Abdomen breathing effect
      const breath = 1.0 + Math.sin(time * 0.8) * 0.03;
      abdomen.scale.set(0.9 * breath, 0.7 * breath, 1.45 * (2 - breath));

      // Subtle dynamic leg wiggle (makes the spider feel alive)
      legObjects.forEach(({ femur, tibia, side, index }) => {
        const legOffset = index * 0.6 + (side === 1 ? Math.PI : 0);
        // Micro-flexing of femur up and down
        femur.rotation.z = -side * (Math.PI / 3.5) + Math.sin(time * 1.5 + legOffset) * 0.05;
        // Corresponding flexing of tibia joint
        tibia.rotation.z = side * (Math.PI / 1.7) + Math.cos(time * 1.5 + legOffset) * 0.04;
      });

      // Background web slow rotation/pulse
      webGroup.rotation.z = time * 0.015;
      webRings.forEach((ring, idx) => {
        const ringScale = 1.0 + Math.sin(time * 1.2 + idx) * 0.015;
        ring.scale.set(ringScale, ringScale, 1);
      });

      // Pulse the web nodes dynamically in size & opacity!
      webNodes.forEach((node, idx) => {
        const nodePulse = 1.0 + Math.sin(time * 3.0 + idx) * 0.35;
        node.scale.set(nodePulse, nodePulse, nodePulse);
        if (node.material instanceof THREE.MeshBasicMaterial) {
          node.material.opacity = 0.5 + Math.sin(time * 3.0 + idx) * 0.3;
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    // Clean resize handling using ResizeObserver
    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) return;
      const entry = entries[0];
      width = entry.contentRect.width || 400;
      height = entry.contentRect.height || 400;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    });

    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousemove', onMouseMove);
      resizeObserver.disconnect();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      // Dispose materials & geometries
      abdomenGeom.dispose();
      headGeom.dispose();
      eyeGeom.dispose();
      palpGeom.dispose();
      nodeGeom.dispose();
      redMat.dispose();
      glowMat.dispose();
      eyeMat.dispose();
      nodeMat.dispose();
      ringMat.dispose();
      blueRingMat.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full min-h-[350px] md:min-h-[420px] lg:min-h-[480px] relative cursor-pointer"
      style={{ display: 'block' }}
    />
  );
}
