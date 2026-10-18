import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface RoboTarunMascotProps {
  className?: string;
  enableClickBadges?: boolean;
}

export const RoboTarunMascot: React.FC<RoboTarunMascotProps> = ({
  className = 'fixed inset-0 w-full h-full pointer-events-auto z-0',
  enableClickBadges = true,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 7.2);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // --- Lighting Architecture ---
    const ambLight = new THREE.AmbientLight(0x1e293b, 2.2);
    scene.add(ambLight);

    const keyLight = new THREE.DirectionalLight(0x00f0ff, 3.8);
    keyLight.position.set(5, 6, 5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x818cf8, 3.2);
    rimLight.position.set(-5, -2, -4);
    scene.add(rimLight);

    const frontFill = new THREE.DirectionalLight(0xffffff, 2.0);
    frontFill.position.set(0, 2, 6);
    scene.add(frontFill);

    const reactorLight = new THREE.PointLight(0x00f0ff, 4.5, 9);
    reactorLight.position.set(0, 0.1, 1.4);
    scene.add(reactorLight);

    // --- Atmospheric Deep Space Background Particles ---
    const starCount = 500;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);
    const colCyan = new THREE.Color(0x38bdf8);
    const colWhite = new THREE.Color(0xffffff);
    const colEmerald = new THREE.Color(0x10b981);

    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3;
      starPos[i3] = (Math.random() - 0.5) * 36;
      starPos[i3 + 1] = (Math.random() - 0.5) * 28;
      starPos[i3 + 2] = (Math.random() - 0.5) * 22 - 3;
      const rnd = Math.random();
      const c = rnd < 0.5 ? colWhite : rnd < 0.85 ? colCyan : colEmerald;
      starColors[i3] = c.r;
      starColors[i3 + 1] = c.g;
      starColors[i3 + 2] = c.b;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
    const starMat = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    // Dual Cosmic Energy Orbit Rings
    const ringGroup = new THREE.Group();
    scene.add(ringGroup);

    const ringGeo1 = new THREE.TorusGeometry(3.3, 0.025, 16, 90);
    const ringMat1 = new THREE.MeshBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.45 });
    const orbit1 = new THREE.Mesh(ringGeo1, ringMat1);
    orbit1.rotation.x = Math.PI * 0.44;
    ringGroup.add(orbit1);

    const ringGeo2 = new THREE.TorusGeometry(3.6, 0.015, 16, 80);
    const ringMat2 = new THREE.MeshBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.3 });
    const orbit2 = new THREE.Mesh(ringGeo2, ringMat2);
    orbit2.rotation.x = Math.PI * 0.38;
    orbit2.rotation.y = Math.PI * 0.2;
    ringGroup.add(orbit2);

    // --- Mascot Root Hierarchy ---
    const mascotRoot = new THREE.Group();
    scene.add(mascotRoot);

    // Materials
    const whiteArmorMat = new THREE.MeshPhongMaterial({
      color: 0xf1f5f9,
      specular: 0xffffff,
      shininess: 120,
      reflectivity: 0.8,
    });

    const darkCarbonMat = new THREE.MeshPhongMaterial({
      color: 0x0f172a,
      specular: 0x38bdf8,
      shininess: 90,
    });

    const gunmetalMat = new THREE.MeshPhongMaterial({
      color: 0x334155,
      specular: 0x94a3b8,
      shininess: 70,
    });

    const goldAccentMat = new THREE.MeshPhongMaterial({
      color: 0xf59e0b,
      specular: 0xfef08a,
      shininess: 100,
    });

    const neonCyanMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
    const neonEmeraldMat = new THREE.MeshBasicMaterial({ color: 0x10b981 });

    const visorGlassMat = new THREE.MeshPhongMaterial({
      color: 0x020617,
      specular: 0x00f0ff,
      shininess: 150,
      transparent: true,
      opacity: 0.95,
    });

    // ================= TORSO & CHASSIS =================
    const torso = new THREE.Group();
    mascotRoot.add(torso);

    const chestPlateGeo = new THREE.CylinderGeometry(0.72, 0.58, 1.15, 24);
    const chestPlate = new THREE.Mesh(chestPlateGeo, whiteArmorMat);
    torso.add(chestPlate);

    const ribGeo = new THREE.BoxGeometry(1.22, 0.45, 0.65);
    const ribs = new THREE.Mesh(ribGeo, darkCarbonMat);
    ribs.position.set(0, -0.15, 0);
    torso.add(ribs);

    const pecGeo = new THREE.BoxGeometry(0.88, 0.55, 0.3);
    const pecPlate = new THREE.Mesh(pecGeo, whiteArmorMat);
    pecPlate.position.set(0, 0.22, 0.36);
    torso.add(pecPlate);

    const reactorHousing = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.32, 0.1, 24), gunmetalMat);
    reactorHousing.rotateX(Math.PI / 2);
    reactorHousing.position.set(0, 0.22, 0.5);
    torso.add(reactorHousing);

    const reactorBezel = new THREE.Mesh(new THREE.TorusGeometry(0.24, 0.035, 16, 32), neonCyanMat);
    reactorBezel.position.set(0, 0.22, 0.56);
    torso.add(reactorBezel);

    const reactorCoreDisc = new THREE.Mesh(new THREE.CircleGeometry(0.18, 24), neonEmeraldMat);
    reactorCoreDisc.position.set(0, 0.22, 0.57);
    torso.add(reactorCoreDisc);

    const badgeMesh = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.08, 0.04), goldAccentMat);
    badgeMesh.position.set(0, 0.45, 0.45);
    torso.add(badgeMesh);

    // ================= ARTICULATED CONNECTED ARMS =================
    // Left Arm
    const pauldronGeo = new THREE.SphereGeometry(0.34, 18, 18);
    const leftShoulderSocket = new THREE.Mesh(new THREE.SphereGeometry(0.25, 16, 16), gunmetalMat);
    leftShoulderSocket.position.set(-0.72, 0.38, 0);
    torso.add(leftShoulderSocket);

    const leftArmRoot = new THREE.Group();
    leftArmRoot.position.set(-0.85, 0.38, 0);
    torso.add(leftArmRoot);

    const leftPauldron = new THREE.Mesh(pauldronGeo, whiteArmorMat);
    leftPauldron.scale.set(1.15, 0.95, 1.05);
    leftArmRoot.add(leftPauldron);

    const leftPauldronTrim = new THREE.Mesh(new THREE.TorusGeometry(0.24, 0.03, 12, 24), neonCyanMat);
    leftPauldronTrim.rotateY(Math.PI / 2);
    leftPauldronTrim.position.set(-0.16, 0, 0);
    leftArmRoot.add(leftPauldronTrim);

    const bicepGroup = new THREE.Group();
    bicepGroup.position.set(-0.08, -0.18, 0);
    leftArmRoot.add(bicepGroup);

    const bicepBone = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.11, 0.42, 16), darkCarbonMat);
    bicepBone.position.set(0, -0.15, 0);
    bicepGroup.add(bicepBone);

    const bicepPlate = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.14, 0.3, 16), whiteArmorMat);
    bicepPlate.position.set(0, -0.15, 0.03);
    bicepGroup.add(bicepPlate);

    const leftElbowJoint = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.13, 0.22, 16), gunmetalMat);
    leftElbowJoint.rotateZ(Math.PI / 2);
    leftElbowJoint.position.set(0, -0.38, 0);
    bicepGroup.add(leftElbowJoint);

    const leftElbowCap = new THREE.Mesh(new THREE.SphereGeometry(0.11, 14, 14), neonCyanMat);
    leftElbowCap.position.set(-0.12, -0.38, 0);
    bicepGroup.add(leftElbowCap);

    const forearmGroup = new THREE.Group();
    forearmGroup.position.set(0, -0.38, 0);
    forearmGroup.rotation.z = 0.22;
    forearmGroup.rotation.x = 0.15;
    bicepGroup.add(forearmGroup);

    const forearmArmour = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.15, 0.46, 16), whiteArmorMat);
    forearmArmour.position.set(0, -0.24, 0);
    forearmGroup.add(forearmArmour);

    const forearmStripe = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.35, 0.32), darkCarbonMat);
    forearmStripe.position.set(0, -0.24, 0);
    forearmGroup.add(forearmStripe);

    const leftWrist = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.025, 12, 20), neonCyanMat);
    leftWrist.rotateX(Math.PI / 2);
    leftWrist.position.set(0, -0.48, 0);
    forearmGroup.add(leftWrist);

    const leftHandGroup = new THREE.Group();
    leftHandGroup.position.set(0, -0.56, 0);
    forearmGroup.add(leftHandGroup);

    const leftPalm = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.16, 0.1), gunmetalMat);
    leftHandGroup.add(leftPalm);

    const leftPalmRepulsor = new THREE.Mesh(new THREE.CircleGeometry(0.06, 16), neonCyanMat);
    leftPalmRepulsor.position.set(0, 0, 0.06);
    leftHandGroup.add(leftPalmRepulsor);

    for (let f = -1; f <= 1; f++) {
      const finger = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.02, 0.15, 8), darkCarbonMat);
      finger.position.set(f * 0.06, -0.14, 0.02);
      finger.rotation.x = -0.25;
      leftHandGroup.add(finger);
      const fingerTip = new THREE.Mesh(new THREE.SphereGeometry(0.025, 8, 8), neonCyanMat);
      fingerTip.position.set(f * 0.06, -0.22, 0.04);
      leftHandGroup.add(fingerTip);
    }
    const leftThumb = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.02, 0.12, 8), darkCarbonMat);
    leftThumb.position.set(0.12, -0.06, 0.04);
    leftThumb.rotation.z = -0.6;
    leftHandGroup.add(leftThumb);

    // Right Arm
    const rightShoulderSocket = new THREE.Mesh(new THREE.SphereGeometry(0.25, 16, 16), gunmetalMat);
    rightShoulderSocket.position.set(0.72, 0.38, 0);
    torso.add(rightShoulderSocket);

    const rightArmRoot = new THREE.Group();
    rightArmRoot.position.set(0.85, 0.38, 0);
    torso.add(rightArmRoot);

    const rightPauldron = new THREE.Mesh(pauldronGeo, whiteArmorMat);
    rightPauldron.scale.set(1.15, 0.95, 1.05);
    rightArmRoot.add(rightPauldron);

    const rightPauldronTrim = new THREE.Mesh(new THREE.TorusGeometry(0.24, 0.03, 12, 24), neonCyanMat);
    rightPauldronTrim.rotateY(Math.PI / 2);
    rightPauldronTrim.position.set(0.16, 0, 0);
    rightArmRoot.add(rightPauldronTrim);

    const rightBicepGroup = new THREE.Group();
    rightBicepGroup.position.set(0.08, -0.18, 0);
    rightArmRoot.add(rightBicepGroup);

    const rightBicepBone = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.11, 0.42, 16), darkCarbonMat);
    rightBicepBone.position.set(0, -0.15, 0);
    rightBicepGroup.add(rightBicepBone);

    const rightBicepPlate = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.14, 0.3, 16), whiteArmorMat);
    rightBicepPlate.position.set(0, -0.15, 0.03);
    rightBicepGroup.add(rightBicepPlate);

    const rightElbowJoint = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.13, 0.22, 16), gunmetalMat);
    rightElbowJoint.rotateZ(Math.PI / 2);
    rightElbowJoint.position.set(0, -0.38, 0);
    rightBicepGroup.add(rightElbowJoint);

    const rightElbowCap = new THREE.Mesh(new THREE.SphereGeometry(0.11, 14, 14), neonCyanMat);
    rightElbowCap.position.set(0.12, -0.38, 0);
    rightBicepGroup.add(rightElbowCap);

    const rightForearmGroup = new THREE.Group();
    rightForearmGroup.position.set(0, -0.38, 0);
    rightForearmGroup.rotation.z = -0.22;
    rightForearmGroup.rotation.x = 0.15;
    rightBicepGroup.add(rightForearmGroup);

    const rightForearmArmour = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.15, 0.46, 16), whiteArmorMat);
    rightForearmArmour.position.set(0, -0.24, 0);
    rightForearmGroup.add(rightForearmArmour);

    const rightForearmStripe = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.35, 0.32), darkCarbonMat);
    rightForearmStripe.position.set(0, -0.24, 0);
    rightForearmGroup.add(rightForearmStripe);

    const rightWrist = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.025, 12, 20), neonCyanMat);
    rightWrist.rotateX(Math.PI / 2);
    rightWrist.position.set(0, -0.48, 0);
    forearmGroup.add(rightWrist);

    const rightHandGroup = new THREE.Group();
    rightHandGroup.position.set(0, -0.56, 0);
    rightForearmGroup.add(rightHandGroup);

    const rightPalm = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.16, 0.1), gunmetalMat);
    rightHandGroup.add(rightPalm);

    const rightPalmRepulsor = new THREE.Mesh(new THREE.CircleGeometry(0.06, 16), neonCyanMat);
    rightPalmRepulsor.position.set(0, 0, 0.06);
    rightHandGroup.add(rightPalmRepulsor);

    for (let f = -1; f <= 1; f++) {
      const finger = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.02, 0.15, 8), darkCarbonMat);
      finger.position.set(f * 0.06, -0.14, 0.02);
      finger.rotation.x = -0.25;
      rightHandGroup.add(finger);
      const fingerTip = new THREE.Mesh(new THREE.SphereGeometry(0.025, 8, 8), neonCyanMat);
      fingerTip.position.set(f * 0.06, -0.22, 0.04);
      rightHandGroup.add(fingerTip);
    }
    const rightThumb = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.02, 0.12, 8), darkCarbonMat);
    rightThumb.position.set(-0.12, -0.06, 0.04);
    rightThumb.rotation.z = 0.6;
    rightHandGroup.add(rightThumb);

    // ================= THRUSTERS & BASE =================
    const thrusterHousing = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.32, 0.45, 20), gunmetalMat);
    thrusterHousing.position.set(0, -0.75, 0);
    torso.add(thrusterHousing);

    const jetNozzle1 = new THREE.Mesh(new THREE.ConeGeometry(0.24, 0.4, 16, 1, true), darkCarbonMat);
    jetNozzle1.rotateX(Math.PI);
    jetNozzle1.position.set(-0.25, -1.0, 0);
    torso.add(jetNozzle1);

    const jetNozzle2 = new THREE.Mesh(new THREE.ConeGeometry(0.24, 0.4, 16, 1, true), darkCarbonMat);
    jetNozzle2.rotateX(Math.PI);
    jetNozzle2.position.set(0.25, -1.0, 0);
    torso.add(jetNozzle2);

    const jetGlowRing1 = new THREE.Mesh(new THREE.TorusGeometry(0.19, 0.03, 12, 24), neonCyanMat);
    jetGlowRing1.rotateX(Math.PI / 2);
    jetGlowRing1.position.set(-0.25, -1.15, 0);
    torso.add(jetGlowRing1);

    const jetGlowRing2 = new THREE.Mesh(new THREE.TorusGeometry(0.19, 0.03, 12, 24), neonCyanMat);
    jetGlowRing2.rotateX(Math.PI / 2);
    jetGlowRing2.position.set(0.25, -1.15, 0);
    torso.add(jetGlowRing2);

    const plumeMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.65 });
    const jetPlume1 = new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.7, 16), plumeMat);
    jetPlume1.position.set(-0.25, -1.45, 0);
    torso.add(jetPlume1);

    const jetPlume2 = new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.7, 16), plumeMat);
    jetPlume2.position.set(0.25, -1.45, 0);
    torso.add(jetPlume2);

    // ================= ARTICULATED HEAD & SENSORS =================
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 1.15, 0);
    mascotRoot.add(headGroup);

    const neckHydraulic = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.28, 0.35, 18), darkCarbonMat);
    neckHydraulic.position.set(0, -0.22, 0);
    headGroup.add(neckHydraulic);

    const neckRing = new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.03, 12, 24), gunmetalMat);
    neckRing.rotateX(Math.PI / 2);
    neckRing.position.set(0, -0.15, 0);
    headGroup.add(neckRing);

    const helmetCranium = new THREE.Mesh(new THREE.BoxGeometry(1.28, 0.96, 1.05), whiteArmorMat);
    headGroup.add(helmetCranium);

    const crestMesh = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.22, 0.4), darkCarbonMat);
    crestMesh.position.set(0, 0.45, 0.4);
    headGroup.add(crestMesh);

    const headSensor = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.12, 0.05), goldAccentMat);
    headSensor.position.set(0, 0.42, 0.61);
    headGroup.add(headSensor);

    const visorMesh = new THREE.Mesh(new THREE.BoxGeometry(1.12, 0.52, 0.3), visorGlassMat);
    visorMesh.position.set(0, 0.06, 0.48);
    headGroup.add(visorMesh);

    const visorScanline = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.02, 0.02), neonCyanMat);
    visorScanline.position.set(0, 0.18, 0.63);
    headGroup.add(visorScanline);

    const eyeAssembly = new THREE.Group();
    eyeAssembly.position.set(0, 0.05, 0.64);
    headGroup.add(eyeAssembly);

    const leftEyeOuter = new THREE.Mesh(new THREE.CircleGeometry(0.14, 20), neonCyanMat);
    leftEyeOuter.position.set(-0.28, 0, 0);
    eyeAssembly.add(leftEyeOuter);

    const leftEyeInner = new THREE.Mesh(new THREE.CircleGeometry(0.07, 16), neonEmeraldMat);
    leftEyeInner.position.set(-0.28, 0, 0.01);
    eyeAssembly.add(leftEyeInner);

    const rightEyeOuter = new THREE.Mesh(new THREE.CircleGeometry(0.14, 20), neonCyanMat);
    rightEyeOuter.position.set(0.28, 0, 0);
    eyeAssembly.add(rightEyeOuter);

    const rightEyeInner = new THREE.Mesh(new THREE.CircleGeometry(0.07, 16), neonEmeraldMat);
    rightEyeInner.position.set(0.28, 0, 0.01);
    eyeAssembly.add(rightEyeInner);

    const leftEarModule = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 0.18, 20), darkCarbonMat);
    leftEarModule.rotateZ(Math.PI / 2);
    leftEarModule.position.set(-0.73, 0.06, 0);
    headGroup.add(leftEarModule);

    const leftEarRing = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.035, 12, 24), neonCyanMat);
    leftEarRing.rotateY(Math.PI / 2);
    leftEarRing.position.set(-0.83, 0.06, 0);
    headGroup.add(leftEarRing);

    const rightEarModule = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 0.18, 20), darkCarbonMat);
    rightEarModule.rotateZ(Math.PI / 2);
    rightEarModule.position.set(0.73, 0.06, 0);
    headGroup.add(rightEarModule);

    const rightEarRing = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.035, 12, 24), neonCyanMat);
    rightEarRing.rotateY(Math.PI / 2);
    rightEarRing.position.set(0.83, 0.06, 0);
    headGroup.add(rightEarRing);

    const antennaPole = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.045, 0.6, 12), gunmetalMat);
    antennaPole.position.set(0.35, 0.75, -0.15);
    antennaPole.rotation.z = -0.15;
    headGroup.add(antennaPole);

    const antennaTip = new THREE.Mesh(new THREE.SphereGeometry(0.09, 14, 14), neonEmeraldMat);
    antennaTip.position.set(0.42, 1.05, -0.15);
    headGroup.add(antennaTip);

    // --- Cursor Tracking & Gaze Raycasting ---
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    function onMouseMove(e: MouseEvent) {
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    }
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    function onClickBackground(e: MouseEvent) {
      if (!enableClickBadges) return;
      if (e.target !== renderer.domElement) return;
      const badge = new THREE.Mesh(
        new THREE.RingGeometry(0.06, 0.12, 18),
        new THREE.MeshBasicMaterial({ color: 0x00f0ff, side: THREE.DoubleSide })
      );
      badge.position.set((Math.random() - 0.5) * 0.45, (Math.random() - 0.5) * 0.35, 0.58);
      torso.add(badge);
      setTimeout(() => torso.remove(badge), 7000);
    }
    window.addEventListener('click', onClickBackground);

    function onWindowResize() {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }
    window.addEventListener('resize', onWindowResize);

    // --- Animation Loop ---
    const clock = new THREE.Clock();
    let animationFrameId: number;

    function animate() {
      animationFrameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      mouse.x += (mouse.targetX - mouse.x) * 0.075;
      mouse.y += (mouse.targetY - mouse.y) * 0.075;

      // Head Gaze Tracking
      headGroup.rotation.y = mouse.x * 0.95;
      headGroup.rotation.x = -mouse.y * 0.65;
      headGroup.rotation.z = -mouse.x * 0.12;

      eyeAssembly.position.x = mouse.x * 0.06;
      eyeAssembly.position.y = 0.05 + mouse.y * 0.04;

      // Torso Counter-Lean
      mascotRoot.rotation.y = mouse.x * 0.3;
      mascotRoot.rotation.z = -mouse.x * 0.06;
      torso.rotation.x = -mouse.y * 0.15;

      // Natural Arm Articulation Following Cursor Motion
      leftArmRoot.rotation.z = -mouse.x * 0.18 + Math.sin(t * 2.0) * 0.04;
      leftArmRoot.rotation.x = mouse.y * 0.2;
      forearmGroup.rotation.y = mouse.x * 0.25;

      rightArmRoot.rotation.z = -mouse.x * 0.18 - Math.sin(t * 2.0) * 0.04;
      rightArmRoot.rotation.x = mouse.y * 0.2;
      rightForearmGroup.rotation.y = mouse.x * 0.25;

      // Idle Hovering Floating Motion
      const hoverOffset = Math.sin(t * 2.2) * 0.18 + Math.cos(t * 1.1) * 0.04;
      mascotRoot.position.y = hoverOffset;

      // Pulsing Plasma Jets
      const pulse1 = 1.0 + Math.sin(t * 16.0) * 0.22;
      const pulse2 = 1.0 + Math.cos(t * 18.0) * 0.22;
      jetPlume1.scale.set(pulse1, 1.0 + Math.sin(t * 14.0) * 0.3, pulse1);
      jetPlume2.scale.set(pulse2, 1.0 + Math.cos(t * 15.0) * 0.3, pulse2);

      // Glowing Arc Reactor Breathing Light
      const breath = 3.6 + Math.sin(t * 4.0) * 1.2;
      reactorLight.intensity = breath;

      // Cosmic Orbit Drift
      orbit1.rotation.z = t * 0.18;
      orbit2.rotation.z = -t * 0.14;
      stars.rotation.y = t * 0.02;

      renderer.render(scene, camera);
    }

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('click', onClickBackground);
      window.removeEventListener('resize', onWindowResize);
      starGeo.dispose();
      starMat.dispose();
      renderer.dispose();
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [enableClickBadges]);

  return <div ref={mountRef} className={className} id="threejs-container-ANIMATION_18" />;
};
