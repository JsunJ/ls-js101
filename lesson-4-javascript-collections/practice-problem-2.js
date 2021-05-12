// What is the return value of map in the following code? Why?

[1, 2, 3].map(num => {
  num * num;
});

// [ undefined, undefined, undefined ]
/*
map performs transformation based on the return value of the call back function.
there is no explicit return statement in the callback function so it will return
undefined on each iteration
*/