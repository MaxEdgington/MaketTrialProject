import React, { useState } from "react";
import { Stage, Layer, Circle, Rect, RegularPolygon } from "react-konva";
import Toolbar from "./Toolbar";

function App() {
  const [shapes, setShapes] = useState([]);

  const addShape = (shapeType) => {
    const newShape = {
      id: shapes.length + 1,
      type: shapeType,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
    };
    setShapes([...shapes, newShape]);
  };

  return (
    <div>
      <Toolbar onAddShape={addShape} />
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          {shapes.map((shape, i) => {
            switch (shape.type) {
              case "circle":
                return (
                  <Circle
                    key={i}
                    x={shape.x}
                    y={shape.y}
                    radius={50}
                    fill="red"
                  />
                );
              case "square":
                return (
                  <Rect
                    key={i}
                    x={shape.x}
                    y={shape.y}
                    width={100}
                    height={100}
                    fill="green"
                  />
                );
              case "triangle":
                return (
                  <RegularPolygon
                    key={i}
                    x={shape.x}
                    y={shape.y}
                    sides={3}
                    radius={50}
                    fill="blue"
                  />
                );
              default:
                return null;
            }
          })}
        </Layer>
      </Stage>
    </div>
  );
}

export default App;
