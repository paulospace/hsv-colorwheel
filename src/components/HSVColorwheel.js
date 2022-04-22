import { useState, useEffect } from "react";
import chroma from "chroma-js";
import { polarToCartesian, cartesianToPolar } from "./utils";
import "./HSVColorwheel.css";

const HSVColorwheel = ({ width }) => {
  const maxRadius = width / 2;
  const [color, setColor] = useState(chroma.random().hsv());
  const [position, setPosition] = useState(
    polarToCartesian(color[0], color[1] * maxRadius)
  );
  const [focus, setFocus] = useState(false);
  useEffect(() => {
    setPosition(polarToCartesian(color[0], color[1] * maxRadius));
  }, [color]);

  const handleMouseDown = (e) => {
    setFocus(true);
  };

  const handleMouseUp = (e) => {
    setFocus(false);
  };

  const handleMouseMove = (e) => {
    if (!focus) return;

    let positionX = position.x + e.movementX;
    let positionY = position.y + e.movementY;

    let { theta, radius } = cartesianToPolar(positionX, positionY);
    if (radius > maxRadius) radius = maxRadius;
    setColor([theta, radius / maxRadius, color[2]]);
  };

  const handleColorChange = (channel, e) => {
    let value = e.target.value;

    switch (channel) {
      case 0:
        setColor([value, color[1], color[2]]);
        break;
      case 1:
        value = value / 100;
        setColor([color[0], value, color[2]]);
        break;
      case 2:
        value = value / 100;
        setColor([color[0], color[1], value]);
        break;
    }
  };

  return (
    <div className="HSVColorwheel">
      <div
        className="HSVColorwheel-colorwheel"
        style={{ width: width, height: width }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <div
          className="HSVColorwheel-colorwheel--tool"
          onMouseDown={handleMouseDown}
          style={{
            transform: `translate(${position.x}px, ${position.y}px)`,
            background: chroma.hsv([color[0], color[1], 1]).css(),
          }}
        ></div>
      </div>
      <div className="HSVColorwheel-inputs">
        <div
          className="HSVColorwheel-preview"
          style={{ background: chroma.hsv(color).css() }}
        ></div>
        <div className="HSVColorwheel-inputs--container">
          <label for="HSVColorwheel-input-h">H: </label>
          <input
            type="number"
            id="HSVColorwheel-input-h"
            onChange={(e) => handleColorChange(0, e)}
            value={Math.floor(color[0])}
          />
        </div>
        <div className="HSVColorwheel-inputs--container">
          <label for="HSVColorwheel-input-s">S: </label>
          <input
            type="number"
            id="HSVColorwheel-input-s"
            onChange={(e) => handleColorChange(1, e)}
            value={Math.floor(color[1] * 100)}
          />
        </div>
        <div className="HSVColorwheel-inputs--container">
          <label for="HSVColorwheel-input-v">V: </label>
          <input
            type="number"
            id="HSVColorwheel-input-v"
            onChange={(e) => handleColorChange(2, e)}
            value={Math.floor(color[2] * 100)}
          />
        </div>
      </div>
    </div>
  );
};

export default HSVColorwheel;
