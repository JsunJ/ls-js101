const readline = require('readline-sync');
const VALID_CHOICES = ['r', 'p', 'sci', 'spo', 'l'];
const FULL_CHOICES = {
  r:    'Rock',
  p:    'Paper',
  sci:  'Scissors',
  spo:  'Spock',
  l:    'Lizard'
};
const WINNING_COMBOS = {
  r:    ['sci', 'l'],
  p:    ['r',     'spo'],
  sci:  ['p',    'l'],
  spo:  ['r',     'sci'],
  l:    ['p',    'spo']
};
const MAXIMUM_SCORE = 5;

let playerScore = 0;
let computerScore = 0;

let playerChoice;
let computerChoice;

function prompt(message) {
  console.log(`=> ${message}`);
}

function getPlayerChoice() {
  prompt(`Choose one: ${VALID_CHOICES.join(', ')}`);
  let userChoice = readline.question().toLowerCase();

  while (!VALID_CHOICES.includes(userChoice)) {
    prompt('That is not a valid choice.');
    userChoice = readline.question().toLowerCase();
  }
  return userChoice;
}

function getComputerChoice() {
  let randomIndex = Math.floor(Math.random() * VALID_CHOICES.length);
  let computerChoice = VALID_CHOICES[randomIndex];
  return computerChoice;
}

function playerWins(playerChoice, computerChoice) {
  return WINNING_COMBOS[playerChoice].includes(computerChoice);
}

function computerWins(computerChoice, playerChoice) {
  return WINNING_COMBOS[computerChoice].includes(playerChoice);
}

function tallyScore(playerChoice, computerChoice) {
  if (playerWins(playerChoice, computerChoice)) {
    playerScore += 1;
  } else if (computerWins(computerChoice, playerChoice)) {
    computerScore += 1;
  }
}

function displayRoundWinner(userChoice, computerChoice) {
  prompt(`You chose ${FULL_CHOICES[userChoice]}.`);
  prompt(`The computer chose ${FULL_CHOICES[computerChoice]}.`);

  if (playerWins(userChoice, computerChoice)) {
    prompt('You win this round!');
  } else if (userChoice === computerChoice) {
    prompt("It's a tie!");
  } else {
    prompt("Computer wins this round!");
  }
}

function displayCurrentScores() {
  prompt(`Player score = ${playerScore}. | Computer score = ${computerScore}.`);
}

function displayMatchResult() {

  if (playerScore === MAXIMUM_SCORE) {
    prompt(`You won the match!`);
  } else if (computerScore === MAXIMUM_SCORE) {
    prompt(`Computer won the match!`);
  }
}

function repeatRound() {
  runGameLoop();
}

function repeatGame() {
  prompt('Would you like to play again? (Y / N)');
  let answer = readline.question().toLowerCase();

  while (answer !== 'y' && answer !== 'n') {
    prompt("Please enter 'y' or 'n'.");
    answer = readline.question().toLowerCase();
  }

  if (answer === 'y') {
    console.clear();
    playerScore = 0;
    computerScore = 0;
    runGameLoop();
  } else {
    prompt('Thank you for playing! Now exiting.');
  }
}

function runGameLoop() {
  playerChoice = getPlayerChoice();
  computerChoice = getComputerChoice();

  displayRoundWinner(playerChoice, computerChoice);
  tallyScore(playerChoice, computerChoice);
  displayCurrentScores();

  if (playerScore === MAXIMUM_SCORE || computerScore === MAXIMUM_SCORE) {
    displayMatchResult();
    repeatGame();
    return;
  }

  repeatRound();
}

prompt('Welcome to Rock Paper Scissors Spock Lizard (RPSSL)!');
prompt('The first to 5 wins!');
runGameLoop();