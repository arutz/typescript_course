// this is called a prototype object
const person = { // we use type inference here; could also be expilictly defined like this: const person: {name: string; age: number;} ...
    name: "Achim Rutz",
    age: 38
};

console.log(person);
console.log(`My name is: ${person.name}`); // properties are available during compile type

// nested prototype objects are also possible
const product = {
    id: 'abc1',
    price: 12.99,
    tags: ['great-offer', 'hot-and-new'],
    details: {
      title: 'Red Carpet',
      description: 'A great carpet - almost brand-new!'
    }
  };

console.log(product);