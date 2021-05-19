// Using the forEach method, write some code to output all vowels from the strings
// in the arrays.

let obj = {
  first: ['the', 'quick'],
  second: ['brown', 'fox'],
  third: ['jumped'],
  fourth: ['over', 'the', 'lazy', 'dog'],
};

Object.values(obj).forEach(value => {
  value.forEach(elem => {
    let splitElem = elem.split('');

    splitElem.forEach(character => {
      if ('aeiou'.includes(character)) {
        console.log(character);
      }
    })
  })
})

// e
// u
// i
// o
// o
// u
// e
// o
// e
// e
// a
// o