let flintstones = ["Fred", "Barney", "Wilma", "Betty", "Pebbles", "Bambam"];

// Write a program that uses this array to create an object where the names are
// the keys and the values are the positions in the array:

// { Fred: 0, Barney: 1, Wilma: 2, Betty: 3, Pebbles: 4, Bambam: 5 }

function convertToObject(arr) {
  let obj = {};
  let arrValues = Object.values(arr);

  arrValues.forEach(value => {
    obj[value] = arrValues.indexOf(value);
  })

  return obj;
};

console.log(convertToObject(flintstones));

// { Fred: 0, Barney: 1, Wilma: 2, Betty: 3, Pebbles: 4, Bambam: 5 }

// let flintstonesObj = {};

//  flintstones.forEach((name, index) => {
//    flintstonesObj[name] = index;
//  });