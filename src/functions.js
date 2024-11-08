import { ERROR_MESSAGES } from './cosntants/errorMessages.js';
import Product from './models/Product.js';
import Promotion from './models/Promotion.js';
import { sameNameWith } from './utils/common.js';

export const arrangeStocks = (stocks) => {
  // 프로모션 재고가 있는데 일반 재고가 없는 경우 일반 재고 0개로 추가
  // 프로모션 속성에 프로모션 객체 적용
  const indexToInsert = [];

  const products = stocks.map(({ name, price, quantity, promotion }, index) => {
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
    products.splice(index + 1, 0, {
      name: stocks[index].name,
      price: Number(stocks[index].price),
      quantity: 0,
      promotion: new Promotion('null'),
    });
  });

  return products;
};

export const formatOrder = (string) => {
  return string.split(',').map((phrase) => {
    const [name, quantity] = phrase.slice(1, -1).split('-');
    return {
      name,
      quantity: Number(quantity),
    };
  });
};

export const getProducts = (stocks) => {
  return stocks.flatMap((stock) => {
    return Array.from({ length: stock.quantity }, () => {
      delete stock.quantity;
      return new Product(stock);
    });
  });
};

export const addToCart = (orders, products) => {
  const cart = orders.map(({ name, quantity }) => {
    const bundle = products.filter(sameNameWith(name));

    if (bundle.length < quantity) throw new Error(ERROR_MESSAGES.overStock);

    if (!bundle[0].promotion.isValidPeriod()) bundle.reverse(); // 프로모션 기간이 아닌 경우 일반 재고를 먼저 사용합니다.

    return products.splice(products.findIndex(sameNameWith(name)), quantity);
  });

  return cart;
};

export const purchaseCartItems = (cart, products) => {
  const receipt = cart;

  cart.forEach((bundle) => {
    const thisPromotion = bundle[0].promotion;
    const buyGetSum = thisPromotion.getData().buy + thisPromotion.getData().get;

    if (thisPromotion.isValidPeriod()) {
      const 프로모션상품개수 = bundle.reduce(
        (acc, { promotion }) => acc + Number(promotion.isValidPeriod()),
        1,
      );

      const 미적용상품개수 = bundle.length - Math.floor(프로모션상품개수 / buyGetSum) * buyGetSum;
      products.push(bundle.splice(bundle.length - 미적용상품개수, 미적용상품개수));
      return;
    }
  });

  // 상품 제외
  // 상품 추가
  // 증정 적용
  // 영수증 생성

  return receipt;
};

export const isMembershiped = async () => {
  switch (answer) {
    case 'Y':
      return true;
    case 'N':
      return false;
    default:
      return false;
  }
};
