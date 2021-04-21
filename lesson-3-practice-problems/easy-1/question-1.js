// Will the code below raise an error?

let numbers = [1, 2, 3];
numbers[6] = 5;

/* 
No. Accessing and assigning an index greater than the last index of an
array will not throw an error.
*/

numbers; // => [ 1, 2, 3, <3 empty items>, 5 ]

// Bonus:

let numbers = [1, 2, 3];
numbers[6] = 5;
numbers[4];  // what will this line return?

// returns undefined, but the index is still empty.