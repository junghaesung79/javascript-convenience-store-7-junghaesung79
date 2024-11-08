import { ERROR_MESSAGES } from './cosntants/errorMessages.js';
import Product from './models/product.js';
import { sameNameWith } from './utils/common.js';

export const arrangeStocks = (stocks) => {
  // 프로모션 재고가 있는데 일반 재고가 없는 경우 일반 재고 0개로 추가
  // 프로모션 속성에 프로모션 객체 적용
  const indexToInsert = [];

  const products = stocks.map((p, index) => {
    p.price = Number(p.price);
    p.quantity = Number(p.quantity);
    if (p.promotion === 'null') {
      p.promotion = '';
    }

    if (p.promotion !== '' && stocks[index + 1].name !== p.name) {
      indexToInsert.push(index);
    }

    return p;
  });

  indexToInsert.reverse().forEach((index) => {
    products.splice(index + 1, 0, {
      name: stocks[index].name,
      price: stocks[index].price,
      quantity: 0,
      promotion: '',
    });
  });

  const productsExtendsPromotion = products.map((product) => {
    return {
      ...product,
      promotion: new Promotion(product.promotion);
    }
  })

  

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

export const purchase = (orders, stocks) => {
  const products = stocks.flatMap((stock) => {
    return Array.from({ length: stock.quantity }, () => {
      delete stock.quantity;
      return new Product(stock);
    });
  });

  const bascket = orders.map(({ name, quantity }) => {
    const bundle = products.filter(sameNameWith(name));

    if (bundle.length < quantity) throw new Error(ERROR_MESSAGES.overStock);
    if (bundle.some((product) => product.promotion !== '')) {
      products.splice(products.findIndex(sameNameWith(name)), quantity);
    }

    return { name, price, quantity, promotion };
  });

  return bascket;
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
