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

    // We will collect all dynamically created geometries to dispose them properly at cleanup
    const geometriesToDispose: THREE.BufferGeometry[] = [];

    // Abdomen (organic, pear-shaped and more biological)
    const abdomenGeom = new THREE.IcosahedronGeometry(1.0, 2); // Smoother, higher poly
    geometriesToDispose.push(abdomenGeom);
    const abdomen = new THREE.Mesh(abdomenGeom, redMat);
    abdomen.position.set(0, -0.35, -0.75);
    abdomen.scale.set(0.85, 0.65, 1.4);
    spiderGroup.add(abdomen);

    const abdomenWire = new THREE.Mesh(abdomenGeom, glowMat);
    abdomenWire.position.copy(abdomen.position);
    abdomenWire.scale.copy(abdomen.scale).multiplyScalar(1.04);
    spiderGroup.add(abdomenWire);

    // Cephalothorax (gorgeous segment with front narrowing)
    const headGeom = new THREE.IcosahedronGeometry(0.65, 2); // Smoother, higher poly
    geometriesToDispose.push(headGeom);
    const head = new THREE.Mesh(headGeom, redMat);
    head.position.set(0, 0.05, 0.45);
    head.scale.set(0.8, 0.6, 0.9);
    spiderGroup.add(head);

    const headWire = new THREE.Mesh(headGeom, glowMat);
    headWire.position.copy(head.position);
    headWire.scale.copy(head.scale).multiplyScalar(1.04);
    spiderGroup.add(headWire);

    // Realistic Chelicerae / Fangs (The mouthpart claws)
    const fangGeom = new THREE.CylinderGeometry(0.06, 0.012, 0.38, 6);
    fangGeom.translate(0, -0.19, 0); // pivot at root
    geometriesToDispose.push(fangGeom);

    const leftFang = new THREE.Mesh(fangGeom, redMat);
    leftFang.position.set(-0.11, -0.14, 0.84);
    leftFang.rotation.set(0.35, 0.15, -0.1);
    spiderGroup.add(leftFang);

    const leftFangWire = new THREE.Mesh(fangGeom, glowMat);
    leftFangWire.scale.set(1.15, 1.01, 1.15);
    leftFang.add(leftFangWire);

    const rightFang = new THREE.Mesh(fangGeom, redMat);
    rightFang.position.set(0.11, -0.14, 0.84);
    rightFang.rotation.set(0.35, -0.15, 0.1);
    spiderGroup.add(rightFang);

    const rightFangWire = new THREE.Mesh(fangGeom, glowMat);
    rightFangWire.scale.set(1.15, 1.01, 1.15);
    rightFang.add(rightFangWire);

    // Eyes (8 glowing cyber eyes!)
    const eyeGeom = new THREE.SphereGeometry(0.07, 8, 8);
    geometriesToDispose.push(eyeGeom);
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff }); // Electric blue eyes!

    // Main central eyes
    const leftEye = new THREE.Mesh(eyeGeom, eyeMat);
    leftEye.position.set(-0.16, 0.22, 0.88);
    spiderGroup.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeom, eyeMat);
    rightEye.position.set(0.16, 0.22, 0.88);
    spiderGroup.add(rightEye);

    // Secondary smaller side eyes for high realism!
    const leftSideEye = new THREE.Mesh(eyeGeom, eyeMat);
    leftSideEye.scale.set(0.65, 0.65, 0.65);
    leftSideEye.position.set(-0.3, 0.18, 0.78);
    spiderGroup.add(leftSideEye);

    const rightSideEye = new THREE.Mesh(eyeGeom, eyeMat);
    rightSideEye.scale.set(0.65, 0.65, 0.65);
    rightSideEye.position.set(0.3, 0.18, 0.78);
    spiderGroup.add(rightSideEye);

    // Pedipalps (Sensory feeler arms with realistic joint bending)
    const palpBaseGeom = new THREE.CylinderGeometry(0.025, 0.015, 0.25, 5);
    palpBaseGeom.translate(0, 0.125, 0);
    geometriesToDispose.push(palpBaseGeom);
    
    const palpTipGeom = new THREE.CylinderGeometry(0.015, 0.008, 0.22, 5);
    palpTipGeom.translate(0, 0.11, 0);
    geometriesToDispose.push(palpTipGeom);

    // Left Palp
    const leftPalp = new THREE.Mesh(palpBaseGeom, redMat);
    leftPalp.position.set(-0.2, -0.05, 0.8);
    leftPalp.rotation.set(0.2, 0.15, -0.15);
    
    const leftPalpWire = new THREE.Mesh(palpBaseGeom, glowMat);
    leftPalpWire.scale.set(1.15, 1.01, 1.15);
    leftPalp.add(leftPalpWire);

    const leftPalpTip = new THREE.Mesh(palpTipGeom, redMat);
    leftPalpTip.position.set(0, 0.25, 0);
    leftPalpTip.rotation.x = 0.5; // bent forward
    leftPalp.add(leftPalpTip);

    const leftPalpTipWire = new THREE.Mesh(palpTipGeom, glowMat);
    leftPalpTipWire.scale.set(1.15, 1.01, 1.15);
    leftPalpTip.add(leftPalpTipWire);

    spiderGroup.add(leftPalp);

    // Right Palp
    const rightPalp = new THREE.Mesh(palpBaseGeom, redMat);
    rightPalp.position.set(0.2, -0.05, 0.8);
    rightPalp.rotation.set(0.2, -0.15, 0.15);

    const rightPalpWire = new THREE.Mesh(palpBaseGeom, glowMat);
    rightPalpWire.scale.set(1.15, 1.01, 1.15);
    rightPalp.add(rightPalpWire);

    const rightPalpTip = new THREE.Mesh(palpTipGeom, redMat);
    rightPalpTip.position.set(0, 0.25, 0);
    rightPalpTip.rotation.x = 0.5; // bent forward
    rightPalp.add(rightPalpTip);

    const rightPalpTipWire = new THREE.Mesh(palpTipGeom, glowMat);
    rightPalpTipWire.scale.set(1.15, 1.01, 1.15);
    rightPalpTip.add(rightPalpTipWire);

    spiderGroup.add(rightPalp);

    // 8 Legs (4 pairs) - Upgraded to 3-segment realistic joints (Femur -> Tibia -> Tarsus)
    interface LegGroup {
      femur: THREE.Mesh;
      tibia: THREE.Mesh;
      tarsus: THREE.Mesh;
      side: number;
      index: number;
    }
    const legObjects: LegGroup[] = [];

    // Joint leg construction helper
    const makeLeg = (side: number, index: number) => {
      // Create a local system for each leg pivot point
      const legPivot = new THREE.Group();
      
      // Distribute origin positions along the cephalothorax
      const zOffset = 0.45 - index * 0.24;
      legPivot.position.set(side * 0.32, 0.05, zOffset);

      // 1. FEMUR (Upward/outward segment)
      const femurLen = 0.85 + index * 0.12;
      const femurGeom = new THREE.CylinderGeometry(0.045, 0.03, femurLen, 5);
      femurGeom.translate(0, femurLen / 2, 0); // pivot at base
      geometriesToDispose.push(femurGeom);
      const femur = new THREE.Mesh(femurGeom, redMat);
      
      const femurWire = new THREE.Mesh(femurGeom, glowMat);
      femurWire.scale.set(1.15, 1.01, 1.15);
      femur.add(femurWire);

      // 2. TIBIA (Downward bending segment)
      const tibiaLen = 1.0 + index * 0.15;
      const tibiaGeom = new THREE.CylinderGeometry(0.03, 0.018, tibiaLen, 5);
      tibiaGeom.translate(0, tibiaLen / 2, 0); // pivot at base
      geometriesToDispose.push(tibiaGeom);
      const tibia = new THREE.Mesh(tibiaGeom, redMat);

      const tibiaWire = new THREE.Mesh(tibiaGeom, glowMat);
      tibiaWire.scale.set(1.15, 1.01, 1.15);
      tibia.add(tibiaWire);

      // Position Tibia at end of Femur
      tibia.position.set(0, femurLen, 0);
      femur.add(tibia);

      // 3. TARSUS (The final foot claw segment pointing down)
      const tarsusLen = 0.6 + index * 0.08;
      const tarsusGeom = new THREE.CylinderGeometry(0.018, 0.005, tarsusLen, 5);
      tarsusGeom.translate(0, tarsusLen / 2, 0); // pivot at base
      geometriesToDispose.push(tarsusGeom);
      const tarsus = new THREE.Mesh(tarsusGeom, redMat);

      const tarsusWire = new THREE.Mesh(tarsusGeom, glowMat);
      tarsusWire.scale.set(1.15, 1.01, 1.15);
      tarsus.add(tarsusWire);

      // Position Tarsus at end of Tibia
      tarsus.position.set(0, tibiaLen, 0);
      tibia.add(tarsus);

      // Base realistic joint rotations to anchor nicely
      const spreadAngle = (index - 1.5) * 0.42;
      
      femur.rotation.z = -side * (Math.PI / 3.4); // angled upward
      femur.rotation.y = spreadAngle; // angled forward/backward
      tibia.rotation.z = side * (Math.PI / 1.6); // bent downward sharply
      tarsus.rotation.z = side * (Math.PI / 3.6); // bent even lower towards ground

      legPivot.add(femur);
      spiderGroup.add(legPivot);

      legObjects.push({ femur, tibia, tarsus, side, index });
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
    geometriesToDispose.push(nodeGeom);
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

      // Subtle dynamic leg wiggle with staggered organic crawl gait (tripod gait)
      legObjects.forEach(({ femur, tibia, tarsus, side, index }) => {
        // Legs are offset so they wiggle in groups like walking
        // Staggered index: index 0 and 2 on one side move together, 1 and 3 move opposite.
        const gaitPhase = (index % 2 === 0) ? 0 : Math.PI;
        const sidePhase = (side === 1) ? Math.PI : 0;
        const legOffset = gaitPhase + sidePhase;
        
        // Walk frequency
        const cycle = time * 2.0 + legOffset;

        // Micro-flexing of femur up and down
        femur.rotation.z = -side * (Math.PI / 3.4) + Math.sin(cycle) * 0.08;
        // Walking forward/backward stride (feeling the web)
        femur.rotation.y = ((index - 1.5) * 0.42) + Math.cos(cycle) * 0.06;
        // Joint bending
        tibia.rotation.z = side * (Math.PI / 1.6) + Math.cos(cycle) * 0.05;
        tarsus.rotation.z = side * (Math.PI / 3.6) + Math.sin(cycle) * 0.08;
      });

      // Interactive fang pinch / chew
      leftFang.rotation.z = -0.1 + Math.sin(time * 3.0) * 0.04;
      rightFang.rotation.z = 0.1 - Math.sin(time * 3.0) * 0.04;

      // Pedipalps twitching/tapping (spider sensory behavior)
      leftPalp.rotation.x = 0.2 + Math.sin(time * 4.0) * 0.15;
      rightPalp.rotation.x = 0.2 + Math.cos(time * 4.0) * 0.15;

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
      // Dispose materials & geometries dynamically
      geometriesToDispose.forEach((geom) => {
        try {
          geom.dispose();
        } catch (e) {
          // ignore
        }
      });
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
