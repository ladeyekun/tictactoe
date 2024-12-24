'use strict';

import { select, selectAll, listen, create } from  './util.js';

const resetBtn = select('.reset');
//const boxes = selectAll('.box');
const arrays = Array(9).fill(0);
const board = select('.board');
const info = select('.info p');

let isWinning = false
let playerX = true; //Player X to play when true
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

const isTie = () => {
  return arrays.every((value) => value === 'X' || value === 'O');
}

function init() {
  board.innerHTML = '';
  arrays.fill(0);
  for (let index of arrays.keys()){
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
  info.innerText = `Game Started, Player ${getCurrentPlayer()} to play`;
  initiateBoardListeners();
}

function checkWin() {
  for (const combination of winCombinations){
    let [a, b, c] = combination;
    let XO = getCurrentPlayer();
    isWinning = combination.every((value) => arrays[value] === XO);

    if (isWinning) {
      completed = true;
      const boxes = getBoxes();
      boxes[a].classList.add('win');
      boxes[b].classList.add('win');
      boxes[c].classList.add('win');
      info.innerText = `Game over! Player ${getCurrentPlayer()} wins`;
      break;
    }
  }
}

/*
function checkTie() {
  return arrays.every((value) => value === 'X' || value === 'O');
}
  */

function displayInfo() {
  playerX = !playerX;
  info.innerText = `Player ${getCurrentPlayer()} to play`;
}

function reset() {
  playerX = true;
  isWinning = false;
  completed = false;
  arrays.fill(0);
  init();
}

function getCurrentPlayer() {
  return playerX ? 'X' : 'O';
}

function initiateBoardListeners() {
  const boxes = getBoxes();
  boxes.forEach(element => {
    listen('click', element, () => {
      if (!completed) {
        let key = element.getAttribute('data');
        if (arrays[key] === 0) {
          element.innerText = getCurrentPlayer();
          arrays[key] = getCurrentPlayer();
          checkWin();
          if (isWinning) {
            info.innerText = `Game over! Player ${getCurrentPlayer()} wins`;
            return;
          }
          if (isTie()) {
            info.innerText = `Game tied! Click board to continue`;
            return;
          }          
          displayInfo();
        }
        if (isTie()) {
          init();
          displayInfo();
          return;
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
