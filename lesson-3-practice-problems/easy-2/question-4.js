// Starting with the string:

let famousWords = "seven years ago...";

// show two different ways to put the expected "Four score and " in front of it.

let newFamousWords = "Four score and " + famousWords;
newFamousWords; // => 'Four score and seven years ago...'

let otherFamousWords = "Four score and ".concat(famousWords);
otherFamousWords; // => 'Four score and seven years ago...'