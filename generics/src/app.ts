/*  generics for an array which has a union; notice that due to the usage of generics
    we can tell that it is either a number or string */
const names: Array<string|number> = ["max", "maxine", 4];
console.log(names[2]);

/*  usage of generics for parameter types; notice that "merged" knows which attributes exist at compile time (would no be possible without generics).
    also notice the "extends" which acts as a "constraint" for the generic type */
function merge<T extends object, U extends object>(objA: T, objB: U) {
    return Object.assign(objA,objB);
}

const merged = merge({ name: "Max", hobbies: ['biking', 'swimming']}, { age: 30 });
console.log(merged);

/*  This demonstrates a case where we use a generic type that requires a "length" attribute.
    Notice that the calls at the end do not have to extend or implement the actual interface */
interface Lengthy {
    length: number
}

function countAndDescribe<T extends Lengthy>(element: T) {
    let descr = `${element.length} value(s)`;
    return [element, descr];
}

console.log(countAndDescribe({name: "Max", length: 3}));
console.log(countAndDescribe("Max"));

/*  Here we use the "keyof" syntax to indicate that the second parameter (U) is accessible via key or "." notation within T.
    Below we can use a shape (with name attribute) with a "name" key. */

function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U) {
    return obj[key];
}

console.log(extractAndConvert({name: "Max"}, "name"));

/*  Here a class is written which acts as a collection class based on an array of a certain generic type.
    Note that the calls below will "know" what kind of operations for the items are availabe during compile time. */
class DataStorage<T> {
    private data: T[] = [];
    addItem(item:T) {
        this.data.push(item);
    }

    removeItem(item:T) {
        return this.data.splice(this.data.indexOf(item), 1);
    }

    getItems() {
        return this.data;
    }
}

const textStorage = new DataStorage(); // we have not defined any type here; the subsequent calls will tell the compiler that the storage is a string storage
textStorage.addItem("Hallo ");
textStorage.addItem("Welt");
textStorage.addItem("!");
textStorage.removeItem("Welt");
console.log(textStorage.getItems().toString().replace(/\,/gi, "")); // => Hallo !

interface PersonData {
    name: string,
    age?:number
}

const anotherStorage = new DataStorage<PersonData>();
anotherStorage.addItem({ name: "Max"});
anotherStorage.addItem({ name: "Oldy", age: 30});
anotherStorage.removeItem({ name: "Max"}); // note that this will not remove the "Max" entry since the collection will work with object references
// => only assigning "Max" to a variable and then remove that variable will work´for this case
console.log(anotherStorage.getItems());

