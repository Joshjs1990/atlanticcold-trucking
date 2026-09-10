import { Html, OrbitControls, RoundedBox, Text, useCursor, useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { mergeGeometries, mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

const C = {
  white: '#fbfdfb', painted: '#eef4f2', box: '#e8eeee', aluminum: '#bdc9c9', chrome: '#d8e2df',
  navy: '#06131d', black: '#111a1d', rubber: '#0b1113', glass: '#193742', blue: '#126cb3',
  cyan: '#35b7d1', amber: '#f2a640', red: '#cf3944',
};

const CARGO_BOX = {
  centerX: -3.4,
  centerY: 3.35,
  length: 8.6,
  height: 4.25,
  frontX: 0.9,
  rearX: -7.7,
  frontShiftX: -0.43,
  rearShiftX: -0.85,
};

const HEADLIGHT_PROFILES = {
  recess: [
    ['M', 4.96, 1.31], ['L', 5.7, 1.23], ['Q', 5.94, 1.24, 6.0, 1.39],
    ['L', 5.87, 1.64], ['Q', 5.78, 1.76, 5.54, 1.76], ['L', 5.05, 1.69],
    ['Q', 4.9, 1.6, 4.96, 1.31],
  ],
  pocket: [
    ['M', 5.02, 1.36], ['L', 5.56, 1.31], ['Q', 5.7, 1.32, 5.74, 1.41],
    ['L', 5.67, 1.56], ['Q', 5.61, 1.64, 5.48, 1.64], ['L', 5.12, 1.59],
    ['Q', 4.98, 1.54, 5.02, 1.36],
  ],
  bezel: [
    ['M', 5.11, 1.385], ['L', 5.54, 1.345], ['Q', 5.66, 1.345, 5.69, 1.415],
    ['L', 5.62, 1.535], ['Q', 5.57, 1.595, 5.46, 1.595], ['L', 5.18, 1.55],
    ['Q', 5.08, 1.5, 5.11, 1.385],
  ],
  lens: [
    ['M', 5.14, 1.4], ['L', 5.53, 1.36], ['Q', 5.63, 1.36, 5.66, 1.425],
    ['L', 5.6, 1.51], ['Q', 5.55, 1.56, 5.45, 1.56], ['L', 5.2, 1.525],
    ['Q', 5.12, 1.49, 5.14, 1.4],
  ],
  reflector: [
    ['M', 5.18, 1.42], ['L', 5.42, 1.38], ['Q', 5.49, 1.39, 5.52, 1.45],
    ['L', 5.48, 1.52], ['Q', 5.44, 1.55, 5.37, 1.55], ['L', 5.22, 1.52],
    ['Q', 5.17, 1.49, 5.18, 1.42],
  ],
  indicator: [
    ['M', 5.52, 1.38], ['L', 5.62, 1.38], ['Q', 5.68, 1.4, 5.68, 1.45],
    ['L', 5.62, 1.53], ['Q', 5.56, 1.55, 5.51, 1.51], ['L', 5.52, 1.38],
  ],
};

export const HOTSPOTS = [
  { id: 'cooling', number: '01', title: 'Thermo King unit', description: 'The front-mounted refrigeration unit protects the cold chain from dock to destination, with dedicated cooling for temperature-controlled freight.', position: [1.42, 5.33, -1.35], camera: [10.6, 6.6, -9.7], target: [-0.2, 3.05, 0] },
  { id: 'cargo', number: '02', title: 'Insulated cargo box', description: 'A clean, high-volume refrigerated body for LTL and FTL loads, finished in Atlantic Cold’s blue, black and white livery.', position: [-3.4, 4.08, -1.42], camera: [3.3, 4.5, -14.0], target: [-3.15, 3.1, 0] },
  { id: 'cab', number: '03', title: 'Freightliner-style cab', description: 'The forward-control cab keeps the familiar M2-style hood, visibility and practical access of the working fleet.', position: [3.45, 3.35, -1.45], camera: [11.4, 4.2, -7.7], target: [3.3, 2.3, 0] },
  { id: 'rear', number: '04', title: 'Liftgate access', description: 'A rear liftgate and double-door opening make dock-free delivery and distribution stops more practical across the route.', position: [-8.05, 1.65, -1.15], camera: [-12.3, 4.3, -8.8], target: [-6.7, 2.2, 0] },
];

function PbrMaterial({ color, metalness, roughness, transparent = false, opacity = 1, transmission, ior = 1.45, thickness = 0, depthWrite = true, clearcoat, clearcoatRoughness, envMapIntensity = 1 }) {
  const isPaint = color === C.white || color === C.painted || color === '#fbfdfb';
  const isCargo = color === C.box;
  const isChrome = color === C.chrome;
  const isAluminum = color === C.aluminum;
  const isGlass = color === C.glass || color === '#294b58';
  const isRubber = color === C.rubber;
  const isBlackPlastic = color === C.black;
  const resolvedMetalness = metalness ?? (isChrome ? 1 : isAluminum ? 0.9 : isCargo ? 0.42 : isGlass ? 0.28 : isRubber ? 0 : isBlackPlastic ? 0.08 : 0);
  const resolvedRoughness = roughness ?? (isChrome ? 0.12 : isAluminum ? 0.32 : isCargo ? 0.36 : isGlass ? 0.08 : isRubber ? 0.74 : isBlackPlastic ? 0.38 : isPaint ? 0.25 : 0.3);
  const resolvedTransmission = transmission ?? (isGlass ? 0.24 : 0);
  const resolvedOpacity = opacity ?? (isGlass ? 0.82 : 1);
  const resolvedTransparent = transparent || isGlass || resolvedTransmission > 0;
  return <meshPhysicalMaterial color={color} metalness={resolvedMetalness} roughness={resolvedRoughness} transparent={resolvedTransparent} opacity={resolvedOpacity} transmission={resolvedTransmission} ior={ior} thickness={thickness || (isGlass ? 0.03 : 0)} depthWrite={depthWrite} clearcoat={clearcoat ?? (isPaint ? 0.72 : isGlass ? 0.5 : isBlackPlastic ? 0.16 : 0.08)} clearcoatRoughness={clearcoatRoughness ?? (isPaint ? 0.14 : isGlass ? 0.05 : 0.22)} envMapIntensity={envMapIntensity} />;
}

function Box({ args, color, position, rotation = [0, 0, 0], radius = 0.035, castShadow = true, receiveShadow = true, metalness, roughness }) {
  return <RoundedBox args={args} radius={radius} smoothness={2} position={position} rotation={rotation} castShadow={castShadow} receiveShadow={receiveShadow}><PbrMaterial color={color} roughness={roughness} metalness={metalness} /></RoundedBox>;
}

function Cylinder({ args, color, position, rotation = [Math.PI / 2, 0, 0], metalness, roughness }) {
  return <mesh position={position} rotation={rotation} castShadow receiveShadow><cylinderGeometry args={args} /><PbrMaterial color={color} roughness={roughness} metalness={metalness} /></mesh>;
}

function Ellipsoid({ position, scale, color, rotation = [0, 0, 0], metalness, roughness }) {
  return <mesh position={position} scale={scale} rotation={rotation} castShadow receiveShadow><sphereGeometry args={[1, 32, 18]} /><PbrMaterial color={color} roughness={roughness} metalness={metalness} /></mesh>;
}

function Prism({ points, depth, color, metalness = 0.08, roughness = 0.34 }) {
  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    points.forEach(([x, y], index) => index === 0 ? shape.moveTo(x, y) : shape.lineTo(x, y));
    shape.closePath();
    const next = new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: true, bevelSegments: 2, bevelSize: 0.035, bevelThickness: 0.035 });
    next.translate(0, 0, -depth / 2);
    return next;
  }, [depth, points]);
  return <mesh geometry={geometry} castShadow receiveShadow><PbrMaterial color={color} roughness={roughness} metalness={metalness} /></mesh>;
}

function FramePrism({ outer, inner, depth = 0.05, color = C.black, roughness = 0.42 }) {
  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    outer.forEach(([x, y], index) => index === 0 ? shape.moveTo(x, y) : shape.lineTo(x, y));
    shape.closePath();
    const hole = new THREE.Path();
    [...inner].reverse().forEach(([x, y], index) => index === 0 ? hole.moveTo(x, y) : hole.lineTo(x, y));
    hole.closePath();
    shape.holes.push(hole);
    const next = new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: true, bevelSegments: 2, bevelSize: 0.012, bevelThickness: 0.008, curveSegments: 18 });
    next.translate(0, 0, -depth / 2);
    return next;
  }, [depth, inner, outer]);
  return <mesh geometry={geometry} castShadow receiveShadow><PbrMaterial color={color} metalness={0} roughness={roughness} clearcoat={0.12} clearcoatRoughness={0.24} /></mesh>;
}

function AutomotiveGlassMaterial({ sideWindow = false }) {
  return <meshPhysicalMaterial color={sideWindow ? '#e3eceb' : '#d5e3e1'} metalness={0} roughness={sideWindow ? 0.035 : 0.04} transmission={sideWindow ? 0.94 : 0.93} ior={1.5} thickness={sideWindow ? 0.018 : 0.006} envMapIntensity={sideWindow ? 1.6 : 1.35} transparent opacity={sideWindow ? 0.8 : 0.9} depthWrite={false} depthTest side={THREE.DoubleSide} clearcoat={sideWindow ? 0.32 : 0.24} clearcoatRoughness={0.035} />;
}

