export const presentMenu = ({ menuName, price, quantity, promotionName }) => {
  return `- ${menuName} ${price} ${quantity} ${promotionName}`;
};

export const receiptMenu = ({ name, quantity, amount }) => {
  return `${name}\t\t${quantity}\t${amount}`;
};

export const giftMenu = ({ name, quantity }) => {
  return `${name}\t\t${quantity}`;
};

export const totalLine = (quantity, amount) => {
  return `총구매액\t${quantity}\t${amount}\n`;
};

export const promotionLine = (amount) => {
  return `행사할인\t\t-${amount}\n`;
};

export const membershipLine = (amount) => {
  return `멤버십할인\t\t-${amount}\n`;
};

export const paymentLine = (amount) => {
  return `내실돈\t\t${amount}\n`;
};
