import { Console } from '@woowacourse/mission-utils';

class Reader {
  static async readLine(query) {
    try {
      const line = await Console.readLineAsync(query);
      if (line === '') throw new Error('[ERROR] 값을 입력해주세요.');
      return line;
    } catch (error) {
      Console.print(error.message);
      return this.readLine(query);
    }
  }
}

export default Reader;