function GlassPrism({ points, position = [0, 0, 0] }) {
  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    points.forEach(([x, y], index) => index === 0 ? shape.moveTo(x, y) : shape.lineTo(x, y));
    shape.closePath();
    const next = new THREE.ShapeGeometry(shape, 18);
    next.computeVertexNormals();
    return next;
  }, [points]);
  return <mesh geometry={geometry} position={position} castShadow={false} receiveShadow renderOrder={3}>
    <AutomotiveGlassMaterial sideWindow />
  </mesh>;
}

function InteriorMaskPrism({ points, depth = 0.018, position = [0, 0, 0] }) {
  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    points.forEach(([x, y], index) => index === 0 ? shape.moveTo(x, y) : shape.lineTo(x, y));
    shape.closePath();
    const next = new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: false, curveSegments: 12 });
    next.translate(0, 0, -depth / 2);
    return next;
  }, [depth, points]);
  return <mesh geometry={geometry} position={position} castShadow={false} receiveShadow renderOrder={1}>
    <meshStandardMaterial color="#101b1f" metalness={0} roughness={0.68} transparent opacity={0.62} depthWrite={false} />
  </mesh>;
}

const windshieldPoint = (side, u, v, inset = 0, sealOverlap = 0) => {
  const halfWidth = THREE.MathUtils.lerp(1.12 + sealOverlap, 0.99 + sealOverlap, v);
  const z = side * THREE.MathUtils.lerp(0.012, halfWidth, u);
  const x = 3.49 - 0.19 * v - 0.1 * Math.pow(u, 2.2) - inset;
  const y = THREE.MathUtils.lerp(2.5, 3.72, v);
  return new THREE.Vector3(x, y, z);
};

function CurvedWindshieldPane({ side = 1, backing = false }) {
  const geometry = useMemo(() => {
    const horizontalSegments = 20;
    const verticalSegments = 10;
    const positions = [];
    const indices = [];
    for (let row = 0; row <= verticalSegments; row += 1) {
      const v = row / verticalSegments;
      for (let column = 0; column <= horizontalSegments; column += 1) {
        const point = windshieldPoint(side, column / horizontalSegments, v, backing ? 0.024 : 0, backing ? 0 : 0.16);
        positions.push(point.x, point.y, point.z);
      }
    }
    for (let row = 0; row < verticalSegments; row += 1) {
      for (let column = 0; column < horizontalSegments; column += 1) {
        const current = row * (horizontalSegments + 1) + column;
        const next = current + horizontalSegments + 1;
        if (side > 0) indices.push(current, next, current + 1, current + 1, next, next + 1);
        else indices.push(current, current + 1, next, current + 1, next + 1, next);
      }
    }
    const next = new THREE.BufferGeometry();
    next.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    next.setIndex(indices);
    next.computeVertexNormals();
    return next;
  }, [backing, side]);
  return <mesh geometry={geometry} castShadow={false} receiveShadow renderOrder={backing ? 1 : 4}>
    {backing ? (
      <meshStandardMaterial color="#111b1e" roughness={0.68} transparent opacity={0.5} depthWrite={false} side={THREE.DoubleSide} />
    ) : (
      <AutomotiveGlassMaterial />
    )}
  </mesh>;
}

function SealTube({ points, radius = 0.018 }) {
  const geometry = useMemo(() => new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), 24, radius, 7, false), [points, radius]);
  return <mesh geometry={geometry} castShadow receiveShadow><PbrMaterial color="#182225" metalness={0} roughness={0.44} clearcoat={0.08} clearcoatRoughness={0.25} /></mesh>;
}

function WindshieldSeals() {
  const curves = useMemo(() => {
    const across = (v) => Array.from({ length: 17 }, (_, index) => {
      const signed = index / 8 - 1;
      const halfWidth = THREE.MathUtils.lerp(1.12, 0.99, v);
      const edge = Math.abs(signed);
      return new THREE.Vector3(3.496 - 0.19 * v - 0.1 * Math.pow(edge, 2.2), THREE.MathUtils.lerp(2.5, 3.72, v), signed * halfWidth);
    });
    const edge = (side) => Array.from({ length: 7 }, (_, index) => windshieldPoint(side, 1, index / 6, -0.006));
    const center = Array.from({ length: 7 }, (_, index) => {
      const v = index / 6;
      return new THREE.Vector3(3.497 - 0.19 * v, THREE.MathUtils.lerp(2.49, 3.73, v), 0);
    });
    return [across(0), across(1), edge(-1), edge(1), center];
  }, []);
  return <group>{curves.map((points, index) => <SealTube key={index} points={points} radius={index === 4 ? 0.017 : 0.02} />)}</group>;
}

function CurvedCabBrow() {
  const geometry = useMemo(() => {
    const segments = 12;
    const positions = [];
    const indices = [];
    for (let index = 0; index <= segments; index += 1) {
      const t = index / segments;
      const z = THREE.MathUtils.lerp(-1.25, 1.25, t);
      const edge = Math.abs(z) / 1.25;
      const frontX = 3.42 - 0.1 * edge * edge;
      const rearX = 3.04 - 0.045 * edge * edge;
      const topY = 3.88 - 0.016 * edge;
      const bottomY = 3.73 - 0.012 * edge;
      positions.push(frontX, topY, z, rearX, topY, z, frontX, bottomY, z, rearX, bottomY, z);
    }
    const addQuad = (a, b, c, d) => indices.push(a, b, c, a, c, d);
    for (let index = 0; index < segments; index += 1) {
      const current = index * 4;
      const next = current + 4;
      addQuad(current, next, next + 1, current + 1);
      addQuad(current + 2, current + 3, next + 3, next + 2);
      addQuad(current, current + 2, next + 2, next);
      addQuad(current + 1, next + 1, next + 3, current + 3);
    }
    addQuad(0, 1, 3, 2);
    const last = segments * 4;
    addQuad(last, last + 2, last + 3, last + 1);
    const next = new THREE.BufferGeometry();
    next.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    next.setIndex(indices);
    next.computeVertexNormals();
    return next;
  }, []);
  return <mesh geometry={geometry} castShadow receiveShadow><PbrMaterial color={C.painted} metalness={0.01} roughness={0.24} clearcoat={0.8} clearcoatRoughness={0.12} envMapIntensity={1.1} /></mesh>;
}

function SmoothPrism({ commands, depth, color, metalness = 0.08, roughness = 0.34, bevelSize = 0.025, bevelThickness = 0.025, physical = false, transparent = false, opacity = 1, transmission = 0, ior = 1.45, thickness = 0, envMapIntensity = 1, depthWrite = true, clearcoat = 0, clearcoatRoughness = 0.1 }) {
  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    commands.forEach(([command, ...values]) => {
      if (command === 'M') shape.moveTo(...values);
      if (command === 'L') shape.lineTo(...values);
      if (command === 'Q') shape.quadraticCurveTo(...values);
    });
    shape.closePath();
    const next = new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: true, bevelSegments: 5, bevelSize, bevelThickness, curveSegments: 24 });
    next.translate(0, 0, -depth / 2);
    return next;
  }, [commands, depth]);
  return <mesh geometry={geometry} castShadow receiveShadow>{physical ? (
    <meshPhysicalMaterial color={color} roughness={roughness} metalness={metalness} transparent={transparent} opacity={opacity} transmission={transmission} ior={ior} thickness={thickness} envMapIntensity={envMapIntensity} depthWrite={depthWrite} clearcoat={clearcoat} clearcoatRoughness={clearcoatRoughness} />
  ) : <PbrMaterial color={color} roughness={roughness} metalness={metalness} transparent={transparent} opacity={opacity} depthWrite={depthWrite} envMapIntensity={envMapIntensity} />}</mesh>;
}

