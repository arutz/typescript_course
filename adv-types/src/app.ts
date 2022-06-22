document.querySelector("#button")?.addEventListener("click", () => {
    console.log("button pressed");
});

/* intersection types */
type Admin = {
    name:String;
    privileges: string[];
};

type Employee = {
    name:string;
    startDate: Date;
};

type ElevatedEmployee = Admin & Employee; // this is how a intersection type is defined (could also be  done with interfaces)
// if we would use interfaces we could also define a third interface and have it ... extends Admin, Employee

type Combineable = string | number;
type Numeric = number | boolean;

type Universal = Combineable & Numeric; // would effectively mean that Universal is "number" type (that is the intersection of both of them)

/* typeguards */
function add(a: Combineable, b: Combineable) {
    if(typeof a === "string"  || typeof b === "string") { // typeguard for primitive types for example
        return a.toString() + b.toString();
    } else {
        return a + b;
    }
}

type UnknownEmployee = Employee | Admin;
function printEmployee(emp: UnknownEmployee) {
    console.log(`Name: ${emp.name}`);
    if ("privileges" in emp) { // typeguard for existence of property "privileges"
        // compiler knows that it is an Admin at this time
        console.log(`Privileges: ${emp.privileges}`);
    }
    if ("startDate" in emp) { // typeguard for existence of property "startDate"
        // compiler knows that it is an Employee at this time
        console.log(`Start Date: ${emp.startDate}`);
    }
}

printEmployee({name: "Max", startDate: new Date(), privileges: ["App 1", "Management Console"]});

class Truck { drive() {console.log("Truck drives")}; loadCargo(amount: number) { console.log(`loading ${amount}`)};}; class Car {drive() {console.log("Car drives")}}

type Vehicle = Truck | Car;

function printVehicle(veh: Vehicle) {
    veh.drive();
    if(veh instanceof Truck) { // this typeguard (standard javascript in fact) can be used for classes (not for types or interfaces since they are not compiled)
        veh.loadCargo(1000);
    }
}

let car = new Car();
let truck = new Truck();

printVehicle(car);
printVehicle(truck);

/* discriminated unions */

interface Bird {
    type: "Bird";
    flyingSpeed: number;
}

interface Horse {
    type: "Horse";
    runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(anim: Animal) {
    let speed = 0;
    switch(anim.type) { // we have a common property type in the union which we can use for a switch (since the values are static and final constants)
        case "Bird": speed = anim.flyingSpeed; break;
        case "Horse": speed = anim.runningSpeed; break;
    }
    console.log(`${anim.type} moves at ${speed}`);
}

moveAnimal({type: "Bird", flyingSpeed: 50});

/* Type casting */
let paragraph = document.querySelector("p"); // NOTE: compiler knows that this is a HTMLParagraphElement | null and does not need type casting
let userInputElement1 = <HTMLInputElement>document.getElementById("user-input")!; // type casting through "diamond"
let userInputElement2 = document.getElementById("user-input")! as HTMLInputElement; // type casting through "as"

userInputElement2.value = "Hi There";

