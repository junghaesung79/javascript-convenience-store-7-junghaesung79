import { Console } from '@woowacourse/mission-utils';
import { ERROR_MESSAGES } from '../constants/index.js';
import { throwError } from '../utils/errorHandler.js';

class Reader {
  static async readLine(query) {
    const line = await Console.readLineAsync(query);
    if (line.trim() === '') throwError(ERROR_MESSAGES.others);
    return line;
  }
}

export default Reader;
