// Given a number an an array, determine whether the number is included in the array.

let numbers = [1, 2, 3, 4, 5, 15, 16, 17, 95, 96, 99];

let number1 = 8;  // false
let number2 = 95; // true

function includesNumber(arr, num) {
  return arr.includes(num);
}

includesNumber(numbers, 8); // false
includesNumber(numbers, 95); // false