/* 
 ### unknown type ###
  */
let userInput: unknown;
let userName: string;

userInput = 5;
userInput = { name: "Somebody" };
userInput = "Alles kann! Nix muss!";

// userName = userInput; // NOTE: this does not work in compilation although it would work for an "any" definition for userInput
// => unknown works like an agnostic value holder but when operations are performed it wants type safety / type check (unlike with any)
if (typeof userInput === "string") {
  userName = userInput; // now it works
  console.log(userName); // => Alles kann! Nix muss!
} // => unknown is better than any when it comes to rigorousness and type safety

/* 
 ### never type ###
  */
function generateError(message: string, code: number): never {
  // we define returntype "never" here to indicate that this function will never return anything
  throw { message: message, code: code };
}

try {
  const neverReturn = generateError("something went wrong!", 500);
  console.log(neverReturn); // this would never be reached
} catch (e) {
  console.log(`error occured: ${JSON.stringify(e)}`);
}
