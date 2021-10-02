import React, { useState } from "react";
import Wrapper from "./Wrapper";
import Canvas from "./Canvas";
import Sidebar from "./Sidebar";

function Parent({ canvasRef, graphRef }) {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  const getNodes = () => {
    if (graphRef.current) {
      setNodes(graphRef.current.getNumberOfNodes());
    }
  };
  const getEdges = () => {
    if (graphRef.current) {
      setEdges(graphRef.current.getNumberOfEdges());
    }
  };

  return (
    <div className="container">
      <Canvas canvasRef={canvasRef} />
      <Sidebar
        nodes={nodes}
        edges={edges}
        getNodes={getNodes}
        getEdges={getEdges}
      />
    </div>
  );
}

export default Wrapper(Parent);
