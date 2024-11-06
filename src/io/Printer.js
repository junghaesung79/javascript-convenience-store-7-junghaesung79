import { Console } from '@woowacourse/mission-utils';

class Printer {
  static print(message) {
    Console.print(message);
  }

  static printNewline() {
    Console.print('');
  }
}

export default Printer;
