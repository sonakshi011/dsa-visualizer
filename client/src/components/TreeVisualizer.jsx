import React, { useState } from 'react';
import './DSVisualizer.css';

function TreeNode({ value, left, right }) {
  return (
    <div className="tree-node">
      <div className="tree-val">{value}</div>
      {(left || right) && (
        <div className="tree-children">
          {left ? <TreeNode {...left} /> : <div className="tree-empty" />}
          {right ? <TreeNode {...right} /> : <div className="tree-empty" />}
        </div>
      )}
    </div>
  );
}

export default function TreeVisualizer() {
  const [root, setRoot] = useState(null);
  const [input, setInput] = useState('');
  const [message, setMessage] = useState('');

  const playInsertSound = () => {
    const audio = new Audio('https://actions.google.com/sounds/v1/cartoon/wood_plank_flicks.ogg');
    audio.volume = 0.5;
    audio.play();
  };

  const deepClone = (node) => {
    if (!node) return null;
    return {
      value: node.value,
      left: deepClone(node.left),
      right: deepClone(node.right),
    };
  };

  // Complete Binary Tree Insertion (level-order)
  const insertLevelOrder = (node, value) => {
    const newNode = { value, left: null, right: null };
    if (!node) return newNode;

    const queue = [node];
    while (queue.length) {
      const current = queue.shift();
      if (!current.left) {
        current.left = newNode;
        break;
      } else queue.push(current.left);

      if (!current.right) {
        current.right = newNode;
        break;
      } else queue.push(current.right);
    }

    return node;
  };

  const handleInsert = () => {
    const val = parseInt(input);
    if (!isNaN(val)) {
      const cloned = deepClone(root);
      const newTree = insertLevelOrder(cloned, val);
      setRoot(newTree);
      setMessage(`Inserted ${val} at next available position.`);
      playInsertSound();
      setInput('');
    }
  };

  const resetTree = () => {
    setRoot(null);
    setMessage('Tree reset.');
  };

  return (
    <div className="ds-container">
      <h2>Tree Visualizer</h2>
      <div className="ds-controls">
        <input
          type="number"
          value={input}
          placeholder="Enter value"
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleInsert}>Insert</button>
        <button onClick={resetTree}>Reset</button>
      </div>

      <div className="tree-container">
        {root && <TreeNode {...root} />}
      </div>

      <div className="educational-output">{message}</div>
      <div className="complexity-box">Insert: O(n), Space: O(n)</div>
    </div>
  );
}
