import { Console } from '@woowacourse/mission-utils';
import * as ERROR_MESSAGES from '../cosntants/errorMessages.js';
import { throwError } from '../utils/errorHandler.js';

class Reader {
  static async readLine(query) {
    const line = await Console.readLineAsync(query);
    if (line.trim() === '') throwError(ERROR_MESSAGES.noInputs);
    return line;
  }
}

export default Reader;
