// Pick out the minimum age from our current Munster family object:

let ages = {
  Herman: 32,
  Lily: 30,
  Grandpa: 5843,
  Eddie: 10,
  Marilyn: 22,
  Spot: 237
};

let agesArr = Object.values(ages);
// let minAge = agesArr[0];

// agesArr.forEach(age => {
//   if (age < minAge) {
//     minAge = age;
//   }
// })

// console.log(minAge); // 10

console.log(Math.min(...agesArr)); // 10