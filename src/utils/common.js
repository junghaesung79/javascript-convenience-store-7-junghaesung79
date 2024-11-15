export const sameNameWith = (inputName) => {
  return (item) => item.name === inputName;
};

export const isValidPeriod = (item) => {
  return item.promotion.isValidPeriod();
};

export const hasSomething = (fn) => {
  return (items) => items.some(fn);
};

export const calculateAmount = (items) => {
  if (items.length === 0) return 0;
  return items[0].price * items.length;
};

export const hasOwnStatus = (status) => {
  return (item) => item.status === status;
};

export const sumOfProperty = (property) => {
  return (acc, cur) => acc + cur[property];
};

export const isValidBundle = (bundle) => {
  return bundle && bundle.length > 0;
};
