'use strict';

import { select, selectAll, listen, create } from  './util.js';

const resetBtn = select('.reset');
const boxes = selectAll('.box');
const arrays = Array(9).fill(0);
const board = select('.board');
let playerX = true;

function init() {
  for (let [index, arr] of arrays.entries()){
    const boxArr = create('div');
    boxArr.classList.add('box');
    boxArr.setAttribute('data', index);
    if (index === 1) boxArr.classList.add('box-top-center');
    if (index === 3) boxArr.classList.add('box-middle-left');
    if (index === 4) boxArr.classList.add('box-middle-center');
    if (index === 5) boxArr.classList.add('box-middle-right');
    if (index === 7) boxArr.classList.add('box-down-center');

    listen('click', boxArr, () => {
      console.log(`PlayerX=${playerX}`);
      if (boxArr.innerText === '') {
        if (playerX) {
          boxArr.innerText = 'X';
        } else {
          boxArr.innerText = 'O';
        }
        playerX = !playerX;
        console.log(`PlayerX=${playerX}`);
      }
    });
    board.appendChild(boxArr);
  }
}

listen('click', resetBtn, () => {
  console.log('Reset btn clicked');
});

listen('load', window, () => {
  init();
});
