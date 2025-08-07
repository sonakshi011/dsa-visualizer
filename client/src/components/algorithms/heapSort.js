export function getHeapSortAnimations(array) {
  const animations = [];
  const arr = array.slice();
  const n = arr.length;

  function heapify(size, i) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < size) {
      animations.push({
        type: 'compare',
        indices: [left, largest],
        note: `Comparing left child ${arr[left]} with root ${arr[largest]}`,
      });
      if (arr[left] > arr[largest]) largest = left;
    }

    if (right < size) {
      animations.push({
        type: 'compare',
        indices: [right, largest],
        note: `Comparing right child ${arr[right]} with root ${arr[largest]}`,
      });
      if (arr[right] > arr[largest]) largest = right;
    }

    if (largest !== i) {
      animations.push({
        type: 'swap',
        indices: [i, largest],
        note: `Swapping ${arr[i]} and ${arr[largest]}`,
      });
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      heapify(size, largest);
    }
  }

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(n, i);
  }

  for (let i = n - 1; i > 0; i--) {
    animations.push({
      type: 'swap',
      indices: [0, i],
      note: `Moving max element ${arr[0]} to end`,
    });
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(i, 0);
  }

  return animations;
}
