export function getQuickSortAnimations(array) {
  const animations = [];
  const arr = array.slice();

  function quickSort(start, end) {
    if (start >= end) return;

    const pivot = arr[end];
    let i = start;

    animations.push({
      type: 'pivot',
      indices: [end],
      note: `Choosing pivot at index ${end} (value: ${pivot})`,
    });

    for (let j = start; j < end; j++) {
      animations.push({
        type: 'compare',
        indices: [j, end],
        note: `Comparing ${arr[j]} with pivot ${pivot}`,
      });

      if (arr[j] < pivot) {
        animations.push({
          type: 'swap',
          indices: [i, j],
          note: `Swapping ${arr[i]} and ${arr[j]}`,
        });
        [arr[i], arr[j]] = [arr[j], arr[i]];
        i++;
      }
    }

    animations.push({
      type: 'swap',
      indices: [i, end],
      note: `Placing pivot ${pivot} at correct position ${i}`,
    });

    [arr[i], arr[end]] = [arr[end], arr[i]];

    quickSort(start, i - 1);
    quickSort(i + 1, end);
  }

  quickSort(0, arr.length - 1);
  return animations;
}
