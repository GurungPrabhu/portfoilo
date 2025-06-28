/* eslint-disable react/no-unknown-property */
import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, useHelper, useAnimations } from '@react-three/drei';
import { PointLightHelper } from 'three';
import styled from 'styled-components';

const CanvasStyledWrapper = styled.div`
  position: absolute;
  width: fit-content;
  z-index: -1;
  right: 0;
  float: right;
  & > div {
    display: flex;
    justify-content: right;
  }
  canvas {
    height: 800px;
    width: 700px;
    max-width: 100%;
  }
  @media (max-width: 512px) {
    height: 400px;
    width: 100%;
    right: 0;
    canvas {
      width: 419px !important;
      margin-right: -10%;
    }
  }
`;

function Model() {
  const group = useRef();
  const { scene, animations } = useGLTF('/models/working_model.glb');
  const { actions } = useAnimations(animations, group);
  useEffect(() => {
    if (actions && actions[Object.keys(actions)[0]]) {
      actions[Object.keys(actions)[0]].play();
    }
  }, [actions]);

  return (
    <primitive
      ref={group}
      object={scene}
      scale={0.3}
      position={[0, -1, 1]}
      rotation={[0.1, -0.5, 0]}
    />
  );
}

function LightWithHelper() {
  const keyLight = useRef();
  const fillLight = useRef();

  // Helpers for both lights
  useHelper(keyLight, PointLightHelper, 'orange');
  useHelper(fillLight, PointLightHelper, 'skyblue');

  return (
    <>
      <pointLight
        ref={keyLight}
        position={[3, 3, 3.3]}
        intensity={40}
        distance={10}
        castShadow
        color="#ffd580" // Warm golden light
      />
      <pointLight
        ref={fillLight}
        position={[-3, 3, 3.3]}
        intensity={15}
        distance={15}
        castShadow
        color="#80dfff" // Soft cyan/blue
      />
      <pointLight position={[4, 3, -2]} intensity={20} distance={15} color="#ffffff" />
    </>
  );
}

export default function MyModelViewer() {
  return (
    <CanvasStyledWrapper>
      <Canvas shadows>
        <LightWithHelper />
        <ambientLight intensity={0.2} />
        <Suspense fallback={null}>
          <Model />
          <mesh position={[10, 10, 10]}>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshBasicMaterial color="yellow" />
          </mesh>
        </Suspense>

        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>
    </CanvasStyledWrapper>
  );
}
