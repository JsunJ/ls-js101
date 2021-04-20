const readline = require('readline-sync');
const VALID_CHOICES = {
  r:    'Rock',
  p:    'Paper',
  sci:  'Scissors',
  spo:  'Spock',
  l:    'Lizard'
};
const WINNING_COMBOS = {
  r:    ['sci', 'l'],
  p:    ['r',   'spo'],
  sci:  ['p',   'l'],
  spo:  ['r',   'sci'],
  l:    ['p',   'spo']
};
const MAXIMUM_SCORE = 5;

let scores = {
  player: 0,
  computer: 0
};

let choices = {
  player: '',
  computer: ''
};

let roundNumber = 1;

function prompt(message) {
  console.log(`=> ${message}`);
}

function getPlayerChoice() {
  prompt(`Choose one: ${Object.keys(VALID_CHOICES).join(', ')}`);
  let choice = readline.question().toLowerCase();

  while (!Object.keys(VALID_CHOICES).includes(choice)) {
    prompt('That is not a valid choice.');
    choice = readline.question().toLowerCase();
  }
  return choice;
}

function getComputerChoice() {
  let randomIndex = Math.floor(Math.random() *
                              Object.keys(VALID_CHOICES).length);
  let choice = Object.keys(VALID_CHOICES)[randomIndex];
  return choice;
}

function playerWins(choices) {
  return WINNING_COMBOS[choices.player].includes(choices.computer);
}

function computerWins(choices) {
  return WINNING_COMBOS[choices.computer].includes(choices.player);
}

function tallyScore(choices, scores) {
  if (playerWins(choices)) {
    scores.player += 1;
  } else if (computerWins(choices)) {
    scores.computer += 1;
  }
}

function incrementRound() {
  roundNumber += 1;
}

function displayRoundWinner() {
  prompt(`You chose ${VALID_CHOICES[choices.player]}.`);
  prompt(`The computer chose ${VALID_CHOICES[choices.computer]}.`);

  if (playerWins(choices)) {
    prompt('You win this round!');
  } else if (choices.player === choices.computer) {
    prompt("It's a tie!");
  } else {
    prompt("Computer wins this round!");
  }
}

function displayCurrentRound() {
  prompt(`Round ${roundNumber}!`);
}

function displayCurrentScores() {
  prompt(`Player score = ${scores.player}. | Computer score = ${scores.computer}.`);
}

function displayMatchResult() {
  displayCurrentScores();

  if (scores.player === MAXIMUM_SCORE) {
    prompt(`You won the match!`);
  } else if (scores.computer === MAXIMUM_SCORE) {
    prompt(`Computer won the match!`);
  }
}

function newRound() {
  console.clear();
  runGameLoop(choices);
}

function resetScores(scores) {
  scores.player = 0;
  scores.computer = 0;
}

function resetRoundCount() {
  roundNumber = 1;
}

function newMatch() {
  prompt('Would you like to play another match? (Y / N)');
  let answer = readline.question().toLowerCase();

  while (answer !== 'y' && answer !== 'n') {
    prompt("Please enter 'y' or 'n'.");
    answer = readline.question().toLowerCase();
  }

  if (answer === 'y') {
    console.clear();
    resetScores(scores);
    resetRoundCount();
    runGameLoop(choices);
  } else {
    prompt('Thank you for playing! Exiting RPSSL.');
  }
}

function runGameLoop(choices) {
  displayCurrentRound();
  displayCurrentScores();

  choices.player = getPlayerChoice();
  choices.computer = getComputerChoice();

  displayRoundWinner(choices);
  tallyScore(choices, scores);
  incrementRound();

  if (scores.player === MAXIMUM_SCORE || scores.computer === MAXIMUM_SCORE) {
    displayMatchResult();
    newMatch();
    return;
  }

  setTimeout(function() {
    newRound();
  }, 2000);
}

prompt('Welcome to Rock Paper Scissors Spock Lizard (RPSSL)!');
prompt('You will be playing against the computer. The first to 5 score wins the match!');
runGameLoop(choices);