function FrontClipReference() {
  const geometry = useMemo(() => {
    const sections = [
      [3.18, 2.43, 1.31, 2.27, 1.16],
      [3.46, 2.42, 1.3, 2.24, 1.13],
      [3.82, 2.38, 1.27, 2.19, 1.08],
      [4.18, 2.38, 1.22, 2.12, 1.03],
      [4.54, 2.34, 1.16, 2.02, 0.99],
      [4.88, 2.3, 1.08, 1.9, 0.96],
      [5.18, 2.28, 0.99, 1.88, 0.95],
      [5.46, 2.25, 0.92, 1.84, 0.94],
      [5.68, 2.23, 0.87, 1.8, 0.92],
      [5.86, 2.22, 0.82, 1.76, 0.91],
    ];
    const positions = [];
    const ringSize = 10;
    sections.forEach(([x, top, width, shoulder, bottom]) => {
      const ring = [
        [-width, shoulder], [-width * 0.77, top - 0.045], [-width * 0.38, top + 0.015], [0, top + 0.055],
        [width * 0.38, top + 0.015], [width * 0.77, top - 0.045], [width, shoulder],
        [width * 0.76, bottom], [0, bottom - 0.025], [-width * 0.76, bottom],
      ];
      ring.forEach(([z, y]) => positions.push(x, y, z));
    });
    const indices = [];
    const add = (a, b, c) => indices.push(a, b, c);
    for (let section = 0; section < sections.length - 1; section += 1) {
      const current = section * ringSize;
      const next = current + ringSize;
      for (let point = 0; point < ringSize; point += 1) {
        const following = (point + 1) % ringSize;
        // The ring runs clockwise when viewed from the front. Reverse the
        // longitudinal quad winding so every hood-side normal points out of
        // the shell rather than into the engine bay.
        add(current + point, next + following, next + point);
        add(current + point, current + following, next + following);
      }
    }
    for (let point = 1; point < ringSize - 1; point += 1) add(0, point + 1, point);
    const last = (sections.length - 1) * ringSize;
    for (let point = 1; point < ringSize - 1; point += 1) add(last, last + point, last + point + 1);
    const hood = new THREE.BufferGeometry();
    hood.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    hood.setIndex(indices);
    hood.computeVertexNormals();

    const fenderShape = new THREE.Shape();
    fenderShape.moveTo(3.23, 0.72);
    fenderShape.lineTo(3.28, 1.25);
    fenderShape.quadraticCurveTo(3.38, 1.7, 3.82, 1.95);
    fenderShape.quadraticCurveTo(4.2, 2.1, 4.7, 2.06);
    fenderShape.quadraticCurveTo(5.16, 2.0, 5.54, 1.82);
    fenderShape.quadraticCurveTo(5.8, 1.7, 5.94, 1.45);
    fenderShape.quadraticCurveTo(5.98, 1.3, 5.9, 1.13);
    fenderShape.quadraticCurveTo(5.84, 0.92, 5.68, 0.76);
    fenderShape.lineTo(5.2, 0.74);
    fenderShape.quadraticCurveTo(5.24, 1.0, 5.16, 1.28);
    fenderShape.quadraticCurveTo(5.03, 1.5, 4.77, 1.62);
    fenderShape.quadraticCurveTo(4.48, 1.75, 4.2, 1.68);
    fenderShape.quadraticCurveTo(3.9, 1.58, 3.75, 1.28);
    fenderShape.quadraticCurveTo(3.68, 1.04, 3.67, 0.74);
    fenderShape.lineTo(3.23, 0.72);
    fenderShape.closePath();

    const fenderTaper = (x) => THREE.MathUtils.clamp((x - 4.65) / (5.94 - 4.65), 0, 1);
    const fenderInnerZ = (x) => THREE.MathUtils.lerp(1.23, 0.76, fenderTaper(x));
    const makeFender = (side) => {
      const fender = new THREE.ExtrudeGeometry(fenderShape, { depth: 0.34, bevelEnabled: false, curveSegments: 48 });
      fender.translate(0, 0, side > 0 ? 1.23 : -1.57);
      const position = fender.attributes.position;
      for (let vertex = 0; vertex < position.count; vertex += 1) {
        const x = position.getX(vertex);
        const z = position.getZ(vertex);
        const depthT = THREE.MathUtils.clamp((Math.abs(z) - 1.23) / 0.34, 0, 1);
        const inner = fenderInnerZ(x);
        const outer = THREE.MathUtils.lerp(inner, inner + 0.34, 1);
        position.setZ(vertex, side * THREE.MathUtils.lerp(inner, outer, depthT));
      }
      position.needsUpdate = true;
      return fender;
    };

    // Curved shoulder bridges close the shallow valley between the hood rail
    // and each fender's inner face. The middle row bows outward slightly so
    // this reads as one molded front clip rather than a flat triangular patch.
    const bridgeWidths = sections.map(([, , width]) => width);
    const bridgeShoulders = sections.map(([, , , shoulder]) => shoulder);
    const bridgeFenderHeights = [1.98, 1.96, 1.98, 2.06, 2.08, 2.0, 1.9, 1.7, 1.42, 1.12];
    const makeShoulderBridge = (side) => {
      const bridgePositions = [];
      bridgeWidths.forEach((width, index) => {
        const hoodZ = Math.max(width - 0.015, 0);
        const fenderZ = fenderInnerZ(sections[index][0]);
        const hoodY = bridgeShoulders[index] + 0.015;
        const fenderY = bridgeFenderHeights[index];
        const blendRows = [
          [hoodY, hoodZ],
          [hoodY + 0.028, hoodZ + (fenderZ - hoodZ) * 0.24],
          [hoodY + 0.048, hoodZ + (fenderZ - hoodZ) * 0.5],
          [fenderY + 0.018, hoodZ + (fenderZ - hoodZ) * 0.76],
          [fenderY, fenderZ],
        ];
        blendRows.forEach(([y, z]) => bridgePositions.push(sections[index][0], y, side * z));
      });
      const bridgeIndices = [];
      const addBridgeQuad = (a, b, c, d) => {
        if (side > 0) bridgeIndices.push(a, b, c, a, c, d);
        else bridgeIndices.push(a, c, b, a, d, c);
      };
      for (let section = 0; section < sections.length - 1; section += 1) {
        const current = section * 5;
        const next = current + 5;
        for (let row = 0; row < 4; row += 1) {
          addBridgeQuad(current + row, next + row, next + row + 1, current + row + 1);
        }
      }
      const bridge = new THREE.BufferGeometry();
      bridge.setAttribute('position', new THREE.Float32BufferAttribute(bridgePositions, 3));
      bridge.setIndex(bridgeIndices);
      bridge.computeVertexNormals();
      return bridge;
    };
    const parts = [hood, makeFender(1), makeFender(-1), makeShoulderBridge(1), makeShoulderBridge(-1)].map((part) => {
      const normalized = part.index ? part.toNonIndexed() : part;
      normalized.deleteAttribute('uv');
      return normalized;
    });
    const merged = mergeGeometries(parts, false);
    const welded = mergeVertices(merged, 1e-4);
    welded.computeVertexNormals();
    return welded;
  }, []);
  return <mesh geometry={geometry} castShadow receiveShadow><PbrMaterial color="#fbfdfb" roughness={0.24} metalness={0.02} clearcoat={0.78} clearcoatRoughness={0.13} envMapIntensity={1.1} /></mesh>;
}

function LogoPlaneContent({ position, side = 1, width = 3.7 }) {
  const logo = useTexture('/atlantic-cold-logo.webp');
  return <mesh position={position} rotation={[0, side < 0 ? Math.PI : 0, 0]} renderOrder={3}><planeGeometry args={[width, width / 3]} /><meshBasicMaterial map={logo} transparent alphaTest={0.02} side={THREE.DoubleSide} toneMapped={false} /></mesh>;
}

function LogoPlane(props) {
  return <Suspense fallback={null}><LogoPlaneContent {...props} /></Suspense>;
}

function SideText({ children, position, side = 1, fontSize = 0.18, color = C.navy, maxWidth, letterSpacing = 0, anchorX = 'left', anchorY = 'middle', fontWeight = 500, rotation = [0, 0, 0] }) {
  return <Suspense fallback={null}><Text position={position} rotation={side < 0 ? [0, Math.PI, 0] : rotation} font="/fonts/barlow-condensed-medium-italic.ttf" fontSize={fontSize} color={color} anchorX={anchorX} anchorY={anchorY} maxWidth={maxWidth} letterSpacing={letterSpacing} fontWeight={fontWeight} outlineWidth={0.004} outlineColor={color} renderOrder={4}>{children}</Text></Suspense>;
}

function SnowflakeMark({ position, side = 1 }) {
  return <group position={position} rotation={[0, side < 0 ? Math.PI : 0, 0]}>
    <Box args={[0.22, 0.025, 0.025]} color={C.blue} radius={0.01} castShadow={false} receiveShadow={false} />
    <Box args={[0.025, 0.22, 0.025]} color={C.blue} radius={0.01} castShadow={false} receiveShadow={false} />
    <Box args={[0.17, 0.025, 0.025]} color={C.blue} rotation={[0, 0, Math.PI / 4]} radius={0.01} castShadow={false} receiveShadow={false} />
    <Box args={[0.17, 0.025, 0.025]} color={C.blue} rotation={[0, 0, -Math.PI / 4]} radius={0.01} castShadow={false} receiveShadow={false} />
  </group>;
}

function SideLivery({ side = 1 }) {
  // Keep the fixed service artwork as one deterministic two-column layout.
  // Explicit line arrays prevent drei's maxWidth wrapping from splitting words.
  const serviceRows = [
    { lines: ['REFRIGERATED'], y: 4.18 },
    { lines: ['FROZEN'], y: 3.72 },
    { lines: ['LTL & FTL', 'TRUCKLOAD'], y: 3.24 },
    { lines: ['DISTRIBUTION &', 'CONSOLIDATION'], y: 2.72 },
    { lines: ['SERVING NY, NJ, CT &', 'PA'], y: 2.18 },
  ];
  const logoX = CARGO_BOX.centerX + 1.05;
  const serviceIconX = -4.62;
  const serviceTextX = -4.95;
  return <group>
    <LogoPlane position={[logoX, 3.88, side * 1.415]} side={side} width={3.95} />
    <SideText position={[logoX, 2.56, side * 1.415]} side={side} fontSize={0.28} color={C.blue} letterSpacing={0.02} fontWeight={700} anchorX="center">atlanticcold.com</SideText>
    <group>
      {serviceRows.map(({ lines, y }) => <group key={lines.join('-')}>
        <SnowflakeMark position={[serviceIconX, y, side * 1.415]} side={side} />
        {lines.map((line, lineIndex) => <SideText key={line} position={[serviceTextX, y + (lines.length === 1 ? 0 : lineIndex === 0 ? 0.115 : -0.115), side * 1.415]} side={side} fontSize={0.18} color={C.navy} letterSpacing={-0.01} fontWeight={700} anchorX={side === 1 ? 'right' : 'left'}>{line}</SideText>)}
      </group>)}
    </group>
    <Box args={[7.82, 0.06, 0.035]} color={C.aluminum} position={[CARGO_BOX.centerX, 1.64, side * 1.42]} radius={0.01} castShadow={false} />
    <Box args={[7.76, 0.105, 0.035]} color={C.white} position={[CARGO_BOX.centerX, 1.51, side * 1.421]} radius={0.01} castShadow={false} />
    {Array.from({ length: 20 }).map((_, index) => <Box key={index} args={[0.24, 0.06, 0.042]} color={index % 2 ? C.white : C.red} position={[-6.82 + index * 0.4, 1.41, side * 1.424]} radius={0.005} castShadow={false} />)}
  </group>;
}

