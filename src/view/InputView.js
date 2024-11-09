import Reader from '../io/Reader.js';

class InputView {
  static async getOrder() {
    return await Reader.readLine(
      '구매하실 상품명과 수량을 입력해 주세요. (예: [사이다-2],[감자칩-1])\n',
    );
  }

  static async askMembership() {
    return await Reader.readLine('멤버십 할인을 받으시겠습니까? (Y/N)\n');
  }
}

export default InputView;
