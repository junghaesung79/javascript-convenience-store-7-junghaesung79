import { MESSAGES } from '../cosntants/messages.js';
import Reader from '../io/Reader.js';
import OrderHandler from '../services/OrderHandler.js';
import { tryAgainUntilValid as retryUntilValid } from '../utils/errorHandler.js';

class InputView {
  static async getOrder() {
    return retryUntilValid(async () => {
      const orderString = await Reader.readLine(MESSAGES.getOrder);
      return OrderHandler.format(orderString);
    });
  }

  static async askMembership() {
    return await Reader.readLine(MESSAGES.askMembership);
  }
}

export default InputView;
