// Given the following data structure, write some code that returns an object
// where the key is the first item in each subarray, and the value is the second.

let arr = [['a', 1], ['b', 'two'], ['sea', {'c': 3}], ['D', ['a', 'b', 'c']]];

// expected return value of function call
// { a: 1, b: 'two', sea: { c: 3 }, D: [ 'a', 'b', 'c' ] }

function objectify(input) {
  let formattedObj = {};

  input.forEach(subArr => {
    formattedObj[subArr[0]] = subArr[1];
  })

  return formattedObj;
}

objectify(arr); // { a: 1, b: 'two', sea: { c: 3 }, D: [ 'a', 'b', 'c' ] }