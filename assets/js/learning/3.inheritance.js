class Animal {
  brain = true;
  legs = 0;
  name = "unknown name";

  sleep() {
    console.log(`${this.name} is sleeping`);
    console.log(`${this.name} has ${this.legs} legs`);
  }
}

class Human extends Animal {
  name = "Alex";
  legs = 2;
}

class Pet extends Animal {
  legs = 4;
  fleas = 0;
}

class Cat extends Pet {
  fleas = 5;
}

class Dog extends Pet {
  fleas = 8;
}

const leo = new Human();
leo.sleep();

const kitty = new Cat();
console.log(kitty.fleas);

const breno = new Dog();
console.log(breno.fleas);
