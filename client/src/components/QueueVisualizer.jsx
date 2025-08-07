import React, { useState } from 'react';
import './DSVisualizer.css';

export default function QueueVisualizer() {
  const [queue, setQueue] = useState([]);
  const [input, setInput] = useState('');
  const [message, setMessage] = useState('');

  const enqueue = () => {
    if (input === '') return;
    setQueue([...queue, input]);
    setMessage(`Enqueued ${input}`);
    setInput('');
  };

  const dequeue = () => {
    if (queue.length === 0) return;
    const val = queue[0];
    setQueue(queue.slice(1));
    setMessage(`Dequeued ${val}`);
  };

  const reset = () => {
    setQueue([]);
    setMessage('Queue reset.');
  };

  return (
    <div className="ds-container">
      <h2>Queue Visualizer</h2>
      <div className="ds-controls">
        <input
          type="text"
          value={input}
          placeholder="Enter value"
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={enqueue}>Enqueue</button>
        <button onClick={dequeue}>Dequeue</button>
        <button onClick={reset}>Reset</button>
      </div>

      <div className="queue">
        {queue.map((val, idx) => (
          <div key={idx} className="queue-item">{val}</div>
        ))}
      </div>

      <div className="educational-output">{message}</div>
      <div className="complexity-box">Enqueue/Dequeue: O(1), Space: O(n)</div>
    </div>
  );
}
