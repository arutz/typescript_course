// this is called a prototype object
const person: {
    name: string;
    age: number;
    hobbies: string[];
    role: [number,string] // define a tuple
} = { 
    name: "Achim Rutz",
    age: 38,
    hobbies: ["mountain biking", "swimming"],
    role: [1, "author"] // example of a tuple assignment
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

// arrays
let favoriteActivities: string[];
favoriteActivities = ["sports"];
console.log(favoriteActivities);

for(const hobby of person.hobbies) { // for each syntax
    console.log(hobby.toUpperCase());
}

// doing some stuff with tuples
person.role.push("developer"); // be careful since this works
person.role = [1, "author"]; // works
// person.role = [1, "author", "developer"]; // compile error!

// enums!
enum Role {
    ADMIN = 5,
    READ_ONLY = 0,
    AUTHOR = 1,
    UNKNOW
}

const person2 = { 
    name: "Achim Rutz",
    age: 38,
    role: Role.AUTHOR
};

console.log(person2.role); // logs: 1
console.log(Role.UNKNOW); // logs: 2 since it is the first available value

// any shenanigans!
let favoriteActivities2: any = ["1", 2, person]; // all is possible; but avoid this if possible since type safety is completely lost here

