import React from "react";
import { Rect } from "react-konva";

const Boundary = ({ width, height }) => {
  return (
    <Rect
      x={0}
      y={0}
      width={width}
      height={height}
      stroke="black"
      strokeWidth={2}
    />
  );
};

export default Boundary;
