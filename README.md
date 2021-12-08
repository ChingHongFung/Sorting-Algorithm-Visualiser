# Sorting-Algorithm-Visualiser

## Project Aim

This project uses React.js to create a web app visualisation for some of the most common sorting algorithms including merge-sort, quick-sort, heap-sort and bubble-sort. More information about the algorithms could be found on https://en.wikipedia.org/wiki/Sorting_algorithm.

### Technologies and Algorithms
* JavaScript
* React.js
* CSS
* Merge-sort
* Quick-sort
* Heap-sort
* Bubble-sort

## Overview
### Basic setup
The react app is created via a bootstrap environment provided via https://reactjs.org/docs/create-a-new-react-app.html. The main sorting algorithms are encoded in src/sortingAlgorithms.js for the four algorithms via functions getMergeSortAnimations(), getQuickSortAnimations(), getHeapSortAnimations() and getBubbleSortAnimations(). These are exported and used in src/SortingVisualizer.jsx where the rendering of the html elements takes place. The css styles are provided with src/SortingVisualizer.css.

### Implementation of the sorting algorithms and animations
The sorting algorithms are implemented using the most efficient implementations that guarantee the best time and space complexities. To generate the animations, an extra array 'animations' is created in each algorithm which stores the steps in each iteration. These could include 'comparing two bars', 'swapping two bars', 'adding bars to temporary auxiliary array', 'color-coding the status of bars', etc. After the algorithms are run, the sorted arrays are checked against the built-in JavaScript implementation to verify the reliability of our codes using the 'Test Algorithms' button. The animations are then generated using the corresponding functions of mergeSort(), quickSort(), heapSort() and bubbleSort() in SortingVisualizer.jsx.

### Description box and colour legend
On the right, the type of algorithm being run along with its time and space complexities are shown for more information. At the bottom, the colour legend shows what each of the colour codes represents.

### Slider bars
Two slider input bars are present below the main visualisation that allows users to select the number of array bars to be sorted and the speed of the visualisation. For better understanding of the algorithms, one could increase the iteration pause time to see how the algorithm comapres and swaps values in each iteration.

### Algorithm selection buttons
The buttons at the very bottom allows users to select an algorithm to run and visualise.

## Demo Videos
### Merge sort
https://user-images.githubusercontent.com/91271318/145254501-5579b9f7-c0ca-4737-99fe-baa9858416f5.mp4

In the merge sort algorithm, one could see that at each merging step, two sorted subarrays (of colour pink representing left subarray and colour purple representing right subarray) are being compared and combined into one. In the actual implementation, an auxiliary array is created to temporarily stores the compared subarray values and then repopulate the main array after the entire merging step (as shown by the disppaerance and reapperance of bars). 

### Quick sort
https://user-images.githubusercontent.com/91271318/145254533-395d2cfe-eef9-4c6a-ba10-879d945cbac2.mp4

In the quick sort algorithm, one could see that at the partition step, the bars towards the left of the pivot are highlighed (with 'wheat' colour). As they are compared with the pivot value, if values are lower than the pivot, they are swapped to the left hand side of the pivot and vice versa, if values are larger. The pivot is chosen as the last element of any subarray during partition. This is one specific implementation of quick-sort; other options exist for example picking the mean or median as the pivot value in each partition step.

### Heap sort
https://user-images.githubusercontent.com/91271318/145254555-a16a0204-8dc3-4f66-914a-459a26324a9f.mp4

In the heap sort algorithm, one could see that the array is first 'heapified' into a max-heap structure. This follows the mapping between a heap structure and an array where formulas exist for relating the parent node to children nodes for all points in the binary tree. Following the initial heapifying stage, the root node is swapped with the last element signifying the largest value being placed in the end of the array. The entire array, excluding the sorted 'last element' is then heapified again and so on until the entire array is sorted.

### Bubble sort
https://user-images.githubusercontent.com/91271318/145254566-e886efa1-9baa-48b8-8705-f6eb6295bfd1.mp4

In the bubble sort algorithm, one could see that at each comparison, the two bars are first highlighted orange signifying a comparison and then red if a swapping is needed. The algorithm is optimised by only comparing values up to the start of the 'sorted subarray' at the end of the array. At each run through the array, if no elements require any swapping, then the entire array is considered sorted and so the algorithm terminates, increasing computaional efficiency.

## Future improvements
Future work could include implementing more sorting algorithms. The animation implementation would be similar following the logic of pushing an animation step into the animations array then visualising everything using a setTimeout() in the end.


## Information about React App

### Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

#### Available Scripts

In the project directory, you can run:

##### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

##### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

##### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

##### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

#### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

##### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

##### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

##### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

##### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

##### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

##### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
