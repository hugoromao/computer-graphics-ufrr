import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, MapControls } from "@react-three/drei";

import PixelGrid from "components/PixelGrid";

import lineRasterization from "functions/lineRasterization";

const modes = ["translate", "rotate", "scale"];

function Controls() {
  return (
    <OrbitControls
      makeDefault
      minPolarAngle={0}
      maxPolarAngle={Math.PI / 1.75}
    />
  );
}

export default function Home() {
  const [pixelGridLength, setPixelGridLength] = useState(0);
  const [fixedPixelGridLength] = useState(null);

  const coloredPixels = lineRasterization.bresenham(
    { x: 0, y: 1 },
    { x: 8, y: 4 }
  );

  function findMaxCoordinateValue() {
    let max = 0;
    coloredPixels.forEach(({ x, y }) => {
      if (x > max) max = x;
      if (y > max) max = y;
    });
    setPixelGridLength((max + 1) ** 2);
    return max;
  }

  useEffect(() => {
    findMaxCoordinateValue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coloredPixels]);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <p style={{ position: "absolute", visibility: "hidden" }}>main</p>

      <Canvas
        orthographic
        // camera={{ zoom: 50, fov: 75, far: 15 }}
        camera={{
          position: [0, 0, 50],
          zoom: 50,
          up: [0, 0, 1],
          far: 50,
        }}
      >
        <color attach="background" args={["black"]} />

        {/* <Controls /> */}
        <MapControls enableRotate={false} />
        <PixelGrid
          pixelGridLength={fixedPixelGridLength || pixelGridLength}
          coloredPixels={coloredPixels}
        />
      </Canvas>
    </div>
  );
}
