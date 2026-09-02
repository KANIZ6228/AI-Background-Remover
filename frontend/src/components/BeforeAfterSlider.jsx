import { useState } from "react";

function BeforeAfterSlider({ before, after }) {

  const [position, setPosition] = useState(50);

  return (
    <div className="slider-container">

      {/* BEFORE image */}
      <img
        src={before}
        alt="Original"
        className="slider-image"
      />

      {/* AFTER image */}
      <img
        src={after}
        alt="Background Removed"
        className="slider-image after-image"
        style={{
          clipPath: `inset(0 ${100 - position}% 0 0)`
        }}
      />

      {/* Slider */}
      <input
        type="range"
        min="0"
        max="100"
        value={position}
        onChange={(event) =>
          setPosition(Number(event.target.value))
        }
        className="slider-control"
      />

      {/* Labels */}
      <span className="before-label">
        BEFORE
      </span>

      <span className="after-label">
        AFTER
      </span>

    </div>
  );
}

export default BeforeAfterSlider;