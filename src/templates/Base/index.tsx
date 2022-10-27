import React from "react";
import { Canvas } from "@react-three/fiber";
import { MapControls } from "@react-three/drei";

import PixelGrid from "components/PixelGrid";

import * as S from "./styles";

type BaseTemplateProps = {
  children: React.ReactNode;
};

const BaseTemplate = ({ children }: BaseTemplateProps) => {
  return (
    <S.Wrapper>
      <S.Column>{children}</S.Column>

      <S.Column>
        <Canvas
          orthographic
          camera={{
            position: [0, 0, 50],
            zoom: 50,
            up: [0, 0, 1],
            far: 50,
          }}
        >
          <color attach="background" args={["rgb(26, 26, 46)"]} />
          <MapControls enableRotate={false} />
          <PixelGrid />
        </Canvas>
      </S.Column>
    </S.Wrapper>
  );
};

export default BaseTemplate;
