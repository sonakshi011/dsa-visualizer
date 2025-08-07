export function getSelectionSortAnimations(array) {
  const animations = [];
  const arr = array.slice();

  for (let i = 0; i < arr.length; i++) {
    let minIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      animations.push({
        type: 'compare',
        indices: [j, minIndex],
        note: `Comparing index ${j} (${arr[j]}) with current min index ${minIndex} (${arr[minIndex]})`,
      });

      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }

    if (minIndex !== i) {
      animations.push({
        type: 'swap',
        indices: [i, minIndex],
        note: `Swapping ${arr[i]} and ${arr[minIndex]}`,
      });
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
  }

  return animations;
}
