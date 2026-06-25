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

    // Premium Biomechanical Materials
    const titaniumMat = new THREE.MeshStandardMaterial({
      color: 0x141416,
      emissive: 0x050508,
      metalness: 0.95,
      roughness: 0.18,
      flatShading: true,
    });

    const crimsonGlowMat = new THREE.MeshStandardMaterial({
      color: 0xff1e22,
      emissive: 0xff0005,
      roughness: 0.1,
      metalness: 0.8,
      flatShading: true,
    });

    const eyeMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff }); // Electric blue eyes!

    // We will collect all dynamically created geometries to dispose them properly at cleanup
    const geometriesToDispose: THREE.BufferGeometry[] = [];

    // Base Abdomen (Pear-shaped, biological base)
    const abdomenGeom = new THREE.IcosahedronGeometry(1.0, 2);
    geometriesToDispose.push(abdomenGeom);
    const abdomen = new THREE.Mesh(abdomenGeom, titaniumMat);
    abdomen.position.set(0, -0.35, -0.75);
    abdomen.scale.set(0.85, 0.65, 1.4);
    spiderGroup.add(abdomen);

    // Realistic Segmented Carapace / Armored Plates on Abdomen
    const plateCount = 5;
    for (let p = 0; p < plateCount; p++) {
      const plateGeom = new THREE.ConeGeometry(0.85, 0.5, 5);
      plateGeom.rotateX(Math.PI / 2.2);
      geometriesToDispose.push(plateGeom);

      const plate = new THREE.Mesh(plateGeom, p % 2 === 0 ? crimsonGlowMat : titaniumMat);
      
      // Lay them out overlapping down the back of the abdomen
      const zRatio = p / (plateCount - 1); // 0 to 1
      const plateZ = -0.15 - (zRatio * 1.0);
      const plateY = -0.05 - (zRatio * 0.28);
      const scaleVal = 0.95 - (zRatio * 0.35);

      plate.position.set(0, plateY, plateZ);
      plate.scale.set(scaleVal, scaleVal * 0.6, scaleVal * 0.6);
      
      // Parent plates to the abdomen so they breathe with it!
      abdomen.add(plate);
    }

    // Spinnerets at the rear end of the abdomen
    const spinneretGeom = new THREE.CylinderGeometry(0.04, 0.02, 0.2, 5);
    spinneretGeom.translate(0, -0.1, 0);
    geometriesToDispose.push(spinneretGeom);

    const leftSpinneret = new THREE.Mesh(spinneretGeom, titaniumMat);
    leftSpinneret.position.set(-0.1, -0.4, -2.1);
    leftSpinneret.rotation.set(-0.4, 0, -0.2);
    spiderGroup.add(leftSpinneret);

    const rightSpinneret = new THREE.Mesh(spinneretGeom, titaniumMat);
    rightSpinneret.position.set(0.1, -0.4, -2.1);
    rightSpinneret.rotation.set(-0.4, 0, 0.2);
    spiderGroup.add(rightSpinneret);

    // Cephalothorax (The armored head-body segment)
    const headGeom = new THREE.IcosahedronGeometry(0.65, 2);
    geometriesToDispose.push(headGeom);
    const head = new THREE.Mesh(headGeom, titaniumMat);
    head.position.set(0, 0.05, 0.45);
    head.scale.set(0.82, 0.62, 0.95);
    spiderGroup.add(head);

    // Glowing center plate on head
    const headPlateGeom = new THREE.BoxGeometry(0.18, 0.08, 0.6);
    geometriesToDispose.push(headPlateGeom);
    const headPlate = new THREE.Mesh(headPlateGeom, crimsonGlowMat);
    headPlate.position.set(0, 0.33, 0.42);
    headPlate.rotation.x = -0.25;
    spiderGroup.add(headPlate);

    // Realistic Double-Segmented Chelicerae & Fangs
    const cheliceraGeom = new THREE.CylinderGeometry(0.09, 0.06, 0.32, 6);
    cheliceraGeom.translate(0, -0.16, 0);
    geometriesToDispose.push(cheliceraGeom);

    const fangGeom = new THREE.CylinderGeometry(0.04, 0.01, 0.25, 5);
    fangGeom.translate(0, -0.125, 0);
    geometriesToDispose.push(fangGeom);

    // Left Fang Assembly
    const leftChelicera = new THREE.Mesh(cheliceraGeom, titaniumMat);
    leftChelicera.position.set(-0.13, -0.12, 0.82);
    leftChelicera.rotation.set(0.3, 0.1, -0.05);
    spiderGroup.add(leftChelicera);

    const leftFang = new THREE.Mesh(fangGeom, crimsonGlowMat);
    leftFang.position.set(0, -0.3, 0.02);
    leftFang.rotation.set(0.4, 0.2, -0.35); // Curving inward and backward
    leftChelicera.add(leftFang);

    // Right Fang Assembly
    const rightChelicera = new THREE.Mesh(cheliceraGeom, titaniumMat);
    rightChelicera.position.set(0.13, -0.12, 0.82);
    rightChelicera.rotation.set(0.3, -0.1, 0.05);
    spiderGroup.add(rightChelicera);

    const rightFang = new THREE.Mesh(fangGeom, crimsonGlowMat);
    rightFang.position.set(0, -0.3, 0.02);
    rightFang.rotation.set(0.4, -0.2, 0.35); // Curving inward and backward
    rightChelicera.add(rightFang);

    // 8 Realistic glowing cyber eyes arranged like a Wolf Spider!
    // Anterior Median Eyes (AME - Very Large, centered)
    // Anterior Lateral Eyes (ALE - Medium-large, next to AME)
    // Posterior Median Eyes (PME - Large, top-front)
    // Posterior Lateral Eyes (PLE - Medium, top-side)
    const bigEyeGeom = new THREE.SphereGeometry(0.075, 8, 8);
    const midEyeGeom = new THREE.SphereGeometry(0.05, 8, 8);
    const smallEyeGeom = new THREE.SphereGeometry(0.035, 8, 8);
    geometriesToDispose.push(bigEyeGeom, midEyeGeom, smallEyeGeom);

    // 1 & 2: Main central eyes (AME)
    const leftAME = new THREE.Mesh(bigEyeGeom, eyeMat);
    leftAME.position.set(-0.15, 0.22, 0.88);
    spiderGroup.add(leftAME);

    const rightAME = new THREE.Mesh(bigEyeGeom, eyeMat);
    rightAME.position.set(0.15, 0.22, 0.88);
    spiderGroup.add(rightAME);

    // 3 & 4: Anterior Lateral Eyes (ALE)
    const leftALE = new THREE.Mesh(midEyeGeom, eyeMat);
    leftALE.position.set(-0.3, 0.18, 0.82);
    spiderGroup.add(leftALE);

    const rightALE = new THREE.Mesh(midEyeGeom, eyeMat);
    rightALE.position.set(0.3, 0.18, 0.82);
    spiderGroup.add(rightALE);

    // 5 & 6: Posterior Median Eyes (PME - facing slightly upwards)
    const leftPME = new THREE.Mesh(bigEyeGeom, eyeMat);
    leftPME.scale.set(0.85, 0.85, 0.85);
    leftPME.position.set(-0.16, 0.35, 0.68);
    spiderGroup.add(leftPME);

    const rightPME = new THREE.Mesh(bigEyeGeom, eyeMat);
    rightPME.scale.set(0.85, 0.85, 0.85);
    rightPME.position.set(0.16, 0.35, 0.68);
    spiderGroup.add(rightPME);

    // 7 & 8: Posterior Lateral Eyes (PLE - looking sideways)
    const leftPLE = new THREE.Mesh(midEyeGeom, eyeMat);
    leftPLE.position.set(-0.33, 0.28, 0.58);
    spiderGroup.add(leftPLE);

    const rightPLE = new THREE.Mesh(midEyeGeom, eyeMat);
    rightPLE.position.set(0.33, 0.28, 0.58);
    spiderGroup.add(rightPLE);

    // Pedipalps (Realistic 3-segment sensory feeler arms)
    const palpBaseGeom = new THREE.CylinderGeometry(0.028, 0.02, 0.22, 6);
    palpBaseGeom.translate(0, 0.11, 0);
    geometriesToDispose.push(palpBaseGeom);
    
    const palpMidGeom = new THREE.CylinderGeometry(0.02, 0.015, 0.2, 5);
    palpMidGeom.translate(0, 0.1, 0);
    geometriesToDispose.push(palpMidGeom);

    const palpTipGeom = new THREE.CylinderGeometry(0.015, 0.008, 0.18, 5);
    palpTipGeom.translate(0, 0.09, 0);
    geometriesToDispose.push(palpTipGeom);

    const jointSphereGeom = new THREE.SphereGeometry(0.032, 6, 6);
    geometriesToDispose.push(jointSphereGeom);

    // Left Palp Assembly
    const leftPalp = new THREE.Mesh(palpBaseGeom, titaniumMat);
    leftPalp.position.set(-0.24, -0.05, 0.78);
    leftPalp.rotation.set(0.2, 0.15, -0.12);
    
    const leftPalpMid = new THREE.Mesh(palpMidGeom, titaniumMat);
    leftPalpMid.position.set(0, 0.22, 0);
    leftPalpMid.rotation.x = 0.45; // bent forward
    leftPalp.add(leftPalpMid);

    const leftPalpJoint = new THREE.Mesh(jointSphereGeom, crimsonGlowMat);
    leftPalpJoint.position.set(0, 0, 0);
    leftPalpMid.add(leftPalpJoint);

    const leftPalpTip = new THREE.Mesh(palpTipGeom, titaniumMat);
    leftPalpTip.position.set(0, 0.2, 0);
    leftPalpTip.rotation.x = 0.4;
    leftPalpMid.add(leftPalpTip);

    spiderGroup.add(leftPalp);

    // Right Palp Assembly
    const rightPalp = new THREE.Mesh(palpBaseGeom, titaniumMat);
    rightPalp.position.set(0.24, -0.05, 0.78);
    rightPalp.rotation.set(0.2, -0.15, 0.12);

    const rightPalpMid = new THREE.Mesh(palpMidGeom, titaniumMat);
    rightPalpMid.position.set(0, 0.22, 0);
    rightPalpMid.rotation.x = 0.45; // bent forward
    rightPalp.add(rightPalpMid);

    const rightPalpJoint = new THREE.Mesh(jointSphereGeom, crimsonGlowMat);
    rightPalpJoint.position.set(0, 0, 0);
    rightPalpMid.add(rightPalpJoint);

    const rightPalpTip = new THREE.Mesh(palpTipGeom, titaniumMat);
    rightPalpTip.position.set(0, 0.2, 0);
    rightPalpTip.rotation.x = 0.4;
    rightPalpMid.add(rightPalpTip);

    spiderGroup.add(rightPalp);

    // 8 Legs (4 pairs) - Upgraded to beautiful 3-segment joints with glowing connection hinge spheres!
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
      
      // Distribute origin positions exactly along the sides of the cephalothorax
      const zOffset = 0.42 - index * 0.22;
      legPivot.position.set(side * 0.32, 0.05, zOffset);

      // Coxa (Leg anchor base)
      const coxaGeom = new THREE.CylinderGeometry(0.06, 0.05, 0.15, 6);
      coxaGeom.rotateZ(Math.PI / 2);
      geometriesToDispose.push(coxaGeom);
      const coxa = new THREE.Mesh(coxaGeom, titaniumMat);
      legPivot.add(coxa);

      // Glowing Base Joint Sphere
      const legJointBaseGeom = new THREE.SphereGeometry(0.065, 8, 8);
      geometriesToDispose.push(legJointBaseGeom);
      const baseJoint = new THREE.Mesh(legJointBaseGeom, crimsonGlowMat);
      baseJoint.position.set(side * 0.08, 0, 0);
      coxa.add(baseJoint);

      // 1. FEMUR (Upward/outward segment)
      const femurLen = 0.8 + index * 0.11;
      const femurGeom = new THREE.CylinderGeometry(0.045, 0.032, femurLen, 6);
      femurGeom.translate(0, femurLen / 2, 0); // pivot at base
      geometriesToDispose.push(femurGeom);
      const femur = new THREE.Mesh(femurGeom, titaniumMat);
      baseJoint.add(femur);

      // Glowing Knee Joint Sphere (Patella)
      const kneeJointGeom = new THREE.SphereGeometry(0.045, 8, 8);
      geometriesToDispose.push(kneeJointGeom);
      const kneeJoint = new THREE.Mesh(kneeJointGeom, crimsonGlowMat);
      kneeJoint.position.set(0, femurLen, 0);
      femur.add(kneeJoint);

      // 2. TIBIA (Downward bending segment)
      const tibiaLen = 0.95 + index * 0.14;
      const tibiaGeom = new THREE.CylinderGeometry(0.032, 0.02, tibiaLen, 6);
      tibiaGeom.translate(0, tibiaLen / 2, 0); // pivot at base
      geometriesToDispose.push(tibiaGeom);
      const tibia = new THREE.Mesh(tibiaGeom, titaniumMat);
      kneeJoint.add(tibia);

      // Glowing Ankle Joint Sphere
      const ankleJointGeom = new THREE.SphereGeometry(0.028, 6, 6);
      geometriesToDispose.push(ankleJointGeom);
      const ankleJoint = new THREE.Mesh(ankleJointGeom, crimsonGlowMat);
      ankleJoint.position.set(0, tibiaLen, 0);
      tibia.add(ankleJoint);

      // 3. TARSUS (The final foot claw segment pointing down)
      const tarsusLen = 0.55 + index * 0.07;
      const tarsusGeom = new THREE.CylinderGeometry(0.02, 0.006, tarsusLen, 5);
      tarsusGeom.translate(0, tarsusLen / 2, 0); // pivot at base
      geometriesToDispose.push(tarsusGeom);
      const tarsus = new THREE.Mesh(tarsusGeom, titaniumMat);
      ankleJoint.add(tarsus);

      // Base realistic joint angles
      const spreadAngle = (index - 1.5) * 0.44;
      
      femur.rotation.z = -side * (Math.PI / 3.4); // angled upward
      femur.rotation.y = spreadAngle; // angled forward/backward
      tibia.rotation.z = side * (Math.PI / 1.6); // bent downward sharply
      tarsus.rotation.z = side * (Math.PI / 3.6); // bent even lower towards ground

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
      titaniumMat.dispose();
      crimsonGlowMat.dispose();
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
