import { sameNameWith } from '../utils/common';

class Promotion {
  static promotions = [];
  static #INACTIVE_DATES = {
    startDate: new Date(0),
    endDate: new Date(0),
  };

  #data;

  constructor(name) {
    if (name !== 'null') {
      this.#data = Promotion.getPromotions().find(sameNameWith(name));
      return;
    }

    this.#data = {
      name: '',
      buy: 0,
      get: 0,
      startDate: Promotion.#INACTIVE_DATES.startDate,
      endDate: Promotion.#INACTIVE_DATES.endDate,
    };
  }

  static updatePromotions(informations) {
    this.promotions = informations.map(this.#convertToPromotions);
  }

  static #convertToPromotions({ name, buy, get, start_date, end_date }) {
    return {
      name,
      buy: Number(buy),
      get: Number(get),
      startDate: new Date(start_date),
      endDate: new Date(end_date),
    };
  }

  static getPromotions() {
    return this.promotions;
  }

  isValidPeriod() {
    const today = new Date();
    return this.#data.start_date <= today && this.#data.end_date >= today;
  }

  getData() {
    return this.#data;
  }
}

export default Promotion;