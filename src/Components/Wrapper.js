import React, { useEffect, useState, useRef } from "react";
import ResizeObserver from "resize-observer-polyfill";
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

const useResizeObserver = (ref) => {
  const [dimension, setDimension] = useState(null);

  useEffect(() => {
    const observerTarget = ref.current;
    const observer = new ResizeObserver((e) => {
      e.forEach((k) => setDimension(k.contentRect));
    });
    observer.observe(observerTarget);
    return () => {
      observer.unobserve(observerTarget);
    };
  }, [ref]);
  return dimension;
};

const Wrapper = React.forwardRef((props, ref) => {
  const graphRef = useRef(null);
  const dimension = useResizeObserver(ref);
  const [zoom, setZoom] = useState(0);
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
          width: dimension.width,
          height: dimension.height,
        };
      });
      graph.changeSize(dimension.width, dimension.height);
      graph.layout();
      graph.fitView();
    }
  }

  useEffect(() => {
    if (ref.current) {
      resizeListener();
    }
  }, [dimension]);

  useEffect(() => {
    graphRef.current = new G6.Graph({
      container: ref.current,
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

    ref.current.getNumberOfNodes = function () {
      return graph.getNodes();
    };
    ref.current.getNumberOfEdges = function () {
      return graph.getEdges();
    };
  }, []);
  return <div ref={ref} {...props}></div>;
});
export default Wrapper;
