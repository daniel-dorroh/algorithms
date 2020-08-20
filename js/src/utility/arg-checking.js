import { SingleList } from '@dinosanjo/data-structures';

export const throwIfNotType = (input, type, name = 'input') => {
  if (typeof input !== type) {
    throw `${name} is ${typeof input} but should be a ${type}`;
  }
};

export const throwIfNotArray = (input, name = 'input') => {
  if (!Array.isArray(input)) {
    throw `${name} is not an array`;
  }
};

export const throwIfNotList = (input, name = 'input') => {
  if (!(input instanceof SingleList)) {
    throw `${name} is not a SingleList`;
  }
}
