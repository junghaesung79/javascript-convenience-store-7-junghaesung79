import { Console } from '@woowacourse/mission-utils';

export const printReceipt = (basket) => {
  Console.print('===========W 편의점=============');
  Console.print('상품명\t\t수량\t금액');

  basket.forEach((item) => {
    let sentence = '';

    sentence += item.name;
    sentence += '\t\t';

    sentence += item.quantity.toString();
    sentence += '\t';

    sentence += item.amount.toLocaleString('ko-KR');

    Console.print(sentence);
  });

  Console.print('==============================');

  let sentence = '총구매액\t';

  sentence += basket.reduce((acc, cur) => acc + cur.quantity, 0).toString();
  sentence += '\t';

  sentence += basket.reduce((acc, cur) => acc + cur.amount, 0).toLocaleString('ko-KR');
  Console.print(sentence);

  sentence = '내실돈\t\t\t';

  sentence += basket.reduce((acc, cur) => acc + cur.amount, 0).toLocaleString('ko-KR');
  Console.print(sentence);
};
