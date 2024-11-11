import { sameNameWith } from '../utils/common.js';

class Promotion {
  static #promotions = [];

  static #DEFAULT_PROMOTION = {
    name: '',
    buy: 0,
    get: 0,
    startDate: new Date(0),
    endDate: new Date(0),
  };

  #data;

  constructor(name) {
    this.#data = this.#initializeData(name);
  }

  #initializeData(name) {
    if (name === 'null') {
      return { ...Promotion.#DEFAULT_PROMOTION };
    }

    const promotion = Promotion.getPromotions().find(sameNameWith(name));
    if (!promotion) {
      return { ...Promotion.#DEFAULT_PROMOTION };
    }

    const today = new Date();
    if (promotion.startDate <= today && promotion.endDate >= today) {
      return promotion;
    }

    promotion.name = '';
    return promotion;
  }

  static updatePromotions(informations) {
    this.#promotions = informations.map(this.#convertToPromotions);
  }

  static #convertToPromotions(information) {
    const { name, buy, get, start_date, end_date } = information;

    return {
      name,
      buy: Number(buy),
      get: Number(get),
      startDate: new Date(start_date),
      endDate: new Date(end_date),
    };
  }

  static getPromotions() {
    return [...this.#promotions];
  }

  isValidPeriod() {
    const today = new Date();
    return this.#isWithinPromotionPeriod(today);
  }

  #isWithinPromotionPeriod(date) {
    return this.#data.startDate <= date && this.#data.endDate >= date;
  }

  getPromotionData() {
    return {
      purchaseCount: this.#data.buy,
      giftCount: this.#data.get,
      packageSize: this.#data.buy + this.#data.get,
    };
  }

  getName() {
    return this.#data.name;
  }

  static clearPromotions() {
    Promotion.#promotions = [];
  }
}

export default Promotion;
