import React, { useState, useRef } from "react";
import Sidebar from "./Sidebar";
import Wrapper from "./Wrapper";
export default function Parent() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [hide, setHide] = useState(false);
  const ref = useRef(null);

  const getNodes = () => {
    if (ref.current) {
      setNodes(ref.current.getNumberOfNodes());
    }
  };
  const getEdges = () => {
    if (ref.current) {
      setEdges(ref.current.getNumberOfEdges());
    }
  };

  function handleSidebar() {
    setHide(!hide);
  }

  return (
    <div className="container">
      <Wrapper ref={ref} className={hide ? 'canvas-full' : 'canvas'} />
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
