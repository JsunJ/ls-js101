// Add up all of the ages from the Munster family object:

let ages = {
  Herman: 32,
  Lily: 30,
  Grandpa: 5843,
  Eddie: 10,
  Marilyn: 22,
  Spot: 237
};

let ageValues = Object.values(ages);
let ageTotal = 0;

ageValues.forEach(value => {
  ageTotal += value;
});

console.log(ageTotal); // 6174