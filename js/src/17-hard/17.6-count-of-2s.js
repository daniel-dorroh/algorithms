const getTwoCount = (i, solutions) => {
  let count = 0;
  if (solutions.has(i)) {
    return solutions.get(i);
  }
  const lsd = i % 10;
  if (lsd === 2) {
    count++;
  }
  const next = Math.floor(i / 10);
  if (next === 0) {
    return count;
  }
  let result = count + getTwoCount(next, solutions);
  solutions.set(i, result);
  return result;
};

export const countTwos = (n) => {
  let count = 0;
  const solutions = new Map();
  for (let i = 0; i <= n; i++) {
    count += getTwoCount(i, solutions);
  }
  return count;
};

