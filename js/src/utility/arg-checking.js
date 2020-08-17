
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
