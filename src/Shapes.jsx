import React from "react";
import { Circle, Rect, RegularPolygon } from "react-konva";

const Shapes = ({
  shapes,
  boundaryWidth,
  boundaryHeight,
  selectShape,
  updateShape,
}) => {
  const checkBounds = (shape, x, y) => {
    return {
      x: Math.max(
        0,
        Math.min(
          x,
          boundaryWidth -
            (shape.type === "square" ? shape.size : shape.size * 2)
        )
      ),
      y: Math.max(
        0,
        Math.min(
          y,
          boundaryHeight -
            (shape.type === "square" ? shape.size : shape.size * 2)
        )
      ),
    };
  };

  return shapes.map((shape) => {
    const commonProps = {
      key: shape.id,
      x: shape.x,
      y: shape.y,
      fill: shape.fill,
      draggable: true,
      onClick: () => selectShape(shape.id),
      onDragEnd: (e) => {
        const bounds = checkBounds(shape, e.target.x(), e.target.y());
        updateShape({ ...shape, ...bounds });
      },
    };

    switch (shape.type) {
      case "circle":
        return <Circle {...commonProps} radius={shape.size || 50} />;
      case "square":
        return <Rect {...commonProps} width={shape.size} height={shape.size} />;
      case "triangle":
        return (
          <RegularPolygon
            {...commonProps}
            sides={3}
            radius={shape.size || 50}
          />
        );
      default:
        return null;
    }
  });
};

export default Shapes;