function Wheel({ position, dual = false, front = false }) {
  return <group position={position}>
    <Cylinder args={[front ? 0.82 : 0.74, front ? 0.82 : 0.74, 0.42, 30]} color={C.rubber} roughness={0.76} />
    <Cylinder args={[front ? 0.45 : 0.38, front ? 0.45 : 0.38, 0.45, 26]} color={C.chrome} metalness={0.9} />
    <Cylinder args={[0.16, 0.16, 0.48, 16]} color={C.black} metalness={0.3} /><Cylinder args={[0.08, 0.08, 0.5, 12]} color={C.aluminum} metalness={0.7} />
    {dual && <group position={[0, 0, 0.36]}><Cylinder args={[0.74, 0.74, 0.32, 26]} color={C.rubber} roughness={0.76} /><Cylinder args={[0.36, 0.36, 0.35, 22]} color={C.chrome} metalness={0.9} /></group>}
  </group>;
}

function CabSide({ side = 1 }) {
  return <group>
    <Box args={[1.42, 1.28, 0.055]} color={C.glass} position={[2.08, 3.2, side * 1.335]} rotation={[0, 0, -0.1]} radius={0.1} metalness={0.15} roughness={0.18} />
    <Box args={[0.78, 0.9, 0.06]} color={C.glass} position={[3.06, 3.05, side * 1.34]} rotation={[0, 0, -0.14]} radius={0.08} metalness={0.15} roughness={0.18} />
    <Box args={[0.07, 1.32, 0.08]} color={C.black} position={[2.72, 3.12, side * 1.37]} rotation={[0, 0, -0.12]} radius={0.02} />
    <Box args={[0.11, 0.55, 0.13]} color={C.black} position={[3.0, 2.12, side * 1.36]} radius={0.035} /><Box args={[0.56, 0.08, 0.11]} color={C.chrome} position={[2.84, 1.98, side * 1.38]} radius={0.025} />
    <Box args={[0.62, 0.58, 0.08]} color={C.chrome} position={[2.78, 1.68, side * 1.34]} radius={0.03} /><Box args={[0.46, 0.08, 0.09]} color={C.black} position={[2.66, 2.05, side * 1.41]} radius={0.02} />
    <LogoPlane position={[2.02, 2.06, side * 1.395]} side={side} width={0.9} />
    <SideText position={[2.02, 1.58, side * 1.395]} side={side} fontSize={0.105} color={C.navy} anchorX="center">85 KERO ROAD</SideText><SideText position={[2.02, 1.39, side * 1.395]} side={side} fontSize={0.093} color={C.navy} anchorX="center">CARLSTADT, NJ 07072</SideText>
    <SideText position={[2.02, 1.2, side * 1.395]} side={side} fontSize={0.093} color={C.navy} anchorX="center">USDOT 2446059</SideText><SideText position={[2.02, 1.02, side * 1.395]} side={side} fontSize={0.093} color={C.navy} anchorX="center">GVW 33,000</SideText>
    <Box args={[0.08, 1.18, 0.08]} color={C.black} position={[1.46, 2.76, side * 1.37]} radius={0.02} /><Box args={[0.08, 1.12, 0.08]} color={C.chrome} position={[1.38, 2.7, side * 1.39]} radius={0.02} />
  </group>;
}

function Cab() {
  const cab = [[1.35, 1.27], [3.55, 1.27], [3.55, 2.34], [3.18, 3.65], [2.65, 4.02], [1.35, 3.84]];
  const hood = [[3.08, 1.27], [5.42, 1.27], [5.5, 1.55], [5.26, 1.98], [4.68, 2.2], [3.55, 2.3], [3.08, 2.04]];
  return <group>
    <Prism points={cab} depth={2.66} color={C.white} metalness={0.04} roughness={0.28} /><Prism points={hood} depth={2.72} color={C.painted} metalness={0.04} roughness={0.28} />
    <Box args={[0.14, 1.38, 2.26]} color={C.glass} position={[3.23, 3.12, 0]} rotation={[0, 0, -0.23]} radius={0.06} metalness={0.15} roughness={0.18} />
    <Box args={[0.18, 0.14, 2.52]} color={C.black} position={[2.72, 4.04, 0]} rotation={[0, 0, 0.06]} radius={0.03} /><Box args={[0.14, 0.1, 2.42]} color={C.chrome} position={[2.66, 4.1, 0]} rotation={[0, 0, 0.06]} radius={0.02} />
    <Box args={[0.2, 1.1, 2.5]} color={C.black} position={[5.42, 1.78, 0]} radius={0.08} /><Box args={[0.075, 0.72, 1.86]} color={C.navy} position={[5.55, 1.98, 0]} radius={0.025} />
    {[-0.63, -0.21, 0.21, 0.63].map((z) => <Box key={z} args={[0.035, 0.58, 0.07]} color={C.aluminum} position={[5.59, 1.98, z]} radius={0.01} castShadow={false} />)}
    <Box args={[0.28, 0.4, 2.74]} color={C.black} position={[5.48, 1.05, 0]} radius={0.05} />
    {[-0.91, 0.91].map((z) => <group key={z}><Box args={[0.075, 0.38, 0.54]} color={C.chrome} position={[5.6, 1.72, z]} radius={0.09} metalness={0.68} /><Box args={[0.035, 0.25, 0.38]} color={C.amber} position={[5.64, 1.72, z]} radius={0.08} /></group>)}
    <Box args={[0.86, 0.1, 0.38]} color={C.black} position={[4.35, 2.2, 1.34]} rotation={[0, 0, -0.08]} radius={0.05} /><Box args={[0.66, 0.035, 0.25]} color={C.chrome} position={[4.36, 2.25, 1.52]} rotation={[0, 0, -0.08]} radius={0.02} castShadow={false} />
    <Box args={[0.08, 0.18, 2.54]} color={C.chrome} position={[5.38, 1.47, 0]} radius={0.02} />
    <CabSide side={1} /><CabSide side={-1} />
    <group position={[3.94, 3.05, 0]}>{[1, -1].map((side) => <group key={side}><Box args={[0.88, 0.08, 0.09]} color={C.black} position={[0.32, 0.28, side * 1.5]} rotation={[0, 0, -0.14]} radius={0.02} /><Box args={[0.46, 0.72, 0.12]} color={C.chrome} position={[0.78, 0.34, side * 1.54]} rotation={[0, 0, -0.14]} radius={0.04} /><Box args={[0.34, 0.52, 0.04]} color={C.glass} position={[0.82, 0.37, side * 1.61]} rotation={[0, 0, -0.14]} radius={0.03} metalness={0.2} roughness={0.18} /></group>)}</group>
  </group>;
}

function RefrigerationUnit() {
  const housing = [[0.55, 4.44], [0.6, 5.28], [0.92, 5.72], [1.38, 5.94], [2.22, 5.92], [2.65, 5.68], [2.82, 5.22], [2.67, 4.62], [2.35, 4.42]];
  return <group>
    <Prism points={housing} depth={2.48} color={C.white} metalness={0.03} roughness={0.27} />
    <Box args={[0.1, 0.92, 2.12]} color={C.black} position={[2.88, 5.47, 0]} radius={0.04} /><Box args={[0.08, 0.22, 1.86]} color={C.navy} position={[2.94, 5.7, 0]} radius={0.02} /><Box args={[0.08, 0.26, 1.94]} color={C.navy} position={[2.94, 5.12, 0]} radius={0.02} />
    {[-0.7, -0.35, 0, 0.35, 0.7].map((z) => <Box key={z} args={[0.035, 0.22, 0.055]} color={C.aluminum} position={[2.98, 5.7, z]} radius={0.008} castShadow={false} />)}
    <SideText position={[3.01, 5.39, 0]} fontSize={0.22} color={C.white} anchorX="center" rotation={[0, Math.PI / 2, 0]}>THERMO KING</SideText>
    <Box args={[0.76, 0.72, 0.075]} color={C.painted} position={[1.72, 5.25, 1.27]} radius={0.025} metalness={0.12} /><Box args={[0.52, 0.15, 0.08]} color={C.black} position={[1.35, 5.64, 1.29]} radius={0.025} />
    <Box args={[0.48, 0.06, 2.2]} color={C.aluminum} position={[1.5, 4.4, 0]} radius={0.02} /><Box args={[0.12, 0.1, 2.3]} color={C.chrome} position={[0.62, 4.8, 0]} radius={0.02} />
    <Cylinder args={[0.12, 0.12, 0.12, 16]} color={C.black} position={[0.72, 4.3, 1.03]} rotation={[0, Math.PI / 2, 0]} /><Cylinder args={[0.12, 0.12, 0.12, 16]} color={C.black} position={[0.72, 4.3, -1.03]} rotation={[0, Math.PI / 2, 0]} />
  </group>;
}

