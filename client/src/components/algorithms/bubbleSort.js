export function getBubbleSortAnimations(array) {
  const animations = [];
  const arr = array.slice();
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      animations.push({
        type: 'compare',
        indices: [j, j + 1],
        note: `Comparing index ${j} (${arr[j]}) and ${j + 1} (${arr[j + 1]})`,
      });

      if (arr[j] > arr[j + 1]) {
        animations.push({
          type: 'swap',
          indices: [j, j + 1],
          note: `Swapping ${arr[j]} and ${arr[j + 1]}`,
        });
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }

  return animations;
}
