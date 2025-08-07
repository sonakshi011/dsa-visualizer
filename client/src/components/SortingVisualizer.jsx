import React, { useState, useEffect, useRef } from 'react';
import './SortingVisualizer.css';
import { useAuth } from '../context/AuthContext';

import { getBubbleSortAnimations } from './algorithms/bubbleSort';
import { getSelectionSortAnimations } from './algorithms/selectionSort';
import { getInsertionSortAnimations } from './algorithms/insertionSort';
import { getMergeSortAnimations } from './algorithms/mergeSort';
import { getQuickSortAnimations } from './algorithms/quickSort';
import { getHeapSortAnimations } from './algorithms/heapSort';

const PRIMARY_COLOR = '#4fc3f7';
const COMPARE_COLOR = 'orange';
const SWAP_COLOR = 'crimson';
const PIVOT_COLOR = 'gold';
const FINAL_COLOR = '#00e676';

const algorithmOptions = {
  'Bubble Sort': getBubbleSortAnimations,
  'Selection Sort': getSelectionSortAnimations,
  'Insertion Sort': getInsertionSortAnimations,
  'Merge Sort': getMergeSortAnimations,
  'Quick Sort': getQuickSortAnimations,
  'Heap Sort': getHeapSortAnimations,
};

const complexities = {
  'Bubble Sort': 'Time: O(n²), Space: O(1)',
  'Selection Sort': 'Time: O(n²), Space: O(1)',
  'Insertion Sort': 'Time: O(n²), Space: O(1)',
  'Merge Sort': 'Time: O(n log n), Space: O(n)',
  'Quick Sort': 'Time: O(n log n), Space: O(log n)',
  'Heap Sort': 'Time: O(n log n), Space: O(1)',
};

