import { MESSAGES } from '../cosntants/messages.js';
import Reader from '../io/Reader.js';

class InputView {
  static async getOrder() {
    return await Reader.readLine(MESSAGES.getOrder);
  }

  static async askMembership() {
    return await Reader.readLine(MESSAGES.askMembership);
  }
}

export default InputView;
