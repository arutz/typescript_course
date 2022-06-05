

const button = document.querySelector("#button") as HTMLButtonElement;
button.addEventListener("click", () => {
    console.log("Hallo Welt!");
});

button.addEventListener("mouseover", () => { console.log("dont do it!") });