//This function creates the intitial lattice. This one is not made up of cell classes for storage purposes, a parallel structure
//of cells will be made that displays a certain subset of this lattice using cells.
export function createInit() {
    for (let i = 0; i < bounds[1]; i++) {
        let dummyArr = new Array();
        for (let f = 0; f < bounds[0]; f++) {
            dummyArr.push(0);
            latticeArray[i] = dummyArr;
        }
    }
}

//This function uses the current lattice array and visible boundary to create the current cell lattice to be displayed.
export function createVis() {
    let newLat = new Array(new Array());
    for (let i = visBounds[1]; i < visBounds[3]; i++) {
        let posY = i - visBounds[1];
        let dummyArr = new Array();
        for (let f = visBounds[0]; f < visBounds[2]; f++) {
            let posX = f - visBounds[0]
            dummyArr.push(new cell(cellSize, cellSize, posX * cellSize, posY * cellSize, latticeArray[i][f], false));
        }
        newLat[i] = dummyArr;
    }
    visLatticeArray = newLat;
}

//This function counts the number of living neighbors around any given cell.
export function livingNeighbors(x, y) {
    let alive = 0;
    for (let i = -1; i < 2; i++) {
        if (i != 0) {
            for (let f = -1; f < 2; f++) {
                if (((y + f) < bounds[1]) && ((y + f) >= 0) && ((x + i) >= 0) && ((x + i) < bounds[0])) {
                    if (latticeArray[y + f][x + i] == 1) {
                        alive++;
                    }
                }
            }
        }
        else {
            if (((y + 1) < bounds[1]) && ((y + 1) >= 0)) {
                if (latticeArray[y + 1][x] == 1) {
                    alive++;
                }
            }
            if (((y - 1) < bounds[1]) && ((y - 1) >= 0)) {
                if (latticeArray[y - 1][x] == 1) {
                    alive++;
                }
            }
        }
    }
    return alive;
}

//This function checks for contact with any of the borders in the current iteration. Returns an array containing characters
//'n', 's', 'e', and 'w' representing the cardinal directions. For example this function would return an array containing 'n' and 's'
//if live cells have hit the north and south border of the lattice.
export function borderContact() {
    let contactedBorders = new Array();
    for (let i = 0; i < bounds[0]; i++) {
        if (latticeArray[0][i] == 1 && !contactedBorders.includes('n')) {
            contactedBorders.push('n');
        }
        if (latticeArray[bounds[1] - 1][i] == 1 && !contactedBorders.includes('s')) {
            contactedBorders.push('s');
        }
        if (latticeArray[i][0] == 1 && !contactedBorders.includes('w')) {
            contactedBorders.push('w');
        }
        if (latticeArray[i][bounds[0] - 1] == 1 && !contactedBorders.includes('e')) {
            contactedBorders.push('e');
        }
    }
    return contactedBorders;
}

//This function takes a direction in the form of a character representing a cardinal direction and a number of cells to expand the lattice by.
//This function will push the border in that direction back num rows/columns.
export function expandBorder(direction, num) {
    if (direction == 'n') {
        newLat = new Array(new Array());
        for (let i = 0; i < (bounds[1] + num); i++) {
            let dummyArr = new Array();
            for (let f = 0; f < bounds[0]; f++) {
                if (i < num) {
                    dummyArr.push(0);
                }
                else {
                    dummyArr.push(latticeArray[i - num][f]);
                }
            }
            newLat[i] = dummyArr;
        }
        latticeArray = newLat;
        bounds[1] = bounds[1] + num;
        visBounds[1] = visBounds[1] + num;
        visBounds[3] = visBounds[3] + num;
    }
    else if (direction == 's') {
        newLat = new Array(new Array());
        for (let i = 0; i < (bounds[1] + num); i++) {
            let dummyArr = new Array();
            for (let f = 0; f < bounds[0]; f++) {
                if (i < bounds[1]) {
                    dummyArr.push(latticeArray[i][f]);
                }
                else {
                    dummyArr.push(0);
                }
            }
            newLat[i] = dummyArr;
        }
        latticeArray = newLat;
        bounds[1] = bounds[1] + num;
    }
    else if (direction == 'w') {
        newLat = new Array(new Array());
        for (let i = 0; i < (bounds[1]); i++) {
            let dummyArr = new Array();
            for (let f = 0; f < bounds[0] + num; f++) {
                if (f < num) {
                    dummyArr.push(0);
                }
                else {
                    dummyArr.push(latticeArray[i][f - num]);
                }
            }
            newLat[i] = dummyArr;
        }
        latticeArray = newLat;
        bounds[0] = bounds[0] + num;
        visBounds[0] = visBounds[0] + num;
        visBounds[2] = visBounds[2] + num;
    }
    else if (direction == 'e') {
        newLat = new Array(new Array());
        for (let i = 0; i < (bounds[1]); i++) {
            let dummyArr = new Array();
            for (let f = 0; f < bounds[0] + num; f++) {
                if (f < bounds[0]) {
                    dummyArr.push(latticeArray[i][f]);
                }
                else {
                    dummyArr.push(0);
                }
            }
            newLat[i] = dummyArr;
        }
        latticeArray = newLat;
        bounds[0] = bounds[0] + num;
    }
}

//This function updates the lattice array for each timestep.
export function iterate() {
    let newLat = new Array(new Array());
    for (let i = 0; i < bounds[1]; i++) {
        let dummyArr = new Array();
        for (let f = 0; f < bounds[0]; f++) {
            let currentState = latticeArray[i][f];
            let numNeighbors = livingNeighbors(f, i);
            /*
            if (currentState == 0) {
                if (numNeighbors == 3) {
                    dummyArr.push(1);
                }
                else {
                    dummyArr.push(0);
                }
            }
            else {
                if (numNeighbors == 2 || numNeighbors == 3) {
                    dummyArr.push(1);
                }
                else {
                    dummyArr.push(0);
                }
            }
            */
        }
        newLat[i] = dummyArr;
    }
    latticeArray = newLat;
    return latticeArray;
}

import {cell} from "./cellClass.js"

let bounds = new Array(500, 500);
let visBounds = new Array(0, 0, 500, 500);
let visLatticeArray = new Array(new Array());
let latticeArray = new Array(new Array());
let cellSize = 30;
let numIt = 500;

createInit();
createVis();
//Draw intial visual of lattice here. Might want everything after this comment to be triggered by a button.
let currentBoundaryPush = new Array();
for (let i = 0; i < numIt; i++) {
    console.log(i)
    iterate();
    currentBoundaryPush = borderContact();
    for (let f = 0; f < currentBoundaryPush.length; f++) {
        expandBorder(currentBoundaryPush[f], (bounds[0] / 2));
    }
    createVis();
    //Redraw visual of lattice here
}