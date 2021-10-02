import React from "react";

function Sidebar({ getEdges, getNodes, nodes, edges }) {
  return (
    <div className="sidebar">
      Nodes: {nodes.length ? nodes.length : null}
      <br />
      Edges: {edges.length ? edges.length : null}
      <br />
      <button onClick={getNodes}>Get Nodes</button>
      <button onClick={getEdges}>Get Edges</button>
    </div>
  );
}

export default Sidebar;
