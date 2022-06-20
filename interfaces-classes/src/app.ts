// fun with interfaces and classes

class Department {
    private _name: string = "";

    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }

    private _id: number = -1;

    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }

    // #region builders

    public bName(value: string): Department {
        this.name = value;
        return this;
    }

    public bId(value: number): Department {
        this.id = value;
        return this;
    }

    // #endregion builders
};

let dep = new Department().bName("Development").bId(1337);


console.log(dep);

document.querySelector("#button")?.addEventListener("click", () => {
    console.log("button pressed");
});

