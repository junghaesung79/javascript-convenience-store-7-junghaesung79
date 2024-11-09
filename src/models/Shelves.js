import { isValidPeriod, sameNameWith } from '../utils/common.js';

class Shelves {
  static #instance = null;
  #products;

  constructor(products) {
    if (Shelves.#instance) {
      return Shelves.#instance;
    }

    this.#products = [...products];
    Shelves.#instance = this;
    return this;
  }

  hasValidPeriodItem(name) {
    return products.filter(sameNameWith(name)).some(isValidPeriod);
  }

  bringItem(productName) {
    const indexToRemove = this.#products.findIndex(sameNameWith(productName));
    return this.#products.splice(indexToRemove, 1);
  }

  turnBackItems(items) {
    this.#products.push(...items);
  }

  getProducts() {
    return [...this.#products];
  }

  static clearInstance() {
    Shelves.#instance = null;
  }
}

export default Shelves;
