// Starting with the string:

let munstersDescription = "The Munsters are creepy and spooky.";

// Return a new string that swaps the case of all the letters:

`tHE mUNSTERS ARE CREEPY AND SPOOKY.`

function reverseCase(str) {
  let reversedStr = '';

  for (let i = 0; i < str.length; i += 1) {
    if (str[i] === str[i].toLowerCase()) {
      reversedStr = reversedStr + str[i].toUpperCase();
    } else {
      reversedStr = reversedStr + str[i].toLowerCase();
    }
  }

  return reversedStr;
}

console.log(reverseCase(munstersDescription)); // tHE mUNSTERS ARE CREEPY AND SPOOKY.