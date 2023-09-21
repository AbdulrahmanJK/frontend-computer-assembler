import {
  MeshReflectorMaterial,
  OrbitControls,
  PresentationControls,
  Stage,
} from "@react-three/drei";
import { Suspense } from "react";
import Configurator from "./configurator";
import "../../App.css";
import { Canvas } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader";
import { color } from "three/examples/jsm/nodes/Nodes.js";
const Test = () => {
  const gltf = useLoader(GLTFLoader, "../public/1.glb");

  return (
    <div className="relative  h-full">
      <Canvas>
        <color attach="background" args={["#d0d0d0"]} />
        <fog attach="fog" args={["#d0d0d0", 10, 20]} />
        <PresentationControls
          speed={1.5}
          global
          zoom={2.5}
          polar={[-1, Math.PI / 2]}
        >
          <Stage
           
          >
            <Suspense>
              <primitive
                object={gltf.scene}
                scale={[2, 2, 2]}
                position={[0, 4, 0]}
              />
            </Suspense>
          </Stage>
          <OrbitControls
          makeDefault
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2}
          />
 
          <mesh rotation={[-Math.PI / 2, 0, 0]} position-y={-2}>
            <planeGeometry args={[170, 170]} />
            <MeshReflectorMaterial
              blur={[300, 100]}
              resolution={2048}
              mixBlur={1}
              mixStrength={40}
              roughness={1}
              depthScale={1.2}
              minDepthThreshold={0.4}
              maxDepthThreshold={1.4}
              color="#101010"
              metalness={0.5}
              mirror={0}
            />
          </mesh>
        </PresentationControls>
      </Canvas>
      <Configurator />
    </div>
  );
};

export default Test;
