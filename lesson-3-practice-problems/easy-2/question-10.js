/*
Write two one-line expressions to count the number of lower-case t characters
in each of the following strings:
*/

let statement1 = "The Flintstones Rock!";
let statement2 = "Easy come, easy go.";

statement1.match(/t/g).length; // => 2
statement2.split('').filter(char => char === 't').length; // => 0