// What is the callback's return value in the following code? Also, what is the
// return value of every in this code?

[1, 2, 3].every(num => {
  return num = num * 2;
});

// the callback's return value is the current element * 2
// the return value of the every method is true due to the callback returning
// a truthy value in each iteration