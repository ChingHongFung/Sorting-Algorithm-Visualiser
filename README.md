# A-Star-Path-Finding

## Project Aim

This project is inspired by a youtuber "Tech with Tim" who implements the A-star-path-finding algorithm using Python. Visualisation is done using the Pygame package to show how the algorithm considers each negihboring nodes in each iteration. More information about the algorithm could be found on https://en.wikipedia.org/wiki/A*_search_algorithm.

### Technologies and Algorithms
* Python 3.8
* PyGame
* A-Star Path Finding

## Overview
### Basic desicription of algorithm
![equation](https://user-images.githubusercontent.com/91271318/137495297-7b3dde30-8212-4182-bf15-2be5a79811eb.png)

Essentially, the algorithm seeks for the shortest path by considering a value f_score of all available neighbors next to a current node. For each neighbor, f_score is composed of the g_score and h_score. g_score measures the cost of the path (the number of steps needed) to travel from the start to this neighbor; h_score is a heuristic function that estimates the cheapest cost to reach the end point from this neighbor. By sequentially considering the f_score of each node, we could insert these values into a priority queue which allows the next iteration to priotise searching at the node with the lowest f_score. Each iteration updates the corresponding scores while removing the already-considered nodes from the queue until a solution is found. 

### Heuristic function
![Manhattan_distance](https://user-images.githubusercontent.com/91271318/137496871-1b7b3446-afb1-465c-9230-c9e8fd46c85c.png)

(https://en.wikipedia.org/wiki/Taxicab_geometry)

For my implementation, I used the Manhattan distance as a lowerbound heuristic funciton instead of other measures such as Euclidean. This is because the path could not traverse diagonally so the Manhattan distance is a more conservative estimation for paths along the x,y directions. This heuristic is very simple to implement as we only need to find the absolute difference in Cartesian coordinates of the two points. 

### Improvement to progamme by "Tech with Tim"
source.py is the original implementation of the algorithm. I added a few extra features and refined certain aspects of the programme including custom grid sizing, additional costs to certain nodes, portals between nodes and refined optimisaion heuristic function.

### Grid spacing
![grid_spcaing](https://user-images.githubusercontent.com/91271318/137500839-105d0726-c39f-469f-9606-ba1df9ae3758.png)
Running main() allows you to pick a grid size of your own choice. Instructions are printed to show how the pathfinding game works.

### Printing out total number of steps
I also added codes to count the total number of steps required for the shortest path (incorporating the efffect of costly steps, explained further below) ![total_steps](https://user-images.githubusercontent.com/91271318/137507643-b9cc745e-2df0-4666-9a3c-f1c17a8a81dc.png). If no possible solution could be found, a statemeny will also be printed. ![no_solution](https://user-images.githubusercontent.com/91271318/137507641-99555e89-7a53-43dc-bcd7-aabeaa2dfc00.png)

## Basic visualisation with no obstacless
### update_neighbors()
![update_neighbors](https://user-images.githubusercontent.com/91271318/137501410-33db8d7c-12c9-40c0-a28d-9c65e1112ae9.png)

update_neighbors() is called to go through each spot instance of the grid to assign neighbors to each node. Barriers and nodes outside the grid are disregarded. Neighbors are stored as an attribute of each spot instance making it easy to retrieve. Light brown colours show nodes that have been considered and thrown out of the queue; dark brown shows nodes that are open and on the queue waiting to be considered. Queuing system depends on the f_score of each node which is stored in the priority queue structure. Video 1 shows the game running with no barriers. Once a solution is found, reconstruct_path() is called to draw out the shortest path.

Video 1: Basic run with no additonal elements

https://user-images.githubusercontent.com/91271318/137501043-ec380f5f-9ea7-4967-907f-d7ad6b7e376e.mp4

## Additional costs feature
### add_cost()
![add_cost](https://user-images.githubusercontent.com/91271318/137504502-2a0061b9-400e-4092-854e-70896bcc8bca.png)

add_cost() allows additional costs to be added to nodes upon mid scroll click. Cost values are again stored as an attribute within the nodes. The more red a block is, the higher the cost. In Video 2, notice when the open nodes reach the red nodes at the bottom left, the algorithm first looks away at other nodes with cost of 1 (white nodes) on the right hand side. This is because, additional costs increase the g_score of the red nodes making their overall f_scores higher so they fall into lower positions in the queue. After some iterations, as the open nodes spread to futher nodes on the right, the algorithm jumps back to the bottom left as they now have lower f_scores. Finally, a path is found that traverses through the bottom left.

Video 2: Costly nodes 1

https://user-images.githubusercontent.com/91271318/137501820-34b18d7e-643b-4561-b437-c22d5a879253.mp4

In Video 3, we could again see that the algorithm bounces back and forth between the 'red path' around the edge and the 'white snake path'. Again the algorithm always looks for the node with the lowest f_score at each iteration. The high red costs along the edges resulted in a final shortest path that goes around the snake.

Video 3: Costly nodes 2

https://user-images.githubusercontent.com/91271318/137501831-a6c9c066-89df-40b5-9317-325fc6754b6e.mp4

## Portals feature
### check_portal() and add_portal_neighbors()
![check_portal add_portal_neighbors](https://user-images.githubusercontent.com/91271318/137505099-a70aab4c-9ad5-4f99-ad9c-89898e5928ab.png)

check_portal() and add_portal_neighbors() connect portals of the same type. Portals could be added by hovering the mouse over a node and tapping the key 'p'. This turns a node into a portal. Portals of the same type could be connected. Essentially, what this does is that neighbors adjacent to each portal would have direct access to neighbours of portals of the same type. By clicking on an existing portal again using 'p', it changes the type of that portal to the alternative. This way only portals of the same type could be connected. Video 4 shows how a single pair of portals allows the path to be jumped across the map.

Video 4: Single portal type

https://user-images.githubusercontent.com/91271318/137505705-63daab53-8ab2-4f12-9de3-d271417f529e.mp4

### Changing the heuristic optimising direction
![portal_h_optimiser](https://user-images.githubusercontent.com/91271318/137506538-f74c9b0d-6b58-4fa7-8447-7a9e523cfdfb.png)

This code varies the method the heuristic function optimises through. Instead of optimising by looking at the h_score with the end node in every iteration, it looks at the lower h_score that leads the search closer to portals that could potentially speed up the entire computation. Notice in Video 5 that the search runs in two spikey directions towards the two pink portals in the beginning, once these portals are found, the path would have access to neighbors near the bottom edge allowing the shortest path to be found much quicker.

Video 5: Multiple portals of same type

https://user-images.githubusercontent.com/91271318/137505677-ea039dfd-55f6-4733-94ec-02e3d75a4272.mp4

In Video 6, the start and end nodes are originally unreachable without the help of portals due to the presence of barriers. With help of the two sets of portals, the path is able to connect independently through the portals.

Video 6: Two types of portals

https://user-images.githubusercontent.com/91271318/137505720-9271d14d-492f-4e00-88f9-d9cc425699f6.mp4

## Future improvements
Future improvements could be made that allows the types of portals to extend to more than two types. This will encompass more color schemes for visualisation. In addition, on top of costly paths, we could introduce nodes with zero costs that will speed up paths in certain directions. More considerations could be given to the heuristic function to optimise its search.

The basic layout of this project could potentially be extended to other path-finding algorithms other than A* such as D*. We could add features such as negative weights to further explore these algorithms as well.






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
