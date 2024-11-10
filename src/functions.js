import * as ERROR_MESSAGES from './cosntants/errorMessages.js';
import Promotion from './models/Promotion.js';
import { sameNameWith } from './utils/common.js';
import { throwError } from './utils/validate.js';

export const arrangeStocks = (stocks) => {
  // 프로모션 재고가 있는데 일반 재고가 없는 경우 일반 재고 0개로 추가
  // 프로모션 속성에 프로모션 객체 적용
  const indexToInsert = [];

  const arrangedStocks = stocks.map(({ name, price, quantity, promotion }, index) => {
    if (promotion !== 'null' && stocks[index + 1].name !== name) {
      indexToInsert.push(index);
    }

    return {
      name,
      price: Number(price),
      quantity: Number(quantity),
      promotion: new Promotion(promotion),
    };
  });

  indexToInsert.reverse().forEach((index) => {
    arrangedStocks.splice(index + 1, 0, {
      name: stocks[index].name,
      price: Number(stocks[index].price),
      quantity: 0,
      promotion: new Promotion('null'),
    });
  });

  return arrangedStocks;
};

export const getProducts = (stocks) => {
  return stocks.flatMap((stock) => {
    return Array.from({ length: stock.quantity }, () => {
      delete stock.quantity;
      // return new Product(stock);
      return stock;
    });
  });
};

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
