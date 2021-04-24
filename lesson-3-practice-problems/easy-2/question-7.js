// Consider the following object:

let flintstones = { Fred: 0, Wilma: 1, Barney: 2, Betty: 3, Bambam: 4, Pebbles: 5 };

/*
Create an array from this object that contains only two elements:
Barney's name and Barney's numbers:
*/

[ 'Barney', 2 ]

Object.entries(flintstones)[2]; // => [ 'Barney', 2 ]

// Object.entries(flintstones).filter(pair => pair[0] === "Barney").shift();