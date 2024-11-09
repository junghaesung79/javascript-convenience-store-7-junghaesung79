import Printer from '../io/Printer.js';
import * as format from '../utils/format.js';

class OutputView {
  static printIntroduce() {
    Printer.print('안녕하세요. W편의점입니다.');
    Printer.print('현재 보유하고 있는 상품입니다.');
    Printer.printNewline();
  }

  static printStocks(stocks) {
    stocks.forEach((stock) => {
      let sentence = '- ';
      sentence += stock.name;
      sentence += ' ';
      sentence += format.koreanWon(stock.price);
      sentence += ' ';
      sentence += format.quanttityUnit(stock.quantity);
      sentence += stock.promotion.getName();

      Printer.print(sentence);
      Printer.printNewline();
    });
  }

  static printReceipt({ items, gifts, calculations }) {
    Printer.printStoreBar();
    Printer.print('상품명\t\t수량\t금액');

    items.forEach((item) => {
      let sentence = '';

      sentence += item.name;
      sentence += '\t\t';

      sentence += item.quantity;
      sentence += '\t';

      sentence += item.amount.toLocaleString('ko-KR');

      Printer.print(sentence);
    });

    Printer.printGiftBar();

    gifts.forEach((gift) => {
      let sentence = '';

      sentence += gift.name;
      sentence += '\t\t';

      sentence += gift.quantity;

      Printer.print(sentence);
    });

    Printer.printBar();

    let sentence = '총구매액\t\t';
    sentence += calculations.totalQuantity.toLocaleString('ko-KR');
    sentence += '\t';
    sentence += calculations.totalAmount.toLocaleString('ko-KR');
    Printer.print(sentence);

    sentence = '행사할인\t\t\t-';
    sentence += calculations.promotionDiscount.toLocaleString('ko-KR');
    Printer.print(sentence);

    sentence = '멤버십할인\t\t\t-';
    sentence += calculations.membershipDiscount.toLocaleString('ko-KR');
    Printer.print(sentence);

    sentence = '내실돈\t\t\t';
    sentence += calculations.payment.toLocaleString('ko-KR');
    Printer.print(sentence);
  }
}

export default OutputView;
