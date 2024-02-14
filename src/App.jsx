import React, { useState } from "react";
import { Stage, Layer, Circle, Rect, RegularPolygon } from "react-konva";
import Toolbar from "./Toolbar";

const ShapeEditor = ({ selectedShape, onUpdate, onDelete, x, y }) => {
  if (!selectedShape) return null;

  const editorStyle = {
    position: "absolute",
    left: `${x}px`,
    top: `${y}px`,
    backgroundColor: "#fff",
    padding: "10px",
    borderRadius: "5px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
  };

  const handleSizeChange = (e) => {
    const newSize = parseInt(e.target.value, 10);
    if (!isNaN(newSize) && newSize > 0) {
      onUpdate({ ...selectedShape, size: newSize });
    }
  };

  return (
    <div className="shape-editor" style={editorStyle}>
      <label>
        Size:
        <input
          type="number"
          value={selectedShape.size}
          onChange={handleSizeChange}
        />
      </label>
      <button onClick={() => onDelete(selectedShape.id)}>Delete</button>
    </div>
  );
};

function App() {
  const boundaryWidth = window.innerWidth * 0.8;
  const boundaryHeight = window.innerHeight * 0.8;

  const [shapes, setShapes] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const addShape = (shapeType) => {
    console.log("Adding shape type:", shapeType); // Debugging line
    const newShape = {
      id: shapes.length + 1,
      type: shapeType,
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      size: 50,

    };
    setShapes([...shapes, newShape]);
  };

  const selectShape = (id) => {
    console.log("Selected Shape ID:", id);
    setSelectedId(selectedId === id ? null : id);
  };

  const updateShape = (updatedShape) => {
    const newShapes = shapes.map((shape) =>
      shape.id === updatedShape.id ? updatedShape : shape
    );
    setShapes(newShapes);
  };

  const deleteShape = (id) => {
    const newShapes = shapes.filter((shape) => shape.id !== id);
    setShapes(newShapes);
    setSelectedId(null); // Deselect shape
  };

  const selectedShape = shapes.find((shape) => shape.id === selectedId);

  return (
    <div>
      <Toolbar onAddShape={addShape} />
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          {/*Boundary Rectangle */}
          <Rect
            x={0}
            y={0}
            width={boundaryWidth}
            height={boundaryHeight}
            stroke="black"
            strokeWidth={2}
          />

          {/*Shape Logic */}
          {shapes.map((shape) => {
            console.log("Rendering Shape with Size:", shape.size, shape.id);
            const isSelected = shape.id === selectedId;
            const commonProps = {
              key: shape.id,
              x: shape.x,
              y: shape.y,
              fill: isSelected
                ? "blue"
                : shape.type === "circle"
                ? "red"
                : shape.type === "square"
                ? "green"
                : "blue",
              draggable: true,
              onClick: () => {
                console.log("Shape clicked, ID", shape.id);
                selectShape(shape.id);
              },
            };

            switch (shape.type) {
              case "circle":
                return (
                  <Circle
                    {...commonProps}
                    radius={shape.size || 50}
                    onDragEnd={(e) => {
                      const shapeBounds = {
                        x: Math.max(
                          0,
                          Math.min(
                            e.target.x(),
                            boundaryWidth -
                              (shape.type === "square"
                                ? shape.size
                                : shape.size * 2)
                          )
                        ),
                        y: Math.max(
                          0,
                          Math.min(
                            e.target.y(),
                            boundaryHeight -
                              (shape.type === "square"
                                ? shape.size
                                : shape.size * 2)
                          )
                        ),
                      };
                      updateShape({
                        ...shape,
                        ...shapeBounds,
                      });
                    }}
                  />
                );
              case "square":
                return (
                  <Rect
                    {...commonProps}
                    width={shape.size}
                    height={shape.size}
                    onDragEnd={(e) => {
                      const shapeBounds = {
                        x: Math.max(
                          0,
                          Math.min(
                            e.target.x(),
                            boundaryWidth -
                              (shape.type === "square"
                                ? shape.size
                                : shape.size * 2)
                          )
                        ),
                        y: Math.max(
                          0,
                          Math.min(
                            e.target.y(),
                            boundaryHeight -
                              (shape.type === "square"
                                ? shape.size
                                : shape.size * 2)
                          )
                        ),
                      };
                      updateShape({
                        ...shape,
                        ...shapeBounds,
                      });
                    }}
                  />
                );
              case "triangle":
                return (
                  <RegularPolygon
                    {...commonProps}
                    sides={3}
                    radius={shape.size || 50}
                    onDragEnd={(e) => {
                      const shapeBounds = {
                        x: Math.max(
                          0,
                          Math.min(
                            e.target.x(),
                            boundaryWidth -
                              (shape.type === "square"
                                ? shape.size
                                : shape.size * 2)
                          )
                        ),
                        y: Math.max(
                          0,
                          Math.min(
                            e.target.y(),
                            boundaryHeight -
                              (shape.type === "square"
                                ? shape.size
                                : shape.size * 2)
                          )
                        ),
                      };
                      updateShape({
                        ...shape,
                        ...shapeBounds,
                      });
                    }}
                  />
                );
              default:
                return null;
            }
          })}
        </Layer>
      </Stage>
      <ShapeEditor
        selectedShape={shapes.find((shape) => shape.id === selectedId)}
        onUpdate={updateShape}
        onDelete={deleteShape}
        x={selectedShape ? selectedShape.x : 0}
        y={selectedShape ? selectedShape.y : 0}
      />
    </div>
  );
}

export default App;
