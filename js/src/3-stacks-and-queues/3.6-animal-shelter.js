import { Queue } from '@dinosanjo/data-structures';

// An animal shelter, which holds only dogs and cats,
// operates on a strictly 'first in, first out' basis.
// People must adopt either the longest sheltered of all
// animals at the shelter, or they can select whether
// they would prefer a dog or a cat, and receive the
// longest sheltered animal of that type. They cannot
// select which specific animal they would like. Create
// the data structures to maintain this system and implement
// operations such as enqueue, dequeueAny, dequeueDog,
// and dequeueCat. You may use the built-in LinkedList data structure.

// Note: I already implemented the basic queue data structure
// in @dinosanjo/data-structures, so I am going to use that,
// given it satisfies the constraint, assuming doubly-linked list
// is fine to use.

export const AnimalType = {
  CAT: 'cat',
  DOG: 'dog',
};

export class AnimalShelter {

  constructor() {
    this.dogs_ = new Queue();
    this.cats_ = new Queue();
    this.rescueCount_ = 0;
  }

  rescue(animal) {
    const registeredAnimal = this.register_(animal, this.rescueCount_++);
    if (animal === AnimalType.CAT) {
      this.cats_.enqueue(registeredAnimal);
    }
    if (animal === AnimalType.DOG) {
      this.dogs_.enqueue(registeredAnimal);
    }
  }

  adopt() {
    const cat = this.cats_.peek();
    const dog = this.dogs_.peek();
    if (cat === null && dog === null) {
      return null;
    }
    if (cat === null) {
      return this.dogs_.dequeue();
    }
    if (dog === null) {
      return this.cats_.dequeue();
    }
    if (cat.rescueId < dog.rescueId) {
      return this.cats_.dequeue();
    }
    if (dog.rescueId < cat.rescueId) {
      return this.dogs_.dequeue();
    }
    throw 'animalShelter has corrupt rescue IDs';
  }

  adoptCat() {
    return this.cats_.dequeue();
  }

  adoptDog() {
    return this.dogs_.dequeue();
  }

  register_(animalType, rescueId) {
    return {
      animalType: animalType,
      rescueId: rescueId,
    };
  }

}
