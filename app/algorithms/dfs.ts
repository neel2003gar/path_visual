import { GridNode } from '../types/grid';

export function dfs(grid: GridNode[][], startNode: GridNode, endNode: GridNode): {
  visitedNodesInOrder: GridNode[];
  shortestPath: GridNode[];
} {
  const visitedNodesInOrder: GridNode[] = [];
  const stack: GridNode[] = [startNode];
  startNode.isVisited = true;

  while (stack.length > 0) {
    const currentNode = stack.pop()!;
    visitedNodesInOrder.push(currentNode);

    if (currentNode === endNode) {
      return {
        visitedNodesInOrder,
        shortestPath: getNodesInShortestPathOrder(endNode),
      };
    }

    const unvisitedNeighbors = getUnvisitedNeighbors(currentNode, grid);
    for (const neighbor of unvisitedNeighbors) {
      neighbor.isVisited = true;
      neighbor.previousNode = currentNode;
      stack.push(neighbor);
    }
  }

  return { visitedNodesInOrder, shortestPath: [] };
}

function getUnvisitedNeighbors(node: GridNode, grid: GridNode[][]): GridNode[] {
  const neighbors: GridNode[] = [];
  const { row, col } = node;

  // Order: up, right, down, left (clockwise from top)
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);

  return neighbors.filter(neighbor => !neighbor.isVisited && neighbor.type !== 'wall');
}

function getNodesInShortestPathOrder(finishNode: GridNode): GridNode[] {
  const nodesInShortestPathOrder: GridNode[] = [];
  let currentNode: GridNode | null = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}
