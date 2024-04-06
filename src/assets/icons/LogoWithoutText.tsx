import React from "react";

const LogoWithoutText = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      width="92px"
      height="62px"
      style={{
        shapeRendering: "geometricPrecision",
        textRendering: "geometricPrecision",
        // imageRendering: 'optimizeQuality',
        fillRule: "evenodd",
        clipRule: "evenodd",
      }}
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <g>
        <path
          style={{ opacity: 1 }}
          fill="#cc6751"
          d="M 45.5,4.5 C 47.371,4.85883 48.871,5.85883 50,7.5C 52.9259,11.6819 56.0925,15.6819 59.5,19.5C 50.8452,21.9943 42.8452,25.8276 35.5,31C 24.0204,40.3119 12.687,49.8119 1.5,59.5C 0.166667,58.5 0.166667,57.5 1.5,56.5C 16.5355,39.4657 31.2022,22.1323 45.5,4.5 Z"
        />
      </g>
      <g>
        <path
          style={{ opacity: 0.92 }}
          fill="#cc6751"
          d="M 60.5,26.5 C 62.1992,26.3398 63.8659,26.5065 65.5,27C 69.3559,31.3549 73.0226,35.8549 76.5,40.5C 55.8372,41.8872 36.6705,48.2205 19,59.5C 18.5,59.1667 18,58.8333 17.5,58.5C 30.7232,46.2678 45.0565,35.6011 60.5,26.5 Z"
        />
      </g>
      <g>
        <path
          style={{ opacity: 0.878 }}
          fill="#cc6751"
          d="M 74.5,47.5 C 83.0381,47.0351 88.0381,51.0351 89.5,59.5C 80.9171,57.9166 72.2504,56.9166 63.5,56.5C 56.3304,56.5548 49.3304,57.5548 42.5,59.5C 41.8333,59.1667 41.1667,58.8333 40.5,58.5C 51.5272,53.6012 62.8605,49.9345 74.5,47.5 Z"
        />
      </g>
    </svg>
  );
};

export default LogoWithoutText;
