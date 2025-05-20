'use client';

import { useVisualizerStore } from '../store/visualizerStore';
import { Algorithm } from '../types/grid';

import { astar } from '../algorithms/astar';
import { bfs } from '../algorithms/bfs';
import { dfs } from '../algorithms/dfs';
import { dijkstra } from '../algorithms/dijkstra';
import { greedy } from '../algorithms/greedy';

export const Controls: React.FC = () => {
  const {
    selectedAlgorithm,
    visualizationSpeed,
    isVisualizing,
    grid,
    startNode,
    endNode,
    resetGrid,
    generateRandomMaze,
    setNodeType
  } = useVisualizerStore();

  const getDelayFromSpeed = (speed: string): number => {
    switch (speed) {
      case 'slow': return 100;
      case 'medium': return 50;
      case 'fast': return 20;
      default: return 50;
    }
  };

  const visualizeAlgorithm = async () => {
    if (!startNode || !endNode) return;

    useVisualizerStore.setState({ isVisualizing: true });
    const start = grid[startNode.row][startNode.col];
    const end = grid[endNode.row][endNode.col];

    let result;
    switch (selectedAlgorithm) {
      case 'dijkstra':
        result = dijkstra(grid, start, end);
        break;
      case 'astar':
        result = astar(grid, start, end);
        break;
      case 'bfs':
        result = bfs(grid, start, end);
        break;
      case 'dfs':
        result = dfs(grid, start, end);
        break;
      case 'greedy':
        result = greedy(grid, start, end);
        break;
      default:
        return;
    }

    const { visitedNodesInOrder, shortestPath } = result;
    const delay = getDelayFromSpeed(visualizationSpeed);

    // Animate visited nodes
    for (let i = 0; i < visitedNodesInOrder.length; i++) {
      const node = visitedNodesInOrder[i];
      if (node.type === 'empty') {
        await new Promise(resolve => setTimeout(resolve, delay));
        setNodeType(node.row, node.col, 'visited');
      }
    }

    // Animate shortest path
    for (let i = 0; i < shortestPath.length; i++) {
      const node = shortestPath[i];
      if (node.type === 'visited') {
        await new Promise(resolve => setTimeout(resolve, delay));
        setNodeType(node.row, node.col, 'path');
      }
    }

    useVisualizerStore.setState({ isVisualizing: false });
  };

  return (    <div className="flex flex-col gap-4 p-4 bg-slate-800 shadow-lg rounded-lg">
      <div className="flex gap-4">
        <select
          className="p-2 border rounded bg-slate-700 text-white border-slate-600"
          value={selectedAlgorithm}
          onChange={(e) => useVisualizerStore.setState({ selectedAlgorithm: e.target.value as Algorithm })}
        >
          <option value="dijkstra">Dijkstra&apos;s Algorithm</option>
          <option value="astar">A* Search</option>
          <option value="bfs">Breadth-First Search</option>
          <option value="dfs">Depth-First Search</option>
          <option value="greedy">Greedy Best-First Search</option>
        </select>

        <select
          className="p-2 border rounded bg-slate-700 text-white border-slate-600"
          value={visualizationSpeed}
          onChange={(e) => useVisualizerStore.setState({ visualizationSpeed: e.target.value as 'slow' | 'medium' | 'fast' })}
        >
          <option value="slow">Slow</option>
          <option value="medium">Medium</option>
          <option value="fast">Fast</option>
        </select>

        <button
          className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 disabled:opacity-50"
          disabled={isVisualizing}
          onClick={visualizeAlgorithm}
        >
          {isVisualizing ? 'Visualizing...' : 'Start Visualization'}
        </button>

        <button
          className="px-4 py-2 bg-rose-600 text-white rounded hover:bg-rose-700"
          onClick={resetGrid}
        >
          Reset Grid
        </button>

        <button
          className="px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700"
          onClick={generateRandomMaze}
        >
          Generate Maze
        </button>
      </div>

      <div className="flex gap-4 text-sm text-white">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-emerald-500"></div>
          <span>Start Node</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-rose-600"></div>
          <span>End Node</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-slate-900"></div>
          <span>Wall</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-500"></div>
          <span>Visited Node</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-amber-400"></div>
          <span>Path Node</span>
        </div>
      </div>
    </div>
  );
};
