import React, { useState } from "react";
import { Stage, Layer } from "react-konva";
import Toolbar from "./Toolbar";
import ShapeEditor from "./ShapeEditor";
import Boundary from "./Boundary";
import Shapes from "./Shapes";

function App() {
  const boundaryWidth = window.innerWidth * 0.8;
  const boundaryHeight = window.innerHeight * 0.8;

  const [shapes, setShapes] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const addShape = (shapeType) => {
    const newShape = {
      id: shapes.length + 1,
      type: shapeType,
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      size: 50,
      fill:
        shapeType === "circle"
          ? "red"
          : shapeType === "square"
          ? "green"
          : "blue",
    };
    setShapes([...shapes, newShape]);
  };

  const selectShape = (id) => {
    setSelectedId(selectedId === id ? null : id);
  };

  const updateShape = (updatedShape) => {
    const newShapes = shapes.map((shape) =>
      shape.id === updatedShape.id ? updatedShape : shape
    );
    setShapes(newShapes);
  };

  const deleteShape = (id) => {
    setShapes(shapes.filter((shape) => shape.id !== id));
    setSelectedId(null);
  };

  const selectedShape = shapes.find((shape) => shape.id === selectedId);

  return (
    <div>
      <Toolbar onAddShape={addShape} />
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <Boundary width={boundaryWidth} height={boundaryHeight} />
          <Shapes
            shapes={shapes}
            boundaryWidth={boundaryWidth}
            boundaryHeight={boundaryHeight}
            selectShape={selectShape}
            updateShape={updateShape}
            selectedId={selectedId}
          />
        </Layer>
      </Stage>
      {selectedShape && (
        <ShapeEditor
          selectedShape={selectedShape}
          onUpdate={updateShape}
          onDelete={deleteShape}
          x={selectedShape.x}
          y={selectedShape.y}
        />
      )}
    </div>
  );
}

export default App;
