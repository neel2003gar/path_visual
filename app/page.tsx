'use client';

import { Controls } from './components/Controls';
import { Grid } from './components/Grid';

export default function Home() {
  return (    <div className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-center text-white">
          Pathfinding Algorithm Visualizer
        </h1>

        <div className="bg-slate-800 rounded-lg shadow-lg p-6">
          <Controls />
          <div className="mt-8 overflow-auto">
            <Grid />
          </div>
        </div>

        <div className="bg-slate-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-white">Algorithm Information</h2>
          <div className="space-y-4 text-slate-200">
            <div>
              <h3 className="font-bold">Dijkstra&apos;s Algorithm</h3>
              <p>Guarantees the shortest path. Time complexity: O(V + E log V)</p>
            </div>
            <div>
              <h3 className="font-bold">A* Search</h3>
              <p>Uses heuristics to find the shortest path efficiently. Time complexity: O(E)</p>
            </div>
            <div>
              <h3 className="font-bold">Breadth-First Search</h3>
              <p>Guarantees shortest path in unweighted graphs. Time complexity: O(V + E)</p>
            </div>
            <div>
              <h3 className="font-bold">Depth-First Search</h3>
              <p>Memory efficient, but doesn&apos;t guarantee shortest path. Time complexity: O(V + E)</p>
            </div>
            <div>
              <h3 className="font-bold">Greedy Best-First Search</h3>
              <p>Fast but doesn&apos;t guarantee shortest path. Time complexity: O(V + E)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
