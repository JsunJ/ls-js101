/*
Back in the stone age (before CSS), we used spaces to align things on the screen.
If we have a 40-character wide table of Flintstone family members,
how can we center the following title above the tables with spaces?
*/

let title = "Flintstone Family Members";

let padding = Math.floor((40 - title.length) / 2);

title.padStart(padding + title.length);

/*
Subtract string length from width then divide result by 2.
Pad the start of the string by the end result.
*/