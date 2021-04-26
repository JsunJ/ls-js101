// What do you think the following code will output?

let nanArray = [NaN];

console.log(nanArray[0] === NaN); // false

/*
JavaScript doesn't let you use equality operators to determine whether
a value is NaN.
*/

// Bonus: How can you reliably test if a value is NaN?

Number.isNaN(value);