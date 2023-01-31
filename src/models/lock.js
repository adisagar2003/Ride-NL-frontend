/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: Blender3D (https://sketchfab.com/Blender3D)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/3d-models/simple-old-lock-13d7e4706f5243b984ef7424e737731d
title: Simple Old Lock
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Lock(props) {
  const { nodes, materials } = useGLTF("/simple_old_lock.glb");
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2.geometry}
          material={materials.None}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/simple_old_lock.glb");