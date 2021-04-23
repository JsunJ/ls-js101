/*
Using the following string, create a new string that contains all lowercase
letters except for the first character, which should be capitalized.
(See the example output.)
*/

let munsterDescription = "the Munsters are CREEPY and Spooky.";
// => The munsters are creepy and spooky.

function fixCapitalization(str) {
  return str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase();
}

let fixedMunsterDescription = fixCapitalization(munsterDescription);
fixedMunsterDescription; // => The munsters are creepy and spooky.