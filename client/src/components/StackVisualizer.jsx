import React, { useState } from 'react';
import './DSVisualizer.css';

export default function StackVisualizer() {
  const [stack, setStack] = useState([]);
  const [input, setInput] = useState('');
  const [message, setMessage] = useState('');

  const push = () => {
    if (input === '') return;
    setStack([...stack, input]);
    setMessage(`Pushed ${input} onto the stack.`);
    setInput('');
  };

  const pop = () => {
    if (stack.length === 0) return;
    const val = stack[stack.length - 1];
    setStack(stack.slice(0, -1));
    setMessage(`Popped ${val} from the stack.`);
  };

  const reset = () => {
    setStack([]);
    setMessage('Stack reset.');
  };

  return (
    <div className="ds-container">
      <h2>Stack Visualizer</h2>
      <div className="ds-controls">
        <input
          type="text"
          value={input}
          placeholder="Enter value"
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={push}>Push</button>
        <button onClick={pop}>Pop</button>
        <button onClick={reset}>Reset</button>
      </div>

      <div className="stack">
        {stack.map((val, idx) => (
          <div key={idx} className="stack-item">{val}</div>
        ))}
      </div>

      <div className="educational-output">{message}</div>
      <div className="complexity-box">Push/Pop: O(1), Space: O(n)</div>
    </div>
  );
}
