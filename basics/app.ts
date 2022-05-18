// all basic type / primitives; NOTE: all primitives are lower case
let numberValue:number= 2.3;
console.log(numberValue);
let textValue:string = `Template literal ${numberValue}`;
console.log(textValue);
let truthValue:boolean = true;
console.log(truthValue);

function add(value1:number, value2:number) {
    return value1 + value2;
}

function addTypeUnsafe(value1, value2) {
    if(typeof value1 === 'number' && typeof value2 === 'number') {
        return value1 + value2;
    } else if(typeof value1 === 'string' || typeof value2 === 'string') {
        return value1 + value2;
    } else {
        throw new Error("unknown types"); // syntax for 
    }
    
}

let number1 = 1;
let number2 = 2;
let addValue = add(number1, number2);
console.log(addValue);

// will produce an error but not during compile time
let typeUnsafeResult = addTypeUnsafe('5', 2); // will work because we used a string and a number which has one "valid" code path
console.log(typeUnsafeResult);

console.log("log after error"); // NOTE: the script would not execute after the error

