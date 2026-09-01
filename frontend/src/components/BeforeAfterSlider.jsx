
import { useState } from "react";

function BeforeAfterSlider({ before, after }) {

  const [position, setPosition] = useState(50);

  return (
    <div className="slider-container">

      <img
        src={before}
        alt="Original"
        className="slider-image"
      />


      <div
        className="after-image"
        style={{
          width: `${position}%`
        }}
      >
        <img
          src={after}
          alt="Background Removed"
          className="slider-image"
        />
      </div>


      <input
        type="range"
        min="0"
        max="100"
        value={position}
        onChange={(event) =>
          setPosition(event.target.value)
        }
        className="slider-control"
      />

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
