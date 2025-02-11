class Animal {
  speak() {
    console.log("Pleas define either 'Duck' or 'Cat' to speak ");
  }
}

class Duck extends Animal {
  speak() {
    console.log("Quack");
  }
}

class Cat extends Animal {
  speak() {
    console.log("meow");
  }
}

const donald = new Animal();
donald.speak();

const tom = new Cat();
tom.speak();

const hewan = new Animal();
hewan.speak();
