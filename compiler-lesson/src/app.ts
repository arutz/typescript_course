

const button = document.querySelector("#button") as HTMLButtonElement;

function sayHelloWorld() {
    console.log("Hallo Welt!");
}

function warnMouseOver() {
    console.log("dont do it!");
}

button.addEventListener("click", sayHelloWorld.bind(this));

button.addEventListener("mouseover", warnMouseOver.bind(this));