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

function formatDollars(num) {
  return parseFloat(num.toFixed(2)).toLocaleString('en',
    { minimumFractionDigits: 2 });
}

function formatAPR(num) {
  return parseFloat(num.toFixed(3));
}

// Validation

function invalidNumber(num) {
  return Number(num) < 0 || Number.isNaN(Number(num));
}

// If year includes a decimal, it must end with 5
function invalidYear(str) {
  if (str.includes('.')) {
    return !str.endsWith('.5');
  } else {
    return false;
  }
}

let loanAmount;
let annualPercentageRate;
let loanDurationYears;

function getLoan() {
  prompt('Enter the loan amount.');
  loanAmount = parseFloat(readline.question());

  while (invalidNumber(loanAmount)) {
    prompt('Please enter a valid number for the loan amount.');
    loanAmount = parseFloat(readline.question());
  }

  prompt(`You entered $${formatDollars(loanAmount)}.`);
}

function getInterest() {
  prompt('Enter the Annual Percentage Rate (APR).');
  prompt('Please use one of these formats: 5 | 5.5 | 5.75 | 10.975');
  annualPercentageRate = parseFloat(readline.question());

  while (invalidNumber(annualPercentageRate)) {
    prompt('Please enter a valid number for the APR.');
    prompt('Please use one of these formats: 5 | 5.5 | 5.50 | 5.123');
    annualPercentageRate = parseFloat(readline.question());
  }

  prompt(`You entered ${formatAPR(annualPercentageRate)}% APR.`);
}

function getYears() {
  prompt('Enter the loan duration in whole or half years.');
  prompt('Please use one of these formats: 5 | 5.5 | 0.5 | .5');
  loanDurationYears = readline.question();

  while (invalidYear(loanDurationYears) || invalidNumber(loanDurationYears)) {
    prompt('Please enter a valid loan duration in whole or half years.');
    prompt('Please use one of these formats: 5 | 5.5 | 0.5 | .5');
    loanDurationYears = readline.question();
  }

  loanDurationYears = parseFloat(loanDurationYears);

  prompt(`You entered ${loanDurationYears} years.`);
}

function repeat() {
  prompt('Would you like to calculate another loan? Y / N');
  let answer = readline.question().toLowerCase();

  while (answer !== 'y' && answer !== 'n') {
    prompt('Please enter "Y" for yes or "N" for no.');
    answer = readline.question().toLowerCase();
  }

  if (answer === 'y') {
    console.clear();
    runCalculator();
  } else {
    prompt('Exiting calculator.');
  }
}

function runCalculator() {
  prompt('Welcome to Mortgage Calculator!');

  getLoan();
  getInterest();
  getYears();

  let monthlyInterestRate = (annualPercentageRate / 100) / 12;
  let loanDurationMonths = loanDurationYears * 12;

  let monthlyPayment = loanAmount *
                      (monthlyInterestRate / (1 - Math.pow(
                        (1 + monthlyInterestRate), (-loanDurationMonths))));

  let totalCost = loanDurationMonths * monthlyPayment;
  let totalInterest = totalCost - loanAmount;

  prompt('--------------------');
  prompt(`Your monthly payment is $${formatDollars(monthlyPayment)}.`);
  prompt(`Your total interest on $${formatDollars(loanAmount)} is $${formatDollars(totalInterest)}.`);
  prompt(`Your total of ${loanDurationMonths} payments is $${formatDollars(totalCost)}.`);

  repeat();
}

runCalculator();