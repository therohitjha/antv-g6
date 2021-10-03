import { useEffect, useState, useRef } from "react";
import G6 from "@antv/g6";
import color from "color";
import useData from "../hooks/useData";
import { layoutMap, CURVENESS_LIST } from "../utils/constant";
import "antd/dist/antd.css";
import { handleEvent } from "../utils";
import "../register";
import "../index.css";

const NodeColor = "#fff";
const NodeBorderColor = "#0052D9";
const NodeBGColor = color(NodeBorderColor).alpha(0.6).string();

export default function useG6() {
  const canvasRef = useRef(null);
  const graphRef = useRef(null);
  const [zoom, setZoom] = useState(0);
  const [hide, setHide] = useState(false);
  const [config, setConfig] = useState({
    nodeSize: 18,
    width: 1000,
    height: 700,
    layout: "force",
    isLabelShow: false,
  });
  const { nodeSize, width, height, layout, isLabelShow } = config;
  const data = useData(0);

  function resizeListener() {
    const graph = graphRef.current;
    if (graph) {
      setConfig((prevState) => {
        return {
          ...prevState,
          width: canvasRef.current.offsetWidth,
          height: canvasRef.current.offsetHeight,
        };
      });
      graph.changeSize(
        canvasRef.current.offsetWidth,
        canvasRef.current.offsetHeight,
      );
      graph.layout();
      graph.fitView();
    }
  }

  useEffect(() => {
    if (canvasRef.current) {
      resizeListener();
    }
  }, [hide]);

  useEffect(() => {
    window.addEventListener("resize", resizeListener);
    return () => window.removeEventListener("resize", resizeListener);
  }, [width, height]);

  useEffect(() => {
    graphRef.current = new G6.Graph({
      container: canvasRef.current,
      width,
      height,
      modes: {
        default: [
          {
            type: "drag-canvas",
            enableOptimize: false,
          },
          {
            type: "zoom-canvas",
            enableOptimize: true,
            optimizeZoom: 1,
          },
          {
            type: "activate-relations",
            trigger: "click",
          },
          {
            type: "tooltip",
            formatText(model) {
              return model.id;
            },
            offset: 10,
          },
          {
            type: "edge-tooltip",
            formatText(model) {
              return model.id;
            },
            offset: 10,
          },
          "drag-node",
        ],
      },
      layout: layoutMap[layout],
      defaultNode: {
        color: "#5B8FF9",
        style: {
          lineWidth: 1,
          fill: "#C6E5FF",
        },

        size: nodeSize,
        type: "iconfont",
        iconAttrs: {
          fill: NodeColor,
          text: "\ue628",
        },
        labelAttrs: {
          fill: NodeBorderColor,
          text: "Node Label",
        },
        backgroundAttrs: {
          backgroundType: "circle",
          fill: NodeBGColor,
          stroke: NodeBorderColor,
          r: nodeSize / 2,
        },
      },
      defaultEdge: {
        type: "line-arrow",
      },
    });

    const graph = graphRef.current;
    graph.render();

    handleEvent(graph, {
      onWheelZoom: setZoom,
    });
  }, []);

  useEffect(() => {
    const graph = graphRef.current;
    if (!graph) {
      return;
    }

    const autoPaint = graph.get("autoPaint");
    graph.findAll("node", (node) => {
      graph.update(node, {
        size: nodeSize,
        isLabelShow,
        backgroundAttrs: {
          r: nodeSize / 2,
        },
        zoom,
      });
    });

    graph.paint();
    graph.setAutoPaint(autoPaint);
  }, []);

  // useEffect(() => {
  //   const graph = graphRef.current;
  //   if (!graph) {
  //     return;
  //   }

  //   graph.updateLayout({
  //     ...layoutMap[layout],
  //     width,
  //     height,
  //   });
  //   graph.changeSize(width, height);
  // }, []);

  useEffect(() => {
    const graph = graphRef.current;

    if (!graph) {
      return;
    }

    const links = [];
    data.edges.forEach((item) => {
      const sameLink = links.filter(
        (_) => _.source === item.source && _.target === item.target,
      );
      item.curveOffset =
        (CURVENESS_LIST[sameLink.length] || Math.random()) * 40;

      if (item.source === item.target) {
        item.type = "loop";
        item.style = {
          stroke: "#F6BD16",
          endArrow: {
            path: "M 0,0 L 3,2 L 2.5,0 L 3,-2 Z",
            fill: "#F6BD16",
          },
        };
      }
      links.push(item);
    });

    data.edges = links;

    graph.data(data);
    graph.render();

    canvasRef.current.getNumberOfNodes = function () {
      return graph.getNodes();
    };
    canvasRef.current.getNumberOfEdges = function () {
      return graph.getEdges();
    };
  }, []);
  return [canvasRef, hide, setHide];
}
