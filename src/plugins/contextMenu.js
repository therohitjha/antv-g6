import G6 from "@antv/g6";

const contextMenu = new G6.Menu({
  getContent(graph) {
    return `<ul>
        <li title='1'>测试01</li>
        <li title='2'>测试02</li>
        <li>测试03</li>
        <li>测试04</li>
        <li>测试05</li>
      </ul>`;
  },
  handleMenuClick: (target, item) => {
  },
});

export default contextMenu;
