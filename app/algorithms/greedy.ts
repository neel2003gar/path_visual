import { GridNode } from '../types/grid';

export function greedy(grid: GridNode[][], startNode: GridNode, endNode: GridNode): {
  visitedNodesInOrder: GridNode[];
  shortestPath: GridNode[];
} {
  const visitedNodesInOrder: GridNode[] = [];
  startNode.hScore = heuristic(startNode, endNode);
  const openSet: GridNode[] = [startNode];
  startNode.isVisited = true;

  while (openSet.length > 0) {
    sortByHScore(openSet);
    const currentNode = openSet.shift()!;
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
      neighbor.hScore = heuristic(neighbor, endNode);
      openSet.push(neighbor);
    }
  }

  return { visitedNodesInOrder, shortestPath: [] };
}

function heuristic(nodeA: GridNode, nodeB: GridNode): number {
  return Math.abs(nodeA.row - nodeB.row) + Math.abs(nodeA.col - nodeB.col);
}

function sortByHScore(nodes: GridNode[]) {
  nodes.sort((a, b) => a.hScore - b.hScore);
}

function getUnvisitedNeighbors(node: GridNode, grid: GridNode[][]): GridNode[] {
  const neighbors: GridNode[] = [];
  const { row, col } = node;

  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);

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
