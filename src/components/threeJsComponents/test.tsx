import { PresentationControls } from "@react-three/drei";
import { Canvas, extend } from "@react-three/fiber";

const test = () => {
  return (
    <>
      <Canvas >
        
        <color attach="background" args={['#d0d0d0']} />
        <PresentationControls speed={1.5} global zoom={0.7} polar={[-0.1, Math.PI / 4]}>
        <Stage environment = {null} intensity={1} contactShadow={false} shadowBias={-0.0015}>
        <mesh>
          <boxGeometry />
      
          <meshNormalMaterial />
          
        </mesh>
        </Stage>
          </PresentationControl>
      </Canvas>
    </>
  );
};
export default test;
