export type NodeType = 'empty' | 'wall' | 'start' | 'end' | 'visited' | 'path';

export interface GridNode {
  row: number;
  col: number;
  type: NodeType;
  isVisited: boolean;
  distance: number;
  previousNode: GridNode | null;
  fScore: number;  // for A* algorithm
  gScore: number;  // for A* algorithm
  hScore: number;  // for A* algorithm
}

export interface GridSize {
  rows: number;
  cols: number;
}

export type Algorithm = 'dijkstra' | 'astar' | 'bfs' | 'dfs' | 'greedy';

export interface VisualizerState {
  grid: GridNode[][];
  startNode: { row: number; col: number } | null;
  endNode: { row: number; col: number } | null;
  isVisualizing: boolean;
  isDragging: boolean;
  selectedAlgorithm: Algorithm;
  visualizationSpeed: 'slow' | 'medium' | 'fast';
  setNodeType: (row: number, col: number, type: NodeType) => void;
  resetGrid: () => void;
  toggleWall: (row: number, col: number) => void;
  setStartNode: (row: number, col: number) => void;
  setEndNode: (row: number, col: number) => void;
  generateRandomMaze: () => void;
}
