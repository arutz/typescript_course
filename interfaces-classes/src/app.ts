// Code goes here!

function test() {
    console.log("test");
}

(document.querySelector("#button") as HTMLButtonElement).addEventListener("click", test.bind(this));
