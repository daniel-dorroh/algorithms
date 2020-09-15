
// Make a function that adds two numbers but can accept the arguments in ways like these:
// add(a, b)
// add(a)(b)
// add()()(a,b)
// add()(a)()()()(b)

export const add = (a, b) => {
  if (typeof a === 'number' && typeof b === 'number') {
    return a + b;
  } else if (typeof a === 'number') {
    return (c) => add(a, c);
  }
  return add;
};
