const readline = require('readline-sync');

const INITIAL_MARKER = ' ';
const HUMAN_MARKER = 'X';
const COMPUTER_MARKER = 'O';

const WINNING_SCORE = 5;
const WINNING_LINES = [
  [1, 2, 3], [4, 5, 6], [7, 8, 9], // rows
  [1, 4, 7], [2, 5, 8], [3, 6, 9], // columns
  [1, 5, 9], [3, 5, 7] // diagonals
];

function prompt(msg) {
  console.log(`=> ${msg}`);
}

function initializeScores() {
  let scores = {};

  scores['Player'] = 0;
  scores['Computer'] = 0;

  return scores;
}

function initializeBoard() {
  let board = {};

  for (let square = 1; square <= 9; square += 1) {
    board[String(square)] = INITIAL_MARKER;
  }

  return board;
}

function displayScores(scores) {
  console.clear();

  console.log(`The first to 5 wins the match!\nPlayer Score: ${scores['Player']} | Computer Score: ${scores['Computer']}`);
}

function displayBoard(board) {
  console.log(`\nYou are ${HUMAN_MARKER}. Computer is ${COMPUTER_MARKER}.`);

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

function joinOr(arr, delimiter = ', ', joinWord = 'or') {
  switch (arr.length) {
    case 0: return '';
    case 1: return String(arr[0]);
    case 2: return arr.join(` ${joinWord} `);
    default: return arr.slice(0, arr.length - 1).join(delimiter) +
                    `${delimiter}${joinWord} ${arr[arr.length - 1]}`;
  }
}

function playerChoosesSquare(board) {
  let chosenSquare;

  while (true) {
    prompt(`Choose a square: ${joinOr(emptySquares(board))}:`);
    chosenSquare = readline.question().trim();
    if (emptySquares(board).includes(chosenSquare)) break;

    prompt('That is not a valid choice.');
  }

  board[chosenSquare] = HUMAN_MARKER;
}

function emptySquares(board) {
  return Object.keys(board).filter(key => board[key] === INITIAL_MARKER);
}

function findImmediateThreatSquare(line, board) {
  let markersInLine = line.map(square => board[square]);

  if (markersInLine.filter(marker => marker === HUMAN_MARKER).length === 2) { // if 2 human markers exist in a winning line
    let markerInQuestion = markersInLine.filter(marker =>
      marker !== HUMAN_MARKER)[0]; // the differing marker in the winning line
    let squareInQuestion = line.find(square =>
      board[square] === markerInQuestion); // the board square of the differing marker

    if (markerInQuestion === INITIAL_MARKER) {
      return squareInQuestion;
    }
  }

  return null;
}

function findImmediateWinSquare(line, board) {
  let markersInLine = line.map(square => board[square]);

  if (markersInLine.filter(marker => marker === COMPUTER_MARKER).length === 2) { // if 2 computer markers exist in a winning line
    let markerInQuestion = markersInLine.filter(marker =>
      marker !== COMPUTER_MARKER)[0]; // the differing marker in the winning line
    let squareInQuestion = line.find(square =>
      board[square] === markerInQuestion); // the board square of the differing marker

    if (markerInQuestion === INITIAL_MARKER) {
      return squareInQuestion;
    }
  }

  return null;
}

function chooseOffensively(board) {
  let square;

  for (let index = 0; index < WINNING_LINES.length; index += 1) {
    let line = WINNING_LINES[index];
    square = findImmediateWinSquare(line, board);
    if (square) break;
  }
  return square;
}

function chooseDefensively(board) {
  let square;

  for (let index = 0; index < WINNING_LINES.length; index += 1) {
    let line = WINNING_LINES[index];
    square = findImmediateThreatSquare(line, board);
    if (square) break;
  }
  return square;
}

function chooseRandomly(board) {
  let square;

  let randomIndex = Math.floor(Math.random() * emptySquares(board).length);
  square = emptySquares(board)[randomIndex];
  return square;
}

function computerChoosesSquare(board) {
  let chosenSquare;

  chosenSquare = chooseOffensively(board);

  if (chosenSquare) {
    board[chosenSquare] = COMPUTER_MARKER;
    return; // stop function execution after a valid offensive choice
  }

  chosenSquare = chooseDefensively(board);

  if (chosenSquare) {
    board[chosenSquare] = COMPUTER_MARKER;
    return; // stop function execution after a valid defensive choice
  }

  // chooseMiddleSquare()
  //
  //
  //

  chosenSquare = chooseRandomly(board);
  board[chosenSquare] = COMPUTER_MARKER;
}

function detectRoundWinner(board) {

  for (let line = 0; line < WINNING_LINES.length; line += 1) {
    let [ sq1, sq2, sq3 ] = WINNING_LINES[line];

    if (board[sq1] === HUMAN_MARKER &&
        board[sq2] === HUMAN_MARKER &&
        board[sq3] === HUMAN_MARKER) {
      return 'Player';
    } else if (board[sq1] === COMPUTER_MARKER &&
               board[sq2] === COMPUTER_MARKER &&
               board[sq3] === COMPUTER_MARKER) {
      return 'Computer';
    }
  }

  return null;
}

function someoneWonRound(board) {
  return detectRoundWinner(board);
}

function boardFull(board) {
  return emptySquares(board).length === 0;
}

function detectMatchWinner(scores) {
  if (scores['Player'] === WINNING_SCORE) {
    return 'Player';
  } else if (scores['Computer'] === WINNING_SCORE) {
    return 'Computer';
  }
  return null;
}

function someoneWonMatch(scores) {
  return detectMatchWinner(scores);
}

while (true) { // Match loop
  let scores = initializeScores();

  while (true) { // Round loop
    let board = initializeBoard();

    while (true) { // Square choice loop
      displayScores(scores);
      displayBoard(board);

      playerChoosesSquare(board);
      if (someoneWonRound(board) || boardFull(board)) break;

      computerChoosesSquare(board);
      if (someoneWonRound(board) || boardFull(board)) break;
    } // end of Square choice loop

    displayScores(scores);
    displayBoard(board);

    if (someoneWonRound(board)) {

      switch (detectRoundWinner(board)) {
        case 'Player':
          scores['Player'] += 1;
          break;
        case 'Computer':
          scores['Computer'] += 1;
          break;
        default: break;
      }

      prompt(`${detectRoundWinner(board)} won this round!\n`);
    } else {
      prompt("It's a tie!\n"); // board is full
    }

    if (someoneWonMatch(scores)) {
      break; // out of the round loop
    }

    prompt(`Enter 'C' to continue.`); // a pause for the player to examine the round before the next one starts
    let response = readline.question().toLowerCase();
    while (response !== 'c') {
      prompt(`Please enter 'C' to continue the match.`);
      response = readline.question().toLowerCase();
    }
  } // end of Round loop

  prompt(`${detectMatchWinner(scores)} wins the match!`);
  prompt(`Final Scores = Player: ${scores['Player']} | Computer: ${scores['Computer']}\n`);

  prompt('Would you like to play again? Y/N');
  let answer = readline.question().toLowerCase();
  while (answer !== 'y' && answer !== 'n') {
    prompt(`Please enter 'Y' to play another match or 'N' to exit.`);
    answer = readline.question().toLowerCase();
  }

  if (answer !== 'y') break;
} // end of Match loop

prompt('Thank you for playing Tic Tac Toe!');