import { Shelves } from '../models/index.js';
import { isValidPeriod, sameNameWith } from '../utils/common.js';

class PurchaseService {
  static purchase(order) {
    const bundles = this.#addToCart(order);
    return this.#categorizeByPromotion(bundles);
  }

  static #addToCart(orders) {
    const shelves = new Shelves();
    const batches = shelves.getBatches();

    return orders.map(({ name, quantity }) => {
      const products = batches
        .filter(sameNameWith(name))
        .flatMap(({ name, price, quantity: count, promotion }) => {
          return Array.from({ length: count }, () => ({ name, price, promotion }));
        });

      const bundle = products.splice(0, quantity);
      shelves.takeItems(bundle);
      return bundle;
    });
  }

  static #categorizeByPromotion(bundles) {
    return bundles.map((bundle) => {
      const { purchaseCount, packageSize } = bundle[0].promotion.getPromotionData();

      if (this.#행사중인물건이없을때(bundle) || this.#나누어떨어질때(bundle, packageSize)) {
        return { bundle, category: 'maintain' };
      }

      if (this.#더받을수있을때(bundle, packageSize, purchaseCount)) {
        return { bundle, category: 'add' };
      }

      return { bundle, category: 'remove' };
    });
  }

  static applyPromotions(bundles) {
    return bundles.map(({ category, bundle }) => {
      const { packageSize } = bundle[0].promotion.getPromotionData();
      switch (category) {
        case 'add':
          return this.#addItem(bundle, packageSize);
        case 'remove':
          return this.#removeItems(bundle, packageSize);
        default:
          return this.#changeStatus(bundle, packageSize);
      }
    });
  }

  static #addItem(bundle, packageSize) {
    const shelves = new Shelves();
    const newItem = { ...bundle[0] };
    shelves.takeItems([newItem]);
    bundle.unshift(newItem);
    return this.#changeStatus(bundle, packageSize);
  }

  static #removeItems(bundle, packageSize) {
    const shelves = new Shelves();
    const 프로모션상품개수 = bundle.filter(isValidPeriod).length;
    const 적용상품개수 = Math.floor(프로모션상품개수 / packageSize) * packageSize;
    const 미적용상품개수 = bundle.length - 적용상품개수;
    shelves.turnBackItems(bundle.splice(bundle.length - 미적용상품개수, 미적용상품개수));
    return this.#changeStatus(bundle, packageSize);
  }

  static #changeStatus(bundle, packageSize) {
    if (packageSize === 0) {
      return bundle.map((item) => ({ ...item, status: 'default' }));
    }

    const 프로모션상품개수 = bundle.filter(isValidPeriod).length;
    const 적용상품개수 = Math.floor(프로모션상품개수 / packageSize) * packageSize;

    return bundle.map((item, index) => {
      if (index >= 적용상품개수) {
        return { ...item, status: 'default' };
      }

      if (index % packageSize === packageSize - 1) {
        return { ...item, status: 'gifted' };
      }

      return { ...item, status: 'promotion applied' };
    });
  }

  static #행사중인물건이없을때(bundle) {
    return !bundle.some((item) => isValidPeriod(item));
  }

  static #나누어떨어질때(bundle, 행사묶음물건수) {
    return isValidPeriod(bundle[bundle.length - 1]) && bundle.length % 행사묶음물건수 === 0;
  }

  static #더받을수있을때(bundle, 행사묶음물건수, 몇개사면) {
    const shelves = new Shelves();

    return (
      bundle.length % 행사묶음물건수 === 몇개사면 && shelves.hasValidPeriodItem(bundle[0].name)
    );
  }
}

export default PurchaseService;
