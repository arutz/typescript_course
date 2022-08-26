/*      first decorator examples */

function Logger(constructor: Function) {
    console.log("Logging...");
    console.log(constructor);
}

@Logger // note that the Logger decorator / function is executed before the constructor log and would even be called
// without any instantiation => decorators execute when class is defined
class Person {
    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }

    constructor(private _name: string) {
        console.log(`created person ${_name}`);
    }
} 

const max = new Person("Max"); 