function BoxDetails() {
  const boxCenter = CARGO_BOX.centerX;
  return <group>
    <Box args={[CARGO_BOX.length, CARGO_BOX.height, 2.76]} color={C.box} position={[boxCenter, CARGO_BOX.centerY, 0]} radius={0.035} metalness={0.46} roughness={0.36} /><Box args={[CARGO_BOX.length - 0.24, CARGO_BOX.height - 0.26, 2.79]} color={C.white} position={[boxCenter, CARGO_BOX.centerY, 0]} radius={0.02} castShadow={false} metalness={0.06} roughness={0.25} />
    <SideLivery side={1} /><SideLivery side={-1} />
    <Box args={[0.13, CARGO_BOX.height - 0.15, 2.82]} color={C.chrome} position={[CARGO_BOX.rearX - 0.03, CARGO_BOX.centerY, 0]} radius={0.018} /><Box args={[0.11, CARGO_BOX.height - 0.32, 2.78]} color={C.chrome} position={[CARGO_BOX.frontX + 0.03, CARGO_BOX.centerY, 0]} radius={0.018} />
    <Box args={[0.1, 0.08, 2.6]} color={C.aluminum} position={[boxCenter, CARGO_BOX.centerY + CARGO_BOX.height / 2 - 0.04, 0]} radius={0.01} /><Box args={[0.1, 0.08, 2.6]} color={C.aluminum} position={[boxCenter, CARGO_BOX.centerY - CARGO_BOX.height / 2 + 0.08, 0]} radius={0.01} />
    <group position={[CARGO_BOX.rearX - 0.15, CARGO_BOX.centerY - 0.03, 0]}>{[-1.18, -0.39, 0.4, 1.19].map((y) => <group key={y}><Box args={[0.14, 0.25, 0.2]} color={C.chrome} position={[0, y, 1.42]} radius={0.04} /><Box args={[0.07, 0.16, 0.08]} color={C.black} position={[0.08, y, 1.53]} radius={0.02} /></group>)}</group>
  </group>;
}

function Underbody() {
  return <group>
    <Box args={[14.1, 0.28, 2.3]} color={C.black} position={[-1.0, 1.12, 0]} radius={0.025} /><Box args={[11.0, 0.18, 2.42]} color={C.aluminum} position={[-2.0, 1.35, 0]} radius={0.025} />
    <Cylinder args={[0.54, 0.54, 1.5, 24]} color={C.aluminum} position={[1.2, 1.55, 1.2]} rotation={[0, Math.PI / 2, 0]} metalness={0.9} /><Cylinder args={[0.43, 0.43, 0.08, 24]} color={C.black} position={[0.44, 1.55, 1.2]} rotation={[0, Math.PI / 2, 0]} metalness={0.3} />
    <Box args={[1.28, 0.56, 0.52]} color={C.black} position={[2.2, 1.55, 1.38]} radius={0.08} /><Box args={[1.25, 0.1, 0.55]} color={C.chrome} position={[2.2, 1.88, 1.4]} radius={0.02} /><Box args={[1.7, 0.12, 0.18]} color={C.chrome} position={[3.0, 1.2, 1.44]} radius={0.02} /><Box args={[1.55, 0.09, 0.16]} color={C.chrome} position={[3.0, 1.0, 1.44]} radius={0.02} />
  </group>;
}

function RearLiftgate() {
  return <group position={[CARGO_BOX.rearShiftX, 0, 0]}>
    <Box args={[0.18, 1.58, 2.5]} color={C.black} position={[-7.24, 1.95, 0]} radius={0.02} /><Box args={[0.11, 1.38, 2.28]} color={C.aluminum} position={[-7.12, 2.0, 0]} radius={0.015} /><Box args={[0.18, 0.09, 2.38]} color={C.chrome} position={[-7.0, 2.7, 0]} radius={0.01} /><Box args={[0.18, 0.09, 2.38]} color={C.chrome} position={[-7.0, 1.31, 0]} radius={0.01} />
    <Box args={[0.84, 0.12, 2.5]} color={C.chrome} position={[-6.66, 1.02, 0]} rotation={[0, 0, -0.08]} radius={0.02} /><Box args={[0.52, 0.08, 2.22]} color={C.black} position={[-6.38, 0.76, 0]} rotation={[0, 0, -0.08]} radius={0.015} /><Box args={[0.15, 0.7, 0.14]} color={C.chrome} position={[-6.72, 0.64, 1.04]} rotation={[0, 0, 0.2]} radius={0.02} /><Box args={[0.15, 0.7, 0.14]} color={C.chrome} position={[-6.72, 0.64, -1.04]} rotation={[0, 0, 0.2]} radius={0.02} />
  </group>;
}

function CabSideAccurate({ side = 1 }) {
  const z = side * 1.38;
  return <group>
    <Box args={[1.58, 1.36, 0.08]} color={C.black} position={[2.28, 3.18, z]} rotation={[0, 0, -0.08]} radius={0.12} metalness={0.15} />
    <Box args={[1.42, 1.2, 0.09]} color={C.glass} position={[2.28, 3.18, side * 1.43]} rotation={[0, 0, -0.08]} radius={0.1} metalness={0.18} roughness={0.16} />
    <Box args={[0.06, 1.72, 0.08]} color={C.black} position={[1.45, 2.55, side * 1.4]} radius={0.02} />
    <Box args={[0.12, 0.52, 0.14]} color={C.black} position={[2.95, 2.08, side * 1.45]} radius={0.04} />
    <Box args={[0.56, 0.08, 0.12]} color={C.chrome} position={[2.82, 1.93, side * 1.46]} radius={0.025} />
    <LogoPlane position={[1.98, 2.06, side * 1.455]} side={side} width={0.82} />
    <SideText position={[1.98, 1.6, side * 1.455]} side={side} fontSize={0.105} color={C.navy} anchorX="center">85 KERO ROAD</SideText>
    <SideText position={[1.98, 1.4, side * 1.455]} side={side} fontSize={0.092} color={C.navy} anchorX="center">CARLSTADT, NJ 07072</SideText>
    <SideText position={[1.98, 1.2, side * 1.455]} side={side} fontSize={0.092} color={C.navy} anchorX="center">USDOT 2446059</SideText>
    <SideText position={[1.98, 1.02, side * 1.455]} side={side} fontSize={0.092} color={C.navy} anchorX="center">GVW 33,000</SideText>
  </group>;
}

function CabAccurate() {
  const cab = [[1.3, 1.27], [3.56, 1.27], [3.56, 2.38], [3.26, 3.5], [2.92, 3.94], [1.36, 3.94], [1.3, 3.52]];
  const hood = [[3.05, 1.27], [5.48, 1.27], [5.56, 1.53], [5.3, 1.98], [4.72, 2.22], [3.62, 2.35], [3.08, 2.12]];
  return <group>
    <Prism points={cab} depth={2.68} color={C.white} metalness={0.04} roughness={0.28} />
    <Prism points={hood} depth={2.76} color={C.painted} metalness={0.04} roughness={0.28} />
    {/* Two-piece, sloped M2 windshield with a visible central divider. */}
    <Box args={[0.2, 1.48, 2.5]} color={C.black} position={[3.47, 3.2, 0]} rotation={[0, 0, -0.23]} radius={0.06} />
    <Box args={[0.13, 1.24, 1.12]} color={C.glass} position={[3.6, 3.2, -0.64]} rotation={[0, 0, -0.23]} radius={0.04} metalness={0.18} roughness={0.16} />
    <Box args={[0.13, 1.24, 1.12]} color={C.glass} position={[3.6, 3.2, 0.64]} rotation={[0, 0, -0.23]} radius={0.04} metalness={0.18} roughness={0.16} />
    <Box args={[0.14, 1.25, 0.07]} color={C.black} position={[3.65, 3.2, 0]} rotation={[0, 0, -0.23]} radius={0.01} />
    <Box args={[0.18, 0.14, 2.54]} color={C.black} position={[2.68, 4.02, 0]} rotation={[0, 0, 0.05]} radius={0.03} />
    <Box args={[0.14, 0.1, 2.44]} color={C.chrome} position={[2.62, 4.08, 0]} rotation={[0, 0, 0.05]} radius={0.02} />
    {/* Tall hood, inset side air intake, and the M2 front face. */}
    <Box args={[1.7, 0.1, 2.5]} color={C.white} position={[4.35, 2.3, 0]} rotation={[0, 0, -0.06]} radius={0.05} castShadow={false} />
    <Box args={[0.88, 0.11, 0.4]} color={C.black} position={[4.3, 2.19, -1.39]} rotation={[0, 0, -0.07]} radius={0.05} />
    <Box args={[0.66, 0.035, 0.25]} color={C.chrome} position={[4.31, 2.25, -1.57]} rotation={[0, 0, -0.07]} radius={0.02} castShadow={false} />
    <Box args={[0.2, 0.98, 2.58]} color={C.black} position={[5.48, 1.72, 0]} radius={0.08} />
    <Box args={[0.08, 0.7, 1.72]} color={C.navy} position={[5.61, 1.86, 0]} radius={0.025} />
    {[-0.64, -0.21, 0.21, 0.64].map((z) => <Box key={z} args={[0.035, 0.55, 0.065]} color={C.aluminum} position={[5.65, 1.86, z]} radius={0.01} castShadow={false} />)}
    <Box args={[0.28, 0.38, 2.78]} color={C.black} position={[5.5, 1.03, 0]} radius={0.05} />
    {[-0.94, 0.94].map((z) => <group key={z}><Box args={[0.08, 0.4, 0.6]} color={C.chrome} position={[5.65, 1.62, z]} radius={0.1} metalness={0.72} /><Box args={[0.04, 0.24, 0.42]} color={C.white} position={[5.7, 1.64, z]} radius={0.08} /><Box args={[0.04, 0.16, 0.32]} color={C.amber} position={[5.72, 1.52, z]} radius={0.06} /></group>)}
    {[1, -1].map((side) => <group key={side}>
      <Box args={[0.62, 0.46, 0.1]} color={C.black} position={[4.92, 1.6, side * 1.39]} rotation={[0, 0, -0.06]} radius={0.1} />
      <Box args={[0.5, 0.34, 0.12]} color={C.chrome} position={[4.92, 1.6, side * 1.44]} rotation={[0, 0, -0.06]} radius={0.09} metalness={0.72} />
      <Box args={[0.34, 0.18, 0.13]} color={C.white} position={[4.9, 1.65, side * 1.51]} rotation={[0, 0, -0.06]} radius={0.06} />
    </group>)}
    <Box args={[0.08, 0.18, 2.6]} color={C.chrome} position={[5.42, 1.42, 0]} radius={0.02} />
    <CabSideAccurate side={1} /><CabSideAccurate side={-1} />
    {/* Freightliner mirror arms and the paired upper/lower mirrors. */}
    {[1, -1].map((side) => <group key={side}>
      <Box args={[0.82, 0.08, 0.09]} color={C.black} position={[3.28, 3.55, side * 1.56]} rotation={[0, 0, -0.18]} radius={0.02} />
      <Box args={[0.12, 0.84, 0.1]} color={C.black} position={[3.52, 3.28, side * 1.68]} rotation={[0, 0, -0.08]} radius={0.02} />
      <Box args={[0.2, 0.7, 0.14]} color={C.chrome} position={[3.67, 3.7, side * 1.72]} rotation={[0, 0, -0.12]} radius={0.05} metalness={0.78} />
      <Box args={[0.16, 0.48, 0.12]} color={C.chrome} position={[3.62, 2.9, side * 1.72]} rotation={[0, 0, -0.12]} radius={0.04} metalness={0.78} />
      <Box args={[0.12, 0.52, 0.05]} color={C.glass} position={[3.78, 3.7, side * 1.8]} rotation={[0, 0, -0.12]} radius={0.03} metalness={0.18} roughness={0.16} />
    </group>)}
    {[1, -1].map((side) => <mesh key={side} position={[4.42, 0.82, side * 1.43]} rotation={[0, 0, 0]} castShadow><torusGeometry args={[0.88, 0.075, 12, 32, Math.PI]} /><PbrMaterial color={C.black} roughness={0.62} metalness={0.02} /></mesh>)}
  </group>;
}

