import { AnimalShelter, AnimalType } from './3.6-animal-shelter';

describe('AnimalShelter', () => {

  let animalShelter = null;
  beforeEach(() => animalShelter = new AnimalShelter());

  describe('constructor', () => {

    test('creates a new AnimalShelter', () => {
      expect(new AnimalShelter()).toBeDefined();
    });

  });

  describe('rescue and adopt', () => {

    test('registers and enqueues both dogs and cats and dequeues in order of arrival', () => {
      animalShelter.rescue(AnimalType.DOG);
      animalShelter.rescue(AnimalType.CAT);
      animalShelter.rescue(AnimalType.DOG);
      animalShelter.rescue(AnimalType.CAT);
      expect(animalShelter.adopt().animalType).toBe(AnimalType.DOG);
      expect(animalShelter.adopt().animalType).toBe(AnimalType.CAT);
      expect(animalShelter.adopt().animalType).toBe(AnimalType.DOG);
      expect(animalShelter.adopt().animalType).toBe(AnimalType.CAT);
    });

    test('throws if rescue IDs become corrupt', () => {
      animalShelter.rescue(AnimalType.DOG);
      animalShelter.rescue(AnimalType.CAT);
      animalShelter.cats_.peek().rescueId = 0;
      expect(() => animalShelter.adopt()).toThrow('animalShelter has corrupt rescue IDs');
    });

  });

  describe('adopt methods', () => {

    test('return null if animalShelter is empty', () => {
      expect(animalShelter.adopt()).toBeNull();
      expect(animalShelter.adoptCat()).toBeNull();
      expect(animalShelter.adoptDog()).toBeNull();
    });

    test('returns the only dog in the shelter', () => {
      animalShelter.rescue(AnimalType.DOG);
      expect(animalShelter.adopt().animalType).toBe(AnimalType.DOG);
    });

    test('returns the only cat in the shelter', () => {
      animalShelter.rescue(AnimalType.CAT);
      expect(animalShelter.adopt().animalType).toBe(AnimalType.CAT);
    });

  });

  describe('adoptCat', () => {

    test('dequeues the longest sheltered cat', () => {
      animalShelter.rescue(AnimalType.CAT);
      animalShelter.rescue(AnimalType.DOG);
      animalShelter.rescue(AnimalType.CAT);
      animalShelter.rescue(AnimalType.DOG);
      expect(animalShelter.adoptCat().rescueId).toBe(0);
      expect(animalShelter.adoptCat().rescueId).toBe(2);
    });

  });

  describe('adoptDog', () => {

    test('dequeues the longest sheltered cat', () => {
      animalShelter.rescue(AnimalType.DOG);
      animalShelter.rescue(AnimalType.CAT);
      animalShelter.rescue(AnimalType.DOG);
      animalShelter.rescue(AnimalType.CAT);
      expect(animalShelter.adoptDog().rescueId).toBe(0);
      expect(animalShelter.adoptDog().rescueId).toBe(2);
    });

  });

});
