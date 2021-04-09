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
const MESSAGES = require('./loan_calculator_messages.json');

// Messages

function messages(msg) {
  return MESSAGES[msg];
}

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

function isZero(str) {
  return Number(str) === 0;
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
  prompt(messages('loanRequest'));
  loanAmount = parseFloat(readline.question());

  while (invalidNumber(loanAmount)) {
    prompt(messages('invalidLoan'));
    loanAmount = parseFloat(readline.question());
  }

  prompt(messages('loanReadback') + `${formatDollars(loanAmount)}.`);
}

function getInterest() {
  prompt(messages('interestRequest'));
  prompt(messages('interestFormat'));
  annualPercentageRate = parseFloat(readline.question());

  while (invalidNumber(annualPercentageRate)) {
    prompt(messages('invalidInterest'));
    prompt(messages('interestFormat'));
    annualPercentageRate = parseFloat(readline.question());
  }

  prompt(messages('interestReadback') + `${formatAPR(annualPercentageRate)}% APR.`);
}

function getYears() {
  prompt(messages('yearsRequest'));
  prompt(messages('yearsFormat'));
  loanDurationYears = readline.question();

  while (invalidYear(loanDurationYears)   ||
         invalidNumber(loanDurationYears) ||
         isZero(loanDurationYears)) {
    prompt(messages('invalidYears'));
    prompt(messages('yearsFormat'));
    loanDurationYears = readline.question();
  }

  loanDurationYears = parseFloat(loanDurationYears);

  prompt(messages('yearsReadback') + `${loanDurationYears} years.`);
}

function repeat() {
  prompt(messages('repeatQuestion'));
  let answer = readline.question().toLowerCase();

  while (answer !== 'y' && answer !== 'n') {
    prompt(messages('invalidAnswer'));
    answer = readline.question().toLowerCase();
  }

  if (answer === 'y') {
    console.clear();
    main();
  } else {
    prompt(messages('exit'));
  }
}

function runCalculator() {
  let monthlyInterestRate = (annualPercentageRate / 100) / 12;
  let loanDurationMonths = loanDurationYears * 12;

  let monthlyPayment = loanAmount *
                      (monthlyInterestRate / (1 - Math.pow(
                        (1 + monthlyInterestRate), (-loanDurationMonths))));

  let totalCost = loanDurationMonths * monthlyPayment;
  let totalInterest = totalCost - loanAmount;

  prompt(messages('calculating'));
  prompt(messages('monthlyPay') + `${formatDollars(monthlyPayment)}.`);
  prompt(messages('totalInInterest') + `${formatDollars(loanAmount)} is $${formatDollars(totalInterest)}.`);
  prompt(messages('overallCost') + `${loanDurationMonths} payments is $${formatDollars(totalCost)}.`);

}

function runZeroInterestCalculator() {
  let loanDurationMonths = loanDurationYears * 12;
  let monthlyPayment = loanAmount / loanDurationMonths;

  prompt(messages('calculating'));
  prompt(messages('monthlyPay') + `${formatDollars(monthlyPayment)} for ${loanDurationMonths} months.`);

}

function main() {
  getLoan();
  getInterest();
  getYears();

  if (annualPercentageRate === 0) {
    runZeroInterestCalculator();
  } else {
    runCalculator();
  }

  repeat();
}

prompt(messages('welcome'));
main ();