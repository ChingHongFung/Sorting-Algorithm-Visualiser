export {getMergeSortAnimations, getQuickSortAnimations, getHeapSortAnimations, getBubbleSortAnimations}

//MergeSort Implementation
function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  // Change color to green in sorted array
  let count = 0;
  for (let idx = 0; idx < array.length; idx++) {
    animations.push([5, count, count]);
    count++;
  }
  return animations;
}

function mergeSortHelper(
  mainArray,
  startIdx,
  endIdx,
  auxiliaryArray,
  animations,
) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  // Note passing in auxiliaryArray to be mainArray at a level down
  // The lower level amends its 'mainArray' during doMerge which in turn changes auxiliaryArray at current level
  // Hence use sorted auxiliaryArray at current level to amend mainArray at current level during doMerge
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  auxiliaryArray,
  animations,
) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;

  // Initialise storage for merging; indicesLeft and indicesRight for color visualisation
  const storage = [];
  const indicesLeft = [];
  const indicesRight = [];

  // Noting the bars that are in left and right subarrays
  for (let idx = startIdx; idx < middleIdx+1; idx++) {
    indicesLeft.push(idx);
  }
  for (let idx = middleIdx+1; idx <= endIdx; idx++) {
    indicesRight.push(idx);
  }
  // Animate the color change of the two subarrays
  animations.push([0, startIdx, endIdx, indicesLeft.slice(), indicesRight.slice()]);

  while (i <= middleIdx && j <= endIdx) {
    // Animate comparison color change
    animations.push([1, i, j]);
    // Revert color
    animations.push([2, i, j, 'left', 'right']);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      // Store for reappearance
      storage.push([4, startIdx, endIdx, k, auxiliaryArray[i]]);
      // Animate height change to zero
      animations.push([3, i, i]);
      mainArray[k] = auxiliaryArray[i];
      k++;
      i++;
    } else {
      storage.push([4, startIdx, endIdx, k, auxiliaryArray[j]]);
      animations.push([3, j, j]);
      mainArray[k] = auxiliaryArray[j];
      k++;
      j++;
    }
  }
  while (i <= middleIdx) {
    animations.push([1, i, i]);
    animations.push([2, i, i, 'left', 'left']);
    storage.push([4, startIdx, endIdx, k, auxiliaryArray[i]]);
    animations.push([3, i, i]);
    mainArray[k] = auxiliaryArray[i];
    k++;
    i++;
  }
  while (j <= endIdx) {
    animations.push([1, j, j]);
    animations.push([2, j, j, 'right', 'right']);
    storage.push([4, startIdx, endIdx, k, auxiliaryArray[j]]);
    animations.push([3, j, j]);
    mainArray[k] = auxiliaryArray[j];
    k++;
    j++;   
  }
  // Push storage back into animation for reappearance
  storage.forEach(animation => animations.push(animation));
}

//QuickSort Implementation
function getQuickSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const low = 0;
  const high = array.length-1;
  quickSortHelper(array, low, high, animations);
  return animations;
}

function quickSortHelper(array, start, end, animations) {
  // Base case or terminating case
  if (start === end) {
    // Self-comparing recursive step means the bar is not being compared to others so set animation to finished color
    animations.push([10, start, start]);
    return;
  } else if (start > end) {
    return;
  }
  // Partition function returns pivotIndex
  let index = partition(array, start, end, animations);
  // Set pivot to finished color (pivot will end at its exact position)
  animations.push([10, index, index]);   
  // Recursively apply the same logic to the left and right subarrays exclusice of pivot (as pivot is in exact position)
  quickSortHelper(array, start, index - 1, animations); 
  quickSortHelper(array, index + 1, end, animations);
}

function partition(array, start, end, animations){
  // Take the last bar as the pivot
  const pivotValue = array[end];
  // Animate pivot as 'standard' comparison bar
  animations.push([0, end, end]);

  const indices = [];
  for (let idx = start; idx < end; idx++) {
    indices.push(idx);
  }
  animations.push([1, end, end, indices.slice()]);


  // Set pivot swapping index
  let pivotIndex = start;
  // Loop through each bar comparing to the pivot bar
  for (let i = start; i < end; i++) {
    // Animate current comparison bar
    animations.push([2, i, end]);
    // Swap elements
    if (array[i] <= pivotValue) {
      // Animate the two bars being swapped
      animations.push([3, i, pivotIndex]);
      animations.push([4, i, pivotIndex, array[pivotIndex], array[i]]);
      animations.push([5, i, pivotIndex]);
      // Swap the elements in the array
      [array[i], array[pivotIndex]] = [array[pivotIndex], array[i]];
      // Move the pivot swapping index to next element
      pivotIndex++;
    }
    // Finish animation of current comparison bar
    animations.push([6, i, end]);
  }
  // Animate the pivot bar being moved to its exact position
  animations.push([7, pivotIndex, end]);
  animations.push([8, pivotIndex, end, array[end], array[pivotIndex]]);
  animations.push([9, pivotIndex, end, indices.slice()]);
  // Swap the pivot bar to its exact position
  [array[pivotIndex], array[end]] = [array[end], array[pivotIndex]] 
  return pivotIndex;
};

