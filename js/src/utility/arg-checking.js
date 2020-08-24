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

export const throwIfNotList = (list, name = 'list') => {
  if (!(list instanceof SingleList)) {
    throw `${name} is not a SingleList`;
  }
};

export const throwIfNullOrUndefined = (input, name = 'input') => {
  if (input === undefined || input === null) {
    throw `${name} is ${input}`;
  }
};
