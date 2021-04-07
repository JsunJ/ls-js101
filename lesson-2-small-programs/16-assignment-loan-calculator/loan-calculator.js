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

// Message formatting

function prompt(msg) {
  console.log(`=> ${msg}`);
}

function formatNumber(num) {
  return parseFloat(num.toFixed(2)).toLocaleString();
}

// Validation

function invalidNumber(num) {
  return Number(num) < 0 || Number.isNaN(Number(num));
}

prompt('Welcome to Mortgage Calculator!');

// Inputs

let loanAmount;
let annualPercentageRate;
let loanDurationYears;

prompt('Enter the loan amount.');
loanAmount = parseFloat(readline.question());

while (invalidNumber(loanAmount)) {
  prompt('Please enter a valid number for the loan amount.');
  loanAmount = parseFloat(readline.question());
}

prompt(`You entered $${formatNumber(loanAmount)}.`);

prompt('Enter the Annual Percentage Rate (APR). Acceptable format(s): 6 | 6.0 | 12.00');
annualPercentageRate = parseFloat(readline.question());

while (invalidNumber(annualPercentageRate)) {
  prompt('Please enter a valid number for the APR.');
  annualPercentageRate = parseFloat(readline.question());
}

prompt(`You entered ${formatNumber(annualPercentageRate)}% APR.`);

prompt('Enter the loan duration in years. Acceptable format(s): 5 | 10.0 | 10.00');
loanDurationYears = parseFloat(readline.question());

while (invalidNumber(loanDurationYears)) {
  prompt('Please enter a valid number for the loan duration in years.');
  loanDurationYears = parseFloat(readline.question());
}

prompt(`You entered ${formatNumber(loanDurationYears)} years.`);

let monthlyInterestRate = (annualPercentageRate / 100) / 12;
let loanDurationMonths = loanDurationYears * 12;

let monthlyPayment = loanAmount *
              (monthlyInterestRate /
              (1 - Math.pow((1 + monthlyInterestRate), (-loanDurationMonths))));

let totalCost = loanDurationMonths * monthlyPayment;
let totalInterest = totalCost - loanAmount;

prompt('--------------------');
prompt(`Your monthly payment is $${formatNumber(monthlyPayment)}.`);
prompt(`Your total interest on $${formatNumber(loanAmount)} is $${formatNumber(totalInterest)}.`);
prompt(`Your total of ${formatNumber(loanDurationMonths)} payments is ${formatNumber(totalCost)}.`);