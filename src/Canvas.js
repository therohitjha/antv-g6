import React from "react";

export default function Canvas({ canvasRef }) {
  return <div ref={canvasRef} className="canvas"></div>;
}

// Above,  G6 appending canvas to div using canvasRef.
// So adding one more <canvas/> make no sense. So i have skipped <canvas/>.
