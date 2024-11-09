export const sameNameWith = (inputName) => {
  return (product) => product.name === inputName;
};

export const isValidPeriod = (item) => {
  return item.promotion.isValidPeriod();
};
