import G6 from "@antv/g6";

G6.registerNode("iconfont", {
  draw(cfg, group) {
    const { backgroundAttrs, iconAttrs, labelAttrs, isLabelShow } = cfg;

    const keyShape = group.addShape("circle", {
      attrs: {
        x: 0,
        y: 0,
        r: cfg.size,
        cursor: "move",
        ...backgroundAttrs,
      },
      draggable: true,
      name: "circle-shape",
    });

    group.addShape("text", {
      attrs: {
        x: 0,
        y: 0,
        fontFamily: "graph_iconfont",
        textAlign: "center",
        textBaseline: "middle",
        text: cfg.text,
        fontSize: cfg.size / 2,
        cursor: "move",
        ...iconAttrs,
      },
      draggable: true,
      name: "text-iconfont",
    });

    if (isLabelShow) {
      const labelY = cfg.size + 4;
      group.addShape("text", {
        attrs: {
          x: 0,
          y: labelY,
          textAlign: "center",
          ...labelAttrs,
        },
        name: "text-label",
      });
    }

    return keyShape;
  },
});
