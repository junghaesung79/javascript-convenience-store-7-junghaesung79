import { MESSAGES, RECEIPT_MESSAGES } from '../constants/messages.js';
import Printer from '../io/Printer.js';
import * as format from '../utils/formatters.js';
import * as unit from '../utils/units.js';

class OutputView {
  static printIntroduce() {
    Printer.print(MESSAGES.introduce);
  }

  static printStocks(stocks) {
    const paragraph = stocks.reduce((acc, { name, price, quantity, promotion }) => {
      const line = format.presentMenu({
        menuName: name,
        price: unit.koreanWon(price),
        quantity: unit.quantity(quantity),
        promotionName: promotion.getName(),
      });

      return acc + line + '\n';
    }, '');

    Printer.print(paragraph);
  }

  static printReceipt({ items, gifts, calculations }) {
    OutputView.#printItemsBlock(items);
    OutputView.#printGiftsBlock(gifts);
    OutputView.#printCalculationsBlock(calculations);
  }

  static #printItemsBlock(items) {
    const itemsBlock = items.reduce((acc, { name, quantity, amount }, index) => {
      const line = format.receiptMenu({
        name: name,
        quantity: unit.quantity(quantity),
        amount: unit.koreanWon(amount),
      });

      if (items.length - 1 === index) return acc + line;
      return acc + line + '\n';
    }, '');
    Printer.print(RECEIPT_MESSAGES.itemsBar);
    Printer.print(RECEIPT_MESSAGES.categories);
    Printer.print(itemsBlock);
  }

  static #printGiftsBlock(gifts) {
    if (gifts.length === 0) return;

    const giftsBlock = gifts.reduce((acc, { name, quantity }) => {
      const line = format.giftMenu({
        name,
        quantity: unit.quantity(quantity),
      });

      return acc + line + '\n';
    }, '');
    Printer.print(RECEIPT_MESSAGES.giftsBar);
    Printer.print(giftsBlock);
  }

  static #printCalculationsBlock(calculations) {
    const values = Object.values(calculations).map((value) => value.toLocaleString('ko-KR'));
    const totalLine = format.totalLine(...values.slice(0, 2));
    const promotionLine = format.promotionLine(values[2]);
    const membershipLine = format.membershipLine(values[3]);
    const paymentLine = format.paymentLine(values[4]);
    const calculationsBlock = totalLine + promotionLine + membershipLine + paymentLine;
    Printer.print(RECEIPT_MESSAGES.calculationsBar);
    Printer.print(calculationsBlock);
  }
}

export default OutputView;
