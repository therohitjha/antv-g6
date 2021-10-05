const refreshDragedNodePosition = (e) => {
  const model = e.item.get("model");
  model.fx = e.x;
  model.fy = e.y;
};

export const handleEvent = (graph, { onWheelZoom }) => {
  const layout = graph.get("layoutController").layoutMethod;

  graph.on("node:dragstart", (e) => {
    graph.layout();
    refreshDragedNodePosition(e);
  });

  graph.on("node:drag", (e) => {
    if (layout.type === "force") {
      layout.execute();
    }
    refreshDragedNodePosition(e);
  });

  graph.on("node:dragend", (e) => {
    e.item.get("model").fx = null;
    e.item.get("model").fy = null;
  });

  graph.on("afteractivaterelations", (e) => {
  });
};
