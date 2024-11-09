import { hasSomething, isValidPeriod } from "../utils/common.js"

class Receipt {
  constructor(bundles, isMembershiped) {
    return {
      items: this.#combineItems(bundles),
      gifts: this.#combineGiftes(bundles),
      calculations: {
        totalQuantity: ,
        totalAmount: ,
        promotionDiscount: ,
        membershipDiscount: ,
        payment: ,
      }
    }
  }

  #combineItems(bundles) {
    return bundles.map((bundle) => {
      return {
        name: bundle[0],
        quantity: bundle.length,
        amount: bundle[0].price * bundle.length,
      }
    })
  }

  #combineGiftes(bundles) {
    return bundles.filter(hasSomething(isValidPeriod)).map((bundle) => {
      const giftedItems = bundle.filter(isValidPeriod);
      return {
        name: giftedItems[0].name,
        quantity: giftedItems.length,
      }
    })
  }
}

export default Receipt;
