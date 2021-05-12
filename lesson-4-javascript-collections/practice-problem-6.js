// How does Array.prototype.fill work? Is it destructive? How can we find out?

let arr = [1, 2, 3, 4, 5]
arr.fill(1, 1, 5);

// fill changes all elements in an array to a static value from a start index to
// an end index. it mutates the original array.

arr; // [ 1, 1, 1, 1, 1 ]