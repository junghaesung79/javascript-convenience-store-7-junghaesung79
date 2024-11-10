import * as ERROR_MESSAGES from '../cosntants/errorMessages.js';
import { throwError } from '../utils/errorHandler.js';

class AskHandler {
  static #VALID_ANSWERS = ['Y', 'N'];

  static getWhether(answer) {
    AskHandler.#validate(answer);
    return answer === 'Y';
  }

  static #validate(answer) {
    if (!AskHandler.#VALID_ANSWERS.includes(answer)) {
      throwError(ERROR_MESSAGES.answerYOrN);
    }
  }
}

export default AskHandler;