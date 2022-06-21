/* NOTE: in the output the entirety of the interface definitions are missing since they do not really exist / make sense in javascript */

document.querySelector("#button")?.addEventListener("click", () => {
    console.log("button pressed");
});

// fun with interfaces

interface Greetable {
    readonly name: string;
    outputName?: string; // optional property

    greet(phrase: string): void;
    greetOptional?(): void; // optional function

}

interface Ageeable {
    age: number;

    birthday(): number;
}

class Person implements Greetable, Ageeable {

    constructor(public name:string, public age:number, public occupation: string = "unemployed" /* default parameter value */) {}

    greet(phrase?: string): void {
        console.log(phrase +  ' ' + this.name)
    }

    birthday(): number {
        return ++this.age;
    }

}

let user1 = new Person("Max Mustermann", 54);
 
user1.greet("Hallo Welt!"); // => Hallo Welt! Max Mustermann
user1.greet(); // => undefined Max Mustermann
user1.birthday();
console.log(user1.age); // => 55

// function as interface type

interface AddFn {
    (a: number, b:number): number;
}

let addFn: AddFn = (a:number, b:number) => { return a + b; };

console.log(addFn(1,2)); // => 3