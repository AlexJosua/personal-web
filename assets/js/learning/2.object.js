//PascalCase
class Dog {
  constructor(
    // properties
    name = "",
    color = "",
    eyeColor = "",
    height = 0,
    length = 0,
    weight = 0
  ) {
    this.name = name;
    this.color = color;
    this.eyeColor = eyeColor;
    this.height = height;
  }

  //method
  sit() {
    console.log(`${this.name} Is sitting`);
  }

  layDown() {
    console.log("Dog Is Laying down");
  }
}

let bobby = new Dog("Bobby", "white", "black", 30);
console.log(bobby.name);
console.log(bobby.height);

bobby.sit();
