/*
Write a program that outputs The Flintstones Rock! 10 times, with each line
indented 1 space to the right of the line above it.
*/

/*
The Flintstones Rock!
 The Flintstones Rock!
  The Flintstones Rock!
   ...
*/

function asciiArt() {
  let output = 'The Flintstones Rock!';

  for (let i = 1; i <= 10; i += 1) {
    console.log(output);
    output = ' ' + output;
  }
}

asciiArt();
/* => 
The Flintstones Rock!
 The Flintstones Rock!
  The Flintstones Rock!
   The Flintstones Rock!
    The Flintstones Rock!
     The Flintstones Rock!
      The Flintstones Rock!
       The Flintstones Rock!
        The Flintstones Rock!
         The Flintstones Rock!
*/