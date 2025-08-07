export function getInsertionSortAnimations(array) {
  const animations = [];
  const arr = array.slice();

  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;

    animations.push({
      type: 'pivot',
      indices: [i],
      note: `Inserting element ${key} at correct position`,
    });

    while (j >= 0 && arr[j] > key) {
      animations.push({
        type: 'compare',
        indices: [j, j + 1],
        note: `Comparing ${arr[j]} and ${key}`,
      });

      animations.push({
        type: 'overwrite',
        indices: [j + 1],
        newHeight: arr[j],
        note: `Moving ${arr[j]} to index ${j + 1}`,
      });

      arr[j + 1] = arr[j];
      j--;
    }

    animations.push({
      type: 'overwrite',
      indices: [j + 1],
      newHeight: key,
      note: `Placing ${key} at index ${j + 1}`,
    });

    arr[j + 1] = key;
  }

  return animations;
}
