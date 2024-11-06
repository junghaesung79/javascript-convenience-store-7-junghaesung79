import { Console } from '@woowacourse/mission-utils';

class Printer {
  static print(message) {
    Console.print(message);
  }

  static printNewline() {
    Console.print('');
  }

  static printStoreBar() {
    Console.print('===========W 편의점=============');
  }

  static printGiftBar() {
    Console.print('=============증\t정===============');
  }

  static printBar() {
    Console.print('==============================');
  }
}

export default Printer;