function RefrigerationUnitAccurate() {
  const housing = [[0.72, 4.3], [0.76, 5.16], [1.02, 5.5], [1.42, 5.7], [1.98, 5.68], [2.3, 5.47], [2.4, 5.02], [2.28, 4.52], [2.02, 4.3]];
  return <group>
    {/* Low, white, nose-shaped T-1090 housing mounted into the box front. */}
    <Prism points={housing} depth={2.38} color={C.white} metalness={0.03} roughness={0.27} />
    <Box args={[0.95, 0.24, 2.22]} color={C.white} position={[1.18, 4.16, 0]} radius={0.04} />
    <Box args={[0.12, 0.56, 2.22]} color={C.aluminum} position={[0.72, 4.62, 0]} radius={0.02} />
    <Box args={[0.1, 1.05, 2.12]} color={C.white} position={[2.46, 5.02, 0]} radius={0.1} />
    <Box args={[0.06, 0.2, 1.76]} color={C.black} position={[2.55, 5.36, 0]} radius={0.04} />
    <Box args={[0.06, 0.18, 1.84]} color={C.black} position={[2.55, 4.78, 0]} radius={0.04} />
    {[-0.68, -0.34, 0, 0.34, 0.68].map((z) => <Box key={z} args={[0.03, 0.18, 0.045]} color={C.aluminum} position={[2.6, 5.36, z]} radius={0.007} castShadow={false} />)}
    <SideText position={[2.61, 5.07, 0]} fontSize={0.19} color={C.navy} anchorX="center" rotation={[0, Math.PI / 2, 0]}>THERMO KING</SideText>
    <Box args={[0.75, 0.12, 0.08]} color={C.black} position={[1.45, 5.42, -1.22]} radius={0.02} />
    <Box args={[0.55, 0.06, 2.14]} color={C.aluminum} position={[1.4, 4.3, 0]} radius={0.02} />
    <Cylinder args={[0.11, 0.11, 0.12, 16]} color={C.black} position={[0.85, 4.25, -1.0]} rotation={[0, Math.PI / 2, 0]} />
    <Cylinder args={[0.11, 0.11, 0.12, 16]} color={C.black} position={[0.85, 4.25, 1.0]} rotation={[0, Math.PI / 2, 0]} />
  </group>;
}

function CabShellReference() {
  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(1.18, 0.7);
    shape.lineTo(1.18, 3.55);
    shape.quadraticCurveTo(1.2, 3.92, 1.58, 4.02);
    shape.lineTo(2.62, 4.02);
    shape.quadraticCurveTo(3.02, 4.0, 3.28, 3.56);
    shape.lineTo(3.52, 2.42);
    shape.lineTo(3.52, 0.72);
    shape.lineTo(1.18, 0.7);
    shape.closePath();
    const sideWindowHole = new THREE.Path();
    const sideWindowPoints = [[1.52, 2.65], [1.57, 2.58], [3.18, 2.55], [3.32, 2.68], [3.38, 3.46], [3.18, 3.7], [1.64, 3.67], [1.52, 3.54]];
    [...sideWindowPoints].reverse().forEach(([x, y], index) => index === 0 ? sideWindowHole.moveTo(x, y) : sideWindowHole.lineTo(x, y));
    sideWindowHole.closePath();
    shape.holes.push(sideWindowHole);

    const next = new THREE.ExtrudeGeometry(shape, {
      depth: 2.68,
      bevelEnabled: true,
      bevelSegments: 5,
      bevelSize: 0.065,
      bevelThickness: 0.055,
      curveSegments: 24,
    });
    next.translate(0, 0, -1.34);
    const source = next.index ? next.toNonIndexed() : next;
    source.computeVertexNormals();
    const sourcePositions = source.attributes.position;
    const openedPositions = [];
    const a = new THREE.Vector3();
    const b = new THREE.Vector3();
    const c = new THREE.Vector3();
    const ab = new THREE.Vector3();
    const ac = new THREE.Vector3();
    const normal = new THREE.Vector3();
    for (let index = 0; index < sourcePositions.count; index += 3) {
      a.fromBufferAttribute(sourcePositions, index);
      b.fromBufferAttribute(sourcePositions, index + 1);
      c.fromBufferAttribute(sourcePositions, index + 2);
      ab.subVectors(b, a);
      ac.subVectors(c, a);
      normal.crossVectors(ab, ac).normalize();
      const centerX = (a.x + b.x + c.x) / 3;
      const centerY = (a.y + b.y + c.y) / 3;
      const isWindshieldCover = centerX > 3.17 && centerY > 2.36 && centerY < 3.73 && Math.abs(normal.x) > 0.42 && Math.abs(normal.z) < 0.35;
      const isSideCapIntrusion = centerX > 3.05 && centerY > 2.43 && centerY < 3.74 && Math.abs(normal.z) > 0.88;
      if (!isWindshieldCover && !isSideCapIntrusion) openedPositions.push(a.x, a.y, a.z, b.x, b.y, b.z, c.x, c.y, c.z);
    }
    const opened = new THREE.BufferGeometry();
    opened.setAttribute('position', new THREE.Float32BufferAttribute(openedPositions, 3));
    opened.computeVertexNormals();
    return opened;
  }, []);

  return <mesh geometry={geometry} castShadow receiveShadow><PbrMaterial color={C.painted} roughness={0.24} metalness={0.015} clearcoat={0.78} clearcoatRoughness={0.13} envMapIntensity={1.1} /></mesh>;
}

function HeadlightReference({ side = 1 }) {
  return (
    <group position={[5.42, 1.5, side * 1.3]} rotation={[0, side * 0.28, 0]}>
      <group position={[-5.42, -1.5, -side * 1.3]}>
        <group position={[0, 0, side * 1.34]}>
          <group position={[0, 0, -side * 0.018]}><SmoothPrism commands={HEADLIGHT_PROFILES.recess} depth={0.018} color={C.black} roughness={0.42} bevelSize={0.012} bevelThickness={0.004} /></group>
          <group position={[0, 0, -side * 0.004]}><SmoothPrism commands={HEADLIGHT_PROFILES.pocket} depth={0.006} color="#263338" roughness={0.28} bevelSize={0.008} bevelThickness={0.003} /></group>
          <group position={[0, 0, side * 0.005]}><SmoothPrism commands={HEADLIGHT_PROFILES.bezel} depth={0.008} color={C.chrome} metalness={0.82} roughness={0.14} bevelSize={0.008} bevelThickness={0.003} /></group>
          <group position={[0, 0, side * 0.005]}><SmoothPrism commands={HEADLIGHT_PROFILES.reflector} depth={0.008} color={C.chrome} metalness={0.98} roughness={0.09} bevelSize={0.006} bevelThickness={0.002} physical clearcoat={0.18} clearcoatRoughness={0.06} envMapIntensity={1.4} /></group>
          <group position={[0, 0, side * 0.013]}><SmoothPrism commands={HEADLIGHT_PROFILES.lens} depth={0.009} color="#f3fbfc" metalness={0.02} roughness={0.045} bevelSize={0.006} bevelThickness={0.002} physical transparent opacity={0.34} transmission={0.8} ior={1.5} thickness={0.035} envMapIntensity={1.6} depthWrite={false} clearcoat={0.9} clearcoatRoughness={0.035} /></group>
          <group position={[0, 0, side * 0.02]}><SmoothPrism commands={HEADLIGHT_PROFILES.indicator} depth={0.008} color="#ef9b22" metalness={0.02} roughness={0.09} bevelSize={0.006} bevelThickness={0.002} physical transparent opacity={0.86} transmission={0.34} ior={1.45} thickness={0.025} envMapIntensity={1.25} depthWrite={false} clearcoat={0.65} clearcoatRoughness={0.06} /></group>
        </group>
      </group>
    </group>
  );
}

