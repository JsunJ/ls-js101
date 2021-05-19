// How would you order the following array of number strings by descending numeric
// value (largest number value to smallest)?

let arr = ['10', '11', '9', '7', '8'];

let sortedArray = arr.sort((a, b) => {
  return Number(b) - Number(a);
})

console.log(sortedArray); // [ '11', '10', '9', '8', '7' ]