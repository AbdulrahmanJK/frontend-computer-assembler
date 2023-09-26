import React, { Suspense, useEffect, useState } from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Canvas } from "@react-three/fiber";
import {
  MeshReflectorMaterial,
  OrbitControls,
  PresentationControls,
  Stage,
} from "@react-three/drei";

import { useSelector } from "react-redux";

const Test = ({ modelslink, category }) => {

  const defaultModels = [
    "../../../public/gpu.glb",
    "../../../public/core.glb",
    "../../../public/memmory.glb",
    "../../../public/motherBoard.glb",
    "../../../public/ssd.glb",
    "../../../public/corpus.glb",
    "../../../public/powerBox.glb",
    "../../../public/cooller.glb",

  ];

  const models = {
    [category[0]._id]: useLoader(GLTFLoader, defaultModels[0]),
    [category[1]._id]: useLoader(GLTFLoader, defaultModels[1]),
    [category[2]._id]: useLoader(GLTFLoader, defaultModels[2]),
    [category[3]._id]: useLoader(GLTFLoader, defaultModels[3]),
    [category[4]._id]: useLoader(GLTFLoader, defaultModels[4]),
    [category[5]._id]: useLoader(GLTFLoader, defaultModels[5]),
    [category[6]._id]: useLoader(GLTFLoader, defaultModels[6]),
    [category[7]._id]: useLoader(GLTFLoader, defaultModels[7]),
  };

  if (modelslink) {
    modelslink.forEach((item) => {
      models[item.category] =
        useLoader(
          GLTFLoader,
          `http://localhost:4000/static/${item.linkModel}`
        ) || null;
    });
  }

  return (
    <div className="relative h-full">
      <Canvas>
        <fog attach="fog" args={["#d0d0d0", 11, 44]} />
        <PresentationControls speed={1.5} global polar={[-1, Math.PI / 2]}>
          <Stage>
            <Suspense fallback={<div>Loading...</div>}>
              {Object.values(models).map(
                (model, index) =>
                  model && (
                    <primitive
                      key={index}
                      object={model.scene}
                      scale={[2, 2, 2]}
                      position={[0, 4, 0]}
                    />
                  )
              )}
            </Suspense>
          </Stage>
          <OrbitControls
            minAzimuthAngle={0}
            maxAzimuthAngle={0}
            minPolarAngle={Math.PI / 2}
            maxPolarAngle={Math.PI / 6}
          />
        </PresentationControls>

        <fog attach="fog" args={["#d0d0d0", 11, 44]} />
        {/* Легкий туман и тёмный фон */}
      </Canvas>
    </div>
  );
};

export default Test;
