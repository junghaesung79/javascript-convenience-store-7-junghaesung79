import { throwError } from '../utils/errorHandler.js';
import { ERROR_MESSAGES } from '../constants/index.js';

class AskHandler {
  static #VALID_ANSWERS = ['Y', 'N'];

  static getWhether(answer) {
    AskHandler.#validate(answer);
    return answer === 'Y';
  }

  static #validate(answer) {
    if (!AskHandler.#VALID_ANSWERS.includes(answer)) {
      throwError(ERROR_MESSAGES.others);
    }
  }
}

export default AskHandler;
