// Ask the user for their preferred language.
// Check to see if the input is a valid language option.
// Ask the user for the first number.
// Check to see if the input is a valid number.
// Ask the user for the second number.
// Check to see if the input is a valid number.
// Ask the user for an operation to perform.
// Check to see if the input is a valid operation.
// Perform the operation on the two numbers.
// Print the result to the terminal.
// Ask the user if they would like to continue.
// Check to see if the input is valid.
// Loop back to line 3 if the user answered yes.

const readline = require('readline-sync');

const MESSAGES = require('./calculator_messages.json');

// Set language for calculator.
let language;
let languageChoice;

prompt('1) English 2) Español 3) Français');
languageChoice = readline.question();

while (!['1', '2', '3'].includes(languageChoice)) {
  prompt('1) English 2) Español 3) Français');
  languageChoice = readline.question();
}

switch (languageChoice) {
  case '1':
    language = 'en';
    break;
  case '2':
    language = 'es';
    break;
  case '3':
    language = 'fr';
    break;
}

// Output message control

function messages(languageKey, message) {
  return MESSAGES[languageKey][message];
}

function prompt(msg) {
  console.log(`=> ${msg}`);
}

// Number validation

function invalidNumber(num) {
  return num.trimStart() === '' || Number.isNaN(Number(num));
}

// Input loops section

let number1;
let number2;
let operation;

function getInputs() {
  prompt(messages(language, 'firstNumber'));
  number1 = readline.question();

  while (invalidNumber(number1)) {
    prompt(messages(language, 'validNumber'));
    number1 = readline.question();
  }

  prompt(messages(language, 'secondNumber'));
  number2 = readline.question();

  while (invalidNumber(number2)) {
    prompt(messages(language, 'validNumber'));
    number2 = readline.question();
  }

  prompt(messages(language, 'operation'));
  operation = readline.question();

  while (!['1', '2', '3', '4'].includes(operation)) {
    prompt(messages(language, 'validOperation'));
    operation = readline.question();
  }
}

// Output section

let output;

function findResult() {
  switch (operation) {
    case '1':
      output = Number(number1) + Number(number2);
      break;
    case '2':
      output = Number(number1) - Number(number2);
      break;
    case '3':
      output = Number(number1) * Number(number2);
      break;
    case '4':
      output = Number(number1) / Number(number2);
      break;
  }
  prompt(messages(language, 'result') + ` ${output}.`);
}

// Main calculator loop section

let again;

function runCalculator() {
  getInputs();
  findResult();

  prompt(messages(language, 'again'));
  again = readline.question();

  while (!['1', '2'].includes(again)) {
    prompt(messages(language, 'validAgain'));
    again = readline.question();
  }

  if (again === '1') {
    console.clear();
    runCalculator();
  }
}

// Begin calculator.

prompt(messages(language, 'welcome'));

runCalculator();