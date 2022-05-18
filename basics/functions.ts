/* 
 ### return types ###
  */
function add(n1: number, n2: number) {
  // NOTE that return type is number
  return n1 + n2;
}

function printResult(num: number) {
  // NOTE that return type is void
  console.log(`Result ${num}`);
}

printResult(add(5, 7)); // => Result 12

 /* 
 ### functions as types ###
  */
let combineValues;

combineValues = add;
// combineValues = 5; // gets a runtime error but not a compile error

console.log(combineValues(8,8)); // => 16

let combineValuesTypeSafe: Function;

// combineValuesTypeSafe = 5; // compile error!
// but a function pointer like this is still possible (c / c++ developers love this ;-))
combineValuesTypeSafe = add;
combineValuesTypeSafe = printResult;

console.log(combineValuesTypeSafe(8,8)); // => "Result 8" and "undefined"

// only this definition is unambigous
let combineValuesTypeSafeAndReturn: (a: number, b: number) => number;

// combineValuesTypeSafeAndReturn = 5; // compile error!
// but something like this is still posbile
combineValuesTypeSafeAndReturn = add;
// combineValuesTypeSafeAndReturn = printResult; // compile error!

/* 
 ### functions types / callbacks ###
  */
function addAndHandle(n1: number, n2: number, cb: (num: number) => void) {
    let result = add(n1, n2);
    cb(result);
}

addAndHandle(10, 20, (result) => { console.log(`addAndHandle: ${result}`);});