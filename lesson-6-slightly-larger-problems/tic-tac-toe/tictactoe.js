const readline = require('readline-sync');

const INITIAL_MARKER = ' ';
const HUMAN_MARKER = 'X';
const COMPUTER_MARKER = 'O';

const WINNING_SCORE = 5;

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

function emptySquares(board) {
  return Object.keys(board).filter(key => board[key] === INITIAL_MARKER);
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

function computerChoosesSquare(board) {
  let randomIndex = Math.floor(Math.random() * emptySquares(board).length);
  let chosenSquare = emptySquares(board)[randomIndex];

  board[chosenSquare] = COMPUTER_MARKER;
}

function detectRoundWinner(board) {
  let winningLines = [
    [1, 2, 3], [4, 5, 6], [7, 8, 9],
    [1, 4, 7], [2, 5, 8], [3, 6, 9],
    [1, 5, 9], [3, 5, 7]
  ];

  for (let line = 0; line < winningLines.length; line += 1) {
    let [ sq1, sq2, sq3 ] = winningLines[line];

    if (
      board[sq1] === HUMAN_MARKER &&
      board[sq2] === HUMAN_MARKER &&
      board[sq3] === HUMAN_MARKER
    ) {
      return 'Player';
    } else if (
      board[sq1] === COMPUTER_MARKER &&
      board[sq2] === COMPUTER_MARKER &&
      board[sq3] === COMPUTER_MARKER
    ) {
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

      prompt(`${detectRoundWinner(board)} won this round!`);
    } else {
      prompt("It's a tie!");
    }

    if (someoneWonMatch(scores)) {
      break;
    }

    prompt(`Enter 'C' to continue.`);
    let response = readline.question().toLowerCase();
    while (response !== 'c') {
      prompt(`Please enter 'C' to continue the match.`);
      response = readline.question().toLowerCase();
    }
  } // end of Round loop

  prompt(`${detectMatchWinner(scores)} wins the match!`);
  prompt(`Final Scores = Player: ${scores['Player']} | Computer: ${scores['Computer']}`);

  prompt('\nWould you like to play again? Y/N');
  let answer = readline.question().toLowerCase();
  while (answer !== 'y' && answer !== 'n') {
    prompt(`Please enter 'Y' to play another match or 'N' to exit.`);
    answer = readline.question().toLowerCase();
  }

  if (answer !== 'y') break;
} // end of Match loop

prompt('Thank you for playing Tic Tac Toe!');