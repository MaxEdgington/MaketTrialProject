import React from "react";

const Toolbar = ({ onAddShape }) => {
  return (
    <div className="toolbar">
      <button onClick={() => onAddShape("circle")}>Add Circle</button>
      <button onClick={() => onAddShape("square")}>Add Square</button>
      <button onClick={() => onAddShape("triangle")}>Add Triangle</button>
    </div>
  );
};

export default Toolbar;
