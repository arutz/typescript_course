// #region decorators
function Autobind(_target: any, _methodName : string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    }
    return adjDescriptor;
}
// #endregion

// #region cache

interface ProjectCache {
    [property: string]:Project
}

var projectCache:ProjectCache = {};

//#endregion

// #region input classes
class ProjectInput {
    private _templateElement: HTMLTemplateElement;
    public get templateElement(): HTMLTemplateElement {
        return this._templateElement;
    }
    public set templateElement(value: HTMLTemplateElement) {
        this._templateElement = value;
    }
    private _hostElement: HTMLDivElement;
    public get hostElement(): HTMLDivElement {
        return this._hostElement;
    }
    public set hostElement(value: HTMLDivElement) {
        this._hostElement = value;
    }
    private _element: HTMLElement;
    public get element(): HTMLElement {
        return this._element;
    }
    public set element(value: HTMLElement) {
        this._element = value;
    }
    private _titleInputElement: HTMLInputElement;
    public get titleInputElement(): HTMLInputElement {
        return this._titleInputElement;
    }
    public set titleInputElement(value: HTMLInputElement) {
        this._titleInputElement = value;
    }
    private _descriptionInputElement: HTMLInputElement;
    public get descriptionInputElement(): HTMLInputElement {
        return this._descriptionInputElement;
    }
    public set descriptionInputElement(value: HTMLInputElement) {
        this._descriptionInputElement = value;
    }
    private _peopleNumberInputElement: HTMLInputElement;
    public get peopleNumberInputElement(): HTMLInputElement {
        return this._peopleNumberInputElement;
    }
    public set peopleNumberInputElement(value: HTMLInputElement) {
        this._peopleNumberInputElement = value;
    }

    constructor() {
        this._templateElement = <HTMLTemplateElement>document.getElementById("project-input")!;
        this._hostElement = <HTMLDivElement>document.getElementById("app")!;
        const importedNode = document.importNode(this.templateElement.content, true);
        this._element = importedNode.firstElementChild as HTMLFormElement;
        this.element.id = "user-input";
        this._titleInputElement = <HTMLInputElement>this.element.querySelector("#title");
        this._descriptionInputElement = <HTMLInputElement>this.element.querySelector("#description");
        this._peopleNumberInputElement = <HTMLInputElement>this.element.querySelector("#people");

        this.configure(); // setup internal logic for event handling
        this.attach(); // will cause the actual render
    }

    private clearInputs() {
        this.titleInputElement.value = "";
        this.descriptionInputElement.value = "";
        this.peopleNumberInputElement.value = "0";
    }

    private configure() {
        this.element.addEventListener("submit",this.handleSubmit);
    }

    @Autobind
    private handleSubmit(event:Event) {
        // code for submit goes here
        event.preventDefault();
        const newProject = this.getUserInput();
        projectCache[newProject.title] = newProject;
        new ProjectDisplay(newProject);
        console.log(projectCache);
        this.clearInputs();
    }

    private getUserInput(): Project {
        const title = this.titleInputElement.value;
        const description = this.descriptionInputElement.value;
        const peopleNumber = +this.peopleNumberInputElement.value;
        if(title.trim().length == 0 || description.trim().length == 0 || peopleNumber == 0) {
            throw new Error("Validation Error occured");
        }
        const newProject = new Project(title, description, peopleNumber);
        return newProject;
    }

    private attach() {
        this.hostElement.insertAdjacentElement("afterbegin", this.element); // will insert the template element at beginning
    }
}

class Project {
    private _title: string;
    public get title(): string {
        return this._title;
    }
    public set title(value: string) {
        this._title = value;
    }
    private _description: string;
    public get description(): string {
        return this._description;
    }
    public set description(value: string) {
        this._description = value;
    }
    private _peopleNumber: number;
    public get peopleNumber(): number {
        return this._peopleNumber;
    }
    public set peopleNumber(value: number) {
        this._peopleNumber = value;
    }

    constructor(title:string, description:string,peopleNumber:number) {
        this._title = title;
        this._description = description;
        this._peopleNumber = peopleNumber;
    }
}

class ProjectDisplay {
    private templateElement: HTMLTemplateElement;
    private hostElement: HTMLDivElement;
    private element: HTMLElement;
    private titleHeading:HTMLHeadingElement;
    private descriptionElement: HTMLParagraphElement;
    private participantsElement:HTMLParagraphElement;
    
    constructor(project:Project) {
        this.templateElement = <HTMLTemplateElement>document.getElementById("single-project-section")!;
        this.hostElement = <HTMLDivElement>document.getElementById("app")!;
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild as HTMLDivElement;
        this.element.id = `project-${project.title}`;
        this.titleHeading = <HTMLHeadingElement>this.element.querySelector(".title")!;
        this.descriptionElement = <HTMLParagraphElement>this.element.querySelector(".description")!;
        this.participantsElement = <HTMLParagraphElement>this.element.querySelector(".participants")!;
        this.initValues(project);
        this.attach(); // will cause the actual render
    }

    private initValues(project:Project) {
        this.titleHeading.innerHTML = project.title;
        this.descriptionElement.innerHTML = project.description;
        this.participantsElement.innerHTML = project.peopleNumber.toString();
    }

    private attach() {
        this.hostElement.insertAdjacentElement("beforeend", this.element); // will insert the template element at beginning
    }
}

//#endregion

const projectInput = new ProjectInput();