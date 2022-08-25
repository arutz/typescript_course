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

// let univ1:Universal = 2 + "2"; // => not possible since "2" is not a number

/* typeguards */
function add(a: number, b: number): number /* NOTE: useage of function overlaods with differing return types!!!! */
function add(a: string, b: number): string /* NOTE: useage of function overlaods with differing return types!!!! */
function add(a: number, b: string): string /* NOTE: useage of function overlaods with differing return types!!!! */
function add(a: string, b: string): string /* NOTE: useage of function overlaods with differing return types!!!! */
function add(a: Combineable, b: Combineable) {
    if(typeof a === "string"  || typeof b === "string") { // typeguard for primitive types for example
        return a.toString() + b.toString();
    } else {
        return a + b;
    }
} 

const result = add(1, "Mustermann")
console.log(result);

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
let userInputElement2 = document.getElementById("user-input") as HTMLInputElement; // type casting through "as"

if(userInputElement2)
    userInputElement2.value = "Hi There";

    /* index properties */
interface ErrorContainer { // usage of index types
    id: string;
    [prop: string]: string // read: interface must have a property of type string with value of type string (NOTE: property type can only be primitive type string, number)
}

const errorBag: ErrorContainer = {
    id: "WRN-VALID-01",
    email: "not a valid email",
    username: "must start with a capital letter"
}

console.log(JSON.stringify(errorBag));

/* outside of course: some fun with regex and type definition as strings with certain values */
const measurementUnitRegEx = /(\d+(\.(\d+)))\s{0,1}(cm|mm|dm|m|miles)/;
type Unit = "cm" | "mm" | "dm" | "m" | "miles";
type Measurement = number;
type MeasurementUnit = `${Measurement} ${Unit}` |`${Measurement}${Unit}`; 

let measurementUnit: MeasurementUnit = "228.50mm";
function toMeasurement(measurementUnit:MeasurementUnit): Measurement {
    let measurmentValue = measurementUnit.replace(measurementUnitRegEx, "$1");
    return Number(measurmentValue);
}
function toUnit(measurementUnit:MeasurementUnit): Unit {
    let unitValue = measurementUnit.replace(measurementUnitRegEx, "$4");
    return <Unit>unitValue;
}

console.log(toMeasurement(measurementUnit));
console.log(toUnit(measurementUnit));

/* optional chaining */
const fetchedData = {
    id: "u1",
    name: "max",
    job: { title: "CEO", description: "owns company" }
}

console.log(fetchedData?.job?.title); // note that the "?" functions as a safe access here where the next / following chain elements are only accessed if element is present

/* nullish coalescence */
const userInput = "";

console.log(userInput || "DEFAULT"); // will print DEFAULT because the "||" operator will take the first non empty non-null non-undefined value
console.log(userInput ?? "DEFAULT2"); // will print "" (empty string) since only non-null and non-undefined values lead to else case
