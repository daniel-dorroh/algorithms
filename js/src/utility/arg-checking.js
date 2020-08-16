
export const throwIfNotType = (input, type) => {
  if (typeof input !== type) {
    throw `input is ${typeof input} but should be a ${type}`;
  }
};
