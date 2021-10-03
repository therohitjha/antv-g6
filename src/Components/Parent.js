import React, { useState } from "react";
import useG6 from "./useG6";
import Canvas from "./Canvas";
import Sidebar from "./Sidebar";

export default function Parent() {
  const [canvasRef, hide, setHide] = useG6();
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  const getNodes = () => {
    if (canvasRef.current) {
      setNodes(canvasRef.current.getNumberOfNodes());
    }
  };
  const getEdges = () => {
    if (canvasRef.current) {
      setEdges(canvasRef.current.getNumberOfEdges());
    }
  };

  function handleSidebar() {
    setHide(!hide);
  }

  return (
    <div className="container">
      <Canvas canvasRef={canvasRef} hide={hide} />
      {!hide && (
        <Sidebar
          nodes={nodes}
          edges={edges}
          getNodes={getNodes}
          getEdges={getEdges}
        />
      )}
      <button className="hide" onClick={handleSidebar}>
        {!hide ? "Hide Sidebar" : "Show Sidebar"}
      </button>
    </div>
  );
}
