/*      first decorator examples */

function Logger(logMessage:string) { // a factory function for the decorator function
    console.log("Logger");
    return function(constructor: any) { // the actual decorator function
        console.log(logMessage);
        console.log(constructor);
    }
}

@Logger("Logging - Person") // note that the Logger decorator / function is executed before the constructor log and would even be called
// without any instantiation => decorators execute when class is defined
@WithTemplate("Person initiated: ","contentContainer")
// NOTE: the decorators functions are executed from the bottom up (first @WithTemplate then @Logger) while the factory functions get executed from top down
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

// a hook based decorator that will display content on the page for the decorated class using a template and content container id
function WithTemplate(template:string, hookId: string) {
    console.log("WithTemplate");
    return function<T extends {new(...args:any[]): {name:string}}>(originalConstructor: T) { // by using a generic type here we can use the decorator on
        return class extends originalConstructor{
            constructor(..._/* NOTE: we use "_" to indicate that we know and ignore that a variable is not used */:any[]) {
                super();
                console.log("further code!!!"); // we effectively extended and changed the original annotated class constructor!
                // any class constructor (with any amount of parameters) with a "name" property
                const element = document.getElementById(hookId);
                const p = new originalConstructor();
                if(element) {
                    element.innerHTML = template + p.name;
                }
            }
        }
    }
}

/*      Differing type of Decorators */
class Product {
    @PropertyLog
    private _title:string;
    private _price:number;

    @AccessorLog
    public get price(): number {
        return this._price;
    }
    public set price(value: number) {
        if(value > 0) {
            this._price = value;
        } else throw new Error("price must be positive");
    }
    public get title(): string {
        return this._title;
    }
    public set title(@ParameterLog value: string) {
        this._title = value;
    }

    @MethodLog
    public calculateNet() {
        return this.price * 1.19;
    }

    constructor(title: string,  price: number) {
        this._price = price;
        this._title = title;
    }
} 

function PropertyLog(target: any, propertyName: string|Symbol) { // => decorator for a class property
    console.log("Property decorator");
    console.log(target, propertyName);
} 
function AccessorLog(target:any, propertyName: string, descriptor:PropertyDescriptor) { // => decorator for an accessor method
    console.log("Accessor decorator");
    console.log(target);
    console.log(propertyName);
    console.log(descriptor);
}
function MethodLog(target:any, name:string|Symbol, descriptor:PropertyDescriptor) { // => decorator for a method
    console.log("Method decorator");
    console.log(target);
    console.log(name);
    console.log(descriptor);
}
function ParameterLog(target:any, name:string|Symbol, position: number) { // => decorator for a method parameter
    console.log("Parameter decorator");
    console.log(target);
    console.log(name);
    console.log(position);
}

var product1 = new Product("Router", 450.00);

/*      example for overwriting the behvaiour of annotated object along the PropertyDescriptor of the annotation constructor */

function Autobind(_target: any, _methodName : string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const adjDescrisptor: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            // the following will always bind the annotated function to the initial annotated object
            // regardless if we used a "...bind(x)" for the delegate or not; this is because in the
            // context of the property descriptor "this" always refers to the annotated target
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    }
    return adjDescrisptor;
}

class Printer {
    message = "This works";

    @Autobind
    showMessage() {
        console.log(this.message);
    }

    showMessageUnbound() {
        console.log(this.message);
    }
}

const p = new Printer();

const button = document.querySelector("button")!;
button.addEventListener("click", p.showMessage); // => no need to call the p.showMessage.bind(p)
// method here since we use the @Autobind decorator which overwrites the "this" context to the annotated target regardless of delegate context
button.addEventListener("click", p.showMessageUnbound.bind(p)); // will only work since we use the bind call to the Person object instance
// => in effect we will print "message" two times here

/*      Validation with decorators */
interface ValidatorConfig {
    [property: string]: {
        [validateProp: string]:string[]
    }
}

const registeredValidators: ValidatorConfig = {};

function Required(target:any, propertyName: string) {
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        [propertyName]:["required"]
    };
}

function PositiveNumber(target:any, propertyName: string) {
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        [propertyName]:["positive"]
    };
}

function validate(obj:any) {
    const objValidatorConfig = registeredValidators[obj.constructor.name];
    if(!objValidatorConfig) {
        return true;
    }
    let valid = true;
    for(const prop in objValidatorConfig) {
        for(const validator of objValidatorConfig[prop]) {
            switch(validator) {
                case "required":
                    valid = valid && !!obj[prop];
                    break;
                case "positive":
                    valid = valid && obj[prop] > 0;
                    break;
            }
        }
    }
    return valid;
}

class Course {
    @Required
    title: string;
    @PositiveNumber
    price: number;

    constructor(t: string, p:number) {
        this.title = t;
        this.price = p;
    }
}

console.log(registeredValidators);

const courseForm = document.querySelector("#courseForm");
courseForm?.addEventListener("submit", event => {
    event.preventDefault();
    const titleEl = document.getElementById("title") as HTMLInputElement;
    const priceEl = document.getElementById("price") as HTMLInputElement;
    const title = titleEl.value;
    const price = +priceEl.value;
    const createdCourse = new Course(title, price);
    if(validate(createdCourse)) {
        console.log(createdCourse);
    } else {
        alert("validation error");
    }
});