function FrontGrilleReference() {
  const outer = [['M', -0.83, 1.13], ['Q', -0.91, 1.18, -0.89, 1.34], ['L', -0.8, 2.04], ['Q', 0, 2.17, 0.8, 2.04], ['L', 0.89, 1.34], ['Q', 0.91, 1.18, 0.83, 1.13]];
  const opening = [['M', -0.68, 1.27], ['Q', -0.73, 1.31, -0.71, 1.41], ['L', -0.65, 1.91], ['Q', 0, 2.0, 0.65, 1.91], ['L', 0.71, 1.41], ['Q', 0.73, 1.31, 0.68, 1.27]];
  return <group position={[5.82, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
    <SmoothPrism commands={outer} depth={0.13} color={C.chrome} metalness={0.82} roughness={0.18} />
    <group position={[0, 0, 0.095]}><SmoothPrism commands={opening} depth={0.065} color={C.navy} roughness={0.46} /></group>
  </group>;
}

function WheelArchLiner({ side = 1 }) {
  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(3.64, 0.72);
    shape.quadraticCurveTo(3.64, 1.1, 3.84, 1.4);
    shape.quadraticCurveTo(4.02, 1.68, 4.34, 1.75);
    shape.quadraticCurveTo(4.7, 1.79, 4.98, 1.56);
    shape.quadraticCurveTo(5.2, 1.36, 5.28, 1.02);
    shape.quadraticCurveTo(5.32, 0.86, 5.28, 0.72);
    shape.lineTo(5.13, 0.72);
    shape.quadraticCurveTo(5.16, 0.95, 5.04, 1.16);
    shape.quadraticCurveTo(4.92, 1.39, 4.66, 1.52);
    shape.quadraticCurveTo(4.38, 1.61, 4.13, 1.56);
    shape.quadraticCurveTo(3.91, 1.48, 3.79, 1.22);
    shape.quadraticCurveTo(3.68, 1.0, 3.68, 0.72);
    shape.closePath();
    const next = new THREE.ExtrudeGeometry(shape, { depth: 0.075, bevelEnabled: true, bevelSegments: 3, bevelSize: 0.018, bevelThickness: 0.018, curveSegments: 18 });
    next.translate(0, 0, -0.0375);
    return next;
  }, []);
  return <mesh geometry={geometry} position={[0, 0, side * 1.53]} castShadow receiveShadow><PbrMaterial color={C.black} roughness={0.58} metalness={0.02} /></mesh>;
}

function FrontBumperReference() {
  const face = [
    ['M', -1.4, 0.72], ['Q', -1.46, 0.75, -1.45, 0.86], ['L', -1.39, 1.05],
    ['Q', 0, 1.14, 1.39, 1.05], ['L', 1.45, 0.86], ['Q', 1.46, 0.75, 1.4, 0.72],
  ];
  const wing = [['M', 5.34, 0.72], ['L', 5.96, 0.72], ['Q', 6.05, 0.76, 6.03, 0.87], ['L', 5.96, 1.03], ['Q', 5.66, 1.08, 5.38, 1.02]];
  return <group>
    <group position={[5.91, 0, 0]} rotation={[0, Math.PI / 2, 0]}><SmoothPrism commands={face} depth={0.18} color={C.black} metalness={0.04} roughness={0.48} /></group>
    {[1, -1].map((side) => <group key={side} position={[0, 0, side * 1.39]}><SmoothPrism commands={wing} depth={0.2} color={C.black} metalness={0.04} roughness={0.48} /></group>)}
  </group>;
}

function FrontWindshieldReference() {
  return <group>
    <CurvedWindshieldPane side={-1} />
    <CurvedWindshieldPane side={1} />
    <WindshieldSeals />
  </group>;
}

function SideWindowReference({ side = 1 }) {
  const outer = [[1.44, 2.66], [1.5, 2.52], [2.66, 2.5], [2.88, 2.62], [3.04, 3.47], [2.84, 3.72], [1.6, 3.74], [1.45, 3.57]];
  const pane = [[1.52, 2.65], [1.57, 2.58], [2.62, 2.57], [2.81, 2.67], [2.96, 3.44], [2.79, 3.66], [1.64, 3.67], [1.52, 3.54]];
  return <group>
    <group position={[0, 0, side * 1.43]}><FramePrism outer={outer} inner={pane} depth={0.055} roughness={0.42} /></group>
    <group position={[0, 0, side * 1.405]}><GlassPrism points={pane} depth={0.03} position={[0, 0, side * 0.004]} /></group>
  </group>;
}

function CabInteriorSideLiner({ side = 1 }) {
  const outer = [[1.28, 2.38], [3.42, 2.38], [3.24, 3.55], [2.96, 3.86], [1.38, 3.86]];
  const opening = [[1.5, 2.64], [1.55, 2.55], [2.64, 2.54], [2.85, 2.65], [3.0, 3.46], [2.81, 3.7], [1.61, 3.71], [1.49, 3.55]];
  return <group position={[0, 0, side * 1.285]}>
    <FramePrism outer={outer} inner={opening} depth={0.028} color="#182326" roughness={0.72} />
  </group>;
}

function CabInteriorReference() {
  return <group>
    <Box args={[0.14, 1.62, 2.28]} color="#151f22" position={[1.56, 2.98, 0]} radius={0.08} castShadow={false} roughness={0.68} metalness={0} />
    <Box args={[1.62, 0.08, 2.22]} color="#1a2528" position={[2.3, 3.76, 0]} radius={0.035} castShadow={false} roughness={0.76} metalness={0} />
    <CabInteriorSideLiner side={1} />
    <CabInteriorSideLiner side={-1} />
    <Box args={[0.72, 0.2, 2.05]} color="#172225" position={[2.95, 2.56, 0]} rotation={[0, 0, 0.04]} radius={0.06} roughness={0.5} metalness={0} />
    <Box args={[1.28, 0.36, 2.06]} color="#0e171a" position={[2.26, 2.14, 0]} radius={0.08} roughness={0.74} metalness={0} />
    <Box args={[0.58, 0.88, 0.56]} color="#172124" position={[2.22, 2.72, -0.58]} radius={0.12} roughness={0.7} metalness={0} />
    <Box args={[0.58, 0.88, 0.56]} color="#172124" position={[2.22, 2.72, 0.58]} radius={0.12} roughness={0.7} metalness={0} />
    <Box args={[0.34, 0.16, 0.7]} color="#202c2f" position={[3.05, 2.72, -0.55]} radius={0.06} roughness={0.48} metalness={0} />
    <Cylinder args={[0.055, 0.055, 0.42, 14]} color="#11191c" position={[2.99, 2.78, -0.68]} rotation={[0, 0, Math.PI / 2]} metalness={0} roughness={0.5} />
    <mesh position={[3.18, 2.84, -0.68]} rotation={[0, Math.PI / 2, -0.16]} castShadow={false}>
      <torusGeometry args={[0.24, 0.035, 10, 24]} />
      <PbrMaterial color="#11191c" metalness={0} roughness={0.5} />
    </mesh>
    <Box args={[0.04, 0.04, 0.34]} color="#11191c" position={[3.19, 2.84, -0.68]} rotation={[0, 0, -0.16]} radius={0.01} castShadow={false} roughness={0.5} metalness={0} />
    <Box args={[0.04, 0.3, 0.04]} color="#11191c" position={[3.19, 2.84, -0.68]} rotation={[0, 0, -0.16]} radius={0.01} castShadow={false} roughness={0.5} metalness={0} />
  </group>;
}

function CabDoorReference({ side = 1 }) {
  return <group>
    <Box args={[0.055, 1.74, 0.06]} color={C.black} position={[1.3, 2.47, side * 1.43]} radius={0.015} />
    <Box args={[0.5, 0.075, 0.1]} color={C.black} position={[2.62, 2.3, side * 1.47]} radius={0.025} />
    <Box args={[0.12, 0.48, 0.12]} color={C.black} position={[2.93, 2.0, side * 1.44]} radius={0.04} />
    <LogoPlane position={[1.96, 2.12, side * 1.47]} side={side} width={0.78} />
    <SideText position={[1.96, 1.67, side * 1.47]} side={side} fontSize={0.105} color={C.navy} anchorX="center">85 KERO ROAD</SideText>
    <SideText position={[1.96, 1.47, side * 1.47]} side={side} fontSize={0.092} color={C.navy} anchorX="center">CARLSTADT, NJ 07072</SideText>
    <SideText position={[1.96, 1.27, side * 1.47]} side={side} fontSize={0.092} color={C.navy} anchorX="center">USDOT 2446059</SideText>
    <SideText position={[1.96, 1.08, side * 1.47]} side={side} fontSize={0.092} color={C.navy} anchorX="center">GVW 33,000</SideText>
  </group>;
}

