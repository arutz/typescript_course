// fun with interfaces and classes

class Department {

    static FISCAL_YEAR = 2020;

    protected _employees: string[] = [];
    public get employees(): string[] {
        return this._employees;
    }

    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }

    public get id(): number {
        return this._id;
    }

    constructor(private readonly _id:number, private _name:string) {
        console.log(`new department: ${Department.FISCAL_YEAR}`);
    }

    toString() {
        return `[${this.constructor.name} id:${this.id} name:${this.name} employees:${this._employees}]`;
    }
};

class ITDepartment extends Department {
    public get admins(): string[] {
        return this._admins;
    }
    public set admins(value: string[]) {
        this._admins = value;
    }

    constructor(_id:number, private _admins: string[]) {
        super(_id, "IT Department");
    }

    toString() {
        let description= super.toString();
        return description.substring(0, description.length-1).concat(` admins:${this._admins}]`)
    }
}

let dep = new Department(1337, "Development");
let itDep = new ITDepartment(4, ["Achim"]);
console.log(dep.toString());
console.log(itDep.toString());
const accountCopy = { name: "Xyz", id: 5, describe: dep.toString, _employees: ["Max", "Moritz"] };

console.log(accountCopy.describe());

document.querySelector("#button")?.addEventListener("click", () => {
    console.log("button pressed");
});

