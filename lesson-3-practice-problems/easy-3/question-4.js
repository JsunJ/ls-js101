// What will the following code output?

let arr1 = [{ first: "value1" }, { second: "value2" }, 3, 4, 5];
let arr2 = arr1.slice();
arr2[0].first = 42;
console.log(arr1); // [ { first: 42 }, { second: "value2" }, 3, 4, 5 ]
/*
slice() performs a shallow copy of arr1, leaving the first 2 object references intact.

    arr1                                                        arr2
+---------+             +---------------------+              +---------+
| pointer | ----------> |    { first: 42 }    | <----------- | pointer |
+---------+             +---------------------+              +---------+
| pointer | -----+                                    +----- | pointer |
+---------+      |                                    |      +---------+
|    3    |      |      +----------------------+      |      |    3    |
+---------+      +----> | { second: "value2" } | <----+      +---------+
|    4    |             +----------------------+             |    4    |
+---------+                                                  +---------+
|    5    |                                                  |    5    |
+---------+                                                  +---------+
*/