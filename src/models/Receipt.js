import { MAX_MEMBERSHIP_DISCOUNT_AMOUNT } from '../cosntants/config.js';
import {
  calculateAmount,
  hasSomething,
  hasOwnStatus,
  isValidPeriod,
  sumOfProperty,
} from '../utils/common.js';

class Receipt {
  #bundles;
  #isMembershiped;

  constructor(bundles, isMembershiped) {
    this.#bundles = bundles;
    this.#isMembershiped = isMembershiped;

    return this.#generateReceipt();
  }

  #generateReceipt() {
    const items = this.#combineItems(this.#bundles);
    const gifts = this.#combineGifts(this.#bundles);
    const totalQuantity = this.#calculateTotalQualtity(items);
    const totalAmount = this.#calculateTotalAmount(items);
    const promotionDiscount = this.#calculatePromotionDiscount(gifts);
    const membershipDiscount = this.#calculateMembershipDiscount(
      this.#bundles,
      this.#isMembershiped,
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
    return bundles.map((bundle) => {
      return {
        name: bundle[0].name,
        quantity: bundle.length,
        amount: calculateAmount(bundle),
      };
    });
  }

  #combineGifts(bundles) {
    return bundles.filter(hasSomething(isValidPeriod)).map((bundle) => {
      const giftedItems = bundle.filter(hasOwnStatus('gifted'));
      return {
        name: giftedItems[0].name,
        quantity: giftedItems.length,
        amount: calculateAmount(giftedItems),
      };
    });
  }

  #calculateTotalQualtity(items) {
    return items.reduce(sumOfProperty('quantity'), 0);
  }

  #calculateTotalAmount(items) {
    return items.reduce(sumOfProperty('amount'), 0);
  }

  #calculatePromotionDiscount(gifts) {
    return gifts.reduce(sumOfProperty('amount'), 0);
  }

  #calculateMembershipDiscount(bundles, isMembershiped) {
    if (!isMembershiped) return 0;

    const defaultAmount = bundles.reduce((amount, bundle) => {
      return amount + calculateAmount(bundle.filter(hasOwnStatus('default')));
    }, 0);
    const discountAmount = defaultAmount * 0.3;

    return Math.min(discountAmount, MAX_MEMBERSHIP_DISCOUNT_AMOUNT);
  }
}

export default Receipt;
