// Ask the user for the loan amount.
// Validate the input.
// Ask the user for the APR.
// Validate the input.
// Ask the user for the loan duration.
// Validate the input.
// Calculate the monthly interest rate.
// Calculate the loan duration in months.
// Calculate the monthly payment.

const readline = require('readline-sync');

function prompt(msg) {
  console.log(`=> ${msg}`);
}

prompt('Welcome to the loan calculator!');

prompt('Enter your loan amount in the following format: 123456.78');
let loanAmount = parseFloat(readline.question());

prompt('Enter your Annual Percentage Rate (APR) in the following format: 12.3');
let annualPercentageRate = parseFloat(readline.question());

prompt('Enter the yearly duration of your loan in the following format: 12.3');
let loanDurationYears = parseFloat(readline.question());

let monthlyInterestRate = (annualPercentageRate / 100) / 12;

let loanDurationMonths = loanDurationYears * 12;

let monthlyPayment = loanAmount * (monthlyInterestRate / (1 - Math.pow((1 + monthlyInterestRate), (-loanDurationMonths))));

prompt(`Your monthly payment is ${monthlyPayment}`);