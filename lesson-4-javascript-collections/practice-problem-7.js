// What is the return value of map in the following code? Why?

['ant', 'bear'].map(elem => {
  if (elem.length > 3) {
    return elem;
  }
});

// [ undefined, 'bear' ]
// ant does not meet satisfy the conditional and thus does not get explicitly returned
// without an explicit return, functions implicitly return undefined