function MirrorReference({ side = 1 }) {
  return <group>
    <Box args={[0.72, 0.075, 0.09]} color={C.black} position={[3.1, 3.56, side * 1.57]} rotation={[0, 0, -0.14]} radius={0.02} />
    <Box args={[0.1, 1.0, 0.09]} color={C.black} position={[3.38, 3.1, side * 1.68]} rotation={[0, 0, -0.06]} radius={0.02} />
    <Box args={[0.23, 0.72, 0.16]} color={C.black} position={[3.52, 3.55, side * 1.74]} rotation={[0, 0, -0.08]} radius={0.06} />
    <Box args={[0.18, 0.62, 0.17]} color={C.chrome} position={[3.52, 3.55, side * 1.83]} rotation={[0, 0, -0.08]} radius={0.05} metalness={0.8} />
    <Box args={[0.13, 0.49, 0.04]} color={C.glass} position={[3.52, 3.55, side * 1.93]} rotation={[0, 0, -0.08]} radius={0.035} metalness={0.62} roughness={0.06} />
    <Box args={[0.19, 0.5, 0.15]} color={C.black} position={[3.48, 2.78, side * 1.73]} rotation={[0, 0, -0.08]} radius={0.055} />
    <Box args={[0.14, 0.4, 0.16]} color={C.chrome} position={[3.48, 2.78, side * 1.82]} rotation={[0, 0, -0.08]} radius={0.045} metalness={0.8} />
  </group>;
}

function CabReference() {
  return <group>
    <CabShellReference />
    <CabInteriorReference />
    <FrontWindshieldReference />
    <SideWindowReference side={1} /><SideWindowReference side={-1} />
    <CabDoorReference side={1} /><CabDoorReference side={-1} />
    <MirrorReference side={1} /><MirrorReference side={-1} />
    <CurvedCabBrow />
    {[-1, 1].map((side) => <group key={side}>
      <Box args={[0.045, 0.032, 0.86]} color={C.black} position={[3.485, 2.65, side * 0.54]} rotation={[side * 0.16, 0, 0]} radius={0.012} castShadow={false} roughness={0.42} metalness={0} />
      <Box args={[0.04, 0.025, 0.55]} color={C.black} position={[3.48, 2.59, side * 0.31]} rotation={[side * 0.3, 0, 0]} radius={0.01} castShadow={false} roughness={0.42} metalness={0} />
    </group>)}
    <FrontClipReference />
    {[1, -1].map((side) => <group key={side}>
      <Box args={[0.92, 0.1, 0.18]} color={C.black} position={[4.18, 2.2, side * 1.56]} rotation={[0, 0, -0.09]} radius={0.055} />
      <Box args={[0.64, 0.03, 0.12]} color={C.chrome} position={[4.18, 2.255, side * 1.67]} rotation={[0, 0, -0.09]} radius={0.015} castShadow={false} />
      <HeadlightReference side={side} />
      <WheelArchLiner side={side} />
    </group>)}
    <FrontGrilleReference />
    {[-0.5, -0.25, 0, 0.25, 0.5].map((z) => <Box key={z} args={[0.028, 0.48, 0.055]} color={C.aluminum} position={[5.94, 1.57, z]} radius={0.01} castShadow={false} />)}
    <FrontBumperReference />
    <Box args={[1.45, 0.16, 0.2]} color={C.chrome} position={[2.35, 0.74, -1.48]} radius={0.025} />
    <Box args={[1.28, 0.12, 0.19]} color={C.chrome} position={[2.35, 0.5, -1.48]} radius={0.025} />
  </group>;
}

function RefrigerationUnitReference() {
  const housing = [
    ['M', 0.74, 4.28], ['L', 0.75, 5.22], ['Q', 0.8, 5.3, 1.02, 5.31],
    ['L', 1.86, 5.31], ['Q', 2.46, 5.29, 2.82, 5.02], ['Q', 3.05, 4.84, 3.08, 4.57],
    ['Q', 3.1, 4.34, 2.93, 4.21], ['Q', 2.74, 4.06, 2.42, 4.01],
    ['L', 1.54, 4.08], ['Q', 1.08, 4.16, 0.74, 4.28],
  ];
  const upperIntake = [
    ['M', -0.86, 4.86], ['Q', -0.9, 5.02, -0.72, 5.09], ['Q', 0, 5.2, 0.72, 5.09],
    ['Q', 0.9, 5.02, 0.86, 4.86], ['Q', 0, 4.75, -0.86, 4.86],
  ];
  const lowerIntake = [
    ['M', -0.9, 4.35], ['Q', 0, 4.24, 0.9, 4.35], ['L', 0.82, 4.53],
    ['Q', 0, 4.61, -0.82, 4.53],
  ];
  return <group position={[CARGO_BOX.frontShiftX, 0.2, 0]}>
    <SmoothPrism commands={housing} depth={2.5} color={C.white} metalness={0.035} roughness={0.22} />
    <Box args={[0.13, 0.92, 2.32]} color={C.aluminum} position={[0.73, 4.78, 0]} radius={0.035} />
    <group position={[3.01, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
      <SmoothPrism commands={upperIntake} depth={0.08} color={C.black} roughness={0.4} />
      <SmoothPrism commands={lowerIntake} depth={0.085} color={C.black} roughness={0.42} />
    </group>
    {[-0.68, -0.34, 0, 0.34, 0.68].map((z) => <Box key={z} args={[0.03, 0.19, 0.045]} color={C.aluminum} position={[3.09, 4.96, z]} radius={0.006} castShadow={false} />)}
    <SideText position={[3.105, 4.7, 0]} fontSize={0.2} color={C.navy} anchorX="center" rotation={[0, Math.PI / 2, 0]}>THERMO KING</SideText>
    <Box args={[0.82, 0.14, 0.055]} color={C.black} position={[1.7, 4.95, -1.275]} radius={0.028} />
    <SideText position={[1.65, 4.68, -1.315]} side={-1} fontSize={0.12} color={C.navy} letterSpacing={-0.01} fontWeight={700} anchorX="center">T-1090</SideText>
    <Box args={[0.62, 0.055, 2.22]} color={C.aluminum} position={[1.48, 4.095, 0]} radius={0.018} />
  </group>;
}

function TruckGeometry() {
  return <group><Underbody /><BoxDetails /><CabReference /><RefrigerationUnitReference /><Wheel position={[4.42, 0.74, 1.42]} front /><Wheel position={[4.42, 0.74, -1.42]} front /><Wheel position={[-4.28, 0.8, 1.42]} dual /><Wheel position={[-4.28, 0.8, -1.42]} dual /><RearLiftgate /></group>;
}

function Hotspot({ spot, active, onClick }) {
  const [hovered, setHovered] = useState(false); useCursor(hovered, 'pointer', 'auto');
  return <group position={spot.position}><Html center distanceFactor={8.5} zIndexRange={[10, 0]}><button className={`hotspot ${active ? 'is-active' : ''}`} type="button" aria-label={`View ${spot.title}`} onClick={(event) => { event.stopPropagation(); onClick(spot.id); }} onPointerEnter={() => setHovered(true)} onPointerLeave={() => setHovered(false)}><span className="hotspot-ring" /><span className="hotspot-core">+</span></button></Html></group>;
}

function CameraRig({ selectedId, controlsRef }) {
  const animation = useRef(null);
  const defaultView = useMemo(() => ({ position: new THREE.Vector3(13, 6.5, -14.5), target: new THREE.Vector3(-0.7, 2.68, 0) }), []);
  useEffect(() => {
    const spot = HOTSPOTS.find((item) => item.id === selectedId); const controls = controlsRef.current; if (!controls) return;
    animation.current = { position: new THREE.Vector3().copy(controls.object.position), target: new THREE.Vector3().copy(controls.target), toPosition: spot ? new THREE.Vector3(...spot.camera) : defaultView.position.clone(), toTarget: spot ? new THREE.Vector3(...spot.target) : defaultView.target.clone() };
  }, [defaultView, selectedId, controlsRef]);
  useEffect(() => { const controls = controlsRef.current; if (!controls) return undefined; const cancel = () => { if (animation.current) animation.current = null; }; controls.addEventListener('start', cancel); return () => controls.removeEventListener('start', cancel); }, [controlsRef]);
  useFrame(({ camera }) => { const transition = animation.current; if (!transition || !controlsRef.current) return; transition.position.lerp(transition.toPosition, 0.075); transition.target.lerp(transition.toTarget, 0.075); camera.position.copy(transition.position); controlsRef.current.target.copy(transition.target); controlsRef.current.update(); if (transition.position.distanceToSquared(transition.toPosition) < 0.004 && transition.target.distanceToSquared(transition.toTarget) < 0.004) animation.current = null; });
  return null;
}

export function AtlanticColdTruck({ selectedId, onSelect }) {
  const controlsRef = useRef();
  return <><group rotation={[0, -0.09, 0]}><TruckGeometry />{HOTSPOTS.map((spot) => <Hotspot key={spot.id} spot={spot} active={selectedId === spot.id} onClick={onSelect} />)}</group><OrbitControls ref={controlsRef} enablePan={false} enableZoom enableDamping dampingFactor={0.065} rotateSpeed={0.6} zoomSpeed={0.75} minDistance={13} maxDistance={24} minPolarAngle={Math.PI * 0.28} maxPolarAngle={Math.PI * 0.57} minAzimuthAngle={-Math.PI * 0.86} maxAzimuthAngle={Math.PI * 0.86} target={[-0.7, 2.58, 0]} touches={{ ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY }} /><CameraRig selectedId={selectedId} controlsRef={controlsRef} /></>;
}
