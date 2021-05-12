// What is the return value of the filter method call below? Why?

[1, 2, 3].filter(num => 'hi');

// [ 1, 2, 3 ]
/*
filter performs selection based on truthiness of the callback return value.
each iteration will return 'hi' from the callback which is truthy,
so each element will be selected in the original array
*/

[1, 2, 3].filter(num => {
  return 'hi';
});