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

  static printReceipt(receipt) {
    Printer.printStoreBar();
    Printer.print('상품명\t\t수량\t금액');

    receipt.forEach((bundle) => {
      const item = bundle[0];
      let sentence = '';

      sentence += item.name;
      sentence += '\t\t';

      sentence += bundle.length;
      sentence += '\t';

      sentence += (item.price * bundle.length).toLocaleString('ko-KR');

      Printer.print(sentence);
    });

    Printer.printBar();

    const totalAmount = receipt.reduce((acc, bundle) => acc + bundle.length * bundle[0].price, 0);

    const promotionDiscount = receipt.reduce((acc, bundle) => {
      const a = bundle
        .filter(({ status }) => status === 'gifted')
        .reduce((ac, { price }) => acc + price, 0);
      return acc + a;
    }, 0);

    const membershipDiscount =
      receipt.reduce((acc, bundle) => {
        const a = bundle
          .filter(({ status }) => status === 'default')
          .reduce((ac, { price }) => ac + price, 0);
        return acc + a;
      }, 0) * 0.3;

    let sentence = '총구매액\t\t';
    sentence += receipt.reduce((acc, bundle) => acc + bundle.length, 0).toString();
    sentence += '\t';
    sentence += totalAmount.toLocaleString('ko-KR');
    Printer.print(sentence);

    sentence = '행사할인\t\t\t-';
    sentence += promotionDiscount.toLocaleString('ko-KR');
    Printer.print(sentence);

    sentence = '멤버십할인\t\t\t-';
    sentence += membershipDiscount.toLocaleString('ko-KR');
    Printer.print(sentence);

    sentence = '내실돈\t\t\t';
    sentence += (totalAmount - promotionDiscount - membershipDiscount).toLocaleString('ko-KR');
    Printer.print(sentence);
  }
}

export default OutputView;
