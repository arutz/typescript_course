var button = document.querySelector("button");
var input1 = document.getElementById("num1")! as HTMLInputElement;
var input2 = document.getElementById("num2")! as HTMLInputElement;
var output = document.getElementById("output")! as HTMLDivElement;

function add(num1: number, num2: number) {
    return +num1 + +num2;
}

button.addEventListener("click", function() {
  let result = add(+input1.value, +input2.value)
  console.log(result);
  output.innerHTML = result.toLocaleString();
});
