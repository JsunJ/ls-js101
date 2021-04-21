// How can you determine whether a given string ends with an exclamation mark (!)?

let str1 = "Come over here!"; // true
let str2 = "What's up, Doc?"; // false

/* 
Using the String.prototype.endsWith() method.
*/

str1.endsWith('!'); // true
str2.endsWith('!'); // false