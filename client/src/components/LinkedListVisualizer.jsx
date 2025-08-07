import React, { useState } from 'react';
import './DSVisualizer.css';

export default function LinkedListVisualizer() {
  const [list, setList] = useState([]);
  const [input, setInput] = useState('');
  const [message, setMessage] = useState('');

  const insertNode = () => {
    if (input === '') return;
    setList([...list, input]);
    setMessage(`Inserted ${input} to the linked list.`);
    setInput('');
  };

  const resetList = () => {
    setList([]);
    setMessage('Linked list reset.');
  };

  return (
    <div className="ds-container">
      <h2>Linked List Visualizer</h2>
      <div className="ds-controls">
        <input
          type="text"
          value={input}
          placeholder="Enter value"
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={insertNode}>Insert</button>
        <button onClick={resetList}>Reset</button>
      </div>

      <div className="linked-list">
        {list.map((val, idx) => (
          <div className="node" key={idx}>
            <div className="circle">{val}</div>
            {idx < list.length - 1 && <span className="arrow">→</span>}
          </div>
        ))}
        {list.length > 0 && <span className="null-node">null</span>}
      </div>

      <div className="educational-output">{message}</div>
      <div className="complexity-box">Time: O(n), Space: O(n)</div>
    </div>
  );
}
