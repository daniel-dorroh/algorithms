
export const throwIfNotType = (input, type, name = 'input') => {
  if (typeof input !== type) {
    throw `${name} is ${typeof input} but should be a ${type}`;
  }
};
