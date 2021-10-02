import G6 from "@antv/g6";

const tooltip = new G6.Tooltip({
  offset: 10,
  getContent(e) {
    const outDiv = document.createElement("div");
    outDiv.style.width = "180px";
    outDiv.innerHTML = `
        <h4>自定义tooltip</h4>
        <ul>
          <li>Label: ${e.item.getModel().label || e.item.getModel().id}</li>
        </ul>`;
    return outDiv;
  },
});

export default tooltip;