export default function SortingVisualizer() {
  const [array, setArray] = useState([]);
  const [size, setSize] = useState(30);
  const [speed, setSpeed] = useState(50);
  const [isSorting, setIsSorting] = useState(false);
  const [paused, setPaused] = useState(false);
  const [customInput, setCustomInput] = useState('');
  const [message, setMessage] = useState('');
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('Bubble Sort');
  const [educationalMode, setEducationalMode] = useState(true);
  const [theme, setTheme] = useState('dark');
  const pausedRef = useRef(false);
  const { token } = useAuth();

  useEffect(() => {
    resetArray();
  }, [size]);

  const resetArray = () => {
    const arr = Array.from({ length: size }, () => Math.floor(Math.random() * 400) + 20);
    setArray(arr);
    setMessage('');
    const bars = document.getElementsByClassName('array-bar');
    for (let bar of bars) {
      bar.style.backgroundColor = PRIMARY_COLOR;
    }
  };

  const handleCustomArray = () => {
    const values = customInput.split(',').map(n => parseInt(n)).filter(n => !isNaN(n));
    if (values.length) setArray(values);
  };

  const playClickSound = () => {
    const audio = new Audio('https://actions.google.com/sounds/v1/cartoon/wood_plank_flicks.ogg');
    audio.volume = 0.3;
    audio.play();
  };

  const runAnimations = async (animations) => {
    const bars = document.getElementsByClassName('array-bar');
    setIsSorting(true);
    setMessage('Sorting started...');

    for (let i = 0; i < animations.length; i++) {
      while (pausedRef.current) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      const { type, indices, newHeight, note } = animations[i];

      await new Promise(resolve => {
        setTimeout(() => {
          if (educationalMode && note) setMessage(note);
          playClickSound();

          const [i1, i2] = indices;

          if (type === 'compare') {
            bars[i1].style.backgroundColor = COMPARE_COLOR;
            bars[i2].style.backgroundColor = COMPARE_COLOR;
            bars[i1].querySelector('.bar-marker').textContent = '👀';
            bars[i2].querySelector('.bar-marker').textContent = '👀';

            setTimeout(() => {
              bars[i1].style.backgroundColor = PRIMARY_COLOR;
              bars[i2].style.backgroundColor = PRIMARY_COLOR;
              bars[i1].querySelector('.bar-marker').textContent = '';
              bars[i2].querySelector('.bar-marker').textContent = '';
            }, speed);

          } else if (type === 'swap') {
            bars[i1].style.backgroundColor = SWAP_COLOR;
            bars[i2].style.backgroundColor = SWAP_COLOR;

            const temp = bars[i1].style.height;
            bars[i1].style.height = bars[i2].style.height;
            bars[i2].style.height = temp;

            const label1 = bars[i1].querySelector('.bar-label');
            const label2 = bars[i2].querySelector('.bar-label');
            const tmpText = label1.textContent;
            label1.textContent = label2.textContent;
            label2.textContent = tmpText;

            setTimeout(() => {
              bars[i1].style.backgroundColor = PRIMARY_COLOR;
              bars[i2].style.backgroundColor = PRIMARY_COLOR;
            }, speed);

          } else if (type === 'overwrite') {
            bars[i1].style.height = `${newHeight}px`;
            const label = bars[i1].querySelector('.bar-label');
            if (label) label.textContent = newHeight;

          } else if (type === 'pivot') {
            bars[i1].style.backgroundColor = PIVOT_COLOR;
            setTimeout(() => {
              bars[i1].style.backgroundColor = PRIMARY_COLOR;
            }, speed);
          }

          resolve();
        }, speed);
      });
    }

    // ✅ Set all bars green at the end
    for (let i = 0; i < bars.length; i++) {
      bars[i].style.backgroundColor = FINAL_COLOR;
      bars[i].querySelector('.bar-marker').textContent = '';
    }

    setIsSorting(false);
    setMessage('Sorting complete!');

    // ✅ Save session if token exists
    if (token) {
      fetch('https://sorting-backend-5ut1.onrender.com/api/sessions/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          algorithm: selectedAlgorithm,
          input: array,
          sorted: Array.from(document.getElementsByClassName('array-bar')).map(bar => 
            parseInt(bar.style.height)
          ),
          steps: animations.length
        })
      })
      .then(res => res.json())
      .then(data => console.log('Session saved:', data))
      .catch(err => console.error('Error saving session:', err));
    }
  };

  const sortHandler = () => {
    const arrayCopy = array.slice();
    const getAnimations = algorithmOptions[selectedAlgorithm];
    if (!getAnimations) return;
    const animations = getAnimations(arrayCopy);
    runAnimations(animations);
  };

  const togglePause = () => {
    setPaused(prev => {
      pausedRef.current = !prev;
      return !prev;
    });
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    document.body.className = theme === 'dark' ? 'light-theme' : 'dark-theme';
  };

  return (
    <div className={`visualizer-container ${theme}-theme`}>
      <h2 className="heading">Sorting Visualizer</h2>

      <div className="controls">
        <label>Algorithm</label>
        <select value={selectedAlgorithm} onChange={(e) => setSelectedAlgorithm(e.target.value)} disabled={isSorting}>
          {Object.keys(algorithmOptions).map((algo) => (
            <option key={algo} value={algo}>{algo}</option>
          ))}
        </select>

        <label>Size</label>
        <input type="range" min="5" max="100" value={size} disabled={isSorting} onChange={(e) => setSize(Number(e.target.value))} />

        <label>Speed</label>
        <input type="range" min="10" max="200" value={speed} disabled={isSorting} onChange={(e) => setSpeed(Number(e.target.value))} />

        <label><input type="checkbox" checked={educationalMode} onChange={() => setEducationalMode(!educationalMode)} disabled={isSorting} /> Educational Mode</label>

        <label><input type="checkbox" checked={theme === 'dark'} onChange={toggleTheme} /> Dark Mode</label>

        <input type="text" placeholder="Comma-separated array" value={customInput} onChange={(e) => setCustomInput(e.target.value)} disabled={isSorting} />
        <button onClick={handleCustomArray} disabled={isSorting}>Use Custom</button>
        <button onClick={resetArray} disabled={isSorting}>New Array</button>
        <button onClick={sortHandler} disabled={isSorting}>Sort</button>
        <button onClick={togglePause} disabled={!isSorting}>{paused ? 'Resume' : 'Pause'}</button>
      </div>

      <div className="array-container">
        {array.map((val, idx) => (
          <div
            key={idx}
            className="array-bar"
            style={{
              height: `${val}px`,
              width: `${Math.floor(1000 / size)}px`,
              backgroundColor: PRIMARY_COLOR,
            }}
          >
            <span className="bar-marker"></span>
            <span className="bar-label">{val}</span>
          </div>
        ))}
      </div>

      <div className="explanation">
        <p>{message}</p>
      </div>

      <div className="complexity-box">
        {complexities[selectedAlgorithm]}
      </div>
    </div>
  );
}
