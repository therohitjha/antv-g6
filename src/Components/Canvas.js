import React from "react";

 const Canvas = React.forwardRef((props,ref)=>{
  return (
    <div ref={ref} {...props}></div>
  )
})

// Above,  G6 appending canvas to div using canvasRef.
// So adding one more <canvas/> make no sense. So i have skipped <canvas/>.


export default Canvas