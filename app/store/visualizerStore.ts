'use client';

import { create } from 'zustand';
import { GridNode, VisualizerState } from '../types/grid';

const createInitialGrid = (rows: number, cols: number): GridNode[][] => {
  const grid: GridNode[][] = [];

  for (let row = 0; row < rows; row++) {
    const currentRow: GridNode[] = [];
    for (let col = 0; col < cols; col++) {
      currentRow.push({
        row,
        col,
        type: 'empty',
        isVisited: false,
        distance: Infinity,
        previousNode: null,
        fScore: Infinity,
        gScore: Infinity,
        hScore: Infinity,
      });
    }
    grid.push(currentRow);
  }

  return grid;
};

export const useVisualizerStore = create<VisualizerState>((set, get) => ({
  grid: createInitialGrid(20, 50),
  startNode: { row: 10, col: 10 },
  endNode: { row: 10, col: 40 },
  isVisualizing: false,
  isDragging: false,
  selectedAlgorithm: 'dijkstra',
  visualizationSpeed: 'medium',

  setNodeType: (row: number, col: number, type: NodeType) => {
    const { grid } = get();
    const newGrid = [...grid];
    newGrid[row] = [...grid[row]];
    newGrid[row][col] = {
      ...grid[row][col],
      type,
    };
    set({ grid: newGrid });
  },

  resetGrid: () => {
    const { startNode, endNode } = get();
    const newGrid = createInitialGrid(20, 50);
    if (startNode) newGrid[startNode.row][startNode.col].type = 'start';
    if (endNode) newGrid[endNode.row][endNode.col].type = 'end';
    set({ grid: newGrid });
  },

  toggleWall: (row: number, col: number) => {
    const { grid, startNode, endNode } = get();
    if (
      (startNode?.row === row && startNode?.col === col) ||
      (endNode?.row === row && endNode?.col === col)
    )
      return;

    const newGrid = [...grid];
    newGrid[row] = [...grid[row]];
    newGrid[row][col] = {
      ...grid[row][col],
      type: grid[row][col].type === 'wall' ? 'empty' : 'wall',
    };
    set({ grid: newGrid });
  },

  setStartNode: (row: number, col: number) => {
    const { grid, startNode } = get();
    if (startNode) {
      const newGrid = [...grid];
      newGrid[startNode.row] = [...grid[startNode.row]];
      newGrid[startNode.row][startNode.col] = {
        ...grid[startNode.row][startNode.col],
        type: 'empty',
      };
      newGrid[row] = [...grid[row]];
      newGrid[row][col] = {
        ...grid[row][col],
        type: 'start',
      };
      set({ grid: newGrid, startNode: { row, col } });
    }
  },

  setEndNode: (row: number, col: number) => {
    const { grid, endNode } = get();
    if (endNode) {
      const newGrid = [...grid];
      newGrid[endNode.row] = [...grid[endNode.row]];
      newGrid[endNode.row][endNode.col] = {
        ...grid[endNode.row][endNode.col],
        type: 'empty',
      };
      newGrid[row] = [...grid[row]];
      newGrid[row][col] = {
        ...grid[row][col],
        type: 'end',
      };
      set({ grid: newGrid, endNode: { row, col } });
    }
  },

  generateRandomMaze: () => {
    const { startNode, endNode } = get();
    const newGrid = createInitialGrid(20, 50);

    // Place start and end nodes
    if (startNode) newGrid[startNode.row][startNode.col].type = 'start';
    if (endNode) newGrid[endNode.row][endNode.col].type = 'end';

    // Generate random walls (30% chance for each cell)
    for (let row = 0; row < newGrid.length; row++) {
      for (let col = 0; col < newGrid[0].length; col++) {
        if (
          (startNode?.row !== row || startNode?.col !== col) &&
          (endNode?.row !== row || endNode?.col !== col) &&
          Math.random() < 0.3
        ) {
          newGrid[row][col].type = 'wall';
        }
      }
    }

    set({ grid: newGrid });
  }
}));
