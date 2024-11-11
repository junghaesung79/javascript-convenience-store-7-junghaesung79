import Printer from '../io/Printer.js';
import { isValidPeriod, sameNameWith } from '../utils/common.js';
import Promotion from './Promotion.js';

// batches: [{
//   name: string
//   price: number
//   quantity: number
//   promotion: Promotion{}
// }]

class Shelves {
  static #instance = null;
  #batches;

  constructor(batches = []) {
    if (Shelves.#instance) {
      return Shelves.#instance;
    }

    this.#batches = batches;
    Shelves.#instance = this;
    return this;
  }

  static arrangeStocks(stocks) {
    const arrangedStocks = this.#normalizeStocks(stocks);
    const emptyInsertedStocks = this.#insertEmptyStock(arrangedStocks);

    new Shelves(emptyInsertedStocks);
  }

  static #normalizeStocks(stocks) {
    return stocks.map(({ name, price, quantity, promotion }) => ({
      name,
      price: Number(price),
      quantity: Number(quantity),
      promotion: new Promotion(promotion),
    }));
  }

  static #insertEmptyStock(stocks) {
    // 프로모션 재고가 있는데 일반 재고가 없는 경우, 일반 재고 표시하기 위해 개수가 0인 일반 재고를 추가
    const isPromotionStockExistNotDefault = (stock, nextStock) => {
      const hasPromotion = stock.promotion.getName() !== '';
      const hasMatchingDefaultNext =
        nextStock && nextStock.name === stock.name && nextStock.promotion.getName() === '';

      return hasPromotion && !hasMatchingDefaultNext;
    };

    const indexToInsert = [];
    const stocksCopy = [...stocks];
    stocksCopy.forEach((stock, index) => {
      if (isPromotionStockExistNotDefault(stock, stocksCopy[index + 1])) indexToInsert.push(index);
    });

    indexToInsert.reverse().forEach((index) => {
      stocksCopy.splice(index + 1, 0, {
        name: stocksCopy[index].name,
        price: Number(stocksCopy[index].price),
        quantity: 0,
        promotion: new Promotion('null'),
      });
    });

    return stocksCopy;
  }

  static denormalizeStocks() {
    const toStringPromotion = (promotion) => {
      const name = promotion.getName();
      if (name === '') return 'null';
      return name;
    };

    return Shelves.#instance.#batches.map((stock) => ({
      name: stock.name,
      price: String(stock.price),
      quantity: String(stock.quantity),
      promotion: toStringPromotion(stock.promotion),
    }));
  }

  hasValidPeriodItem(name) {
    return this.#batches.filter(sameNameWith(name)).some(isValidPeriod());
  }

  takeItems(items) {
    const batches = this.#findBatches(items);
    const promotionCount = items.filter(isValidPeriod).length;

    batches[0].quantity -= promotionCount;
    if (batches.length > 1) {
      batches[1].quantity -= items.length - promotionCount;
    }
  }

  turnBackItems(items) {
    const batches = this.#findBatches(items);
    const promotionCount = items.filter(isValidPeriod).length;

    batches[0].quantity += promotionCount;
    if (batches.length > 1) {
      batches[1].quantity += items.length - promotionCount;
    }
  }

  #findBatches(items) {
    const targetBatches = this.#batches.filter((batch) => {
      return batch.name === items[0].name;
    });

    return [...targetBatches];
  }

  getBatches() {
    return [...this.#batches];
  }

  static clearInstance() {
    Shelves.#instance = null;
  }
}

export default Shelves;
