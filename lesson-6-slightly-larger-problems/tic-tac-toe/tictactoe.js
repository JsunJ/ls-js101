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

const FIRST_MOVE = 'computer'; // valid settings : 'player', 'computer' or 'choose'
const ALTERNATE_FIRST_MOVE_BY_ROUND = 'yes'; // valid settings : 'yes' or 'no'

const MIDDLE_SQUARE = 5;

function prompt(msg) {
  console.log(`=> ${msg}`);
}

function displayIntroduction() {
  console.log('Welcome to Tic Tac Toe!\n');
  console.log(`     |     |`);
  console.log(`  X  |  O  |  X`);
  console.log(`     |     |`);
  console.log(`-----+-----+-----`);
  console.log(`     |     |`);
  console.log(`  O  |  X  |  O`);
  console.log(`     |     |`);
  console.log(`-----+-----+-----`);
  console.log(`     |     |`);
  console.log(`  X  |  O  |  X`);
  console.log(`     |     |`);
  console.log(`\n~RULES~\n * You will be playing against a computer. *\n * The first to win ${WINNING_SCORE} rounds will win the match. *`);
}

function displaySettings() {
  console.log('\n~SETTINGS~');

  if (FIRST_MOVE !== 'choose' && ALTERNATE_FIRST_MOVE_BY_ROUND === 'yes') {
    console.log(` % The ${FIRST_MOVE} has the first move of the match. %`);
    console.log(' % First moves will alternate every round. %\n');
  } else if (FIRST_MOVE !== 'choose' && ALTERNATE_FIRST_MOVE_BY_ROUND === 'no') {
    console.log(` % The ${FIRST_MOVE} has the first move. %\n`);
  } else if (ALTERNATE_FIRST_MOVE_BY_ROUND === 'yes') {
    console.log(' % First moves will alternate every round. %\n');
  }
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
  console.log(`The first to ${WINNING_SCORE} wins the match!\nPlayer Score: ${scores['Player']} | Computer Score: ${scores['Computer']}`);
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

function chooseFirstMover() {
  prompt('Who would you like to have the first move?');
  prompt("Enter 'P' for Player or 'C' for Computer");
  let firstMover = readline.question().toLowerCase();
  while (firstMover !== 'p' && firstMover !== 'c') {
    prompt(`Please enter 'P' for Player or 'C' for Computer to determine who moves first.`);
    firstMover = readline.question().toLowerCase();
  }
  if (firstMover === 'p') {
    console.log(` % The player has the first move. %\n`);
    return 'player';
  } else {
    console.log(` % The computer has the first move. %\n`);
    return 'computer';
  }
}

function determineCurrentPlayer() {
  let currentPlayer;

  switch (FIRST_MOVE) {
    case 'player':
      currentPlayer = 'player';
      break;
    case 'computer':
      currentPlayer = 'computer';
      break;
    case 'choose':
      currentPlayer = chooseFirstMover();
  }

  return currentPlayer;
}

function alternatePlayer(currentPlayer) {
  let newPlayer;

  switch (currentPlayer) {
    case 'player':
      newPlayer = 'computer';
      break;
    case 'computer':
      newPlayer = 'player';
  }
  return newPlayer;
}

function promptToStart() {
  prompt(`Enter 'S' to start.`);
  let response = readline.question().toLowerCase();
  while (response !== 's') {
    prompt(`Please enter 'S' to start the match.`);
    response = readline.question().toLowerCase();
  }
}

function promptToContinue() {
  prompt(`Enter 'C' to continue.`);
  let response = readline.question().toLowerCase();
  while (response !== 'c') {
    prompt(`Please enter 'C' to continue the match.`);
    response = readline.question().toLowerCase();
  }
}

function promptToRestart() {
  prompt('Would you like to restart the game? Y/N');
  let answer = readline.question().toLowerCase();
  while (answer !== 'y' && answer !== 'n') {
    prompt(`Please enter 'Y' to play another match or 'N' to exit.`);
    answer = readline.question().toLowerCase();
  }
  return answer;
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

function emptySquares(board) {
  return Object.keys(board).filter(key => board[key] === INITIAL_MARKER);
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

function findImmediateThreatSquare(line, board) {
  let markersInLine = line.map(square => board[square]);

  if (markersInLine.filter(marker => marker === HUMAN_MARKER).length === 2) {
    let markerInQuestion = markersInLine.filter(marker =>
      marker !== HUMAN_MARKER)[0];
    let squareInQuestion = line.find(square =>
      board[square] === markerInQuestion);

    if (markerInQuestion === INITIAL_MARKER) {
      return squareInQuestion;
    }
  }

  return null;
}

function findImmediateWinSquare(line, board) {
  let markersInLine = line.map(square => board[square]);

  if (markersInLine.filter(marker => marker === COMPUTER_MARKER).length === 2) {
    let markerInQuestion = markersInLine.filter(marker =>
      marker !== COMPUTER_MARKER)[0];
    let squareInQuestion = line.find(square =>
      board[square] === markerInQuestion);

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

  if (!chosenSquare) {
    chosenSquare = chooseDefensively(board);
  }

  if (!chosenSquare && board[MIDDLE_SQUARE] === INITIAL_MARKER) {
    chosenSquare = board[MIDDLE_SQUARE];
  }

  if (!chosenSquare) {
    chosenSquare = chooseRandomly(board);
  }

  board[chosenSquare] = COMPUTER_MARKER;
}

function chooseSquare(board, currentPlayer) {
  if (currentPlayer === 'player') {
    return playerChoosesSquare(board);
  } else {
    return computerChoosesSquare(board);
  }
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

function tallyScore(scores, board) {
  switch (detectRoundWinner(board)) {
    case 'Player':
      scores['Player'] += 1;
      break;
    case 'Computer':
      scores['Computer'] += 1;
      break;
    default: break;
  }
}

function pickSquares(scores, board, currentPlayer) {
  while (true) {
    displayScores(scores);
    displayBoard(board);

    chooseSquare(board, currentPlayer);
    currentPlayer = alternatePlayer(currentPlayer);

    if (someoneWonRound(board) || boardFull(board)) break;
  }
}

function playRounds(scores, currentPlayer) {
  while (true) {
    let board = initializeBoard();

    pickSquares(scores, board, currentPlayer);

    if (ALTERNATE_FIRST_MOVE_BY_ROUND === 'yes') currentPlayer = alternatePlayer(currentPlayer);

    displayScores(scores);
    displayBoard(board);

    if (someoneWonRound(board)) {
      tallyScore(scores, board);
      prompt(`${detectRoundWinner(board)} won this round!\n`);
    } else {
      prompt("It's a tie!\n");
    }

    if (someoneWonMatch(scores)) {
      break;
    }

    promptToContinue();
  }
}

while (true) { // GAME LOOP START
  displayIntroduction();
  displaySettings();

  let scores = initializeScores();
  let currentPlayer = determineCurrentPlayer();

  promptToStart();

  playRounds(scores, currentPlayer);

  prompt(`${detectMatchWinner(scores)} wins the match!`);
  prompt(`Final Scores = Player: ${scores['Player']} | Computer: ${scores['Computer']}\n`);

  if (promptToRestart() !== 'y') break;

  console.clear();
} // GAME LOOP END

prompt('Thank you for playing Tic Tac Toe!');