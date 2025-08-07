import React, { useState, useEffect } from 'react';
import './DSVisualizer.css';

export default function SearchVisualizer() {
  const [array, setArray] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [target, setTarget] = useState('');
  const [message, setMessage] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(null);
  const [foundIndex, setFoundIndex] = useState(null);
  const [notFoundIndex, setNotFoundIndex] = useState(null);
  const [algorithm, setAlgorithm] = useState('Linear Search');
  const [isSearching, setIsSearching] = useState(false);
  const [educationalMode, setEducationalMode] = useState(true);
  const [complexity, setComplexity] = useState('');

  useEffect(() => {
    generateRandomArray();
  }, []);

  const generateRandomArray = () => {
    const newArray = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));
    setArray(newArray);
    resetState();
  };

  const resetState = () => {
    setInputValue('');
    setTarget('');
    setMessage('');
    setHighlightedIndex(null);
    setFoundIndex(null);
    setNotFoundIndex(null);
    setIsSearching(false);
    setComplexity('');
  };

  const handleCustomInput = () => {
    const values = inputValue.split(',').map(num => parseInt(num)).filter(n => !isNaN(n));
    if (values.length) {
      setArray(values);
      resetState();
    }
  };

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const handleSearch = async () => {
    const num = parseInt(target);
    if (isNaN(num)) {
      setMessage('❌ Please enter a valid number to search.');
      return;
    }

    resetState();
    setTarget(num);
    setIsSearching(true);
    setMessage('🔍 Starting search...');

    if (algorithm === 'Linear Search') {
      setComplexity('Time: O(n), Space: O(1)');
      for (let i = 0; i < array.length; i++) {
        setHighlightedIndex(i);
        if (educationalMode) setMessage(`Comparing index ${i} with value ${array[i]}`);
        await sleep(500);

        if (array[i] === num) {
          setFoundIndex(i);
          setMessage(`✅ Found ${num} at index ${i}`);
          setIsSearching(false);
          return;
        }
      }
      setNotFoundIndex(-1);
      setMessage(`❌ ${num} not found in the array.`);
    }

    if (algorithm === 'Binary Search') {
      const sortedArray = [...array].sort((a, b) => a - b);
      setArray(sortedArray);
      setComplexity('Time: O(log n), Space: O(1)');
      let left = 0, right = sortedArray.length - 1;

      while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        setHighlightedIndex(mid);
        if (educationalMode) setMessage(`Checking middle index ${mid}, value: ${sortedArray[mid]}`);
        await sleep(700);

        if (sortedArray[mid] === num) {
          setFoundIndex(mid);
          setMessage(`✅ Found ${num} at index ${mid}`);
          setIsSearching(false);
          return;
        } else if (sortedArray[mid] < num) {
          left = mid + 1;
        } else {
          right = mid - 1;
        }
      }
      setNotFoundIndex(-1);
      setMessage(`❌ ${num} not found in the array.`);
    }

    setIsSearching(false);
  };

  return (
    <div className="ds-container">
      <h2>Search Visualizer</h2>

      <div className="ds-controls">
        <select value={algorithm} onChange={(e) => setAlgorithm(e.target.value)} disabled={isSearching}>
          <option value="Linear Search">Linear Search</option>
          <option value="Binary Search">Binary Search</option>
        </select>

        <input
          type="text"
          placeholder="Enter custom array (e.g. 5,3,9)"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={isSearching}
        />
        <button onClick={handleCustomInput} disabled={isSearching}>Use Custom</button>

        <button onClick={generateRandomArray} disabled={isSearching}>New Array</button>

        <input
          type="number"
          placeholder="Search target"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          disabled={isSearching}
        />
        <button onClick={handleSearch} disabled={isSearching}>Start Search</button>
        <button onClick={resetState}>Reset</button>

        <label>
          <input
            type="checkbox"
            checked={educationalMode}
            onChange={() => setEducationalMode(!educationalMode)}
            disabled={isSearching}
          /> Educational Mode
        </label>
      </div>

      <div className="search-array">
        {array.map((val, idx) => {
          let className = 'search-item';
          if (idx === highlightedIndex) className += ' highlight';
          if (idx === foundIndex) className += ' found';
          return (
            <div key={idx} className={className}>
              {val}
            </div>
          );
        })}
      </div>

      <div className="educational-output">{message}</div>
      <div className="complexity-box">{complexity}</div>
    </div>
  );
}
