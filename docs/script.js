const board = document.querySelector('.board');
const cells = document.querySelectorAll('.cell');
const message = document.querySelector('.message');
const resetButton = document.getElementById('resetButton');
let currentPlayer = 'o'; // 先攻を'o'に変更
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let xMarks = [];
let oMarks = [];
let gameActive = true;

const winningConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

const handleCellClick = (e) => {
  const index = parseInt(e.target.dataset.index);
  if (gameBoard[index] === '' && gameActive) {
    gameBoard[index] = currentPlayer;
    const markElement = document.createElement('span');
    markElement.textContent = currentPlayer === 'o' ? '遼馬' : '翔馬'; //変更
    markElement.classList.add(currentPlayer);
    e.target.appendChild(markElement);

    if (currentPlayer === 'x') xMarks.push(index);
    else oMarks.push(index);

    if (xMarks.length > 3 || oMarks.length > 3) {
      removeOldestMark();
    }
    if (xMarks.length === 3 && currentPlayer === 'x') fadeOldestMark('x');
    if (oMarks.length === 3 && currentPlayer === 'o') fadeOldestMark('o');

    if (checkWin()) {
      message.textContent = `${currentPlayer === 'o' ? '遼馬' : '翔馬'}の勝ち！`; //変更
      gameActive = false;
    } else if (checkDraw()) {
      message.textContent = '引き分け！';
      gameActive = false;
    } else {
      currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
    }
  }
};

const removeOldestMark = () => {
  let removeIndex;
  if (currentPlayer === 'x' && xMarks.length > 3) {
    removeIndex = xMarks.shift();
  } else if (currentPlayer === 'o' && oMarks.length > 3) {
    removeIndex = oMarks.shift();
  }
  const cellToRemove = document.querySelector(`.cell[data-index="${removeIndex}"]`);
  cellToRemove.innerHTML = '';
  gameBoard[removeIndex] = '';
};

const fadeOldestMark = (player) => {
  let oldestIndex;
  if (player === 'x') oldestIndex = xMarks[0];
  else oldestIndex = oMarks[0];
  const cellToFade = document.querySelector(`.cell[data-index="${oldestIndex}"]`).querySelector(`.${player}`);
  cellToFade.classList.add('faded');
};


const checkWin = () => {
  return winningConditions.some(condition => {
    return condition.every(index => {
      return gameBoard[index] === currentPlayer;
    });
  });
};

const checkDraw = () => {
  return gameBoard.every(cell => cell !== '');
};

const resetGame = () => {
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  xMarks = [];
  oMarks = [];
  gameActive = true;
  currentPlayer = 'o'; // 先攻を'o'に変更
  message.textContent = '';
  cells.forEach(cell => {
    cell.innerHTML = '';
  });
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);