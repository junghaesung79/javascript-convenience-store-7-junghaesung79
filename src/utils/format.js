export const koreanWon = (price) => {
  return price.toLocaleString('ko-KR') + '원';
};

export const quanttityUnit = (quantity) => {
  if (quantity === 0) return '재고 없음 ';
  return `${quantity}개 `;
};
