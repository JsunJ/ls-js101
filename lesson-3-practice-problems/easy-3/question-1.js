// Write three different ways to remove all of the elements from the following array:

let numbers = [1, 2, 3, 4];

numbers.splice(0);

while (numbers.length) {
  numbers.pop();
}

numbers.length = 0;