import * as ERROR_MESSAGES from './cosntants/errorMessages.js';
import { sameNameWith } from './utils/common.js';
import { throwError } from './utils/errorHandler.js';

export const addToCart = (orders, products) => {
  const cart = orders.map(({ name, quantity }) => {
    const bundle = products.filter(sameNameWith(name));

    if (bundle.length < quantity) throwError(ERROR_MESSAGES.orders.overStock);

    if (!bundle[0].promotion.isValidPeriod()) bundle.reverse(); // 프로모션 기간이 아닌 경우 일반 재고를 먼저 사용합니다.

    return products.splice(products.findIndex(sameNameWith(name)), quantity);
  });

  return cart;
};

export const isMembershiped = (answer) => {
  switch (answer) {
    case 'Y':
      return true;
    case 'N':
      return false;
    default:
      return false;
  }
};
