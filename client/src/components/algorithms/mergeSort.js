export function getMergeSortAnimations(array) {
  const animations = [];
  const aux = array.slice();

  function mergeSort(arr, l, r) {
    if (l >= r) return;
    const mid = Math.floor((l + r) / 2);
    mergeSort(arr, l, mid);
    mergeSort(arr, mid + 1, r);
    merge(arr, l, mid, r);
  }

  function merge(arr, l, mid, r) {
    const temp = [];
    let i = l, j = mid + 1;

    while (i <= mid && j <= r) {
      animations.push({
        type: 'compare',
        indices: [i, j],
        note: `Comparing ${arr[i]} and ${arr[j]}`,
      });

      if (arr[i] <= arr[j]) {
        temp.push(arr[i++]);
      } else {
        temp.push(arr[j++]);
      }
    }

    while (i <= mid) temp.push(arr[i++]);
    while (j <= r) temp.push(arr[j++]);

    for (let k = l; k <= r; k++) {
      animations.push({
        type: 'overwrite',
        indices: [k],
        newHeight: temp[k - l],
        note: `Writing ${temp[k - l]} at index ${k}`,
      });
      arr[k] = temp[k - l];
    }
  }

  mergeSort(aux, 0, aux.length - 1);
  return animations;
}
