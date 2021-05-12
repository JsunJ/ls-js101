// The following code differs slightly from the above code. What is the return
// value of map in this case?

[1, 2, 3].map(num => num * num);

// [ 1, 4, 9 ]
/*
without braces surrounding the body of the arrow function, JavaScript
uses the computed value as the return value
*/