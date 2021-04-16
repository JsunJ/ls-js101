const readline = require('readline-sync');
const VALID_CHOICES = ['rock', 'paper', 'scissors'];

function prompt(message) {
  console.log(`=> ${message}`);
}

function getUserChoice() {
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

function displayWinner() {
  let userChoice = getUserChoice();
  let computerChoice = getComputerChoice();

  prompt(`You chose ${userChoice}.`);
  prompt(`Computer chose ${computerChoice}.`);

  if ((userChoice === 'rock' && computerChoice === 'scissors') ||
      (userChoice === 'scissors' && computerChoice === 'paper') ||
      (userChoice === 'paper' && computerChoice === 'rock')) {
    prompt('You win!');
  } else if ((userChoice === 'scissors' && computerChoice === 'rock') ||
              (userChoice === 'paper' && computerChoice === 'scissors') ||
              (userChoice === 'rock' && computerChoice === 'paper')) {
    prompt('Computer wins!');
  } else {
    prompt("It's a tie!");
  }
}

function repeat() {
  prompt('Would you like to play again? (Y / N)');
  let answer = readline.question().toLowerCase();

  while (answer !== 'y' && answer !== 'n') {
    prompt("Please enter 'y' or 'n'.");
    answer = readline.question().toLowerCase();
  }

  if (answer === 'y') {
    console.clear();
    runGame();
  } else {
    prompt('Exiting game.');
  }
}

function runGame() {
  displayWinner();
  repeat();
}

prompt('Welcome to Rock Paper Scissors!');
runGame();