// next gen features :-)
let button = document.querySelector("#button") as HTMLButtonElement;

const registerEvent = (element: HTMLButtonElement, eventType: "click"|"mouseover", delegate: EventListenerOrEventListenerObject) => { // one can even assign delegates into a function
    element.addEventListener(eventType, delegate);
}

function hello(message: string) { // classic definition of a function
    console.log(message);
}
const add = (...numbers: number[]) => numbers.reduce((curResult, curValue) => curResult + curValue, 0); // define a function as a function pointer essentially and assign to a constant;
// also check out the cool array reduce stuff
// also check out the rest parameters "..." array definition

button.addEventListener("click", hello.bind(this, "Hallo Welt!"));


type PrintContent = string | number;
const printLn = (...output: PrintContent[]) => output.forEach(item => console.log(item)); // define a print function that will log any amount of content of strings and / or numbers
printLn(add(4,5, 3.7, 2, 10)); // use the add function with a size of parameters of your choice

registerEvent(button, "click", hello.bind(this, "hallo welt!"));

// some fun with arrays
const hobbies = ["Sports", "Cooking"];
const activeHobbies = ["Hiking"];

activeHobbies.push(...hobbies); // spread operator to easily push array content into another array

activeHobbies.forEach(hobby => printLn(hobby));

// data structures also have some special syntax 
const person = { fullName: "Achim Rutz", age: 37};
const personCopy = { ...person}; // copies the person content into personCopy

const [hobby1, hobby2, ...remainingHobbies] = hobbies; // spread the content of an array into multiple variables again => called "destructuring"

printLn(...remainingHobbies, hobby2);

const {fullName: userName, age} = person; // "destructure" the content of data into variables again (1st one redefining their name)
printLn(userName, age);