export const layouts = [
  {
    type: "force",
    nodeStrength: -50,
    edgeStrength: 1,
    linkDistance: 60,
    nodeSize: 10,
    collideStrength: 0.5,
    preventOverlap: true,
    alpha: 0.5,
  },
  {
    type: "random",
  },
  {
    type: "mds",
    workerEnabled: true,
  },
  {
    type: "fruchterman",
    center: [200, 200], 
    gravity: 5, 
    speed: 2,
    clustering: true,
    clusterGravity: 30, 
    maxIteration: 2000, 
    workerEnabled: true,
  },
  {
    type: "circular",
    center: [200, 200], 
    radius: 300, 
    startRadius: 10,
    endRadius: 100, 
    clockwise: false, 
    divisions: 5, 
    ordering: "degree", 
    angleRatio: 1, 
  },
  {
    type: "radial",
    center: [200, 200], 
    linkDistance: 50, 
    maxIteration: 1000, 
    unitRadius: 100, 
    preventOverlap: true, 
    nodeSize: 30, 
    strictRadial: false, 
    workerEnabled: true, 
  },
  {
    type: "dagre",
    rankdir: "TB", 
    align: "DL", 
    nodesep: 10,
    ranksep: 100,
    controlPoints: false,
  },
  {
    type: "concentric",
    center: [200, 200],
    linkDistance: 50, 
    preventOverlap: true, 
    nodeSize: 30, 
    sweep: 10, 
    equidistant: false, 
    startAngle: 0, 
    clockwise: false, 
    maxLevelDiff: 10, 
    sortBy: "degree", 
    workerEnabled: true, 
  },
  {
    type: "grid",
    begin: [0, 0], 
    preventOverlap: true, 
    preventOverlapPdding: 20, 
    nodeSize: 30, 
    condense: false, 
    rows: 5, 
    cols: 5, 
    sortBy: "degree", 
    workerEnabled: true, 
  },
];

export const layoutMap = {};

layouts.forEach((_) => {
  layoutMap[_.type] = _;
});

export const CURVENESS_LIST = Array.from({ length: 20 }).map(
  (_, i) => (((i < 10 ? i + 2 : i - 9) - (i % 2)) / 10) * (i % 2 ? -1 : 1),
);
