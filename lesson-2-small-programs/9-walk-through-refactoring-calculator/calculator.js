// Ask the user for the first number.
// Check to see if the input is a valid number.
// Ask the user for the second number.
// Check to see if the input is a valid number.
// Ask the user for an operation to perform.
// Check to see if the input is a valid operation.
// Perform the operation on the two numbers.
// Print the result to the terminal.

const readline = require('readline-sync');

function prompt(msg) {
  console.log(`=> ${msg}`);
}

function invalidNumber(num) {
  return num.trimStart() === '' || Number.isNaN(Number(num));
}

prompt('Welcome to Calculator!');

prompt('What is the first number?');
let number1 = readline.question();

while (invalidNumber(number1)) {
  prompt('Please enter a valid number.')
  number1 = readline.question();
}

prompt('What is the second number?');
let number2 = readline.question();

while (invalidNumber(number2)) {
  prompt('Please enter a valid number.')
  number2 = readline.question();
}

prompt('What operation would you like to perform?\n1) Add 2) Subtract 3) Multiply 4) Divide');
let operation = readline.question();

while (!['1', '2', '3', '4'].includes(operation)) {
  prompt('Please choose a valid operation.')
  operation = readline.question();
}

let output;

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

prompt(`The result is ${output}.`);