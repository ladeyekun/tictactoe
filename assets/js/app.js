'use strict';

import { select, selectAll, listen, create } from  './util.js';

const resetBtn = select('.reset');
//const boxes = selectAll('.box');
const arrays = Array(9).fill(0);
const board = select('.board');
const info = select('.info p');
let playerX = false;
let completed = false;
const winCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function init() {
  board.innerHTML = '';
  for (let [index, arr] of arrays.entries()){
    const boxArr = create('div');
    boxArr.classList.add('box');
    boxArr.setAttribute('data', index);
    if (index === 1) boxArr.classList.add('box-top-center');
    if (index === 3) boxArr.classList.add('box-middle-left');
    if (index === 4) boxArr.classList.add('box-middle-center');
    if (index === 5) boxArr.classList.add('box-middle-right');
    if (index === 7) boxArr.classList.add('box-down-center');

    board.appendChild(boxArr);
  }
  boxesListerners();
  displayInfo();
}

const equalPlayer = (currentValue) => currentValue === getCurrentPlayer();

function checkWin() {
  for (const combination of winCombinations){
    //console.log(combination);
    //isWinning = combination.every(equalPlayer);
    let XO = getCurrentPlayer();
    let [a, b, c] = combination;
    let isWinning = arrays[a] === XO && arrays[b] === XO && arrays[c] === XO;
    //console.log(isWinning + ' - ' + getCurrentPlayer());
    if (isWinning) {
      completed = true;
      const boxes = getBoxes();
      boxes[a].classList.add('win');
      boxes[b].classList.add('win');
      boxes[c].classList.add('win');
      //console.log(`Winning combination matched. The winning combination is ${combination}`);
      return true;
    }
  }
  return false;
}

function checkTie() {
  return arrays.every((value) => value === 'X' || value === 'O');
}

function displayInfo() {
  if (checkWin()) {
    info.innerText = `Player ${getCurrentPlayer()} wins`;
    return;
  } 

  if (checkTie()) {
    info.innerText = `Game tied`;
    return;
  }

  playerX = !playerX;
  info.innerText = `Player ${getCurrentPlayer()} to play`;
}

function reset() {
  playerX = false;
  completed = false;
  arrays.fill(0);
  init();
}

function getCurrentPlayer() {
  return playerX ? 'X' : 'O';
}

function boxesListerners() {
  const boxes = getBoxes();
  boxes.forEach(element => {
    listen('click', element, () => {
      if (!completed) {
        let key = element.getAttribute('data');
        if (arrays[key] === 0) {
          element.innerText = getCurrentPlayer();
          arrays[key] = getCurrentPlayer();
          displayInfo();
        }  
      }
    });
  });
}

function getBoxes() {
  return selectAll('.box');
}

listen('click', resetBtn, reset);

listen('load', window, () => {
  init();
});
