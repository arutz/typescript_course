// useage of unions (as parameter types in this case); NOTE: we have to do a type check now
function combine(input1: number | string, input2: number | string) {
  let result;
  if (typeof input1 === "number" && typeof input2 === "number") {
    result = input1 + input2;
  } else {
    result = `${input1.toString()} ${input2.toString()}`;
  }
  return result;
}
{
  let firstResult = combine(1, 2);
  console.log(firstResult);
  let secondResult = combine("Max", "Anna");
  console.log(secondResult);
}

// literal types
function combine2(
  input1: number | string,
  input2: number | string,
  resultConversion: "as-string"  | "as-number" // defines possible values for literals
) {
  let result;
  if (
    (typeof input1 === "number" && typeof input2 === "number") ||
    resultConversion === "as-number"
  ) {
    result = +input1 + +input2;
  } else {
    result = `${input1.toString()}${input2.toString()}`;
  }
  return result;
}

{
  let result1 = combine2(1, 2, "as-number");
  console.log(result1); // 3
  let result2 = combine2("1", "2", "as-number");
  console.log(result2); // 3
  let result3 = combine2("Max", "Anna", "as-string");
  console.log(result3); // MaxAnna
  let result4 = combine2(1, 2, "as-string");
  console.log(result4); // 12
  // let result5 = combine2(1, 2, "as-string2213213"); // NOTE: the compiler would check and fault this incorrect literal-type
}

// type aliases
type Combineable = number | string;
type ConversionDescriptor =  "as-string"  | "as-number";
function combine3(
    input1: Combineable, // NOTE: we used our custom (union) input here
    input2: Combineable, // NOTE: we used our custom (union) input here
    resultConversion: ConversionDescriptor // NOTE: we used our custom (union) conversion target here
  ) {
    let result;
    if (
      (typeof input1 === "number" && typeof input2 === "number") ||
      resultConversion === "as-number"
    ) {
      result = +input1 + +input2;
    } else {
      result = `${input1.toString()}${input2.toString()}`;
    }
    return result;
}

type User = { name: string; age: number }; // we can also define a alias for a prototype object
let user1:User = {name: "Achim Rutz", age: 38};

function isOld(user: User) {
    return user.age > 30;
}

console.log(`user ${user1.name} is old? => ${isOld(user1)}`);