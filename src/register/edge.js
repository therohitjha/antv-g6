import G6 from "@antv/g6";

G6.registerEdge(
  "line-arrow",
  {
    draw(cfg, group) {
      const { startPoint, endPoint } = cfg;

      const keyShape = group.addShape("path", {
        attrs: {
          path: [
            ["M", startPoint.x, startPoint.y],
            ["L", endPoint.x, endPoint.y],
          ],
          stroke: "#ddd",
          lineWidth: 1,
          endArrow: {
            path: "M 0,0 L 3,2 L 2.5,0 L 3,-2 Z",
            fill: "#ddd",
          },
        },
        name: "path-shape",
      });
      return keyShape;
    },
  },
  "quadratic",
);
