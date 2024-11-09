export const sameNameWith = (inputName) => {
  return (product) => product.name === inputName;
};

export const isValidPeriod = (item) => {
  return item.promotion.isValidPeriod();
};

export const hasSomething = (fn) => {
  return (items) => items.some(fn);
};
