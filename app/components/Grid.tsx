'use client';

import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useVisualizerStore } from '../store/visualizerStore';
import { GridNode, NodeType } from '../types/grid';

interface NodeProps {
  node: GridNode;
  onNodeClick: (row: number, col: number) => void;
  onNodeDrag: (row: number, col: number) => void;
}

const Node: React.FC<NodeProps> = ({ node, onNodeClick, onNodeDrag }) => {
  return (
    <motion.div      className={clsx(
        'w-6 h-6 border border-gray-400 transition-colors duration-200',
        {
          'bg-slate-50': node.type === 'empty',
          'bg-slate-900': node.type === 'wall',
          'bg-emerald-500': node.type === 'start',
          'bg-rose-600': node.type === 'end',
          'bg-blue-500': node.type === 'visited',
          'bg-amber-400': node.type === 'path',
        }
      )}
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.2 }}
      onClick={() => onNodeClick(node.row, node.col)}
      onMouseEnter={(e) => {
        if (e.buttons === 1) {
          onNodeDrag(node.row, node.col);
        }
      }}
    />
  );
};

export const Grid: React.FC = () => {
  const {
    grid,
    toggleWall,
    setStartNode,
    setEndNode
  } = useVisualizerStore();
  const [draggedNodeType, setDraggedNodeType] = useState<NodeType | null>(null);

  const handleNodeClick = (row: number, col: number) => {
    const node = grid[row][col];

    if (node.type === 'start') {
      setDraggedNodeType('start');
    } else if (node.type === 'end') {
      setDraggedNodeType('end');
    } else {
      toggleWall(row, col);
    }
  };

  const handleNodeDrag = (row: number, col: number) => {
    if (draggedNodeType === 'start') {
      setStartNode(row, col);
    } else if (draggedNodeType === 'end') {
      setEndNode(row, col);
    } else {
      toggleWall(row, col);
    }
  };

  return (
    <div className="grid gap-0 p-4" style={{ gridTemplateColumns: `repeat(${grid[0].length}, minmax(0, 1fr))` }}>
      {grid.map((row, rowIndex) =>
        row.map((node, colIndex) => (
          <Node
            key={`${rowIndex}-${colIndex}`}
            node={node}
            onNodeClick={handleNodeClick}
            onNodeDrag={handleNodeDrag}
          />
        ))
      )}
    </div>
  );
};
