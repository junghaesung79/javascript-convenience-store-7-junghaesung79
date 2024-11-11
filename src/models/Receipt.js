import {
  calculateAmount,
  hasSomething,
  hasOwnStatus,
  isValidPeriod,
  sumOfProperty,
  isValidBundle,
} from '../utils/common.js';
import { CONFIG } from '../constants/index.js';

class Receipt {
  #bundles;
  #hasMembership;

  constructor(bundles, hasMembership) {
    this.#bundles = bundles;
    this.#hasMembership = hasMembership;

    return this.#generateReceipt();
  }

  #generateReceipt() {
    const items = this.#combineItems(this.#bundles);
    const gifts = this.#combineGifts(this.#bundles);
    const totalQuantity = this.#calculateTotalQuantity(items);
    const totalAmount = this.#calculateTotalAmount(items);
    const promotionDiscount = this.#calculatePromotionDiscount(gifts);
    const membershipDiscount = this.#calculateMembershipDiscount(
      this.#bundles,
      this.#hasMembership,
    );
    const payment = totalAmount - (promotionDiscount + membershipDiscount);

    return {
      items,
      gifts,
      calculations: {
        totalQuantity,
        totalAmount,
        promotionDiscount,
        membershipDiscount,
        payment,
      },
    };
  }

  #combineItems(bundles) {
    return bundles.filter(isValidBundle).map((bundle) => {
      return {
        name: bundle[0].name,
        quantity: bundle.length,
        amount: calculateAmount(bundle),
      };
    });
  }

  #combineGifts(bundles) {
    return bundles
      .filter(hasSomething(isValidPeriod))
      .map((bundle) => {
        const giftedItems = bundle.filter(hasOwnStatus('gifted'));
        if (giftedItems.length === 0) return null;
        return {
          name: giftedItems[0].name,
          quantity: giftedItems.length,
          amount: calculateAmount(giftedItems),
        };
      })
      .filter(Boolean); // null 값 제거
  }

  #calculateTotalQuantity(items) {
    return items.reduce(sumOfProperty('quantity'), 0);
  }

  #calculateTotalAmount(items) {
    return items.reduce(sumOfProperty('amount'), 0);
  }

  #calculatePromotionDiscount(gifts) {
    return gifts.reduce(sumOfProperty('amount'), 0);
  }

  #calculateMembershipDiscount() {
    if (!this.#hasMembership) return 0;

    const defaultAmount = this.#bundles.reduce((amount, bundle) => {
      return amount + calculateAmount(bundle.filter(hasOwnStatus('default')));
    }, 0);
    const discountAmount = defaultAmount * 0.3;

    return Math.min(discountAmount, CONFIG.maxMembershipDiscountAmount);
  }
}

export default Receipt;
