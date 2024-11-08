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
      sentence += stock.promotion.getData().name;

      Printer.print(sentence);
      Printer.printNewline();
    });
  }

  static printReceipt(basket) {
    Printer.printStoreBar();
    Printer.print('상품명\t\t수량\t금액');

    basket.forEach((item) => {
      let sentence = '';

      sentence += item.name;
      sentence += '\t\t';

      sentence += item.quantity.toString();
      sentence += '\t';

      sentence += item.amount.toLocaleString('ko-KR');

      Printer.print(sentence);
    });

    Printer.printBar;

    let sentence = '총구매액\t';
    sentence += basket.reduce((acc, cur) => acc + cur.quantity, 0).toString();
    sentence += '\t';
    sentence += basket.reduce((acc, cur) => acc + cur.amount, 0).toLocaleString('ko-KR');
    Printer.print(sentence);

    sentence = '멤버십할인\t\t\t-';
    sentence += (basket.reduce((acc, cur) => acc + cur.amount, 0) * 0.3).toLocaleString('ko-KR');
    Printer.print(sentence);

    sentence = '내실돈\t\t\t';
    sentence += basket.reduce((acc, cur) => acc + cur.amount, 0).toLocaleString('ko-KR');
    Printer.print(sentence);
  }
}

export default OutputView;
