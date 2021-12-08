import React from 'react';
import {getMergeSortAnimations, getQuickSortAnimations, getHeapSortAnimations, getBubbleSortAnimations} from '../sortingAlgorithms/sortingAlgorithms.js';
import './SortingVisualizer.css';

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 5;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 10;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'orange';

// This is the color of array bars that are being swapped.
const SWAP_COLOR = 'red';

// This is the color of sorted bars from left merge
const LEFT_COLOR = 'pink';

// This is the color of sorted bars from right merge
const RIGHT_COLOR = 'purple';

// This os the color of compared bars in a quicksort partition run
const HOLD_COLOR = 'wheat';

// This is the color of array bars that are finished sorting.
const FINISHED_COLOR = 'green';

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [],
      numberOfBars: NUMBER_OF_ARRAY_BARS,
      speed: ANIMATION_SPEED_MS,
    };
  }

  componentDidMount() {
    this.resetArray();
  }
  
  changeBars() {
    console.log(`Previous number of bars: ${this.state.numberOfBars}`);
    const newNumberOfBars = document.getElementById("numberOfBars").value;
    console.log(`Changing to: ${newNumberOfBars}`);
    this.setState((prevState) => ({
      numberOfBars: newNumberOfBars}), () => {
      this.resetArray()});
  }

  changeSpeed() {
    console.log(`Previous speed: ${this.state.speed}`);
    const newSpeed = parseInt(document.getElementById("speed").value);
    console.log(`Changing to: ${newSpeed}`);
    this.setState((prevState) => ({
      speed: newSpeed}), () => {
      console.log(`New speed: ${this.state.speed}`)});
  }

  resetArray() {
    const unseen = document.getElementsByClassName('unseen');
    for (let i = 0; i < unseen.length; i++) {
      unseen[i].style.display = 'none';
    }
    const array = [];
    for (let i = 0; i < this.state.numberOfBars; i++) {
      array.push(randomIntFromInterval(5, 550));
    }
    console.log(`Current number of bars: ${this.state.numberOfBars}`);
    this.setState({array});
    this.resetColor();
  }

  resetColor() {
    const arrayBars = document.getElementsByClassName('array-bar');
    for (let idx = 0; idx < arrayBars.length; idx++) {
      let barStyle = arrayBars[idx].style;
      barStyle.backgroundColor = PRIMARY_COLOR;
    }
  }

  mergeSort() {
    const displayMerge = document.getElementById('merge-sort');
    displayMerge.style.display = "block";
    const displayPink = document.getElementById('pink-item');
    displayPink.style.display = "block";
    const displayPurple = document.getElementById('purple-item');
    displayPurple.style.display = "block";
    const animations = getMergeSortAnimations(this.state.array);
    console.log(animations);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const stateOfAnimation = animations[i][0];
      const barOneIdx = animations[i][1];
      const barTwoIdx = animations[i][2];
      const barOneStyle = arrayBars[barOneIdx].style;
      const barTwoStyle = arrayBars[barTwoIdx].style;
      if (stateOfAnimation === 0) {         // State 0 Set left and right sorted bars to different colors
        const colorLeft = LEFT_COLOR;
        const colorRight = RIGHT_COLOR;
        const indicesLeft = animations[i][3];
        const indicesRight = animations[i][4];
        const indicesStyleLeft = [];
        const indicesStyleRight = [];
        indicesLeft.forEach(idx => indicesStyleLeft.push(arrayBars[idx].style));
        indicesRight.forEach(idx => indicesStyleRight.push(arrayBars[idx].style));
        setTimeout(() => {
          indicesStyleLeft.forEach(style => style.backgroundColor = colorLeft);
          indicesStyleRight.forEach(style => style.backgroundColor = colorRight);
        }, i * this.state.speed);
      } else if (stateOfAnimation === 1) {  // State 1 Set two bars being compared to orange
        const color = SECONDARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * this.state.speed);
      } else if (stateOfAnimation === 2) {  // State 2 Revert colors back to left and right array colors
        const left = animations[i][3];
        const right = animations[i][4];
        let colorLeft;
        let colorRight;
        if (left === 'left') {
          colorLeft = LEFT_COLOR;
        } else {
          colorLeft = RIGHT_COLOR;
        }
        if (right === 'right') {
          colorRight = RIGHT_COLOR;
        } else {
          colorRight = LEFT_COLOR;
        }
        setTimeout(() => {
          barOneStyle.backgroundColor = colorLeft;
          barTwoStyle.backgroundColor = colorRight;
        }, i * this.state.speed);
      } else if (stateOfAnimation === 3) {  // State 3 Set height to zero (stored in alternate array) as it is the lowest bar
        setTimeout(() => {
          barTwoStyle.height = `0px`;
        }, i * this.state.speed);
      } else if (stateOfAnimation === 4) {  // State 4 Store the order in which the merged array should reappear
        const color = PRIMARY_COLOR;
        const index = animations[i][3];
        const height = animations[i][4];
        const style = arrayBars[index].style;
        setTimeout(() => {
          style.backgroundColor = color;
          style.height = `${height}px`;
        }, i * this.state.speed);
      }  else if (stateOfAnimation === 5) {  // State 5 Update color to green as finished state
        const color = FINISHED_COLOR;
        const style = arrayBars[barTwoIdx].style;
        setTimeout(() => {
          style.backgroundColor = color;
        }, i * this.state.speed);
      }
    }
  }

  quickSort() {
    const displayWheat = document.getElementById('wheat-item');
    displayWheat.style.display = "block";
    const displayQuick = document.getElementById('quick-sort');
    displayQuick.style.display = "block";
    const animations = getQuickSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const stateOfAnimation = animations[i][0];
      const barOneIdx = animations[i][1];
      const barTwoIdx = animations[i][2];
      const barOneStyle = arrayBars[barOneIdx].style;
      const barTwoStyle = arrayBars[barTwoIdx].style;
      if (stateOfAnimation === 0) {         // State 0 Set last bar to orange as 'pivot'
        const color = SECONDARY_COLOR;
        setTimeout(() => {
          barTwoStyle.backgroundColor = color;
        }, i * this.state.speed);
      } else if (stateOfAnimation === 1) {  // State 1 Comparison step: Set current index bar to orange
        const color = HOLD_COLOR;
        const indices = animations[i][3];
        const indicesStyle = [];
        indices.forEach(idx => indicesStyle.push(arrayBars[idx].style));
        setTimeout(() => {
          indicesStyle.forEach(style => style.backgroundColor = color);;
        }, i * this.state.speed);
      } else if (stateOfAnimation === 2) {  // State 1 Comparison step: Set current index bar to orange
        const color = SECONDARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
        }, i * this.state.speed);
      } else if (stateOfAnimation === 3) {  // State 2 IF swap needed: Current index bar and pivot index bar to red
        const color = SWAP_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * this.state.speed);
      } else if (stateOfAnimation === 4) {  // State 3 Actual swapping: Two bars swap heights
        const barOneNewHeight = animations[i][3];
        const barTwoNewHeight = animations[i][4];
        setTimeout(() => {
          barOneStyle.height = `${barOneNewHeight}px`;
          barTwoStyle.height = `${barTwoNewHeight}px`;
        }, i * this.state.speed);
      } else if (stateOfAnimation === 5) {  // State 4 Finish swapping: Two bars turn turquoise
        const color = HOLD_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * this.state.speed);
      } else if (stateOfAnimation === 6) {  // State 5 Finish comparing: Single bar turns turquoise
        const color = HOLD_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
        }, i * this.state.speed);
      } else if (stateOfAnimation === 7) {
        const color = SWAP_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * this.state.speed);
      } else if (stateOfAnimation === 8) {
        const barOneNewHeight = animations[i][3];
        const barTwoNewHeight = animations[i][4];
        setTimeout(() => {
          barOneStyle.height = `${barOneNewHeight}px`;
          barTwoStyle.height = `${barTwoNewHeight}px`;
        }, i * this.state.speed);
      } else if (stateOfAnimation === 9) {
        const color = PRIMARY_COLOR;
        const indices = animations[i][3];
        const indicesStyle = [];
        indices.forEach(idx => indicesStyle.push(arrayBars[idx].style));
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
          indicesStyle.forEach(style => style.backgroundColor = color);;
        }, i * this.state.speed);
      } else if (stateOfAnimation === 10) {
        const color = FINISHED_COLOR;
        setTimeout(() => {
          barTwoStyle.backgroundColor = color;
        }, i * this.state.speed);
      }
    }
  }

  heapSort() {
    const displayHeap = document.getElementById('heap-sort');
    displayHeap.style.display = "block";
    const animations = getHeapSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const stateOfAnimation = animations[i][0];
      const barOneIdx = animations[i][1];
      const barTwoIdx = animations[i][2];
      const barOneStyle = arrayBars[barOneIdx].style;
      const barTwoStyle = arrayBars[barTwoIdx].style;
      if (stateOfAnimation === 0) {          // State 0 Set parent bar to orange for comparison with its children bars
        const color = SECONDARY_COLOR;
        setTimeout(() => {
          barTwoStyle.backgroundColor = color;
        }, i * this.state.speed);
      } else if (stateOfAnimation === 1) {   // State 1 Set one of the child bar to orange for comparison
        const color = SECONDARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
        }, i * this.state.speed);
      } else if (stateOfAnimation === 2) {   // State 2 Set one of the child bar to red for swapping
        const color = SWAP_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
        }, i * this.state.speed);
      } else if (stateOfAnimation === 3) {   // State 3 Revert one of the child bar to turquoise as another child bar is larger
        const color = PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
        }, i * this.state.speed);
      } else if (stateOfAnimation === 4) {   // State 4 Set parent bar back to turquoise as no swapping needed
        const color = PRIMARY_COLOR;
        setTimeout(() => {
          barTwoStyle.backgroundColor = color;
        }, i * this.state.speed);
      } else if (stateOfAnimation === 5) {   // State 5 Set top node and end node to red for swapping
        const color = SWAP_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * this.state.speed);
      } else if (stateOfAnimation === 6) {   // State 6 Swapping top node and end node
        const barOneNewHeight = animations[i][3];
        const barTwoNewHeight = animations[i][4];
        setTimeout(() => {
          barOneStyle.height = `${barOneNewHeight}px`;
          barTwoStyle.height = `${barTwoNewHeight}px`;
        }, i * this.state.speed);
      } else if (stateOfAnimation === 7) {   // State 7 Revert color back to turquoise after swapping
        const color = PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * this.state.speed);
      } else if (stateOfAnimation === 8) {   // State 8 Set end node to green as finished state
        const color = FINISHED_COLOR;
        setTimeout(() => {
          barTwoStyle.backgroundColor = color;
        }, i * this.state.speed);
      }
    }
  }

  bubbleSort() {
    const displayBubble = document.getElementById('bubble-sort');
    displayBubble.style.display = "block";
    const animations = getBubbleSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const stateOfAnimation = animations[i][0];
      const barOneIdx = animations[i][1];
      const barTwoIdx = animations[i][2];
      const barOneStyle = arrayBars[barOneIdx].style;
      const barTwoStyle = arrayBars[barTwoIdx].style;
      if (stateOfAnimation === 0) {          // State 0 Comparison step: Two bars turn orange
        const color = SECONDARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * this.state.speed);
      } else if (stateOfAnimation === 1) {   // State 1 IF SWAP needed: Two bars turn red
        const color = SWAP_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * this.state.speed);
      } else if (stateOfAnimation === 2) {   // State 2 Actual swapping: Two bars swap height
        const barOneNewHeight = animations[i][3];
        const barTwoNewHeight = animations[i][4];
        setTimeout(() => {
          barOneStyle.height = `${barOneNewHeight}px`;
          barTwoStyle.height = `${barTwoNewHeight}px`;
        }, i * this.state.speed);
      } else if (stateOfAnimation === 3) {   // State 3 Finish comparing/swapping: Two bars turn turquoise
        const color = PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * this.state.speed);
      } else if (stateOfAnimation === 4) {   // State 4 Reach Final position: Single bar turns green
        const color = FINISHED_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
        }, i * this.state.speed);
      }
    }
  }

  // NOTE: This method will only work if your sorting algorithms actually return
  // the sorted arrays; if they return the animations (as they currently do), then
  // this method will be broken.
  testSortingAlgorithms() {
    for (let i = 0; i < 100; i++) {
      const array = [];
      const length = randomIntFromInterval(1, 1000);
      for (let i = 0; i < length; i++) {
        array.push(randomIntFromInterval(-1000, 1000));
      }
      const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
      getMergeSortAnimations(array);
      console.log(arraysAreEqual(javaScriptSortedArray, array));
    }
  };

  render() {
    const {array} = this.state;

    return (
      <div className="container screen-container">
        <div className="top-container">
          <div className="container array-container">
            {array.map((value, idx) => (
              <div
                className="array-bar"
                key={idx}
                style={{
                  backgroundColor: PRIMARY_COLOR,
                  height: `${value}px`,
                }}></div>
            ))}
          </div>
          <div className="text-container">
            <div className="description-container">
              <div id="sorting-algo">
                <h1>Sorting Visualiser</h1>
              </div>
              <div className="sort-description unseen" id="merge-sort">
                <h2>Merge Sort Algorithm</h2>
                <h3>Complexity</h3>
                <p>Time: O[nlog(n)]</p>
                <p>Space: O[n]</p>
              </div>
              <div className="sort-description unseen" id="quick-sort">
                <h2>Quick Sort Algorithm</h2>
                <h3>Complexity</h3>
                <p>Time: O[nlog(n)]</p>
                <p>Space: O[log(n)]</p>
              </div>
              <div className="sort-description unseen" id="heap-sort">
                <h2>Heap Sort Algorithm</h2>
                <h3>Complexity</h3>
                <p>Time: O[nlog(n)]</p>
                <p>Space: O[1]</p>
              </div>
              <div className="sort-description unseen" id="bubble-sort">
                <h2>Bubble Sort Algorithm</h2>
                <h3>Complexity</h3>
                <p>Time: O[n^2]</p>
                <p>Space: O[1]</p>
              </div>
              
            </div>
            <div className="color-container">
              <h2>Color Legend</h2>
              <div className="legend-item unseen" id="pink-item">
                <div className="legend-color" id="pink"></div>
                <span>Sorted Left Array</span>
              </div>
              <div className="legend-item unseen" id="purple-item">
                <div className="legend-color" id="purple"></div>
                <span>Sorted Right Array</span>
              </div>
              <div className="legend-item unseen" id="wheat-item">
                <div className="legend-color" id="wheat"></div>
                <span>Bars Left of Pivot</span>
              </div>
              <div className="legend-item">
                <div className="legend-color" id="turquoise"></div>
                <span>Unsorted</span>
              </div>
              <div className="legend-item">
                <div className="legend-color" id="orange"></div>
                <span>Comparing</span>
              </div>
              <div className="legend-item">
                <div className="legend-color" id="red"></div>
                <span>Swapping</span>
              </div>
              <div className="legend-item">
                <div className="legend-color" id="green"></div>
                <span>Finished</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container slider-container">
          <div className="slider-item" id="barSlider">
            <label for="numberOfBars">Number of Bars: {this.state.numberOfBars}</label>
            <div className="slider-bar">
              <span>10</span>
              <input type="range" min="10" max="100" step="10" id="numberOfBars" defaultValue="10" onChange={this.changeBars.bind(this)} />
              <span>100</span>
            </div>
          </div>
          <div className="container slider-item" id="barSlider">
            <label for="speed">Pause Time between Iteration: {this.state.speed}ms</label>
            <div className="slider-bar">
              <span>5ms</span>
              <input type="range" min="5" max="910" step="100" id="speed" onChange={this.changeSpeed.bind(this)} />
              <span>905ms</span>
            </div>
          </div>
        </div>
        <div className="button-container">
          <button className="button-item" onClick={() => this.resetArray()}>Generate New Array</button>
          <button className="button-item" onClick={() => this.mergeSort()}>Merge Sort</button>
          <button className="button-item" onClick={() => this.quickSort()}>Quick Sort</button>
          <button className="button-item" onClick={() => this.heapSort()}>Heap Sort</button>
          <button className="button-item" onClick={() => this.bubbleSort()}>Bubble Sort</button>
          <button className="button-item" onClick={() => this.testSortingAlgorithms()}>
            Test Sorting Algorithms
          </button>
        </div>
      </div>
    );
  }
}



function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(arrayOne, arrayTwo) {
  if (arrayOne.length !== arrayTwo.length) return false;
  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] !== arrayTwo[i]) {
      return false;
    }
  }
  return true;
}