//HeapSort Implementation
function getHeapSortAnimations(array){
  const animations = [];
  if (array.length <= 1) return array;
  heapSortHelper(array, animations);
  return animations;
}

function heapSortHelper (array, animations) {
  // Build max heap first using unsorted input array
  buildMaxHeap(array, animations);
  // Get the index of the last element
  let endIdx = array.length - 1;
  // Continue heap sorting until we have one element left
  while (endIdx > 0) {
    // Animate the heapsort process (swapping top and end nodes)
    animations.push([5, 0, endIdx]);
    animations.push([6, 0, endIdx, array[endIdx], array[0]]);
    animations.push([7, 0, endIdx]);
    animations.push([8, 0, endIdx]);
    // Pull out the max node and store it at the end of the array; then run heapify to clean up the remaining nodes
    [array[0], array[endIdx]] = [array[endIdx], array[0]];
    heapify(array, 0, endIdx, animations);
    // Decrement endIdx to repeat the process
    endIdx -= 1;
  }
  // Animate the last node that ends at the front of the array
  animations.push([8, 0, endIdx]);
  // Return sorted array
  return array;
}

function buildMaxHeap (array, animations) {
  // Get index of the middle element; Heapify only needs to run for first half of the array as it checks all elements following mid index
  let i = Math.floor(array.length / 2 - 1);
  // Build a max heap out of all array elements passed in
  while (i >= 0) {
    heapify(array, i, array.length, animations);
    // Decrement counter to check the first half of array as parent indices
    i -= 1;
  }
}

function heapify (array, parentIdx, maxIdx, animations) {
  // Initialise a swapindex representing a case of swapping between parent and children
  // Initialise the children indices
  let swapIdx;
  let leftChildIdx;
  let rightChildIdx;
  while (parentIdx < maxIdx) {
    // Animate the parent bar being compared
    animations.push([0, parentIdx, parentIdx]);
    swapIdx = parentIdx;
    // Get the left child index using the known formula
    leftChildIdx = 2 * parentIdx + 1;
    // Get the right child index using the known formula
    rightChildIdx = leftChildIdx + 1;
    // If the left child is not last element and its value is bigger
    if (leftChildIdx < maxIdx) {
      // Animate left child being compared
      animations.push([1, leftChildIdx, parentIdx]);
      // Only do the swapping (red) animation if leftchild is larger
      if (array[leftChildIdx] > array[swapIdx]) {
        animations.push([2, leftChildIdx, parentIdx]);
        swapIdx = leftChildIdx;
      } else {
        animations.push([3, leftChildIdx, parentIdx]);
      }
    };
    // If the right child is not last element and its value is bigger
    if (rightChildIdx < maxIdx) {
      // Animate right child being compared
      animations.push([1, rightChildIdx, parentIdx]);
      // Only do the swapping (red) animation if rightchild is larger than leftchild
      if (array[rightChildIdx] > array[swapIdx]) {
        // Extra step to remove red animation for leftchild
        animations.push([3, leftChildIdx, parentIdx]);
        animations.push([2, rightChildIdx, parentIdx]);
        swapIdx = rightChildIdx;
      } else {
        animations.push([3, rightChildIdx, parentIdx]);
      }
    };
    // If none of the above conditions is true: just return
    if (swapIdx === parentIdx) {
      // No swapping: set parent bar back to turquoise
      animations.push([4, parentIdx, parentIdx]);
      return;
    } else {
      // Else animate the swapping of elements
      animations.push([5, swapIdx, parentIdx]);
      animations.push([6, swapIdx, parentIdx, array[parentIdx], array[swapIdx]]);
      animations.push([7, swapIdx, parentIdx]);
      [array[parentIdx], array[swapIdx]] = [array[swapIdx], array[parentIdx]] 
      // Continue by using the swapped index; check if children bars need swapping with their children
      parentIdx = swapIdx;
    }
  }
}

//BubbleSort Implementation
function getBubbleSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  bubbleSortHelper(array, animations);
  return animations;
}

function bubbleSortHelper (
  array,
  animations,
) {
  let isSorted = false;
  let counter = 0;
  while (!isSorted) {
    // Set isSorted logic to true (run through for loop if no swaps detected then finished)
    isSorted = true;
    for (let i = 0; i < (array.length - 1 - counter); i++) {
      // Start comparing
      animations.push([0, i, i + 1]);
      // Swap needed
      if (array[i] >= array[i + 1]) {
        animations.push([1, i, i + 1]);
        animations.push([2, i, i+1, array[i+1], array[i]]); 
        let temp = array[i + 1];
        array[i + 1] = array[i];
        array[i] = temp;
        // Entered for loop so at least one swap necessary so set isSorted to false
        isSorted = false;
      }
      // Finish comparing
      animations.push([3, i, i + 1]);
    }
    // Bar reaches final position
    animations.push([4, array.length - 1 - counter, array.length - 1]);
    counter += 1;
  }
  // Assign finish color for remaining bars
  while (counter < array.length) {
    animations.push([4, array.length - 1 - counter, array.length - 1]);
    counter += 1;
  }
}