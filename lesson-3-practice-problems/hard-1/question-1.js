// Will the following functions return the same results?

function first() {
  return {
    prop1: "hi there"
  };
}

function second() {
  return
  {
    prop1: "hi there"
  };
}

console.log(first());
console.log(second());

/* 
first() will return { prop1: 'hi there' }. second() will return undefined.
JavaScript will insert a semicolon after the return in second().
*/