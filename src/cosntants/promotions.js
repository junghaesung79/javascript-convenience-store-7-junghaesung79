const onePlusOne = Object.freeze({
  buy: 1,
  get: 1,
});

const twoPlusOne = Object.freeze({
  buy: 2,
  get: 1,
});

export const PROMOTION_KIND = Object.freeze({
  '탄산2+1': twoPlusOne,
  MD추천상품: onePlusOne,
  반짝할인: onePlusOne,
});
