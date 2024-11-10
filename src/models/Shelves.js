import { isValidPeriod, sameNameWith } from '../utils/common.js';
import Promotion from './Promotion.js';

class Shelves {
  static #instance = null;
  #bundles;

  constructor() {
    if (Shelves.#instance) {
      return Shelves.#instance;
    }

    Shelves.#instance = this;
    return this;
  }

  static arrangeStocks(stocks) {
    const arrangedStocks = this.#convertToStocks(stocks);
    const emptyInsertedStocks = this.#insertEmptyStock(arrangedStocks);
    return new Shelves(emptyInsertedStocks);
  }

  static #convertToStocks(stocks) {
    return stocks.map(({ name, price, quantity, promotion }) => ({
      name,
      price: Number(price),
      quantity: Number(quantity),
      promotion: new Promotion(promotion),
    }));
  }

  static #insertEmptyStock(stocks) {
    // 프로모션 재고가 있는데 일반 재고가 없는 경우, 일반 재고 표시하기 위해 개수가 0인 일반 재고를 추가
    const isPromotionStockExistNotDefault = (stock) => {
      return stock.promotion !== 'null' && stocksCopy[index + 1]?.name !== stock.name;
    };

    const indexToInsert = [];
    const stocksCopy = [...stocks];
    stocksCopy.forEach((stock, index) => {
      if (isPromotionStockExistNotDefault(stock)) indexToInsert.push(index);
    });

    indexToInsert.reverse().forEach((index) => {
      arrangedStocks.splice(index + 1, 0, {
        name: stocksCopy[index].name,
        price: Number(stocksCopy[index].price),
        quantity: 0,
        promotion: new Promotion('null'),
      });
    });
  }

  hasValidPeriodItem(name) {
    return this.#bundles.filter(sameNameWith(name)).some(isValidPeriod());
  }

  bringOneItem(name) {
    const bundle = this.#bundles.find(sameNameWith(name));
    bundle.quantity -= 1;

    return {
      name: bundle.name,
      price: bundle.price,
      promotion: bundle.promotion,
    };
  }

  turnBackItems(items) {
    const promotionCount = items.filter(isValidPeriod).length;
    const promotionBundleIndex = this.#bundles.findIndex((bundle) => {
      return bundle.name === items[0].name && isValidPeriod(bundle);
    });

    const promotionBundle = this.#bundles[promotionBundleIndex];
    const defaultBundle = this.#bundles[promotionBundleIndex + 1];
    promotionBundle.quantity += promotionCount;
    defaultBundle.quantity += items.length - promotionCount;
  }

  getBundles() {
    return [...this.#bundles];
  }

  static clearInstance() {
    Shelves.#instance = null;
  }
}

export default Shelves;
