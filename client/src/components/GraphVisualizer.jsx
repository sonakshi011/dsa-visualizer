import React, { useState } from 'react';
import './DSVisualizer.css';

export default function GraphVisualizer() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [nodeInput, setNodeInput] = useState('');
  const [edgeStart, setEdgeStart] = useState('');
  const [edgeEnd, setEdgeEnd] = useState('');
  const [message, setMessage] = useState('');

  const addNode = () => {
    if (nodeInput && !nodes.includes(nodeInput)) {
      setNodes([...nodes, nodeInput]);
      setMessage(`Node ${nodeInput} added.`);
    }
    setNodeInput('');
  };

  const addEdge = () => {
    if (edgeStart && edgeEnd) {
      setEdges([...edges, [edgeStart, edgeEnd]]);
      setMessage(`Edge added: ${edgeStart} → ${edgeEnd}`);
      setEdgeStart('');
      setEdgeEnd('');
    }
  };

  const resetGraph = () => {
    setNodes([]);
    setEdges([]);
    setMessage('Graph reset.');
  };

  return (
    <div className="ds-container">
      <h2>Graph Visualizer</h2>
      <div className="ds-controls">
        <input
          value={nodeInput}
          placeholder="Node"
          onChange={(e) => setNodeInput(e.target.value)}
        />
        <button onClick={addNode}>Add Node</button>
        <input
          value={edgeStart}
          placeholder="From"
          onChange={(e) => setEdgeStart(e.target.value)}
        />
        <input
          value={edgeEnd}
          placeholder="To"
          onChange={(e) => setEdgeEnd(e.target.value)}
        />
        <button onClick={addEdge}>Add Edge</button>
        <button onClick={resetGraph}>Reset</button>
      </div>

      <div className="graph">
        {nodes.map((node, i) => (
          <div key={i} className="graph-node">{node}</div>
        ))}
        {edges.map(([from, to], i) => (
          <div key={i} className="graph-edge">{from} → {to}</div>
        ))}
      </div>

      <div className="educational-output">{message}</div>
      <div className="complexity-box">Time: O(V + E), Space: O(V + E)</div>
    </div>
  );
}
