import { GridNode } from '../types/grid';

export function astar(grid: GridNode[][], startNode: GridNode, endNode: GridNode): {
  visitedNodesInOrder: GridNode[];
  shortestPath: GridNode[];
} {
  const visitedNodesInOrder: GridNode[] = [];
  startNode.gScore = 0;
  startNode.fScore = heuristic(startNode, endNode);
  const openSet: GridNode[] = [startNode];

  while (openSet.length > 0) {
    sortByFScore(openSet);
    const current = openSet.shift()!;

    if (current === endNode) {
      return {
        visitedNodesInOrder,
        shortestPath: getNodesInShortestPathOrder(endNode),
      };
    }

    visitedNodesInOrder.push(current);
    current.isVisited = true;

    const neighbors = getUnvisitedNeighbors(current, grid);
    for (const neighbor of neighbors) {
      if (neighbor.isVisited) continue;

      const tentativeGScore = current.gScore + 1;

      if (!openSet.includes(neighbor)) {
        openSet.push(neighbor);
      } else if (tentativeGScore >= neighbor.gScore) {
        continue;
      }

      neighbor.previousNode = current;
      neighbor.gScore = tentativeGScore;
      neighbor.fScore = neighbor.gScore + heuristic(neighbor, endNode);
    }
  }

  return { visitedNodesInOrder, shortestPath: [] };
}

function heuristic(nodeA: GridNode, nodeB: GridNode): number {
  return Math.abs(nodeA.row - nodeB.row) + Math.abs(nodeA.col - nodeB.col);
}

function sortByFScore(nodes: GridNode[]) {
  nodes.sort((a, b) => a.fScore - b.fScore);
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
