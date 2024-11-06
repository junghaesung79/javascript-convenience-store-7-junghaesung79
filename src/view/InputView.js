import Reader from '../io/Reader.js';

class InputView {
  static async getOrder() {
    return await Reader.readLine('구매하실 상품명과 수량을 입력해 주세요. (예: [사이다-2],[감자칩-1])\n');
  }
}

export default InputView;
