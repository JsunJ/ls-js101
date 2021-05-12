// Create an object that expresses the frequency with which each letter occurs
// in this string:

let statement = "The Flintstones Rock";

// { T: 1, h: 1, e: 2, F: 1, l: 1, ... }

let characterArr = statement.split(/\s*/);
let obj = {};

// build the object keys with values set to 0
characterArr.forEach(char => {
  obj[char] = 0;
});

// iterate over the array of characters,
// add 1 to the key-value in the object for each time it finds itself
// in the object's keys
characterArr.forEach(char => {
  if (Object.keys(obj).includes(char)) {
    obj[char] += 1;
  }
})

console.log(obj);