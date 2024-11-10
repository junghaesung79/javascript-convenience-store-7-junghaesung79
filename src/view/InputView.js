import { MESSAGES } from '../cosntants/messages.js';
import Reader from '../io/Reader.js';
import AskHandler from '../services/AskHandler.js';
import OrderHandler from '../services/OrderHandler.js';
import { tryAgainUntilValid as retryUntilValid } from '../utils/errorHandler.js';

class InputView {
  static #createInputHandler(message, handler) {
    return async () => {
      return retryUntilValid(async () => {
        const answer = await Reader.readLine(message);
        return handler(answer);
      });
    };
  }

  static getOrder = this.#createInputHandler(MESSAGES.getOrder, OrderHandler.format);

  static askMembership = this.#createInputHandler(MESSAGES.askMembership, AskHandler.getWhether);

  static askToContinue = this.#createInputHandler(MESSAGES.askToContinue, AskHandler.getWhether);
}

export default InputView;
