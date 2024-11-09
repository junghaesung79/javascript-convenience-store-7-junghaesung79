import Shelves from '../models/Shelves.js';
import { isValidPeriod, sameNameWith } from '../utils/common.js';

class PurchaseService {
  constructor() {
    this.shelves = new Shelves();
  }

  static purchaseCartItems(cart) {
    const receipt = cart.flatMap((bundle) => {
      const thisPromotion = bundle[0].promotion;
      const { buy: 몇개사면, sumOfBuyGet: 행사묶음물건수 } = thisPromotion.getPromotionData();

      if (this.#행사중인물건이없을때(bundle)) {
        return this.#행사적용(bundle, 행사묶음물건수)();
      }

      if (this.#나누어떨어질때(bundle, 행사묶음물건수)) {
        return this.#행사적용(bundle, 행사묶음물건수);
      }

      if (this.#더받을수있을때(bundle, 행사묶음물건수, 몇개사면)) {
        // 추가 여부 물음
        bundle.unshift(Shelves.bringItem(bundle[0].name));
        return this.#행사적용(bundle, 행사묶음물건수);
      }

      // 제외 여부 물음
      const 프로모션상품개수 = bundle.filter(this.isValidPeriod).length;
      const 적용상품개수 = Math.floor(프로모션상품개수 / 행사묶음물건수) * 행사묶음물건수;
      const 미적용상품개수 = bundle.length - 적용상품개수;
      Shelves.turnBackItems(bundle.splice(bundle.length - 미적용상품개수, 미적용상품개수));
      return this.#행사적용(bundle, 행사묶음물건수);
    });

    return receipt;
  }

  static #행사적용(bundle, 행사묶음물건수) {
    if (행사묶음물건수 === 0) {
      return bundle.map((item) => ({ ...item, status: 'default' }));
    }

    const 프로모션상품개수 = bundle.filter(isValidPeriod).length;
    const 적용세트수 = Math.floor(프로모션상품개수 / 행사묶음물건수) * 행사묶음물건수;

    return bundle.map((item, index) => {
      if (index >= 적용세트수) {
        return { ...item, status: 'default' };
      }

      if (index % promotionUnitCount === 0) {
        return { ...item, status: 'gifted' };
      }

      return { ...item, status: 'promotion applied' };
    });
  }

  static #행사중인물건이없을때(items) {
    return items.any((item) => isValidPeriod(item));
  }

  static #나누어떨어질때(bundle, 행사묶음물건수) {
    return this.isValidPeriod(bundle[bundle.length - 1]) && bundle.length % 행사묶음물건수 === 0;
  }

  static #더받을수있을때(bundle, 행사묶음물건수, 몇개사면) {
    return (
      bundle.length % 행사묶음물건수 === 몇개사면 && Shelves.hasValidPeriodItem(bundle[0].name)
    );
  }
}

export default PurchaseService;
