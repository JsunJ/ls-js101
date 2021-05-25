const readline = require('readline-sync');
const INITIAL_MARKER = ' ';
const HUMAN_MARKER = 'X';
const COMPUTER_MARKER = 'O';

function prompt(msg) {
  console.log(`=> ${msg}`);
}

function initializeBoard() {
  let board = {};

  for (let square = 1; square <= 9; square += 1) {
    board[String(square)] = INITIAL_MARKER;
  }

  return board;
}

function displayBoard(board) {
  console.clear();

  console.log('');
  console.log(`     |     |`);
  console.log(`  ${board['1']}  |  ${board['2']}  |  ${board['3']}`);
  console.log(`     |     |`);
  console.log(`-----+-----+-----`);
  console.log(`     |     |`);
  console.log(`  ${board['4']}  |  ${board['5']}  |  ${board['6']}`);
  console.log(`     |     |`);
  console.log(`-----+-----+-----`);
  console.log(`     |     |`);
  console.log(`  ${board['7']}  |  ${board['8']}  |  ${board['9']}`);
  console.log(`     |     |`);
  console.log('');
}

function emptySquares(board) {
  return Object.keys(board).filter(key => board[key] === INITIAL_MARKER);
}

function boardFull(board) {
  return emptySquares(board).length === 0;
}

function winCondition(board) {
  return false;
}

function playerChoosesSquare(board) {
  let chosenSquare;

  while (true) {
    prompt(`Choose a square: ${emptySquares(board).join(', ')}:`);
    chosenSquare = readline.question().trim();
    if (emptySquares(board).includes(chosenSquare)) break;
    
    prompt('That is not a valid choice.');
  }

  board[chosenSquare] = HUMAN_MARKER;
}

function computerChoosesSquare(board) {
  let randomIndex = Math.floor(Math.random() * emptySquares(board).length);
  let chosenSquare = emptySquares(board)[randomIndex];

  board[chosenSquare] = COMPUTER_MARKER;
}

let board = initializeBoard();
displayBoard(board);

while (true) {

  playerChoosesSquare(board);
  computerChoosesSquare(board);
  displayBoard(board);

  if (winCondition(board) || boardFull(board)) break;
}