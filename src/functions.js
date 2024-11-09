import { ERROR_MESSAGES } from './cosntants/errorMessages.js';
import Product from './models/Product.js';
import Promotion from './models/Promotion.js';
import { sameNameWith } from './utils/common.js';

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
      // return new Product(stock);
      return stock;
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

const 행사적용 = (bundle, setForPromotion) => {
  const after = [];
  const 프로모션상품개수 = bundle.filter(({ promotion }) => promotion.isValidPeriod()).length;
  const 적용세트수 = Math.floor(프로모션상품개수 / setForPromotion) * setForPromotion;
  for (let i = 0; i < bundle.length; i += 1) {
    if (i < 적용세트수) {
      if (i % setForPromotion === 0) {
        bundle[i].status = 'gifted';
        after.push(bundle[i]);
      }

      bundle[i].status = 'promotion applied';
      after.push(bundle[i]);
    }

    bundle[i].status = 'default';
    after.push(bundle[i]);
  }

  return after;
};

export const purchaseCartItems = (cart, products) => {
  const receipt = cart.flatMap((bundle) => {
    const thisPromotion = bundle[0].promotion;
    const { buyForPromotion, getForPromotion, setForPromotion } = thisPromotion.getPromotionData();

    if (
      // 행사 중인 거 없을 때 결제
      !bundle[0].promotion.isValidPeriod()
    ) {
      bundle.map((item) => {
        item.status = 'default';
        return item;
      });
    }

    if (
      //  나누어 떨어질 때 결제
      bundle[bundle.length - 1].promotion.isValidPeriod() &&
      bundle.length % setForPromotion === 0
    ) {
      행사적용(bundle, setForPromotion);
    }

    if (
      // 증정에 필요한 만큼 샀고, 재고에 행사중인 상품이 있을 때 추가 여부 물음
      bundle.length % setForPromotion === buyForPromotion &&
      products.filter(sameNameWith(bundle[0].name)).some((e) => e.promotion.isValidPeriod())
    ) {
      bundle.unshift(products.splice(products.findIndex(sameNameWith(bundle[0].name)), 1));
    }

    // 이외 경우 제외 여부 물음
    const 프로모션상품개수 = bundle.filter(({ promotion }) => promotion.isValidPeriod()).length;

    const 적용상품개수 = Math.floor(프로모션상품개수 / setForPromotion) * setForPromotion;
    const 미적용상품개수 = bundle.length - 적용상품개수;
    products.push(bundle.splice(bundle.length - 미적용상품개수, 미적용상품개수));
    행사적용(bundle, setForPromotion);

    return;
  });

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
