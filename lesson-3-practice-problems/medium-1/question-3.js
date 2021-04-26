/*
Alyssa noticed that this code would fail when the input is 0 or a negative
number, and asked Alan to change the loop. How can he make this work without
using a do/while loop? Note that we're not looking to find the factors for 0 or
negative numbers, but we want to handle it gracefully instead of raising an exception
or going into an infinite loop.
*/

/*
function factors(number) {
  let divisor = number;
  let factors = [];
  do {
    if (number % divisor === 0) {
      factors.push(number / divisor);
    }
    divisor -= 1;
  } while (divisor !== 0);
  return factors;
}
*/

function factors(number) {
  let divisor = number;
  let factors = [];
  
  if (number <= 0) {
    return '0 or negative number entered.';
  }

  while (divisor > 0) {
    if (number % divisor === 0) {
      factors.push(number / divisor);
    }

    divisor -= 1;
  }
  
  return factors;
}

console.log(factors(15)); // [ 1, 3, 5, 15 ]
console.log(factors(0)); // 0 or negative number entered.
console.log(factors(-15)); // 0 or negative number entered.

// Bonus: What is the purpose of number % divisor === 0 in that code?