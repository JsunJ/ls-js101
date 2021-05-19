// Given the following code, what will the final values of a and b be?

let a = 2; // a is 2
let b = [5, 8]; // b is [5, 8]
let arr = [a, b]; // arr is [2, [5, 8]]

arr[0] += 2; // arr is [4, [5, 8]], // a is unchanged
arr[1][0] -= a; // arr is [4, [3, 8]], a is unchanged, b is [3, 8]