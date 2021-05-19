// Compute and display the total age of the male members of the family.

let munsters = {
  Herman: { age: 32, gender: 'male' },
  Lily: { age: 30, gender: 'female' },
  Grandpa: { age: 402, gender: 'male' },
  Eddie: { age: 10, gender: 'male' },
  Marilyn: { age: 23, gender: 'female'}
};

function findTotalMaleAge(obj) {
  let munstersArr = Object.entries(obj);
  let totalMaleAge = 0;

  munstersArr.forEach(munster => {
    if (munster[1].gender === 'male') {
      totalMaleAge += munster[1].age;
    }
  });

  return totalMaleAge;
}

console.log(findTotalMaleAge(munsters)); // 444

// let totalMaleAge = 0;

// for (let member in munsters) {
//   if (munsters[member]['gender'] === 'male') {
//     totalMaleAge += munsters[member].age;
//   }
// }

// console.log(totalMaleAge); // => 444

// let memberDetails = Object.values(munsters);
// let totalMaleAge = 0;

// memberDetails.forEach(member => {
//   if (member.gender === 'male') {
//     totalMaleAge += member.age;
//   }
// });